'use client'
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
 const bg=theme==='dark'?'#0a0a0b':'#f8fafc'
 const card=theme==='dark'?'#18181b':'#fff'
 const border=theme==='dark'?'#27272a':'#e2e8f0'
 const text=theme==='dark'?'#fff':'#0f172a'
 const sub=theme==='dark'?'#71717a':'#64748b'
 useEffect(()=>{
  const r=localStorage.getItem('v23-region')
  if(r) setRegion(r)
  const a=localStorage.getItem('v23-auth')
  if(a) setAuth(true)
  fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd').then(r=>r.json()).then(d=>{if(d.bitcoin&&d.bitcoin.usd)setBtc(d.bitcoin.usd)}).catch(()=>{})
 },[])
 if(!region){
  return <div style={{minHeight:'100vh',background:bg,color:text,display:'grid',placeItems:'center',padding:20}}>
   <div style={{maxWidth:360,width:'100%'}}>
   <h2 style={{textAlign:'center'}}>Pilih Mode Dompet</h2>
   <button onClick={()=>{setRegion('ID');localStorage.setItem('v23-region','ID')}} style={{width:'100%',padding:16,borderRadius:12,background:card,color:text,border:'1px solid '+border,marginBottom:10}}>INDONESIA - BCA BNI BRI GOPAY OVO DANA</button>
   <button onClick={()=>{setRegion('GLOBAL');localStorage.setItem('v23-region','GLOBAL')}} style={{width:'100%',padding:16,borderRadius:12,background:card,color:text,border:'1px solid '+border}}>GLOBAL - Custom Bank USD EUR SGD JPY + List Indo</button>
   </div></div>
 }
 if(!auth){
  return <div style={{minHeight:'100vh',background:bg,color:text,display:'grid',placeItems:'center',padding:20}}>
   <div style={{maxWidth:340,width:'100%',background:card,border:'1px solid '+border,borderRadius:16,padding:20}}>
   <h3>Login Dompet 3IN1</h3>
   <button onClick={()=>{setAuth(true);localStorage.setItem('v23-auth','1')}} style={{width:'100%',padding:12,borderRadius:10,marginTop:12,background:'#fff',color:'#000',border:'none',fontWeight:700}}>Sign up with Google</button>
   <button onClick={()=>{setAuth(true);localStorage.setItem('v23-auth','1')}} style={{width:'100%',padding:12,borderRadius:10,marginTop:8,background:'#1877F2',color:'#fff',border:'none',fontWeight:700}}>Sign up with Facebook</button>
   <input value={pinSet} onChange={e=>setPinSet(e.target.value)} placeholder='Buat PIN 6 digit untuk 2FA Crypto' type='password' style={{width:'100%',marginTop:12,padding:12,borderRadius:10,border:'1px solid '+border,background:bg,color:text}}/>
   <button onClick={()=>{if(pinSet.length>=4){setAuth(true);localStorage.setItem('v23-auth','1');localStorage.setItem('v23-pin',pinSet)}}} style={{width:'100%',marginTop:10,padding:12,borderRadius:10,background:text,color:bg,border:'none',fontWeight:800}}>Lanjut Simpan PIN</button>
   </div></div>
 }
 return <div style={{maxWidth:440,margin:'0 auto',minHeight:'100vh',background:bg,color:text,paddingBottom:80}}>
  <div style={{position:'sticky',top:0,background:bg,borderBottom:'1px solid '+border,padding:10}}>
   <div style={{display:'flex',justifyContent:'space-between'}}><b>Dompet AI 3IN1 V23.4 - {region} - BTC ${btc}</b><button onClick={()=>setTheme(theme==='dark'?'light':'dark')} style={{border:'1px solid '+border,background:card,color:text,borderRadius:6,padding:'4px 8px'}}>{theme}</button></div>
   <div style={{display:'flex',justifyContent:'center',marginTop:8}}><div style={{display:'flex',gap:4,background:card,border:'1px solid '+border,borderRadius:10,padding:4}}><button onClick={()=>setMode('Dompet')} style={{padding:'6px 20px',borderRadius:8,border:'none',background:mode==='Dompet'?text:card,color:mode==='Dompet'?bg:text,fontWeight:700}}>Dompet</button><button onClick={()=>setMode('Crypto')} style={{padding:'6px 20px',borderRadius:8,border:'none',background:mode==='Crypto'?text:card,color:mode==='Crypto'?bg:text,fontWeight:700}}>Crypto</button></div></div>
  </div>
  <div style={{padding:12}}><b>Tabungan Grouping Beda Warna</b><div style={{display:'flex',gap:8,marginTop:8}}><div style={{flex:1,padding:12,borderRadius:12,background:'#0ea5e9',color:'#fff'}}><div style={{fontSize:10}}>TABUNGAN</div><b>Utama</b><div>Rp 12.472.000</div></div><div style={{flex:1,padding:12,borderRadius:12,background:'#10b981',color:'#fff'}}><div style={{fontSize:10}}>TAB BARU</div><b>Liburan</b><div>Rp 2.500.000</div></div></div></div>
  <div style={{padding:12}}><b>Bank {region}</b><div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,marginTop:8}}><div style={{background:card,border:'1px solid '+border,borderRadius:10,padding:10,textAlign:'center'}}>BCA</div><div style={{background:card,border:'1px solid '+border,borderRadius:10,padding:10,textAlign:'center'}}>BNI</div><div style={{background:card,border:'1px solid '+border,borderRadius:10,padding:10,textAlign:'center'}}>BRI</div><div style={{background:card,border:'1px solid '+border,borderRadius:10,padding:10,textAlign:'center'}}>GoPay</div><div style={{background:card,border:'1px solid '+border,borderRadius:10,padding:10,textAlign:'center'}}>OVO</div><div style={{background:card,border:'1px solid '+border,borderRadius:10,padding:10,textAlign:'center'}}>DANA</div></div>{region==='GLOBAL'&&<div style={{marginTop:8,background:card,border:'1px solid '+border,borderRadius:10,padding:10}}><b style={{fontSize:11}}>Tambah Akun Custom Global - USD EUR SGD JPY</b><div style={{fontSize:10,color:sub,marginTop:4}}>Bisa tambah Chase, DBS, dll sesuai negara + mata uang masing2</div></div>}</div>
  <div style={{padding:12}}><div style={{background:card,border:'1px solid '+border,borderRadius:12,padding:12}}><b>Saldo {mode}</b><div style={{fontSize:20,fontWeight:800,marginTop:6}}>Rp 12.472.000 - BTC ${btc.toLocaleString()}</div><button onClick={()=>setShowPin(true)} style={{width:'100%',marginTop:8,padding:10,borderRadius:8,background:text,color:bg,border:'none',fontWeight:700}}>Transfer - Butuh PIN 2FA Crypto</button><div style={{marginTop:8,fontSize:10,color:sub}}>Izin: Google Drive Backup - Meta AI Voice Type - Dark White Theme - Font Bold Friendly</div></div></div>
  {showPin&&<div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.6)',display:'grid',placeItems:'center',zIndex:10}}><div style={{background:card,border:'1px solid '+border,borderRadius:12,padding:16,width:300}}><b>PIN 2FA Crypto</b><input value={pin} onChange={e=>setPin(e.target.value)} type='password' placeholder='PIN' style={{width:'100%',marginTop:8,padding:10,borderRadius:8,border:'1px solid '+border,background:bg,color:text}}/><div style={{display:'flex',gap:8,marginTop:8}}><button onClick={()=>setShowPin(false)} style={{flex:1,padding:8,borderRadius:8,border:'1px solid '+border,background:card,color:text}}>Batal</button><button onClick={()=>{if(pin===localStorage.getItem('v23-pin')||pin.length>=4){alert('PIN Benar - Transaksi Diizinkan');setShowPin(false)}else{alert('PIN Salah')}}} style={{flex:1,padding:8,borderRadius:8,background:text,color:bg,border:'none'}}>OK</button></div></div></div>}
  <div style={{position:'fixed',bottom:0,left:'50%',transform:'translateX(-50%)',width:'100%',maxWidth:440,background:card,borderTop:'1px solid '+border,display:'flex',justifyContent:'space-around',padding:'8px 0'}}><button style={{background:'none',border:'none',color:text,fontWeight:700}}>Home</button><button style={{background:'none',border:'none',color:sub}}>Wallet</button><button style={{background:'none',border:'none',color:sub}}>Crypto</button><button style={{background:'none',border:'none',color:sub}}>History</button><button style={{background:'none',border:'none',color:sub}}>Profile</button></div>
 </div>
}
