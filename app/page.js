
"use client"
import { useState, useEffect, useRef } from "react"
const COLORS=["#0ea5e9","#10b981","#06b6d4","#8b5cf6","#ef4444","#f59e0b"]
const BANKS_ID=["BCA","BNI","BRI","Mandiri","BSI","GoPay","OVO","DANA"]
const CURRENCIES=["IDR","USD","EUR","SGD","JPY","MYR","AUD"]
const COUNTRIES=["Indonesia - IDR","USA - USD","Europe - EUR","Singapore - SGD","Japan - JPY","Malaysia - MYR","Australia - AUD"]
export default function Page(){
  const [step,setStep]=useState("region")
  const [region,setRegion]=useState(null)
  const [authProvider,setAuthProvider]=useState(null)
  const [authEmail,setAuthEmail]=useState(""), [authName,setAuthName]=useState("Kawan"), [authPhone,setAuthPhone]=useState("0812****890")
  const [pin,setPin]=useState(""), [pinStep,setPinStep]=useState(1), [pin1Saved,setPin1Saved]=useState("")
  const [showSeed,setShowSeed]=useState(false), [cryptoUnlocked,setCryptoUnlocked]=useState(false)
  const [mode,setMode]=useState("Dompet"), [btc,setBtc]=useState(86401)
  const [theme,setTheme]=useState("light"), [notif,setNotif]=useState(true), [insightOn,setInsightOn]=useState(true)
  const [font,setFont]=useState("Standar")
  const [hideTotal,setHideTotal]=useState(false), [hideNorek,setHideNorek]=useState({})
  const [bottom,setBottom]=useState("beranda"), [showMenu,setShowMenu]=useState(false)
  const [wallets,setWallets]=useState([
    {id:"1",name:"Tabungan",type:"tabungan",color:"#0ea5e9",bank:"BCA",norek:"1234567890",balance:7500000,currency:"IDR",icon:"🏦"},
    {id:"2",name:"E-wallet",type:"ewallet",color:"#10b981",bank:"GoPay",norek:"081234567890",balance:375000,currency:"IDR",icon:"📱"},
    {id:"3",name:"Saku Dompet",type:"cash",color:"#06b6d4",bank:"Cash",norek:"-",balance:1205000,currency:"IDR",icon:"👛"},
    {id:"4",name:"Cicilan Motor",type:"cicilan",color:"#8b5cf6",bank:"FIF",norek:"-",balance:1200000,currency:"IDR",platform:"FIF",dueDate:"2026-10-20",icon:"🏍️"},
    {id:"5",name:"Pengeluaran",type:"pengeluaran",color:"#ef4444",bank:"-",norek:"-",balance:0,currency:"IDR",icon:"💸"},
    {id:"6",name:"Dana Darurat",type:"darurat",color:"#f59e0b",bank:"BSI",norek:"1122334455",balance:5000000,currency:"IDR",icon:"🚨"},
  ])
  const [txs,setTxs]=useState([
    {id:"1",title:"Kopi dan makan siang",amount:45000,groupId:"3",jenis:"keluar",kategori:"Makanan",date:"3 Okt 2026",foto:null,source:"Saku Dompet"},
    {id:"2",title:"Isi saldo transport",amount:75000,groupId:"2",jenis:"keluar",kategori:"Transportasi",date:"3 Okt 2026",foto:null,source:"E-wallet"},
    {id:"3",title:"Belanja kebutuhan rumah",amount:185000,groupId:"1",jenis:"keluar",kategori:"Makanan",date:"2 Okt 2026",foto:"struk.jpg",source:"Tabungan"},
    {id:"4",title:"Gaji Oktober",amount:8500000,groupId:"1",jenis:"masuk",kategori:"Gaji",date:"1 Okt 2026",foto:null,source:"Tabungan"},
  ])
  const [newWallet,setNewWallet]=useState({name:"",type:"tabungan",bank:"BCA",norek:"",color:COLORS[0],balance:0,platform:"",dueDate:"",currency:"IDR"})
  const [showAddWallet,setShowAddWallet]=useState(false), [selectedSource,setSelectedSource]=useState(null)
  const [newTx,setNewTx]=useState({title:"",amount:0,groupId:"1",jenis:"keluar",kategori:"Makanan",sourceId:"1",foto:null})
  const [showAddTx,setShowAddTx]=useState(false)
  const [chat,setChat]=useState([{role:"ai",text:"Selamat datang di berandaku, selalu input biar disiplin keuangan 😊✨🐱🏍 - Arus kas masih positif. Pengeluaran terbesar ada di Makanan."}])
  const [chatInput,setChatInput]=useState("")
  const [laporanTab,setLaporanTab]=useState("Bulanan"), [laporanView,setLaporanView]=useState("Sheet")
  const fileRef=useRef(null)
  useEffect(()=>{
    const r=localStorage.getItem("v27-region"); if(r) setRegion(r)
    const s=localStorage.getItem("v27-step"); if(s) setStep(s)
    const n=localStorage.getItem("v27-name"); if(n) setAuthName(n)
    const e=localStorage.getItem("v27-email"); if(e) setAuthEmail(e)
    const cu=localStorage.getItem("v27-crypto-unlocked"); if(cu) setCryptoUnlocked(true)
    fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd").then(x=>x.json()).then(d=>{if(d.bitcoin)setBtc(d.bitcoin.usd)}).catch(()=>{})
  },[])
  const total=wallets.filter(w=>w.type!=="cicilan"&&w.type!=="pengeluaran").reduce((a,b)=>a+b.balance,0)
  const masuk=txs.filter(t=>t.jenis==="masuk").reduce((a,b)=>a+b.amount,0)
  const keluar=txs.filter(t=>t.jenis==="keluar").reduce((a,b)=>a+b.amount,0)
  const ordered=[...wallets.filter(w=>w.type==="tabungan"),...wallets.filter(w=>w.type==="ewallet"),...wallets.filter(w=>w.type==="cash"),...wallets.filter(w=>w.type==="cicilan"),...wallets.filter(w=>w.type==="pengeluaran"),...wallets.filter(w=>w.type==="darurat")]
  const displayNorek=(norek,id)=>{ if(norek==="-") return "-"; if(!hideNorek[id]) return norek.slice(0,3)+"****"+norek.slice(-3); return norek }
  const handleNumber=(num)=>{
    if(pin.length<6){ const np=pin+num; setPin(np); if(np.length===6){ setTimeout(()=>{
      if(pinStep===1){ setPin1Saved(np); setPin(""); setPinStep(2) } else { if(np===pin1Saved){ localStorage.setItem("v27-pin",np); setStep("main"); localStorage.setItem("v27-step","main")} else { alert("PIN tidak sama, ulangi"); setPin(""); setPinStep(1); setPin1Saved("") } }
    },300)}}
  }
  const handleDelete=()=>{ setPin(pin.slice(0,-1)) }
  if(step==="region"){
    return <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#06b6d4,#8b5cf6)",display:"grid",placeItems:"center",padding:20,fontFamily:"Inter,sans-serif"}}>
      <div style={{maxWidth:400,width:"100%",background:"#fff",borderRadius:24,padding:24}}>
        <h2 style={{margin:0,textAlign:"center"}}>Pilih Dompet 3IN1</h2>
        <p style={{textAlign:"center",color:"#64748b",fontSize:12}}>ID / GLOBAL / BOTH - 1 Project</p>
        <input value={authName} onChange={e=>setAuthName(e.target.value)} placeholder="Nama kamu" style={{width:"100%",padding:12,borderRadius:10,border:"1px solid #e2e8f0",marginTop:12}}/>
        <button onClick={()=>{setRegion("ID");localStorage.setItem("v27-region","ID");localStorage.setItem("v27-name",authName||"Kawan");setStep("login");localStorage.setItem("v27-step","login")}} style={{width:"100%",padding:16,borderRadius:14,background:"#0ea5e9",color:"#fff",border:"none",fontWeight:800,marginTop:12}}>🇮🇩 INDONESIA</button>
        <button onClick={()=>{setRegion("GLOBAL");localStorage.setItem("v27-region","GLOBAL");localStorage.setItem("v27-name",authName||"Kawan");setStep("login");localStorage.setItem("v27-step","login")}} style={{width:"100%",padding:16,borderRadius:14,background:"#fff",border:"1px solid #e2e8f0",fontWeight:800,marginTop:8}}>🌍 GLOBAL - List negara + mata uang</button>
        <button onClick={()=>{setRegion("BOTH");localStorage.setItem("v27-region","BOTH");localStorage.setItem("v27-name",authName||"Kawan");setStep("login");localStorage.setItem("v27-step","login")}} style={{width:"100%",padding:16,borderRadius:14,background:"#18181b",color:"#fff",border:"none",fontWeight:800,marginTop:8}}>⚡ BOTH</button>
      </div>
    </div>
  }
  if(step==="login"){
    return <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#06b6d4,#8b5cf6)",display:"grid",placeItems:"center",padding:20,fontFamily:"Inter,sans-serif"}}>
      <div style={{maxWidth:360,width:"100%",background:"#fff",borderRadius:24,padding:24}}>
        <h3 style={{margin:0}}>Sign Up - Hubungkan Akun</h3>
        <p style={{fontSize:11,color:"#64748b"}}>Sign up dulu ke Google/Facebook terhubung ke akun</p>
        <div style={{marginTop:12,display:"flex",flexDirection:"column",gap:8}}>
          <input value={authEmail} onChange={e=>setAuthEmail(e.target.value)} placeholder="Email Google/Facebook" style={{padding:12,borderRadius:10,border:"1px solid #e2e8f0"}}/>
          <input value={authPhone} onChange={e=>setAuthPhone(e.target.value)} placeholder="No HP" style={{padding:12,borderRadius:10,border:"1px solid #e2e8f0"}}/>
        </div>
        <button onClick={()=>{setAuthProvider("google"); localStorage.setItem("v27-email",authEmail||"kawan@gmail.com"); localStorage.setItem("v27-provider","google"); setStep("pin"); localStorage.setItem("v27-step","pin"); setPinStep(1); setPin("");}} style={{width:"100%",padding:14,borderRadius:12,marginTop:14,background:"#fff",border:"1px solid #e2e8f0",fontWeight:700}}>🟢 Google - Terhubung + Drive/Sheet/Kamera</button>
        <button onClick={()=>{setAuthProvider("facebook"); localStorage.setItem("v27-email",authEmail||"kawan@facebook.com"); localStorage.setItem("v27-provider","facebook"); setStep("pin"); localStorage.setItem("v27-step","pin"); setPinStep(1); setPin("");}} style={{width:"100%",padding:14,borderRadius:12,marginTop:8,background:"#1877F2",color:"#fff",border:"none",fontWeight:700}}>f Facebook - Terhubung</button>
        <div style={{marginTop:10,fontSize:10,color:"#64748b"}}>Izin: Drive folder DompetAI sendiri, Sheet Export, Kamera foto struk, Meta AI voice/type</div>
      </div>
    </div>
  }
  if(step==="pin"){
    return <div style={{minHeight:"100vh",background:"#f8fbff",display:"grid",placeItems:"center",padding:20,fontFamily:"Inter,sans-serif"}}>
      <div style={{maxWidth:360,width:"100%",background:"#fff",borderRadius:24,padding:24,boxShadow:"0 10px 30px rgba(0,0,0,.08)"}}>
        <h3 style={{margin:0,textAlign:"center"}}>{pinStep===1?"Buat PIN 2X":"Konfirmasi PIN 2X"} - 10 Nomor</h3>
        <p style={{textAlign:"center",fontSize:11,color:"#64748b",marginTop:4}}>{pinStep===1?"Masukkan 6 digit PIN pertama":"Ulangi PIN pertama - Save"}</p>
        <div style={{display:"flex",justifyContent:"center",gap:8,marginTop:16}}>
          {[...Array(6)].map((_,i)=><div key={i} style={{width:16,height:16,borderRadius:8,background:i<pin.length?"#0ea5e9":"#e2e8f0"}}></div>)}
        </div>
        <div style={{marginTop:16,background:"#f8fafc",borderRadius:12,padding:12,textAlign:"center",fontSize:12}}>Akun: {authName} - {authEmail} - {authPhone} - {region}</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginTop:20}}>
          {[1,2,3,4,5,6,7,8,9].map(n=><button key={n} onClick={()=>handleNumber(n.toString())} style={{height:64,borderRadius:16,border:"1px solid #e2e8f0",background:"#fff",fontSize:22,fontWeight:800}}>{n}</button>)}
          <button onClick={handleDelete} style={{height:64,borderRadius:16,border:"1px solid #e2e8f0",background:"#fee2e2",fontWeight:700}}>⌫</button>
          <button onClick={()=>handleNumber("0")} style={{height:64,borderRadius:16,border:"1px solid #e2e8f0",background:"#fff",fontSize:22,fontWeight:800}}>0</button>
          <button onClick={()=>{if(pin.length===6){ if(pinStep===1){ setPin1Saved(pin); setPin(""); setPinStep(2)} else { if(pin===pin1Saved){ localStorage.setItem("v27-pin",pin); setStep("main"); localStorage.setItem("v27-step","main")} else { alert("PIN beda"); setPin(""); setPinStep(1)} } }}} style={{height:64,borderRadius:16,border:"none",background:"#0f172a",color:"#fff",fontWeight:800}}>✓</button>
        </div>
        <div style={{marginTop:12,textAlign:"center",fontSize:10,color:"#64748b"}}>Tombol 10 nomor - PIN 2X Save - Seed & 2FA hanya di Crypto nanti</div>
      </div>
    </div>
  }
  // MAIN
  return <div style={{maxWidth:440,margin:"0 auto",minHeight:"100vh",background:theme==="light"?"#f1f7ff":"#0a0a0b",color:theme==="light"?"#0f172a":"#fff",fontFamily:fontCfg.family,fontSize:fontCfg.size,fontWeight:fontCfg.weight,lineHeight:fontCfg.lineHeight,letterSpacing:fontCfg.letterSpacing,paddingBottom:88}}>
    {/* HEADER GRADASI */}
    <div style={{background:"linear-gradient(90deg,#06b6d4,#8b5cf6)",padding:"12px 14px 0",color:"#fff",position:"sticky",top:0,zIndex:20}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{display:"flex",gap:10,alignItems:"center"}}>
          <button onClick={()=>setShowMenu(true)} style={{width:44,height:44,borderRadius:14,background:"#fff",border:"none",display:"grid",placeItems:"center",fontSize:20,color:"#0f172a"}}>☰</button>
          <div><div style={{fontWeight:900,fontSize:18}}>Dompet AI</div><div style={{fontSize:10,opacity:.9}}>Kelola uang dengan lebih tenang</div></div>
        </div>
        <div style={{display:"flex",gap:6}}>
          <button onClick={()=>setHideTotal(!hideTotal)} style={{width:36,height:36,borderRadius:10,background:"rgba(255,255,255,.9)",border:"none"}}>👁️</button>
          <button onClick={()=>setTheme(theme==="light"?"dark":"light")} style={{width:36,height:36,borderRadius:10,background:"rgba(255,255,255,.9)",border:"none"}}>{theme==="light"?"🌙":"☀️"}</button>
        </div>
      </div>
      {/* NAVIGASI ATAS TENGAH DOMPET/CRYPTO - SELALU ADA */}
      <div style={{display:"flex",justifyContent:"center",padding:"12px 0 12px"}}>
        <div style={{display:"flex",background:"rgba(255,255,255,.22)",borderRadius:14,padding:4,gap:4,backdropFilter:"blur(8px)"}}>
          <button onClick={()=>setMode("Dompet")} style={{padding:"10px 32px",borderRadius:10,border:"none",fontWeight:800,background:mode==="Dompet"?"#fff":"transparent",color:mode==="Dompet"?"#0f172a":"#fff"}}>Dompet</button>
          <button onClick={()=>{setMode("Crypto"); if(!cryptoUnlocked){ setShowSeed(true) }}} style={{padding:"10px 32px",borderRadius:10,border:"none",fontWeight:800,background:mode==="Crypto"?"#fff":"transparent",color:mode==="Crypto"?"#0f172a":"#fff"}}>Crypto</button>
        </div>
      </div>
    </div>

    {/* DRAWER SUMBER DANA - 6 GRUP */}
    {showMenu && <div style={{position:"fixed",inset:0,zIndex:80,display:"flex"}}>
      <div style={{width:"92%",maxWidth:360,background:"#f8fbff",height:"100%",overflowY:"auto",padding:16}}>
        <div style={{display:"flex",justifyContent:"space-between"}}><h2 style={{margin:0}}>Sumber dana</h2><button onClick={()=>setShowMenu(false)} style={{width:40,height:40,borderRadius:12,background:"#fff",border:"1px solid #e2e8f0"}}>✕</button></div>
        <div style={{marginTop:12,display:"flex",flexDirection:"column",gap:10}}>
          {ordered.map(w=><div key={w.id} style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:18,padding:12,display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:48,height:48,borderRadius:14,background:w.color+"22",display:"grid",placeItems:"center",fontSize:18}}>{w.icon}</div>
            <div style={{flex:1}}><div style={{fontWeight:800,fontSize:13}}>{w.name}</div><div style={{fontSize:11,color:"#64748b"}}>{w.bank} • {w.currency} • Rp {w.balance.toLocaleString("id-ID")}</div><div style={{fontSize:10,color:"#64748b"}}>{displayNorek(w.norek,w.id)} {w.norek!=="-"&&<button onClick={()=>setHideNorek({...hideNorek,[w.id]:!hideNorek[w.id]})} style={{border:"none",background:"#f1f5f9",borderRadius:4,padding:"0 4px"}}>{hideNorek[w.id]?"🙈":"👁️"}</button>}</div></div>
            <button onClick={()=>{setSelectedSource(w); setNewWallet({name:w.name,type:w.type,bank:w.bank,norek:w.norek,color:w.color,balance:w.balance,platform:w.platform||"",dueDate:w.dueDate||"",currency:w.currency}); setShowAddWallet(true)}} style={{width:40,height:40,borderRadius:10,background:"#fff",border:"1px solid #e2e8f0",fontWeight:900}}>+</button>
          </div>)}
        </div>
        <div style={{marginTop:12,fontSize:10,color:"#64748b",background:"#fff",borderRadius:10,padding:10}}>6 Tipe: Tabungan warna + E-wallet + Saku Dompet + Cicilan tgl jatuh tempo notif + Pengeluaran + Dana Darurat wajib pisah. List negara + mata uang global masuk: {COUNTRIES.join(", ")}. Akun dompet global hide dulu.</div>
        <button onClick={()=>{setShowMenu(false);setBottom("beranda")}} style={{width:"100%",marginTop:10,padding:12,borderRadius:10,background:"#0f172a",color:"#fff",border:"none",fontWeight:700}}>Ke Beranda</button>
      </div>
      <div style={{flex:1,background:"rgba(0,0,0,.25)"}} onClick={()=>setShowMenu(false)}></div>
    </div>}

    {/* CRYPTO SEED & 2FA ONLY WHEN SHIFT TO CRYPTO */}
    {showSeed && <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.6)",display:"grid",placeItems:"center",zIndex:90,padding:16}}>
      <div style={{background:"#fff",borderRadius:20,padding:18,width:"100%",maxWidth:380}}>
        <h3 style={{margin:0}}>Crypto Wallet - Seed 12 Kata + 2FA Wajib</h3>
        <p style={{fontSize:11,color:"#64748b"}}>Seed & 2FA hanya ketika bergeser ke Crypto (bukan di Dompet). Wajib simpan + QR + TrustWallet/Metamask + BSCScan 15 menit</p>
        <div style={{background:"#f8fafc",border:"1px dashed #cbd5e1",borderRadius:12,padding:10,marginTop:10,display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6}}>{"abandon ability able about above absent absorb abstract absurd abuse access accident".split(" ").map((w,i)=><div key={i} style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:6,padding:"4px",fontSize:10,textAlign:"center"}}>{i+1}. {w}</div>)}</div>
        <div style={{marginTop:10,background:"#0f172a",color:"#fff",borderRadius:12,padding:12,textAlign:"center"}}><div style={{fontSize:10}}>QR Seed - TrustWallet/Metamask Import + PIN 2FA</div><div style={{fontSize:20,marginTop:6}}>▦ QR CODE SCAN</div><div style={{fontSize:10,marginTop:6}}>BTC ${btc} - BSCScan 15 menit - {authEmail}</div></div>
        <label style={{display:"flex",gap:6,marginTop:10,fontSize:11}}><input type="checkbox" checked={cryptoUnlocked} onChange={e=>setCryptoUnlocked(e.target.checked)}/> Saya sudah simpan Seed + setuju 2FA untuk Crypto</label>
        <div style={{display:"flex",gap:8,marginTop:12}}><button onClick={()=>{setShowSeed(false);setMode("Dompet")}} style={{flex:1,padding:10,borderRadius:10,border:"1px solid #e2e8f0",background:"#fff"}}>Kembali ke Dompet</button><button disabled={!cryptoUnlocked} onClick={()=>{setShowSeed(false); localStorage.setItem("v27-crypto-unlocked","1"); setMode("Crypto")}} style={{flex:1,padding:10,borderRadius:10,background:cryptoUnlocked?"#0f172a":"#94a3b8",color:"#fff",border:"none",fontWeight:800}}>Masuk Crypto</button></div>
      </div>
    </div>}

    {mode==="Dompet" && bottom==="beranda" && <>
      <div style={{padding:14}}><div style={{background:"linear-gradient(135deg,#2563eb,#0ea5e9)",borderRadius:22,padding:18,color:"#fff"}}><div style={{display:"flex",justifyContent:"space-between"}}><div style={{fontSize:12}}>Total Saldo - {region}</div><span style={{fontSize:10,background:"rgba(255,255,255,.2)",padding:"4px 8px",borderRadius:10}}>{authName}</span></div><div style={{fontSize:28,fontWeight:900,marginTop:6}}>{hideTotal?"Rp ••••••":`Rp ${total.toLocaleString("id-ID")}`}</div><div style={{display:"flex",gap:8,marginTop:12}}><div style={{flex:1,background:"rgba(255,255,255,.2)",borderRadius:10,padding:8}}><div style={{fontSize:9}}>Pemasukan</div><div style={{fontWeight:800,fontSize:12}}>Rp {masuk.toLocaleString("id-ID")}</div></div><div style={{flex:1,background:"rgba(255,255,255,.2)",borderRadius:10,padding:8}}><div style={{fontSize:9}}>Pengeluaran</div><div style={{fontWeight:800,fontSize:12}}>Rp {keluar.toLocaleString("id-ID")}</div></div></div></div><div style={{background:"#fff",borderRadius:16,padding:12,marginTop:10,border:"1px solid #e2e8f0",display:"flex",gap:10}}><div style={{width:40,height:40,borderRadius:10,background:"#dbeafe",display:"grid",placeItems:"center"}}>✨</div><div style={{flex:1}}><div style={{fontWeight:700,fontSize:12}}>Insight singkat dari Chat AI</div><div style={{fontSize:10,color:"#475569",marginTop:4}}>Selamat datang {authName} di berandaku, selalu input biar disiplin keuangan 😊✨🐱🏍 - Arus kas positif.</div></div></div></div>
      <div style={{padding:"0 14px"}}><div style={{display:"flex",justifyContent:"space-between"}}><b style={{fontSize:14}}>Transaksi terbaru</b><button onClick={()=>setBottom("riwayat")} style={{border:"none",background:"transparent",color:"#0ea5e9",fontWeight:700,fontSize:12}}>Lihat semua</button></div><div style={{marginTop:8,display:"flex",flexDirection:"column",gap:8}}>{txs.slice(0,4).map(t=><div key={t.id} style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:14,padding:10,display:"flex",gap:8,alignItems:"center"}}><div style={{width:40,height:40,borderRadius:10,background:"#e0f2fe",display:"grid",placeItems:"center"}}>🧾</div><div style={{flex:1}}><div style={{fontWeight:700,fontSize:12}}>{t.title}</div><div style={{fontSize:9,color:"#64748b"}}>{t.date} • {t.source}</div></div><div style={{fontWeight:800,fontSize:11,color:t.jenis==="keluar"?"#ef4444":"#10b981"}}>{t.jenis==="keluar"?"-":"+"} Rp {t.amount.toLocaleString("id-ID")}</div></div>)}</div></div>
    </>}
    {mode==="Dompet" && bottom==="riwayat" && <div style={{padding:14}}><div style={{display:"flex",justifyContent:"space-between"}}><h2 style={{margin:0,fontSize:18}}>Riwayat transaksi</h2><button onClick={()=>setShowAddTx(true)} style={{background:"#0ea5e9",color:"#fff",border:"none",borderRadius:8,padding:"6px 12px",fontWeight:700,fontSize:12}}>+ Tambah</button></div><div style={{marginTop:10,display:"flex",flexDirection:"column",gap:8}}>{txs.map(t=><div key={t.id} style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:14,padding:10,display:"flex",gap:8}}><div style={{width:40,height:40,borderRadius:10,background:"#f1f5f9",display:"grid",placeItems:"center"}}>🧾</div><div style={{flex:1}}><div style={{fontWeight:700,fontSize:12}}>{t.title}</div><div style={{fontSize:9,color:"#64748b"}}>{t.date} • {t.source}</div></div><div style={{fontWeight:800,fontSize:11}}>Rp {t.amount.toLocaleString("id-ID")}</div></div>)}</div></div>}
    {bottom==="chat" && <div style={{padding:14}}><h2 style={{margin:0,fontSize:18}}>Chat AI</h2><div style={{background:"#fff",borderRadius:16,padding:12,marginTop:10,minHeight:300,border:"1px solid #e2e8f0"}}><div style={{display:"flex",flexDirection:"column",gap:8}}>{chat.map((c,i)=><div key={i} style={{alignSelf:c.role==="ai"?"flex-start":"flex-end",maxWidth:"85%",background:c.role==="ai"?"#f8fafc":"#0ea5e9",color:c.role==="ai"?"#0f172a":"#fff",borderRadius:12,padding:8,fontSize:11}}>{c.text}</div>)}</div><div style={{display:"flex",gap:6,marginTop:12}}><input value={chatInput} onChange={e=>setChatInput(e.target.value)} placeholder="Tanya keuangan + voice..." style={{flex:1,padding:10,borderRadius:16,border:"1px solid #e2e8f0",fontSize:11}}/><button onClick={()=>{if(!chatInput) return; setChat([...chat,{role:"user",text:chatInput},{role:"ai",text:`Hai ${authName}! Total Rp ${total.toLocaleString("id-ID")}`} ]); setChatInput("")}} style={{width:36,height:36,borderRadius:10,background:"#0ea5e9",border:"none",color:"#fff"}}>➤</button></div></div></div>}
    {bottom==="laporan" && <div style={{padding:14}}><h2 style={{margin:0,fontSize:18}}>Laporan - Harian/Mingguan/Bulanan + Sheet/Grafik + Export Sheet CSV</h2><div style={{background:"#fff",borderRadius:16,padding:12,marginTop:10,border:"1px solid #e2e8f0"}}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}><div style={{border:"1px solid #e2e8f0",borderRadius:10,padding:8}}><div style={{fontSize:9}}>Pemasukan</div><div style={{fontWeight:800,fontSize:12}}>Rp {masuk.toLocaleString("id-ID")}</div></div><div style={{border:"1px solid #e2e8f0",borderRadius:10,padding:8}}><div style={{fontSize:9}}>Pengeluaran</div><div style={{fontWeight:800,fontSize:12}}>Rp {keluar.toLocaleString("id-ID")}</div></div></div></div></div>}
    {bottom==="profil" && <div style={{padding:14}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:44,height:44,borderRadius:12,background:"#fff",border:"1px solid #e2e8f0",display:"grid",placeItems:"center"}}>☰</div><div><div style={{fontWeight:900,fontSize:18}}>Dompet AI</div><div style={{fontSize:11,color:"#64748b"}}>Kelola uang dengan lebih tenang</div></div></div>
      <h2 style={{margin:"16px 0 0",fontSize:20}}>Setting</h2>
      <div style={{background:"#fff",borderRadius:20,padding:14,marginTop:12,border:"1px solid #e2e8f0"}}>
        <div style={{display:"flex",justifyContent:"space-between",padding:"12px 0",borderBottom:"1px solid #f1f5f9"}}><div><div style={{fontWeight:700,fontSize:13}}>Mode gelap</div><div style={{fontSize:11,color:"#64748b"}}>Lebih nyaman untuk malam hari</div></div><button onClick={()=>setTheme(theme==="light"?"dark":"light")} style={{width:52,height:30,borderRadius:15,border:"none",background:theme==="dark"?"#0ea5e9":"#cbd5e1",position:"relative"}}><div style={{width:22,height:22,borderRadius:11,background:"#fff",position:"absolute",top:4,left:theme==="dark"?26:4}}/></button></div>
        <div style={{display:"flex",justifyContent:"space-between",padding:"12px 0",borderBottom:"1px solid #f1f5f9"}}><div><div style={{fontWeight:700,fontSize:13}}>Notifikasi keuangan</div><div style={{fontSize:11,color:"#64748b"}}>Pengingat tagihan dan target tabungan</div></div><button onClick={()=>setNotif(!notif)} style={{width:52,height:30,borderRadius:15,border:"none",background:notif?"#0ea5e9":"#cbd5e1",position:"relative"}}><div style={{width:22,height:22,borderRadius:11,background:"#fff",position:"absolute",top:4,left:notif?26:4}}/></button></div>
        <div style={{display:"flex",justifyContent:"space-between",padding:"12px 0"}}><div><div style={{fontWeight:700,fontSize:13}}>Insight AI</div><div style={{fontSize:11,color:"#64748b"}}>Saran singkat berdasarkan aktivitasmu</div></div><button onClick={()=>setInsightOn(!insightOn)} style={{width:52,height:30,borderRadius:15,border:"none",background:insightOn?"#0ea5e9":"#cbd5e1",position:"relative"}}><div style={{width:22,height:22,borderRadius:11,background:"#fff",position:"absolute",top:4,left:insightOn?26:4}}/></button></div>
      </div>
      <h3 style={{marginTop:16,fontSize:16}}>Gaya font</h3>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:8}}>{[
          {k:"Standar",desc:"Inter normal - sehari-hari"},
          {k:"Elegan",desc:"Serif mewah - elegan"},
          {k:"SANTAi",desc:"Comic playful - santai"},
          {k:"Tegas",desc:"BESAR BOLD - manula 👓 mudah baca"},
        ].map(f=><button key={f.k} onClick={()=>setFont(f.k)} style={{padding:10,borderRadius:12,border:font===f.k?"2px solid #0ea5e9":"1px solid #e2e8f0",background:font===f.k?"#e0f2fe":"#fff",fontWeight:font===f.k?"900":"700",fontSize:font===f.k&&f.k==="Tegas"?"14px":"12px",textAlign:"left"}}><div>{f.k} {font===f.k?"✓":""}</div><div style={{fontSize:9,color:"#64748b",fontWeight:400,marginTop:2}}>{f.desc}</div></button>)}</div>
      <div style={{background:"#fff",borderRadius:16,padding:12,marginTop:16,border:"1px solid #e2e8f0"}}>
        <div style={{fontWeight:700,fontSize:13}}>Akun Terhubung</div>
        <div style={{marginTop:8,display:"flex",flexDirection:"column",gap:6,fontSize:12}}>
          <div style={{display:"flex",justifyContent:"space-between"}}><span>Nama</span><b>{authName}</b></div>
          <div style={{display:"flex",justifyContent:"space-between"}}><span>Email</span><b>{authEmail||"kawan@gmail.com"}</b></div>
          <div style={{display:"flex",justifyContent:"space-between"}}><span>No HP</span><b>{authPhone}</b></div>
          <div style={{display:"flex",justifyContent:"space-between"}}><span>Provider</span><b>{authProvider||"Google"} - {region}</b></div>
          <div style={{display:"flex",justifyContent:"space-between"}}><span>PIN 2FA</span><b>•••••• Aktif</b></div>
          <div style={{display:"flex",justifyContent:"space-between"}}><span>Currency</span><b>{CURRENCIES.join(", ")}</b></div>
          <div style={{display:"flex",justifyContent:"space-between"}}><span>Negara</span><b>{COUNTRIES.slice(0,4).join(", ")}</b></div>
        </div>
        <div style={{marginTop:10,fontSize:10,color:"#64748b"}}>Izin: Drive folder DompetAI sendiri, Sheet Export CSV, Kamera upload foto struk/bon/barang opsional, Meta AI voice/type, Google Sheet user, Supabase 1, Vercel/Netlify 1. Akun dompet global hide dulu, list negara+mata uang masuk.</div>
        <button onClick={()=>{localStorage.clear();location.reload()}} style={{width:"100%",marginTop:10,padding:10,borderRadius:10,background:"#fee2e2",color:"#ef4444",border:"none",fontWeight:700}}>Reset & Logout</button>
      </div>
    </div>}

    {showAddWallet && <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",display:"grid",placeItems:"center",zIndex:90,padding:16}}><div style={{background:"#fff",borderRadius:20,padding:16,width:"100%",maxWidth:360}}><h3 style={{margin:0}}>Edit Sumber Dana</h3><div style={{display:"flex",flexDirection:"column",gap:8,marginTop:10}}><input value={newWallet.name} onChange={e=>setNewWallet({...newWallet,name:e.target.value})} placeholder="Nama" style={{padding:10,borderRadius:10,border:"1px solid #e2e8f0"}}/><select value={newWallet.type} onChange={e=>setNewWallet({...newWallet,type:e.target.value})} style={{padding:10,borderRadius:10,border:"1px solid #e2e8f0"}}><option value="tabungan">1.1 Tabungan</option><option value="ewallet">1.2 E-wallet</option><option value="cash">1.3 Saku Dompet</option><option value="cicilan">1.4 Cicilan</option><option value="pengeluaran">1.5 Pengeluaran</option><option value="darurat">1.6 Dana Darurat</option></select><div style={{display:"flex",gap:6}}><input value={newWallet.norek} onChange={e=>setNewWallet({...newWallet,norek:e.target.value})} placeholder="No rek hide/show copy" style={{flex:1,padding:10,borderRadius:10,border:"1px solid #e2e8f0"}}/><select value={newWallet.currency} onChange={e=>setNewWallet({...newWallet,currency:e.target.value})} style={{padding:10,borderRadius:10,border:"1px solid #e2e8f0"}}>{CURRENCIES.map(c=><option key={c}>{c}</option>)}</select></div><div style={{display:"flex",gap:8}}><button onClick={()=>setShowAddWallet(false)} style={{flex:1,padding:10,borderRadius:10,border:"1px solid #e2e8f0",background:"#fff"}}>Batal</button><button onClick={()=>{if(selectedSource){setWallets(wallets.map(w=>w.id===selectedSource.id?{...w,name:newWallet.name||w.name,norek:newWallet.norek||w.norek,currency:newWallet.currency,balance:newWallet.balance||w.balance,color:newWallet.color}:w))} setShowAddWallet(false)}} style={{flex:1,padding:10,borderRadius:10,background:"#0f172a",color:"#fff",border:"none",fontWeight:800}}>Simpan</button></div></div></div></div>}

    <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:440,background:"#fff",borderTop:"1px solid #e2e8f0",display:"flex",justifyContent:"space-around",padding:"8px 0 14px",zIndex:30}}>
      <button onClick={()=>setBottom("beranda")} style={{background:"transparent",border:"none",display:"flex",flexDirection:"column",alignItems:"center",color:bottom==="beranda"?"#0ea5e9":"#94a3b8"}}><div style={{fontSize:22}}>🏠</div><div style={{fontSize:9,fontWeight:700}}>Beranda</div></button>
      <button onClick={()=>setBottom("riwayat")} style={{background:"transparent",border:"none",display:"flex",flexDirection:"column",alignItems:"center",color:bottom==="riwayat"?"#0ea5e9":"#94a3b8"}}><div style={{fontSize:22}}>🧾</div><div style={{fontSize:9,fontWeight:700}}>Input</div></button>
      <button onClick={()=>setBottom("chat")} style={{background:"transparent",border:"none",display:"flex",flexDirection:"column",alignItems:"center",color:bottom==="chat"?"#0ea5e9":"#94a3b8"}}><div style={{fontSize:22}}>💬</div><div style={{fontSize:9,fontWeight:700}}>Chat AI</div></button>
      <button onClick={()=>setBottom("laporan")} style={{background:"transparent",border:"none",display:"flex",flexDirection:"column",alignItems:"center",color:bottom==="laporan"?"#0ea5e9":"#94a3b8"}}><div style={{fontSize:22}}>📊</div><div style={{fontSize:9,fontWeight:700}}>Laporan</div></button>
      <button onClick={()=>setBottom("profil")} style={{background:"transparent",border:"none",display:"flex",flexDirection:"column",alignItems:"center",color:bottom==="profil"?"#0ea5e9":"#94a3b8"}}><div style={{fontSize:22}}>⚙️</div><div style={{fontSize:9,fontWeight:700}}>Profil</div></button>
    </div>
  </div>
}
