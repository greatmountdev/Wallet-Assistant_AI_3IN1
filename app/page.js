
"use client"
import { useState } from "react"
const COLORS=["#0ea5e9","#10b981","#06b6d4","#8b5cf6","#ef4444","#f59e0b","#f97316","#14b8a6"]
const BANKS=[
  {name:"BCA", country:"Indonesia", curr:"IDR", flag:"🇮🇩"}, {name:"BNI", country:"Indonesia", curr:"IDR", flag:"🇮🇩"},
  {name:"BRI", country:"Indonesia", curr:"IDR", flag:"🇮🇩"}, {name:"Mandiri", country:"Indonesia", curr:"IDR", flag:"🇮🇩"},
  {name:"BSI", country:"Indonesia", curr:"IDR", flag:"🇮🇩"}, {name:"GoPay", country:"Indonesia", curr:"IDR", flag:"🇮🇩"},
  {name:"OVO", country:"Indonesia", curr:"IDR", flag:"🇮🇩"}, {name:"DANA", country:"Indonesia", curr:"IDR", flag:"🇮🇩"},
  {name:"Chase", country:"USA", curr:"USD", flag:"🇺🇸"}, {name:"DBS", country:"Singapore", curr:"SGD", flag:"🇸🇬"},
  {name:"HSBC", country:"UK", curr:"GBP", flag:"🇬🇧"},
]
const LANGS=[
  {code:"ID", label:"Indonesia", flag:"🇮🇩"}, {code:"EN", label:"English", flag:"🇺🇸"},
  {code:"CN", label:"China", flag:"🇨🇳"}, {code:"IN", label:"India", flag:"🇮🇳"},
  {code:"VN", label:"Vietnam", flag:"🇻🇳"}, {code:"AR", label:"Arab", flag:"🇸🇦"},
]
const T={
  ID:{appTitle:"Dompet AI Universal - 6 Grup FIX",beranda:"Beranda",input:"Input",chatAI:"Chat AI",laporan:"Laporan",profil:"Profil",dompet:"Dompet",crypto:"Crypto",totalSaldo:"Total Cash Flow (4 Grup +/-)",sumberDana:"Sumber dana - 6 Grup - FIX Algoritma",tabungan:"Tabungan",ewallet:"E-Wallet",tunai:"Tunai Dompet",cicilan:"Cicilan",pengeluaran:"Pengeluaran",darurat:"Dana Darurat Wajib Pisah"},
  EN:{appTitle:"Dompet AI Universal - 6 Groups FIX",beranda:"Home",input:"Input",chatAI:"Chat AI",laporan:"Report",profil:"Profile",dompet:"Wallet",crypto:"Crypto",totalSaldo:"Total Cash Flow (4 Groups)",sumberDana:"Funding - 6 Groups - FIX Algorithm",tabungan:"Savings",ewallet:"E-Wallet",tunai:"Cash Wallet",cicilan:"Installment",pengeluaran:"Expense",darurat:"Emergency Separate"},
  CN:{appTitle:"Dompet AI 通用 - 6组修复",beranda:"首页",input:"输入",chatAI:"AI聊天",laporan:"报告",profil:"资料",dompet:"钱包",crypto:"加密",totalSaldo:"总现金流",sumberDana:"资金来源 - 6组 - 修复算法",tabungan:"储蓄",ewallet:"电子钱包",tunai:"现金钱包",cicilan:"分期",pengeluaran:"支出",darurat:"应急基金"},
  IN:{appTitle:"Dompet AI 6 समूह FIX",beranda:"होम",input:"इनपुट",chatAI:"चैट AI",laporan:"रिपोर्ट",profil:"प्रोफाइल",dompet:"वॉलेट",crypto:"क्रिप्टो",totalSaldo:"कुल कैश फ्लो",sumberDana:"फंडिंग - 6 समूह - FIX",tabungan:"बचत",ewallet:"ई-वॉलेट",tunai:"नकद",cicilan:"किस्त",pengeluaran:"व्यय",darurat:"आपातकालीन"},
  VN:{appTitle:"Dompet AI 6 Nhóm FIX",beranda:"Trang chủ",input:"Nhập",chatAI:"Chat AI",laporan:"Báo cáo",profil:"Hồ sơ",dompet:"Ví",crypto:"Crypto",totalSaldo:"Tổng Dòng tiền",sumberDana:"Nguồn vốn - 6 Nhóm - FIX",tabungan:"Tiết kiệm",ewallet:"Ví điện tử",tunai:"Ví tiền mặt",cicilan:"Trả góp",pengeluaran:"Chi tiêu",darurat:"Khẩn cấp"},
  AR:{appTitle:"Dompet AI 6 مجموعات FIX",beranda:"الرئيسية",input:"إدخال",chatAI:"دردشة AI",laporan:"تقرير",profil:"الملف",dompet:"محفظة",crypto:"تشفير",totalSaldo:"إجمالي التدفق",sumberDana:"التمويل - 6 مجموعات - FIX",tabungan:"الادخار",ewallet:"المحفظة",tunai:"النقدية",cicilan:"التقسيط",pengeluaran:"المصروفات",darurat:"الطوارئ"},
}
export default function Page(){
  const [step,setStep]=useState("login")
  const [authName,setAuthName]=useState("Kawan"), [authEmail,setAuthEmail]=useState("kawan@gmail.com"), [authPhone,setAuthPhone]=useState("0812****890")
  const [pin,setPin]=useState(""), [pinStep,setPinStep]=useState(1), [pin1Saved,setPin1Saved]=useState("")
  const [mode,setMode]=useState("Dompet"), [cryptoUnlocked,setCryptoUnlocked]=useState(false), [showSeed,setShowSeed]=useState(false)
  const [font,setFont]=useState("Standar"), [lang,setLang]=useState("ID"), [hideTotal,setHideTotal]=useState(false), [hideNorek,setHideNorek]=useState({}), [bottom,setBottom]=useState("beranda"), [showMenu,setShowMenu]=useState(false)
  const [newTx,setNewTx]=useState({title:"",amount:0,jenis:"keluar",fromWalletId:"1",toGroup:"pengeluaran",toCicilanId:"7"})
  const [showAddTx,setShowAddTx]=useState(false)
  const [wallets,setWallets]=useState([
    {id:"1",name:"Tabungan BCA",type:"tabungan",group:"tabungan",color:"#0ea5e9",bank:"BCA",norek:"1234567890",balance:7500000,currency:"IDR",flag:"🇮🇩",icon:"🏦",platform:"",dueDate:""},
    {id:"2",name:"Tabungan BNI",type:"tabungan",group:"tabungan",color:"#2563eb",bank:"BNI",norek:"0987654321",balance:2500000,currency:"IDR",flag:"🇮🇩",icon:"🏦",platform:"",dueDate:""},
    {id:"3",name:"GoPay",type:"ewallet",group:"ewallet",color:"#10b981",bank:"GoPay",norek:"081234567890",balance:375000,currency:"IDR",flag:"🇮🇩",icon:"📱",platform:"",dueDate:""},
    {id:"4",name:"OVO",type:"ewallet",group:"ewallet",color:"#8b5cf6",bank:"OVO",norek:"081234567891",balance:125000,currency:"IDR",flag:"🇮🇩",icon:"📱",platform:"",dueDate:""},
    {id:"5",name:"Tunai Dompet",type:"cash",group:"tunai",color:"#06b6d4",bank:"Cash",norek:"-",balance:1205000,currency:"IDR",flag:"🇮🇩",icon:"👛",platform:"",dueDate:""},
    {id:"6",name:"Dana Darurat Wajib Pisah",type:"darurat",group:"darurat",color:"#f59e0b",bank:"BSI",norek:"9988776655",balance:5000000,currency:"IDR",flag:"🇮🇩",icon:"🚨",platform:"",dueDate:""},
    {id:"7",name:"Cicilan Motor",type:"cicilan",group:"cicilan",color:"#ef4444",bank:"FIF",norek:"-",balance:1200000,currency:"IDR",flag:"🇮🇩",icon:"🏍️",platform:"FIF",dueDate:"2026-10-20"},
    {id:"8",name:"Cicilan HP",type:"cicilan",group:"cicilan",color:"#ef4444",bank:"Kredivo",norek:"-",balance:800000,currency:"IDR",flag:"🇮🇩",icon:"📱",platform:"Kredivo",dueDate:"2026-10-25"},
    {id:"9",name:"Pengeluaran",type:"pengeluaran",group:"pengeluaran",color:"#f97316",bank:"-",norek:"-",balance:0,currency:"IDR",flag:"🌍",icon:"💸",platform:"",dueDate:""},
  ])
  const [txs,setTxs]=useState([
    {id:"1",title:"Kopi dan makan siang",amount:45000,fromWalletId:"5",fromGroup:"tunai",toGroup:"pengeluaran",jenis:"keluar",date:"3 Okt 2026",foto:"struk.jpg",source:"Tunai Dompet",curr:"IDR",note:"Belanja 45k - SALAH SATU: Tunai Dompet - Bukan semua kepotong!"},
    {id:"2",title:"Isi GoPay dari BCA",amount:75000,fromWalletId:"1",toGroup:"ewallet",jenis:"pindah",date:"3 Okt 2026",foto:null,source:"BCA -> GoPay",curr:"IDR",note:"Pindah: BCA -75k, GoPay +75k - Hanya 2 akun"},
    {id:"3",title:"Bayar cicilan motor dari BCA",amount:500000,fromWalletId:"1",toGroup:"cicilan",toCicilanId:"7",jenis:"keluar",date:"2 Okt 2026",foto:"bon.jpg",source:"BCA -> Cicilan Motor",curr:"IDR",note:"Bayar cicilan 500k - Sumber SALAH SATU: BCA - Bukan semua grup kepotong!"},
  ])
  const [newWallet,setNewWallet]=useState({name:"",type:"tabungan",group:"tabungan",bank:"BCA",norek:"",color:COLORS[0],balance:0,platform:"",dueDate:"",currency:"IDR",flag:"🇮🇩"})
  const [showAddWallet,setShowAddWallet]=useState(false), [selectedSource,setSelectedSource]=useState(null)
  const [chat,setChat]=useState([{role:"ai",text:"Algoritma FIX: Belanja/Cicilan = Pilih SALAH SATU sumber Tabungan/E-Wallet/Tunai/Darurat - Bukan semua kepotong!"}])
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
  const cashFlowGroups=["tabungan","ewallet","tunai","darurat"]
  const totalCashFlow=wallets.filter(w=>cashFlowGroups.includes(w.group)).reduce((a,b)=>a+b.balance,0)
  const totalTabungan=wallets.filter(w=>w.group==="tabungan").reduce((a,b)=>a+b.balance,0)
  const totalEwallet=wallets.filter(w=>w.group==="ewallet").reduce((a,b)=>a+b.balance,0)
  const totalTunai=wallets.filter(w=>w.group==="tunai").reduce((a,b)=>a+b.balance,0)
  const totalDarurat=wallets.filter(w=>w.group==="darurat").reduce((a,b)=>a+b.balance,0)
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
          <h2 style={{margin:0,textAlign:"center",fontWeight:900}}>{tr.appTitle}</h2>
          <p style={{textAlign:"center",fontSize:10,color:"#64748b",marginTop:4}}>6 Grup FIX - Belanja/Cicilan pilih SALAH SATU sumber Tabungan/E-Wallet/Saku/Darurat - Bukan semua kepotong!</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,marginTop:10}}>
            {LANGS.map(l=><button key={l.code} onClick={()=>setLang(l.code)} style={{padding:"6px 4px",borderRadius:8,border:lang===l.code?"2px solid #0ea5e9":"1px solid #e2e8f0",background:lang===l.code?"#e0f2fe":"#fff",fontSize:10,fontWeight:700}}>{l.flag} {l.code}</button>)}
          </div>
          <input value={authName} onChange={e=>setAuthName(e.target.value)} placeholder="Nama" style={{width:"100%",padding:12,borderRadius:10,border:"1px solid #e2e8f0",marginTop:12}}/>
          <input value={authEmail} onChange={e=>setAuthEmail(e.target.value)} placeholder="Email" style={{width:"100%",padding:12,borderRadius:10,border:"1px solid #e2e8f0",marginTop:8}}/>
          <input value={authPhone} onChange={e=>setAuthPhone(e.target.value)} placeholder="Phone" style={{width:"100%",padding:12,borderRadius:10,border:"1px solid #e2e8f0",marginTop:8}}/>
          <button onClick={()=>setStep("pin")} style={{width:"100%",padding:14,borderRadius:12,marginTop:14,background:"#0f172a",color:"#fff",border:"none",fontWeight:700}}>Lanjut PIN - 6 Grup FIX</button>
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
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginTop:20}}>
            {[1,2,3,4,5,6,7,8,9].map(n=><button key={n} onClick={()=>handleNumber(n.toString())} style={{height:64,borderRadius:16,border:"1px solid #e2e8f0",background:"#fff",fontSize:22,fontWeight:800}}>{n}</button>)}
            <button onClick={()=>setPin(pin.slice(0,-1))} style={{height:64,borderRadius:16,background:"#fee2e2",border:"1px solid #e2e8f0"}}>⌫</button>
            <button onClick={()=>handleNumber("0")} style={{height:64,borderRadius:16,background:"#fff",border:"1px solid #e2e8f0",fontSize:22,fontWeight:800}}>0</button>
            <button onClick={()=>{ if(pin.length===6){ if(pinStep===1){ setPin1Saved(pin); setPin(""); setPinStep(2)} else { if(pin===pin1Saved){ setStep("main")} else { setPin(""); setPinStep(1)} } } }} style={{height:64,borderRadius:16,background:"#0f172a",color:"#fff",fontWeight:800}}>✓</button>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div style={{maxWidth:440,margin:"0 auto",minHeight:"100vh",background:"#f1f7ff",fontFamily:fontCfg.family,fontSize:fontCfg.size,fontWeight:fontCfg.weight,paddingBottom:88}}>
      <div style={{background:"linear-gradient(90deg,#06b6d4,#8b5cf6)",padding:"12px 14px 0",color:"#fff",position:"sticky",top:0,zIndex:20}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            <button onClick={()=>setShowMenu(true)} style={{width:44,height:44,borderRadius:14,background:"#fff",border:"none",fontSize:20}}>☰</button>
            <div><div style={{fontWeight:900,fontSize:16}}>{tr.appTitle}</div><div style={{fontSize:9,opacity:.9}}>{LANGS.find(l=>l.code===lang)?.flag} {lang} - 6 Grup FIX - {authName}</div></div>
          </div>
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
          <div style={{width:"96%",maxWidth:380,background:"#f8fbff",height:"100%",overflowY:"auto",padding:12}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <h2 style={{margin:0,fontSize:15}}>{tr.sumberDana} - {lang}</h2>
              <button onClick={()=>setShowMenu(false)} style={{width:36,height:36,borderRadius:10,background:"#fff",border:"1px solid #e2e8f0"}}>✕</button>
            </div>
            <div style={{fontSize:9,color:"#64748b",marginTop:4,background:"#fff",borderRadius:8,padding:8,border:"2px solid #0ea5e9"}}>
              <b style={{color:"#ef4444"}}>FIX ALGORITMA:</b> Belanja/Cicilan = Pilih SALAH SATU sumber Tabungan/E-Wallet/Saku Dompet/Dana Darurat - BUKAN semua 4 grup terpotong! 🙌<br/>
              Contoh: Belanja kopi 45k dari Tunai Dompet: Hanya Tunai 1.205.000 -&gt; 1.160.000. Tabungan, E-Wallet, Darurat TETAP!
            </div>
            {[
              {key:"tabungan",label:tr.tabungan+" - BCA BNI BRI + norek show/hide + warna",icon:"🏦",color:"#0ea5e9"},
              {key:"ewallet",label:tr.ewallet+" - GoPay OVO DANA + warna",icon:"📱",color:"#10b981"},
              {key:"tunai",label:tr.tunai+" - Hanya 1 tab + warna",icon:"👛",color:"#06b6d4"},
              {key:"darurat",label:tr.darurat+" - Wajib Pisah warna",icon:"🚨",color:"#f59e0b"},
              {key:"cicilan",label:tr.cicilan+" - Custom platform + tgl jatuh tempo notif + warna",icon:"🏍️",color:"#8b5cf6"},
              {key:"pengeluaran",label:tr.pengeluaran+" - Hanya 1 tab custom warna",icon:"💸",color:"#ef4444"},
            ].map(g=>{
              const list=groupedWallets[g.key]||[]
              const totalGroup=list.reduce((a,b)=>a+b.balance,0)
              return (
                <div key={g.key} style={{marginTop:10,background:"#fff",borderRadius:16,padding:10,border:"2px solid "+g.color+"30"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div style={{display:"flex",gap:8,alignItems:"center"}}>
                      <div style={{width:36,height:36,borderRadius:10,background:g.color+"22",display:"grid",placeItems:"center"}}>{g.icon}</div>
                      <div><div style={{fontWeight:900,fontSize:11}}>{g.label}</div><div style={{fontSize:9,color:"#64748b"}}>Rp {totalGroup.toLocaleString("id-ID")} - {list.length} akun - SALAH SATU sumber</div></div>
                    </div>
                    <button onClick={()=>{setNewWallet({name:"",type:g.key,group:g.key,bank:g.key==="tabungan"?"BCA":g.key==="ewallet"?"GoPay":g.key==="tunai"?"Cash":g.key==="darurat"?"BSI":g.key==="cicilan"?"FIF":"-",norek:"",color:g.color,balance:0,platform:"",dueDate:"",currency:"IDR",flag:"🇮🇩"}); setSelectedSource(null); setShowAddWallet(true)}} style={{width:32,height:32,borderRadius:8,background:g.color,color:"#fff",border:"none",fontWeight:900}}>+</button>
                  </div>
                  <div style={{marginTop:8,display:"flex",flexDirection:"column",gap:6}}>
                    {list.map(w=>(
                      <div key={w.id} style={{background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:12,padding:8,display:"flex",alignItems:"center",gap:8}}>
                        <div style={{width:40,height:40,borderRadius:10,background:w.color+"22",display:"grid",placeItems:"center"}}>{w.flag} {w.icon}</div>
                        <div style={{flex:1}}>
                          <div style={{fontWeight:800,fontSize:11}}>{w.name}</div>
                          <div style={{fontSize:9,color:"#64748b"}}>{w.bank} {w.platform?("• "+w.platform):""} {w.dueDate?("• jatuh "+w.dueDate):""} • Rp {w.balance.toLocaleString("id-ID")}</div>
                          <div style={{fontSize:9,display:"flex",gap:4,marginTop:2}}>
                            <span>{w.flag} {displayNorek(w.norek,w.id)}</span>
                            {w.norek!=="-"&&w.norek!==""&&(
                              <>
                                <button onClick={()=>setHideNorek({...hideNorek,[w.id]:!hideNorek[w.id]})} style={{border:"none",background:"#fff",borderRadius:4,padding:"0 4px",fontSize:8}}>{hideNorek[w.id]?"🙈":"👁️"} Show</button>
                                <button onClick={()=>{try{navigator.clipboard?.writeText(w.norek)}catch{}}} style={{border:"none",background:"#fff",borderRadius:4,padding:"0 4px",fontSize:8}}>📋 Copy</button>
                              </>
                            )}
                          </div>
                        </div>
                        <div style={{display:"flex",flexDirection:"column",gap:4}}>
                          {w.group==="cicilan" && (
                            <button onClick={()=>{setNewTx({title:"Bayar "+w.name,amount:Math.min(500000,w.balance),jenis:"keluar",fromWalletId:groupedWallets.tabungan[0]?.id||"1",toGroup:"cicilan",toCicilanId:w.id}); setShowAddTx(true)}} style={{padding:"4px 6px",borderRadius:6,background:"#10b981",color:"#fff",border:"none",fontSize:8,fontWeight:700}}>💳 Bayar - Pilih Sumber</button>
                          )}
                          <button onClick={()=>{setSelectedSource(w); setNewWallet({name:w.name,type:w.type,group:w.group,bank:w.bank,norek:w.norek,color:w.color,balance:w.balance,platform:w.platform||"",dueDate:w.dueDate||"",currency:w.currency,flag:w.flag||"🇮🇩"}); setShowAddWallet(true)}} style={{width:28,height:28,borderRadius:6,background:"#fff",border:"1px solid #e2e8f0",fontSize:10}}>✎</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
            <div style={{marginTop:12,background:"#0f172a",color:"#fff",borderRadius:12,padding:10,fontSize:10}}>
              <b>Total Cash Flow (4 Grup):</b> Rp {totalCashFlow.toLocaleString("id-ID")}<br/>Tabungan: Rp {totalTabungan.toLocaleString("id-ID")} + E-Wallet: Rp {totalEwallet.toLocaleString("id-ID")} + Tunai: Rp {totalTunai.toLocaleString("id-ID")} + Darurat: Rp {totalDarurat.toLocaleString("id-ID")}
            </div>
          </div>
          <div style={{flex:1,background:"rgba(0,0,0,.25)"}} onClick={()=>setShowMenu(false)}></div>
        </div>
      )}

      {showAddTx && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",display:"grid",placeItems:"center",zIndex:92,padding:12}}>
          <div style={{background:"#fff",borderRadius:16,padding:14,width:"100%",maxWidth:360,maxHeight:"90vh",overflowY:"auto"}}>
            <h3 style={{margin:0,fontSize:14}}>Input Baru - FIX: Pilih SALAH SATU Sumber - {lang}</h3>
            <div style={{fontSize:9,color:"#ef4444",marginTop:4,background:"#fef2f2",borderRadius:8,padding:6,border:"1px solid #fecaca"}}>
              <b>FIX: Cicilan & Belanja = SALAH SATU Sumber! 🙌</b><br/>Belanja/Cicilan pilih sumber Tabungan/E-Wallet/Saku/Darurat - Bukan semua 4 grup kepotong! Contoh: Bayar cicilan motor 500k dari BCA: Hanya BCA kepotong 500k, cicilan berkurang 500k. Yang lain TETAP!
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:8,marginTop:10}}>
              <input value={newTx.title} onChange={e=>setNewTx({...newTx,title:e.target.value})} placeholder="Judul - ex: Kopi, Gaji, Bayar cicilan" style={{padding:8,borderRadius:8,border:"1px solid #e2e8f0",fontSize:11}}/>
              <div style={{display:"flex",gap:6}}>
                <input type="number" value={newTx.amount} onChange={e=>setNewTx({...newTx,amount:Number(e.target.value)})} placeholder="Jumlah Rp" style={{flex:1,padding:8,borderRadius:8,border:"1px solid #e2e8f0",fontSize:11}}/>
                <select value={newTx.jenis} onChange={e=>setNewTx({...newTx,jenis:e.target.value})} style={{flex:1,padding:8,borderRadius:8,border:"1px solid #e2e8f0",fontSize:11}}>
                  <option value="keluar">Keluar - Belanja/Cicilan</option>
                  <option value="masuk">Masuk - Gaji</option>
                  <option value="pindah">Pindah Antar Cash Flow</option>
                </select>
              </div>
              <div style={{background:"#f0f9ff",borderRadius:8,padding:8,border:"1px solid #bae6fd"}}>
                <div style={{fontSize:10,fontWeight:800,color:"#0369a1"}}>PILIH SUMBER DANA - SALAH SATU (Bukan semua kepotong!):</div>
                <select value={newTx.fromWalletId} onChange={e=>setNewTx({...newTx,fromWalletId:e.target.value})} style={{width:"100%",padding:8,borderRadius:8,border:"1px solid #0ea5e9",marginTop:6,fontSize:11,background:"#fff"}}>
                  <optgroup label="Cash Flow - Pilih SALAH SATU sumber - Ini yang kepotong!">
                    {wallets.filter(w=>["tabungan","ewallet","tunai","darurat"].includes(w.group)).map(w=><option key={w.id} value={w.id}>{w.flag} {w.name} - Rp {w.balance.toLocaleString("id-ID")} - {w.group} - SALAH SATU KEPOTONG</option>)}
                  </optgroup>
                </select>
                <div style={{fontSize:8,color:"#0369a1",marginTop:4}}>Contoh: Belanja kopi 45k dari Tunai Dompet: Hanya Tunai 1.205.000 -&gt; 1.160.000. Tabungan, E-Wallet, Darurat TETAP! Cicilan motor 500k dari BCA: Hanya BCA 7.5jt -&gt; 7jt, cicilan 1.2jt -&gt; 700k. 🙌</div>
              </div>
              {newTx.toGroup==="cicilan" && (
                <div style={{background:"#fef3c7",borderRadius:8,padding:8,border:"1px solid #fde68a"}}>
                  <div style={{fontSize:10,fontWeight:800,color:"#92400e"}}>PILIH CICILAN YANG DIBAYAR (Custom platform + tgl jatuh tempo):</div>
                  <select value={newTx.toCicilanId} onChange={e=>setNewTx({...newTx,toCicilanId:e.target.value})} style={{width:"100%",padding:8,borderRadius:8,border:"1px solid #f59e0b",marginTop:6,fontSize:11,background:"#fff"}}>
                    {groupedWallets.cicilan.map(c=><option key={c.id} value={c.id}>{c.icon} {c.name} - {c.platform} - Jatuh tempo {c.dueDate} - Sisa Rp {c.balance.toLocaleString("id-ID")}</option>)}
                  </select>
                  <div style={{fontSize:8,color:"#92400e",marginTop:4}}>Bayar cicilan: Pilih cicilan, lalu sumber dana SALAH SATU di atas - Hanya sumber kepotong, cicilan berkurang! Tidak semua grup kepotong!</div>
                </div>
              )}
              <div style={{background:"#fef3c7",borderRadius:8,padding:8,border:"1px solid #fde68a"}}>
                <div style={{fontSize:10,fontWeight:800,color:"#92400e"}}>TUJUAN:</div>
                <select value={newTx.toGroup} onChange={e=>setNewTx({...newTx,toGroup:e.target.value})} style={{width:"100%",padding:8,borderRadius:8,border:"1px solid #f59e0b",marginTop:6,fontSize:11,background:"#fff"}}>
                  <option value="pengeluaran">Pengeluaran - Hanya 1 tab - Mengurangi SALAH SATU cash flow</option>
                  <option value="cicilan">Cicilan - Custom platform + tgl jatuh tempo - Mengurangi SALAH SATU - Pilih sumber Tabungan/E-Wallet/Saku/Darurat</option>
                  <option value="tabungan">Tabungan - Masuk ke Tabungan</option>
                  <option value="ewallet">E-Wallet - Masuk ke E-Wallet</option>
                  <option value="tunai">Tunai Dompet - Masuk ke Tunai</option>
                  <option value="darurat">Dana Darurat - Masuk ke Darurat</option>
                </select>
              </div>
              <div style={{display:"flex",gap:6}}>
                <button onClick={()=>setShowAddTx(false)} style={{flex:1,padding:8,borderRadius:8,border:"1px solid #e2e8f0",background:"#fff",fontSize:11}}>Batal</button>
                <button onClick={()=>{
                  if(!newTx.title||!newTx.amount) return alert("Isi judul & jumlah");
                  const fromW=wallets.find(w=>w.id===newTx.fromWalletId);
                  if(!fromW) return alert("Pilih sumber dana SALAH SATU!");
                  let newWallets=[...wallets];
                  if(newTx.jenis==="keluar" && newTx.toGroup==="cicilan"){
                    const cicilanId=newTx.toCicilanId;
                    newWallets=newWallets.map(w=>{
                      if(w.id===newTx.fromWalletId) return {...w,balance:w.balance-newTx.amount};
                      if(w.id===cicilanId) return {...w,balance:Math.max(0,w.balance-newTx.amount)};
                      return w;
                    });
                  } else if(newTx.jenis==="keluar"){
                    newWallets=newWallets.map(w=>w.id===newTx.fromWalletId?{...w,balance:w.balance-newTx.amount}:w);
                  } else if(newTx.jenis==="masuk"){
                    const map={tabungan:groupedWallets.tabungan[0]?.id, ewallet:groupedWallets.ewallet[0]?.id, tunai:groupedWallets.tunai[0]?.id, darurat:groupedWallets.darurat[0]?.id};
                    const toId=map[newTx.toGroup];
                    if(toId) newWallets=newWallets.map(w=>w.id===toId?{...w,balance:w.balance+newTx.amount}:w);
                  } else if(newTx.jenis==="pindah"){
                    const toW=groupedWallets[newTx.toGroup]?.[0];
                    if(toW){
                      newWallets=newWallets.map(w=>{
                        if(w.id===newTx.fromWalletId) return {...w,balance:w.balance-newTx.amount};
                        if(w.id===toW.id) return {...w,balance:w.balance+newTx.amount};
                        return w;
                      });
                    }
                  }
                  setWallets(newWallets);
                  let note="";
                  if(newTx.jenis==="keluar" && newTx.toGroup==="cicilan"){
                    const c=wallets.find(w=>w.id===newTx.toCicilanId);
                    note="Bayar CICILAN "+(c?.name||"")+" "+newTx.amount.toLocaleString("id-ID")+" - Pakai dana SALAH SATU: "+fromW.name+" (bukan semua 4 grup terpotong!) - "+fromW.name+" sisa Rp "+(fromW.balance-newTx.amount).toLocaleString("id-ID")+" - "+(c?.name||"Cicilan")+" sisa hutang Rp "+Math.max(0,(c?.balance||0)-newTx.amount).toLocaleString("id-ID")+" - Custom platform "+(c?.platform||"")+" jatuh tempo "+(c?.dueDate||"")+" 🙌";
                  } else if(newTx.jenis==="keluar"){
                    note="Belanja "+newTx.amount.toLocaleString("id-ID")+" - Ambil dari SALAH SATU: "+fromW.name+" (bukan semua 4 grup!) - Sisa "+fromW.name+": Rp "+(fromW.balance-newTx.amount).toLocaleString("id-ID")+" 🙌";
                  } else {
                    note="Pindah/Masuk "+newTx.amount.toLocaleString("id-ID")+" - Hanya 2 akun berubah!";
                  }
                  setTxs([{id:Date.now().toString(),title:newTx.title,amount:newTx.amount,fromWalletId:newTx.fromWalletId,fromGroup:fromW.group,toGroup:newTx.toGroup,toCicilanId:newTx.toCicilanId,jenis:newTx.jenis,date:new Date().toLocaleDateString("id-ID",{day:"numeric",month:"short",year:"numeric"}),foto:null,source:fromW.name+" -> "+(newTx.toGroup==="cicilan"?(wallets.find(w=>w.id===newTx.toCicilanId)?.name||"Cicilan"):newTx.toGroup),curr:fromW.currency,note:note},...txs]);
                  setShowAddTx(false);
                  setNewTx({title:"",amount:0,jenis:"keluar",fromWalletId:"1",toGroup:"pengeluaran",toCicilanId:"7"});
                }} style={{flex:1,padding:8,borderRadius:8,background:"#0ea5e9",color:"#fff",border:"none",fontWeight:800,fontSize:11}}>Simpan - FIX SALAH SATU Sumber 🙌</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {bottom==="beranda" && (
        <div style={{padding:12}}>
          <div style={{background:"linear-gradient(135deg,#2563eb,#0ea5e9)",borderRadius:20,padding:16,color:"#fff"}}>
            <div style={{display:"flex",justifyContent:"space-between"}}><div style={{fontSize:11}}>{tr.totalSaldo} - {lang} - FIX SALAH SATU</div><span style={{fontSize:9,background:"rgba(255,255,255,.2)",padding:"4px 8px",borderRadius:8}}>{authName}</span></div>
            <div style={{fontSize:24,fontWeight:900,marginTop:6}}>{hideTotal?"Rp ••••••":"Rp "+totalCashFlow.toLocaleString("id-ID")}</div>
            <div style={{fontSize:9,marginTop:4,opacity:.9}}>FIX: Belanja/Cicilan pilih SALAH SATU Tabungan/E-Wallet/Saku/Darurat - Bukan semua kepotong! 🙌</div>
            <div style={{display:"flex",gap:6,marginTop:10}}>
              <div style={{flex:1,background:"rgba(255,255,255,.2)",borderRadius:10,padding:8}}><div style={{fontSize:8}}>Tabungan: Rp {totalTabungan.toLocaleString("id-ID")}</div><div style={{fontSize:8,marginTop:2}}>E-Wallet: Rp {totalEwallet.toLocaleString("id-ID")}</div></div>
              <div style={{flex:1,background:"rgba(255,255,255,.2)",borderRadius:10,padding:8}}><div style={{fontSize:8}}>Tunai: Rp {totalTunai.toLocaleString("id-ID")}</div><div style={{fontSize:8,marginTop:2}}>Darurat: Rp {totalDarurat.toLocaleString("id-ID")}</div></div>
            </div>
          </div>
          <div style={{background:"#fff",borderRadius:14,padding:10,marginTop:8,border:"1px solid #e2e8f0"}}>
            <div style={{fontWeight:700,fontSize:11}}>Transaksi - FIX SALAH SATU Sumber - {lang}</div>
            <div style={{marginTop:8,display:"flex",flexDirection:"column",gap:6}}>
              {txs.slice(0,4).map(t=>(
                <div key={t.id} style={{background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:12,padding:8,display:"flex",gap:8,alignItems:"center"}}>
                  <div style={{width:40,height:40,borderRadius:10,background:t.foto?"#dcfce7":"#f1f5f9",display:"grid",placeItems:"center"}}>{t.foto?"📸":"🧾"}</div>
                  <div style={{flex:1}}><div style={{fontWeight:700,fontSize:11}}>{t.title}</div><div style={{fontSize:8,color:"#64748b"}}>{t.date} • {t.source} • {t.note}</div></div>
                  <div style={{fontWeight:800,fontSize:10,color:t.jenis==="keluar"?"#ef4444":"#10b981"}}>{t.jenis==="keluar"?"-":"+"} Rp {t.amount.toLocaleString("id-ID")}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {bottom==="riwayat" && (
        <div style={{padding:12}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <h2 style={{margin:0,fontSize:16}}>Input - FIX SALAH SATU Sumber - {lang} 📷</h2>
            <button onClick={()=>setShowAddTx(true)} style={{background:"#0ea5e9",color:"#fff",border:"none",borderRadius:10,padding:"8px 10px",fontWeight:700,fontSize:10}}>📷 + Input FIX Pilih Sumber</button>
          </div>
          <div style={{background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:8,padding:8,marginTop:8,fontSize:9}}>
            <b>FIX: Jangan salah tafsir! 🙌</b> Belanja/Cicilan = Pilih SALAH SATU Tabungan/E-Wallet/Saku Dompet/Dana Darurat - Bukan semua 4 grup kepotong! Contoh: Kopi 45k dari Tunai: Hanya Tunai 1.205.000 -&gt; 1.160.000. Tabungan, E-Wallet, Darurat TETAP!
          </div>
          <div style={{marginTop:10,display:"flex",flexDirection:"column",gap:6}}>
            {txs.map(t=>(
              <div key={t.id} style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:12,padding:8,display:"flex",gap:8,alignItems:"center"}}>
                <div style={{width:44,height:44,borderRadius:10,background:t.foto?"#dcfce7":"#f1f5f9",display:"grid",placeItems:"center"}}>{t.foto?"📸":"🧾"}</div>
                <div style={{flex:1}}><div style={{fontWeight:700,fontSize:11}}>{t.title}</div><div style={{fontSize:8,color:"#64748b"}}>{t.date} • {t.source} • {t.note}</div></div>
                <div style={{fontWeight:800,fontSize:10}}>{t.curr} {t.amount.toLocaleString("id-ID")}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {bottom==="chat" && (
        <div style={{padding:12}}>
          <h2 style={{margin:0,fontSize:16}}>Chat META AI - Voice/Type + 6 Grup FIX - {lang}</h2>
          <div style={{background:"#fff",borderRadius:16,padding:10,marginTop:10,minHeight:300,border:"1px solid #e2e8f0"}}>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {chat.map((c,i)=><div key={i} style={{alignSelf:c.role==="ai"?"flex-start":"flex-end",maxWidth:"85%",background:c.role==="ai"?"#f8fafc":"#0ea5e9",color:c.role==="ai"?"#0f172a":"#fff",borderRadius:12,padding:8,fontSize:10}}>{c.text} - {lang}</div>)}
            </div>
            <div style={{display:"flex",gap:6,marginTop:10}}>
              <input value={chatInput} onChange={e=>setChatInput(e.target.value)} placeholder="Tanya - 6 Grup FIX - SALAH SATU sumber - Cicilan juga!" style={{flex:1,padding:10,borderRadius:16,border:"1px solid #e2e8f0",fontSize:10}}/>
              <button onClick={()=>{if(!chatInput) return; setChat([...chat,{role:"user",text:chatInput},{role:"ai",text:"META AI: "+chatInput+" - FIX: Belanja/Cicilan pilih SALAH SATU Tabungan/E-Wallet/Saku/Darurat - Cash Flow Rp "+totalCashFlow.toLocaleString("id-ID")+" - "+lang}]); setChatInput("")}} style={{width:40,height:40,borderRadius:10,background:"#0ea5e9",border:"none",color:"#fff"}}>➤</button>
            </div>
          </div>
        </div>
      )}

      {bottom==="laporan" && (
        <div style={{padding:12}}>
          <h2 style={{margin:0,fontSize:16}}>Laporan - Grafik + Export Sheet - 6 Grup FIX - {lang}</h2>
          <div style={{background:"#fff",borderRadius:16,padding:12,marginTop:10,border:"1px solid #e2e8f0"}}>
            <div style={{fontWeight:900,fontSize:13}}>📊 Grafik Batang - 6 Grup FIX - SALAH SATU - {lang}</div>
            <div style={{display:"flex",alignItems:"end",gap:4,height:110,marginTop:10}}>
              {[{l:tr.tabungan.slice(0,3),v:75,c:"#0ea5e9"},{l:tr.ewallet.slice(0,3),v:25,c:"#10b981"},{l:tr.tunai.slice(0,3),v:20,c:"#06b6d4"},{l:tr.darurat.slice(0,3),v:50,c:"#f59e0b"},{l:tr.cicilan.slice(0,3),v:30,c:"#8b5cf6"},{l:tr.pengeluaran.slice(0,3),v:45,c:"#ef4444"}].map((b,i)=><div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2}}><div style={{width:"100%",height:b.v,background:b.c,borderRadius:"6px 6px 0 0",display:"grid",placeItems:"center",color:"#fff",fontSize:8,fontWeight:900}}>{b.v}</div><div style={{fontSize:8,fontWeight:700}}>{b.l}</div></div>)}
            </div>
            <div style={{marginTop:8,fontSize:8,color:"#64748b"}}>FIX: Belanja/Cicilan pilih SALAH SATU Tabungan/E-Wallet/Saku/Darurat - Bukan semua kepotong! - Export Sheet - {lang}</div>
          </div>
        </div>
      )}

      {bottom==="profil" && (
        <div style={{padding:12}}>
          <h2 style={{margin:0,fontSize:18}}>Setting - 6 Grup FIX - {lang}</h2>
          <div style={{background:"#fff",borderRadius:14,padding:10,marginTop:10,border:"1px solid #e2e8f0"}}>
            <div style={{fontWeight:700,fontSize:12}}>Akun Terhubung - 6 Grup FIX - ALL UI {lang} - Cicilan & Belanja SALAH SATU Sumber!</div>
            <div style={{marginTop:6,fontSize:11,display:"flex",flexDirection:"column",gap:4}}>
              <div style={{display:"flex",justifyContent:"space-between"}}><span>6 Grup FIX</span><b>Tabungan+E-Wallet+Tunai+Darurat (Cash Flow +/- SALAH SATU) | Pengeluaran+Cicilan (Mengurangi SALAH SATU)</b></div>
              <div style={{display:"flex",justifyContent:"space-between"}}><span>Cash Flow Total</span><b>Rp {totalCashFlow.toLocaleString("id-ID")} - SALAH SATU kepotong</b></div>
              <div style={{display:"flex",justifyContent:"space-between"}}><span>Contoh Cicilan</span><b>Bayar cicilan motor 500k dari BCA: BCA 7.5jt-&gt;7jt, Cicilan 1.2jt-&gt;700k, yang lain TETAP! 🙌</b></div>
            </div>
          </div>
        </div>
      )}

      {showAddWallet && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",display:"grid",placeItems:"center",zIndex:90,padding:12}}>
          <div style={{background:"#fff",borderRadius:16,padding:14,width:"100%",maxWidth:360}}>
            <h3 style={{margin:0,fontSize:14}}>Tambah Akun - 6 Grup FIX - {lang}</h3>
            <div style={{display:"flex",flexDirection:"column",gap:8,marginTop:10}}>
              <select value={newWallet.group} onChange={e=>setNewWallet({...newWallet,group:e.target.value})} style={{padding:8,borderRadius:8,border:"1px solid #e2e8f0",fontSize:11}}>
                <option value="tabungan">Tabungan - Cash Flow SALAH SATU - BCA BNI BRI + norek + warna</option>
                <option value="ewallet">E-Wallet - Cash Flow SALAH SATU - GoPay OVO DANA + warna</option>
                <option value="tunai">Tunai Dompet - Hanya 1 tab + warna - SALAH SATU</option>
                <option value="darurat">Dana Darurat Wajib Pisah - warna - SALAH SATU</option>
                <option value="cicilan">Cicilan - Custom platform + tgl jatuh tempo + warna - Bayar pakai SALAH SATU sumber</option>
                <option value="pengeluaran">Pengeluaran - Hanya 1 tab custom warna - Ambil dari SALAH SATU</option>
              </select>
              <input value={newWallet.name} onChange={e=>setNewWallet({...newWallet,name:e.target.value})} placeholder="Nama akun" style={{padding:8,borderRadius:8,border:"1px solid #e2e8f0",fontSize:11}}/>
              <div style={{display:"flex",gap:6}}>
                <input value={newWallet.norek} onChange={e=>setNewWallet({...newWallet,norek:e.target.value})} placeholder="Norek show/hide" style={{flex:1,padding:8,borderRadius:8,border:"1px solid #e2e8f0",fontSize:11}}/>
                <input type="number" value={newWallet.balance} onChange={e=>setNewWallet({...newWallet,balance:Number(e.target.value)})} placeholder="Saldo" style={{flex:1,padding:8,borderRadius:8,border:"1px solid #e2e8f0",fontSize:11}}/>
              </div>
              <div style={{display:"flex",gap:6}}>
                <button onClick={()=>setShowAddWallet(false)} style={{flex:1,padding:8,borderRadius:8,border:"1px solid #e2e8f0",background:"#fff",fontSize:11}}>Batal</button>
                <button onClick={()=>{
                  if(selectedSource){
                    setWallets(wallets.map(w=>w.id===selectedSource.id?{...w,name:newWallet.name||w.name,bank:newWallet.bank,norek:newWallet.norek||w.norek,color:newWallet.color,balance:newWallet.balance||w.balance,platform:newWallet.platform,dueDate:newWallet.dueDate,group:newWallet.group}:w));
                  } else {
                    setWallets([...wallets,{id:Date.now().toString(),name:newWallet.name||"Baru",type:newWallet.group,group:newWallet.group,color:newWallet.color,bank:newWallet.bank,norek:newWallet.norek||"-",balance:newWallet.balance||0,currency:newWallet.currency,flag:newWallet.flag,icon:newWallet.group==="tabungan"?"🏦":newWallet.group==="ewallet"?"📱":newWallet.group==="tunai"?"👛":newWallet.group==="darurat"?"🚨":newWallet.group==="cicilan"?"🏍️":"💸",platform:newWallet.platform,dueDate:newWallet.dueDate}]);
                  }
                  setShowAddWallet(false);
                }} style={{flex:1,padding:8,borderRadius:8,background:"#0f172a",color:"#fff",border:"none",fontWeight:800,fontSize:11}}>Simpan - 6 Grup FIX - {lang}</button>
              </div>
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
