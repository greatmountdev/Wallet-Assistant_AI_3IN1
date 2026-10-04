
'use client'
import {useState} from 'react'
export default function Page(){
 const [mode,setMode]=useState('Lokal')
 const [chat,setChat]=useState(false)
 const [m,setM]=useState('')
 const [msgs,setMsgs]=useState([{r:'ai',t:'Halo bro! Gue asisten 3IN1. Mau cek Lokal, Global, atau Crypto?'}])
 const bal={Lokal:'Rp 12.450.000',Global:'$ 842.50',Crypto:'$ 1,234.56'}
 const send=()=>{
  if(!m.trim())return
  const q=m;setMsgs(s=>[...s,{r:'user',t:q}]);setM('')
  setTimeout(()=>{let a='Siap! ';if(q.toLowerCase().includes('saldo'))a+=`Saldo ${mode} ${bal[mode as keyof typeof bal]} bro!`;else if(q.includes('btc')||q.includes('crypto'))a+='BTC +2.34% hari ini!';else a+=`Mode ${mode} aktif.`;setMsgs(s=>[...s,{r:'ai',t:a}])},600)
 }
 return (
 <div style={{maxWidth:440,margin:'0 auto',minHeight:'100vh',background:'#0a0a0b',paddingBottom:80}}>
  <div style={{padding:20,display:'flex',justifyContent:'space-between'}}><div style={{display:'flex',gap:10,alignItems:'center'}}><div style={{width:38,height:38,borderRadius:12,background:'linear-gradient(135deg,#a78bfa,#ec4899)',display:'grid',placeItems:'center',fontWeight:700}}>W</div><div><b>Dompet AI 3IN1</b><div style={{fontSize:10,opacity:.5}}>V20.1 • Next 14.2.35 LTS • Ready</div></div></div><div>👤</div></div>
  <div style={{margin:'0 16px',background:'#1c1c1f',borderRadius:14,padding:4,display:'flex'}}>{['Lokal','Global','Crypto'].map(x=><button key={x} onClick={()=>setMode(x)} style={{flex:1,padding:10,borderRadius:10,border:'none',background:mode===x?'#fff':'transparent',color:mode===x?'#000':'#888',fontWeight:700,fontSize:13,cursor:'pointer'}}>{x==='Lokal'?'🇮🇩 Lokal':x==='Global'?'🌍 Global':'₿ Crypto'}</button>)}</div>
  <div style={{margin:16,borderRadius:20,padding:18,background:mode==='Lokal'?'linear-gradient(135deg,#0ea5e9,#6366f1)':mode==='Global'?'linear-gradient(135deg,#10b981,#06b6d4)':'linear-gradient(135deg,#f59e0b,#ef4444)'}}>
   <div style={{fontSize:11,opacity:.9}}>{mode.toUpperCase()} BALANCE</div><div style={{fontSize:30,fontWeight:800,margin:'6px 0'}}>{bal[mode as keyof typeof bal]}</div>
   <div style={{display:'flex',gap:8}}><button style={{flex:1,background:'#fff',color:'#000',border:'none',padding:11,borderRadius:10,fontWeight:700}}>Transfer</button><button style={{flex:1,background:'rgba(0,0,0,.25)',color:'#fff',border:'1px solid rgba(255,255,255,.3)',padding:11,borderRadius:10,fontWeight:700}}>QRIS</button></div>
  </div>
  <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10,padding:'0 16px'}}>
   {[{k:'Top Up',i:'➕'},{k:'Swap',i:'🔄'},{k:'History',i:'📊'},{k:'AI',i:'🤖'}].map(a=><div key={a.k} style={{background:'#1c1c1f',borderRadius:14,padding:12,textAlign:'center'}}><div style={{fontSize:18}}>{a.i}</div><div style={{fontSize:10,opacity:.7,marginTop:4}}>{a.k}</div></div>)}
  </div>
  <div style={{padding:16}}>
   <b style={{fontSize:13}}>Transaksi • {mode}</b>
   <div style={{marginTop:10,display:'flex',flexDirection:'column',gap:8}}>
    {[{n:'QRIS Kopi Kenangan',a:'-Rp 28.000',t:'10:23'},{n:'Top Up BCA',a:'+Rp 500.000',t:'09:15'},{n:'BTC Buy 0.0012',a:'+$42',t:'Kemarin'}].map((x,i)=><div key={i} style={{background:'#121214',border:'1px solid #1f1f23',borderRadius:12,padding:10,display:'flex',justifyContent:'space-between'}}><div><div style={{fontSize:12,fontWeight:600}}>{x.n}</div><div style={{fontSize:10,opacity:.5}}>{x.t}</div></div><div style={{fontWeight:700,fontSize:12,color:x.a.startsWith('+')?'#22c55e':'#fff'}}>{x.a}</div></div>)}
   </div>
  </div>
  {!chat&&<button onClick={()=>setChat(true)} style={{position:'fixed',bottom:18,right:18,width:52,height:52,borderRadius:26,background:'linear-gradient(135deg,#a78bfa,#ec4899)',border:'none',fontSize:22}}>🤖</button>}
  {chat&&<div style={{position:'fixed',bottom:0,left:'50%',transform:'translateX(-50%)',width:'100%',maxWidth:440,height:380,background:'#18181b',borderTopLeftRadius:18,borderTopRightRadius:18,border:'1px solid #27272a',display:'flex',flexDirection:'column'}}>
   <div style={{padding:12,display:'flex',justifyContent:'space-between',borderBottom:'1px solid #27272a'}}><b style={{fontSize:13}}>AI Asisten 3IN1</b><button onClick={()=>setChat(false)} style={{background:'#27272a',border:'none',color:'#fff',width:26,height:26,borderRadius:13}}>x</button></div>
   <div style={{flex:1,overflowY:'auto',padding:12,display:'flex',flexDirection:'column',gap:8}}>{msgs.map((x,i)=><div key={i} style={{alignSelf:x.r==='user'?'flex-end':'flex-start',maxWidth:'80%',background:x.r==='user'?'#fff':'#27272a',color:x.r==='user'?'#000':'#fff',padding:'7px 10px',borderRadius:12,fontSize:12}}>{x.t}</div>)}</div>
   <div style={{padding:8,display:'flex',gap:6,borderTop:'1px solid #27272a'}}><input value={m} onChange={e=>setM(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder='Tanya saldo...' style={{flex:1,background:'#27272a',border:'none',borderRadius:10,padding:'8px 10px',color:'#fff'}}/><button onClick={send} style={{background:'#fff',color:'#000',border:'none',borderRadius:10,padding:'0 12px',fontWeight:700}}>➤</button></div>
  </div>}
  <div style={{textAlign:'center',padding:14,fontSize:9,opacity:.3}}>V20.1 Fixed • Next 14.2.35 • walletassistantai.vercel.app</div>
 </div>
 )
}
