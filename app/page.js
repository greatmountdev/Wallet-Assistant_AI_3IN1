"use client";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";
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
    // load dummy data after mount - NO localStorage
    setTxs([
      {id:1,title:"BCA Tabungan",amount:10000000,jenis:"tabungan"},
      {id:2,title:"GoPay E-Wallet",amount:500000,jenis:"ewallet"},
      {id:3,title:"Gaji Cash Flow",amount:5000000,jenis:"cashflow"},
    ])
  },[])

  if(!mounted){
    return <div style={{minHeight:"100vh",display:"grid",placeItems:"center",background:"#0f172a",color:"#fff"}}>Dompet AI V61 - Loading - Mounting...</div>
  }

  if(step==="login"){
    return (
      <div style={{minHeight:"100vh",background:"#f8fafc",display:"grid",placeItems:"center",padding:16}}>
        <div style={{background:"#fff",borderRadius:24,padding:24,maxWidth:360,width:"100%",boxShadow:"0 4px 20px rgba(0,0,0,0.1)"}}>
          <div style={{textAlign:"center"}}>
            <div style={{width:48,height:48,background:"#0ea5e9",borderRadius:12,display:"grid",placeItems:"center",color:"#fff",fontWeight:900,margin:"0 auto"}}>AI</div>
            <h2 style={{margin:"12px 0 4px"}}>Dompet AI V61</h2>
            <div style={{fontSize:10,color:"#10b981",fontWeight:800}}>✓ Vercel Ready ✓ Web Tampil - V61 FULL WEB AMAN</div>
            <div style={{fontSize:9,color:"#64748b",marginTop:4}}>V60 Hello Tampil → V61 Full Dompet - No Blank - Build: 2026-10-06 V61</div>
          </div>
          <input value={authName} onChange={e=>setAuthName(e.target.value)} placeholder="Nama" style={{width:"100%",marginTop:16,padding:12,borderRadius:10,border:"1px solid #e2e8f0"}}/>
          <button onClick={()=>setStep("pin")} style={{width:"100%",marginTop:12,padding:12,borderRadius:10,background:"#0f172a",color:"#fff",border:"none",fontWeight:800}}>Masuk - V61 WEB AMAN</button>
          <div style={{marginTop:10,fontSize:8,color:"#64748b",textAlign:"center"}}>6 Grup: Cash Flow, Tabungan 100+ Bank, E-Wallet, Tunai, Darurat, Cicilan - SALAH SATU</div>
        </div>
      </div>
    )
  }

  if(step==="pin"){
    const isSignUp = !savedPin
    return (
      <div style={{minHeight:"100vh",display:"grid",placeItems:"center",background:"#f8fafc",padding:16}}>
        <div style={{background:"#fff",borderRadius:24,padding:20,maxWidth:320,width:"100%",textAlign:"center"}}>
          <h3>{isSignUp ? (pinStep===1?"Buat PIN 1/2":"Buat PIN 2/2") : "Masuk PIN" } - V61</h3>
          <div style={{display:"flex",gap:6,justifyContent:"center",marginTop:10}}>{[0,1,2,3,4,5].map(i=><div key={i} style={{width:10,height:10,borderRadius:5,background:pinInput.length>i?"#0f172a":"#e2e8f0"}}/>)}</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginTop:12}}>
            {[1,2,3,4,5,6,7,8,9].map(n=><button key={n} onClick={()=>pinInput.length<6&&setPinInput(pinInput+String(n))} style={{padding:12,borderRadius:10,border:"1px solid #e2e8f0"}}>{n}</button>)}
            <button onClick={()=>setPinInput(pinInput.slice(0,-1))} style={{padding:12,borderRadius:10,background:"#fef2f2",border:"1px solid #fecaca"}}>⌫</button>
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
          <div style={{fontSize:10,opacity:0.7}}>V61 FULL WEB AMAN - Vercel Aman + Web Tampil</div>
          <div style={{fontSize:22,fontWeight:900,marginTop:6}}>Rp {total.toLocaleString("id-ID")}</div>
          <div style={{fontSize:10,marginTop:4}}>Halo {authName} - 6 Grup SALAH SATU - No Blank</div>
        </div>
        <div style={{background:"#fff",borderRadius:16,padding:14,marginTop:12}}>
          <div style={{fontWeight:800,fontSize:12}}>Tambah - SALAH SATU Grup</div>
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Judul" style={{width:"100%",marginTop:8,padding:10,borderRadius:8,border:"1px solid #e2e8f0"}}/>
          <input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Jumlah" type="number" style={{width:"100%",marginTop:8,padding:10,borderRadius:8,border:"1px solid #e2e8f0"}}/>
          <select value={jenis} onChange={e=>setJenis(e.target.value)} style={{width:"100%",marginTop:8,padding:10,borderRadius:8,border:"1px solid #e2e8f0"}}>
            <option value="cashflow">Cash Flow</option>
            <option value="tabungan">Tabungan - 100+ Bank</option>
            <option value="ewallet">E-Wallet - GoPay OVO DANA</option>
            <option value="tunai">Tunai</option>
            <option value="darurat">Darurat</option>
            <option value="cicilan">Cicilan</option>
          </select>
          <button onClick={()=>{
            if(!title||!amount){alert("Isi");return}
            setTxs([{id:Date.now(),title,amount:parseInt(amount),jenis},...txs]); setTitle(""); setAmount("")
          }} style={{width:"100%",marginTop:8,padding:10,borderRadius:8,background:"#0ea5e9",color:"#fff",border:"none",fontWeight:800}}>Simpan - {jenis}</button>
        </div>
        <div style={{marginTop:10}}>
          {txs.map(t=><div key={t.id} style={{background:"#fff",borderRadius:10,padding:10,marginBottom:6,display:"flex",justifyContent:"space-between"}}><div><div style={{fontWeight:700,fontSize:12}}>{t.title}</div><div style={{fontSize:8,color:"#64748b"}}>{t.jenis} - SALAH SATU</div></div><div style={{fontWeight:800}}>Rp {t.amount.toLocaleString("id-ID")}</div></div>)}
        </div>
        <div style={{textAlign:"center",marginTop:12,fontSize:10,color:"#10b981",fontWeight:800}}>✓ V61 WEB AMAN - Vercel Ready + Web Tampil + No Blank + No Application Error</div>
      </div>
    </div>
  )
}
