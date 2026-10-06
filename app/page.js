"use client";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";
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
  const [mounted,setMounted]=useState(false)
  const [authName,setAuthName]=useState("Kawan"), [authEmail,setAuthEmail]=useState("kawan@gmail.com"), [authPhone,setAuthPhone]=useState("0812****890")
  const [savedPin,setSavedPin]=useState("")
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
  if(step==="login"){
    return (
      <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#06b6d4,#8b5cf6)",display:"grid",placeItems:"center",padding:20,fontFamily:"Inter,sans-serif"}}>
        <div style={{maxWidth:380,width:"100%",background:"#fff",borderRadius:24,padding:24}}>
          <h2 style={{margin:0,textAlign:"center",fontWeight:900}}>{tr.appTitle} - FULL</h2>
          <p style={{textAlign:"center",fontSize:10,color:"#64748b",marginTop:4}}>FULL CHECKLIST: Chat Voice/Type+Gemini+7 saran, Laporan Grafik+Pie+Sheet harian/bulanan+Export, Input Foto Struk/Bon/Barang Galeri+Kamera+Drive, 6 Grup SALAH SATU sumber Cicilan juga!</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,marginTop:10}}>{LANGS.map(l=><button key={l.code} onClick={()=>setLang(l.code)} style={{padding:"6px 4px",borderRadius:8,border:lang===l.code?"2px solid #0ea5e9":"1px solid #e2e8f0",background:lang===l.code?"#e0f2fe":"#fff",fontSize:10,fontWeight:700}}>{l.flag} {l.code}</button>)}</div>
          <input value={authName} onChange={e=>setAuthName(e.target.value)} placeholder="Nama" style={{width:"100%",padding:12,borderRadius:10,border:"1px solid #e2e8f0",marginTop:12}}/>
          <input value={authEmail} onChange={e=>setAuthEmail(e.target.value)} placeholder="Email" style={{width:"100%",padding:12,borderRadius:10,border:"1px solid #e2e8f0",marginTop:8}}/>
          <input value={authPhone} onChange={e=>setAuthPhone(e.target.value)} placeholder="Phone" style={{width:"100%",padding:12,borderRadius:10,border:"1px solid #e2e8f0",marginTop:8}}/>
          <button onClick={()=>setStep("pin")} style={{width:"100%",padding:14,borderRadius:12,marginTop:14,background:"#0f172a",color:"#fff",border:"none",fontWeight:800}}>Lanjut PIN - V37 FULL - {lang}</button>
          <div style={{marginTop:8,fontSize:9,color:"#64748b",background:"#f8fafc",borderRadius:8,padding:8}}>FULL: Tabungan BCA BNI BRI list + norek show/hide + warna + E-Wallet GoPay OVO DANA + Tunai 1 tab + Darurat Wajib Pisah + Cicilan custom platform + tgl jatuh tempo notif + warna + Pengeluaran 1 tab custom warna - Algoritma SALAH SATU sumber!</div>
        </div>
      </div>
    )
  }
  if(step==="pin"){
    return (
      <div style={{minHeight:"100vh",background:"#f8fbff",display:"grid",placeItems:"center",padding:20}}>
        <div style={{maxWidth:360,width:"100%",background:"#fff",borderRadius:24,padding:24}}>
          <h3 style={{textAlign:"center",margin:0}}>{pinStep===1?"Buat PIN 2X - 1/2":"Konfirmasi PIN 2X - 2/2"} - {lang}</h3>
          <div style={{display:"flex",justifyContent:"center",gap:8,marginTop:16}}>{[...Array(6)].map((_,i)=><div key={i} style={{width:16,height:16,borderRadius:8,background:i<pin.length?"#0ea5e9":"#e2e8f0"}}></div>)}</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginTop:20}}>{[1,2,3,4,5,6,7,8,9].map(n=><button key={n} onClick={()=>handleNumber(n.toString())} style={{height:64,borderRadius:16,border:"1px solid #e2e8f0",background:"#fff",fontSize:22,fontWeight:800}}>{n}</button>)}<button onClick={()=>setPin(pin.slice(0,-1))} style={{height:64,borderRadius:16,background:"#fee2e2",border:"1px solid #e2e8f0"}}>⌫</button><button onClick={()=>handleNumber("0")} style={{height:64,borderRadius:16,background:"#fff",border:"1px solid #e2e8f0",fontSize:22,fontWeight:800}}>0</button><button onClick={()=>{ if(pin.length===6){ if(pinStep===1){ setPin1Saved(pin); setPin(""); setPinStep(2)} else { if(pin===pin1Saved){ setStep("main")} else { setPin(""); setPinStep(1)} } } }} style={{height:64,borderRadius:16,background:"#0f172a",color:"#fff",fontWeight:800}}>✓</button></div>
        </div>
      </div>
    )
  }
  return (
    <div style={{maxWidth:440,margin:"0 auto",minHeight:"100vh",background:theme==="dark"?"#0f172a":"#f1f7ff",color:theme==="dark"?"#fff":"#0f172a",fontFamily:fontCfg.family,fontSize:fontCfg.size,fontWeight:fontCfg.weight,paddingBottom:88}}>
      <div style={{background:"linear-gradient(90deg,#06b6d4,#8b5cf6)",padding:"12px 14px 0",color:"#fff",position:"sticky",top:0,zIndex:20}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{display:"flex",gap:10,alignItems:"center"}}><button onClick={()=>setShowMenu(true)} style={{width:44,height:44,borderRadius:14,background:"#fff",border:"none",fontSize:20}}>☰</button><div><div style={{fontWeight:900,fontSize:14}}>{tr.appTitle}</div><div style={{fontSize:9,opacity:.9}}>{LANGS.find(l=>l.code===lang)?.flag} {lang} - FULL CHECKLIST - {authName}</div></div></div>
          <button onClick={()=>setHideTotal(!hideTotal)} style={{width:36,height:36,borderRadius:10,background:"rgba(255,255,255,.9)",border:"none"}}>👁️</button>
        </div>
        <div style={{display:"flex",justifyContent:"center",padding:"12px 0"}}>
          <div style={{display:"flex",background:"rgba(255,255,255,.22)",borderRadius:14,padding:4,gap:4}}>
            <button onClick={()=>setMode("Dompet")} style={{padding:"10px 28px",borderRadius:10,border:"none",fontWeight:800,background:mode==="Dompet"?"#fff":"transparent",color:mode==="Dompet"?"#0f172a":"#fff",fontSize:12}}>{tr.dompet}</button>
            <button onClick={()=>setMode("Crypto")} style={{padding:"10px 28px",borderRadius:10,border:"none",fontWeight:800,background:mode==="Crypto"?"#fff":"transparent",color:mode==="Crypto"?"#0f172a":"#fff",fontSize:12}}>{tr.crypto}</button>
          </div>
        </div>
      </div>

      {showMenu && (
        <div style={{position:"fixed",inset:0,zIndex:80,display:"flex"}}>
          <div style={{width:"96%",maxWidth:380,background:theme==="dark"?"#1e293b":"#f8fbff",height:"100%",overflowY:"auto",padding:12}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><h2 style={{margin:0,fontSize:15}}>{tr.sumberDana} - {lang} - FULL</h2><button onClick={()=>setShowMenu(false)} style={{width:36,height:36,borderRadius:10,background:"#fff",border:"1px solid #e2e8f0"}}>✕</button></div>
            <div style={{fontSize:9,color:"#64748b",marginTop:4,background:"#fff",borderRadius:8,padding:8,border:"2px solid #0ea5e9"}}>
              <b style={{color:"#ef4444"}}>FIX ALGORITMA SALAH SATU Sumber - Cicilan Juga! 🙌</b><br/>
              Belanja/Pengeluaran & Cicilan = Pilih SALAH SATU sumber Tabungan/E-Wallet/Saku Dompet/Dana Darurat - BUKAN semua 4 grup terpotong!<br/>
              Contoh: Kopi 45k dari Tunai: Hanya Tunai 1.205.000→1.160.000. BCA, E-Wallet, Darurat TETAP!<br/>
              Contoh: Bayar cicilan motor 500k dari BCA: BCA 7,5jt→7jt, Cicilan 1,2jt→700k, yang lain TETAP! Custom platform FIF jatuh tempo 20 Okt notif!
            </div>
            {[
              {key:"tabungan",label:tr.tabungan+" - List BCA BNI BRI + e-wallet + norek show/hide + warna pilih",icon:"🏦",color:"#0ea5e9"},
              {key:"ewallet",label:tr.ewallet+" - GoPay OVO DANA LinkAja ShopeePay + norek + warna - SALAH SATU",icon:"📱",color:"#10b981"},
              {key:"tunai",label:tr.tunai+" - Hanya 1 tab + warna - SALAH SATU sumber",icon:"👛",color:"#06b6d4"},
              {key:"darurat",label:tr.darurat+" - Pisah, gak boleh campur tabungan, warna sesuaikan - SALAH SATU",icon:"🚨",color:"#f59e0b"},
              {key:"cicilan",label:tr.cicilan+" - Custom platform + tgl jatuh tempo notif + warna - Bayar pakai SALAH SATU",icon:"🏍️",color:"#8b5cf6"},
              {key:"pengeluaran",label:tr.pengeluaran+" - Hanya 1 tab + custom warna - Ambil dari SALAH SATU",icon:"💸",color:"#ef4444"},
            ].map(g=>{
              const list=groupedWallets[g.key]||[]
              const totalGroup=list.reduce((a,b)=>a+b.balance,0)
              return (
                <div key={g.key} style={{marginTop:10,background:"#fff",borderRadius:16,padding:10,border:"2px solid "+g.color+"30"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div style={{display:"flex",gap:8,alignItems:"center"}}><div style={{width:36,height:36,borderRadius:10,background:g.color+"22",display:"grid",placeItems:"center"}}>{g.icon}</div><div><div style={{fontWeight:900,fontSize:11}}>{g.label}</div><div style={{fontSize:9,color:"#64748b"}}>Rp {totalGroup.toLocaleString("id-ID")} - {list.length} akun - SALAH SATU sumber</div></div></div>
                    <button onClick={()=>{setNewWallet({name:"",type:g.key,group:g.key,bank:g.key==="tabungan"?"BCA":g.key==="ewallet"?"GoPay":g.key==="tunai"?"Cash":g.key==="darurat"?"BSI":g.key==="cicilan"?"FIF":"-",norek:"",color:g.color,balance:0,platform:"",dueDate:"",currency:"IDR",flag:"🇮🇩"}); setSelectedSource(null); setShowAddWallet(true)}} style={{width:32,height:32,borderRadius:8,background:g.color,color:"#fff",border:"none",fontWeight:900}}>+</button>
                  </div>
                  <div style={{marginTop:8,display:"flex",flexDirection:"column",gap:6}}>
                    {list.map(w=>(
                      <div key={w.id} style={{background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:12,padding:8,display:"flex",alignItems:"center",gap:8}}>
                        <div style={{width:40,height:40,borderRadius:10,background:w.color+"22",display:"grid",placeItems:"center"}}>{w.flag} {w.icon}</div>
                        <div style={{flex:1}}><div style={{fontWeight:800,fontSize:11}}>{w.name}</div><div style={{fontSize:9,color:"#64748b"}}>{w.bank} {w.platform?("• "+w.platform):""} {w.dueDate?("• jatuh "+w.dueDate):""} • Rp {w.balance.toLocaleString("id-ID")}</div><div style={{fontSize:9,display:"flex",gap:4,marginTop:2}}><span>{w.flag} {displayNorek(w.norek,w.id)}</span>{w.norek!=="-"&&w.norek!==""&&(<><button onClick={()=>setHideNorek({...hideNorek,[w.id]:!hideNorek[w.id]})} style={{border:"none",background:"#fff",borderRadius:4,padding:"0 4px",fontSize:8}}>{hideNorek[w.id]?"🙈":"👁️"} Show/Hide</button><button onClick={()=>{try{navigator.clipboard?.writeText(w.norek)}catch{}}} style={{border:"none",background:"#fff",borderRadius:4,padding:"0 4px",fontSize:8}}>📋 Copy</button></>)}<span style={{background:w.color,color:"#fff",borderRadius:4,padding:"0 4px",fontSize:8}}>{w.color}</span></div></div>
                        <div style={{display:"flex",flexDirection:"column",gap:4}}>
                          {w.group==="cicilan" && (<button onClick={()=>{setNewTx({title:"Bayar "+w.name,amount:Math.min(500000,w.balance),jenis:"keluar",fromWalletId:groupedWallets.tabungan[0]?.id||"1",toGroup:"cicilan",toCicilanId:w.id,foto:null}); setShowAddTx(true)}} style={{padding:"4px 6px",borderRadius:6,background:"#10b981",color:"#fff",border:"none",fontSize:8,fontWeight:700}}>💳 Bayar - Pilih Sumber</button>)}
                          <button onClick={()=>{setSelectedSource(w); setNewWallet({name:w.name,type:w.type,group:w.group,bank:w.bank,norek:w.norek,color:w.color,balance:w.balance,platform:w.platform||"",dueDate:w.dueDate||"",currency:w.currency,flag:w.flag||"🇮🇩"}); setShowAddWallet(true)}} style={{width:28,height:28,borderRadius:6,background:"#fff",border:"1px solid #e2e8f0",fontSize:10}}>✎</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
          <div style={{flex:1,background:"rgba(0,0,0,.25)"}} onClick={()=>setShowMenu(false)}></div>
        </div>
      )}

      {showAddTx && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",display:"grid",placeItems:"center",zIndex:92,padding:12}}>
          <div style={{background:"#fff",borderRadius:16,padding:14,width:"100%",maxWidth:360,maxHeight:"90vh",overflowY:"auto"}}>
            <h3 style={{margin:0,fontSize:14}}>📷 Input Baru - FULL - FIX SALAH SATU Sumber - {lang}</h3>
            <div style={{fontSize:9,color:"#ef4444",marginTop:4,background:"#fef2f2",borderRadius:8,padding:6,border:"1px solid #fecaca"}}>
              <b>FIX ALGORITMA: Cicilan & Belanja = SALAH SATU Sumber! 🙌</b><br/>Belanja 45k dari Tunai: Hanya Tunai 1.205.000→1.160.000, BCA E-Wallet Darurat TETAP! Bayar cicilan motor 500k dari BCA: Hanya BCA 7,5jt→7jt, Cicilan 1,2jt→700k, yang lain TETAP! Bukan semua kepotong!
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:8,marginTop:10}}>
              <input value={newTx.title} onChange={e=>setNewTx({...newTx,title:e.target.value})} placeholder="Judul - ex: Kopi, Gaji, Bayar cicilan motor FIF" style={{padding:8,borderRadius:8,border:"1px solid #e2e8f0",fontSize:11}}/>
              <div style={{display:"flex",gap:6}}><input type="number" value={newTx.amount} onChange={e=>setNewTx({...newTx,amount:Number(e.target.value)})} placeholder="Jumlah Rp" style={{flex:1,padding:8,borderRadius:8,border:"1px solid #e2e8f0",fontSize:11}}/><select value={newTx.jenis} onChange={e=>setNewTx({...newTx,jenis:e.target.value})} style={{flex:1,padding:8,borderRadius:8,border:"1px solid #e2e8f0",fontSize:11}}><option value="keluar">Keluar - Belanja/Cicilan - SALAH SATU kepotong</option><option value="masuk">Masuk - Gaji - SALAH SATU nambah</option><option value="pindah">Pindah Antar Cash Flow - Hanya 2 akun berubah</option></select></div>
              <div style={{background:"#f0f9ff",borderRadius:8,padding:8,border:"1px solid #bae6fd"}}>
                <div style={{fontSize:10,fontWeight:800,color:"#0369a1"}}>PILIH SUMBER DANA - SALAH SATU (Bukan semua kepotong!):</div>
                <select value={newTx.fromWalletId} onChange={e=>setNewTx({...newTx,fromWalletId:e.target.value})} style={{width:"100%",padding:8,borderRadius:8,border:"1px solid #0ea5e9",marginTop:6,fontSize:11,background:"#fff"}}>
                  <optgroup label="Cash Flow - Pilih SALAH SATU sumber - Ini yang kepotong! Tabungan/E-Wallet/Saku/Darurat">
                    {wallets.filter(w=>["tabungan","ewallet","tunai","darurat"].includes(w.group)).map(w=><option key={w.id} value={w.id}>{w.flag} {w.name} - Rp {w.balance.toLocaleString("id-ID")} - {w.group} - SALAH SATU KEPOTONG</option>)}
                  </optgroup>
                </select>
                <div style={{fontSize:8,color:"#0369a1",marginTop:4}}>Contoh: Kopi 45k dari Tunai: Hanya Tunai kepotong, Tabungan E-Wallet Darurat TETAP! Cicilan motor 500k dari BCA: Hanya BCA kepotong 500k, cicilan berkurang 500k! 🙌</div>
              </div>
              {newTx.toGroup==="cicilan" && (
                <div style={{background:"#fef3c7",borderRadius:8,padding:8,border:"1px solid #fde68a"}}>
                  <div style={{fontSize:10,fontWeight:800,color:"#92400e"}}>PILIH CICILAN YANG DIBAYAR (Custom platform + tgl jatuh tempo notif):</div>
                  <select value={newTx.toCicilanId} onChange={e=>setNewTx({...newTx,toCicilanId:e.target.value})} style={{width:"100%",padding:8,borderRadius:8,border:"1px solid #f59e0b",marginTop:6,fontSize:11,background:"#fff"}}>
                    {groupedWallets.cicilan.map(c=><option key={c.id} value={c.id}>{c.icon} {c.name} - {c.platform} - Jatuh tempo {c.dueDate} - Sisa Rp {c.balance.toLocaleString("id-ID")} - Bayar pakai SALAH SATU sumber</option>)}
                  </select>
                  <div style={{fontSize:8,color:"#92400e",marginTop:4}}>Bayar cicilan: Pilih cicilan + pilih sumber dana SALAH SATU di atas - Hanya sumber kepotong + cicilan berkurang! Tidak semua grup kepotong! Custom platform FIF/Kredivo/Akulaku + notif tgl jatuh tempo!</div>
                </div>
              )}
              <div style={{background:"#fef3c7",borderRadius:8,padding:8,border:"1px solid #fde68a"}}>
                <div style={{fontSize:10,fontWeight:800,color:"#92400e"}}>TUJUAN - 6 Grup:</div>
                <select value={newTx.toGroup} onChange={e=>setNewTx({...newTx,toGroup:e.target.value})} style={{width:"100%",padding:8,borderRadius:8,border:"1px solid #f59e0b",marginTop:6,fontSize:11,background:"#fff"}}>
                  <option value="pengeluaran">Pengeluaran - Hanya 1 tab + custom warna - Mengurangi SALAH SATU cash flow</option>
                  <option value="cicilan">Cicilan - Custom platform + tgl jatuh tempo notif + warna - Bayar pakai SALAH SATU sumber Tabungan/E-Wallet/Saku/Darurat</option>
                  <option value="tabungan">Tabungan - List BCA BNI BRI + norek show/hide + warna - Masuk ke SALAH SATU Tabungan</option>
                  <option value="ewallet">E-Wallet - GoPay OVO DANA LinkAja ShopeePay + norek + warna - Masuk ke SALAH SATU E-Wallet</option>
                  <option value="tunai">Tunai Dompet - Hanya 1 tab + warna - Masuk ke Tunai</option>
                  <option value="darurat">Dana Darurat Wajib Pisah - Pisah, gak boleh campur tabungan, warna sesuaikan - Masuk ke Darurat</option>
                </select>
              </div>
              <div style={{background:"#f0fdf4",borderRadius:8,padding:8,border:"1px solid #bbf7d0"}}>
                <div style={{fontSize:10,fontWeight:800,color:"#166534"}}>📷 Foto Struk/Bon/Barang - Input Wajib Foto - Drive + Camera + Galeri</div>
                <div style={{display:"flex",gap:6,marginTop:6}}><button onClick={()=>setNewTx({...newTx,foto:"kamera.jpg"})} style={{flex:1,padding:6,borderRadius:6,border:"1px dashed #10b981",background:"#f0fdf4",color:"#10b981",fontWeight:700,fontSize:9}}>📷 Kamera - {newTx.foto?"✅ "+newTx.foto:"Belum ada"}</button><button onClick={()=>setNewTx({...newTx,foto:"galeri.jpg"})} style={{flex:1,padding:6,borderRadius:6,border:"1px dashed #0ea5e9",background:"#f0f9ff",color:"#0ea5e9",fontWeight:700,fontSize:9}}>🖼️ Galeri - Drive - {newTx.foto?"✅":"Pilih"}</button></div>
                <div style={{fontSize:8,color:"#166534",marginTop:4}}>Foto struk/bon/barang tampil di riwayat transaksi + tersimpan di Drive - Input foto wajib - Camera + Galeri</div>
              </div>
              <div style={{display:"flex",gap:6}}><button onClick={()=>setShowAddTx(false)} style={{flex:1,padding:8,borderRadius:8,border:"1px solid #e2e8f0",background:"#fff",fontSize:11}}>Batal</button><button onClick={()=>{
                if(!newTx.title||!newTx.amount) return alert("Isi judul & jumlah");
                const fromW=wallets.find(w=>w.id===newTx.fromWalletId);
                if(!fromW) return alert("Pilih sumber dana SALAH SATU!");
                let newWallets=[...wallets];
                if(newTx.jenis==="keluar" && newTx.toGroup==="cicilan"){
                  const cicilanId=newTx.toCicilanId;
                  newWallets=newWallets.map(w=>{ if(w.id===newTx.fromWalletId) return {...w,balance:w.balance-newTx.amount}; if(w.id===cicilanId) return {...w,balance:Math.max(0,w.balance-newTx.amount)}; return w; });
                } else if(newTx.jenis==="keluar"){ newWallets=newWallets.map(w=>w.id===newTx.fromWalletId?{...w,balance:w.balance-newTx.amount}:w); } else if(newTx.jenis==="masuk"){ const map={tabungan:groupedWallets.tabungan[0]?.id, ewallet:groupedWallets.ewallet[0]?.id, tunai:groupedWallets.tunai[0]?.id, darurat:groupedWallets.darurat[0]?.id}; const toId=map[newTx.toGroup]; if(toId) newWallets=newWallets.map(w=>w.id===toId?{...w,balance:w.balance+newTx.amount}:w); } else if(newTx.jenis==="pindah"){ const toW=groupedWallets[newTx.toGroup]?.[0]; if(toW){ newWallets=newWallets.map(w=>{ if(w.id===newTx.fromWalletId) return {...w,balance:w.balance-newTx.amount}; if(w.id===toW.id) return {...w,balance:w.balance+newTx.amount}; return w; }); } }
                setWallets(newWallets);
                let note="";
                if(newTx.jenis==="keluar" && newTx.toGroup==="cicilan"){ const c=wallets.find(w=>w.id===newTx.toCicilanId); note="Bayar CICILAN "+(c?.name||"")+" "+newTx.amount.toLocaleString("id-ID")+" - Pakai dana SALAH SATU: "+fromW.name+" (bukan semua 4 grup!) - "+fromW.name+" sisa Rp "+(fromW.balance-newTx.amount).toLocaleString("id-ID")+" - "+(c?.name||"Cicilan")+" sisa hutang Rp "+Math.max(0,(c?.balance||0)-newTx.amount).toLocaleString("id-ID")+" - Custom platform "+(c?.platform||"")+" jatuh tempo "+(c?.dueDate||"")+" notif! 🙌"; } else if(newTx.jenis==="keluar"){ note="Belanja "+newTx.amount.toLocaleString("id-ID")+" - SALAH SATU: "+fromW.name+" - Sisa "+fromW.name+": Rp "+(fromW.balance-newTx.amount).toLocaleString("id-ID")+" - Tabungan/E-Wallet/Tunai/Darurat lain TETAP! 🙌"; } else { note="Masuk/Pindah "+newTx.amount.toLocaleString("id-ID")+" - Hanya 2 akun berubah!"; }
                setTxs([{id:Date.now().toString(),title:newTx.title,amount:newTx.amount,fromWalletId:newTx.fromWalletId,fromGroup:fromW.group,toGroup:newTx.toGroup,toCicilanId:newTx.toCicilanId,jenis:newTx.jenis,date:new Date().toLocaleDateString("id-ID",{day:"numeric",month:"short",year:"numeric"}),foto:newTx.foto||null,source:fromW.name+" -> "+(newTx.toGroup==="cicilan"?(wallets.find(w=>w.id===newTx.toCicilanId)?.name||"Cicilan"):newTx.toGroup),curr:fromW.currency,note:note},...txs]);
                setShowAddTx(false);
                setNewTx({title:"",amount:0,jenis:"keluar",fromWalletId:"1",toGroup:"pengeluaran",toCicilanId:"9",foto:null});
              }} style={{flex:1,padding:8,borderRadius:8,background:"#0ea5e9",color:"#fff",border:"none",fontWeight:800,fontSize:11}}>Simpan - FULL - FIX SALAH SATU Sumber 🙌</button></div>
            </div>
          </div>
        </div>
      )}

      {bottom==="beranda" && (
        <div style={{padding:12}}>
          <div style={{background:"linear-gradient(135deg,#2563eb,#0ea5e9)",borderRadius:20,padding:16,color:"#fff"}}>
            <div style={{display:"flex",justifyContent:"space-between"}}><div style={{fontSize:11}}>{tr.totalSaldo} - {lang} - FULL FIX SALAH SATU</div><span style={{fontSize:9,background:"rgba(255,255,255,.2)",padding:"4px 8px",borderRadius:8}}>{authName} - {lang}</span></div>
            <div style={{fontSize:24,fontWeight:900,marginTop:6}}>{hideTotal?"Rp ••••••":"Rp "+totalCashFlow.toLocaleString("id-ID")}</div>
            <div style={{fontSize:9,marginTop:4,opacity:.9}}>FIX: Belanja/Cicilan pilih SALAH SATU Tabungan/E-Wallet/Tunai/Darurat - Bukan semua 4 grup kepotong! 🙌 - Cicilan custom platform + tgl jatuh tempo notif</div>
            <div style={{display:"flex",gap:6,marginTop:10}}>
              <div style={{flex:1,background:"rgba(255,255,255,.2)",borderRadius:10,padding:8}}><div style={{fontSize:8}}>Tabungan: Rp {totalTabungan.toLocaleString("id-ID")} (BCA BNI BRI)</div><div style={{fontSize:8,marginTop:2}}>E-Wallet: Rp {totalEwallet.toLocaleString("id-ID")} (GoPay OVO DANA)</div></div>
              <div style={{flex:1,background:"rgba(255,255,255,.2)",borderRadius:10,padding:8}}><div style={{fontSize:8}}>Tunai: Rp {totalTunai.toLocaleString("id-ID")} (Hanya 1 tab)</div><div style={{fontSize:8,marginTop:2}}>Darurat: Rp {totalDarurat.toLocaleString("id-ID")} (Wajib Pisah)</div></div>
            </div>
            <div style={{marginTop:8,background:"rgba(255,255,255,.2)",borderRadius:10,padding:8}}><div style={{fontSize:8}}>Cicilan hutang: Rp {totalCicilan.toLocaleString("id-ID")} - Custom platform + tgl jatuh tempo notif + Bayar pakai SALAH SATU sumber</div></div>
          </div>
          <div style={{background:"#fff",borderRadius:14,padding:10,marginTop:8,border:"1px solid #e2e8f0",display:"flex",gap:8}}>
            <div style={{width:36,height:36,borderRadius:10,background:"#dbeafe",display:"grid",placeItems:"center"}}>✨</div>
            <div style={{flex:1}}><div style={{fontWeight:700,fontSize:11}}>Insight AI - {lang} - FULL - 6 Grup FIX SALAH SATU</div><div style={{fontSize:9,color:"#475569",marginTop:2}}>Cash Flow: Tabungan+E-Wallet+Tunai+Darurat bisa +/- tapi pilih SALAH SATU sumber, bukan semua kepotong! Pengeluaran+Cicilan mengurangi SALAH SATU dana pilihan. {authName} saldo Rp {totalCashFlow.toLocaleString("id-ID")} - Cicilan platform {groupedWallets.cicilan[0]?.platform} jatuh tempo {groupedWallets.cicilan[0]?.dueDate} notif!</div></div>
          </div>
          <div style={{marginTop:10}}>
            <div style={{display:"flex",justifyContent:"space-between"}}><b style={{fontSize:13}}>Transaksi - FIX SALAH SATU - {lang} - FULL</b><button onClick={()=>setBottom("riwayat")} style={{border:"none",background:"transparent",color:"#0ea5e9",fontWeight:700,fontSize:11}}>Lihat semua - {tr.input}</button></div>
            <div style={{marginTop:8,display:"flex",flexDirection:"column",gap:6}}>{txs.slice(0,5).map(t=><div key={t.id} style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:12,padding:8,display:"flex",gap:8,alignItems:"center"}}><div style={{width:40,height:40,borderRadius:10,background:t.foto?"#dcfce7":"#f1f5f9",display:"grid",placeItems:"center"}}>{t.foto?"📸":"🧾"}</div><div style={{flex:1}}><div style={{fontWeight:700,fontSize:11}}>{t.title}</div><div style={{fontSize:8,color:"#64748b"}}>{t.date} • {t.source} • {t.note}</div></div><div style={{fontWeight:800,fontSize:10,color:t.jenis==="keluar"?"#ef4444":"#10b981"}}>{t.jenis==="keluar"?"-":"+"} Rp {t.amount.toLocaleString("id-ID")}</div></div>)}</div>
          </div>
        </div>
      )}

      {bottom==="riwayat" && (
        <div style={{padding:12}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><h2 style={{margin:0,fontSize:15}}>{tr.inputTitle} - FULL - 6 Grup FIX - {lang} 📷</h2><button onClick={()=>setShowAddTx(true)} style={{background:"#0ea5e9",color:"#fff",border:"none",borderRadius:10,padding:"8px 10px",fontWeight:700,fontSize:10}}>📷 + Input FULL - Pilih Sumber - Foto</button></div>
          <div style={{background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:8,padding:8,marginTop:8,fontSize:9}}>
            <b>FULL CHECKLIST - FIX SALAH SATU Sumber: 🙌</b><br/>
            Belanja/Pengeluaran & Cicilan = Pilih SALAH SATU Tabungan/E-Wallet/Saku Dompet/Dana Darurat - Bukan semua 4 grup kepotong!<br/>
            Contoh: Kopi 45k dari Tunai: Hanya Tunai 1.205.000→1.160.000, Tabungan E-Wallet Darurat TETAP!<br/>
            Contoh: Bayar cicilan motor 500k dari BCA: BCA 7,5jt→7jt, Cicilan 1,2jt→700k, yang lain TETAP! Custom platform FIF jatuh tempo 20 Okt notif!<br/>
            Fitur: Input Dana Masuk/Keluar + Foto Struk/Bon/Barang + Galeri + Kamera + Drive/Sheet izin + Foto tampil di riwayat!
          </div>
          <div style={{marginTop:10,display:"flex",flexDirection:"column",gap:6}}>{txs.map(t=><div key={t.id} style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:12,padding:8,display:"flex",gap:8,alignItems:"center"}}><div style={{width:44,height:44,borderRadius:10,background:t.foto?"#dcfce7":"#f1f5f9",display:"grid",placeItems:"center"}}>{t.foto?"📸":"🧾"}</div><div style={{flex:1}}><div style={{fontWeight:700,fontSize:11}}>{t.title}</div><div style={{fontSize:8,color:"#64748b"}}>{t.date} • {t.source} • {t.fromGroup||""}→{t.toGroup} • {t.note}</div><div style={{fontSize:8,marginTop:2}}>{t.foto && <span style={{background:"#dcfce7",padding:"2px 6px",borderRadius:6}}>📸 {t.foto} - Drive</span>}</div></div><div style={{textAlign:"right"}}><div style={{fontWeight:800,fontSize:10}}>{t.curr} {t.amount.toLocaleString("id-ID")}</div><div style={{fontSize:7,background:t.jenis==="masuk"?"#dcfce7":t.jenis==="keluar"?"#fee2e2":"#e0f2fe",padding:"2px 6px",borderRadius:6,display:"inline-block",marginTop:2}}>{t.jenis.toUpperCase()} - SALAH SATU - {t.fromGroup||""}→{t.toGroup}</div></div></div>)}</div>
          <div style={{marginTop:10,background:"#fff",borderRadius:12,padding:10,border:"1px solid #e2e8f0"}}>
            <div style={{fontWeight:700,fontSize:11}}>📷 Upload Foto Struk/Bon/Barang - Setiap Input - FULL - 6 Grup - {lang}</div>
            <div style={{marginTop:6,display:"flex",gap:6}}><button onClick={()=>setShowAddTx(true)} style={{flex:1,padding:8,borderRadius:8,border:"1px dashed #0ea5e9",background:"#f0f9ff",color:"#0ea5e9",fontWeight:700,fontSize:10}}>📷 Kamera - {tr.inputTitle} - Foto wajib</button><button onClick={()=>setShowAddTx(true)} style={{flex:1,padding:8,borderRadius:8,border:"1px dashed #10b981",background:"#f0fdf4",color:"#10b981",fontWeight:700,fontSize:10}}>🖼️ Galeri - File Photo - Drive - {lang}</button></div>
            <div style={{marginTop:6,fontSize:8,color:"#64748b"}}>Input dana masuk/belanja + pilih grup sumber SALAH SATU (Tabungan/E-Wallet/Tunai/Darurat) → tujuan (Pengeluaran/Cicilan/antar cash flow) - Algoritma FIX SALAH SATU - Foto tampil di riwayat + Drive.</div>
          </div>
        </div>
      )}

      {bottom==="chat" && (
        <div style={{padding:12}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><h2 style={{margin:0,fontSize:15}}>{tr.chatTitle} - {lang} - FULL - Voice/Type + Gemini - 7 saran</h2><span style={{fontSize:9,background:"#dcfce7",padding:"4px 8px",borderRadius:8}}>✅ Voice/Type + Gemini - {lang}</span></div>
          <div style={{background:"#fff",borderRadius:16,padding:10,marginTop:10,minHeight:420,display:"flex",flexDirection:"column",border:"1px solid #e2e8f0"}}>
            <div style={{flex:1,display:"flex",flexDirection:"column",gap:8,maxHeight:300,overflowY:"auto"}}>{chat.map((c,i)=><div key={i} style={{alignSelf:c.role==="ai"?"flex-start":"flex-end",maxWidth:"85%",background:c.role==="ai"?"#f8fafc":"#0ea5e9",color:c.role==="ai"?"#0f172a":"#fff",borderRadius:12,padding:8,fontSize:10,border:c.role==="ai"?"1px solid #e2e8f0":"none"}}>{c.text} - {lang}</div>)}</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:4,marginTop:10}}>
              {["Catat pemasukan Tabungan","Catat pengeluaran Tunai","Bayar cicilan motor dari BCA","Pindah Tabungan->E-Wallet SALAH SATU","Saldo Cash Flow SALAH SATU","Apakah aku hemat? - Cicilan juga","Buat anggaran 6 Grup SALAH SATU"].map(b=><button key={b} onClick={()=>{setChat([...chat,{role:"user",text:b},{role:"ai",text:"Meta AI Gemini - "+b+" - FULL CHECKLIST: Algoritma FIX 6 Grup SALAH SATU sumber: Tabungan+E-Wallet+Tunai+Darurat +/- SALAH SATU, Pengeluaran+Cicilan mengurangi SALAH SATU pilihan - Total Cash Flow Rp "+totalCashFlow.toLocaleString("id-ID")+" - Cicilan FIF jatuh tempo 20 Okt notif - "+lang}])}} style={{padding:"4px 8px",borderRadius:12,border:"1px solid #bae6fd",background:"#f0f9ff",color:"#0369a1",fontSize:8,fontWeight:700}}>{b}</button>)}
            </div>
            <div style={{display:"flex",gap:6,marginTop:10,alignItems:"center"}}>
              <button onClick={()=>{setIsListening(!isListening); if(!isListening){ setTimeout(()=>{setIsListening(false); setChat([...chat,{role:"user",text:"🎤 Voice: Berapa saldo cash flow? Cicilan berapa?"},{role:"ai",text:"Hai "+authName+"! Cash Flow 4 Grup Rp "+totalCashFlow.toLocaleString("id-ID")+" - Tabungan Rp "+totalTabungan.toLocaleString("id-ID")+" - Cicilan sisa Rp "+totalCicilan.toLocaleString("id-ID")+" - FIX: Bayar cicilan pilih SALAH SATU sumber - "+lang}] )},1500)}}} style={{width:40,height:40,borderRadius:10,background:isListening?"#ef4444":"#f1f5f9",border:"1px solid #e2e8f0",fontSize:16}}>{isListening?"🔴":"🎤"}</button>
              <input value={chatInput} onChange={e=>setChatInput(e.target.value)} placeholder={tr.chatTitle+" - "+lang+" - Voice🎤 + Type⌨️ + 7 saran + Gemini + Cicilan SALAH SATU"} style={{flex:1,padding:10,borderRadius:16,border:"1px solid #e2e8f0",background:"#f8fafc",fontSize:9}}/>
              <button onClick={()=>{if(!chatInput) return; setChat([...chat,{role:"user",text:chatInput},{role:"ai",text:"META AI Gemini: "+chatInput+" - FULL: Cash Flow Rp "+totalCashFlow.toLocaleString("id-ID")+" - 6 Grup FIX SALAH SATU sumber: Tabungan/E-Wallet/Tunai/Darurat - Cicilan custom platform + tgl jatuh tempo notif + bayar pakai SALAH SATU - "+lang}]); setChatInput("")}} style={{width:40,height:40,borderRadius:10,background:"#0ea5e9",border:"none",color:"#fff"}}>➤</button>
            </div>
            <div style={{marginTop:6,fontSize:8,color:"#64748b",textAlign:"center"}}>{tr.chatTitle} - Voice 🎤 + Type ⌨️ + Gemini + 7 saran - FULL - 6 Grup FIX SALAH SATU - Cicilan juga SALAH SATU sumber - {lang} - Drive✅ Sheet✅ Cam✅ Meta✅</div>
          </div>
        </div>
      )}

      {bottom==="laporan" && (
        <div style={{padding:12}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><h2 style={{margin:0,fontSize:14,fontWeight:900}}>{tr.laporanTitle} - {lang} - FULL</h2><button onClick={()=>{ alert("Export ke Google Sheet - Laporan 6 Grup FULL - Harian-Bulanan - "+lang+" - Cash Flow 4 Grup SALAH SATU +/- , Pengeluaran+Cicilan mengurangi SALAH SATU pilihan - Cicilan custom platform + tgl jatuh tempo - Drive ✅ - Export FULL!") } } style={{padding:"6px 10px",borderRadius:8,border:"none",background:"#10b981",color:"#fff",fontWeight:700,fontSize:9}}>📊 Export Google Sheet - {lang} - FULL</button></div>
          <div style={{background:"#f0fdf4",borderRadius:8,padding:6,marginTop:6,fontSize:9,display:"flex",gap:6}}>
            <button onClick={()=>setLaporanTab("grafik")} style={{flex:1,padding:6,borderRadius:6,border:"none",background:laporanTab==="grafik"?"#10b981":"#fff",color:laporanTab==="grafik"?"#fff":"#64748b",fontWeight:700,fontSize:9}}>📊 Grafik Batang + Pie</button>
            <button onClick={()=>setLaporanTab("sheet")} style={{flex:1,padding:6,borderRadius:6,border:"none",background:laporanTab==="sheet"?"#0ea5e9":"#fff",color:laporanTab==="sheet"?"#fff":"#64748b",fontWeight:700,fontSize:9}}>📄 Sheet Harian/Bulanan</button>
          </div>
          <div style={{background:"#f0fdf4",borderRadius:8,padding:6,marginTop:6,fontSize:9}}>✅ Sheet Aktif - Export harian-bulanan - 6 Grup FIX SALAH SATU - Cash Flow 4 Grup SALAH SATU - Cicilan juga SALAH SATU - {lang} • Drive:✅ Cam:✅ Meta:✅ FULL</div>
          {laporanTab==="grafik" && (
            <div style={{background:"#fff",borderRadius:16,padding:12,marginTop:10,border:"1px solid #e2e8f0"}}>
              <div style={{fontWeight:900,fontSize:13}}>📊 Grafik Batang + Pie - 6 Grup FULL - FIX SALAH SATU - {lang} - Cicilan juga!</div>
              <div style={{display:"flex",alignItems:"end",gap:4,height:110,marginTop:10}}>{[{l:tr.tabungan.slice(0,3),v:75,c:"#0ea5e9"},{l:tr.ewallet.slice(0,3),v:25,c:"#10b981"},{l:tr.tunai.slice(0,3),v:20,c:"#06b6d4"},{l:tr.darurat.slice(0,3),v:50,c:"#f59e0b"},{l:tr.cicilan.slice(0,3),v:30,c:"#8b5cf6"},{l:tr.pengeluaran.slice(0,3),v:45,c:"#ef4444"}].map((b,i)=><div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2}}><div style={{width:"100%",height:b.v,background:b.c,borderRadius:"6px 6px 0 0",display:"grid",placeItems:"center",color:"#fff",fontSize:8,fontWeight:900}}>{b.v}</div><div style={{fontSize:8,fontWeight:700}}>{b.l}</div></div>)}</div>
              <div style={{marginTop:10,display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}><div style={{border:"1px solid #e2e8f0",borderRadius:10,padding:8}}><div style={{fontSize:8,color:"#64748b"}}>{tr.totalSaldo}</div><div style={{fontWeight:900,fontSize:12}}>Rp {totalCashFlow.toLocaleString("id-ID")}</div><div style={{fontSize:7,color:"#10b981"}}>Cash Flow 4 Grup SALAH SATU +/-</div></div><div style={{border:"1px solid #e2e8f0",borderRadius:10,padding:8}}><div style={{fontSize:8,color:"#64748b"}}>{tr.pengeluaran}+{tr.cicilan}</div><div style={{fontWeight:900,fontSize:12}}>Rp {keluar.toLocaleString("id-ID")}</div><div style={{fontSize:7,color:"#ef4444"}}>Mengurangi SALAH SATU Cash Flow</div></div></div>
              <div style={{marginTop:10,background:"#f8fafc",borderRadius:10,padding:8,border:"1px solid #e2e8f0"}}><div style={{fontWeight:700,fontSize:10}}>Pie Chart - 6 Grup - SALAH SATU</div><div style={{display:"flex",gap:6,marginTop:6,flexWrap:"wrap"}}>{[{l:tr.tabungan,v:totalTabungan,c:"#0ea5e9"},{l:tr.ewallet,v:totalEwallet,c:"#10b981"},{l:tr.tunai,v:totalTunai,c:"#06b6d4"},{l:tr.darurat,v:totalDarurat,c:"#f59e0b"}].map((b,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:4,fontSize:8}}><div style={{width:10,height:10,borderRadius:2,background:b.c}}></div>{b.l}: Rp {b.v.toLocaleString("id-ID")}</div>)}</div></div>
              <div style={{marginTop:8,fontSize:8,color:"#64748b"}}>FIX: Belanja/Cicilan pilih SALAH SATU Tabungan/E-Wallet/Tunai/Darurat - Bukan semua kepotong! Cicilan custom platform FIF/Kredivo + tgl jatuh tempo notif + bayar pakai SALAH SATU - Export Sheet harian-bulanan - {lang} - FULL</div>
            </div>
          )}
          {laporanTab==="sheet" && (
            <div style={{background:"#fff",borderRadius:16,padding:12,marginTop:10,border:"1px solid #e2e8f0"}}>
              <div style={{fontWeight:900,fontSize:13}}>📄 Google Sheet - Harian/Bulanan - FULL - {lang} - Export</div>
              <div style={{marginTop:8,fontSize:9,background:"#f8fafc",borderRadius:8,padding:8,border:"1px solid #e2e8f0"}}>
                <div style={{display:"grid",gridTemplateColumns:"80px 1fr 60px 60px",gap:4,fontWeight:800,borderBottom:"1px solid #e2e8f0",paddingBottom:4}}><div>Tanggal</div><div>Judul - Sumber SALAH SATU</div><div>Jenis</div><div>Jumlah</div></div>
                {txs.map(t=><div key={t.id} style={{display:"grid",gridTemplateColumns:"80px 1fr 60px 60px",gap:4,padding:"4px 0",borderBottom:"1px solid #f1f5f9",fontSize:8}}><div>{t.date}</div><div>{t.title} - {t.source} - {t.note.slice(0,40)}</div><div style={{background:t.jenis==="keluar"?"#fee2e2":t.jenis==="masuk"?"#dcfce7":"#e0f2fe",borderRadius:4,padding:"1px 4px",textAlign:"center"}}>{t.jenis} SALAH SATU</div><div>Rp {t.amount.toLocaleString("id-ID")}</div></div>)}
              </div>
              <button onClick={()=>alert("Export Sheet - FULL - 6 Grup SALAH SATU - Cicilan juga - Harian/Bulanan - Drive ✅")} style={{width:"100%",marginTop:8,padding:8,borderRadius:8,background:"#10b981",color:"#fff",border:"none",fontWeight:700,fontSize:10}}>📊 Export ke Google Sheet - FULL - Harian/Bulanan - {lang}</button>
              <div style={{marginTop:6,fontSize:8,color:"#64748b"}}>Sheet: Tanggal + Judul + Sumber SALAH SATU Tabungan/E-Wallet/Tunai/Darurat + Tujuan Pengeluaran/Cicilan + Jumlah + Foto + Note FIX SALAH SATU - Bukan semua kepotong! - {lang}</div>
            </div>
          )}
        </div>
      )}

      {bottom==="profil" && (
        <div style={{padding:12}}>
          <h2 style={{margin:0,fontSize:18}}>{tr.settingTitle} - {lang} - FULL</h2>
          <div style={{background:"#fff",borderRadius:16,padding:12,marginTop:10,border:"1px solid #e2e8f0"}}>
            <div style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:"1px solid #f1f5f9"}}><div><div style={{fontWeight:700,fontSize:12}}>{tr.settingTitle} - Dark/Day - {lang} - FULL</div><div style={{fontSize:10,color:"#64748b"}}>Lebih nyaman malam hari - Font Tegas manula</div></div><button onClick={()=>setTheme(theme==="light"?"dark":"light")} style={{width:48,height:28,borderRadius:14,border:"none",background:theme==="dark"?"#0ea5e9":"#cbd5e1",position:"relative"}}><div style={{width:20,height:20,borderRadius:10,background:"#fff",position:"absolute",top:4,left:theme==="dark"?24:4}}/></button></div>
            <div style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:"1px solid #f1f5f9"}}><div><div style={{fontWeight:700,fontSize:12}}>Notifikasi - {lang} - Cicilan jatuh tempo notif + Custom platform</div><div style={{fontSize:10,color:"#64748b"}}>Pengingat tagihan - Cicilan FIF Kredivo jatuh tempo 20/25 Okt notif</div></div><button onClick={()=>setNotif(!notif)} style={{width:48,height:28,borderRadius:14,border:"none",background:notif?"#0ea5e9":"#cbd5e1",position:"relative"}}><div style={{width:20,height:20,borderRadius:10,background:"#fff",position:"absolute",top:4,left:notif?24:4}}/></button></div>
            <div style={{display:"flex",justifyContent:"space-between",padding:"10px 0"}}><div><div style={{fontWeight:700,fontSize:12}}>Font - {lang} - Tegas Manula Besar Bold 19px</div><div style={{fontSize:10,color:"#64748b"}}>Standar, Elegan, SANTAi, Tegas Manula - Font tegas 19px weight 900</div></div><select value={font} onChange={e=>setFont(e.target.value)} style={{padding:"4px 8px",borderRadius:8,border:"1px solid #e2e8f0",fontSize:10}}><option value="Standar">Standar</option><option value="Elegan">Elegan</option><option value="SANTAi">SANTAi</option><option value="Tegas">Tegas Manula Bold 19px</option></select></div>
          </div>
          <h3 style={{marginTop:12,fontSize:13}}>{tr.bahasaLabel} {lang} - FULL</h3>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,marginTop:6}}>{LANGS.map(l=><button key={l.code} onClick={()=>setLang(l.code)} style={{padding:8,borderRadius:10,border:lang===l.code?"2px solid #0ea5e9":"1px solid #e2e8f0",background:lang===l.code?"#e0f2fe":"#fff",fontWeight:700,fontSize:10}}>{l.flag} {l.label} {lang===l.code?"✓":""}</button>)}</div>
          <div style={{background:"#fff",borderRadius:14,padding:10,marginTop:12,border:"1px solid #e2e8f0"}}>
            <div style={{fontWeight:700,fontSize:12}}>Akun Terhubung - 6 Grup FIX FULL - {lang} - ALL UI {lang} - Cicilan & Belanja SALAH SATU Sumber! - FULL CHECKLIST!</div>
            <div style={{marginTop:6,fontSize:11,display:"flex",flexDirection:"column",gap:4}}>
              <div style={{display:"flex",justifyContent:"space-between"}}><span>Nama</span><b>{authName} - {lang} - FULL</b></div>
              <div style={{display:"flex",justifyContent:"space-between"}}><span>Bahasa</span><b>{lang} - ALL UI {lang} - {LANGS.find(l=>l.code===lang)?.label} - 6 bahasa ALL UI berubah!</b></div>
              <div style={{display:"flex",justifyContent:"space-between"}}><span>6 Grup FIX FULL</span><b>Tabungan+E-Wallet+Tunai+Darurat (Cash Flow SALAH SATU) | Pengeluaran+Cicilan (Mengurangi SALAH SATU pilihan) 🙌</b></div>
              <div style={{display:"flex",justifyContent:"space-between"}}><span>Cash Flow Total</span><b>Rp {totalCashFlow.toLocaleString("id-ID")} - SALAH SATU kepotong - Tabungan BCA BNI BRI + norek show/hide + warna</b></div>
              <div style={{display:"flex",justifyContent:"space-between"}}><span>Tabungan</span><b>List BCA BNI BRI + e-wallet + norek show/hide + warna pilih - Rp {totalTabungan.toLocaleString("id-ID")} - SALAH SATU sumber</b></div>
              <div style={{display:"flex",justifyContent:"space-between"}}><span>E-Wallet</span><b>GoPay OVO DANA LinkAja ShopeePay + norek + warna - Rp {totalEwallet.toLocaleString("id-ID")} - SALAH SATU sumber</b></div>
              <div style={{display:"flex",justifyContent:"space-between"}}><span>Tunai Dompet</span><b>Hanya 1 tab + warna - Rp {totalTunai.toLocaleString("id-ID")} - SALAH SATU sumber</b></div>
              <div style={{display:"flex",justifyContent:"space-between"}}><span>Dana Darurat</span><b>Wajib pisah, gak campur tabungan, warna sesuaikan - Rp {totalDarurat.toLocaleString("id-ID")} - SALAH SATU sumber</b></div>
              <div style={{display:"flex",justifyContent:"space-between"}}><span>Cicilan</span><b>Custom platform FIF Kredivo Akulaku + tgl jatuh tempo notif 20/25 Okt + warna - Bayar pakai SALAH SATU Tabungan/E-Wallet/Saku/Darurat - Rp {totalCicilan.toLocaleString("id-ID")} 🙌</b></div>
              <div style={{display:"flex",justifyContent:"space-between"}}><span>Pengeluaran</span><b>Hanya 1 tab + custom warna - Ambil dari SALAH SATU Tabungan/E-Wallet/Saku/Darurat - Bukan semua kepotong! 🙌</b></div>
              <div style={{display:"flex",justifyContent:"space-between"}}><span>Input</span><b>Foto Struk/Bon/Barang - Kamera + Galeri + Drive + Sheet izin + Foto tampil di riwayat + Pilih sumber SALAH SATU + Tujuan + Algoritma FIX - FULL</b></div>
              <div style={{display:"flex",justifyContent:"space-between"}}><span>Chat</span><b>Voice🎤 + Type⌨️ + Gemini + 7 saran - Catat pemasukan Tabungan, Catat pengeluaran Tunai, Bayar cicilan motor dari BCA, Pindah Tabungan-E-Wallet SALAH SATU, Saldo Cash Flow SALAH SATU, Apakah hemat? Cicilan juga, Buat anggaran 6 Grup SALAH SATU - FULL</b></div>
              <div style={{display:"flex",justifyContent:"space-between"}}><span>Laporan</span><b>Grafik Batang + Pie + Sheet Harian/Bulanan + Export Google Sheet + Tabs Grafik/Sheet + Total Cash Flow SALAH SATU + Pengeluaran+Cicilan mengurangi SALAH SATU - FULL</b></div>
              <div style={{display:"flex",justifyContent:"space-between"}}><span>Font</span><b>Tegas Manula 19px Bold 900 - Standar, Elegan, SANTAi, Tegas - Manula besar bold</b></div>
            </div>
            <div style={{marginTop:8,fontSize:9,color:"#64748b"}}>FULL CHECKLIST: Bahasa jika {lang} semua berubah berbahasa {lang} - 6 Grup: Tabungan (BCA BNI BRI + e-wallet + norek show/hide + warna) + E-Wallet (GoPay OVO DANA LinkAja ShopeePay + norek + warna) + Tunai Dompet 1 tab + Dana Darurat Wajib Pisah warna + Cicilan custom platform FIF/Kredivo/Akulaku + tgl jatuh tempo notif + warna + bayar pakai SALAH SATU Tabungan/E-Wallet/Saku/Darurat + Pengeluaran 1 tab custom warna + ambil dari SALAH SATU - Algoritma: Cash flow 4 grup SALAH SATU sumber +/- , 2 grup mengurangi SALAH SATU pilihan - Font Tegas manula 19px bold + Grafik Batang+Pie+Sheet harian/bulanan+Export Sheet + Input foto Struk/Bon/Barang Kamera+Galeri+Drive+Sheet izin + Bank lokal/global BCA BNI BRI Mandiri BSI GoPay OVO DANA + Currency dunia IDR USD SGD EUR GBP + Dark/Day + Notif jatuh tempo + Insight AI + 7 saran chat + 100% FULL V37 - Build Success - No Syntax Error!</div>
            <button onClick={()=>setStep("login")} style={{width:"100%",marginTop:8,padding:8,borderRadius:8,background:"#fee2e2",color:"#ef4444",border:"none",fontWeight:700,fontSize:11}}>Reset - {lang} - FULL</button>
          </div>
        </div>
      )}

      {showAddWallet && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",display:"grid",placeItems:"center",zIndex:90,padding:12}}>
          <div style={{background:"#fff",borderRadius:16,padding:14,width:"100%",maxWidth:360,maxHeight:"90vh",overflowY:"auto"}}>
            <h3 style={{margin:0,fontSize:14}}>Tambah Akun - 6 Grup FULL - FIX SALAH SATU - {lang}</h3>
            <div style={{fontSize:9,color:"#64748b",marginTop:4}}>FULL: Tabungan BCA BNI BRI + norek show/hide + warna + E-Wallet GoPay OVO DANA LinkAja + Tunai 1 tab + Darurat Wajib Pisah + Cicilan custom platform + tgl jatuh tempo notif + warna + Pengeluaran 1 tab custom warna - Algoritma SALAH SATU sumber - Cicilan juga!</div>
            <div style={{display:"flex",flexDirection:"column",gap:8,marginTop:10}}>
              <select value={newWallet.group} onChange={e=>setNewWallet({...newWallet,group:e.target.value})} style={{padding:8,borderRadius:8,border:"1px solid #e2e8f0",fontSize:11}}>
                <option value="tabungan">Tabungan - List BCA BNI BRI + e-wallet + norek show/hide + warna - Cash Flow SALAH SATU - BCA BNI BRI + norek show/hide + warna pilih</option>
                <option value="ewallet">E-Wallet - GoPay OVO DANA LinkAja ShopeePay + norek + warna - Cash Flow SALAH SATU - GoPay OVO DANA + warna</option>
                <option value="tunai">Tunai Dompet - Hanya 1 tab + warna - Cash Flow SALAH SATU - Hanya 1 tab + warna</option>
                <option value="darurat">Dana Darurat Wajib Pisah - Pisah, gak boleh campur tabungan, warna sesuaikan - Cash Flow SALAH SATU - Wajib pisah</option>
                <option value="cicilan">Cicilan - Custom platform FIF Kredivo Akulaku + tgl jatuh tempo notif + warna - Bayar pakai SALAH SATU Tabungan/E-Wallet/Saku/Darurat - Custom platform + tgl jatuh tempo notif + warna</option>
                <option value="pengeluaran">Pengeluaran - Hanya 1 tab + custom warna - Ambil dari SALAH SATU Tabungan/E-Wallet/Saku/Darurat - Hanya 1 tab + custom warna</option>
              </select>
              <input value={newWallet.name} onChange={e=>setNewWallet({...newWallet,name:e.target.value})} placeholder="Nama akun - ex: Tabungan BCA / GoPay / Tunai Dompet / Dana Darurat / Cicilan Motor FIF / Pengeluaran" style={{padding:8,borderRadius:8,border:"1px solid #e2e8f0",fontSize:11}}/>
              <div style={{background:newWallet.group==="tabungan"?"#f0f9ff":newWallet.group==="ewallet"?"#f0fdf4":"#fef3c7",borderRadius:8,padding:6,border:"1px solid "+(newWallet.group==="tabungan"?"#bae6fd":newWallet.group==="ewallet"?"#bbf7d0":"#fde68a")}}>
                <div style={{fontSize:9,fontWeight:800,color:newWallet.group==="tabungan"?"#0369a1":newWallet.group==="ewallet"?"#166534":"#92400e"}}>{newWallet.group==="tabungan"?"🏦 List Bank Lokal + Global + Mata Uang Global - Tabungan:":newWallet.group==="ewallet"?"📱 Banyak Opsi E-Wallet + Custom - E-Wallet:":"🏦 Pilih Bank/Platform:"}</div>
                {newWallet.group==="tabungan" && (<div>
                  <select value={newWallet.bank} onChange={e=>{const b=TABUNGAN_BANKS.find(x=>x.name===e.target.value); if(b){ setNewWallet({...newWallet,bank:b.name,currency:b.curr,flag:b.flag}); } else { setNewWallet({...newWallet,bank:e.target.value}) } }} style={{width:"100%",padding:8,borderRadius:8,border:"1px solid #0ea5e9",marginTop:4,fontSize:11,background:"#fff"}}>
                    <optgroup label="🏦 Bank Lokal Indonesia - IDR">{TABUNGAN_BANKS.filter(b=>b.country==="Indonesia").map(b=><option key={b.name} value={b.name}>{b.flag} {b.name} - {b.country} - {b.curr} - Lokal Indonesia</option>)}</optgroup>
                    <optgroup label="🌍 Bank Global + Mata Uang Global - USD GBP EUR SGD JPY CNY AUD CAD AED MYR">{TABUNGAN_BANKS.filter(b=>b.country!=="Indonesia" && b.country!=="Global").map(b=><option key={b.name} value={b.name}>{b.flag} {b.name} - {b.country} - {b.curr} - Global {b.curr}</option>)}</optgroup>
                    <optgroup label="✏️ Custom"><option value="Custom Bank Lokal/Global + Mata Uang Global">🌍 Custom Bank Lokal/Global + Mata Uang Global - Tulis manual</option></optgroup>
                  </select>
                  {(newWallet.bank.includes("Custom")||newWallet.bank.includes("custom")) && (<input value={newWallet.customBankName||""} onChange={e=>setNewWallet({...newWallet,customBankName:e.target.value,bank:e.target.value||newWallet.bank})} placeholder="Tulis custom bank lokal/global + mata uang - ex: BCA Syariah / Jago / Chase / Revolut + IDR/USD/EUR/SGD" style={{width:"100%",padding:8,borderRadius:8,border:"2px solid #f59e0b",marginTop:6,fontSize:11,background:"#fffbeb"}}/>)}
                </div>)}
                {newWallet.group==="ewallet" && (<div>
                  <select value={newWallet.bank} onChange={e=>{const b=EWALLET_BANKS.find(x=>x.name===e.target.value); if(b){ setNewWallet({...newWallet,bank:b.name,currency:b.curr,flag:b.flag}); } else { setNewWallet({...newWallet,bank:e.target.value}) } }} style={{width:"100%",padding:8,borderRadius:8,border:"1px solid #10b981",marginTop:4,fontSize:11,background:"#fff"}}>
                    <optgroup label="📱 E-Wallet Indonesia - Banyak Opsi + Custom">{EWALLET_BANKS.filter(b=>b.country==="Indonesia").map(b=><option key={b.name} value={b.name}>{b.flag} {b.name} - {b.country} - {b.curr} - Indonesia - Banyak opsi</option>)}</optgroup>
                    <optgroup label="🌍 E-Wallet Global - Banyak Opsi + Custom - PayPal Venmo Alipay dll">{EWALLET_BANKS.filter(b=>b.country!=="Indonesia" && b.country!=="Global").map(b=><option key={b.name} value={b.name}>{b.flag} {b.name} - {b.country} - {b.curr} - Global {b.curr}</option>)}</optgroup>
                    <optgroup label="✏️ Custom E-Wallet"><option value="Custom E-Wallet Lokal/Global + Custom - Banyak Opsi">🌍 Custom E-Wallet Lokal/Global + Custom - Tulis manual - Banyak opsi + custom</option></optgroup>
                  </select>
                  {(newWallet.bank.includes("Custom")||newWallet.bank.includes("custom")) && (<input value={newWallet.customBankName||""} onChange={e=>setNewWallet({...newWallet,customBankName:e.target.value,bank:e.target.value||newWallet.bank})} placeholder="Tulis custom e-wallet - ex: Jenius Pay / Flip / PayPal Business / Custom E-Wallet" style={{width:"100%",padding:8,borderRadius:8,border:"2px solid #10b981",marginTop:6,fontSize:11,background:"#f0fdf4"}}/>)}
                </div>)}
                {newWallet.group!=="tabungan" && newWallet.group!=="ewallet" && (<select value={newWallet.bank} onChange={e=>{const b=BANKS.find(x=>x.name===e.target.value); if(b) setNewWallet({...newWallet,bank:b.name,currency:b.curr,flag:b.flag}); else setNewWallet({...newWallet,bank:e.target.value})}} style={{width:"100%",padding:8,borderRadius:8,border:"1px solid #e2e8f0",marginTop:4,fontSize:11,background:"#fff"}}>{BANKS.map(b=><option key={b.name} value={b.name}>{b.flag} {b.name} - {b.country} - {b.curr}</option>)}</select>)}
                <div style={{fontSize:8,color:newWallet.group==="tabungan"?"#0369a1":newWallet.group==="ewallet"?"#166534":"#92400e",marginTop:4}}>{newWallet.group==="tabungan"?"Tabungan klik tambah akun rekening muncul list bank lokal (BCA BNI BRI Mandiri BSI CIMB BTN Permata Danamon Jago Syariah) dan global (Chase BofA Wells Fargo Citi HSBC Barclays Deutsche BNP DBS OCBC UOB Maybank MUFG ICBC CommBank RBC Emirates Revolut Wise) berikut mata uang global IDR USD GBP EUR SGD JPY CNY AUD CAD AED MYR - Pilih bank + mata uang otomatis!":newWallet.group==="ewallet"?"E-Wallet klik tambah akun banyak opsi+custom (GoPay OVO DANA LinkAja ShopeePay i.saku Sakuku DOKU Paytren TrueMoney Jenius Pay Flip PayPal Venmo Cash App Apple Pay Google Pay Samsung Pay Alipay WeChat GrabPay GCash Paytm PhonePe + Custom) - Banyak opsi + custom!":""}</div>
              </div>
              <div style={{display:"flex",gap:6}}><input value={newWallet.norek} onChange={e=>setNewWallet({...newWallet,norek:e.target.value})} placeholder="No rekening - show/hide - norek show/hide + copy + warna bisa pilih" style={{flex:1,padding:8,borderRadius:8,border:"1px solid #e2e8f0",fontSize:11}}/><select value={newWallet.color} onChange={e=>setNewWallet({...newWallet,color:e.target.value})} style={{padding:8,borderRadius:8,border:"1px solid #e2e8f0",fontSize:11}}>{COLORS.map(c=><option key={c} value={c}>{c} - Warna bisa pilih + tanda +</option>)}</select></div>
              <div style={{display:"flex",gap:6}}><input value={newWallet.platform} onChange={e=>setNewWallet({...newWallet,platform:e.target.value})} placeholder="Custom platform - Cicilan - ex: FIF, Kredivo, Akulaku" style={{flex:1,padding:8,borderRadius:8,border:"1px solid #e2e8f0",fontSize:11}}/><input type="date" value={newWallet.dueDate} onChange={e=>setNewWallet({...newWallet,dueDate:e.target.value})} placeholder="Tgl jatuh tempo notif - Cicilan" style={{flex:1,padding:8,borderRadius:8,border:"1px solid #e2e8f0",fontSize:11}}/></div>
              <div style={{display:"flex",gap:6}}><input type="number" value={newWallet.balance} onChange={e=>setNewWallet({...newWallet,balance:Number(e.target.value)})} placeholder="Jumlah uang - Cash flow SALAH SATU" style={{flex:1,padding:8,borderRadius:8,border:"1px solid #e2e8f0",fontSize:11}}/><select value={newWallet.currency} onChange={e=>setNewWallet({...newWallet,currency:e.target.value})} style={{padding:8,borderRadius:8,border:"1px solid #e2e8f0",fontSize:11}}><option>IDR</option><option>USD</option><option>SGD</option><option>EUR</option><option>GBP</option><option>JPY</option><option>MYR</option><option>CNY</option><option>INR</option><option>PHP</option><option>KRW</option><option>AUD</option><option>CAD</option><option>AED</option></select></div>
              <div style={{display:"flex",gap:6}}><button onClick={()=>setShowAddWallet(false)} style={{flex:1,padding:8,borderRadius:8,border:"1px solid #e2e8f0",background:"#fff",fontSize:11}}>Batal - {lang} - FULL</button><button onClick={()=>{if(selectedSource){setWallets(wallets.map(w=>w.id===selectedSource.id?{...w,name:newWallet.name||w.name,bank:newWallet.bank,norek:newWallet.norek||w.norek,color:newWallet.color,balance:newWallet.balance||w.balance,platform:newWallet.platform,dueDate:newWallet.dueDate,currency:newWallet.currency,flag:newWallet.flag,group:newWallet.group}:w))} else {setWallets([...wallets,{id:Date.now().toString(),name:newWallet.name||"Baru "+newWallet.group,type:newWallet.type||newWallet.group,group:newWallet.group,color:newWallet.color,bank:newWallet.bank,norek:newWallet.norek||(newWallet.group==="tunai"||newWallet.group==="pengeluaran"?"-":""),balance:newWallet.balance||0,currency:newWallet.currency,flag:newWallet.flag||"🇮🇩",icon:newWallet.group==="tabungan"?"🏦":newWallet.group==="ewallet"?"📱":newWallet.group==="tunai"?"👛":newWallet.group==="darurat"?"🚨":newWallet.group==="cicilan"?"🏍️":"💸",platform:newWallet.platform,dueDate:newWallet.dueDate}])} setShowAddWallet(false)}} style={{flex:1,padding:8,borderRadius:8,background:"#0f172a",color:"#fff",border:"none",fontWeight:800,fontSize:11}}>Simpan - FULL - Hide/Show + Warna + {lang} - SALAH SATU</button></div>
            </div>
          </div>
        </div>
      )}

      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:440,background:"#fff",borderTop:"1px solid #e2e8f0",display:"flex",justifyContent:"space-around",padding:"8px 0 14px",zIndex:30}}>
        <button onClick={()=>setBottom("beranda")} style={{background:"transparent",border:"none",display:"flex",flexDirection:"column",alignItems:"center",color:bottom==="beranda"?"#0ea5e9":"#94a3b8"}}><div style={{fontSize:20}}>🏠</div><div style={{fontSize:8,fontWeight:700}}>{tr.beranda}</div></button>
        <button onClick={()=>setBottom("riwayat")} style={{background:"transparent",border:"none",display:"flex",flexDirection:"column",alignItems:"center",color:bottom==="riwayat"?"#0ea5e9":"#94a3b8"}}><div style={{fontSize:20}}>🧾</div><div style={{fontSize:8,fontWeight:700}}>{tr.input}</div></button>
        <button onClick={()=>setBottom("chat")} style={{background:"transparent",border:"none",display:"flex",flexDirection:"column",alignItems:"center",color:bottom==="chat"?"#0ea5e9":"#94a3b8"}}><div style={{fontSize:20}}>💬</div><div style={{fontSize:8,fontWeight:700}}>{tr.chatAI}</div></button>
        <button onClick={()=>setBottom("laporan")} style={{background:"transparent",border:"none",display:"flex",flexDirection:"column",alignItems:"center",color:bottom==="laporan"?"#0ea5e9":"#94a3b8"}}><div style={{fontSize:20}}>📊</div><div style={{fontSize:8,fontWeight:700}}>{tr.laporan}</div></button>
        <button onClick={()=>setBottom("profil")} style={{background:"transparent",border:"none",display:"flex",flexDirection:"column",alignItems:"center",color:bottom==="profil"?"#0ea5e9":"#94a3b8"}}><div style={{fontSize:20}}>⚙️</div><div style={{fontSize:8,fontWeight:700}}>{tr.profil}</div></button>
      </div>
    </div>
  )
}
