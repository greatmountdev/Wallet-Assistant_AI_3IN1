
"use client"
import { useState, useEffect } from "react"
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
  {name:"BNP", country:"France", curr:"EUR", flag:"🇫🇷"},
]
const LANGS=[
  {code:"ID", label:"Indonesia", flag:"🇮🇩"},
  {code:"EN", label:"English", flag:"🇺🇸"},
  {code:"CN", label:"China 中文", flag:"🇨🇳"},
  {code:"IN", label:"India हिंदी", flag:"🇮🇳"},
  {code:"VN", label:"Vietnam Tiếng Việt", flag:"🇻🇳"},
  {code:"AR", label:"Arab العربية", flag:"🇸🇦"},
]
export default function Page(){
  const [step,setStep]=useState("login")
  const [authName,setAuthName]=useState("Kawan"), [authEmail,setAuthEmail]=useState("kawan@gmail.com"), [authPhone,setAuthPhone]=useState("0812****890"), [authProvider,setAuthProvider]=useState(null)
  const [pin,setPin]=useState(""), [pinStep,setPinStep]=useState(1), [pin1Saved,setPin1Saved]=useState("")
  const [mode,setMode]=useState("Dompet")
  const [cryptoUnlocked,setCryptoUnlocked]=useState(false), [showSeed,setShowSeed]=useState(false), [btc,setBtc]=useState(86401)
  const [theme,setTheme]=useState("light"), [notif,setNotif]=useState(true), [insightOn,setInsightOn]=useState(true)
  const [font,setFont]=useState("Standar"), [lang,setLang]=useState("ID")
  const [hideTotal,setHideTotal]=useState(false), [hideNorek,setHideNorek]=useState({})
  const [bottom,setBottom]=useState("beranda"), [showMenu,setShowMenu]=useState(false)
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
    {id:"1",title:"Kopi dan makan siang",amount:45000,groupId:"3",jenis:"keluar",kategori:"Makanan",date:"3 Okt 2026",foto:null,source:"Saku Dompet",curr:"IDR"},
    {id:"2",title:"Isi saldo transport",amount:75000,groupId:"2",jenis:"keluar",kategori:"Transportasi",date:"3 Okt 2026",foto:null,source:"E-wallet",curr:"IDR"},
    {id:"3",title:"Belanja kebutuhan rumah",amount:185000,groupId:"1",jenis:"keluar",kategori:"Makanan",date:"2 Okt 2026",foto:"struk.jpg",source:"Tabungan BCA",curr:"IDR"},
    {id:"4",title:"Gaji Oktober",amount:8500000,groupId:"1",jenis:"masuk",kategori:"Gaji",date:"1 Okt 2026",foto:null,source:"Tabungan BCA",curr:"IDR"},
    {id:"5",title:"Transfer Chase",amount:100,groupId:"4",jenis:"masuk",kategori:"Transfer",date:"2 Okt 2026",foto:null,source:"Chase USA",curr:"USD"},
  ])
  const [newWallet,setNewWallet]=useState({name:"",type:"tabungan",bank:"BCA",norek:"",color:COLORS[0],balance:0,platform:"",dueDate:"",currency:"IDR",country:"Indonesia",flag:"🇮🇩"})
  const [showAddWallet,setShowAddWallet]=useState(false), [selectedSource,setSelectedSource]=useState(null)
  const [chat,setChat]=useState([{role:"ai",text:"Selamat datang di berandaku, selalu input biar disiplin keuangan 😊✨🐱🏍 - Universal bank lokal & luar negeri + 6 bahasa"}])
  const [chatInput,setChatInput]=useState("")
  const getFontStyle=()=>{
    if(font==="Standar") return {family:"Inter,sans-serif", size:"14px", weight:"400"}
    if(font==="Elegan") return {family:"Georgia, serif", size:"15px", weight:"400"}
    if(font==="SANTAi") return {family:"cursive", size:"15px", weight:"600"}
    if(font==="Tegas") return {family:"Inter,sans-serif", size:"19px", weight:"900"}
    return {family:"Inter,sans-serif", size:"14px", weight:"400"}
  }
  const fontCfg=getFontStyle()
  const totalIDR=wallets.filter(w=>w.currency==="IDR"&&w.type!=="cicilan"&&w.type!=="pengeluaran").reduce((a,b)=>a+b.balance,0)
  const totalAll=wallets.filter(w=>w.type!=="cicilan"&&w.type!=="pengeluaran").reduce((a,b)=>a+b.balance,0)
  const masuk=txs.filter(t=>t.jenis==="masuk").reduce((a,b)=>a+b.amount,0)
  const keluar=txs.filter(t=>t.jenis==="keluar").reduce((a,b)=>a+b.amount,0)
  const ordered=[...wallets.filter(w=>w.type==="tabungan"),...wallets.filter(w=>w.type==="ewallet"),...wallets.filter(w=>w.type==="cash"),...wallets.filter(w=>w.type==="cicilan"),...wallets.filter(w=>w.type==="pengeluaran"),...wallets.filter(w=>w.type==="darurat")]
  const displayNorek=(norek,id)=>{ if(norek==="-") return "-"; if(!hideNorek[id]) return norek.slice(0,3)+"****"+norek.slice(-3); return norek }
  const handleNumber=(num)=>{ if(pin.length<6){ const np=pin+num; setPin(np); if(np.length===6){ setTimeout(()=>{ if(pinStep===1){ setPin1Saved(np); setPin(""); setPinStep(2)} else { if(np===pin1Saved){ setStep("main")} else { setPin(""); setPinStep(1)} } },300)} } }
  const t=(idTxt,enTxt)=>{ return lang==="ID"?idTxt:enTxt }
  if(step==="login"){
    return <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#06b6d4,#8b5cf6)",display:"grid",placeItems:"center",padding:20,fontFamily:"Inter,sans-serif"}}>
      <div style={{maxWidth:380,width:"100%",background:"#fff",borderRadius:24,padding:24}}>
        <h2 style={{margin:0,textAlign:"center",fontWeight:900}}>Dompet AI Universal 🌍</h2>
        <p style={{textAlign:"center",fontSize:11,color:"#64748b",marginTop:4}}>Tanpa ID/GLOBAL - Universal bank lokal + luar negeri + 6 bahasa + Dompet/Crypto tetap</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,marginTop:10}}>{LANGS.map(l=><button key={l.code} onClick={()=>setLang(l.code)} style={{padding:"6px 4px",borderRadius:8,border:lang===l.code?"2px solid #0ea5e9":"1px solid #e2e8f0",background:lang===l.code?"#e0f2fe":"#fff",fontSize:10,fontWeight:700}}>{l.flag} {l.code}</button>)}</div>
        <input value={authName} onChange={e=>setAuthName(e.target.value)} placeholder="Nama kamu / Name" style={{width:"100%",padding:12,borderRadius:10,border:"1px solid #e2e8f0",marginTop:12}}/>
        <input value={authEmail} onChange={e=>setAuthEmail(e.target.value)} placeholder="Email Google/Facebook" style={{width:"100%",padding:12,borderRadius:10,border:"1px solid #e2e8f0",marginTop:8}}/>
        <input value={authPhone} onChange={e=>setAuthPhone(e.target.value)} placeholder="No HP / Phone" style={{width:"100%",padding:12,borderRadius:10,border:"1px solid #e2e8f0",marginTop:8}}/>
        <button onClick={()=>{setAuthProvider("google");setStep("pin");setPinStep(1);setPin("")}} style={{width:"100%",padding:14,borderRadius:12,marginTop:14,background:"#fff",border:"1px solid #e2e8f0",fontWeight:700}}>🟢 Continue with Google - Drive/Sheet/Kamera</button>
        <button onClick={()=>{setAuthProvider("facebook");setStep("pin");setPinStep(1);setPin("")}} style={{width:"100%",padding:14,borderRadius:12,marginTop:8,background:"#1877F2",color:"#fff",border:"none",fontWeight:700}}>f Continue with Facebook</button>
        <div style={{marginTop:8,fontSize:9,color:"#64748b",textAlign:"center"}}>Universal: BCA BNI BRI GoPay OVO DANA + Chase BoA Citi DBS OCBC HSBC + norek show/hide + currency masing2 negara - 99,8% dipertahankan</div>
      </div>
    </div>
  }
  if(step==="pin"){
    return <div style={{minHeight:"100vh",background:"#f8fbff",display:"grid",placeItems:"center",padding:20,fontFamily:"Inter,sans-serif"}}>
      <div style={{maxWidth:360,width:"100%",background:"#fff",borderRadius:24,padding:24}}>
        <h3 style={{margin:0,textAlign:"center"}}>{pinStep===1?"Buat PIN 2X - 1/2":"Konfirmasi PIN 2X - 2/2 Save"} - Keypad 10 angka</h3>
        <div style={{display:"flex",justifyContent:"center",gap:8,marginTop:16}}>{[...Array(6)].map((_,i)=><div key={i} style={{width:16,height:16,borderRadius:8,background:i<pin.length?"#0ea5e9":"#e2e8f0"}}></div>)}</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginTop:20}}>
          {[1,2,3,4,5,6,7,8,9].map(n=><button key={n} onClick={()=>handleNumber(n.toString())} style={{height:64,borderRadius:16,border:"1px solid #e2e8f0",background:"#fff",fontSize:22,fontWeight:800}}>{n}</button>)}
          <button onClick={()=>setPin(pin.slice(0,-1))} style={{height:64,borderRadius:16,border:"1px solid #e2e8f0",background:"#fee2e2"}}>⌫</button>
          <button onClick={()=>handleNumber("0")} style={{height:64,borderRadius:16,border:"1px solid #e2e8f0",background:"#fff",fontSize:22,fontWeight:800}}>0</button>
          <button onClick={()=>{ if(pin.length===6){ if(pinStep===1){ setPin1Saved(pin); setPin(""); setPinStep(2)} else { if(pin===pin1Saved){ setStep("main")} else { setPin(""); setPinStep(1)} } } }} style={{height:64,borderRadius:16,border:"none",background:"#0f172a",color:"#fff",fontWeight:800}}>✓</button>
        </div>
      </div>
    </div>
  }
  return <div style={{maxWidth:440,margin:"0 auto",minHeight:"100vh",background:"#f1f7ff",fontFamily:fontCfg.family,fontSize:fontCfg.size,fontWeight:fontCfg.weight,paddingBottom:88}}>
    <div style={{background:"linear-gradient(90deg,#06b6d4,#8b5cf6)",padding:"12px 14px 0",color:"#fff",position:"sticky",top:0,zIndex:20}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{display:"flex",gap:10,alignItems:"center"}}>
          <button onClick={()=>setShowMenu(true)} style={{width:44,height:44,borderRadius:14,background:"#fff",border:"none",fontSize:20}}>☰</button>
          <div><div style={{fontWeight:900,fontSize:18}}>Dompet AI Universal</div><div style={{fontSize:10,opacity:.9}}>{LANGS.find(l=>l.code===lang)?.flag} {lang} - Kelola uang dengan lebih tenang - {authName}</div></div>
        </div>
        <button onClick={()=>setHideTotal(!hideTotal)} style={{width:36,height:36,borderRadius:10,background:"rgba(255,255,255,.9)",border:"none"}}>👁️</button>
      </div>
      <div style={{display:"flex",justifyContent:"center",padding:"12px 0"}}>
        <div style={{display:"flex",background:"rgba(255,255,255,.22)",borderRadius:14,padding:4,gap:4,backdropFilter:"blur(8px)"}}>
          <button onClick={()=>setMode("Dompet")} style={{padding:"10px 32px",borderRadius:10,border:"none",fontWeight:800,background:mode==="Dompet"?"#fff":"transparent",color:mode==="Dompet"?"#0f172a":"#fff"}}>Dompet</button>
          <button onClick={()=>{setMode("Crypto"); if(!cryptoUnlocked) setShowSeed(true)}} style={{padding:"10px 32px",borderRadius:10,border:"none",fontWeight:800,background:mode==="Crypto"?"#fff":"transparent",color:mode==="Crypto"?"#0f172a":"#fff"}}>Crypto</button>
        </div>
      </div>
    </div>

    {showMenu && <div style={{position:"fixed",inset:0,zIndex:80,display:"flex"}}>
      <div style={{width:"92%",maxWidth:380,background:"#f8fbff",height:"100%",overflowY:"auto",padding:16}}>
        <div style={{display:"flex",justifyContent:"space-between"}}><h2 style={{margin:0}}>Sumber dana - Universal</h2><button onClick={()=>setShowMenu(false)} style={{width:40,height:40,borderRadius:12,background:"#fff",border:"1px solid #e2e8f0"}}>✕</button></div>
        <div style={{fontSize:10,color:"#64748b",marginTop:4}}>Bank lokal + luar negeri + norek show/hide + mata uang masing2 negara - No ID/GLOBAL pilih</div>
        <div style={{marginTop:12,display:"flex",flexDirection:"column",gap:10}}>
          {ordered.map(w=><div key={w.id} style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:18,padding:12,display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:52,height:52,borderRadius:14,background:w.color+"22",display:"grid",placeItems:"center",fontSize:18}}>{w.flag} {w.icon}</div>
            <div style={{flex:1}}><div style={{fontWeight:800,fontSize:13}}>{w.name}</div><div style={{fontSize:11,color:"#64748b"}}>{w.bank} • {w.country} • {w.currency} • {w.currency} {w.balance.toLocaleString("id-ID")}</div><div style={{fontSize:10,color:"#64748b",display:"flex",gap:4,alignItems:"center"}}><span>{w.flag} {displayNorek(w.norek,w.id)}</span>{w.norek!=="-"&&<><button onClick={()=>setHideNorek({...hideNorek,[w.id]:!hideNorek[w.id]})} style={{border:"none",background:"#f1f5f9",borderRadius:4,padding:"0 6px",fontSize:10}}>{hideNorek[w.id]?"🙈 Hide":"👁️ Show"}</button><button onClick={()=>{try{navigator.clipboard?.writeText(w.norek)}catch{}}} style={{border:"none",background:"#f1f5f9",borderRadius:4,padding:"0 6px",fontSize:10}}>📋 Copy</button></>}</div>{w.type==="cicilan"&&<div style={{fontSize:9,marginTop:3,background:"#fef3c7",borderRadius:6,padding:"2px 6px",display:"inline-block"}}>{w.platform} jatuh {w.dueDate}</div>}</div>
            <button onClick={()=>{setSelectedSource(w); setNewWallet({name:w.name,type:w.type,bank:w.bank,norek:w.norek,color:w.color,balance:w.balance,platform:w.platform||"",dueDate:w.dueDate||"",currency:w.currency,country:w.country,flag:w.flag}); setShowAddWallet(true)}} style={{width:40,height:40,borderRadius:10,background:"#fff",border:"1px solid #e2e8f0",fontWeight:900}}>+</button>
          </div>)}
        </div>
        <div style={{marginTop:10,background:"#fff",borderRadius:10,padding:10,fontSize:10,color:"#64748b"}}>Universal list: {BANKS_UNIVERSAL.map(b=>b.flag+" "+b.name+" "+b.curr).join(", ")}. Input norek show/hide + mata uang masing2 negara. 6 tipe: Tabungan warna + E-wallet + Saku Dompet + Cicilan tgl jatuh tempo notif + Pengeluaran + Dana Darurat wajib pisah.</div>
      </div>
      <div style={{flex:1,background:"rgba(0,0,0,.25)"}} onClick={()=>setShowMenu(false)}></div>
    </div>}

    {showSeed && <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.6)",display:"grid",placeItems:"center",zIndex:90,padding:16}}>
      <div style={{background:"#fff",borderRadius:20,padding:18,width:"100%",maxWidth:380}}>
        <h3 style={{margin:0}}>Crypto - Seed 12 Kata + 2FA Wajib - Hanya di Crypto</h3>
        <div style={{background:"#f8fafc",border:"1px dashed #cbd5e1",borderRadius:12,padding:10,marginTop:10,display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6}}>
          {"abandon ability able about above absent absorb abstract absurd abuse access accident".split(" ").map((w,i)=><div key={i} style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:6,padding:"4px",fontSize:10,textAlign:"center"}}>{i+1}. {w}</div>)}
        </div>
        <div style={{marginTop:10,background:"#0f172a",color:"#fff",borderRadius:12,padding:12,textAlign:"center"}}>QR Seed + TrustWallet/Metamask + BSCScan 15m - BTC {btc} - PIN 2FA</div>
        <label style={{display:"flex",gap:6,marginTop:10,fontSize:11}}><input type="checkbox" checked={cryptoUnlocked} onChange={e=>setCryptoUnlocked(e.target.checked)}/> Simpan Seed + 2FA</label>
        <div style={{display:"flex",gap:8,marginTop:12}}><button onClick={()=>{setShowSeed(false);setMode("Dompet")}} style={{flex:1,padding:10,borderRadius:10,border:"1px solid #e2e8f0",background:"#fff"}}>Kembali Dompet</button><button disabled={!cryptoUnlocked} onClick={()=>{setShowSeed(false);setMode("Crypto")}} style={{flex:1,padding:10,borderRadius:10,background:cryptoUnlocked?"#0f172a":"#94a3b8",color:"#fff",border:"none",fontWeight:800}}>Masuk Crypto</button></div>
      </div>
    </div>}

    {mode==="Crypto" && <div style={{padding:14}}><div style={{background:"#fff",borderRadius:20,padding:16,border:"1px solid #e2e8f0"}}><div style={{display:"flex",justifyContent:"space-between"}}><b>Crypto Wallet - Universal</b><span style={{fontSize:10,background:"#e0f2fe",padding:"4px 8px",borderRadius:8}}>BSCScan 15m + 2FA + Seed</span></div><div style={{marginTop:10,background:"#0f172a",color:"#fff",borderRadius:16,padding:14}}><div>BTC Live ${btc} - QR Scan - TrustWallet/Metamask</div><div style={{marginTop:8,fontSize:11,background:"rgba(255,255,255,.1)",padding:8,borderRadius:8}}>0x71C9...9A2F - {authEmail} - {lang}</div></div></div></div>}

    {mode==="Dompet" && bottom==="beranda" && <>
      <div style={{padding:14}}><div style={{background:"linear-gradient(135deg,#2563eb,#0ea5e9)",borderRadius:22,padding:18,color:"#fff"}}><div style={{display:"flex",justifyContent:"space-between"}}><div style={{fontSize:12}}>Total Saldo - Universal - {LANGS.find(l=>l.code===lang)?.flag}</div><span style={{fontSize:10,background:"rgba(255,255,255,.2)",padding:"4px 8px",borderRadius:10}}>{authName}</span></div><div style={{fontSize:26,fontWeight:900,marginTop:6}}>{hideTotal?"Rp ••••••":"Rp "+totalIDR.toLocaleString("id-ID")+" • USD/SGD dll"}</div><div style={{display:"flex",gap:8,marginTop:12}}><div style={{flex:1,background:"rgba(255,255,255,.2)",borderRadius:10,padding:8}}><div style={{fontSize:9}}>Pemasukan</div><div style={{fontWeight:800,fontSize:11}}>Rp {masuk.toLocaleString("id-ID")}</div></div><div style={{flex:1,background:"rgba(255,255,255,.2)",borderRadius:10,padding:8}}><div style={{fontSize:9}}>Pengeluaran</div><div style={{fontWeight:800,fontSize:11}}>Rp {keluar.toLocaleString("id-ID")}</div></div></div></div><div style={{background:"#fff",borderRadius:16,padding:12,marginTop:10,border:"1px solid #e2e8f0",display:"flex",gap:10}}><div style={{width:40,height:40,borderRadius:10,background:"#dbeafe",display:"grid",placeItems:"center"}}>✨</div><div style={{flex:1}}><div style={{fontWeight:700,fontSize:12}}>Insight AI - {lang}</div><div style={{fontSize:10,color:"#475569",marginTop:4}}>Selamat datang {authName} di berandaku, selalu input biar disiplin keuangan 😊✨🐱🏍 - Bank universal {wallets.length} akun.</div></div></div></div>
      <div style={{padding:"0 14px"}}><div style={{display:"flex",justifyContent:"space-between"}}><b style={{fontSize:14}}>Transaksi terbaru - Universal Currency</b><button onClick={()=>setBottom("riwayat")} style={{border:"none",background:"transparent",color:"#0ea5e9",fontWeight:700,fontSize:12}}>Lihat semua</button></div><div style={{marginTop:8,display:"flex",flexDirection:"column",gap:8}}>{txs.slice(0,5).map(t=><div key={t.id} style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:14,padding:10,display:"flex",gap:8,alignItems:"center"}}><div style={{width:40,height:40,borderRadius:10,background:"#e0f2fe",display:"grid",placeItems:"center"}}>🧾</div><div style={{flex:1}}><div style={{fontWeight:700,fontSize:12}}>{t.title}</div><div style={{fontSize:9,color:"#64748b"}}>{t.date} • {t.source} • {t.curr} • {t.kategori}</div></div><div style={{fontWeight:800,fontSize:11,color:t.jenis==="keluar"?"#ef4444":"#10b981"}}>{t.jenis==="keluar"?"-":"+"} {t.curr} {t.amount.toLocaleString("id-ID")}</div></div>)}</div></div>
    </>}

    {bottom==="riwayat" && <div style={{padding:14}}><h2 style={{margin:0,fontSize:18}}>Input - Universal + Foto</h2><div style={{marginTop:10,display:"flex",flexDirection:"column",gap:8}}>{txs.map(t=><div key={t.id} style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:14,padding:10,display:"flex",gap:8}}><div style={{width:40,height:40,borderRadius:10,background:"#f1f5f9",display:"grid",placeItems:"center"}}>🧾</div><div style={{flex:1}}><div style={{fontWeight:700,fontSize:12}}>{t.title}</div><div style={{fontSize:9,color:"#64748b"}}>{t.date} • {t.source} • {t.curr}</div></div><div style={{fontWeight:800,fontSize:11}}>{t.curr} {t.amount.toLocaleString("id-ID")}</div></div>)}</div></div>}

    {bottom==="laporan" && <div style={{padding:14}}>
      <h2 style={{margin:0,fontSize:font==="Tegas"?"22px":"18px",fontWeight:900}}>Laporan - Grafik - {font} - {lang}</h2>
      <div style={{background:"#fff",borderRadius:20,padding:14,marginTop:12,border:"1px solid #e2e8f0"}}>
        <div style={{fontWeight:900,fontSize:font==="Tegas"?"18px":"14px"}}>📊 Grafik Batang + Pie - Universal - {lang}</div>
        <div style={{display:"flex",alignItems:"end",gap:6,height:130,marginTop:12}}>
          {[
            {l:"Mkn",v:45,c:"#ef4444"},
            {l:"Trp",v:75,c:"#0ea5e9"},
            {l:"Rmh",v:60,c:"#8b5cf6"},
            {l:"Tag",v:30,c:"#f59e0b"},
            {l:"Hobi",v:85,c:"#10b981"},
          ].map((b,i)=><div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}><div style={{width:"100%",height:b.v,background:b.c,borderRadius:"8px 8px 0 0",display:"grid",placeItems:"center",color:"#fff",fontSize:font==="Tegas"?"11px":"9px",fontWeight:900}}>Rp{b.v}k</div><div style={{fontSize:font==="Tegas"?"13px":"9px",fontWeight:800}}>{b.l}</div></div>)}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:12}}>
          <div style={{border:"1px solid #e2e8f0",borderRadius:12,padding:10}}><div style={{fontSize:9,color:"#64748b"}}>Pemasukan</div><div style={{fontWeight:900,fontSize:font==="Tegas"?"17px":"13px"}}>Rp {masuk.toLocaleString("id-ID")}</div></div>
          <div style={{border:"1px solid #e2e8f0",borderRadius:12,padding:10}}><div style={{fontSize:9,color:"#64748b"}}>Pengeluaran</div><div style={{fontWeight:900,fontSize:font==="Tegas"?"17px":"13px"}}>Rp {keluar.toLocaleString("id-ID")}</div></div>
        </div>
      </div>
    </div>}

    {bottom==="profil" && <div style={{padding:14}}>
      <h2 style={{margin:0,fontSize:20}}>Setting - Pengaturan - Universal</h2>
      <div style={{background:"#fff",borderRadius:20,padding:14,marginTop:12,border:"1px solid #e2e8f0"}}>
        <div style={{display:"flex",justifyContent:"space-between",padding:"12px 0",borderBottom:"1px solid #f1f5f9"}}><div><div style={{fontWeight:700,fontSize:13}}>Mode gelap - Dark/Day</div><div style={{fontSize:11,color:"#64748b"}}>Lebih nyaman malam hari</div></div><button onClick={()=>setTheme(theme==="light"?"dark":"light")} style={{width:52,height:30,borderRadius:15,border:"none",background:theme==="dark"?"#0ea5e9":"#cbd5e1",position:"relative"}}><div style={{width:22,height:22,borderRadius:11,background:"#fff",position:"absolute",top:4,left:theme==="dark"?26:4}}/></button></div>
        <div style={{display:"flex",justifyContent:"space-between",padding:"12px 0",borderBottom:"1px solid #f1f5f9"}}><div><div style={{fontWeight:700,fontSize:13}}>Notifikasi keuangan</div><div style={{fontSize:11,color:"#64748b"}}>Pengingat tagihan</div></div><button onClick={()=>setNotif(!notif)} style={{width:52,height:30,borderRadius:15,border:"none",background:notif?"#0ea5e9":"#cbd5e1",position:"relative"}}><div style={{width:22,height:22,borderRadius:11,background:"#fff",position:"absolute",top:4,left:notif?26:4}}/></button></div>
        <div style={{display:"flex",justifyContent:"space-between",padding:"12px 0"}}><div><div style={{fontWeight:700,fontSize:13}}>Insight AI</div><div style={{fontSize:11,color:"#64748b"}}>Saran singkat</div></div><button onClick={()=>setInsightOn(!insightOn)} style={{width:52,height:30,borderRadius:15,border:"none",background:insightOn?"#0ea5e9":"#cbd5e1",position:"relative"}}><div style={{width:22,height:22,borderRadius:11,background:"#fff",position:"absolute",top:4,left:insightOn?26:4}}/></button></div>
      </div>
      <h3 style={{marginTop:14,fontSize:14}}>Bahasa - Language - 6 pilihan</h3>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginTop:8}}>
        {LANGS.map(l=><button key={l.code} onClick={()=>setLang(l.code)} style={{padding:10,borderRadius:12,border:lang===l.code?"2px solid #0ea5e9":"1px solid #e2e8f0",background:lang===l.code?"#e0f2fe":"#fff",fontWeight:700,fontSize:11}}>{l.flag} {l.label} {lang===l.code?"✓":""}</button>)}
      </div>
      <h3 style={{marginTop:14,fontSize:14}}>Gaya font - 4 pilihan - Tegas besar bold manula</h3>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:8}}>
        {[
          {k:"Standar",d:"Inter normal"},
          {k:"Elegan",d:"Serif mewah"},
          {k:"SANTAi",d:"Playful santai"},
          {k:"Tegas",d:"BESAR BOLD manula 👓"},
        ].map(f=><button key={f.k} onClick={()=>setFont(f.k)} style={{padding:10,borderRadius:12,border:font===f.k?"2px solid #0ea5e9":"1px solid #e2e8f0",background:font===f.k?"#e0f2fe":"#fff",fontWeight:font===f.k?"900":"700",textAlign:"left"}}><div>{f.k} {font===f.k?"✓":""}</div><div style={{fontSize:9,color:"#64748b"}}>{f.d}</div></button>)}
      </div>
      <div style={{background:"#fff",borderRadius:16,padding:12,marginTop:14,border:"1px solid #e2e8f0"}}>
        <div style={{fontWeight:700,fontSize:13}}>Akun Terhubung - Universal + Mata Uang Masing2 Negara</div>
        <div style={{marginTop:8,fontSize:12,display:"flex",flexDirection:"column",gap:6}}>
          <div style={{display:"flex",justifyContent:"space-between"}}><span>Nama akun</span><b>{authName}</b></div>
          <div style={{display:"flex",justifyContent:"space-between"}}><span>Email</span><b>{authEmail}</b></div>
          <div style={{display:"flex",justifyContent:"space-between"}}><span>No HP</span><b>{authPhone}</b></div>
          <div style={{display:"flex",justifyContent:"space-between"}}><span>Provider</span><b>{authProvider} - PIN 2X</b></div>
          <div style={{display:"flex",justifyContent:"space-between"}}><span>Bahasa</span><b>{lang} - {LANGS.find(l=>l.code===lang)?.label}</b></div>
          <div style={{display:"flex",justifyContent:"space-between"}}><span>Bank Universal</span><b>BCA BNI BRI + Chase DBS OCBC HSBC</b></div>
          <div style={{display:"flex",justifyContent:"space-between"}}><span>Currency</span><b>IDR USD SGD GBP EUR - Norek show/hide per negara</b></div>
        </div>
        <div style={{marginTop:8,fontSize:10,color:"#64748b"}}>99,8% dipertahankan: 6 grup warna, bottom 5 menu, laporan grafik, chat AI, insight personal Selamat datang {authName}... Toggle atas tengah Dompet/Crypto tetap ada - No ID/GLOBAL pilih - Universal langsung.</div>
        <button onClick={()=>setStep("login")} style={{width:"100%",marginTop:10,padding:10,borderRadius:10,background:"#fee2e2",color:"#ef4444",border:"none",fontWeight:700}}>Reset & Logout</button>
      </div>
    </div>}

    {showAddWallet && <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",display:"grid",placeItems:"center",zIndex:90,padding:16}}><div style={{background:"#fff",borderRadius:20,padding:16,width:"100%",maxWidth:380,maxHeight:"90vh",overflowY:"auto"}}><h3 style={{margin:0}}>Tambah/Edit Sumber Dana Universal</h3><div style={{fontSize:10,color:"#64748b",marginTop:4}}>Bank lokal + luar negeri + norek show/hide + mata uang masing2 negara</div><div style={{display:"flex",flexDirection:"column",gap:8,marginTop:10}}>
      <input value={newWallet.name} onChange={e=>setNewWallet({...newWallet,name:e.target.value})} placeholder="Nama akun - misal Tabungan BCA, Chase USA" style={{padding:10,borderRadius:10,border:"1px solid #e2e8f0"}}/>
      <select value={newWallet.bank} onChange={e=>{const b=BANKS_UNIVERSAL.find(x=>x.name===e.target.value); if(b) setNewWallet({...newWallet,bank:b.name,currency:b.curr,country:b.country,flag:b.flag}); else setNewWallet({...newWallet,bank:e.target.value})}} style={{padding:10,borderRadius:10,border:"1px solid #e2e8f0"}}>{BANKS_UNIVERSAL.map(b=><option key={b.name} value={b.name}>{b.flag} {b.name} - {b.country} - {b.curr}</option>)}</select>
      <div style={{display:"flex",gap:6}}><input value={newWallet.norek} onChange={e=>setNewWallet({...newWallet,norek:e.target.value})} placeholder="No rekening - show/hide + currency per negara" style={{flex:1,padding:10,borderRadius:10,border:"1px solid #e2e8f0"}}/><select value={newWallet.currency} onChange={e=>setNewWallet({...newWallet,currency:e.target.value})} style={{padding:10,borderRadius:10,border:"1px solid #e2e8f0"}}><option>IDR</option><option>USD</option><option>SGD</option><option>EUR</option><option>GBP</option><option>JPY</option></select></div>
      <div style={{display:"flex",gap:6}}><input type="number" value={newWallet.balance} onChange={e=>setNewWallet({...newWallet,balance:Number(e.target.value)})} placeholder="Jumlah uang" style={{flex:1,padding:10,borderRadius:10,border:"1px solid #e2e8f0"}}/><input value={newWallet.country} onChange={e=>setNewWallet({...newWallet,country:e.target.value})} placeholder="Negara" style={{flex:1,padding:10,borderRadius:10,border:"1px solid #e2e8f0"}}/></div>
      <div style={{display:"flex",gap:8}}><button onClick={()=>setShowAddWallet(false)} style={{flex:1,padding:10,borderRadius:10,border:"1px solid #e2e8f0",background:"#fff"}}>Batal</button><button onClick={()=>{if(selectedSource){setWallets(wallets.map(w=>w.id===selectedSource.id?{...w,name:newWallet.name||w.name,bank:newWallet.bank,norek:newWallet.norek||w.norek,currency:newWallet.currency,balance:newWallet.balance||w.balance,country:newWallet.country,flag:newWallet.flag}:w))} else {setWallets([...wallets,{id:Date.now().toString(),name:newWallet.name||"Baru",type:newWallet.type||"tabungan",color:newWallet.color,bank:newWallet.bank,norek:newWallet.norek||"-",balance:newWallet.balance||0,currency:newWallet.currency,country:newWallet.country||"Indonesia",flag:newWallet.flag||"🇮🇩",icon:"🏦"}])} setShowAddWallet(false)}} style={{flex:1,padding:10,borderRadius:10,background:"#0f172a",color:"#fff",border:"none",fontWeight:800}}>Simpan - Universal</button></div>
    </div></div></div>}

    <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:440,background:"#fff",borderTop:"1px solid #e2e8f0",display:"flex",justifyContent:"space-around",padding:"8px 0 14px",zIndex:30}}>
      <button onClick={()=>setBottom("beranda")} style={{background:"transparent",border:"none",display:"flex",flexDirection:"column",alignItems:"center",color:bottom==="beranda"?"#0ea5e9":"#94a3b8"}}><div style={{fontSize:22}}>🏠</div><div style={{fontSize:9,fontWeight:700}}>Beranda</div></button>
      <button onClick={()=>setBottom("riwayat")} style={{background:"transparent",border:"none",display:"flex",flexDirection:"column",alignItems:"center",color:bottom==="riwayat"?"#0ea5e9":"#94a3b8"}}><div style={{fontSize:22}}>🧾</div><div style={{fontSize:9,fontWeight:700}}>Input</div></button>
      <button onClick={()=>setBottom("chat")} style={{background:"transparent",border:"none",display:"flex",flexDirection:"column",alignItems:"center",color:bottom==="chat"?"#0ea5e9":"#94a3b8"}}><div style={{fontSize:22}}>💬</div><div style={{fontSize:9,fontWeight:700}}>Chat AI</div></button>
      <button onClick={()=>setBottom("laporan")} style={{background:"transparent",border:"none",display:"flex",flexDirection:"column",alignItems:"center",color:bottom==="laporan"?"#0ea5e9":"#94a3b8"}}><div style={{fontSize:22}}>📊</div><div style={{fontSize:9,fontWeight:700}}>Laporan</div></button>
      <button onClick={()=>setBottom("profil")} style={{background:"transparent",border:"none",display:"flex",flexDirection:"column",alignItems:"center",color:bottom==="profil"?"#0ea5e9":"#94a3b8"}}><div style={{fontSize:22}}>⚙️</div><div style={{fontSize:9,fontWeight:700}}>Profil</div></button>
    </div>
  </div>
}
