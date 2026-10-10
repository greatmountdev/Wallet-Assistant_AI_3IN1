
"use client"

const exportRealGoogleSheetV40 = async (wallets, authName, authEmail, clientId)=>{
  const total = wallets.reduce((a,b)=>a+(b.balance||0),0);
  const totalTabungan = wallets.filter(w=>w.group==="tabungan").reduce((a,b)=>a+b.balance,0);
  const totalEwallet = wallets.filter(w=>w.group==="ewallet").reduce((a,b)=>a+b.balance,0);
  const totalTunai = wallets.filter(w=>w.group==="tunai").reduce((a,b)=>a+b.balance,0);
  const totalDarurat = wallets.filter(w=>w.group==="darurat").reduce((a,b)=>a+b.balance,0);
  const totalCicilan = wallets.filter(w=>w.group==="cicilan").reduce((a,b)=>a+b.balance,0);
  const data = [
    ["Total Cash Flow (Tabungan+E-Wallet+Tunai+Darurat) - SALAH SATU kepotong | Rp "+total.toLocaleString("id-ID")],
    ["Total Tabungan (BCA BNI BRI + Global + CNY) | Rp "+totalTabungan.toLocaleString("id-ID")],
    ["Total E-Wallet (GoPay OVO DANA + Global + CNY ¥) | Rp "+totalEwallet.toLocaleString("id-ID")],
    ["Total Tunai | Rp "+totalTunai.toLocaleString("id-ID")+" | Total Darurat | Rp "+totalDarurat.toLocaleString("id-ID")+" | Total Cicilan | Rp "+totalCicilan.toLocaleString("id-ID")],
    [""],
    ["Tanggal","Judul - Sumber SALAH SATU","Jenis","Jumlah","Note FIX SALAH SATU","Foto","Currency","Mata Uang CNY","Account","V39 FIX 404"],
    ...wallets.map(w=>[new Date().toISOString().slice(0,10), w.name+" - "+w.bank+" - SALAH SATU", w.group, w.balance, (w.platform||"")+" - SALAH SATU FIX - Bukan semua kepotong", "", w.currency, w.currency==="CNY"?"¥ Yuan BARU":"", authEmail, "SALAH SATU - FIX V39"])
  ];
  try{
    if(clientId && window.google && window.gapi && window.gapi.client && window.gapi.client.sheets){
      const tc = window.google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: "https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/spreadsheets",
        callback: async (res)=>{
          try{
            window.gapi.client.setToken({access_token: res.access_token});
            const cr = await window.gapi.client.sheets.spreadsheets.create({properties:{title:"Dompet AI 6 Grup FULL - "+(authName||"Kawan")+" - V39 FIX 404 - "+new Date().toISOString().slice(0,10)}});
            const sid = cr.result.spreadsheetId;
            const url = cr.result.spreadsheetUrl || "https://docs.google.com/spreadsheets/d/"+sid;
            await window.gapi.client.sheets.spreadsheets.values.update({spreadsheetId:sid, range:"Sheet1!A1", valueInputOption:"RAW", resource:{values:data}});
            alert("✅ REAL Sheet BENERAN Terbuat di Akun Google Kamu! - "+(authEmail||"")+" - ID: "+sid+" - Buka: "+url+" - Cek My Drive - V39 FIX 404 WORKING");
            window.open(url,"_blank");
          }catch(err){ alert("Sheet error: "+err.message); fallback(); }
        }
      });
      tc.requestAccessToken();
      return;
    }
  }catch(e){}
  fallback();
  function fallback(){
    const csv = data.map(r=>r.map(c=>`"${String(c||"").replace(/"/g,'""')}"`).join(",")).join("\n");
    const blob = new Blob([csv],{type:"text/csv"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const fn = "Dompet_AI_6_Grup_FULL_"+new Date().toISOString().slice(0,10)+"_"+(authName||"Kawan")+"_SALAH_SATU_REAL_V39_FIX_404.csv";
    a.href=url; a.download=fn; a.click();
    alert("📊 Fallback CSV REAL V39 FIX 404: "+fn+" - Total Cash Flow SALAH SATU kepotong | Rp "+total.toLocaleString("id-ID")+" - Import ke sheets.google.com → jadi Sheet REAL - Untuk REAL 100%: console.cloud.google.com → Enable Sheets+Drive API → OAuth Client ID Origin https://wallet-assistant-ai-3-in-1.vercel.app → Vercel Env NEXT_PUBLIC_GOOGLE_CLIENT_ID + API_KEY → Redeploy");
  }
};


import { useState, useEffect } from "react"
const COLORS=["#0ea5e9","#10b981","#06b6d4","#8b5cf6","#ef4444","#f59e0b","#f97316","#14b8a6","#eab308","#22c55e"]
const TABUNGAN_BANKS=[
  {name:"BCA", country:"Indonesia", curr:"IDR", flag:"🇮🇩"}, {name:"BNI", country:"Indonesia", curr:"IDR", flag:"🇮🇩"},
  {name:"BRI", country:"Indonesia", curr:"IDR", flag:"🇮🇩"}, {name:"Mandiri", country:"Indonesia", curr:"IDR", flag:"🇮🇩"},
  {name:"BSI", country:"Indonesia", curr:"IDR", flag:"🇮🇩"}, {name:"CIMB Niaga", country:"Indonesia", curr:"IDR", flag:"🇮🇩"},
  {name:"BTN", country:"Indonesia", curr:"IDR", flag:"🇮🇩"}, {name:"Permata", country:"Indonesia", curr:"IDR", flag:"🇮🇩"},
  {name:"Danamon", country:"Indonesia", curr:"IDR", flag:"🇮🇩"}, {name:"Maybank Indonesia", country:"Indonesia", curr:"IDR", flag:"🇮🇩"},
  {name:"BCA Syariah", country:"Indonesia", curr:"IDR", flag:"🇮🇩"}, {name:"Jago", country:"Indonesia", curr:"IDR", flag:"🇮🇩"},
  {name:"Chase Bank", country:"USA", curr:"USD", flag:"🇺🇸"}, {name:"Bank of America", country:"USA", curr:"USD", flag:"🇺🇸"},
  {name:"Wells Fargo", country:"USA", curr:"USD", flag:"🇺🇸"}, {name:"Citibank", country:"USA", curr:"USD", flag:"🇺🇸"},
  {name:"HSBC UK", country:"UK", curr:"GBP", flag:"🇬🇧"}, {name:"Barclays", country:"UK", curr:"GBP", flag:"🇬🇧"},
  {name:"Deutsche Bank", country:"Germany", curr:"EUR", flag:"🇩🇪"}, {name:"BNP Paribas", country:"France", curr:"EUR", flag:"🇫🇷"},
  {name:"DBS Bank", country:"Singapore", curr:"SGD", flag:"🇸🇬"}, {name:"OCBC Bank", country:"Singapore", curr:"SGD", flag:"🇸🇬"},
  {name:"UOB", country:"Singapore", curr:"SGD", flag:"🇸🇬"}, {name:"Maybank Malaysia", country:"Malaysia", curr:"MYR", flag:"🇲🇾"},
  {name:"MUFG", country:"Japan", curr:"JPY", flag:"🇯🇵"}, {name:"Mizuho", country:"Japan", curr:"JPY", flag:"🇯🇵"},
  {name:"ICBC", country:"China", curr:"CNY", flag:"🇨🇳"}, {name:"Commonwealth Bank", country:"Australia", curr:"AUD", flag:"🇦🇺"},
  {name:"RBC", country:"Canada", curr:"CAD", flag:"🇨🇦"}, {name:"Emirates NBD", country:"UAE", curr:"AED", flag:"🇦🇪"},
  {name:"Revolut", country:"UK", curr:"GBP", flag:"🇬🇧"}, {name:"Wise", country:"UK", curr:"GBP", flag:"🇬🇧"},
  {name:"ICBC China", country:"China", curr:"CNY", flag:"🇨🇳"}, {name:"Bank of China", country:"China", curr:"CNY", flag:"🇨🇳"}, {name:"China Construction Bank", country:"China", curr:"CNY", flag:"🇨🇳"}, {name:"Alipay Bank", country:"China", curr:"CNY", flag:"🇨🇳"}, {name:"WeChat Pay Bank", country:"China", curr:"CNY", flag:"🇨🇳"}, {name:"Custom Bank Lokal/Global + Mata Uang Global", country:"Global", curr:"IDR", flag:"🌍"},
]
const EWALLET_BANKS=[
  {name:"GoPay", country:"Indonesia", curr:"IDR", flag:"🇮🇩"}, {name:"OVO", country:"Indonesia", curr:"IDR", flag:"🇮🇩"},
  {name:"DANA", country:"Indonesia", curr:"IDR", flag:"🇮🇩"}, {name:"LinkAja", country:"Indonesia", curr:"IDR", flag:"🇮🇩"},
  {name:"ShopeePay", country:"Indonesia", curr:"IDR", flag:"🇮🇩"}, {name:"i.saku", country:"Indonesia", curr:"IDR", flag:"🇮🇩"},
  {name:"Sakuku", country:"Indonesia", curr:"IDR", flag:"🇮🇩"}, {name:"DOKU Wallet", country:"Indonesia", curr:"IDR", flag:"🇮🇩"},
  {name:"Paytren", country:"Indonesia", curr:"IDR", flag:"🇮🇩"}, {name:"TrueMoney", country:"Indonesia", curr:"IDR", flag:"🇮🇩"},
  {name:"Jenius Pay", country:"Indonesia", curr:"IDR", flag:"🇮🇩"}, {name:"Flip", country:"Indonesia", curr:"IDR", flag:"🇮🇩"},
  {name:"PayPal", country:"USA", curr:"USD", flag:"🇺🇸"}, {name:"Venmo", country:"USA", curr:"USD", flag:"🇺🇸"},
  {name:"Cash App", country:"USA", curr:"USD", flag:"🇺🇸"}, {name:"Apple Pay", country:"USA", curr:"USD", flag:"🇺🇸"},
  {name:"Google Pay", country:"USA", curr:"USD", flag:"🇺🇸"}, {name:"Samsung Pay", country:"Korea", curr:"KRW", flag:"🇰🇷"},
  {name:"Alipay", country:"China", curr:"CNY", flag:"🇨🇳"}, {name:"WeChat Pay", country:"China", curr:"CNY", flag:"🇨🇳"},
  {name:"GrabPay", country:"Singapore", curr:"SGD", flag:"🇸🇬"}, {name:"GCash", country:"Philippines", curr:"PHP", flag:"🇵🇭"},
  {name:"Paytm", country:"India", curr:"INR", flag:"🇮🇳"}, {name:"PhonePe", country:"India", curr:"INR", flag:"🇮🇳"},
  {name:"Custom E-Wallet Lokal/Global + Custom - Banyak Opsi", country:"Global", curr:"IDR", flag:"🌍"},
]

const BANKS=[
  {name:"BCA", country:"Indonesia", curr:"IDR", flag:"🇮🇩"}, {name:"BNI", country:"Indonesia", curr:"IDR", flag:"🇮🇩"},
  {name:"BRI", country:"Indonesia", curr:"IDR", flag:"🇮🇩"}, {name:"Mandiri", country:"Indonesia", curr:"IDR", flag:"🇮🇩"},
  {name:"BSI", country:"Indonesia", curr:"IDR", flag:"🇮🇩"}, {name:"GoPay", country:"Indonesia", curr:"IDR", flag:"🇮🇩"},
  {name:"OVO", country:"Indonesia", curr:"IDR", flag:"🇮🇩"}, {name:"DANA", country:"Indonesia", curr:"IDR", flag:"🇮🇩"},
  {name:"LinkAja", country:"Indonesia", curr:"IDR", flag:"🇮🇩"}, {name:"ShopeePay", country:"Indonesia", curr:"IDR", flag:"🇮🇩"},
  {name:"Chase", country:"USA", curr:"USD", flag:"🇺🇸"}, {name:"DBS", country:"Singapore", curr:"SGD", flag:"🇸🇬"},
  {name:"HSBC", country:"UK", curr:"GBP", flag:"🇬🇧"}, {name:"Deutsche", country:"Germany", curr:"EUR", flag:"🇩🇪"},
]
const LANGS=[
  {code:"ID", label:"Indonesia", flag:"🇮🇩"}, {code:"EN", label:"English", flag:"🇺🇸"},
  {code:"CN", label:"China", flag:"🇨🇳"}, {code:"IN", label:"India", flag:"🇮🇳"},
  {code:"VN", label:"Vietnam", flag:"🇻🇳"}, {code:"AR", label:"Arab", flag:"🇸🇦"},
]

const T={
  ID:{appTitle:"Dompet AI Universal - 6 Grup FULL",beranda:"Beranda",input:"Input",chatAI:"Chat AI",laporan:"Laporan",profil:"Profil",dompet:"Dompet",crypto:"Crypto",totalSaldo:"Total Cash Flow (4 Grup +/- SALAH SATU)",sumberDana:"Sumber dana - 6 Grup FIX - SALAH SATU Sumber",tabungan:"Tabungan",ewallet:"E-Wallet",tunai:"Tunai Dompet",cicilan:"Cicilan",pengeluaran:"Pengeluaran",darurat:"Dana Darurat Wajib Pisah",inputTitle:"Input - Dana Masuk/Keluar + Foto Struk/Bon/Barang",chatTitle:"Chat META AI - Voice/Type + Gemini",laporanTitle:"Laporan - Grafik + Export Sheet - Harian/Bulanan",settingTitle:"Setting - 6 Bahasa + Font Tegas Manula + Dark/Day",notif:"Notifikasi - Cicilan jatuh tempo notif + Custom platform",notifDesc:"Pengingat tagihan - Cicilan FIF Kredivo jatuh tempo 20/25 Okt notif",fontLabel:"Font - Tegas Manula Besar Bold 19px",fontDesc:"Standar, Elegan, SANTAi, Tegas Manula - Font tegas 19px weight 900",bahasaLabel:"{tr.bahasaLabel}",akunLabel:"Akun Terhubung - 6 Grup FIX FULL - Cicilan & Belanja SALAH SATU Sumber! - FULL CHECKLIST!",nama:"Nama",bahasa:"Bahasa",grupFix:"6 Grup FIX FULL",cashFlowTotal:"Cash Flow Total",mataUang:"Mata Uang",cny:"CNY - Chinese Yuan ¥ - Cina",simpan:"Simpan",batal:"Batal",edit:"Edit",hapus:"Hapus",tambah:"Tambah",pilihSumber:"PILIH SUMBER DANA - SALAH SATU",pilihCicilan:"PILIH CICILAN YANG DIBAYAR",tujuan:"TUJUAN - 6 Grup",foto:"Foto Struk/Bon/Barang"},
  EN:{appTitle:"Dompet AI Universal - 6 Groups FULL",beranda:"Home",input:"Input",chatAI:"Chat AI",laporan:"Report",profil:"Profile",dompet:"Wallet",crypto:"Crypto",totalSaldo:"Total Cash Flow (4 Groups - ONE source)",sumberDana:"Funding - 6 Groups FIX - ONE source",tabungan:"Savings",ewallet:"E-Wallet",tunai:"Cash Wallet",cicilan:"Installment",pengeluaran:"Expense",darurat:"Emergency Separate",inputTitle:"Input - Income/Expense + Photo Receipt",chatTitle:"META AI Chat - Voice/Type + Gemini",laporanTitle:"Report - Chart + Export Sheet",settingTitle:"Settings - 6 Languages + Big Bold Font",notif:"Notifications - Installment due notif + Custom platform",notifDesc:"Bill reminder - Installment FIF Kredivo due 20/25 Oct notif",fontLabel:"Font - Bold Elder Large Bold 19px",fontDesc:"Standard, Elegant, SANTAi, Bold Elder - Font bold 19px weight 900",bahasaLabel:"Language - 6 options - ID/EN/CN/IN/VN/AR - ALL UI changes",akunLabel:"Connected Accounts - 6 Groups FIX FULL - Installment & Shopping ONE Source! - FULL CHECKLIST!",nama:"Name",bahasa:"Language",grupFix:"6 Groups FIX FULL",cashFlowTotal:"Cash Flow Total",mataUang:"Currency",cny:"CNY - Chinese Yuan ¥ - China",simpan:"Save",batal:"Cancel",edit:"Edit",hapus:"Delete",tambah:"Add",pilihSumber:"CHOOSE FUNDING SOURCE - ONE",pilihCicilan:"CHOOSE INSTALLMENT TO PAY",tujuan:"GOAL - 6 Groups",foto:"Receipt/Item Photo"},
  CN:{appTitle:"Dompet AI 通用 - 6组完整版 - 单一来源",beranda:"首页",input:"输入",chatAI:"AI聊天",laporan:"报告",profil:"资料",dompet:"钱包",crypto:"加密",totalSaldo:"总现金流 (4组 +/- 单一来源)",sumberDana:"资金来源 - 6组修复 - 单一来源",tabungan:"储蓄",ewallet:"电子钱包",tunai:"现金钱包",cicilan:"分期付款",pengeluaran:"支出",darurat:"应急基金必须分开",inputTitle:"输入 - 收入/支出 + 收据/物品照片",chatTitle:"META AI 聊天 - 语音/打字 + Gemini",laporanTitle:"报告 - 图表 + 导出表格 - 每日/每月",settingTitle:"设置 - 6种语言 + 粗体大字老人 + 深色/浅色",notif:"通知 - 分期到期通知 + 自定义平台",notifDesc:"账单提醒 - 分期 FIF Kredivo 到期 20/25 Okt 通知",fontLabel:"字体 - 粗体老人大字粗体 19px",fontDesc:"标准, 优雅, SANTAi, 粗体老人 - 字体粗体 19px weight 900",bahasaLabel:"语言 - 6个选项 - ID/EN/CN/IN/VN/AR - 全部UI变化",akunLabel:"已连接账户 - 6组完整修复 - 分期 & 购物单一来源! - 完整清单!",nama:"姓名",bahasa:"语言",grupFix:"6组完整修复",cashFlowTotal:"现金流总额",mataUang:"货币",cny:"CNY - 人民币 ¥ - 中国 - 新增",simpan:"保存",batal:"取消",edit:"编辑",hapus:"删除",tambah:"添加",pilihSumber:"选择资金来源 - 单一",pilihCicilan:"选择要支付的分期",tujuan:"目标 - 6组",foto:"收据/物品照片"},
  IN:{appTitle:"Dompet AI 6 समूह FULL - एक स्रोत",beranda:"होम",input:"इनपुट",chatAI:"चैट AI",laporan:"रिपोर्ट",profil:"प्रोफाइल",dompet:"वॉलेट",crypto:"क्रिप्टो",totalSaldo:"कुल कैश फ्लो (4 समूह +/- एक स्रोत)",sumberDana:"फंडिंग - 6 समूह FIX - एक स्रोत",tabungan:"बचत",ewallet:"ई-वॉलेट",tunai:"नकद वॉलेट",cicilan:"किस्त",pengeluaran:"व्यय",darurat:"आपातकालीन अलग जरूरी",inputTitle:"इनपुट - आय/व्यय + रसीद/सामान फोटो",chatTitle:"META AI चैट - Voice/Type + Gemini",laporanTitle:"रिपोर्ट - ग्राफ + Export Sheet - दैनिक/मासिक",settingTitle:"सेटिंग्स - 6 भाषा + बड़ा बोल्ड बुजुर्ग + Dark/Day",notif:"नोटिफिकेशन - किस्त नियत तारीख notif + Custom platform",notifDesc:"बिल रिमाइंडर - किस्त FIF Kredivo नियत 20/25 Okt notif",fontLabel:"फॉन्ट - बोल्ड बुजुर्ग बड़ा बोल्ड 19px",fontDesc:"स्टैंडर्ड, एलिगेंट, SANTAi, बोल्ड बुजुर्ग - फॉन्ट बोल्ड 19px weight 900",bahasaLabel:"भाषा - 6 विकल्प - ID/EN/CN/IN/VN/AR - ALL UI बदलता है",akunLabel:"कनेक्टेड अकाउंट - 6 समूह FIX FULL - किस्त & शॉपिंग एक स्रोत! - FULL CHECKLIST!",nama:"नाम",bahasa:"भाषा",grupFix:"6 समूह FIX FULL",cashFlowTotal:"कैश फ्लो कुल",mataUang:"मुद्रा",cny:"CNY - चीनी युआन ¥ - चीन - नया",simpan:"सेव",batal:"कैंसिल",edit:"एडिट",hapus:"डिलीट",tambah:"ऐड",pilihSumber:"फंडिंग स्रोत चुनें - एक",pilihCicilan:"किस्त चुनें भुगतान करने के लिए",tujuan:"लक्ष्य - 6 समूह",foto:"रसीद/सामान फोटो"},
  VN:{appTitle:"Dompet AI 6 Nhóm FULL - Một nguồn",beranda:"Trang chủ",input:"Nhập",chatAI:"Chat AI",laporan:"Báo cáo",profil:"Hồ sơ",dompet:"Ví",crypto:"Crypto",totalSaldo:"Tổng Dòng tiền (4 Nhóm +/- Một nguồn)",sumberDana:"Nguồn vốn - 6 Nhóm FIX - Một nguồn",tabungan:"Tiết kiệm",ewallet:"Ví điện tử",tunai:"Ví tiền mặt",cicilan:"Trả góp",pengeluaran:"Chi tiêu",darurat:"Khẩn cấp Bắt buộc Tách",inputTitle:"Nhập - Thu/Chi + Ảnh Biên lai/Hàng hóa",chatTitle:"Chat META AI - Voice/Type + Gemini",laporanTitle:"Báo cáo - Biểu đồ + Export Sheet - Hàng ngày/Hàng tháng",settingTitle:"Cài đặt - 6 ngôn ngữ + Đậm lớn người già + Dark/Day",notif:"Thông báo - Trả góp đến hạn notif + Custom platform",notifDesc:"Nhắc nhở hóa đơn - Trả góp FIF Kredivo đến hạn 20/25 Okt notif",fontLabel:"Font - Đậm lớn người già Bold 19px",fontDesc:"Tiêu chuẩn, Elegant, SANTAi, Đậm người già - Font đậm 19px weight 900",bahasaLabel:"Ngôn ngữ - 6 lựa chọn - ID/EN/CN/IN/VN/AR - ALL UI thay đổi",akunLabel:"Tài khoản Đã kết nối - 6 Nhóm FIX FULL - Trả góp & Mua sắm Một nguồn! - FULL CHECKLIST!",nama:"Tên",bahasa:"Ngôn ngữ",grupFix:"6 Nhóm FIX FULL",cashFlowTotal:"Tổng Dòng tiền",mataUang:"Tiền tệ",cny:"CNY - Nhân dân tệ ¥ - Trung Quốc - Mới",simpan:"Lưu",batal:"Hủy",edit:"Sửa",hapus:"Xóa",tambah:"Thêm",pilihSumber:"CHỌN NGUỒN VỐN - MỘT",pilihCicilan:"CHỌN TRẢ GÓP ĐỂ THANH TOÁN",tujuan:"MỤC TIÊU - 6 Nhóm",foto:"Ảnh Biên lai/Hàng hóa"},
  AR:{appTitle:"Dompet AI 6 مجموعات FULL - مصدر واحد",beranda:"الرئيسية",input:"إدخال",chatAI:"دردشة AI",laporan:"تقرير",profil:"الملف",dompet:"محفظة",crypto:"تشفير",totalSaldo:"إجمالي التدفق (4 مجموعات +/- مصدر واحد)",sumberDana:"التمويل - 6 مجموعات FIX - مصدر واحد",tabungan:"الادخار",ewallet:"المحفظة الإلكترونية",tunai:"محفظة النقدية",cicilan:"التقسيط",pengeluaran:"المصروفات",darurat:"الطوارئ فصل إلزامي",inputTitle:"إدخال - دخل/مصروف + صورة إيصال/سلعة",chatTitle:"دردشة META AI - Voice/Type + Gemini",laporanTitle:"تقرير - رسم بياني + تصدير Sheet - يومي/شهري",settingTitle:"الإعدادات - 6 لغات + غامق كبير مسن + Dark/Day",notif:"الإشعارات - تقسيط استحقاق notif + منصة مخصصة",notifDesc:"تذكير فاتورة - تقسيط FIF Kredivo استحقاق 20/25 Okt notif",fontLabel:"الخط - غامق مسن كبير غامق 19px",fontDesc:"قياسي, أنيق, SANTAi, غامق مسن - خط غامق 19px weight 900",bahasaLabel:"اللغة - 6 خيارات - ID/EN/CN/IN/VN/AR - كل واجهة تتغير",akunLabel:"الحسابات المتصلة - 6 مجموعات FIX FULL - تقسيط & تسوق مصدر واحد! - قائمة كاملة!",nama:"الاسم",bahasa:"اللغة",grupFix:"6 مجموعات FIX FULL",cashFlowTotal:"إجمالي التدفق",mataUang:"العملة",cny:"CNY - اليوان الصيني ¥ - الصين - جديد",simpan:"حفظ",batal:"إلغاء",edit:"تعديل",hapus:"حذف",tambah:"إضافة",pilihSumber:"اختر مصدر التمويل - واحد",pilihCicilan:"اختر التقسيط للدفع",tujuan:"الهدف - 6 مجموعات",foto:"صورة الإيصال/السلعة"},
}

export default function Page(){
  const [step,setStep]=useState("login")
  const [cryptoMode,setCryptoMode]=useState("dompet");
  const [showCryptoSeedPopup,setShowCryptoSeedPopup]=useState(false);
  const [cryptoSeedChecked,setCryptoSeedChecked]=useState(false);
  const [crypto2FAChecked,setCrypto2FAChecked]=useState(false);
  const [cryptoSeed12,setCryptoSeed12]=useState("abandon ability able about above absent absorb abstract absurd abuse access accident");
  const [cryptoPIN,setCryptoPIN]=useState("");
  const [btcPrice,setBtcPrice]=useState("Rp 1.050.000.000");
  const [bscScanTimer,setBscScanTimer]=useState("15:00");
  const [cryptoBottom,setCryptoBottom]=useState("beranda");
  const [selectedCoin,setSelectedCoin]=useState(null);
  const isCrypto = cryptoMode==="crypto";

  const handleCryptoTabClick = (target)=>{ if(target==="crypto"){ setShowCryptoSeedPopup(true); } else { setCryptoMode("dompet"); setMode("Dompet"); } };
  const confirmCryptoSeed = ()=>{ if(!cryptoSeedChecked){ alert("Centang Seed 12 kata sudah disimpan!"); return; } if(!crypto2FAChecked){ alert("Centang PIN 2FA wajib!"); return; } if(cryptoPIN.length!==6){ alert("PIN 2FA 6 digit wajib!"); return; } setShowCryptoSeedPopup(false); setCryptoMode("crypto"); setMode("Crypto"); };
  useEffect(()=>{ const it = setInterval(()=>{ setBscScanTimer(prev=>{ const p=prev.split(":"); let m=parseInt(p[0]||"15"); let s=parseInt(p[1]||"00"); let t=m*60+s-1; if(t<=0) t=15*60; return String(Math.floor(t/60)).padStart(2,"0")+":"+String(t%60).padStart(2,"0"); }); },1000); const bIt = setInterval(()=>{ const b=1050000000+Math.floor(Math.random()*10000000-5000000); setBtcPrice("Rp "+b.toLocaleString("id-ID")); },5000); return ()=>{ clearInterval(it); clearInterval(bIt); }; },[]);


  const [authName,setAuthName]=useState("Kawan"), [authEmail,setAuthEmail]=useState("kawan@gmail.com"), [authPhone,setAuthPhone]=useState("0812****890")
  const [clientId,setClientId]=useState(typeof window!=="undefined" ? localStorage.getItem("dompetAI_clientId")||"" : "")
  const [pin,setPin]=useState(""), [pinStep,setPinStep]=useState(1), [pin1Saved,setPin1Saved]=useState("")
  const [mode,setMode]=useState("Dompet"), [font,setFont]=useState("Tegas"), [lang,setLang]=useState("ID"), [hideTotal,setHideTotal]=useState(false), [hideNorek,setHideNorek]=useState({}), [bottom,setBottom]=useState("beranda"), [showMenu,setShowMenu]=useState(false), [theme,setTheme]=useState("light"), [notif,setNotif]=useState(true)
  const [newTx,setNewTx]=useState({title:"",amount:0,jenis:"keluar",fromWalletId:"1",toGroup:"pengeluaran",toCicilanId:"7",foto:null})
  const [showAddTx,setShowAddTx]=useState(false)
  const [isListening,setIsListening]=useState(false)
  const [laporanTab,setLaporanTab]=useState("grafik")
  const [wallets,setWallets]=useState([
    {id:"1",name:"Tabungan BCA",type:"tabungan",group:"tabungan",color:"#0ea5e9",bank:"BCA",norek:"1234567890",balance:7500000,currency:"IDR",flag:"🇮🇩",icon:"🏦",platform:"",dueDate:""},
    {id:"2",name:"Tabungan BNI",type:"tabungan",group:"tabungan",color:"#2563eb",bank:"BNI",norek:"0987654321",balance:2500000,currency:"IDR",flag:"🇮🇩",icon:"🏦",platform:"",dueDate:""},
    {id:"3",name:"Tabungan BRI",type:"tabungan",group:"tabungan",color:"#0ea5e9",bank:"BRI",norek:"1122334455",balance:1500000,currency:"IDR",flag:"🇮🇩",icon:"🏦",platform:"",dueDate:""},
    {id:"4",name:"GoPay",type:"ewallet",group:"ewallet",color:"#10b981",bank:"GoPay",norek:"081234567890",balance:375000,currency:"IDR",flag:"🇮🇩",icon:"📱",platform:"",dueDate:""},
    {id:"5",name:"OVO",type:"ewallet",group:"ewallet",color:"#8b5cf6",bank:"OVO",norek:"081234567891",balance:125000,currency:"IDR",flag:"🇮🇩",icon:"📱",platform:"",dueDate:""},
    {id:"6",name:"DANA",type:"ewallet",group:"ewallet",color:"#06b6d4",bank:"DANA",norek:"081234567892",balance:200000,currency:"IDR",flag:"🇮🇩",icon:"📱",platform:"",dueDate:""},
    {id:"7",name:"Tunai Dompet",type:"cash",group:"tunai",color:"#06b6d4",bank:"Cash",norek:"-",balance:1205000,currency:"IDR",flag:"🇮🇩",icon:"👛",platform:"",dueDate:""},
    {id:"8",name:"Dana Darurat Wajib Pisah",type:"darurat",group:"darurat",color:"#f59e0b",bank:"BSI",norek:"9988776655",balance:5000000,currency:"IDR",flag:"🇮🇩",icon:"🚨",platform:"",dueDate:""},
    {id:"9",name:"Cicilan Motor",type:"cicilan",group:"cicilan",color:"#ef4444",bank:"FIF",norek:"-",balance:1200000,currency:"IDR",flag:"🇮🇩",icon:"🏍️",platform:"FIF",dueDate:"2026-10-20"},
    {id:"10",name:"Cicilan HP",type:"cicilan",group:"cicilan",color:"#8b5cf6",bank:"Kredivo",norek:"-",balance:800000,currency:"IDR",flag:"🇮🇩",icon:"📱",platform:"Kredivo",dueDate:"2026-10-25"},
    {id:"11",name:"Pengeluaran",type:"pengeluaran",group:"pengeluaran",color:"#f97316",bank:"-",norek:"-",balance:0,currency:"IDR",flag:"🌍",icon:"💸",platform:"",dueDate:""},
  ])
  const [txs,setTxs]=useState([
    {id:"1",title:"Kopi dan makan siang",amount:45000,fromWalletId:"7",fromGroup:"tunai",toGroup:"pengeluaran",jenis:"keluar",kategori:"Makanan",date:"3 Okt 2026",foto:"struk.jpg",source:"Tunai Dompet -> Pengeluaran",curr:"IDR",note:"FIX: Belanja 45k - SALAH SATU: Tunai Dompet - Bukan semua 4 grup kepotong! Sisa Tunai Rp 1.160.000 - Tabungan, E-Wallet, Darurat TETAP! 🙌"},
    {id:"2",title:"Isi saldo GoPay dari BCA",amount:75000,fromWalletId:"1",toWalletId:"4",fromGroup:"tabungan",toGroup:"ewallet",jenis:"pindah",kategori:"Top-up",date:"3 Okt 2026",foto:null,source:"Tabungan BCA -> GoPay",curr:"IDR",note:"Pindah: BCA -75k, GoPay +75k - Hanya 2 akun berubah, bukan semua!"},
    {id:"3",title:"Belanja rumah dari BCA",amount:185000,fromWalletId:"1",fromGroup:"tabungan",toGroup:"pengeluaran",jenis:"keluar",kategori:"Makanan",date:"2 Okt 2026",foto:"struk.jpg",source:"Tabungan BCA -> Pengeluaran",curr:"IDR",note:"FIX: Belanja 185k - SALAH SATU: Tabungan BCA - Bukan semua kepotong! Sisa BCA Rp 7.315.000"},
    {id:"4",title:"Gaji Oktober",amount:8500000,fromWalletId:"external",toWalletId:"1",fromGroup:"external",toGroup:"tabungan",jenis:"masuk",kategori:"Gaji",date:"1 Okt 2026",foto:null,source:"External -> Tabungan BCA",curr:"IDR",note:"Masuk: Gaji 8,5jt ke SALAH SATU: Tabungan BCA - Hanya BCA nambah!"},
    {id:"5",title:"Bayar cicilan motor dari BCA",amount:500000,fromWalletId:"1",toGroup:"cicilan",toCicilanId:"9",jenis:"keluar",kategori:"Cicilan",date:"2 Okt 2026",foto:"bon.jpg",source:"Tabungan BCA -> Cicilan Motor FIF",curr:"IDR",note:"FIX CICILAN: Bayar cicilan motor 500k dari BCA - SALAH SATU: BCA 7,5jt->7jt, Cicilan Motor 1,2jt->700k - E-Wallet, Tunai, Darurat TETAP! Custom platform FIF jatuh tempo 20 Okt notif! 🙌"},
  ])
  const [newWallet,setNewWallet]=useState({name:"",type:"tabungan",group:"tabungan",bank:"BCA",norek:"",color:COLORS[0],balance:0,platform:"",dueDate:"",currency:"IDR",flag:"🇮🇩",customBankName:""})
  const [showAddWallet,setShowAddWallet]=useState(false), [selectedSource,setSelectedSource]=useState(null)
  const [chat,setChat]=useState([
    {role:"ai",text:"Selamat datang! V37 FULL - 6 Grup FIX: Belanja/Cicilan pilih SALAH SATU Tabungan/E-Wallet/Tunai/Darurat - Bukan semua kepotong! Cicilan jatuh tempo pilih sumber dana!"},
    {role:"ai",text:"Fitur FULL: Chat Voice/Type + Gemini + 7 saran, Laporan Grafik Batang+Pie+Sheet harian/bulanan + Export, Input Foto Struk/Bon/Barang Galeri+Kamera+Drive, i18n 6 bahasa ALL UI, Font Tegas Manula"},
  ])
  const [chatInput,setChatInput]=useState("")
  const getFontStyle=()=>{
    if(font==="Standar") return {family:"Inter,sans-serif", size:"14px", weight:"400"}
    if(font==="Elegan") return {family:"Georgia, serif", size:"15px", weight:"400"}
    if(font==="SANTAi") return {family:"cursive", size:"15px", weight:"600"}
    if(font==="Tegas") return {family:"Inter,sans-serif", size:"19px", weight:"900"}
    return {family:"Inter,sans-serif", size:"19px", weight:"900"}
  }
  const fontCfg=getFontStyle()
  const tr=T[lang]||T.ID
  const cashFlowGroups=["tabungan","ewallet","tunai","darurat"]
  const totalCashFlow=wallets.filter(w=>cashFlowGroups.includes(w.group)).reduce((a,b)=>a+b.balance,0)
  const totalTabungan=wallets.filter(w=>w.group==="tabungan").reduce((a,b)=>a+b.balance,0)
  const totalEwallet=wallets.filter(w=>w.group==="ewallet").reduce((a,b)=>a+b.balance,0)
  const totalTunai=wallets.filter(w=>w.group==="tunai").reduce((a,b)=>a+b.balance,0)
  const totalDarurat=wallets.filter(w=>w.group==="darurat").reduce((a,b)=>a+b.balance,0)
  const totalCicilan=wallets.filter(w=>w.group==="cicilan").reduce((a,b)=>a+b.balance,0)
  const masuk=txs.filter(t=>t.jenis==="masuk").reduce((a,b)=>a+b.amount,0)
  const keluar=txs.filter(t=>t.jenis==="keluar").reduce((a,b)=>a+b.amount,0)
  const groupedWallets={
    tabungan:wallets.filter(w=>w.group==="tabungan"),
    ewallet:wallets.filter(w=>w.group==="ewallet"),
    tunai:wallets.filter(w=>w.group==="tunai"),
    darurat:wallets.filter(w=>w.group==="darurat"),
    cicilan:wallets.filter(w=>w.group==="cicilan"),
    pengeluaran:wallets.filter(w=>w.group==="pengeluaran"),
  }
  const displayNorek=(norek,id)=>{ if(norek==="-"||norek==="") return "-"; if(!hideNorek[id]) return norek.slice(0,3)+"****"+norek.slice(-3); return norek }
  const handleNumber=(num)=>{ if(pin.length<6){ const np=pin+num; setPin(np); if(np.length===6){ setTimeout(()=>{ if(pinStep===1){ setPin1Saved(np); setPin(""); setPinStep(2)} else { if(np===pin1Saved){ setStep("main")} else { setPin(""); setPinStep(1)} } },300)} } }

  const [googleConnected,setGoogleConnected]=useState(false)
  const [facebookConnected,setFacebookConnected]=useState(false)
  const [drivePermission,setDrivePermission]=useState(false)
  const [sheetPermission,setSheetPermission]=useState(false)
  const [metaAIConnected,setMetaAIConnected]=useState(false)
  const [geminiConnected,setGeminiConnected]=useState(false)
  const [cameraPermission,setCameraPermission]=useState(false)
  const [filePermission,setFilePermission]=useState(false)
  const [showPermissionModal,setShowPermissionModal]=useState(false)

  if(step==="login"){
  
  const isCrypto = cryptoMode==="crypto";
  return (
    <div style={{minHeight:"100vh",background:isCrypto?"#fff":"#f8fafc",paddingBottom:80, maxWidth:420, margin:"0 auto", position:"relative"}}>
      {showCryptoSeedPopup && (
        <div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.7)",zIndex:100,display:"grid",placeItems:"center",padding:12}}>
          <div style={{background:"#fff",borderRadius:20,padding:16,maxWidth:360,width:"100%",maxHeight:"90vh",overflowY:"auto"}}>
            <div style={{fontWeight:900,fontSize:14,textAlign:"center"}}>🔐 Crypto - Seed & 2FA Wajib - Hanya Geser ke Crypto</div>
            <div style={{fontSize:9,color:"#64748b",textAlign:"center",marginTop:4}}>Di Dompet gak ada Seed! Hanya pas geser ke Crypto baru popup ini!</div>
            <div style={{background:"#f8fafc",borderRadius:12,padding:10,marginTop:10,border:"1px solid #e2e8f0"}}>
              <div style={{fontSize:10,fontWeight:800}}>🌱 Seed 12 Kata - Simpan Aman - QR + TrustWallet/Metamask</div>
              <div style={{background:"#0f172a",color:"#10b981",padding:8,borderRadius:8,marginTop:6,fontSize:10,fontFamily:"monospace",wordBreak:"break-all"}}>{cryptoSeed12}</div>
              <div style={{display:"flex",gap:6,marginTop:6}}>
                <div style={{flex:1,background:"#fff",borderRadius:8,padding:6,border:"1px solid #e2e8f0",textAlign:"center"}}><div style={{fontSize:16}}>QR</div><div style={{fontSize:7,fontWeight:700}}>QR Code</div><div style={{width:40,height:40,background:"#000",margin:"4px auto",display:"grid",placeItems:"center",color:"#fff",fontSize:6}}>QR<br/>SEED</div></div>
                <div style={{flex:1,background:"#fff",borderRadius:8,padding:6,border:"1px solid #e2e8f0",textAlign:"center"}}><div style={{fontSize:8,fontWeight:800}}>TrustWallet / Metamask</div><div style={{fontSize:6,color:"#64748b",marginTop:4}}>Import Seed → BSC / BTC</div></div>
              </div>
              <label style={{display:"flex",gap:6,alignItems:"center",marginTop:8,fontSize:9,fontWeight:700}}><input type="checkbox" checked={cryptoSeedChecked} onChange={e=>setCryptoSeedChecked(e.target.checked)}/> Saya sudah simpan Seed 12 kata + QR dengan aman!</label>
            </div>
            <div style={{background:"#fef3c7",borderRadius:12,padding:10,marginTop:10,border:"1px solid #fde68a"}}>
              <div style={{fontSize:10,fontWeight:800}}>🔍 BSCScan 15 Menit + BTC Live</div>
              <div style={{display:"flex",gap:6,marginTop:6}}>
                <div style={{flex:1,background:"#fff",borderRadius:8,padding:6,border:"1px solid #f59e0b"}}><div style={{fontSize:7,color:"#92400e"}}>BSCScan Timer</div><div style={{fontSize:12,fontWeight:900,color:"#f59e0b"}}>{bscScanTimer}</div></div>
                <div style={{flex:1,background:"#fff",borderRadius:8,padding:6,border:"1px solid #10b981"}}><div style={{fontSize:7,color:"#166534"}}>BTC Live</div><div style={{fontSize:10,fontWeight:900,color:"#10b981"}}>{btcPrice}</div></div>
              </div>
            </div>
            <div style={{background:"#f0f9ff",borderRadius:12,padding:10,marginTop:10,border:"1px solid #bae6fd"}}>
              <div style={{fontSize:10,fontWeight:800}}>🔐 PIN 2FA Wajib Centang Baru Bisa Masuk Crypto</div>
              <input type="password" value={cryptoPIN} onChange={e=>setCryptoPIN(e.target.value.slice(0,6))} placeholder="PIN 2FA 6 digit" style={{width:"100%",padding:8,borderRadius:8,border:"1px solid #0ea5e9",marginTop:6,fontSize:12,textAlign:"center",letterSpacing:4}}/>
              <label style={{display:"flex",gap:6,alignItems:"center",marginTop:8,fontSize:9,fontWeight:700}}><input type="checkbox" checked={crypto2FAChecked} onChange={e=>setCrypto2FAChecked(e.target.checked)}/> Saya aktifkan PIN 2FA untuk Crypto - Wajib centang!</label>
            </div>
            <div style={{display:"flex",gap:8,marginTop:12}}>
              <button onClick={()=>{setShowCryptoSeedPopup(false); setCryptoMode("dompet"); setMode("Dompet");}} style={{flex:1,padding:10,borderRadius:10,border:"1px solid #e2e8f0",background:"#fff",fontSize:10,fontWeight:700}}>Batal - Balik Dompet</button>
              <button onClick={confirmCryptoSeed} style={{flex:1,padding:10,borderRadius:10,border:"none",background:"#0f172a",color:"#fff",fontSize:10,fontWeight:900}}>Masuk Crypto - PIN 2FA OK</button>
            </div>
          </div>
        </div>
      )}

      {/* DOMPET BIASA - TAMPIL KALO DOMPET */}
      {!isCrypto && (
        <>
          <div style={{background:"#0f172a", padding:"12px 16px 20px 16px", borderRadius:"0 0 24px 24px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",color:"#fff"}}>
              <div>
                <div style={{fontSize:9,opacity:0.6}}>Dompet AI Universal - 6 Groups FULL - Rp 18.405.000</div>
                <div style={{fontWeight:900,fontSize:13,marginTop:2}}>Total Cash Flow SALAH SATU kepotong I Rp {wallets.reduce((a,b)=>a+(b.balance||0),0).toLocaleString("id-ID")}</div>
              </div>
              <div style={{width:36,height:36,borderRadius:12,background:"#1e293b",display:"grid",placeItems:"center"}}>👤</div>
            </div>
            <div style={{display:"flex",background:"#1e293b",borderRadius:14,padding:4,marginTop:16}}>
              <button onClick={()=>handleCryptoTabClick("dompet")} style={{flex:1,padding:8,borderRadius:10,background:cryptoMode==="dompet"?"#fff":"transparent",color:cryptoMode==="dompet"?"#0f172a":"#94a3b8",border:"none",fontWeight:800,fontSize:10}}>Dompet</button>
              <button onClick={()=>handleCryptoTabClick("crypto")} style={{flex:1,padding:8,borderRadius:10,background:"transparent",color:"#94a3b8",border:"none",fontWeight:800,fontSize:10}}>Crypto</button>
            </div>
          </div>
          <div style={{padding:12}}>
            <div style={{fontWeight:900,fontSize:12}}>Transaksi - Dompet Biasa - 5 Nav</div>
            <div style={{display:"grid",gap:8,marginTop:8}}>
              {wallets.slice(0,5).map(w=>(
                <div key={w.id} style={{background:"#fff",borderRadius:12,padding:10,border:"1px solid #e2e8f0"}}>
                  <div style={{display:"flex",justifyContent:"space-between"}}><div style={{fontWeight:700,fontSize:11}}>{w.name}</div><div style={{fontWeight:900,fontSize:11}}>Rp {w.balance.toLocaleString("id-ID")}</div></div>
                  <div style={{fontSize:8,color:"#64748b"}}>{w.bank} • {w.group}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* CRYPTO WALLET - SATU AJA LIST COIN - BUKAN 3 HALAMAN PANJANG - 2 NAV */}
      {isCrypto && (
        <div style={{background:"#fff",minHeight:"100vh"}}>
          {/* Beranda Daftar Coin - Satu aja list coin */}
          {cryptoBottom==="beranda" && !selectedCoin && (
            <>
              <div style={{background:"#0f172a",padding:"12px 16px 20px 16px",borderRadius:"0 0 24px 24px",color:"#fff"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{fontWeight:900,fontSize:14}}>💎 Crypto Wallet - TrustWallet Style - $4,270.00</div>
                  <button onClick={()=>{setCryptoMode("dompet"); setMode("Dompet");}} style={{padding:"4px 8px",borderRadius:8,background:"#1e293b",color:"#fff",border:"none",fontSize:8}}>← Dompet</button>
                </div>
                <div style={{textAlign:"center",marginTop:12}}>
                  <div style={{fontSize:10,opacity:0.6}}>Total Balance</div>
                  <div style={{fontWeight:900,fontSize:22}}>$4,270.00</div>
                  <div style={{fontSize:9,opacity:0.6,marginTop:4}}>{btcPrice} • BSCScan {bscScanTimer}</div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:12,marginTop:16}}>
                  <div style={{textAlign:"center"}}><div style={{width:40,height:40,borderRadius:10,background:"#10b981",display:"grid",placeItems:"center",margin:"0 auto"}}>↑</div><div style={{fontSize:8,marginTop:4}}>Send</div></div>
                  <div style={{textAlign:"center"}}><div style={{width:40,height:40,borderRadius:10,background:"#0ea5e9",display:"grid",placeItems:"center",margin:"0 auto"}}>↓</div><div style={{fontSize:8,marginTop:4}}>Receive</div></div>
                  <div style={{textAlign:"center"}}><div style={{width:40,height:40,borderRadius:10,background:"#8b5cf6",display:"grid",placeItems:"center",margin:"0 auto"}}>💳</div><div style={{fontSize:8,marginTop:4}}>Buy</div></div>
                  <div style={{textAlign:"center"}}><div style={{width:40,height:40,borderRadius:10,background:"#f59e0b",display:"grid",placeItems:"center",margin:"0 auto"}}>⇄</div><div style={{fontSize:8,marginTop:4}}>Swap</div></div>
                </div>
              </div>
              <div style={{padding:12}}>
                <div style={{fontWeight:800,fontSize:11}}>Beranda Daftar Coin - Satu aja list coin - Klik coin tampil sub menu terima/kirim/swap di bawahnya</div>
                <div style={{marginTop:8}}>
                  {[
                    {symbol:"BTC", name:"Bitcoin", network:"BTC", bal:"0.0025 BTC", usd:"$125", icon:"₿", color:"#f7931a", addr:"bc1qxy2k...s8x4j3n5m9q7", contract:""},
                    {symbol:"ETH", name:"Ethereum", network:"ERC-20", bal:"0.5 ETH", usd:"$1,800", icon:"Ξ", color:"#627eea", addr:"0xAbC...1234", contract:""},
                    {symbol:"USDT", name:"Tether BEP-20", network:"BEP-20", bal:"500 USDT", usd:"$500", icon:"💲", color:"#26a17b", addr:"0x55d...7f6eB", contract:"0x55d398326f99059fF775485246999027B3197955"},
                    {symbol:"BNB", name:"BNB", network:"BEP-20", bal:"1.2 BNB", usd:"$720", icon:"🔶", color:"#f3ba2f", addr:"0x1a2...3b4c", contract:""},
                  ].map(a=>(
                    <div key={a.symbol+a.network} onClick={()=>setSelectedCoin(a)} style={{display:"flex",gap:12,alignItems:"center",padding:"12px 0",borderBottom:"1px solid #f8fafc",cursor:"pointer"}}>
                      <div style={{width:40,height:40,borderRadius:20,background:a.color+"20",display:"grid",placeItems:"center",fontSize:18}}>{a.icon}</div>
                      <div style={{flex:1}}><div style={{fontWeight:800,fontSize:12}}>{a.symbol} - {a.name}</div><div style={{fontSize:8,color:"#64748b"}}>{a.network} • {a.addr}</div></div>
                      <div style={{textAlign:"right"}}><div style={{fontWeight:800,fontSize:12}}>{a.bal}</div><div style={{fontSize:8,color:"#64748b"}}>{a.usd}</div></div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
          {selectedCoin && (
            <div style={{padding:12}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}><button onClick={()=>setSelectedCoin(null)} style={{width:32,height:32,borderRadius:8,background:"#f1f5f9",border:"none"}}>←</button><div style={{fontWeight:900,fontSize:14}}>{selectedCoin.symbol} - {selectedCoin.name}</div></div>
              <div style={{background:"#0f172a",borderRadius:16,padding:16,color:"#fff",textAlign:"center",marginTop:12}}>
                <div style={{width:56,height:56,borderRadius:28,background:selectedCoin.color+"30",display:"grid",placeItems:"center",margin:"0 auto",fontSize:28}}>{selectedCoin.icon}</div>
                <div style={{fontWeight:900,fontSize:18,marginTop:8}}>{selectedCoin.bal}</div>
                <div style={{fontSize:8,opacity:0.6,marginTop:6,wordBreak:"break-all"}}>Alamat Wallet ({selectedCoin.network}): {selectedCoin.addr}</div>
                {selectedCoin.contract && <div style={{fontSize:7,opacity:0.8,marginTop:6,background:"#fffbeb",color:"#92400e",padding:"6px 10px",borderRadius:8,wordBreak:"break-all"}}>Alamat Kontrak: {selectedCoin.contract}</div>}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginTop:12}}>
                <button style={{padding:14,borderRadius:12,background:"#dcfce7",color:"#166534",border:"none",fontWeight:800,fontSize:11}}>↓ Terima</button>
                <button style={{padding:14,borderRadius:12,background:"#fee2e2",color:"#991b1b",border:"none",fontWeight:800,fontSize:11}}>↑ Kirim</button>
                <button style={{padding:14,borderRadius:12,background:"#dbeafe",color:"#1e40af",border:"none",fontWeight:800,fontSize:11}}>⇄ Swap</button>
              </div>
            </div>
          )}
          {cryptoBottom==="dapp" && !selectedCoin && (
            <div style={{padding:12}}>
              <div style={{fontWeight:900,fontSize:14}}>🌐 dApp Browser - PancakeSwap dlsbg</div>
              <div style={{marginTop:12,display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                {[
                  {name:"PancakeSwap", url:"pancakeswap.finance", icon:"🥞", color:"#d1884f"},
                  {name:"Uniswap", url:"uniswap.org", icon:"🦄", color:"#ff007a"},
                  {name:"1inch", url:"app.1inch.io", icon:"🦄", color:"#1a1a1a"},
                  {name:"OpenSea", url:"opensea.io", icon:"🌊", color:"#2081e2"},
                ].map(d=>(
                  <div key={d.name} style={{background:"#fff",borderRadius:12,padding:10,border:"1px solid #f1f5f9"}}>
                    <div style={{width:32,height:32,borderRadius:8,background:d.color+"20",display:"grid",placeItems:"center"}}>{d.icon}</div>
                    <div style={{fontWeight:800,fontSize:10,marginTop:6}}>{d.name}</div>
                    <div style={{fontSize:7,color:"#64748b"}}>{d.url}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Bottom Nav 2 - Beranda Daftar Coin + dApp - Satu aja list coin */}
          {!selectedCoin && (
            <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:420,background:"#fff",borderTop:"1px solid #f1f5f9",display:"flex",justifyContent:"space-around",padding:"8px 0 16px 0",zIndex:80}}>
              <button onClick={()=>setCryptoBottom("beranda")} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,background:"none",border:"none",padding:"4px 20px"}}>
                <div style={{width:28,height:28,borderRadius:10,background:cryptoBottom==="beranda"?"#0f172a":"#f8fafc",display:"grid",placeItems:"center",fontSize:14}}>💎</div>
                <div style={{fontSize:8,fontWeight:cryptoBottom==="beranda"?800:400,color:cryptoBottom==="beranda"?"#0f172a":"#94a3b8"}}>Beranda - Daftar Coin</div>
              </button>
              <button onClick={()=>setCryptoBottom("dapp")} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,background:"none",border:"none",padding:"4px 20px"}}>
                <div style={{width:28,height:28,borderRadius:10,background:cryptoBottom==="dapp"?"#0f172a":"#f8fafc",display:"grid",placeItems:"center",fontSize:14}}>🌐</div>
                <div style={{fontSize:8,fontWeight:cryptoBottom==="dapp"?800:400,color:cryptoBottom==="dapp"?"#0f172a":"#94a3b8"}}>dApp - PancakeSwap</div>
              </button>
            </div>
          )}
          {selectedCoin && (
            <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:420,background:"#fff",borderTop:"1px solid #f1f5f9",display:"flex",justifyContent:"space-around",padding:"8px 0 16px 0",zIndex:80}}>
              <button onClick={()=>alert("Terima "+selectedCoin.symbol)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,background:"none",border:"none",padding:"4px 12px"}}><div style={{width:28,height:28,borderRadius:10,background:"#dcfce7",display:"grid",placeItems:"center"}}>↓</div><div style={{fontSize:8,fontWeight:700}}>Terima</div></button>
              <button onClick={()=>alert("Kirim "+selectedCoin.symbol)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,background:"none",border:"none",padding:"4px 12px"}}><div style={{width:28,height:28,borderRadius:10,background:"#fee2e2",display:"grid",placeItems:"center"}}>↑</div><div style={{fontSize:8,fontWeight:700}}>Kirim</div></button>
              <button onClick={()=>alert("Swap "+selectedCoin.symbol)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,background:"none",border:"none",padding:"4px 12px"}}><div style={{width:28,height:28,borderRadius:10,background:"#dbeafe",display:"grid",placeItems:"center"}}>⇄</div><div style={{fontSize:8,fontWeight:700}}>Swap</div></button>
              <button onClick={()=>setSelectedCoin(null)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,background:"none",border:"none",padding:"4px 12px"}}><div style={{width:28,height:28,borderRadius:10,background:"#f1f5f9",display:"grid",placeItems:"center"}}>←</div><div style={{fontSize:8,fontWeight:700}}>Kembali</div></button>
            </div>
          )}
        </div>
      )}

      {/* Bottom Nav Dompet Biasa - 5 Nav - Hanya tampil kalo Dompet */}
      {!isCrypto && (
        <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:420,background:"#fff",borderTop:"1px solid #f1f5f9",display:"flex",justifyContent:"space-around",padding:"8px 0 16px 0",zIndex:80}}>
          <button style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,background:"none",border:"none",padding:"4px 12px"}}><div style={{width:28,height:28,borderRadius:10,background:"#0f172a",display:"grid",placeItems:"center",fontSize:14}}>🏠</div><div style={{fontSize:8,fontWeight:800}}>Beranda</div></button>
          <button style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,background:"none",border:"none",padding:"4px 12px"}}><div style={{width:28,height:28,borderRadius:10,background:"#f8fafc",display:"grid",placeItems:"center",fontSize:14}}>💳</div><div style={{fontSize:8}}>Dompet</div></button>
          <button style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,background:"none",border:"none",padding:"4px 12px"}}><div style={{width:28,height:28,borderRadius:10,background:"#f8fafc",display:"grid",placeItems:"center",fontSize:14}}>➕</div><div style={{fontSize:8}}>Input</div></button>
          <button style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,background:"none",border:"none",padding:"4px 12px"}}><div style={{width:28,height:28,borderRadius:10,background:"#f8fafc",display:"grid",placeItems:"center",fontSize:14}}>📊</div><div style={{fontSize:8}}>Laporan</div></button>
          <button style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,background:"none",border:"none",padding:"4px 12px"}}><div style={{width:28,height:28,borderRadius:10,background:"#f8fafc",display:"grid",placeItems:"center",fontSize:14}}>👤</div><div style={{fontSize:8}}>Profil</div></button>
        </div>
      )}
    </div>
  )
}
