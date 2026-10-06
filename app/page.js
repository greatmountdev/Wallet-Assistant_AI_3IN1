"use client";
import { useState, useEffect } from "react"

export default function Page(){
  const [mounted,setMounted]=useState(false)
  const [step,setStep]=useState("login")
  const [pinInput,setPinInput]=useState("")
  const [savedPin,setSavedPin]=useState("")
  const [pin1,setPin1]=useState("")
  const [pinStep,setPinStep]=useState(1)
  const [authName,setAuthName]=useState("Kawan")
  const [txs,setTxs]=useState([])
  const [title,setTitle]=useState("")
  const [amount,setAmount]=useState("")
  const [jenis,setJenis]=useState("cashflow")

  useEffect(()=>{
    setMounted(true)
    setTxs([
      {id:1,title:"BCA Tabungan",amount:10000000,jenis:"tabungan"},
      {id:2,title:"GoPay E-Wallet",amount:500000,jenis:"ewallet"},
      {id:3,title:"Gaji Cash Flow",amount:5000000,jenis:"cashflow"},
    ])
  },[])

  if(!mounted){
    return <div style={{minHeight:"100vh",display:"grid",placeItems:"center",background:"#0f172a",color:"#fff",fontWeight:900}}>Dompet AI V62 - Loading Mounted...</div>
  }

  if(step==="login"){
    return (
      <div style={{minHeight:"100vh",background:"#f8fafc",display:"grid",placeItems:"center",padding:16}}>
        <div style={{background:"#fff",borderRadius:24,padding:24,maxWidth:360,width:"100%",textAlign:"center",boxShadow:"0 10px 30px rgba(0,0,0,0.1)"}}>
          <div style={{width:48,height:48,background:"#0ea5e9",borderRadius:12,display:"grid",placeItems:"center",color:"#fff",fontWeight:900,margin:"0 auto"}}>AI</div>
          <h2 style={{margin:"12px 0 4px"}}>Dompet AI V62</h2>
          <div style={{background:"#10b981",color:"#fff",padding:6,borderRadius:8,fontSize:10,fontWeight:800}}>✓ FIX BLANK - Dynamic di layout.js saja, page.js cuma use client</div>
          <div style={{fontSize:9,color:"#64748b",marginTop:6}}>V62 FIX: export const dynamic HAPUS dari page.js - cuma di layout.js server</div>
          <input value={authName} onChange={e=>setAuthName(e.target.value)} placeholder="Nama" style={{width:"100%",marginTop:12,padding:12,borderRadius:10,border:"1px solid #e2e8f0"}}/>
          <button onClick={()=>setStep("pin")} style={{width:"100%",marginTop:10,padding:12,borderRadius:10,background:"#0f172a",color:"#fff",border:"none",fontWeight:800}}>Masuk - V62 WEB TAMPIL</button>
          <div style={{marginTop:8,fontSize:8,color:"#64748b"}}>Build: V62 FIX BLANK - {new Date().toLocaleString("id-ID")}</div>
        </div>
      </div>
    )
  }

  if(step==="pin"){
    const isSignUp = !savedPin
    return (
      <div style={{minHeight:"100vh",display:"grid",placeItems:"center",background:"#f8fafc",padding:16}}>
        <div style={{background:"#fff",borderRadius:20,padding:20,maxWidth:320,width:"100%",textAlign:"center"}}>
          <h3 style={{margin:0}}>{isSignUp ? (pinStep===1?"Buat PIN 1/2 V62":"Buat PIN 2/2 V62") : "Masuk PIN V62"}</h3>
          <div style={{display:"flex",gap:6,justifyContent:"center",marginTop:10}}>{[0,1,2,3,4,5].map(i=><div key={i} style={{width:10,height:10,borderRadius:5,background:pinInput.length>i?"#0f172a":"#e2e8f0"}}/>)}</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginTop:12}}>
            {[1,2,3,4,5,6,7,8,9].map(n=><button key={n} onClick={()=>pinInput.length<6&&setPinInput(pinInput+String(n))} style={{padding:12,borderRadius:10,border:"1px solid #e2e8f0"}}>{n}</button>)}
            <button onClick={()=>setPinInput(pinInput.slice(0,-1))} style={{padding:12,borderRadius:10,background:"#fef2f2"}}>⌫</button>
            <button onClick={()=>pinInput.length<6&&setPinInput(pinInput+"0")} style={{padding:12,borderRadius:10,border:"1px solid #e2e8f0"}}>0</button>
            <button onClick={()=>{
              if(isSignUp){
                if(pinStep===1){ if(pinInput.length!==6){alert("6 digit");return} setPin1(pinInput); setPinInput(""); setPinStep(2)}
                else{ if(pinInput!==pin1){alert("Tidak sama"); setPinInput(""); setPinStep(1); setPin1(""); return} setSavedPin(pinInput); setStep("main") }
              }else{ if(pinInput!==savedPin){alert("Salah"); setPinInput(""); return} setStep("main") }
            }} style={{padding:12,borderRadius:10,background:"#0f172a",color:"#fff",border:"none"}}>✓</button>
          </div>
        </div>
      </div>
    )
  }

  const total = txs.reduce((a,b)=>a+b.amount,0)
  return (
    <div style={{minHeight:"100vh",background:"#f8fafc",padding:16}}>
      <div style={{maxWidth:420,margin:"0 auto"}}>
        <div style={{background:"#0f172a",color:"#fff",borderRadius:20,padding:20}}>
          <div style={{fontSize:10,opacity:0.7}}>V62 FIX BLANK - Web Tampil - Dynamic Fix</div>
          <div style={{fontSize:20,fontWeight:900,marginTop:4}}>Rp {total.toLocaleString("id-ID")}</div>
          <div style={{fontSize:10,marginTop:4}}>Halo {authName} - 6 Grup SALAH SATU</div>
        </div>
        <div style={{background:"#fff",borderRadius:16,padding:12,marginTop:10}}>
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Judul" style={{width:"100%",padding:10,borderRadius:8,border:"1px solid #e2e8f0"}}/>
          <input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Jumlah" type="number" style={{width:"100%",marginTop:8,padding:10,borderRadius:8,border:"1px solid #e2e8f0"}}/>
          <select value={jenis} onChange={e=>setJenis(e.target.value)} style={{width:"100%",marginTop:8,padding:10,borderRadius:8,border:"1px solid #e2e8f0"}}>
            <option value="cashflow">Cash Flow</option>
            <option value="tabungan">Tabungan</option>
            <option value="ewallet">E-Wallet</option>
            <option value="tunai">Tunai</option>
            <option value="darurat">Darurat</option>
            <option value="cicilan">Cicilan</option>
          </select>
          <button onClick={()=>{ if(!title||!amount){alert("Isi");return} setTxs([{id:Date.now(),title,amount:parseInt(amount),jenis},...txs]); setTitle(""); setAmount("") }} style={{width:"100%",marginTop:8,padding:10,borderRadius:8,background:"#0ea5e9",color:"#fff",border:"none",fontWeight:800}}>Simpan {jenis}</button>
        </div>
        <div style={{marginTop:10}}>{txs.map(t=><div key={t.id} style={{background:"#fff",borderRadius:10,padding:10,marginBottom:6,display:"flex",justifyContent:"space-between"}}><div><div style={{fontWeight:700,fontSize:12}}>{t.title}</div><div style={{fontSize:8,color:"#64748b"}}>{t.jenis}</div></div><div style={{fontWeight:800}}>Rp {t.amount.toLocaleString("id-ID")}</div></div>)}</div>
        <div style={{textAlign:"center",marginTop:10,fontSize:10,color:"#10b981",fontWeight:800}}>✓ V62 FIX BLANK - WEB TAMPIL - DYNAMIC DI LAYOUT.JS SAJA</div>
      </div>
    </div>
  )
}
