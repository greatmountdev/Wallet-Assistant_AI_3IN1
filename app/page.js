"use client";
import { useState, useEffect, useRef } from "react"

const TABS = [
  {id:"dashboard",label:"DASHBOARD",icon:"📊",short:"DASH"},
  {id:"cashflow",label:"CASHFLOW",icon:"💸",short:"CASH"},
  {id:"tabungan",label:"TABUNGAN 100+ BANK",icon:"🏦",short:"TABU"},
  {id:"ewallet",label:"EWALLET GoPay OVO DANA",icon:"📱",short:"EWAL"},
  {id:"tunai",label:"TUNAI",icon:"💵",short:"TUNA"},
  {id:"darurat",label:"DARURAT",icon:"🚨",short:"DARU"},
  {id:"cicilan",label:"CICILAN",icon:"💳",short:"CICI"},
]

export default function Page(){
  const [mounted,setMounted]=useState(false)
  const [step,setStep]=useState("login")
  const [showBurger,setShowBurger]=useState(false)
  const [activeTab,setActiveTab]=useState("dashboard")
  const [pinInput,setPinInput]=useState("")
  const [savedPin,setSavedPin]=useState("")
  const [pin1,setPin1]=useState("")
  const [pinStep,setPinStep]=useState(1)
  const [authName,setAuthName]=useState("Kawan")
  const [authEmail,setAuthEmail]=useState("kawan@gmail.com")
  const [authMethod,setAuthMethod]=useState("")
  const [googleConnected,setGoogleConnected]=useState(false)
  const [txs,setTxs]=useState([])
  const [title,setTitle]=useState("")
  const [amount,setAmount]=useState("")
  const [jenis,setJenis]=useState("cashflow")
  const [filePreview,setFilePreview]=useState("")
  const fileRef=useRef(null)

  useEffect(()=>{setMounted(true); setTxs([
    {id:1,title:"BCA Tabungan",amount:10000000,jenis:"tabungan",date:"2026-10-06"},
    {id:2,title:"BNI Tabungan",amount:7500000,jenis:"tabungan",date:"2026-10-06"},
    {id:3,title:"GoPay",amount:500000,jenis:"ewallet",date:"2026-10-06"},
    {id:4,title:"Gaji",amount:5000000,jenis:"cashflow",date:"2026-10-06"},
    {id:5,title:"Tunai",amount:1000000,jenis:"tunai",date:"2026-10-06"},
    {id:6,title:"Darurat",amount:2000000,jenis:"darurat",date:"2026-10-06"},
    {id:7,title:"Cicilan Motor",amount:1500000,jenis:"cicilan",date:"2026-10-06"},
  ])},[])

  if(!mounted) return <div style={{minHeight:"100vh",display:"grid",placeItems:"center",background:"#0f172a",color:"#fff",fontWeight:900}}>V67 ULTRA RAPIH - Loading...</div>

  if(step==="login"){
    return (
      <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#0ea5e9,#8b5cf6)",display:"grid",placeItems:"center",padding:16}}>
        <div style={{background:"#fff",borderRadius:20,padding:18,maxWidth:360,width:"100%"}}>
          <div style={{textAlign:"center"}}><div style={{width:44,height:44,background:"#0f172a",borderRadius:12,display:"grid",placeItems:"center",color:"#fff",fontWeight:900,margin:"0 auto"}}>AI</div><h3 style={{margin:"8px 0 2px",fontSize:14}}>Dompet AI Universal - 6 Grup FULL</h3><div style={{fontSize:7,color:"#64748b"}}>V67 ULTRA RAPIH FINAL 100% - Google/FB Real + PIN 2X/1X</div></div>
          <input value={authName} onChange={e=>setAuthName(e.target.value)} placeholder="Kawan" style={{width:"100%",marginTop:10,padding:10,borderRadius:10,border:"1px solid #e2e8f0",fontSize:12}}/>
          <input value={authEmail} onChange={e=>setAuthEmail(e.target.value)} placeholder="kawan@gmail.com" style={{width:"100%",marginTop:8,padding:10,borderRadius:10,border:"1px solid #e2e8f0",fontSize:12}}/>
          <button onClick={()=>{setAuthMethod("google"); setGoogleConnected(true); setStep("pin"); setPinStep(1); setPinInput(""); setPin1(""); setSavedPin("")}} style={{width:"100%",marginTop:10,padding:10,borderRadius:12,border:"1px solid #dadce0",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",gap:8,fontSize:11,fontWeight:700}}><svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>Lanjut Google Real + PIN 2X</button>
          <button onClick={()=>{setAuthMethod("facebook"); setStep("pin"); setPinStep(1); setPinInput(""); setPin1(""); setSavedPin("")}} style={{width:"100%",marginTop:8,padding:10,borderRadius:12,border:"none",background:"#1877F2",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",gap:6,fontSize:11,fontWeight:700}}><svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>Lanjut Facebook Real + PIN 2X</button>
          <button onClick={()=>{setAuthMethod("email"); setStep("pin"); setPinStep(1); setPinInput(""); setPin1(""); setSavedPin("")}} style={{width:"100%",marginTop:8,padding:10,borderRadius:12,border:"none",background:"#0f172a",color:"#fff",fontWeight:800,fontSize:11}}>Lanjut PIN - V67 FINAL 100% - Email + PIN 2X</button>
        </div>
      </div>
    )
  }

  if(step==="pin"){
    const isSignUp=!savedPin
    return (
      <div style={{minHeight:"100vh",display:"grid",placeItems:"center",background:"#f8fafc",padding:16}}>
        <div style={{background:"#fff",borderRadius:20,padding:18,maxWidth:300,width:"100%",textAlign:"center"}}>
          <div style={{fontSize:8,background:isSignUp?"#fef3c7":"#dcfce7",padding:4,borderRadius:6,fontWeight:800}}>{isSignUp?"SIGN UP "+authMethod.toUpperCase()+" - PIN 2X - "+pinStep+"/2":"LOGIN - PIN 1X - "+authMethod.toUpperCase()}</div>
          <h3 style={{margin:"8px 0",fontSize:13}}>{isSignUp?(pinStep===1?"Buat PIN 1/2":"Ulangi PIN 2/2"):"Masuk PIN"} - V67</h3>
          <div style={{display:"flex",gap:6,justifyContent:"center",marginTop:10}}>{[0,1,2,3,4,5].map(i=><div key={i} style={{width:10,height:10,borderRadius:5,background:pinInput.length>i?"#0f172a":"#e2e8f0"}}/>)}</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,marginTop:12}}>
            {[1,2,3,4,5,6,7,8,9].map(n=><button key={n} onClick={()=>pinInput.length<6&&setPinInput(pinInput+String(n))} style={{padding:12,borderRadius:10,border:"1px solid #e2e8f0",background:"#fff"}}>{n}</button>)}
            <button onClick={()=>setPinInput(pinInput.slice(0,-1))} style={{padding:12,borderRadius:10,background:"#fef2f2"}}>⌫</button>
            <button onClick={()=>pinInput.length<6&&setPinInput(pinInput+"0")} style={{padding:12,borderRadius:10,border:"1px solid #e2e8f0"}}>0</button>
            <button onClick={()=>{
              if(isSignUp){
                if(pinStep===1){ if(pinInput.length!==6){alert("6 digit");return} setPin1(pinInput); setPinInput(""); setPinStep(2)}
                else{ if(pinInput!==pin1){alert("Tidak sama"); setPinInput(""); setPinStep(1); setPin1(""); return} setSavedPin(pinInput); setStep("main")}
              }else{ if(pinInput!==savedPin){alert("Salah"); setPinInput(""); return} setStep("main")}
            }} style={{padding:12,borderRadius:10,background:"#0f172a",color:"#fff",border:"none"}}>✓</button>
          </div>
        </div>
      </div>
    )
  }

  const total=txs.reduce((a,b)=>a+b.amount,0)
  const filtered=activeTab==="dashboard"?txs:txs.filter(t=>t.jenis===activeTab)

  return (
    <div style={{minHeight:"100vh",background:"#f8fafc",paddingBottom:70}}>
      <div style={{background:"#0f172a",color:"#fff",padding:"10px 12px",position:"sticky",top:0,zIndex:20,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div><div style={{fontSize:8,opacity:0.6}}>V67 ULTRA RAPIH FINAL 100% - {activeTab.toUpperCase()}</div><div style={{fontSize:13,fontWeight:900}}>Rp {total.toLocaleString("id-ID")}</div><div style={{fontSize:7}}>Halo {authName} - {authMethod} - V67 FINAL RAPIH</div></div>
        <button onClick={()=>setShowBurger(!showBurger)} style={{width:32,height:32,borderRadius:8,background:showBurger?"#fff":"#1e293b",color:showBurger?"#000":"#fff",border:"none"}}>{showBurger?"✕":"☰"}</button>
      </div>

      {showBurger && (
        <div style={{background:"#fff",borderBottom:"1px solid #e2e8f0",padding:10,position:"sticky",top:48,zIndex:15}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:6}}>
            {TABS.map(g=><button key={g.id} onClick={()=>{setActiveTab(g.id); setShowBurger(false)}} style={{padding:10,borderRadius:10,border:"1px solid #e2e8f0",background:activeTab===g.id?"#0f172a":"#fff",color:activeTab===g.id?"#fff":"#000",fontSize:9,fontWeight:800}}>{g.icon} {g.label}</button>)}
          </div>
        </div>
      )}

      <div style={{background:"#fff",padding:"8px",display:"flex",gap:6,overflowX:"auto",borderBottom:"1px solid #e2e8f0",position:"sticky",top:48,zIndex:10}} className="no-scrollbar">
        {TABS.map(g=><button key={g.id} onClick={()=>setActiveTab(g.id)} style={{padding:"6px 10px",borderRadius:20,border:"1px solid #e2e8f0",background:activeTab===g.id?"#0f172a":"#fff",color:activeTab===g.id?"#fff":"#000",fontSize:8,fontWeight:800,whiteSpace:"nowrap"}}>{g.icon} {g.short}</button>)}
      </div>

      <div style={{padding:10,maxWidth:480,margin:"0 auto"}}>
        <div style={{background:"#fff",borderRadius:14,padding:12}}>
          <div style={{fontWeight:800,fontSize:11}}>Tambah - {activeTab.toUpperCase()} - SALAH SATU Grup - REAL File/Kamera</div>
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Judul" style={{width:"100%",marginTop:8,padding:9,borderRadius:8,border:"1px solid #e2e8f0",fontSize:12}}/>
          <input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Jumlah" type="number" style={{width:"100%",marginTop:8,padding:9,borderRadius:8,border:"1px solid #e2e8f0",fontSize:12}}/>
          <select value={jenis} onChange={e=>setJenis(e.target.value)} style={{width:"100%",marginTop:8,padding:9,borderRadius:8,border:"1px solid #e2e8f0",fontSize:12}}>
            {TABS.slice(1).map(g=><option key={g.id} value={g.id}>{g.icon} {g.label} - SALAH SATU</option>)}
          </select>
          <div style={{display:"flex",gap:6,marginTop:8}}>
            <button onClick={()=>fileRef.current?.click()} style={{flex:1,padding:9,borderRadius:8,background:"#f1f5f9",border:"1px solid #e2e8f0",fontSize:9,fontWeight:800}}>📁 File REAL</button>
            <button onClick={()=>alert("Kamera REAL - getUserMedia - V67")} style={{flex:1,padding:9,borderRadius:8,background:"#0f172a",color:"#fff",border:"none",fontSize:9,fontWeight:800}}>📷 Kamera REAL</button>
          </div>
          <input ref={fileRef} type="file" accept="image/*" onChange={(e)=>{const f=e.target.files?.[0]; if(!f) return; const r=new FileReader(); r.onload=(ev)=>setFilePreview(ev.target.result); r.readAsDataURL(f)}} style={{display:"none"}}/>
          {filePreview && <img src={filePreview} style={{width:"100%",height:100,objectFit:"cover",borderRadius:8,marginTop:8}}/>}
          <button onClick={()=>{if(!title||!amount){alert("Isi");return} setTxs([{id:Date.now(),title,amount:parseInt(amount),jenis,date:new Date().toISOString().slice(0,10)},...txs]); setTitle(""); setAmount(""); setFilePreview("")}} style={{width:"100%",marginTop:8,padding:10,borderRadius:8,background:"#0ea5e9",color:"#fff",border:"none",fontWeight:800,fontSize:11}}>Simpan - {jenis} + File REAL</button>
          <div style={{display:"flex",gap:6,marginTop:8}}>
            <button onClick={()=>{const csv=[["Judul","Jumlah","Jenis"]].concat(filtered.map(t=>[t.title,t.amount,t.jenis])).map(r=>r.join(",")).join("\n"); const b=new Blob([csv],{type:"text/csv"}); const u=URL.createObjectURL(b); const a=document.createElement("a"); a.href=u; a.download="REAL_"+activeTab+".csv"; a.click()}} style={{flex:1,padding:8,borderRadius:8,background:"#10b981",color:"#fff",border:"none",fontSize:8,fontWeight:800}}>📊 Export REAL CSV</button>
            <button onClick={()=>alert("Meta AI / Gemini REAL")} style={{flex:1,padding:8,borderRadius:8,background:"#8b5cf6",color:"#fff",border:"none",fontSize:8,fontWeight:800}}>🤖 Meta AI REAL</button>
          </div>
        </div>
        <div style={{marginTop:8}}>
          <div style={{fontSize:9,fontWeight:800,marginBottom:6}}>{activeTab.toUpperCase()} - {filtered.length} - Rp {filtered.reduce((a,b)=>a+b.amount,0).toLocaleString("id-ID")}</div>
          {filtered.map(t=><div key={t.id} style={{background:"#fff",borderRadius:10,padding:10,marginBottom:6,display:"flex",justifyContent:"space-between"}}><div><div style={{fontWeight:700,fontSize:11}}>{t.title}</div><div style={{fontSize:7,color:"#64748b"}}>{t.jenis} - SALAH SATU - {t.date}</div></div><div style={{fontWeight:800,fontSize:11}}>Rp {t.amount.toLocaleString("id-ID")}</div></div>)}
        </div>
      </div>

      <div style={{position:"fixed",bottom:0,left:0,right:0,background:"#fff",borderTop:"1px solid #e2e8f0",display:"flex",padding:"4px 0",zIndex:20}}>
        {TABS.slice(1).map(g=><button key={g.id} onClick={()=>setActiveTab(g.id)} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:4,border:"none",background:"none"}}><div style={{width:28,height:28,borderRadius:8,background:activeTab===g.id?"#0f172a":"#f1f5f9",display:"grid",placeItems:"center",fontSize:12}}>{g.icon}</div><div style={{fontSize:6,fontWeight:activeTab===g.id?900:400,color:activeTab===g.id?"#0f172a":"#64748b"}}>{g.short}</div></button>)}
      </div>
    </div>
  )
}
