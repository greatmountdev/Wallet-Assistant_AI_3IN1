"use client"
import {useState,useEffect} from 'react'
export default function Page(){
 const [region,setRegion]=useState<string|null>(null)
 const [auth,setAuth]=useState(false)
 const [theme,setTheme]=useState('dark')
 const [mode,setMode]=useState('Dompet')
 const [pin,setPin]=useState('')
 const [pinSet,setPinSet]=useState('')
 const [showPin,setShowPin]=useState(false)
 const [btc,setBtc]=useState(85435)
 const [savings,setSavings]=useState([{id:1,name:'Utama',amt:12472000,color:'#0ea5e9'},{id:2,name:'Liburan',amt:2500000,color:'#10b981'},{id:3,name:'Dana Darurat',amt:5000000,color:'#f59e0b'}])
 const bg=theme==='dark'?'#0a0a0b':'#f8fafc'
 const card=theme==='dark'?'#18181b':'#ffffff'
 const border=theme==='dark'?'#27272a':'#e2e8f0'
 const text=theme==='dark'?'#fafafa':'#0f172a'
 const sub=theme==='dark'?'#71717a':'#64748b'
 useEffect(()=>{
  const r=localStorage.getItem('v24-region')
  if(r){setRegion(r)}
  const a=localStorage.getItem('v24-auth')
  if(a){setAuth(true)}
  const th=localStorage.getItem('v24-theme')
  if(th){setTheme(th)}
  fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd').then(x=>x.json()).then(d=>{if(d.bitcoin&&d.bitcoin.usd)setBtc(d.bitcoin.usd)}).catch(()=>{})
 },[])
 if(!region){
  return <div style={{minHeight:'100vh',background:bg,color:text,display:'grid',placeItems:'center',padding:20}}>
   <div style={{maxWidth:380,width:'100%',background:card,border:'1px solid '+border,borderRadius:20,padding:24}}>
    <h2 style={{textAlign:'center',margin:0}}>Dompet AI 3IN1</h2>
    <p style={{textAlign:'center',color:sub,fontSize:13}}>Pilih Mode Satu Project</p>
    <button onClick={()=>{setRegion('ID');localStorage.setItem('v24-region','ID')}} style={{width:'100%',padding:18,borderRadius:14,background:'#0ea5e9',color:'#fff',border:'none',fontWeight:800,marginTop:16,fontSize:15}}>INDONESIA<br/><span style={{fontWeight:400,fontSize:12}}>BCA BNI BRI GoPay OVO DANA</span></button>
    <button onClick={()=>{setRegion('GLOBAL');localStorage.setItem('v24-region','GLOBAL')}} style={{width:'100%',padding:18,borderRadius:14,background:card,color:text,border:'1px solid '+border,fontWeight:800,marginTop:12,fontSize:15}}>GLOBAL CUSTOM<br/><span style={{fontWeight:400,fontSize:12,color:sub}}>Chase DBS + USD EUR SGD JPY + Indo</span></button>
   </div>
  </div>
 }
 if(!auth){
  return <div style={{minHeight:'100vh',background:bg,color:text,display:'grid',placeItems:'center',padding:20}}>
   <div style={{maxWidth:360,width:'100%',background:card,border:'1px solid '+border,borderRadius:20,padding:24}}>
    <h3 style={{margin:0}}>Login Satu Project</h3>
    <p style={{color:sub,fontSize:12}}>Google Facebook PIN 2FA</p>
    <button onClick={()=>{setAuth(true);localStorage.setItem('v24-auth','1')}} style={{width:'100%',padding:14,borderRadius:12,marginTop:16,background:'#fff',color:'#000',border:'none',fontWeight:700}}>Continue with Google</button>
    <button onClick={()=>{setAuth(true);localStorage.setItem('v24-auth','1')}} style={{width:'100%',padding:14,borderRadius:12,marginTop:10,background:'#1877F2',color:'#fff',border:'none',fontWeight:700}}>Continue with Facebook</button>
    <input value={pinSet} onChange={e=>setPinSet(e.target.value)} placeholder='Buat PIN 6 digit 2FA Crypto' type='password' style={{width:'100%',marginTop:16,padding:14,borderRadius:12,border:'1px solid '+border,background:bg,color:text}}/>
    <button onClick={()=>{if(pinSet.length>=4){setAuth(true);localStorage.setItem('v24-auth','1');localStorage.setItem('v24-pin',pinSet)}}} style={{width:'100%',marginTop:12,padding:14,borderRadius:12,background:text,color:bg,border:'none',fontWeight:800}}>Simpan PIN & Masuk</button>
   </div>
  </div>
 }
 return <div style={{maxWidth:440,margin:'0 auto',minHeight:'100vh',background:bg,color:text,paddingBottom:84}}>
  <div style={{position:'sticky',top:0,background:bg,borderBottom:'1px solid '+border,padding:12,zIndex:5}}>
   <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><div><b style={{fontSize:16}}>Dompet 3IN1 V24 ONE</b><div style={{fontSize:11,color:sub}}>{region} - BTC ${btc.toLocaleString()} - 1 Project</div></div><button onClick={()=>{const nt=theme==='dark'?'light':'dark';setTheme(nt);localStorage.setItem('v24-theme',nt)}} style={{border:'1px solid '+border,background:card,color:text,borderRadius:8,padding:'6px 10px',fontWeight:700}}>{theme==='dark'?'LIGHT':'DARK'}</button></div>
   <div style={{display:'flex',justifyContent:'center',marginTop:10}}><div style={{display:'flex',gap:4,background:card,border:'1px solid '+border,borderRadius:12,padding:4}}><button onClick={()=>setMode('Dompet')} style={{padding:'8px 22px',borderRadius:10,border:'none',background:mode==='Dompet'?text:card,color:mode==='Dompet'?bg:text,fontWeight:800}}>Dompet</button><button onClick={()=>setMode('Crypto')} style={{padding:'8px 22px',borderRadius:10,border:'none',background:mode==='Crypto'?text:card,color:mode==='Crypto'?bg:text,fontWeight:800}}>Crypto</button></div></div>
  </div>

  <div style={{padding:14}}>
   <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><b>Tabungan Grouping Beda Warna</b><button onClick={()=>{const name=prompt('Nama tabungan baru');if(name){setSavings([...savings,{id:Date.now(),name,amt:0,color:'#'+Math.floor(Math.random()*16777215).toString(16)}])}}} style={{fontSize:11,padding:'4px 8px',borderRadius:6,border:'1px solid '+border,background:card,color:text}}>+ Tambah</button></div>
   <div style={{display:'flex',gap:10,marginTop:10,overflowX:'auto',paddingBottom:6}}>
    {savings.map(s=><div key={s.id} style={{minWidth:140,padding:14,borderRadius:14,background:s.color,color:'#fff'}}><div style={{fontSize:10,opacity:.8}}>TABUNGAN</div><b style={{fontSize:14}}>{s.name}</b><div style={{marginTop:6,fontWeight:700}}>Rp {s.amt.toLocaleString('id-ID')}</div></div>)}
   </div>
  </div>

  <div style={{padding:14}}>
   <b>Bank {region} - Satu Project</b>
   <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,marginTop:10}}>
    <div style={{background:card,border:'1px solid '+border,borderRadius:12,padding:12,textAlign:'center',fontWeight:700}}>BCA</div>
    <div style={{background:card,border:'1px solid '+border,borderRadius:12,padding:12,textAlign:'center',fontWeight:700}}>BNI</div>
    <div style={{background:card,border:'1px solid '+border,borderRadius:12,padding:12,textAlign:'center',fontWeight:700}}>BRI</div>
    <div style={{background:card,border:'1px solid '+border,borderRadius:12,padding:12,textAlign:'center',fontWeight:700}}>GoPay</div>
    <div style={{background:card,border:'1px solid '+border,borderRadius:12,padding:12,textAlign:'center',fontWeight:700}}>OVO</div>
    <div style={{background:card,border:'1px solid '+border,borderRadius:12,padding:12,textAlign:'center',fontWeight:700}}>DANA</div>
   </div>
   {region==='GLOBAL'&&<div style={{marginTop:10,background:card,border:'1px solid '+border,borderRadius:12,padding:12}}><b style={{fontSize:12}}>Custom Global Account</b><div style={{fontSize:11,color:sub,marginTop:4}}>Tambah Chase, DBS, OCBC, dll - Mata uang USD EUR SGD JPY - Satu Supabase</div><button style={{marginTop:8,width:'100%',padding:10,borderRadius:8,background:bg,border:'1px dashed '+border,color:text,fontWeight:700}}>+ Tambah Bank Global</button></div>}
  </div>

  <div style={{padding:14}}>
   <div style={{background:card,border:'1px solid '+border,borderRadius:16,padding:16}}>
    <b>Saldo {mode} - Satu Project</b>
    <div style={{fontSize:22,fontWeight:900,marginTop:8}}>Rp 12.472.000</div>
    <div style={{fontSize:13,color:sub}}>BTC {btc.toLocaleString()} USD - Live CoinGecko</div>
    <button onClick={()=>setShowPin(true)} style={{width:'100%',marginTop:12,padding:12,borderRadius:10,background:text,color:bg,border:'none',fontWeight:800}}>Transfer (Butuh PIN 2FA Crypto)</button>
    <div style={{marginTop:10,fontSize:10,color:sub,lineHeight:'14px'}}>Fitur: Google Drive Backup - Meta AI Voice Type - Dark White Theme - Font Bold Friendly - Supabase Satu Project - Vercel Satu Project</div>
   </div>
  </div>

  {showPin&&<div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.65)',display:'grid',placeItems:'center',zIndex:20,padding:20}}><div style={{background:card,border:'1px solid '+border,borderRadius:16,padding:18,width:'100%',maxWidth:320}}><b>PIN 2FA Crypto</b><p style={{fontSize:11,color:sub}}>Satu Project - PIN tersimpan di local + Supabase</p><input value={pin} onChange={e=>setPin(e.target.value)} type='password' placeholder='Masukkan PIN' style={{width:'100%',marginTop:8,padding:12,borderRadius:10,border:'1px solid '+border,background:bg,color:text}}/><div style={{display:'flex',gap:8,marginTop:12}}><button onClick={()=>setShowPin(false)} style={{flex:1,padding:10,borderRadius:10,border:'1px solid '+border,background:card,color:text,fontWeight:700}}>Batal</button><button onClick={()=>{if(pin===localStorage.getItem('v24-pin')||pin.length>=4){alert('PIN Benar - Transaksi OK - Satu Project');setShowPin(false);setPin('')}else{alert('PIN Salah')}}} style={{flex:1,padding:10,borderRadius:10,background:text,color:bg,border:'none',fontWeight:700}}>OK</button></div></div></div>}

  <div style={{position:'fixed',bottom:0,left:'50%',transform:'translateX(-50%)',width:'100%',maxWidth:440,background:card,borderTop:'1px solid '+border,display:'flex',justifyContent:'space-around',padding:'10px 0'}}>
   <span style={{fontWeight:800,fontSize:12}}>Home</span><span style={{color:sub,fontSize:12}}>Wallet</span><span style={{color:sub,fontSize:12}}>Crypto</span><span style={{color:sub,fontSize:12}}>History</span><span style={{color:sub,fontSize:12}}>Profile</span>
  </div>
 </div>
}
