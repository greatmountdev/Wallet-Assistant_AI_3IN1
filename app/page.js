
"use client"
import { useState, useEffect, useRef } from "react"
const COLORS=["#0ea5e9","#10b981","#06b6d4","#8b5cf6","#ef4444","#f59e0b"]
export default function Page(){
  const [step,setStep]=useState("region")
  const [region,setRegion]=useState(null)
  const [pin,setPin]=useState("")
  const [pin2,setPin2]=useState("")
  const [showSeed,setShowSeed]=useState(false)
  const [mode,setMode]=useState("Dompet")
  const [btc,setBtc]=useState(86401)
  const [font,setFont]=useState("Standar")
  const [theme,setTheme]=useState("light")
  const [hideTotal,setHideTotal]=useState(false)
  const [hideNorek,setHideNorek]=useState({})
  const [bottom,setBottom]=useState("beranda")
  const [showMenu,setShowMenu]=useState(false)
  const [userName,setUserName]=useState("Kawan")
  const [wallets,setWallets]=useState([
    {id:"1",name:"Tabungan",type:"tabungan",color:"#0ea5e9",bank:"BCA",norek:"1234567890",balance:7500000,icon:"🏛️"},
    {id:"2",name:"E-wallet",type:"ewallet",color:"#10b981",bank:"GoPay",norek:"081234567890",balance:375000,icon:"📱"},
    {id:"3",name:"Saku Dompet",type:"cash",color:"#06b6d4",bank:"Cash",norek:"-",balance:1205000,icon:"👛"},
            {id:"6",name:"Cicilan Motor",type:"cicilan",color:"#8b5cf6",bank:"FIF",norek:"-",balance:1200000,platform:"FIF",dueDate:"2026-10-20",icon:"🏍️"},
    {id:"7",name:"Pengeluaran",type:"pengeluaran",color:"#ef4444",bank:"-",norek:"-",balance:0,icon:"💸"},
    {id:"8",name:"Dana Darurat",type:"darurat",color:"#f59e0b",bank:"BSI",norek:"1122334455",balance:5000000,icon:"🚨"},
  ])
  const [txs,setTxs]=useState([
    {id:"1",title:"Kopi dan makan siang",amount:45000,groupId:"3",jenis:"keluar",kategori:"Makanan",date:"3 Okt 2026"},
    {id:"2",title:"Isi saldo transport",amount:75000,groupId:"2",jenis:"keluar",kategori:"Transport",date:"3 Okt 2026"},
    {id:"3",title:"Belanja rumah",amount:185000,groupId:"1",jenis:"keluar",kategori:"Rumah",date:"2 Okt 2026"},
    {id:"4",title:"Gaji Oktober",amount:8500000,groupId:"4",jenis:"masuk",kategori:"Gaji",date:"1 Okt 2026"},
  ])
  const [newWallet,setNewWallet]=useState({name:"",type:"tabungan",bank:"BCA",norek:"",color:COLORS[0],balance:0,platform:"",dueDate:""})
  const [showAddWallet,setShowAddWallet]=useState(false)
  const [selectedSource,setSelectedSource]=useState(null)
  const [newTx,setNewTx]=useState({title:"",amount:0,groupId:"1",jenis:"keluar",kategori:"Makanan",sourceId:"1"})
  const [showAddTx,setShowAddTx]=useState(false)
  const [chat,setChat]=useState([{role:"ai",text:"Selamat datang di berandaku, selalu input biar disiplin keuangan 😊✨🐱🏍 - Arus kas masih positif. Pengeluaran terbesar ada di Makanan. Ingat, foto struk/bon/barang opsional agar riwayat lebih lengkap."}])
  const [chatInput,setChatInput]=useState("")
  useEffect(()=>{
    const r=localStorage.getItem("v25-region"); if(r) setRegion(r)
    const s=localStorage.getItem("v25-step"); if(s) setStep(s)
    const n=localStorage.getItem("v25-name"); if(n) setUserName(n)
    fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd").then(x=>x.json()).then(d=>{if(d.bitcoin)setBtc(d.bitcoin.usd)}).catch(()=>{})
  },[])
  const total=wallets.filter(w=>w.type!=="cicilan" && w.type!=="pengeluaran").reduce((a,b)=>a+b.balance,0)
  const masuk=txs.filter(t=>t.jenis==="masuk").reduce((a,b)=>a+b.amount,0)
  const keluar=txs.filter(t=>t.jenis==="keluar").reduce((a,b)=>a+b.amount,0)
  const fontFamily="Inter,sans-serif"
  const ordered = [
    ...wallets.filter(w=>w.type==="tabungan"),
    ...wallets.filter(w=>w.type==="ewallet"),
    ...wallets.filter(w=>w.type==="cash"),
    ...wallets.filter(w=>w.type==="cicilan"),
    ...wallets.filter(w=>w.type==="pengeluaran"),
    ...wallets.filter(w=>w.type==="darurat"),
  ]
  const displayNorek=(norek, id)=>{
    if(norek==="-") return "-"
    if(hideNorek[id]) return norek.slice(0,3)+"****"+norek.slice(-3)
    return norek
  }
  if(step==="region"){
    return <div style={{minHeight:"100vh",background:"linear-gradient(180deg,#0ea5e9,#a855f7)",fontFamily,display:"grid",placeItems:"center",padding:20}}>
      <div style={{maxWidth:400,width:"100%",background:"#fff",borderRadius:24,padding:24}}>
        <h2 style={{margin:0,textAlign:"center"}}>Dompet AI</h2>
        <p style={{textAlign:"center",color:"#64748b",fontSize:13}}>Kelola uang dengan lebih tenang - 1 Project</p>
        <input value={userName} onChange={e=>setUserName(e.target.value)} placeholder="Nama kamu" style={{width:"100%",padding:12,borderRadius:10,border:"1px solid #e2e8f0",marginTop:12}}/>
        <button onClick={()=>{setRegion("ID");localStorage.setItem("v25-region","ID");localStorage.setItem("v25-name",userName||"Kawan");setStep("login");localStorage.setItem("v25-step","login")}} style={{width:"100%",padding:18,borderRadius:14,background:"#0ea5e9",color:"#fff",border:"none",fontWeight:800,marginTop:12}}>🇮🇩 INDONESIA - BCA BNI BRI GoPay</button>
        <button onClick={()=>{setRegion("GLOBAL");localStorage.setItem("v25-region","GLOBAL");localStorage.setItem("v25-name",userName||"Kawan");setStep("login");localStorage.setItem("v25-step","login")}} style={{width:"100%",padding:18,borderRadius:14,background:"#fff",border:"1px solid #e2e8f0",fontWeight:800,marginTop:8}}>🌍 GLOBAL - USD EUR SGD</button>
        <button onClick={()=>{setRegion("BOTH");localStorage.setItem("v25-region","BOTH");localStorage.setItem("v25-name",userName||"Kawan");setStep("login");localStorage.setItem("v25-step","login")}} style={{width:"100%",padding:18,borderRadius:14,background:"#18181b",color:"#fff",border:"none",fontWeight:800,marginTop:8}}>⚡ KEDUANYA</button>
      </div>
    </div>
  }
  if(step==="login"){
    return <div style={{minHeight:"100vh",background:"linear-gradient(180deg,#0ea5e9,#a855f7)",fontFamily,display:"grid",placeItems:"center",padding:20}}>
      <div style={{maxWidth:360,width:"100%",background:"#fff",borderRadius:24,padding:24}}>
        <h3>Login {userName}</h3>
        <p style={{fontSize:12,color:"#64748b"}}>Icon asli Google/Facebook + izin Drive/Sheet/Kamera/Meta AI</p>
        <button onClick={()=>{setStep("pin");localStorage.setItem("v25-step","pin")}} style={{width:"100%",padding:14,borderRadius:12,marginTop:16,background:"#fff",border:"1px solid #e2e8f0",fontWeight:700}}>G Continue with Google</button>
        <button onClick={()=>{setStep("pin");localStorage.setItem("v25-step","pin")}} style={{width:"100%",padding:14,borderRadius:12,marginTop:10,background:"#1877F2",color:"#fff",border:"none",fontWeight:700}}>f Facebook</button>
      </div>
    </div>
  }
  if(step==="pin"){
    return <div style={{minHeight:"100vh",background:"#eef6ff",fontFamily,display:"grid",placeItems:"center",padding:20}}><div style={{maxWidth:340,width:"100%",background:"#fff",borderRadius:20,padding:22}}><h3>Buat PIN 2X</h3><input type="password" value={pin} onChange={e=>setPin(e.target.value)} placeholder="PIN 1" style={{width:"100%",padding:14,borderRadius:12,border:"1px solid #e2e8f0",marginTop:12}}/><button onClick={()=>{if(pin.length>=4){setStep("pin2");localStorage.setItem("v25-step","pin2")}}} style={{width:"100%",marginTop:12,padding:12,borderRadius:10,background:"#0f172a",color:"#fff",border:"none",fontWeight:800}}>Lanjut PIN 2</button></div></div>
  }
  if(step==="pin2"){
    return <div style={{minHeight:"100vh",background:"#eef6ff",fontFamily,display:"grid",placeItems:"center",padding:20}}><div style={{maxWidth:340,width:"100%",background:"#fff",borderRadius:20,padding:22}}><h3>Konfirmasi PIN 2X</h3><input type="password" value={pin2} onChange={e=>setPin2(e.target.value)} placeholder="PIN 2" style={{width:"100%",padding:14,borderRadius:12,border:"1px solid #e2e8f0",marginTop:12}}/><button onClick={()=>{if(pin===pin2){setStep("crypto2fa");localStorage.setItem("v25-step","crypto2fa")}else alert("beda")}} style={{width:"100%",marginTop:12,padding:12,borderRadius:10,background:"#0f172a",color:"#fff",border:"none",fontWeight:800}}>Simpan otorisasi Google/Facebook</button></div></div>
  }
  if(step==="crypto2fa"){
    return <div style={{minHeight:"100vh",background:"#eef6ff",fontFamily,display:"grid",placeItems:"center",padding:20}}><div style={{maxWidth:380,width:"100%",background:"#fff",borderRadius:20,padding:22}}><h3>2FA + Seed Phrase Crypto</h3><div style={{background:"#f8fafc",border:"1px dashed #cbd5e1",borderRadius:12,padding:12,marginTop:12,display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6}}>{"abandon ability able about above absent absorb abstract absurd abuse access accident".split(" ").map((w,i)=><div key={i} style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:8,padding:"6px 4px",fontSize:11,textAlign:"center"}}>{i+1}. {w}</div>)}</div><label style={{display:"flex",gap:8,marginTop:12,fontSize:13}}><input type="checkbox" checked={showSeed} onChange={e=>setShowSeed(e.target.checked)}/> Simpan ke Drive folder sendiri + izinkan kamera + Sheet</label><button disabled={!showSeed} onClick={()=>{setStep("main");localStorage.setItem("v25-step","main")}} style={{width:"100%",marginTop:12,padding:12,borderRadius:10,background:showSeed?"#0f172a":"#94a3b8",color:"#fff",border:"none",fontWeight:800}}>Masuk</button></div></div>
  }
  return <div style={{maxWidth:440,margin:"0 auto",minHeight:"100vh",background:"#f8fbff",fontFamily,paddingBottom:84,position:"relative"}}>
    <div style={{background:"linear-gradient(90deg,#0bc5ea,#8b5cf6)",padding:"14px 14px 18px",color:"#fff",position:"sticky",top:0,zIndex:10}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{display:"flex",gap:10,alignItems:"center"}}>
          <button onClick={()=>setShowMenu(true)} style={{width:44,height:44,borderRadius:14,background:"#fff",border:"none",display:"grid",placeItems:"center",fontSize:20}}>☰</button>
          <div><div style={{fontWeight:900,fontSize:20,color:"#fff"}}>Dompet AI</div><div style={{fontSize:12,opacity:.9}}>Kelola uang dengan lebih tenang</div></div>
        </div>
        <button onClick={()=>setTheme(theme==="light"?"dark":"light")} style={{width:44,height:44,borderRadius:14,background:"rgba(255,255,255,.9)",border:"none",fontSize:18}}>{theme==="light"?"🌙":"☀️"}</button>
      </div>
    </div>

    {showMenu && <div style={{position:"fixed",inset:0,zIndex:80,display:"flex"}}>
      <div style={{width:"92%",maxWidth:360,background:"#f8fbff",height:"100%",padding:16,overflowY:"auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <h2 style={{margin:0}}>Sumber dana</h2>
          <button onClick={()=>setShowMenu(false)} style={{width:44,height:44,borderRadius:12,background:"#fff",border:"1px solid #e2e8f0",fontSize:18}}>✕</button>
        </div>
        <div style={{marginTop:16,display:"flex",flexDirection:"column",gap:12}}>
          {ordered.map(w=>{
            const isHidden = hideNorek[w.id]
            return <div key={w.id} style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:20,padding:12,display:"flex",alignItems:"center",gap:12}}>
              <div style={{width:52,height:52,borderRadius:16,background:"#e0f2fe",display:"grid",placeItems:"center",fontSize:22}}>{w.icon}</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:800}}>{w.name}</div>
                <div style={{fontSize:12,color:"#64748b",display:"flex",gap:6,alignItems:"center"}}>
                  <span>{w.bank} • Rp {w.balance.toLocaleString("id-ID")}</span>
                </div>
                <div style={{fontSize:11,color:"#64748b",display:"flex",gap:6,alignItems:"center",marginTop:4}}>
                  <span>{displayNorek(w.norek,w.id)}</span>
                  {w.norek!=="-" && <>
                    <button onClick={()=>setHideNorek({...hideNorek,[w.id]:!hideNorek[w.id]})} style={{border:"none",background:"#f1f5f9",borderRadius:6,padding:"2px 6px",fontSize:11}}>{isHidden?"👁️":"🙈"}</button>
                    <button onClick={()=>{navigator.clipboard?.writeText(w.norek)}} style={{border:"none",background:"#f1f5f9",borderRadius:6,padding:"2px 6px",fontSize:11}}>📋</button>
                  </>}
                </div>
                {w.type==="cicilan" && <div style={{fontSize:10,marginTop:4,background:"#fef3c7",borderRadius:6,padding:"2px 6px",display:"inline-block"}}>{w.platform} jatuh {w.dueDate} • Notif ON</div>}
              </div>
              <button onClick={()=>{setSelectedSource(w); setShowAddWallet(true)}} style={{width:44,height:44,borderRadius:12,background:"#fff",border:"1px solid #e2e8f0",fontSize:20,fontWeight:900}}>+</button>
            </div>
          })}
        </div>
        <div style={{marginTop:16,background:"#fff",borderRadius:16,padding:12}}>
          <div style={{fontSize:11,color:"#64748b"}}>Urutan grup: 1.1 Tabungan 1.2 E-wallet 1.3 Cash dompet 1.4 Cicilan 1.5 Pengeluaran 1.6 Dana Darurat. Warna bisa pilih. Algoritma: Pengeluaran & Cicilan mengurangi dana dari Tabungan/E-wallet/Cash/Darurat.</div>
          <button onClick={()=>{setShowMenu(false);setBottom("beranda")}} style={{width:"100%",marginTop:12,padding:12,borderRadius:10,background:"#0f172a",color:"#fff",border:"none",fontWeight:700}}>Ke Beranda</button>
        </div>
      </div>
      <div style={{flex:1,background:"rgba(0,0,0,.25)"}} onClick={()=>setShowMenu(false)}></div>
    </div>}

    {bottom==="beranda" && <>
      <div style={{padding:14}}>
        <div style={{background:"linear-gradient(135deg,#2a8bff,#0ea5e9)",borderRadius:24,padding:20,color:"#fff",position:"relative",boxShadow:"0 10px 24px rgba(14,165,233,.3)"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{fontSize:13,opacity:.9}}>Total Saldo</div>
            <button onClick={()=>setHideTotal(!hideTotal)} style={{background:"rgba(255,255,255,.2)",border:"none",borderRadius:20,padding:"6px 12px",color:"#fff"}}>{hideTotal?"🙈":"👁️"}</button>
          </div>
          <div style={{fontSize:32,fontWeight:900,marginTop:8}}>{hideTotal?"Rp ••••••":`Rp ${total.toLocaleString("id-ID")}`}</div>
          <div style={{display:"flex",gap:10,marginTop:16}}>
            <div style={{flex:1,background:"rgba(255,255,255,.22)",borderRadius:14,padding:12}}><div style={{fontSize:11,opacity:.9}}>Pemasukan</div><div style={{fontWeight:800,marginTop:4}}>Rp {masuk.toLocaleString("id-ID")}</div></div>
            <div style={{flex:1,background:"rgba(255,255,255,.22)",borderRadius:14,padding:12}}><div style={{fontSize:11,opacity:.9}}>Pengeluaran</div><div style={{fontWeight:800,marginTop:4}}>Rp {keluar.toLocaleString("id-ID")}</div></div>
          </div>
        </div>
        <div style={{background:"#fff",borderRadius:20,padding:14,marginTop:14,border:"1px solid #e2e8f0",display:"flex",gap:12}}>
          <div style={{width:48,height:48,borderRadius:14,background:"#dbeafe",display:"grid",placeItems:"center",fontSize:20}}>✨</div>
          <div style={{flex:1}}>
            <div style={{fontWeight:800,fontSize:13}}>Insight singkat dari Chat AI</div>
            <div style={{fontSize:12,color:"#475569",marginTop:4,lineHeight:"18px"}}>Selamat datang {userName} di berandaku, selalu input biar disiplin keuangan 😊✨🐱🏍<br/>Arus kas masih positif. Pengeluaran terbesar ada di Makanan. Ingat, foto struk/bon/barang opsional agar riwayat lebih lengkap.</div>
          </div>
        </div>
      </div>
      <div style={{padding:"0 14px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><b>Transaksi terbaru</b><button onClick={()=>setBottom("riwayat")} style={{border:"none",background:"transparent",color:"#0ea5e9",fontWeight:700}}>Lihat semua</button></div>
        <div style={{marginTop:10,display:"flex",flexDirection:"column",gap:10}}>
          {txs.slice(0,4).map(t=>{
            const src=wallets.find(w=>w.id===t.groupId)
            return <div key={t.id} style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:18,padding:12,display:"flex",gap:12,alignItems:"center"}}>
              <div style={{width:48,height:48,borderRadius:14,background:"#e0f2fe",display:"grid",placeItems:"center",fontSize:18}}>🧾</div>
              <div style={{flex:1}}><div style={{fontWeight:700,fontSize:13}}>{t.title}</div><div style={{fontSize:11,color:"#64748b"}}>{t.date} • {src?.name} • {t.kategori}</div></div>
              <div style={{textAlign:"right"}}><div style={{fontSize:10,background:"#e0f2fe",display:"inline-block",padding:"2px 8px",borderRadius:12,color:"#0369a1"}}>{t.jenis.toUpperCase()}</div><div style={{fontWeight:800,fontSize:13,color:t.jenis==="keluar"?"#ef4444":"#10b981"}}>- Rp {t.amount.toLocaleString("id-ID")}</div></div>
            </div>
          })}
        </div>
      </div>
    </>}

    {bottom==="riwayat" && <div style={{padding:14}}><div style={{display:"flex",justifyContent:"space-between"}}><h2 style={{margin:0}}>Riwayat</h2><button onClick={()=>setShowAddTx(true)} style={{background:"#0ea5e9",color:"#fff",border:"none",borderRadius:10,padding:"8px 14px",fontWeight:700}}>+ Input</button></div><div style={{marginTop:12,display:"flex",flexDirection:"column",gap:8}}>{txs.map(t=><div key={t.id} style={{background:"#fff",borderRadius:16,padding:12,display:"flex",gap:12,border:"1px solid #e2e8f0"}}><div style={{width:48,height:48,borderRadius:12,background:"#f1f5f9",display:"grid",placeItems:"center"}}>🧾</div><div style={{flex:1}}><div style={{fontWeight:700}}>{t.title}</div><div style={{fontSize:11,color:"#64748b"}}>{t.date}</div></div><div style={{fontWeight:800}}>Rp {t.amount.toLocaleString("id-ID")}</div></div>)}</div></div>}
    {bottom==="chat" && <div style={{padding:14}}><h2 style={{margin:0}}>Chat AI</h2><div style={{background:"#fff",borderRadius:20,padding:16,marginTop:12,minHeight:400,display:"flex",flexDirection:"column"}}><div style={{flex:1,display:"flex",flexDirection:"column",gap:12}}>{chat.map((c,i)=><div key={i} style={{alignSelf:c.role==="ai"?"flex-start":"flex-end",maxWidth:"85%",background:c.role==="ai"?"#f8fafc":"#0ea5e9",color:c.role==="ai"?"#0f172a":"#fff",borderRadius:16,padding:12,fontSize:13}}>{c.text}</div>)}</div><div style={{display:"flex",gap:8,marginTop:14}}><input value={chatInput} onChange={e=>setChatInput(e.target.value)} placeholder="Tanya keuangan..." style={{flex:1,padding:14,borderRadius:24,border:"1px solid #e2e8f0"}}/><button onClick={()=>{if(!chatInput) return; setChat([...chat,{role:"user",text:chatInput},{role:"ai",text:"Hai "+userName+"! Saldo Rp "+total.toLocaleString("id-ID")+" - tetap disiplin ya 😊"}]); setChatInput("")}} style={{width:48,height:48,borderRadius:14,background:"#0ea5e9",border:"none",color:"#fff"}}>➤</button></div></div></div>}
    {bottom==="laporan" && <div style={{padding:14}}><h2 style={{margin:0}}>Laporan</h2><div style={{background:"#fff",borderRadius:20,padding:14,marginTop:12}}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}><div style={{border:"1px solid #e2e8f0",borderRadius:14,padding:12}}><div style={{fontSize:11}}>Pemasukan</div><div style={{fontWeight:800}}>Rp {masuk.toLocaleString("id-ID")}</div></div><div style={{border:"1px solid #e2e8f0",borderRadius:14,padding:12}}><div style={{fontSize:11}}>Pengeluaran</div><div style={{fontWeight:800}}>Rp {keluar.toLocaleString("id-ID")}</div></div></div></div></div>}
    {bottom==="profil" && <div style={{padding:14}}><h2 style={{margin:0}}>Profil - {userName}</h2><div style={{background:"#fff",borderRadius:20,padding:16,marginTop:12}}><div style={{fontSize:12,color:"#64748b"}}>Dark/day, font Standar Elegan SANTAi Tegas, izin Drive folder sendiri, kamera, Sheet, Meta AI voice/type, Google Sheet user. Crypto 2FA seed phrase, BSCScan 15 menit.</div><button onClick={()=>{localStorage.clear();location.reload()}} style={{width:"100%",marginTop:12,padding:12,borderRadius:10,background:"#fee2e2",color:"#ef4444",border:"none",fontWeight:700}}>Reset</button></div></div>}

    {showAddWallet && <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",display:"grid",placeItems:"center",zIndex:90,padding:20}}><div style={{background:"#fff",borderRadius:20,padding:18,width:"100%",maxWidth:360,maxHeight:"90vh",overflowY:"auto"}}>
      <h3 style={{margin:0}}>Edit Sumber Dana - {selectedSource?.name}</h3>
      <p style={{fontSize:11,color:"#64748b"}}>Nama bank + input nomor rekening hide/show + copy + jumlah uang - Warna bisa pilih</p>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginTop:12}}>
        <input value={newWallet.name||selectedSource?.name||""} onChange={e=>setNewWallet({...newWallet,name:e.target.value})} placeholder="Nama bank / Grup" style={{padding:12,borderRadius:10,border:"1px solid #e2e8f0"}}/>
        <select value={newWallet.type||selectedSource?.type||"tabungan"} onChange={e=>setNewWallet({...newWallet,type:e.target.value})} style={{padding:12,borderRadius:10,border:"1px solid #e2e8f0"}}>
          <option value="tabungan">1.1 Tabungan (list bank+e-wallet)</option>
          <option value="ewallet">1.2 E-wallet</option>
          <option value="cash">1.3 Cash dompet (1 tab)</option>
          <option value="cicilan">1.4 Cicilan - platform + tgl jatuh tempo + notif</option>
          <option value="pengeluaran">1.5 Pengeluaran (1 tab)</option>
          <option value="darurat">1.6 Dana Darurat wajib pisah</option>
        </select>
        <input value={newWallet.bank||selectedSource?.bank||""} onChange={e=>setNewWallet({...newWallet,bank:e.target.value})} placeholder="Bank BCA BNI BRI GoPay OVO DANA" style={{padding:12,borderRadius:10,border:"1px solid #e2e8f0"}}/>
        <div style={{display:"flex",gap:6}}>
          <input value={newWallet.norek||selectedSource?.norek||""} onChange={e=>setNewWallet({...newWallet,norek:e.target.value})} placeholder="No rekening - hide/show - copy" style={{flex:1,padding:12,borderRadius:10,border:"1px solid #e2e8f0"}}/>
          <button onClick={()=>navigator.clipboard?.writeText(newWallet.norek||selectedSource?.norek||"")} style={{padding:12,borderRadius:10,border:"1px solid #e2e8f0",background:"#f1f5f9"}}>📋</button>
        </div>
        <input type="number" value={newWallet.balance||selectedSource?.balance||0} onChange={e=>setNewWallet({...newWallet,balance:Number(e.target.value)})} placeholder="Jumlah uang" style={{padding:12,borderRadius:10,border:"1px solid #e2e8f0"}}/>
        {(newWallet.type==="cicilan"||selectedSource?.type==="cicilan") && <><input value={newWallet.platform||selectedSource?.platform||""} onChange={e=>setNewWallet({...newWallet,platform:e.target.value})} placeholder="Platform FIF Kredivo" style={{padding:12,borderRadius:10,border:"1px solid #e2e8f0"}}/><input type="date" value={newWallet.dueDate||selectedSource?.dueDate||""} onChange={e=>setNewWallet({...newWallet,dueDate:e.target.value})} style={{padding:12,borderRadius:10,border:"1px solid #e2e8f0"}}/></>}
        <div><div style={{fontSize:11}}>Warna bisa pilih</div><div style={{display:"flex",gap:6,marginTop:6,flexWrap:"wrap"}}>{COLORS.map(c=><button key={c} onClick={()=>setNewWallet({...newWallet,color:c})} style={{width:32,height:32,borderRadius:8,background:c,border:(newWallet.color||selectedSource?.color)===c?"3px solid #000":"1px solid #e2e8f0"}}/>)}</div></div>
        <div style={{display:"flex",gap:8,marginTop:8}}>
          <button onClick={()=>setShowAddWallet(false)} style={{flex:1,padding:12,borderRadius:10,border:"1px solid #e2e8f0",background:"#fff"}}>Batal</button>
          <button onClick={()=>{
            if(selectedSource){
              setWallets(wallets.map(w=>w.id===selectedSource.id?{...w,name:newWallet.name||w.name,type:newWallet.type||w.type,bank:newWallet.bank||w.bank,norek:newWallet.norek||w.norek,balance:newWallet.balance||w.balance,color:newWallet.color||w.color,platform:newWallet.platform||w.platform,dueDate:newWallet.dueDate||w.dueDate}:w))
            }else{
              setWallets([...wallets,{id:Date.now().toString(),name:newWallet.name||"Baru",type:newWallet.type||"tabungan",color:newWallet.color||COLORS[0],bank:newWallet.bank||"BCA",norek:newWallet.norek||"-",balance:newWallet.balance||0,icon:"🏦"}])
            }
            setShowAddWallet(false); setSelectedSource(null); setNewWallet({name:"",type:"tabungan",bank:"BCA",norek:"",color:COLORS[0],balance:0,platform:"",dueDate:""})
          }} style={{flex:1,padding:12,borderRadius:10,background:"#0f172a",color:"#fff",border:"none",fontWeight:800}}>Simpan - AI hitung saldo tujuan</button>
        </div>
      </div>
    </div></div>}

    {showAddTx && <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",display:"grid",placeItems:"center",zIndex:90,padding:20}}><div style={{background:"#fff",borderRadius:20,padding:18,width:"100%",maxWidth:360}}>
      <h3 style={{margin:0}}>Input Masuk/Keluar - Sumber Dana</h3>
      <p style={{fontSize:11,color:"#64748b"}}>Algoritma: Pengeluaran & Cicilan mengurangi dana dari Tabungan/E-wallet/Cash/Darurat</p>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginTop:12}}>
        <input value={newTx.title} onChange={e=>setNewTx({...newTx,title:e.target.value})} placeholder="Judul transaksi" style={{padding:12,borderRadius:10,border:"1px solid #e2e8f0"}}/>
        <input type="number" value={newTx.amount||""} onChange={e=>setNewTx({...newTx,amount:Number(e.target.value)})} placeholder="Jumlah" style={{padding:12,borderRadius:10,border:"1px solid #e2e8f0"}}/>
        <select value={newTx.sourceId} onChange={e=>setNewTx({...newTx,sourceId:e.target.value,groupId:e.target.value})} style={{padding:12,borderRadius:10,border:"1px solid #e2e8f0"}}>{wallets.map(w=><option key={w.id} value={w.id}>{w.name} - {w.bank} - Rp {w.balance.toLocaleString("id-ID")}</option>)}</select>
        <select value={newTx.jenis} onChange={e=>setNewTx({...newTx,jenis:e.target.value})} style={{padding:12,borderRadius:10,border:"1px solid #e2e8f0"}}><option value="masuk">Masuk Dana (+)</option><option value="keluar">Keluar Dana (-) - Kurangi sumber</option></select>
        <div style={{display:"flex",gap:8}}><button onClick={()=>setShowAddTx(false)} style={{flex:1,padding:12,borderRadius:10,border:"1px solid #e2e8f0",background:"#fff"}}>Batal</button><button onClick={()=>{
          if(!newTx.title||!newTx.amount) return;
          const src = wallets.find(w=>w.id===newTx.sourceId)
          const isPengeluaran = src?.type==="pengeluaran" || src?.type==="cicilan" || newTx.jenis==="keluar"
          setTxs([{id:Date.now().toString(),title:newTx.title,amount:newTx.amount,groupId:newTx.sourceId,jenis:newTx.jenis,kategori:newTx.kategori,date:new Date().toLocaleDateString("id-ID")},...txs])
          setWallets(wallets.map(w=>{
            if(w.id===newTx.sourceId){
              if(newTx.jenis==="masuk"){
                return {...w,balance:w.balance+newTx.amount}
              }else{
                // pengeluaran & cicilan mengurangi dana
                return {...w,balance:Math.max(0,w.balance-newTx.amount)}
              }
            }
            return w
          }))
          setShowAddTx(false)
        }} style={{flex:1,padding:12,borderRadius:10,background:"#0f172a",color:"#fff",border:"none",fontWeight:800}}>Simpan - AI hitung</button></div>
      </div>
    </div></div>}

    <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:440,background:"#fff",borderTop:"1px solid #e2e8f0",display:"flex",justifyContent:"space-around",padding:"8px 0 18px",zIndex:20}}>
      <button onClick={()=>setBottom("beranda")} style={{background:"transparent",border:"none",display:"flex",flexDirection:"column",alignItems:"center",color:bottom==="beranda"?"#0ea5e9":"#94a3b8"}}><div style={{fontSize:22}}>🏠</div><div style={{fontSize:10,fontWeight:700}}>Beranda</div></button>
      <button onClick={()=>setBottom("riwayat")} style={{background:"transparent",border:"none",display:"flex",flexDirection:"column",alignItems:"center",color:bottom==="riwayat"?"#0ea5e9":"#94a3b8"}}><div style={{fontSize:22}}>🧾</div><div style={{fontSize:10,fontWeight:700}}>Input</div></button>
      <button onClick={()=>setBottom("chat")} style={{background:"transparent",border:"none",display:"flex",flexDirection:"column",alignItems:"center",color:bottom==="chat"?"#0ea5e9":"#94a3b8"}}><div style={{fontSize:22}}>💬</div><div style={{fontSize:10,fontWeight:700}}>Chat AI</div></button>
      <button onClick={()=>setBottom("laporan")} style={{background:"transparent",border:"none",display:"flex",flexDirection:"column",alignItems:"center",color:bottom==="laporan"?"#0ea5e9":"#94a3b8"}}><div style={{fontSize:22}}>📊</div><div style={{fontSize:10,fontWeight:700}}>Laporan</div></button>
      <button onClick={()=>setBottom("profil")} style={{background:"transparent",border:"none",display:"flex",flexDirection:"column",alignItems:"center",color:bottom==="profil"?"#0ea5e9":"#94a3b8"}}><div style={{fontSize:22}}>⚙️</div><div style={{fontSize:10,fontWeight:700}}>Profil</div></button>
    </div>
  </div>
}
