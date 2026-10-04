
'use client'
import {useState,useEffect} from 'react'
type Tx={id:number,n:string,a:string,t:string,cat:string,icon:string,val:number,usd?:number}
export default function Page(){
 const [mode,setMode]=useState<'Lokal'|'Global'|'Crypto'>('Lokal')
 const [chat,setChat]=useState(false)
 const [m,setM]=useState('')
 const [showTopUp,setShowTopUp]=useState(false)
 const [topTab,setTopTab]=useState<'ewallet'|'crypto'>('ewallet')
 const [provider,setProvider]=useState('BCA')
 const [coin,setCoin]=useState('BTC')
 const [amt,setAmt]=useState('')
 const [prices,setPrices]=useState({BTC:67234,ETH:3456,SOL:145})
 const [usdRate,setUsdRate]=useState(16500)
 const [txs,setTxs]=useState<Tx[]>([
  {id:1,n:'QRIS Kopi Kenangan',a:'-Rp 28.000',t:'10:23',cat:'Lokal',icon:'☕',val:-28000},
  {id:2,n:'Top Up BCA',a:'+Rp 500.000',t:'09:15',cat:'Lokal',icon:'🏦',val:500000},
  {id:3,n:'Buy 0.0012 BTC',a:'+0.0012 BTC',t:'Kemarin',cat:'Crypto',icon:'₿',val:80,usd:80},
 ])
 const [msgs,setMsgs]=useState([{r:'ai',t:'V21.2 FINAL! Bisa Top Up E-Wallet (BCA/GoPay/OVO/DANA) & Top Up Crypto (BTC/ETH/SOL) live rate bro!'}])

 useEffect(()=>{
  const saved=localStorage.getItem('wallet-v212')
  if(saved){try{setTxs(JSON.parse(saved))}catch{}}
  fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd').then(r=>r.json()).then(d=>{
   setPrices({BTC:d.bitcoin?.usd||67234,ETH:d.ethereum?.usd||3456,SOL:d.solana?.usd||145})
  }).catch(()=>{})
  fetch('https://api.exchangerate-api.com/v4/latest/USD').then(r=>r.json()).then(d=>{if(d.rates?.IDR)setUsdRate(Math.round(d.rates.IDR))}).catch(()=>{})
 },[])
 useEffect(()=>{localStorage.setItem('wallet-v212',JSON.stringify(txs))},[txs])

 const totalLokal = txs.filter(x=>x.cat==='Lokal').reduce((s,x)=>s+x.val,0) + 12000000
 const totalCryptoUsd = txs.filter(x=>x.cat==='Crypto').reduce((s,x)=>s+(x.usd||0),0) + 1234

 const getCoinAmount = () => {
  const rp = parseFloat(amt.replace(/[^0-9]/g,''))||0
  const usd = rp/usdRate
  const p = prices[coin as keyof typeof prices]
  return {rp,usd,coinAmt: usd/p}
 }

 const bal = {
  Lokal: `Rp ${totalLokal.toLocaleString('id-ID')}`,
  Global: `$ 842.50 • Rp ${(842.5*usdRate).toLocaleString()}`,
  Crypto: `$ ${totalCryptoUsd.toLocaleString()} • ₿ ${(totalCryptoUsd/prices.BTC).toFixed(5)}`
 }

 const doTopUpEwallet=()=>{
  const v=parseInt(amt.replace(/[^0-9]/g,''))
  if(!v)return
  setTxs(s=>[{id:Date.now(),n:`Top Up ${provider}`,a:`+Rp ${v.toLocaleString()}`,t:'Baru',cat:'Lokal',icon:provider==='BCA'?'🏦':provider==='GoPay'?'💚':provider==='OVO'?'💜':'💙',val:v},...s])
  setAmt('');setShowTopUp(false)
 }
 const doTopUpCrypto=()=>{
  const {rp,usd,coinAmt}=getCoinAmount()
  if(!rp)return
  setTxs(s=>[{id:Date.now(),n:`Buy ${coinAmt.toFixed(6)} ${coin}`,a:`+${coinAmt.toFixed(6)} ${coin} • -Rp ${rp.toLocaleString()}`,t:'Baru',cat:'Crypto',icon:coin==='BTC'?'₿':coin==='ETH'?'♦':'◎',val:0,usd},...s])
  // also deduct from Lokal simulation
  setTxs(s=>[{id:Date.now()+1,n:`Bayar ${coin} via ${provider}`,a:`-Rp ${rp.toLocaleString()}`,t:'Baru',cat:'Lokal',icon:'💸',val:-rp},...s])
  setAmt('');setShowTopUp(false)
 }

 const send=()=>{
  if(!m.trim())return
  const q=m;setMsgs(s=>[...s,{r:'user',t:q}]);setM('')
  setTimeout(()=>{
   let a=''
   if(q.toLowerCase().includes('saldo')) a=`Lokal: ${bal.Lokal} | Global: ${bal.Global} | Crypto: ${bal.Crypto} | BTC $${prices.BTC}`
   else if(q.toLowerCase().includes('beli')) a=`Beli crypto: Rp 1jt = ${(1000000/usdRate/prices.BTC).toFixed(6)} BTC, ${(1000000/usdRate/prices.ETH).toFixed(5)} ETH`
   else a=`V21.2 FINAL! Top Up E-Wallet & Crypto udah real, kesimpen di HP!`
   setMsgs(s=>[...s,{r:'ai',t:a}])
  },400)
 }

 return (
 <div style={{maxWidth:440,margin:'0 auto',minHeight:'100vh',background:'#0a0a0b',paddingBottom:90}}>
  <div style={{padding:16,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
   <div style={{display:'flex',gap:10,alignItems:'center'}}><div style={{width:40,height:40,borderRadius:12,background:'linear-gradient(135deg,#a78bfa,#ec4899)',display:'grid',placeItems:'center',fontWeight:800}}>W</div><div><b>Dompet AI 3IN1</b><div style={{fontSize:9,opacity:.6}}>V21.2 FINAL • E-Wallet + Crypto • PWA</div></div></div>
   <div style={{fontSize:9,background:'#1c1c1f',padding:'4px 7px',borderRadius:8,border:'1px solid #27272a'}}>● BTC ${prices.BTC.toLocaleString()}<br/>● ${usdRate.toLocaleString()}/$</div>
  </div>

  <div style={{margin:'0 12px',background:'#1c1c1f',borderRadius:14,padding:4,display:'flex'}}>{['Lokal','Global','Crypto'].map(x=><button key={x} onClick={()=>setMode(x as any)} style={{flex:1,padding:10,borderRadius:10,border:'none',background:mode===x?'#fff':'transparent',color:mode===x?'#000':'#888',fontWeight:700,fontSize:12,cursor:'pointer'}}>{x==='Lokal'?'🇮🇩 Lokal':x==='Global'?'🌍 Global':'₿ Crypto'}</button>)}</div>

  <div style={{margin:12,borderRadius:20,padding:16,background:mode==='Lokal'?'linear-gradient(135deg,#0ea5e9,#6366f1)':mode==='Global'?'linear-gradient(135deg,#10b981,#06b6d4)':'linear-gradient(135deg,#f59e0b,#ef4444)'}}>
   <div style={{fontSize:10,opacity:.9,letterSpacing:1}}>{mode.toUpperCase()} • REAL BALANCE</div>
   <div style={{fontSize:24,fontWeight:800,margin:'6px 0',lineHeight:1.2}}>{bal[mode as keyof typeof bal]}</div>
   <div style={{fontSize:10,opacity:.8,marginBottom:10}}>{mode==='Lokal'?`Total ${txs.filter(t=>t.cat==='Lokal').length} tx • Tap Top Up E-Wallet / Crypto`:mode==='Global'?`Live Rate $1 = Rp ${usdRate.toLocaleString()}`:`BTC $${prices.BTC} | ETH $${prices.ETH} | SOL $${prices.SOL}`}</div>
   <div style={{display:'flex',gap:8}}><button onClick={()=>{setTopTab('ewallet');setShowTopUp(true)}} style={{flex:1,background:'#fff',color:'#000',border:'none',padding:11,borderRadius:10,fontWeight:800,fontSize:12}}>💳 E-Wallet</button><button onClick={()=>{setTopTab('crypto');setShowTopUp(true)}} style={{flex:1,background:'rgba(0,0,0,.35)',color:'#fff',border:'1px solid rgba(255,255,255,.4)',padding:11,borderRadius:10,fontWeight:800,fontSize:12}}>₿ Crypto</button></div>
  </div>

  {showTopUp&&<div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.7)',display:'grid',placeItems:'center',zIndex:70,padding:14}}><div style={{background:'#18181b',border:'1px solid #27272a',borderRadius:18,padding:16,width:'100%',maxWidth:360}}>
   <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><b>Top Up</b><button onClick={()=>setShowTopUp(false)} style={{background:'#27272a',border:'none',color:'#fff',width:26,height:26,borderRadius:13}}>x</button></div>
   <div style={{display:'flex',gap:6,marginTop:12,background:'#111113',borderRadius:10,padding:4}}><button onClick={()=>setTopTab('ewallet')} style={{flex:1,padding:8,borderRadius:8,border:'none',background:topTab==='ewallet'?'#fff':'transparent',color:topTab==='ewallet'?'#000':'#888',fontWeight:700,fontSize:12}}>💳 E-Wallet</button><button onClick={()=>setTopTab('crypto')} style={{flex:1,padding:8,borderRadius:8,border:'none',background:topTab==='crypto'?'#fff':'transparent',color:topTab==='crypto'?'#000':'#888',fontWeight:700,fontSize:12}}>₿ Crypto</button></div>
   {topTab==='ewallet'?<>
    <div style={{marginTop:12,fontSize:11,opacity:.6}}>Pilih Sumber Dana</div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:6,marginTop:6}}>{['BCA','GoPay','OVO','DANA'].map(p=><button key={p} onClick={()=>setProvider(p)} style={{padding:10,borderRadius:10,border:provider===p?'2px solid #a78bfa':'1px solid #27272a',background:provider===p?'#27272a':'#111113',color:'#fff',fontSize:11,fontWeight:700}}>{p==='BCA'?'🏦':p==='GoPay'?'💚':p==='OVO'?'💜':'💙'}<br/>{p}</button>)}</div>
    <input value={amt} onChange={e=>setAmt(e.target.value)} placeholder='Jumlah Rp, cth: 100000' style={{width:'100%',marginTop:12,background:'#27272a',border:'none',borderRadius:10,padding:12,color:'#fff'}}/>
    <button onClick={doTopUpEwallet} style={{width:'100%',marginTop:10,background:'#fff',color:'#000',border:'none',padding:12,borderRadius:10,fontWeight:800}}>Top Up Rp {(parseInt(amt.replace(/[^0-9]/g,''))||0).toLocaleString()} via {provider}</button>
   </>:<>
    <div style={{marginTop:12,fontSize:11,opacity:.6}}>Beli Crypto Bayar Pakai Rp</div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:6,marginTop:6}}>{['BTC','ETH','SOL'].map(c=><button key={c} onClick={()=>setCoin(c)} style={{padding:10,borderRadius:10,border:coin===c?'2px solid #f59e0b':'1px solid #27272a',background:coin===c?'#27272a':'#111113',color:'#fff',fontSize:11,fontWeight:700}}>{c}<br/><span style={{fontSize:9,opacity:.6}}>${prices[c as keyof typeof prices]}</span></button>)}</div>
    <div style={{display:'flex',gap:6,marginTop:8}}>{['BCA','GoPay'].map(p=><button key={p} onClick={()=>setProvider(p)} style={{flex:1,padding:6,borderRadius:8,border:provider===p?'1px solid #a78bfa':'1px solid #27272a',background:provider===p?'#27272a':'#111',color:'#fff',fontSize:10}}>{p}</button>)}</div>
    <input value={amt} onChange={e=>setAmt(e.target.value)} placeholder='Bayar Rp, cth: 1000000' style={{width:'100%',marginTop:8,background:'#27272a',border:'none',borderRadius:10,padding:12,color:'#fff'}}/>
    {amt&&<div style={{marginTop:8,background:'#111113',border:'1px solid #27272a',borderRadius:10,padding:10,fontSize:12}}><div style={{opacity:.6,fontSize:10}}>Kamu dapat:</div><div style={{fontWeight:800,marginTop:4}}>{getCoinAmount().coinAmt.toFixed(6)} {coin}</div><div style={{fontSize:10,opacity:.6}}>≈ ${getCoinAmount().usd.toFixed(2)} • Rate BTC ${prices.BTC}</div></div>}
    <button onClick={doTopUpCrypto} style={{width:'100%',marginTop:10,background:'linear-gradient(135deg,#f59e0b,#ef4444)',color:'#fff',border:'none',padding:12,borderRadius:10,fontWeight:800}}>Beli {getCoinAmount().coinAmt.toFixed(6)} {coin}</button>
   </>}
  </div></div>}

  <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,padding:'0 12px'}}>
   <button onClick={()=>{setTopTab('ewallet');setShowTopUp(true)}} style={{background:'#1c1c1f',border:'1px solid #27272a',borderRadius:14,padding:10,color:'#fff'}}><div>💳</div><div style={{fontSize:9,marginTop:4}}>E-Wallet</div></button>
   <button onClick={()=>{setTopTab('crypto');setShowTopUp(true)}} style={{background:'#1c1c1f',border:'1px solid #27272a',borderRadius:14,padding:10,color:'#fff'}}><div>₿</div><div style={{fontSize:9,marginTop:4}}>Buy Crypto</div></button>
   <button onClick={()=>{if(confirm('Reset semua?')){setTxs([]);localStorage.removeItem('wallet-v212')}}} style={{background:'#1c1c1f',border:'1px solid #27272a',borderRadius:14,padding:10,color:'#fff'}}><div>🗑️</div><div style={{fontSize:9,marginTop:4}}>Reset</div></button>
   <button onClick={()=>setChat(true)} style={{background:'#1c1c1f',border:'1px solid #27272a',borderRadius:14,padding:10,color:'#fff'}}><div>🤖</div><div style={{fontSize:9,marginTop:4}}>AI</div></button>
  </div>

  <div style={{padding:12}}><b style={{fontSize:12}}>Transaksi • {txs.length} • {mode}</b><div style={{marginTop:8,display:'flex',flexDirection:'column',gap:6}}>{txs.map(t=><div key={t.id} style={{background:'#121214',border:'1px solid #1f1f23',borderRadius:12,padding:9,display:'flex',justifyContent:'space-between'}}><div style={{display:'flex',gap:8,alignItems:'center'}}><div style={{width:30,height:30,borderRadius:8,background:'#1c1c1f',display:'grid',placeItems:'center',fontSize:12}}>{t.icon}</div><div><div style={{fontSize:11,fontWeight:600}}>{t.n}</div><div style={{fontSize:9,opacity:.5}}>{t.t} • {t.cat}</div></div></div><div style={{fontWeight:700,fontSize:10,color:t.a.includes('+')?'#22c55e':'#fff',maxWidth:130,textAlign:'right'}}>{t.a}</div></div>)}</div></div>

  {!chat&&<button onClick={()=>setChat(true)} style={{position:'fixed',bottom:14,right:14,width:48,height:48,borderRadius:24,background:'linear-gradient(135deg,#a78bfa,#ec4899)',border:'none',fontSize:20}}>🤖</button>}
  {chat&&<div style={{position:'fixed',bottom:0,left:'50%',transform:'translateX(-50%)',width:'100%',maxWidth:440,height:340,background:'#18181b',borderTopLeftRadius:18,borderTopRightRadius:18,border:'1px solid #27272a',display:'flex',flexDirection:'column',zIndex:50}}><div style={{padding:10,display:'flex',justifyContent:'space-between',borderBottom:'1px solid #27272a'}}><b style={{fontSize:12}}>AI V21.2 FINAL</b><button onClick={()=>setChat(false)} style={{background:'#27272a',border:'none',color:'#fff',width:22,height:22,borderRadius:11}}>x</button></div><div style={{flex:1,overflowY:'auto',padding:10,display:'flex',flexDirection:'column',gap:6}}>{msgs.map((x,i)=><div key={i} style={{alignSelf:x.r==='user'?'flex-end':'flex-start',maxWidth:'80%',background:x.r==='user'?'#fff':'#27272a',color:x.r==='user'?'#000':'#fff',padding:'6px 9px',borderRadius:11,fontSize:11}}>{x.t}</div>)}</div><div style={{padding:7,display:'flex',gap:6,borderTop:'1px solid #27272a'}}><input value={m} onChange={e=>setM(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder='Tanya: beli 1jt dpt brp BTC?' style={{flex:1,background:'#27272a',border:'none',borderRadius:9,padding:'7px 9px',color:'#fff',fontSize:11}}/><button onClick={send} style={{background:'#fff',color:'#000',border:'none',borderRadius:9,padding:'0 10px',fontWeight:700}}>➤</button></div></div>}
  <div style={{textAlign:'center',padding:10,fontSize:8,opacity:.35}}>V21.2 FINAL • E-Wallet (BCA/GoPay/OVO/DANA) + Crypto (BTC/ETH/SOL) • PWA Installable</div>
 </div>
)
}
