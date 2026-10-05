"use client"
import { useState, useEffect, useRef } from "react"
const BANKS_ID=["BCA","BNI","BRI","Mandiri","BSI","GoPay","OVO","DANA","LinkAja","ShopeePay"]
const COLORS=["#0ea5e9","#10b981","#f59e0b","#8b5cf6","#ec4899","#06b6d4","#f97316","#14b8a6"]
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
  const [hide,setHide]=useState(false)
  const [bottom,setBottom]=useState("beranda")
  const [showMenu,setShowMenu]=useState(false)
  const [wallets,setWallets]=useState([
    {id:"1",name:"Utama",type:"tabungan",color:"#0ea5e9",bank:"BCA",norek:"123****890",currency:"IDR",balance:12472000},
    {id:"2",name:"Liburan",type:"tabungan",color:"#10b981",bank:"GoPay",norek:"0812****",currency:"IDR",balance:2500000},
    {id:"3",name:"Dana Darurat",type:"darurat",color:"#f59e0b",bank:"BRI",norek:"987****",currency:"IDR",balance:5000000},
    {id:"4",name:"Cicilan Motor",type:"cicilan",color:"#8b5cf6",bank:"Mandiri",norek:"-",currency:"IDR",balance:1200000,platform:"FIF",dueDate:"2026-10-15"},
    {id:"5",name:"Tunai Dompet",type:"tunai",color:"#06b6d4",bank:"Cash",norek:"-",currency:"IDR",balance:800000},
  ])
  const [txs,setTxs]=useState([
    {id:"1",title:"Kopi dan makan siang",amount:45000,groupId:"5",jenis:"keluar",kategori:"Makanan",date:"2026-10-03"},
    {id:"2",title:"Isi saldo transport",amount:75000,groupId:"2",jenis:"keluar",kategori:"Transportasi",date:"2026-10-03"},
    {id:"3",title:"Belanja kebutuhan rumah",amount:185000,groupId:"1",jenis:"keluar",kategori:"Makanan",date:"2026-10-02"},
    {id:"4",title:"Gaji Oktober",amount:8500000,groupId:"1",jenis:"masuk",kategori:"Rekening",date:"2026-10-01"},
  ])
  const [newWallet,setNewWallet]=useState({name:"",type:"tabungan",bank:"BCA",norek:"",color:COLORS[0],platform:"",dueDate:"",currency:"IDR"})
  const [showAddWallet,setShowAddWallet]=useState(false)
  const [newTx,setNewTx]=useState({title:"",amount:0,groupId:"1",jenis:"keluar",kategori:"Makanan"})
  const [showAddTx,setShowAddTx]=useState(false)
  const [chat,setChat]=useState([{role:"ai",text:"Halo! Saya pendamping keuanganmu. Saat mencatat transaksi, pilih sumber dana dan tambahkan foto struk/bon/barang bila tersedia."}])
  const [chatInput,setChatInput]=useState("")
  const [laporanTab,setLaporanTab]=useState("Bulanan")
  const [laporanView,setLaporanView]=useState("Sheet")
  const fileRef=useRef(null)
  useEffect(()=>{
    const r=localStorage.getItem("v25-region"); if(r) setRegion(r)
    const s=localStorage.getItem("v25-step"); if(s) setStep(s)
    fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd").then(x=>x.json()).then(d=>{if(d.bitcoin)setBtc(d.bitcoin.usd)}).catch(()=>{})
  },[])
  const total=wallets.reduce((a,b)=>a+b.balance,0)
  const masuk=txs.filter(t=>t.jenis==="masuk").reduce((a,b)=>a+b.amount,0)
  const keluar=txs.filter(t=>t.jenis==="keluar").reduce((a,b)=>a+b.amount,0)
  const fontFamily= font==="Standar"?"Inter,sans-serif": font==="Elegan"?"Manrope,sans-serif": font==="SANTAi"?"Plus Jakarta Sans,sans-serif":"Space Grotesk,sans-serif"
  if(step==="region"){
    return <div style={{minHeight:"100vh",background:"#eef6ff",fontFamily,display:"grid",placeItems:"center",padding:20}}>
      <div style={{maxWidth:400,width:"100%",background:"#fff",borderRadius:24,padding:24}}>
        <h2 style={{margin:0,textAlign:"center"}}>Pilih Dompet</h2>
        <p style={{textAlign:"center",color:"#64748b",fontSize:13}}>1 Project - ID + Global</p>
        <button onClick={()=>{setRegion("ID");localStorage.setItem("v25-region","ID");setStep("login");localStorage.setItem("v25-step","login")}} style={{width:"100%",padding:18,borderRadius:14,background:"#0ea5e9",color:"#fff",border:"none",fontWeight:800,marginTop:16}}>INDONESIA</button>
        <button onClick={()=>{setRegion("GLOBAL");localStorage.setItem("v25-region","GLOBAL");setStep("login");localStorage.setItem("v25-step","login")}} style={{width:"100%",padding:18,borderRadius:14,background:"#fff",border:"1px solid #e2e8f0",fontWeight:800,marginTop:12}}>GLOBAL</button>
        <button onClick={()=>{setRegion("BOTH");localStorage.setItem("v25-region","BOTH");setStep("login");localStorage.setItem("v25-step","login")}} style={{width:"100%",padding:18,borderRadius:14,background:"#18181b",color:"#fff",border:"none",fontWeight:800,marginTop:12}}>KEDUANYA</button>
      </div>
    </div>
  }
  if(step==="login"){
    return <div style={{minHeight:"100vh",background:"#eef6ff",fontFamily,display:"grid",placeItems:"center",padding:20}}>
      <div style={{maxWidth:360,width:"100%",background:"#fff",borderRadius:24,padding:24}}>
        <h3>Login / Signup</h3>
        <button onClick={()=>{localStorage.setItem("v25-auth","1");setStep("pin");localStorage.setItem("v25-step","pin")}} style={{width:"100%",padding:14,borderRadius:12,marginTop:16,background:"#fff",border:"1px solid #e2e8f0",fontWeight:700}}>Google</button>
        <button onClick={()=>{localStorage.setItem("v25-auth","1");setStep("pin");localStorage.setItem("v25-step","pin")}} style={{width:"100%",padding:14,borderRadius:12,marginTop:10,background:"#1877F2",color:"#fff",border:"none",fontWeight:700}}>Facebook</button>
      </div>
    </div>
  }
  if(step==="pin"){
    return <div style={{minHeight:"100vh",background:"#eef6ff",fontFamily,display:"grid",placeItems:"center",padding:20}}><div style={{maxWidth:340,width:"100%",background:"#fff",borderRadius:20,padding:22}}><h3>Buat PIN 2FA</h3><input type="password" value={pin} onChange={e=>setPin(e.target.value)} placeholder="PIN 6 digit" style={{width:"100%",padding:14,borderRadius:12,border:"1px solid #e2e8f0",marginTop:12}}/><button onClick={()=>{if(pin.length>=4){setStep("pin2");localStorage.setItem("v25-step","pin2")}}} style={{width:"100%",marginTop:12,padding:12,borderRadius:10,background:"#0f172a",color:"#fff",border:"none",fontWeight:800}}>Lanjut</button></div></div>
  }
  if(step==="pin2"){
    return <div style={{minHeight:"100vh",background:"#eef6ff",fontFamily,display:"grid",placeItems:"center",padding:20}}><div style={{maxWidth:340,width:"100%",background:"#fff",borderRadius:20,padding:22}}><h3>Konfirmasi PIN</h3><input type="password" value={pin2} onChange={e=>setPin2(e.target.value)} placeholder="Ulangi PIN" style={{width:"100%",padding:14,borderRadius:12,border:"1px solid #e2e8f0",marginTop:12}}/><button onClick={()=>{if(pin===pin2){setStep("crypto2fa");localStorage.setItem("v25-step","crypto2fa")}else{alert("PIN beda")}} } style={{width:"100%",marginTop:12,padding:12,borderRadius:10,background:"#0f172a",color:"#fff",border:"none",fontWeight:800}}>Simpan</button></div></div>
  }
  if(step==="crypto2fa"){
    return <div style={{minHeight:"100vh",background:"#eef6ff",fontFamily,display:"grid",placeItems:"center",padding:20}}><div style={{maxWidth:380,width:"100%",background:"#fff",borderRadius:20,padding:22}}><h3>Seed 12 kata</h3><div style={{background:"#f8fafc",border:"1px dashed #cbd5e1",borderRadius:12,padding:12,marginTop:12,display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6}}>{"abandon ability able about above absent absorb abstract absurd abuse access accident".split(" ").map((w,i)=><div key={i} style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:8,padding:"6px 4px",fontSize:11,textAlign:"center"}}>{i+1}. {w}</div>)}</div><label style={{display:"flex",gap:8,marginTop:12,fontSize:13}}><input type="checkbox" checked={showSeed} onChange={e=>setShowSeed(e.target.checked)}/> Sudah simpan di Drive</label><button disabled={!showSeed} onClick={()=>{setStep("main");localStorage.setItem("v25-step","main")}} style={{width:"100%",marginTop:12,padding:12,borderRadius:10,background:showSeed?"#0f172a":"#94a3b8",color:"#fff",border:"none",fontWeight:800}}>Masuk</button></div></div>
  }
  return <div style={{maxWidth:440,margin:"0 auto",minHeight:"100vh",background:theme==="light"?"#eef6ff":"#0a0a0b",color:theme==="light"?"#0f172a":"#fff",fontFamily,paddingBottom:84,position:"relative"}}>
    <div style={{background:theme==="light"?"#ffffffcc":"#18181b",position:"sticky",top:0,zIndex:10,borderBottom:"1px solid #e2e8f0",padding:12}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{display:"flex",gap:10,alignItems:"center"}}>
          <button onClick={()=>setShowMenu(true)} style={{width:40,height:40,borderRadius:12,background:"#0ea5e9",display:"grid",placeItems:"center",color:"#fff",fontWeight:900,border:"none",fontSize:18}}>☰</button>
          <div><div style={{fontWeight:900,fontSize:18}}>Dompet AI</div><div style={{fontSize:11,color:"#64748b"}}>Tenang • {region} • BTC ${btc} • Supabase 1</div></div>
        </div>
        <button onClick={()=>setTheme(theme==="light"?"dark":"light")} style={{width:44,height:44,borderRadius:14,background:theme==="light"?"#fff":"#27272a",border:"1px solid #e2e8f0"}}>{theme==="light"?"🌙":"☀️"}</button>
      </div>
      <div style={{display:"flex",justifyContent:"center",marginTop:12}}>
        <div style={{display:"flex",background:theme==="light"?"#f1f5f9":"#27272a",borderRadius:14,padding:4,gap:4}}>
          <button onClick={()=>setMode("Dompet")} style={{padding:"10px 32px",borderRadius:12,border:"none",fontWeight:800,background:mode==="Dompet"?"#0f172a":"transparent",color:mode==="Dompet"?"#fff":theme==="light"?"#0f172a":"#fff"}}>Dompet</button>
          <button onClick={()=>setMode("Crypto")} style={{padding:"10px 32px",borderRadius:12,border:"none",fontWeight:800,background:mode==="Crypto"?"#0f172a":"transparent",color:mode==="Crypto"?"#fff":theme==="light"?"#0f172a":"#fff"}}>Crypto</button>
        </div>
      </div>
    </div>
    {showMenu && <div style={{position:"fixed",inset:0,zIndex:60,display:"flex"}}>
      <div style={{width:280,background:"#fff",height:"100%",padding:16,boxShadow:"4px 0 20px rgba(0,0,0,.2)"}}>
        <div style={{display:"flex",justifyContent:"space-between"}}><b>Menu</b><button onClick={()=>setShowMenu(false)} style={{border:"none",background:"#f1f5f9",borderRadius:8,padding:"6px 10px"}}>✕</button></div>
        <div style={{marginTop:16,display:"flex",flexDirection:"column",gap:8}}>
          <button onClick={()=>{setBottom("beranda");setShowMenu(false)}} style={{padding:12,borderRadius:12,border:"1px solid #e2e8f0",background:bottom==="beranda"?"#e0f2fe":"#fff",textAlign:"left",fontWeight:700}}>🏠 Beranda</button>
          <button onClick={()=>{setBottom("riwayat");setShowMenu(false)}} style={{padding:12,borderRadius:12,border:"1px solid #e2e8f0",background:"#fff",textAlign:"left",fontWeight:700}}>🧾 Input + Riwayat</button>
          <button onClick={()=>{setBottom("chat");setShowMenu(false)}} style={{padding:12,borderRadius:12,border:"1px solid #e2e8f0",background:"#fff",textAlign:"left",fontWeight:700}}>💬 Chat Meta AI</button>
          <button onClick={()=>{setBottom("laporan");setShowMenu(false)}} style={{padding:12,borderRadius:12,border:"1px solid #e2e8f0",background:"#fff",textAlign:"left",fontWeight:700}}>📊 Laporan</button>
          <button onClick={()=>{setBottom("profil");setShowMenu(false)}} style={{padding:12,borderRadius:12,border:"1px solid #e2e8f0",background:"#fff",textAlign:"left",fontWeight:700}}>⚙️ Profil</button>
          <div style={{height:1,background:"#e2e8f0",margin:"8px 0"}}></div>
          <div style={{fontSize:11,color:"#64748b"}}>Izin Kamera, Drive folder DompetAI, Sheet, Voice. Grup: Tabungan, Cicilan notif, Tunai, Pengeluaran, Darurat wajib.</div>
          <button onClick={()=>{localStorage.clear();location.reload()}} style={{marginTop:12,padding:12,borderRadius:10,background:"#fee2e2",color:"#ef4444",border:"none",fontWeight:700}}>Logout Reset</button>
        </div>
      </div>
      <div style={{flex:1,background:"rgba(0,0,0,.4)"}} onClick={()=>setShowMenu(false)}></div>
    </div>}
    {mode==="Dompet" && bottom==="beranda" && <>
      <div style={{padding:14}}><div style={{background:"linear-gradient(135deg,#3b82f6,#0ea5e9)",borderRadius:24,padding:20,color:"#fff"}}><div style={{display:"flex",justifyContent:"space-between"}}><div style={{fontSize:13}}>Total Saldo</div><button onClick={()=>setHide(!hide)} style={{background:"rgba(255,255,255,.2)",border:"none",borderRadius:8,padding:"4px 8px",color:"#fff"}}>{hide?"🙈":"👁️"}</button></div><div style={{fontSize:30,fontWeight:900,marginTop:8}}>{hide?"Rp ••••••":`Rp ${total.toLocaleString("id-ID")}`}</div><div style={{display:"flex",gap:12,marginTop:16}}><div style={{flex:1,background:"rgba(255,255,255,.2)",borderRadius:14,padding:12}}><div style={{fontSize:11}}>Pemasukan</div><div style={{fontWeight:800}}>Rp {masuk.toLocaleString("id-ID")}</div></div><div style={{flex:1,background:"rgba(255,255,255,.2)",borderRadius:14,padding:12}}><div style={{fontSize:11}}>Pengeluaran</div><div style={{fontWeight:800}}>Rp {keluar.toLocaleString("id-ID")}</div></div></div></div><div style={{background:"#fff",borderRadius:16,padding:14,marginTop:12,display:"flex",gap:10}}><div style={{width:44,height:44,borderRadius:12,background:"#dbeafe",display:"grid",placeItems:"center"}}>✨</div><div><div style={{fontWeight:700,fontSize:13}}>Insight AI</div><div style={{fontSize:11,color:"#64748b"}}>Arus kas positif. Saldo tujuan: {wallets[0]?.name}</div></div></div></div>
      <div style={{padding:"0 14px"}}><div style={{display:"flex",justifyContent:"space-between"}}><b>Grup Dompet (5 tipe)</b><button onClick={()=>setShowAddWallet(true)} style={{background:"#0ea5e9",color:"#fff",border:"none",borderRadius:8,padding:"6px 12px",fontWeight:700}}>+ Tambah</button></div><div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10,marginTop:10}}>{wallets.map(w=><div key={w.id} style={{background:w.color,color:"#fff",borderRadius:16,padding:14}}><div style={{fontSize:10}}>{w.type.toUpperCase()} - {w.bank}</div><div style={{fontWeight:800,marginTop:4}}>{w.name}</div><div style={{fontSize:11}}>{w.norek} - {w.currency}</div><div style={{fontWeight:800,marginTop:8}}>Rp {w.balance.toLocaleString("id-ID")}</div></div>)}</div></div>
      <div style={{padding:14}}><div style={{display:"flex",justifyContent:"space-between"}}><b>Transaksi terbaru</b><button onClick={()=>setBottom("riwayat")} style={{border:"none",background:"transparent",color:"#0ea5e9",fontWeight:700}}>Lihat semua</button></div><div style={{marginTop:10,display:"flex",flexDirection:"column",gap:8}}>{txs.slice(0,3).map(t=><div key={t.id} style={{background:"#fff",borderRadius:16,padding:12,display:"flex",gap:12,alignItems:"center"}}><div style={{width:48,height:48,borderRadius:12,background:"#e0f2fe",display:"grid",placeItems:"center"}}>🧾</div><div style={{flex:1}}><div style={{fontWeight:700,fontSize:13}}>{t.title}</div><div style={{fontSize:11,color:"#64748b"}}>{t.date}</div></div><div style={{fontWeight:800,fontSize:12,color:t.jenis==="keluar"?"#ef4444":"#10b981"}}>Rp {t.amount.toLocaleString("id-ID")}</div></div>)}</div></div>
    </>}
    {mode==="Dompet" && bottom==="riwayat" && <div style={{padding:14}}><div style={{display:"flex",justifyContent:"space-between"}}><h2 style={{margin:0}}>Riwayat</h2><button onClick={()=>setShowAddTx(true)} style={{background:"#0ea5e9",color:"#fff",border:"none",borderRadius:10,padding:"8px 14px",fontWeight:700}}>+ Input</button></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:12}}><select style={{padding:12,borderRadius:12,border:"1px solid #e2e8f0"}}><option>Semua periode</option></select><select style={{padding:12,borderRadius:12,border:"1px solid #e2e8f0"}}><option>Semua sumber</option></select><select style={{padding:12,borderRadius:12,border:"1px solid #e2e8f0"}}><option>Semua kategori</option></select><select style={{padding:12,borderRadius:12,border:"1px solid #e2e8f0"}}><option>Semua jenis</option></select></div><div style={{marginTop:14,display:"flex",flexDirection:"column",gap:8}}>{txs.map(t=><div key={t.id} style={{background:"#fff",borderRadius:16,padding:12,display:"flex",gap:12}}><div style={{width:52,height:52,borderRadius:14,background:"#f1f5f9",display:"grid",placeItems:"center"}}>🧾</div><div style={{flex:1}}><div style={{fontWeight:700}}>{t.title}</div><div style={{fontSize:11,color:"#64748b"}}>{t.date}</div></div><div style={{fontWeight:800}}>Rp {t.amount.toLocaleString("id-ID")}</div></div>)}</div></div>}
    {bottom==="chat" && <div style={{padding:14}}><h2 style={{margin:0}}>Chat AI</h2><div style={{background:"#fff",borderRadius:20,padding:16,marginTop:12,minHeight:420,display:"flex",flexDirection:"column"}}><div style={{flex:1,display:"flex",flexDirection:"column",gap:12}}>{chat.map((c,i)=><div key={i} style={{alignSelf:c.role==="ai"?"flex-start":"flex-end",maxWidth:"85%",background:c.role==="ai"?"#f8fafc":"#0ea5e9",color:c.role==="ai"?"#0f172a":"#fff",borderRadius:16,padding:12,fontSize:13}}>{c.text}</div>)}</div><div style={{display:"flex",gap:8,marginTop:14}}><input value={chatInput} onChange={e=>setChatInput(e.target.value)} placeholder="Tanya + suara..." style={{flex:1,padding:14,borderRadius:24,border:"1px solid #e2e8f0"}}/><button onClick={()=>{if(!chatInput) return; setChat([...chat,{role:"user",text:chatInput},{role:"ai",text:"Meta AI: Saldo Rp "+total.toLocaleString("id-ID")}]); setChatInput("")}} style={{width:48,height:48,borderRadius:14,background:"#0ea5e9",border:"none",color:"#fff"}}>➤</button></div></div></div>}
    {bottom==="laporan" && <div style={{padding:14}}><h2 style={{margin:0}}>Laporan</h2><div style={{background:"#fff",borderRadius:20,padding:14,marginTop:12}}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}><div style={{border:"1px solid #e2e8f0",borderRadius:14,padding:12}}><div style={{fontSize:11}}>Pemasukan</div><div style={{fontWeight:800}}>Rp {masuk.toLocaleString("id-ID")}</div></div><div style={{border:"1px solid #e2e8f0",borderRadius:14,padding:12}}><div style={{fontSize:11}}>Pengeluaran</div><div style={{fontWeight:800}}>Rp {keluar.toLocaleString("id-ID")}</div></div></div></div></div>}
    {bottom==="profil" && <div style={{padding:14}}><h2 style={{margin:0}}>Setting</h2><div style={{background:"#fff",borderRadius:20,padding:16,marginTop:12}}><div style={{display:"flex",justifyContent:"space-between",padding:"12px 0"}}><div><div style={{fontWeight:700}}>Mode gelap</div></div><button onClick={()=>setTheme(theme==="light"?"dark":"light")} style={{width:48,height:28,borderRadius:14,border:"none",background:theme==="dark"?"#0ea5e9":"#cbd5e1",position:"relative"}}><div style={{width:22,height:22,borderRadius:11,background:"#fff",position:"absolute",top:3,left:theme==="dark"?22:3}}/></button></div></div><h3 style={{marginTop:16}}>Gaya font</h3><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:8}}>{["Standar","Elegan","SANTAi","Tegas"].map(f=><button key={f} onClick={()=>setFont(f)} style={{padding:14,borderRadius:14,border:font===f?"2px solid #0ea5e9":"1px solid #e2e8f0",background:"#fff",fontWeight:700}}>{f}</button>)}</div></div>}
    {showAddWallet && <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",display:"grid",placeItems:"center",zIndex:70,padding:20}}><div style={{background:"#fff",borderRadius:20,padding:18,width:"100%",maxWidth:360}}><h3>Tambah Grup 5 Tipe</h3><div style={{display:"flex",flexDirection:"column",gap:8,marginTop:12}}><input value={newWallet.name} onChange={e=>setNewWallet({...newWallet,name:e.target.value})} placeholder="Nama" style={{padding:12,borderRadius:10,border:"1px solid #e2e8f0"}}/><select value={newWallet.type} onChange={e=>setNewWallet({...newWallet,type:e.target.value})} style={{padding:12,borderRadius:10,border:"1px solid #e2e8f0"}}><option value="tabungan">Tabungan</option><option value="cicilan">Cicilan</option><option value="tunai">Tunai</option><option value="pengeluaran">Pengeluaran</option><option value="darurat">Dana Darurat</option></select><div style={{display:"flex",gap:8}}><button onClick={()=>setShowAddWallet(false)} style={{flex:1,padding:12,borderRadius:10,border:"1px solid #e2e8f0",background:"#fff"}}>Batal</button><button onClick={()=>{if(!newWallet.name) return; setWallets([...wallets,{id:Date.now().toString(),name:newWallet.name,type:newWallet.type,color:newWallet.color,bank:newWallet.bank,norek:newWallet.norek||"-",currency:newWallet.currency,balance:0}]); setShowAddWallet(false)}} style={{flex:1,padding:12,borderRadius:10,background:"#0f172a",color:"#fff",border:"none",fontWeight:800}}>Simpan</button></div></div></div></div>}
    {showAddTx && <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",display:"grid",placeItems:"center",zIndex:70,padding:20}}><div style={{background:"#fff",borderRadius:20,padding:18,width:"100%",maxWidth:360}}><h3>Input Masuk/Keluar</h3><div style={{display:"flex",flexDirection:"column",gap:8,marginTop:12}}><input value={newTx.title} onChange={e=>setNewTx({...newTx,title:e.target.value})} placeholder="Judul" style={{padding:12,borderRadius:10,border:"1px solid #e2e8f0"}}/><input type="number" value={newTx.amount||""} onChange={e=>setNewTx({...newTx,amount:Number(e.target.value)})} placeholder="Jumlah" style={{padding:12,borderRadius:10,border:"1px solid #e2e8f0"}}/><select value={newTx.groupId} onChange={e=>setNewTx({...newTx,groupId:e.target.value})} style={{padding:12,borderRadius:10,border:"1px solid #e2e8f0"}}>{wallets.map(w=><option key={w.id} value={w.id}>{w.name}</option>)}</select><select value={newTx.jenis} onChange={e=>setNewTx({...newTx,jenis:e.target.value})} style={{padding:12,borderRadius:10,border:"1px solid #e2e8f0"}}><option value="masuk">Masuk</option><option value="keluar">Keluar</option></select><div style={{display:"flex",gap:8}}><button onClick={()=>setShowAddTx(false)} style={{flex:1,padding:12,borderRadius:10,border:"1px solid #e2e8f0",background:"#fff"}}>Batal</button><button onClick={()=>{if(!newTx.title||!newTx.amount) return; setTxs([{id:Date.now().toString(),title:newTx.title,amount:newTx.amount,groupId:newTx.groupId,jenis:newTx.jenis,kategori:newTx.kategori,date:new Date().toISOString().slice(0,10)},...txs]); setWallets(wallets.map(w=>{if(w.id===newTx.groupId){return {...w,balance:newTx.jenis==="masuk"?w.balance+newTx.amount:w.balance-newTx.amount}} return w})); setShowAddTx(false)}} style={{flex:1,padding:12,borderRadius:10,background:"#0f172a",color:"#fff",border:"none",fontWeight:800}}>Simpan</button></div></div></div></div>}
    <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:440,background:"#fff",borderTop:"1px solid #e2e8f0",display:"flex",justifyContent:"space-around",padding:"8px 0 18px",zIndex:20}}>
      <button onClick={()=>setBottom("beranda")} style={{background:"transparent",border:"none",display:"flex",flexDirection:"column",alignItems:"center",color:bottom==="beranda"?"#0ea5e9":"#94a3b8"}}><div style={{fontSize:22}}>🏠</div><div style={{fontSize:10,fontWeight:700}}>Beranda</div></button>
      <button onClick={()=>setBottom("riwayat")} style={{background:"transparent",border:"none",display:"flex",flexDirection:"column",alignItems:"center",color:bottom==="riwayat"?"#0ea5e9":"#94a3b8"}}><div style={{fontSize:22}}>🧾</div><div style={{fontSize:10,fontWeight:700}}>Input</div></button>
      <button onClick={()=>setBottom("chat")} style={{background:"transparent",border:"none",display:"flex",flexDirection:"column",alignItems:"center",color:bottom==="chat"?"#0ea5e9":"#94a3b8"}}><div style={{fontSize:22}}>💬</div><div style={{fontSize:10,fontWeight:700}}>Chat AI</div></button>
      <button onClick={()=>setBottom("laporan")} style={{background:"transparent",border:"none",display:"flex",flexDirection:"column",alignItems:"center",color:bottom==="laporan"?"#0ea5e9":"#94a3b8"}}><div style={{fontSize:22}}>📊</div><div style={{fontSize:10,fontWeight:700}}>Laporan</div></button>
      <button onClick={()=>setBottom("profil")} style={{background:"transparent",border:"none",display:"flex",flexDirection:"column",alignItems:"center",color:bottom==="profil"?"#0ea5e9":"#94a3b8"}}><div style={{fontSize:22}}>⚙️</div><div style={{fontSize:10,fontWeight:700}}>Profil</div></button>
    </div>
  </div>
}
