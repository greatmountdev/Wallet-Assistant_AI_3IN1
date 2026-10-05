
"use client"
import { useState } from "react"
const COLORS=["#0ea5e9","#10b981","#06b6d4","#8b5cf6","#ef4444","#f59e0b"]
const BANKS_UNIVERSAL=[
  {name:"BCA", country:"Indonesia", curr:"IDR", flag:"🇮🇩"},
  {name:"BNI", country:"Indonesia", curr:"IDR", flag:"🇮🇩"},
  {name:"BRI", country:"Indonesia", curr:"IDR", flag:"🇮🇩"},
  {name:"Mandiri", country:"Indonesia", curr:"IDR", flag:"🇮🇩"},
  {name:"BSI", country:"Indonesia", curr:"IDR", flag:"🇮🇩"},
  {name:"GoPay", country:"Indonesia", curr:"IDR", flag:"🇮🇩"},
  {name:"OVO", country:"Indonesia", curr:"IDR", flag:"🇮🇩"},
  {name:"DANA", country:"Indonesia", curr:"IDR", flag:"🇮🇩"},
  {name:"Chase", country:"USA", curr:"USD", flag:"🇺🇸"},
  {name:"Bank of America", country:"USA", curr:"USD", flag:"🇺🇸"},
  {name:"Citi", country:"USA", curr:"USD", flag:"🇺🇸"},
  {name:"DBS", country:"Singapore", curr:"SGD", flag:"🇸🇬"},
  {name:"OCBC", country:"Singapore", curr:"SGD", flag:"🇸🇬"},
  {name:"UOB", country:"Singapore", curr:"SGD", flag:"🇸🇬"},
  {name:"HSBC", country:"UK", curr:"GBP", flag:"🇬🇧"},
  {name:"Barclays", country:"UK", curr:"GBP", flag:"🇬🇧"},
  {name:"Deutsche Bank", country:"Germany", curr:"EUR", flag:"🇩🇪"},
  {name:"BNP Paribas", country:"France", curr:"EUR", flag:"🇫🇷"},
]
const LANGS=[
  {code:"ID", label:"Indonesia", flag:"🇮🇩"},
  {code:"EN", label:"English", flag:"🇺🇸"},
  {code:"CN", label:"China 中文", flag:"🇨🇳"},
  {code:"IN", label:"India हिंदी", flag:"🇮🇳"},
  {code:"VN", label:"Vietnam Tiếng Việt", flag:"🇻🇳"},
  {code:"AR", label:"Arab العربية", flag:"🇸🇦"},
]
const T={
  ID:{
    appTitle:"Dompet AI Universal", subtitle:"Kelola uang dengan lebih tenang",
    dompet:"Dompet", crypto:"Crypto",
    beranda:"Beranda", input:"Input", chatAI:"Chat AI", laporan:"Laporan", profil:"Profil",
    totalSaldo:"Total Saldo - Universal", pemasukan:"Pemasukan", pengeluaran:"Pengeluaran", saldoBersih:"Saldo Bersih",
    insightTitle:"Insight AI", insightDesc:"Selamat datang {name} di berandaku, selalu input biar disiplin keuangan 😊✨🐱🏍",
    transaksiTerbaru:"Transaksi terbaru - Universal + Foto", lihatSemua:"Lihat semua",
    sumberDana:"Sumber dana - Universal - 6 Grup + Bank Luar", sumberDanaDesc:"Bank lokal + luar negeri + norek show/hide + mata uang masing2 negara",
    settingTitle:"Setting - Pengaturan - Universal",
    modeGelap:"Mode gelap - Dark/Day", modeGelapDesc:"Lebih nyaman malam hari",
    notifKeu:"Notifikasi keuangan", notifKeuDesc:"Pengingat tagihan",
    insightShort:"Insight AI", insightShortDesc:"Saran singkat",
    bahasa:"Bahasa - 6 pilihan - ID/English/China/India/Viet/Arab",
    gayaFont:"Gaya font - 4 pilihan - Tegas besar bold manula",
    akunTerhubung:"Akun Terhubung - Universal - Izin Lengkap",
    nama:"Nama", email:"Email", noHP:"No HP", provider:"Provider", bahasaLabel:"Bahasa", bankUniversal:"Bank Universal", mataUang:"Mata Uang", negara:"Negara",
    inputTitle:"Input - Universal + Foto Kamera - Dana Masuk/Keluar",
    inputDesc:"Setiap input dana masuk maupun belanja insert file-photo struk/bon/barang belanjaan",
    laporanTitle:"Laporan - Grafik - Harian/Bulanan + Sheet Export",
    grafikTitle:"Grafik Batang + Pie - Universal - Contoh",
    chatTitle:"Chat META AI - Voice/Type + Gemini",
    chatDesc:"Izin terhubung akun - Suara-Type + Gemini + Saran",
    tambahAkun:"Tambah/Edit Akun - Bank Lokal+Global + Norek Hide/Show + Currency",
    exportSheet:"Export Google Sheet CSV - Laporan Harian-Bulanan",
    izinDrive:"Izin Drive - Penyimpanan Foto", izinSheet:"Izin Sheet - Export Laporan", izinKamera:"Izin Kamera - Foto Struk/Bon/Barang", izinMeta:"Izin Meta AI - Voice/Type",
  },
  EN:{
    appTitle:"Dompet AI Universal", subtitle:"Manage money more calmly",
    dompet:"Wallet", crypto:"Crypto",
    beranda:"Home", input:"Input", chatAI:"Chat AI", laporan:"Report", profil:"Profile",
    totalSaldo:"Total Balance - Universal", pemasukan:"Income", pengeluaran:"Expense", saldoBersih:"Net Balance",
    insightTitle:"AI Insight", insightDesc:"Welcome {name} to my home, always input to stay financially disciplined 😊✨🐱🏍",
    transaksiTerbaru:"Recent Transactions - Universal + Photo", lihatSemua:"See all",
    sumberDana:"Funding Sources - Universal - 6 Groups + Foreign Banks", sumberDanaDesc:"Local + foreign banks + account hide/show + currency per country",
    settingTitle:"Settings - Universal",
    modeGelap:"Dark Mode - Dark/Day", modeGelapDesc:"More comfortable at night",
    notifKeu:"Financial Notifications", notifKeuDesc:"Bill reminders",
    insightShort:"AI Insight", insightShortDesc:"Short suggestions",
    bahasa:"Language - 6 options - ID/English/China/India/Viet/Arab",
    gayaFont:"Font Style - 4 options - Big bold elderly",
    akunTerhubung:"Connected Account - Universal - Full Permissions",
    nama:"Name", email:"Email", noHP:"Phone", provider:"Provider", bahasaLabel:"Language", bankUniversal:"Universal Banks", mataUang:"Currency", negara:"Country",
    inputTitle:"Input - Universal + Photo Camera - Income/Expense",
    inputDesc:"Every income/expense input insert file-photo receipt/bill/items",
    laporanTitle:"Report - Chart - Daily/Monthly + Sheet Export",
    grafikTitle:"Bar + Pie Chart - Universal - Example",
    chatTitle:"META AI Chat - Voice/Type + Gemini",
    chatDesc:"Connected account permission - Voice-Type + Gemini + Suggestions",
    tambahAkun:"Add/Edit Account - Local+Global Banks + Account Hide/Show + Currency",
    exportSheet:"Export Google Sheet CSV - Daily-Monthly Report",
    izinDrive:"Drive Permission - Photo Storage", izinSheet:"Sheet Permission - Report Export", izinKamera:"Camera Permission - Photo Receipt/Bill/Items", izinMeta:"Meta AI Permission - Voice/Type",
  },
  CN:{
    appTitle:"Dompet AI 通用钱包", subtitle:"更平静地管理金钱",
    dompet:"钱包", crypto:"加密",
    beranda:"首页", input:"输入", chatAI:"AI聊天", laporan:"报告", profil:"资料",
    totalSaldo:"总余额 - 通用", pemasukan:"收入", pengeluaran:"支出", saldoBersih:"净余额",
    insightTitle:"AI洞察", insightDesc:"欢迎 {name} 来到我的家，始终输入以保持财务纪律 😊✨🐱🏍",
    transaksiTerbaru:"最近交易 - 通用 + 照片", lihatSemua:"查看全部",
    sumberDana:"资金来源 - 通用 - 6组 + 外国银行", sumberDanaDesc:"本地+外国银行 + 账号显示/隐藏 + 各国货币",
    settingTitle:"设置 - 通用",
    modeGelap:"深色模式", modeGelapDesc:"夜晚更舒适",
    notifKeu:"财务通知", notifKeuDesc:"账单提醒",
    insightShort:"AI洞察", insightShortDesc:"简短建议",
    bahasa:"语言 - 6个选项", gayaFont:"字体 - 4个选项 - 老年粗体", akunTerhubung:"已连接账户 - 通用 - 完整权限",
    nama:"姓名", email:"邮箱", noHP:"手机", provider:"提供商", bahasaLabel:"语言", bankUniversal:"通用银行", mataUang:"货币", negara:"国家",
    inputTitle:"输入 - 通用 + 相机照片 - 收入/支出", inputDesc:"每次收入/支出插入收据/账单/物品照片",
    laporanTitle:"报告 - 图表 - 日/月 + 表格导出", grafikTitle:"条形图 + 饼图 - 通用 - 示例", chatTitle:"META AI 聊天 - 语音/打字 + Gemini", chatDesc:"已连接账户权限 - 语音类型",
    tambahAkun:"添加/编辑账户 - 本地+全球银行 + 账号显示/隐藏 + 货币", exportSheet:"导出 Google 表格 CSV", izinDrive:"Drive权限 - 照片存储", izinSheet:"Sheet权限 - 报告导出", izinKamera:"相机权限 - 收据照片", izinMeta:"Meta AI权限 - 语音/打字",
  },
  IN:{
    appTitle:"Dompet AI यूनिवर्सल", subtitle:"पैसे को शांति से प्रबंधित करें",
    dompet:"वॉलेट", crypto:"क्रिप्टो",
    beranda:"होम", input:"इनपुट", chatAI:"चैट AI", laporan:"रिपोर्ट", profil:"प्रोफाइल",
    totalSaldo:"कुल शेष - यूनिवर्सल", pemasukan:"आय", pengeluaran:"व्यय", saldoBersih:"शुद्ध शेष",
    insightTitle:"AI अंतर्दृष्टि", insightDesc:"स्वागत {name} मेरे घर में, वित्तीय अनुशासन के लिए हमेशा इनपुट करें 😊✨🐱🏍",
    transaksiTerbaru:"हाल के लेनदेन - फोटो के साथ", lihatSemua:"सभी देखें",
    sumberDana:"फंडिंग स्रोत - 6 समूह + विदेशी बैंक", sumberDanaDesc:"स्थानीय+विदेशी बैंक + खाता दिखाएँ/छुपाएँ + मुद्रा",
    settingTitle:"सेटिंग्स - यूनिवर्सल", modeGelap:"डार्क मोड", modeGelapDesc:"रात में आरामदायक", notifKeu:"वित्तीय सूचनाएं", notifKeuDesc:"बिल अनुस्मारक", insightShort:"AI अंतर्दृष्टि", insightShortDesc:"संक्षिप्त सुझाव",
    bahasa:"भाषा - 6 विकल्प", gayaFont:"फ़ॉन्ट - 4 विकल्प - बुजुर्ग बड़ा बोल्ड", akunTerhubung:"जुड़ा खाता - पूर्ण अनुमति",
    nama:"नाम", email:"ईमेल", noHP:"फोन", provider:"प्रदाता", bahasaLabel:"भाषा", bankUniversal:"यूनिवर्सल बैंक", mataUang:"मुद्रा", negara:"देश",
    inputTitle:"इनपुट - फोटो कैमरा - आय/व्यय", inputDesc:"हर आय/व्यय इनपुट रसीद/बिल/सामान फोटो डालें",
    laporanTitle:"रिपोर्ट - ग्राफ - दैनिक/मासिक + शीट निर्यात", grafikTitle:"बार + पाई चार्ट - उदाहरण", chatTitle:"META AI चैट - वॉयस/टाइप + Gemini", chatDesc:"खाता अनुमति - वॉयस टाइप",
    tambahAkun:"खाता जोड़ें/संपादित करें - बैंक + खाता दिखाएँ/छुपाएँ + मुद्रा", exportSheet:"Google Sheet CSV निर्यात", izinDrive:"Drive अनुमति - फोटो स्टोरेज", izinSheet:"Sheet अनुमति - रिपोर्ट निर्यात", izinKamera:"कैमरा अनुमति - रसीद फोटो", izinMeta:"Meta AI अनुमति - वॉयस/टाइप",
  },
  VN:{
    appTitle:"Dompet AI Toàn cầu", subtitle:"Quản lý tiền bình tĩnh hơn",
    dompet:"Ví", crypto:"Crypto",
    beranda:"Trang chủ", input:"Nhập", chatAI:"Chat AI", laporan:"Báo cáo", profil:"Hồ sơ",
    totalSaldo:"Tổng số dư - Toàn cầu", pemasukan:"Thu nhập", pengeluaran:"Chi tiêu", saldoBersih:"Số dư ròng",
    insightTitle:"Thông tin AI", insightDesc:"Chào mừng {name} đến nhà tôi, luôn nhập để kỷ luật tài chính 😊✨🐱🏍",
    transaksiTerbaru:"Giao dịch gần đây - Toàn cầu + Ảnh", lihatSemua:"Xem tất cả",
    sumberDana:"Nguồn vốn - 6 Nhóm + Ngân hàng nước ngoài", sumberDanaDesc:"Ngân hàng địa phương+nước ngoài + TK hiện/ẩn + tiền tệ",
    settingTitle:"Cài đặt - Toàn cầu", modeGelap:"Chế độ tối", modeGelapDesc:"Thoải mái ban đêm", notifKeu:"Thông báo tài chính", notifKeuDesc:"Nhắc hóa đơn", insightShort:"Thông tin AI", insightShortDesc:"Gợi ý ngắn",
    bahasa:"Ngôn ngữ - 6 lựa chọn", gayaFont:"Kiểu chữ - 4 lựa chọn - Đậm lớn người già", akunTerhubung:"Tài khoản đã kết nối - Toàn quyền",
    nama:"Tên", email:"Email", noHP:"Điện thoại", provider:"Provider", bahasaLabel:"Ngôn ngữ", bankUniversal:"Ngân hàng toàn cầu", mataUang:"Tiền tệ", negara:"Quốc gia",
    inputTitle:"Nhập - Toàn cầu + Ảnh Camera - Thu/Chi", inputDesc:"Mỗi lần nhập thu/chi chèn ảnh biên lai/hóa đơn/hàng hóa",
    laporanTitle:"Báo cáo - Biểu đồ - Hàng ngày/Tháng + Xuất Sheet", grafikTitle:"Biểu đồ cột + tròn - Ví dụ", chatTitle:"Chat META AI - Giọng nói/Nhập + Gemini", chatDesc:"Quyền tài khoản - Giọng nói",
    tambahAkun:"Thêm/Sửa TK - Ngân hàng địa phương+toàn cầu + TK hiện/ẩn + tiền tệ", exportSheet:"Xuất Google Sheet CSV", izinDrive:"Quyền Drive - Lưu ảnh", izinSheet:"Quyền Sheet - Xuất báo cáo", izinKamera:"Quyền Camera - Ảnh biên lai", izinMeta:"Quyền Meta AI - Giọng nói/Nhập",
  },
  AR:{
    appTitle:"Dompet AI عالمي", subtitle:"إدارة الأموال بهدوء أكثر",
    dompet:"محفظة", crypto:"تشفير",
    beranda:"الرئيسية", input:"إدخال", chatAI:"دردشة AI", laporan:"تقرير", profil:"الملف",
    totalSaldo:"الرصيد الإجمالي - عالمي", pemasukan:"الدخل", pengeluaran:"المصروفات", saldoBersih:"الرصيد الصافي",
    insightTitle:"رؤية AI", insightDesc:"مرحبا {name} في بيتي، أدخل دائما للانضباط المالي 😊✨🐱🏍",
    transaksiTerbaru:"المعاملات الأخيرة - عالمي + صورة", lihatSemua:"عرض الكل",
    sumberDana:"مصادر التمويل - 6 مجموعات + بنوك أجنبية", sumberDanaDesc:"بنوك محلية+أجنبية + إظهار/إخفاء الحساب + عملة",
    settingTitle:"الإعدادات - عالمي", modeGelap:"الوضع الداكن", modeGelapDesc:"أكثر راحة ليلا", notifKeu:"الإشعارات المالية", notifKeuDesc:"تذكير الفواتير", insightShort:"رؤية AI", insightShortDesc:"اقتراحات قصيرة",
    bahasa:"اللغة - 6 خيارات", gayaFont:"نمط الخط - 4 خيارات - عريض كبير", akunTerhubung:"الحساب المتصل - أذونات كاملة",
    nama:"الاسم", email:"البريد", noHP:"الهاتف", provider:"المزود", bahasaLabel:"اللغة", bankUniversal:"البنوك العالمية", mataUang:"العملة", negara:"الدولة",
    inputTitle:"إدخال - عالمي + صورة كاميرا - دخل/مصروف", inputDesc:"كل إدخال دخل/مصروف أدخل صورة الإيصال/الفاتورة/السلع",
    laporanTitle:"تقرير - رسم بياني - يومي/شهري + تصدير Sheet", grafikTitle:"رسم بياني شريطي + دائري - مثال", chatTitle:"دردشة META AI - صوت/كتابة + Gemini", chatDesc:"إذن الحساب - صوت/كتابة",
    tambahAkun:"إضافة/تعديل حساب - بنوك محلية+عالمية + إظهار/إخفاء + عملة", exportSheet:"تصدير Google Sheet CSV", izinDrive:"إذن Drive - تخزين الصور", izinSheet:"إذن Sheet - تصدير التقارير", izinKamera:"إذن الكاميرا - صورة الإيصال", izinMeta:"إذن Meta AI - صوت/كتابة",
  },
}
export default function Page(){
  const [step,setStep]=useState("login")
  const [authName,setAuthName]=useState("Kawan"), [authEmail,setAuthEmail]=useState("kawan@gmail.com"), [authPhone,setAuthPhone]=useState("0812****890"), [authProvider,setAuthProvider]=useState("google")
  const [pin,setPin]=useState(""), [pinStep,setPinStep]=useState(1), [pin1Saved,setPin1Saved]=useState("")
  const [mode,setMode]=useState("Dompet"), [cryptoUnlocked,setCryptoUnlocked]=useState(false), [showSeed,setShowSeed]=useState(false), [btc,setBtc]=useState(86401)
  const [permDrive,setPermDrive]=useState(true), [permSheet,setPermSheet]=useState(true), [permCamera,setPermCamera]=useState(true), [permMetaAI,setPermMetaAI]=useState(true)
  const [showPermModal,setShowPermModal]=useState(null), [isListening,setIsListening]=useState(false)
  const [theme,setTheme]=useState("light"), [notif,setNotif]=useState(true), [insightOn,setInsightOn]=useState(true)
  const [font,setFont]=useState("Standar"), [lang,setLang]=useState("ID")
  const [hideTotal,setHideTotal]=useState(false), [hideNorek,setHideNorek]=useState({}), [bottom,setBottom]=useState("beranda"), [showMenu,setShowMenu]=useState(false)
  const [wallets,setWallets]=useState([
    {id:"1",name:"Tabungan BCA",type:"tabungan",color:"#0ea5e9",bank:"BCA",norek:"1234567890",balance:7500000,currency:"IDR",country:"Indonesia",flag:"🇮🇩",icon:"🏦"},
    {id:"2",name:"E-wallet GoPay",type:"ewallet",color:"#10b981",bank:"GoPay",norek:"081234567890",balance:375000,currency:"IDR",country:"Indonesia",flag:"🇮🇩",icon:"📱"},
    {id:"3",name:"Saku Dompet",type:"cash",color:"#06b6d4",bank:"Cash",norek:"-",balance:1205000,currency:"IDR",country:"Indonesia",flag:"🇮🇩",icon:"👛"},
    {id:"4",name:"Chase USA",type:"tabungan",color:"#2563eb",bank:"Chase",norek:"9876543210",balance:500,currency:"USD",country:"USA",flag:"🇺🇸",icon:"🏦"},
    {id:"5",name:"DBS Singapore",type:"tabungan",color:"#f59e0b",bank:"DBS",norek:"1122334455",balance:800,currency:"SGD",country:"Singapore",flag:"🇸🇬",icon:"🏦"},
    {id:"6",name:"Cicilan Motor",type:"cicilan",color:"#8b5cf6",bank:"FIF",norek:"-",balance:1200000,currency:"IDR",country:"Indonesia",flag:"🇮🇩",platform:"FIF",dueDate:"2026-10-20",icon:"🏍️"},
    {id:"7",name:"Pengeluaran",type:"pengeluaran",color:"#ef4444",bank:"-",norek:"-",balance:0,currency:"IDR",country:"Universal",flag:"🌍",icon:"💸"},
    {id:"8",name:"Dana Darurat",type:"darurat",color:"#f59e0b",bank:"BSI",norek:"9988776655",balance:5000000,currency:"IDR",country:"Indonesia",flag:"🇮🇩",icon:"🚨"},
  ])
  const [txs,setTxs]=useState([
    {id:"1",title:"Kopi dan makan siang",amount:45000,groupId:"3",jenis:"keluar",kategori:"Makanan",date:"3 Okt 2026",foto:"struk.jpg",source:"Saku Dompet",curr:"IDR"},
    {id:"2",title:"Isi saldo transport",amount:75000,groupId:"2",jenis:"keluar",kategori:"Transportasi",date:"3 Okt 2026",foto:null,source:"E-wallet",curr:"IDR"},
    {id:"3",title:"Belanja kebutuhan rumah",amount:185000,groupId:"1",jenis:"keluar",kategori:"Makanan",date:"2 Okt 2026",foto:"struk.jpg",source:"Tabungan BCA",curr:"IDR"},
    {id:"4",title:"Gaji Oktober",amount:8500000,groupId:"1",jenis:"masuk",kategori:"Gaji",date:"1 Okt 2026",foto:null,source:"Tabungan BCA",curr:"IDR"},
    {id:"5",title:"Transfer Chase",amount:100,groupId:"4",jenis:"masuk",kategori:"Transfer",date:"2 Okt 2026",foto:"bon.jpg",source:"Chase USA",curr:"USD"},
  ])
  const [newWallet,setNewWallet]=useState({name:"",type:"tabungan",bank:"BCA",norek:"",color:COLORS[0],balance:0,platform:"",dueDate:"",currency:"IDR",country:"Indonesia",flag:"🇮🇩"})
  const [showAddWallet,setShowAddWallet]=useState(false), [selectedSource,setSelectedSource]=useState(null)
  const [chat,setChat]=useState([
    {role:"ai",text:"Selamat datang di berandaku, selalu input biar disiplin keuangan 😊✨🐱🏍 - Voice/Type + Gemini + Drive/Sheet/Kamera aktif"},
    {role:"ai",text:"Tips: Setiap input dana masuk/belanja, upload foto struk/bon/barang ya! Export laporan harian-bulanan ke Google Sheet juga bisa!"},
  ])
  const [chatInput,setChatInput]=useState("")
  const getFontStyle=()=>{
    if(font==="Standar") return {family:"Inter,sans-serif", size:"14px", weight:"400"}
    if(font==="Elegan") return {family:"Georgia, serif", size:"15px", weight:"400"}
    if(font==="SANTAi") return {family:"cursive", size:"15px", weight:"600"}
    if(font==="Tegas") return {family:"Inter,sans-serif", size:"19px", weight:"900"}
    return {family:"Inter,sans-serif", size:"14px", weight:"400"}
  }
  const fontCfg=getFontStyle()
  const tr=T[lang]||T.ID
  const totalIDR=wallets.filter(w=>w.currency==="IDR"&&w.type!=="cicilan"&&w.type!=="pengeluaran").reduce((a,b)=>a+b.balance,0)
  const masuk=txs.filter(t=>t.jenis==="masuk").reduce((a,b)=>a+b.amount,0)
  const keluar=txs.filter(t=>t.jenis==="keluar").reduce((a,b)=>a+b.amount,0)
  const ordered=[...wallets.filter(w=>w.type==="tabungan"),...wallets.filter(w=>w.type==="ewallet"),...wallets.filter(w=>w.type==="cash"),...wallets.filter(w=>w.type==="cicilan"),...wallets.filter(w=>w.type==="pengeluaran"),...wallets.filter(w=>w.type==="darurat")]
  const displayNorek=(norek,id)=>{ if(norek==="-") return "-"; if(!hideNorek[id]) return norek.slice(0,3)+"****"+norek.slice(-3); return norek }
  const handleNumber=(num)=>{ if(pin.length<6){ const np=pin+num; setPin(np); if(np.length===6){ setTimeout(()=>{ if(pinStep===1){ setPin1Saved(np); setPin(""); setPinStep(2)} else { if(np===pin1Saved){ setStep("main")} else { setPin(""); setPinStep(1)} } },300)} } }
  if(step==="login"){
    return <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#06b6d4,#8b5cf6)",display:"grid",placeItems:"center",padding:20,fontFamily:"Inter,sans-serif"}}>
      <div style={{maxWidth:380,width:"100%",background:"#fff",borderRadius:24,padding:24}}>
        <h2 style={{margin:0,textAlign:"center",fontWeight:900}}>{tr.appTitle}</h2>
        <p style={{textAlign:"center",fontSize:11,color:"#64748b",marginTop:4}}>{tr.subtitle} - Universal + 6 bahasa ALL UI berubah + Dompet/Crypto atas tengah</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,marginTop:10}}>{LANGS.map(l=><button key={l.code} onClick={()=>setLang(l.code)} style={{padding:"6px 4px",borderRadius:8,border:lang===l.code?"2px solid #0ea5e9":"1px solid #e2e8f0",background:lang===l.code?"#e0f2fe":"#fff",fontSize:10,fontWeight:700}}>{l.flag} {l.code}</button>)}</div>
        <input value={authName} onChange={e=>setAuthName(e.target.value)} placeholder={tr.nama} style={{width:"100%",padding:12,borderRadius:10,border:"1px solid #e2e8f0",marginTop:12}}/>
        <input value={authEmail} onChange={e=>setAuthEmail(e.target.value)} placeholder={tr.email} style={{width:"100%",padding:12,borderRadius:10,border:"1px solid #e2e8f0",marginTop:8}}/>
        <input value={authPhone} onChange={e=>setAuthPhone(e.target.value)} placeholder={tr.noHP} style={{width:"100%",padding:12,borderRadius:10,border:"1px solid #e2e8f0",marginTop:8}}/>
        <button onClick={()=>{setAuthProvider("google");setShowPermModal("drive")}} style={{width:"100%",padding:14,borderRadius:12,marginTop:14,background:"#fff",border:"1px solid #e2e8f0",fontWeight:700}}>Google - {tr.izinDrive}/{tr.izinSheet}/{tr.izinKamera}</button>
        <button onClick={()=>{setAuthProvider("facebook");setShowPermModal("drive")}} style={{width:"100%",padding:14,borderRadius:12,marginTop:8,background:"#1877F2",color:"#fff",border:"none",fontWeight:700}}>Facebook - {tr.izinDrive}</button>
      </div>
      {showPermModal==="drive" && <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.6)",display:"grid",placeItems:"center",zIndex:99,padding:16}}><div style={{background:"#fff",borderRadius:20,padding:18,width:"100%",maxWidth:380}}><h3 style={{margin:0}}>{tr.izinDrive} - {tr.mataUang}</h3><p style={{fontSize:11,color:"#64748b"}}>Folder DompetAI sendiri di Drive - simpan foto struk/bon/barang + backup</p><button onClick={()=>{setPermDrive(true);setShowPermModal("sheet")}} style={{width:"100%",padding:10,borderRadius:10,background:"#0f172a",color:"#fff",border:"none",fontWeight:800,marginTop:10}}>Allow Drive - {tr.izinDrive}</button></div></div>}
      {showPermModal==="sheet" && <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.6)",display:"grid",placeItems:"center",zIndex:99,padding:16}}><div style={{background:"#fff",borderRadius:20,padding:18,width:"100%",maxWidth:380}}><h3 style={{margin:0}}>{tr.izinSheet} - {tr.laporanTitle}</h3><p style={{fontSize:11,color:"#64748b"}}>Export laporan harian-bulanan ke Sheet Laporan Dompet AI</p><button onClick={()=>{setPermSheet(true);setShowPermModal("camera")}} style={{width:"100%",padding:10,borderRadius:10,background:"#10b981",color:"#fff",border:"none",fontWeight:800,marginTop:10}}>Allow Sheet - {tr.exportSheet}</button></div></div>}
      {showPermModal==="camera" && <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.6)",display:"grid",placeItems:"center",zIndex:99,padding:16}}><div style={{background:"#fff",borderRadius:20,padding:18,width:"100%",maxWidth:380}}><h3 style={{margin:0}}>{tr.izinKamera} - {tr.inputTitle}</h3><p style={{fontSize:11,color:"#64748b"}}>{tr.inputDesc}</p><button onClick={()=>{setPermCamera(true);setShowPermModal("metaai")}} style={{width:"100%",padding:10,borderRadius:10,background:"#f59e0b",color:"#fff",border:"none",fontWeight:800,marginTop:10}}>Allow Camera - {tr.izinKamera}</button></div></div>}
      {showPermModal==="metaai" && <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.6)",display:"grid",placeItems:"center",zIndex:99,padding:16}}><div style={{background:"#fff",borderRadius:20,padding:18,width:"100%",maxWidth:380}}><h3 style={{margin:0}}>{tr.izinMeta} - Voice/Type + Gemini</h3><p style={{fontSize:11,color:"#64748b"}}>{tr.chatDesc}</p><button onClick={()=>{setPermMetaAI(true);setShowPermModal(null);setStep("pin");setPinStep(1);setPin("")}} style={{width:"100%",padding:10,borderRadius:10,background:"#8b5cf6",color:"#fff",border:"none",fontWeight:800,marginTop:10}}>Allow Meta AI - Lanjut PIN - {tr.chatTitle}</button></div></div>}
    </div>
  }
  if(step==="pin"){
    return <div style={{minHeight:"100vh",background:"#f8fbff",display:"grid",placeItems:"center",padding:20}}><div style={{maxWidth:360,width:"100%",background:"#fff",borderRadius:24,padding:24}}><h3 style={{textAlign:"center",margin:0}}>{pinStep===1?"Create PIN 2X - 1/2":"Confirm PIN 2X - 2/2 Save"} - {lang}</h3><div style={{display:"flex",justifyContent:"center",gap:8,marginTop:16}}>{[...Array(6)].map((_,i)=><div key={i} style={{width:16,height:16,borderRadius:8,background:i<pin.length?"#0ea5e9":"#e2e8f0"}}></div>)}</div><div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginTop:20}}>{[1,2,3,4,5,6,7,8,9].map(n=><button key={n} onClick={()=>handleNumber(n.toString())} style={{height:64,borderRadius:16,border:"1px solid #e2e8f0",background:"#fff",fontSize:22,fontWeight:800}}>{n}</button>)}<button onClick={()=>setPin(pin.slice(0,-1))} style={{height:64,borderRadius:16,background:"#fee2e2",border:"1px solid #e2e8f0"}}>⌫</button><button onClick={()=>handleNumber("0")} style={{height:64,borderRadius:16,background:"#fff",border:"1px solid #e2e8f0",fontSize:22,fontWeight:800}}>0</button><button onClick={()=>{ if(pin.length===6){ if(pinStep===1){ setPin1Saved(pin); setPin(""); setPinStep(2)} else { if(pin===pin1Saved){ setStep("main")} else { setPin(""); setPinStep(1)} } } }} style={{height:64,borderRadius:16,background:"#0f172a",color:"#fff",fontWeight:800}}>✓</button></div></div></div>
  }
  return <div style={{maxWidth:440,margin:"0 auto",minHeight:"100vh",background:"#f1f7ff",fontFamily:fontCfg.family,fontSize:fontCfg.size,fontWeight:fontCfg.weight,paddingBottom:88}}>
    <div style={{background:"linear-gradient(90deg,#06b6d4,#8b5cf6)",padding:"12px 14px 0",color:"#fff",position:"sticky",top:0,zIndex:20}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{display:"flex",gap:10,alignItems:"center"}}><button onClick={()=>setShowMenu(true)} style={{width:44,height:44,borderRadius:14,background:"#fff",border:"none",fontSize:20}}>☰</button><div><div style={{fontWeight:900,fontSize:18}}>{tr.appTitle}</div><div style={{fontSize:10,opacity:.9}}>{LANGS.find(l=>l.code===lang)?.flag} {lang} - {authName} - Drive:{permDrive?"✅":"❌"} Sheet:{permSheet?"✅":"❌"} Cam:{permCamera?"✅":"❌"} Meta:{permMetaAI?"✅":"❌"}</div></div></div>
        <button onClick={()=>setHideTotal(!hideTotal)} style={{width:36,height:36,borderRadius:10,background:"rgba(255,255,255,.9)",border:"none"}}>👁️</button>
      </div>
      <div style={{display:"flex",justifyContent:"center",padding:"12px 0"}}>
        <div style={{display:"flex",background:"rgba(255,255,255,.22)",borderRadius:14,padding:4,gap:4}}>
          <button onClick={()=>setMode("Dompet")} style={{padding:"10px 32px",borderRadius:10,border:"none",fontWeight:800,background:mode==="Dompet"?"#fff":"transparent",color:mode==="Dompet"?"#0f172a":"#fff"}}>{tr.dompet}</button>
          <button onClick={()=>{setMode("Crypto"); if(!cryptoUnlocked) setShowSeed(true)}} style={{padding:"10px 32px",borderRadius:10,border:"none",fontWeight:800,background:mode==="Crypto"?"#fff":"transparent",color:mode==="Crypto"?"#0f172a":"#fff"}}>{tr.crypto}</button>
        </div>
      </div>
    </div>

    {showMenu && <div style={{position:"fixed",inset:0,zIndex:80,display:"flex"}}><div style={{width:"92%",maxWidth:380,background:"#f8fbff",height:"100%",overflowY:"auto",padding:16}}><div style={{display:"flex",justifyContent:"space-between"}}><h2 style={{margin:0,fontSize:16}}>{tr.sumberDana}</h2><button onClick={()=>setShowMenu(false)} style={{width:40,height:40,borderRadius:12,background:"#fff",border:"1px solid #e2e8f0"}}>✕</button></div><div style={{fontSize:10,color:"#64748b",marginTop:4}}>{tr.sumberDanaDesc} - {tr.tambahAkun}</div><div style={{marginTop:12,display:"flex",flexDirection:"column",gap:10}}>{ordered.map(w=><div key={w.id} style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:18,padding:12,display:"flex",alignItems:"center",gap:10}}><div style={{width:52,height:52,borderRadius:14,background:w.color+"22",display:"grid",placeItems:"center"}}>{w.flag} {w.icon}</div><div style={{flex:1}}><div style={{fontWeight:800,fontSize:13}}>{w.name}</div><div style={{fontSize:11,color:"#64748b"}}>{w.bank} • {w.country} • {w.currency} • Rp {w.balance.toLocaleString("id-ID")}</div><div style={{fontSize:10,display:"flex",gap:4,alignItems:"center"}}><span>{w.flag} {displayNorek(w.norek,w.id)}</span>{w.norek!=="-"&&<><button onClick={()=>setHideNorek({...hideNorek,[w.id]:!hideNorek[w.id]})} style={{border:"none",background:"#f1f5f9",borderRadius:4,padding:"0 6px",fontSize:10}}>{hideNorek[w.id]?"🙈 Hide":"👁️ Show"}</button><button onClick={()=>{try{navigator.clipboard?.writeText(w.norek)}catch{}}} style={{border:"none",background:"#f1f5f9",borderRadius:4,padding:"0 6px",fontSize:10}}>📋 Copy</button></>}</div>{w.type==="cicilan"&&<div style={{fontSize:9,marginTop:3,background:"#fef3c7",borderRadius:6,padding:"2px 6px",display:"inline-block"}}>{w.platform} jatuh {w.dueDate}</div>}</div><button onClick={()=>{setSelectedSource(w); setNewWallet({name:w.name,type:w.type,bank:w.bank,norek:w.norek,color:w.color,balance:w.balance,platform:w.platform||"",dueDate:w.dueDate||"",currency:w.currency,country:w.country,flag:w.flag}); setShowAddWallet(true)}} style={{width:40,height:40,borderRadius:10,background:"#fff",border:"1px solid #e2e8f0",fontWeight:900}}>+</button></div>)}</div><button onClick={()=>setShowAddWallet(true)} style={{width:"100%",marginTop:12,padding:12,borderRadius:12,background:"#0f172a",color:"#fff",border:"none",fontWeight:700}}>+ {tr.tambahAkun} - Input Norek Hide/Show + Currency Dunia</button><div style={{marginTop:10,background:"#fff",borderRadius:10,padding:10,fontSize:10,color:"#64748b"}}>List bank: {BANKS_UNIVERSAL.map(b=>b.flag+" "+b.name+" "+b.curr).join(", ")}. {tr.mataUang}: IDR USD SGD GBP EUR. 6 tipe warna.</div></div><div style={{flex:1,background:"rgba(0,0,0,.25)"}} onClick={()=>setShowMenu(false)}></div></div>}

    {showSeed && <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.6)",display:"grid",placeItems:"center",zIndex:90,padding:16}}><div style={{background:"#fff",borderRadius:20,padding:18,width:"100%",maxWidth:380}}><h3 style={{margin:0}}>Crypto - Seed 12 Kata + 2FA - Hanya di Crypto - {lang}</h3><div style={{background:"#f8fafc",border:"1px dashed #cbd5e1",borderRadius:12,padding:10,marginTop:10,display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6}}>{"abandon ability able about above absent absorb abstract absurd abuse access accident".split(" ").map((w,i)=><div key={i} style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:6,padding:"4px",fontSize:10,textAlign:"center"}}>{i+1}. {w}</div>)}</div><div style={{marginTop:10,background:"#0f172a",color:"#fff",borderRadius:12,padding:12,textAlign:"center"}}>QR Seed + TrustWallet/Metamask + BSCScan 15m - BTC {btc}</div><label style={{display:"flex",gap:6,marginTop:10,fontSize:11}}><input type="checkbox" checked={cryptoUnlocked} onChange={e=>setCryptoUnlocked(e.target.checked)}/> Simpan Seed + 2FA</label><div style={{display:"flex",gap:8,marginTop:12}}><button onClick={()=>{setShowSeed(false);setMode("Dompet")}} style={{flex:1,padding:10,borderRadius:10,border:"1px solid #e2e8f0",background:"#fff"}}>Kembali Dompet - {tr.dompet}</button><button disabled={!cryptoUnlocked} onClick={()=>{setShowSeed(false);setMode("Crypto")}} style={{flex:1,padding:10,borderRadius:10,background:cryptoUnlocked?"#0f172a":"#94a3b8",color:"#fff",border:"none",fontWeight:800}}>Masuk Crypto - {tr.crypto}</button></div></div></div>}

    {mode==="Crypto" && <div style={{padding:14}}><div style={{background:"#fff",borderRadius:20,padding:16,border:"1px solid #e2e8f0"}}><div style={{display:"flex",justifyContent:"space-between"}}><b>Crypto Wallet - Universal - {lang}</b><span style={{fontSize:10,background:"#e0f2fe",padding:"4px 8px",borderRadius:8}}>BSCScan 15m + 2FA + Seed + {lang}</span></div><div style={{marginTop:10,background:"#0f172a",color:"#fff",borderRadius:16,padding:14}}><div>BTC Live {btc} - QR Scan - TrustWallet/Metamask - {tr.crypto}</div><div style={{marginTop:8,fontSize:11,background:"rgba(255,255,255,.1)",padding:8,borderRadius:8}}>0x71C9...9A2F - {authEmail} - {lang} - Drive:{permDrive?"✅":"❌"}</div></div></div></div>}

    {mode==="Dompet" && bottom==="beranda" && <><div style={{padding:14}}><div style={{background:"linear-gradient(135deg,#2563eb,#0ea5e9)",borderRadius:22,padding:18,color:"#fff"}}><div style={{display:"flex",justifyContent:"space-between"}}><div style={{fontSize:12}}>{tr.totalSaldo} - {LANGS.find(l=>l.code===lang)?.flag} {lang}</div><span style={{fontSize:10,background:"rgba(255,255,255,.2)",padding:"4px 8px",borderRadius:10}}>{authName}</span></div><div style={{fontSize:26,fontWeight:900,marginTop:6}}>{hideTotal?"Rp ••••••":"Rp "+totalIDR.toLocaleString("id-ID")+" + USD SGD"}</div><div style={{display:"flex",gap:8,marginTop:12}}><div style={{flex:1,background:"rgba(255,255,255,.2)",borderRadius:10,padding:8}}><div style={{fontSize:9}}>{tr.pemasukan}</div><div style={{fontWeight:800,fontSize:11}}>Rp {masuk.toLocaleString("id-ID")}</div></div><div style={{flex:1,background:"rgba(255,255,255,.2)",borderRadius:10,padding:8}}><div style={{fontSize:9}}>{tr.pengeluaran}</div><div style={{fontWeight:800,fontSize:11}}>Rp {keluar.toLocaleString("id-ID")}</div></div></div></div><div style={{background:"#fff",borderRadius:16,padding:12,marginTop:10,border:"1px solid #e2e8f0",display:"flex",gap:10}}><div style={{width:40,height:40,borderRadius:10,background:"#dbeafe",display:"grid",placeItems:"center"}}>✨</div><div style={{flex:1}}><div style={{fontWeight:700,fontSize:12}}>{tr.insightTitle} - {lang}</div><div style={{fontSize:10,color:"#475569",marginTop:4}}>{tr.insightTitle==="AI Insight"?"Welcome":"Selamat datang"} {authName} - All UI {lang} - Izin: Drive:{permDrive?"✅":"❌"} Sheet:{permSheet?"✅":"❌"} Cam:{permCamera?"✅":"❌"} Meta:{permMetaAI?"✅":"❌"}</div></div></div></div><div style={{padding:"0 14px"}}><div style={{display:"flex",justifyContent:"space-between"}}><b style={{fontSize:14}}>{tr.transaksiTerbaru}</b><button onClick={()=>setBottom("riwayat")} style={{border:"none",background:"transparent",color:"#0ea5e9",fontWeight:700,fontSize:12}}>{tr.lihatSemua}</button></div><div style={{marginTop:8,display:"flex",flexDirection:"column",gap:8}}>{txs.slice(0,5).map(t=><div key={t.id} style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:14,padding:10,display:"flex",gap:8,alignItems:"center"}}><div style={{width:48,height:48,borderRadius:10,background:t.foto?"#dcfce7":"#f1f5f9",display:"grid",placeItems:"center"}}>{t.foto?"📸":"🧾"}</div><div style={{flex:1}}><div style={{fontWeight:700,fontSize:12}}>{t.title}</div><div style={{fontSize:9,color:"#64748b"}}>{t.date} • {t.source} • {t.curr} {t.foto?"• 📷":""}</div></div><div style={{fontWeight:800,fontSize:11,color:t.jenis==="keluar"?"#ef4444":"#10b981"}}>{t.jenis==="keluar"?"-":"+"} {t.curr} {t.amount.toLocaleString("id-ID")}</div></div>)}</div></div></>}

    {bottom==="riwayat" && <div style={{padding:14}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><h2 style={{margin:0,fontSize:18}}>{tr.inputTitle} - {lang} 📷</h2><button onClick={()=>{if(!permCamera){setShowPermModal("camera")} else {setShowAddWallet(true)}}} style={{background:"#0ea5e9",color:"#fff",border:"none",borderRadius:10,padding:"8px 12px",fontWeight:700,fontSize:11}}>📷 + Input</button></div><div style={{background:permCamera?"#f0fdf4":"#fef3c7",borderRadius:10,padding:8,marginTop:8,fontSize:10}}>{permCamera?"✅ "+tr.izinKamera+" - Bisa foto struk/bon/barang setiap input - "+tr.inputDesc:"⚠️ "+tr.izinKamera+" Belum"} • Drive:{permDrive?"✅ "+tr.izinDrive:"❌"} Sheet:{permSheet?"✅ "+tr.izinSheet:"❌"}</div><div style={{marginTop:10,display:"flex",flexDirection:"column",gap:8}}>{txs.map(t=><div key={t.id} style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:14,padding:10,display:"flex",gap:8,alignItems:"center"}}><div style={{width:48,height:48,borderRadius:10,background:t.foto?"#dcfce7":"#f1f5f9",display:"grid",placeItems:"center"}}>{t.foto?"📸":"🧾"}</div><div style={{flex:1}}><div style={{fontWeight:700,fontSize:12}}>{t.title}</div><div style={{fontSize:9,color:"#64748b"}}>{t.date} • {t.source} • {t.curr} • {t.kategori} {t.foto?"• 📷 Foto struk/bon/barang ada - Drive":"• Tanpa foto"}</div></div><div style={{textAlign:"right"}}><div style={{fontWeight:800,fontSize:11}}>{t.curr} {t.amount.toLocaleString("id-ID")}</div><div style={{fontSize:8,background:t.jenis==="masuk"?"#dcfce7":"#e0f2fe",padding:"2px 6px",borderRadius:8,display:"inline-block",marginTop:2}}>{t.jenis.toUpperCase()}</div></div></div>)}</div><div style={{marginTop:12,background:"#fff",borderRadius:14,padding:12,border:"1px solid #e2e8f0"}}><div style={{fontWeight:700,fontSize:12}}>📷 {tr.inputDesc} - {lang}</div><div style={{marginTop:8,display:"flex",gap:8}}><button onClick={()=>{if(!permCamera) setShowPermModal("camera"); else alert("Kamera - Foto struk/bon/barang - Drive")}} style={{flex:1,padding:10,borderRadius:10,border:"1px dashed #0ea5e9",background:"#f0f9ff",color:"#0ea5e9",fontWeight:700,fontSize:11}}>📷 {tr.izinKamera} - Foto</button><button onClick={()=>{if(!permDrive) setShowPermModal("drive"); else alert("Galeri - File Photo")}} style={{flex:1,padding:10,borderRadius:10,border:"1px dashed #10b981",background:"#f0fdf4",color:"#10b981",fontWeight:700,fontSize:11}}>🖼️ Galeri - File Photo - {tr.izinDrive}</button></div></div></div>}

    {bottom==="chat" && <div style={{padding:14}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><h2 style={{margin:0,fontSize:18}}>{tr.chatTitle} - {lang} - Voice/Type + Gemini</h2><span style={{fontSize:10,background:permMetaAI?"#dcfce7":"#fee2e2",padding:"4px 8px",borderRadius:8}}>{permMetaAI?"✅ Voice/Type":"❌"}</span></div>{!permMetaAI && <div style={{background:"#fef3c7",borderRadius:10,padding:10,marginTop:10,fontSize:11}}><b>⚠️ {tr.izinMeta} Belum - Menu ketiga chat kosong?</b><br/>Klik untuk izinkan<br/><button onClick={()=>setShowPermModal("metaai")} style={{marginTop:6,padding:"8px 12px",borderRadius:8,border:"none",background:"#8b5cf6",color:"#fff",fontWeight:700,fontSize:11}}>🔐 {tr.izinMeta}</button></div>}<div style={{background:"#fff",borderRadius:20,padding:14,marginTop:12,minHeight:420,display:"flex",flexDirection:"column",border:"1px solid #e2e8f0"}}><div style={{flex:1,display:"flex",flexDirection:"column",gap:10,maxHeight:300,overflowY:"auto"}}>{chat.map((c,i)=><div key={i} style={{alignSelf:c.role==="ai"?"flex-start":"flex-end",maxWidth:"85%",background:c.role==="ai"?"#f8fafc":"#0ea5e9",color:c.role==="ai"?"#0f172a":"#fff",borderRadius:16,padding:10,fontSize:11,border:c.role==="ai"?"1px solid #e2e8f0":"none"}}>{c.text} - {lang}</div>)}</div><div style={{display:"flex",flexWrap:"wrap",gap:6,marginTop:12}}>{["Catat pemasukan","Catat pengeluaran","Pengeluaran terbesar","Saldo Saku Dompet","Apakah aku hemat?","Transaksi tanpa foto","Buat anggaran bulanan"].map(b=><button key={b} onClick={()=>{if(!permMetaAI){setShowPermModal("metaai"); return} setChat([...chat,{role:"user",text:b},{role:"ai",text:"Meta AI Gemini - "+b+" - Total Rp "+totalIDR.toLocaleString("id-ID")+". Saran: upload foto struk/bon - Drive "+(permDrive?"✅":"❌")+" Sheet "+(permSheet?"✅":"❌")+" - "+lang}] )}} style={{padding:"6px 10px",borderRadius:16,border:"1px solid #bae6fd",background:"#f0f9ff",color:"#0369a1",fontSize:9,fontWeight:700}}>{b} - {lang}</button>)}</div><div style={{display:"flex",gap:8,marginTop:12,alignItems:"center"}}><button onClick={()=>{if(!permMetaAI){setShowPermModal("metaai"); return} setIsListening(!isListening); if(!isListening){ setTimeout(()=>{setIsListening(false); setChat([...chat,{role:"user",text:"🎤 Voice: Berapa saldo saya?"},{role:"ai",text:"Hai "+authName+"! Saldo Rp "+totalIDR.toLocaleString("id-ID")+" - Voice/Type aktif - "+lang}] )},2000)}}} style={{width:44,height:44,borderRadius:12,background:isListening?"#ef4444":"#f1f5f9",border:"1px solid #e2e8f0",fontSize:18}}>{isListening?"🔴":"🎤"}</button><input value={chatInput} onChange={e=>setChatInput(e.target.value)} placeholder={permMetaAI?"Tanya keuangan + voice/type... "+lang:"Izin Meta AI dulu - "+tr.izinMeta} disabled={!permMetaAI} style={{flex:1,padding:12,borderRadius:20,border:"1px solid #e2e8f0",background:permMetaAI?"#f8fafc":"#f1f5f9",fontSize:11}}/><button onClick={()=>{if(!permMetaAI){setShowPermModal("metaai"); return} if(!chatInput) return; setChat([...chat,{role:"user",text:chatInput},{role:"ai",text:"META AI Gemini: Hai "+authName+"! "+chatInput+" - Total Rp "+totalIDR.toLocaleString("id-ID")+" - "+lang}]); setChatInput("")}} disabled={!permMetaAI} style={{width:44,height:44,borderRadius:12,background:permMetaAI?"#0ea5e9":"#94a3b8",border:"none",color:"#fff"}}>➤</button></div><div style={{marginTop:8,fontSize:9,color:"#64748b",textAlign:"center"}}>{tr.chatDesc} - Voice 🎤 + Type ⌨️ + Gemini + 7 saran - {lang} - {tr.izinMeta}</div></div></div>}

    {bottom==="laporan" && <div style={{padding:14}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><h2 style={{margin:0,fontSize:font==="Tegas"?"22px":"18px",fontWeight:900}}>{tr.laporanTitle} - {lang} - {font}</h2><button onClick={()=>{if(!permSheet){setShowPermModal("sheet")} else { alert("Export ke Google Sheet - Laporan Dompet AI - Harian-Bulanan - "+lang+" - Drive "+(permDrive?"✅":"❌")) } }} style={{padding:"8px 12px",borderRadius:10,border:"none",background:permSheet?"#10b981":"#f59e0b",color:"#fff",fontWeight:700,fontSize:10}}>{permSheet?"📊 "+tr.exportSheet:"⚠️ "+tr.izinSheet}</button></div><div style={{background:permSheet?"#f0fdf4":"#fef3c7",borderRadius:8,padding:8,marginTop:8,fontSize:10}}>{permSheet?"✅ "+tr.izinSheet+" - Export harian-bulanan ke Sheet Laporan Dompet AI - "+lang:"⚠️ "+tr.izinSheet+" Belum"} • Drive:{permDrive?"✅ "+tr.izinDrive:"❌"} • Cam:{permCamera?"✅":"❌"} • Meta:{permMetaAI?"✅":"❌"}</div><div style={{background:"#fff",borderRadius:20,padding:14,marginTop:12,border:"1px solid #e2e8f0"}}><div style={{fontWeight:900,fontSize:font==="Tegas"?"18px":"14px"}}>📊 {tr.grafikTitle} - {lang} - {font} {font==="Tegas"?"- MODE MANULA 👓 BESAR BOLD":""}</div><div style={{display:"flex",alignItems:"end",gap:6,height:130,marginTop:12}}>{[{l:"Mkn",v:45,c:"#ef4444"},{l:"Trp",v:75,c:"#0ea5e9"},{l:"Rmh",v:60,c:"#8b5cf6"},{l:"Tag",v:30,c:"#f59e0b"},{l:"Hobi",v:85,c:"#10b981"}].map((b,i)=><div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}><div style={{width:"100%",height:b.v,background:b.c,borderRadius:"8px 8px 0 0",display:"grid",placeItems:"center",color:"#fff",fontSize:font==="Tegas"?"11px":"9px",fontWeight:900}}>Rp{b.v}k</div><div style={{fontSize:font==="Tegas"?"13px":"9px",fontWeight:800}}>{b.l}</div></div>)}</div><div style={{display:"flex",gap:12,marginTop:16,alignItems:"center",background:"#f8fafc",borderRadius:12,padding:10}}><div style={{width:90,height:90,borderRadius:22,background:"linear-gradient(135deg,#ef4444,#0ea5e9)",border:"4px solid #fff",display:"grid",placeItems:"center",color:"#fff",fontWeight:900,fontSize:12}}>PIE<br/>35% - {lang}</div><div style={{flex:1,display:"flex",flexDirection:"column",gap:5,fontSize:font==="Tegas"?"13px":"10px",fontWeight:font==="Tegas"?"800":"600"}}><div>🟥 {tr.pemasukan} 35% - Rp 185k</div><div>🟦 Transport 20% - Rp 75k</div><div>🟪 Rumah 20%</div><div>🟨 Tagihan 10%</div><div>🟩 Hobi 15%</div></div></div><div style={{marginTop:12,display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}><div style={{border:"1px solid #e2e8f0",borderRadius:12,padding:10}}><div style={{fontSize:9,color:"#64748b"}}>{tr.pemasukan}</div><div style={{fontWeight:900,fontSize:font==="Tegas"?"17px":"13px"}}>Rp {masuk.toLocaleString("id-ID")}</div></div><div style={{border:"1px solid #e2e8f0",borderRadius:12,padding:10}}><div style={{fontSize:9,color:"#64748b"}}>{tr.pengeluaran}</div><div style={{fontWeight:900,fontSize:font==="Tegas"?"17px":"13px"}}>Rp {keluar.toLocaleString("id-ID")}</div></div><div style={{border:"1px solid #e2e8f0",borderRadius:12,padding:10}}><div style={{fontSize:9,color:"#64748b"}}>{tr.saldoBersih}</div><div style={{fontWeight:900,fontSize:font==="Tegas"?"17px":"13px",color:masuk>keluar?"#10b981":"#ef4444"}}>Rp {(masuk-keluar).toLocaleString("id-ID")}</div></div><div style={{border:"1px solid #e2e8f0",borderRadius:12,padding:10}}><div style={{fontSize:9,color:"#64748b"}}>Foto Bukti</div><div style={{fontWeight:900,fontSize:font==="Tegas"?"17px":"13px"}}>{txs.filter(t=>t.foto).length}/{txs.length} foto</div></div></div><div style={{marginTop:8,fontSize:font==="Tegas"?"11px":"9px",color:"#64748b"}}>{tr.exportSheet} - {lang} - {tr.grafikTitle} - Font {font} - {font==="Tegas"?"Besar Bold manula":""}</div></div></div>}

    {bottom==="profil" && <div style={{padding:14}}>
      <h2 style={{margin:0,fontSize:20}}>{tr.settingTitle} - {lang}</h2>
      <div style={{background:"#fff",borderRadius:20,padding:14,marginTop:12,border:"1px solid #e2e8f0"}}>
        <div style={{display:"flex",justifyContent:"space-between",padding:"12px 0",borderBottom:"1px solid #f1f5f9"}}><div><div style={{fontWeight:700,fontSize:13}}>{tr.modeGelap}</div><div style={{fontSize:11,color:"#64748b"}}>{tr.modeGelapDesc}</div></div><button onClick={()=>setTheme(theme==="light"?"dark":"light")} style={{width:52,height:30,borderRadius:15,border:"none",background:theme==="dark"?"#0ea5e9":"#cbd5e1",position:"relative"}}><div style={{width:22,height:22,borderRadius:11,background:"#fff",position:"absolute",top:4,left:theme==="dark"?26:4}}/></button></div>
        <div style={{display:"flex",justifyContent:"space-between",padding:"12px 0",borderBottom:"1px solid #f1f5f9"}}><div><div style={{fontWeight:700,fontSize:13}}>{tr.notifKeu}</div><div style={{fontSize:11,color:"#64748b"}}>{tr.notifKeuDesc}</div></div><button onClick={()=>setNotif(!notif)} style={{width:52,height:30,borderRadius:15,border:"none",background:notif?"#0ea5e9":"#cbd5e1",position:"relative"}}><div style={{width:22,height:22,borderRadius:11,background:"#fff",position:"absolute",top:4,left:notif?26:4}}/></button></div>
        <div style={{display:"flex",justifyContent:"space-between",padding:"12px 0"}}><div><div style={{fontWeight:700,fontSize:13}}>{tr.insightShort}</div><div style={{fontSize:11,color:"#64748b"}}>{tr.insightDesc}</div></div><button onClick={()=>setInsightOn(!insightOn)} style={{width:52,height:30,borderRadius:15,border:"none",background:insightOn?"#0ea5e9":"#cbd5e1",position:"relative"}}><div style={{width:22,height:22,borderRadius:11,background:"#fff",position:"absolute",top:4,left:insightOn?26:4}}/></button></div>
      </div>
      <h3 style={{marginTop:14,fontSize:14}}>{tr.bahasa}</h3>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginTop:8}}>
        {LANGS.map(l=><button key={l.code} onClick={()=>setLang(l.code)} style={{padding:10,borderRadius:12,border:lang===l.code?"2px solid #0ea5e9":"1px solid #e2e8f0",background:lang===l.code?"#e0f2fe":"#fff",fontWeight:700,fontSize:11}}>{l.flag} {l.label} {lang===l.code?"✓":""}</button>)}
      </div>
      <h3 style={{marginTop:14,fontSize:14}}>{tr.gayaFont}</h3>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:8}}>
        {[{k:"Standar",d:"Inter normal"},{k:"Elegan",d:"Serif mewah"},{k:"SANTAi",d:"Playful santai"},{k:"Tegas",d:"BESAR BOLD manula 👓"}].map(f=><button key={f.k} onClick={()=>setFont(f.k)} style={{padding:10,borderRadius:12,border:font===f.k?"2px solid #0ea5e9":"1px solid #e2e8f0",background:font===f.k?"#e0f2fe":"#fff",fontWeight:font===f.k?"900":"700",textAlign:"left"}}><div>{f.k} {font===f.k?"✓":""}</div><div style={{fontSize:9,color:"#64748b"}}>{f.d}</div></button>)}
      </div>
      <div style={{background:"#fff",borderRadius:16,padding:12,marginTop:14,border:"1px solid #e2e8f0"}}>
        <div style={{fontWeight:700,fontSize:13}}>{tr.akunTerhubung} - {authName} - {lang} - ALL UI {lang}!</div>
        <div style={{marginTop:8,fontSize:12,display:"flex",flexDirection:"column",gap:6}}>
          <div style={{display:"flex",justifyContent:"space-between"}}><span>{tr.nama}</span><b>{authName}</b></div>
          <div style={{display:"flex",justifyContent:"space-between"}}><span>{tr.email}</span><b>{authEmail}</b></div>
          <div style={{display:"flex",justifyContent:"space-between"}}><span>{tr.noHP}</span><b>{authPhone}</b></div>
          <div style={{display:"flex",justifyContent:"space-between"}}><span>{tr.provider}</span><b>{authProvider} - PIN 2X - {lang}</b></div>
          <div style={{display:"flex",justifyContent:"space-between"}}><span>{tr.bahasaLabel}</span><b>{lang} - {LANGS.find(l=>l.code===lang)?.label} - ALL UI {lang}!</b></div>
          <div style={{display:"flex",justifyContent:"space-between"}}><span>{tr.bankUniversal}</span><b>BCA BNI BRI + Chase DBS + Norek show/hide + {tr.mataUang} per {tr.negara}</b></div>
          <div style={{display:"flex",justifyContent:"space-between"}}><span>{tr.izinDrive}</span><b>{permDrive?"✅":"❌"} - {tr.mataUang}</b></div>
          <div style={{display:"flex",justifyContent:"space-between"}}><span>{tr.izinSheet}</span><b>{permSheet?"✅ "+tr.exportSheet:"❌"}</b></div>
          <div style={{display:"flex",justifyContent:"space-between"}}><span>{tr.izinKamera}</span><b>{permCamera?"✅ "+tr.inputTitle:"❌"}</b></div>
          <div style={{display:"flex",justifyContent:"space-between"}}><span>{tr.izinMeta}</span><b>{permMetaAI?"✅ "+tr.chatTitle:"❌"}</b></div>
        </div>
        <div style={{marginTop:8,fontSize:10,color:"#64748b"}}>{tr.bahasa} - Jika {lang} semua berubah berbahasa {lang} - {tr.bahasaLabel} {lang} ALL UI! Font {font} + 6 grup + Dompet/Crypto atas tengah + Izin Drive/Sheet/Kamera/Meta AI + Grafik batang+pie + Export Sheet + Input foto + Tambah akun norek hide/show + Bank lokal+global + Currency dunia - 100% FULL!</div>
        <button onClick={()=>setStep("login")} style={{width:"100%",marginTop:10,padding:10,borderRadius:10,background:"#fee2e2",color:"#ef4444",border:"none",fontWeight:700}}>Reset - {lang}</button>
      </div>
    </div>}

    {showAddWallet && <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",display:"grid",placeItems:"center",zIndex:90,padding:16}}><div style={{background:"#fff",borderRadius:20,padding:16,width:"100%",maxWidth:380,maxHeight:"90vh",overflowY:"auto"}}><h3 style={{margin:0}}>{tr.tambahAkun} - {lang}</h3><div style={{fontSize:10,color:"#64748b",marginTop:4}}>{tr.sumberDanaDesc} - Bank lokal+global + {tr.mataUang} + {tr.negara}</div><div style={{display:"flex",flexDirection:"column",gap:8,marginTop:10}}><input value={newWallet.name} onChange={e=>setNewWallet({...newWallet,name:e.target.value})} placeholder={tr.nama+" - ex: Tabungan BCA, Chase USA"} style={{padding:10,borderRadius:10,border:"1px solid #e2e8f0"}}/><select value={newWallet.bank} onChange={e=>{const b=BANKS_UNIVERSAL.find(x=>x.name===e.target.value); if(b) setNewWallet({...newWallet,bank:b.name,currency:b.curr,country:b.country,flag:b.flag}); else setNewWallet({...newWallet,bank:e.target.value})}} style={{padding:10,borderRadius:10,border:"1px solid #e2e8f0"}}>{BANKS_UNIVERSAL.map(b=><option key={b.name} value={b.name}>{b.flag} {b.name} - {b.country} - {b.curr}</option>)}</select><div style={{display:"flex",gap:6}}><input value={newWallet.norek} onChange={e=>setNewWallet({...newWallet,norek:e.target.value})} placeholder={tr.mataUang+" - No rekening hide/show - "+tr.negara} style={{flex:1,padding:10,borderRadius:10,border:"1px solid #e2e8f0"}}/><select value={newWallet.currency} onChange={e=>setNewWallet({...newWallet,currency:e.target.value})} style={{padding:10,borderRadius:10,border:"1px solid #e2e8f0"}}><option>IDR</option><option>USD</option><option>SGD</option><option>EUR</option><option>GBP</option><option>JPY</option><option>MYR</option><option>AUD</option></select></div><div style={{display:"flex",gap:6}}><input type="number" value={newWallet.balance} onChange={e=>setNewWallet({...newWallet,balance:Number(e.target.value)})} placeholder={tr.saldoBersih} style={{flex:1,padding:10,borderRadius:10,border:"1px solid #e2e8f0"}}/><input value={newWallet.country} onChange={e=>setNewWallet({...newWallet,country:e.target.value})} placeholder={tr.negara} style={{flex:1,padding:10,borderRadius:10,border:"1px solid #e2e8f0"}}/></div><div style={{display:"flex",gap:8}}><button onClick={()=>setShowAddWallet(false)} style={{flex:1,padding:10,borderRadius:10,border:"1px solid #e2e8f0",background:"#fff"}}>Batal - {lang}</button><button onClick={()=>{if(selectedSource){setWallets(wallets.map(w=>w.id===selectedSource.id?{...w,name:newWallet.name||w.name,bank:newWallet.bank,norek:newWallet.norek||w.norek,currency:newWallet.currency,balance:newWallet.balance||w.balance,country:newWallet.country,flag:newWallet.flag}:w))} else {setWallets([...wallets,{id:Date.now().toString(),name:newWallet.name||"Baru "+lang,type:newWallet.type||"tabungan",color:newWallet.color,bank:newWallet.bank,norek:newWallet.norek||"-",balance:newWallet.balance||0,currency:newWallet.currency,country:newWallet.country||"Indonesia",flag:newWallet.flag||"🇮🇩",icon:"🏦"}])} setShowAddWallet(false)}} style={{flex:1,padding:10,borderRadius:10,background:"#0f172a",color:"#fff",border:"none",fontWeight:800}}>Simpan Universal - {lang} - Hide/Show + {tr.mataUang}</button></div></div></div></div>}

    <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:440,background:"#fff",borderTop:"1px solid #e2e8f0",display:"flex",justifyContent:"space-around",padding:"8px 0 14px",zIndex:30}}>
      <button onClick={()=>setBottom("beranda")} style={{background:"transparent",border:"none",display:"flex",flexDirection:"column",alignItems:"center",color:bottom==="beranda"?"#0ea5e9":"#94a3b8"}}><div style={{fontSize:22}}>🏠</div><div style={{fontSize:9,fontWeight:700}}>{tr.beranda}</div></button>
      <button onClick={()=>setBottom("riwayat")} style={{background:"transparent",border:"none",display:"flex",flexDirection:"column",alignItems:"center",color:bottom==="riwayat"?"#0ea5e9":"#94a3b8"}}><div style={{fontSize:22}}>🧾</div><div style={{fontSize:9,fontWeight:700}}>{tr.input}</div></button>
      <button onClick={()=>setBottom("chat")} style={{background:"transparent",border:"none",display:"flex",flexDirection:"column",alignItems:"center",color:bottom==="chat"?"#0ea5e9":"#94a3b8"}}><div style={{fontSize:22}}>💬</div><div style={{fontSize:9,fontWeight:700}}>{tr.chatAI}</div></button>
      <button onClick={()=>setBottom("laporan")} style={{background:"transparent",border:"none",display:"flex",flexDirection:"column",alignItems:"center",color:bottom==="laporan"?"#0ea5e9":"#94a3b8"}}><div style={{fontSize:22}}>📊</div><div style={{fontSize:9,fontWeight:700}}>{tr.laporan}</div></button>
      <button onClick={()=>setBottom("profil")} style={{background:"transparent",border:"none",display:"flex",flexDirection:"column",alignItems:"center",color:bottom==="profil"?"#0ea5e9":"#94a3b8"}}><div style={{fontSize:22}}>⚙️</div><div style={{fontSize:9,fontWeight:700}}>{tr.profil}</div></button>
    </div>
  </div>
}
