
'use client'
import {useState,useEffect} from 'react'
type Bank={id:string,name:string,flag:string,curr:string,color:string}
type Tab={id:string,name:string,type:'tabungan'|'baru',color:string,balance:number}
export default function Page(){
 const [theme,setTheme]=useState<'dark'|'light'>('dark')
 const [region,setRegion]=useState<'ID'|'GLOBAL'|null>(null)
 const [auth,setAuth]=useState(false)
 const [pin,setPin]=useState('')
 const [pinSet,setPinSet]=useState('')
 const [showPin,setShowPin]=useState(false)
 const [twoFA,setTwoFA]=useState(true)
 const [mode,setMode]=useState<'Dompet'|'Crypto'>('Dompet')
 const [tabActive,setTabActive]=useState('all')
 const [bottom,setBottom]=useState('home')
 const [drivePerm,setDrivePerm]=useState(false)
 const [metaPerm,setMetaPerm]=useState(false)
 const [voice,setVoice]=useState(false)
 const [chat,setChat]=useState(false)
 const [msg,setMsg]=useState('')
 const [msgs,setMsgs]=useState([{r:'ai',t:'Halo! Saya Meta AI Wallet Assistant. Izin Drive & Meta AI aktifkan di Profile ya. Bisa voice juga!'}])
 const [btc,setBtc]=useState(85435)
 const [banks,setBanks]=useState<Bank[]>([
  {id:'bca',name:'BCA',flag:'🇮🇩',curr:'IDR',color:'#0ea5e9'},
  {id:'bni',name:'BNI',flag:'🇮🇩',curr:'IDR',color:'#f97316'},
  {id:'bri',name:'BRI',flag:'🇮🇩',curr:'IDR',color:'#2563eb'},
  {id:'gopay',name:'GoPay',flag:'🇮🇩',curr:'IDR',color:'#22c55e'},
  {id:'ovo',name:'OVO',flag:'🇮🇩',curr:'IDR',color:'#a855f7'},
  {id:'dana',name:'DANA',flag:'🇮🇩',curr:'IDR',color:'#3b82f6'},
 ])
 const [customBank,setCustomBank]=useState({name:'',curr:'USD',flag:'🇺🇸'})
 const [tabs,setTabs]=useState<Tab[]>([
  {id:'1',name:'Tabungan Utama',type:'tabungan',color:'#0ea5e9',balance:12472000},
  {id:'2',name:'Tab Baru Liburan',type:'baru',color:'#10b981',balance:2500000},
  {id:'3',name:'Tabungan Crypto',type:'tabungan',color:'#f59e0b',balance:8500000},
 ])

 useEffect(()=>{
  const r=localStorage.getItem('v23-region') as any
  const a=localStorage.getItem('v23-auth')
  const th=localStorage.getItem('v23-theme') as any
  if(r)setRegion(r); if(a)setAuth(true); if(th)setTheme(th)
  fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd').then(r=>r.json()).then(d=>{if(d.bitcoin?.usd)setBtc(d.bitcoin.usd)}).catch(()=>{})
 },[])

 const bg = theme==='dark'?'#0a0a0b':'#f8fafc'
 const card = theme==='dark'?'#18181b':'#ffffff'
 const border = theme==='dark'?'#27272a':'#e2e8f0'
 const text = theme==='dark'?'#fff':'#0f172a'
 const sub = theme==='dark'?'#71717a':'#64748b'

 if(!region){
  return <div style={{minHeight:'100vh',background:bg,color:text,display:'grid',placeItems:'center',padding:20}}>
   <div style={{maxWidth:380,width:'100%'}}><div style={{textAlign:'center',marginBottom:24}}><div style={{width:64,height:64,borderRadius:18,background:'linear-gradient(135deg,#a78bfa,#ec4899)',display:'grid',placeItems:'center',fontWeight:800,fontSize:28,margin:'0 auto'}}>W</div><h1 style={{fontWeight:800,fontSize:22,margin:'12px 0 6px'}}>Pilih Mode Dompet</h1><p style={{color:sub,fontSize:13}}>Pilih sesuai kebutuhan kamu</p></div>
   <button onClick={()=>{setRegion('ID');localStorage.setItem('v23-region','ID')}} style={{width:'100%',padding:18,borderRadius:16,border:`2px solid ${border}`,background:card,textAlign:'left',marginBottom:12,cursor:'pointer'}}><div style={{fontSize:24}}>🇮🇩</div><b style={{fontSize:16,color:text}}>Indonesia</b><div style={{fontSize:12,color:sub,marginTop:4}}>Bank: BCA, BNI, BRI, Mandiri, GoPay, OVO, DANA • QRIS • Mata uang IDR</div></button>
   <button onClick={()=>{setRegion('GLOBAL');localStorage.setItem('v23-region','GLOBAL')}} style={{width:'100%',padding:18,borderRadius:16,border:`2px solid ${border}`,background:card,textAlign:'left',cursor:'pointer'}}><div style={{fontSize:24}}>🌍</div><b style={{fontSize:16,color:text}}>Global</b><div style={{fontSize:12,color:sub,marginTop:4}}>Custom bank per negara + mata uang USD/EUR/SGD/JPY • List bank Indonesia + tambah akun</div></button></div></div>
 }

 if(!auth){
  return <div style={{minHeight:'100vh',background:bg,color:text,display:'grid',placeItems:'center',padding:20}}>
   <div style={{maxWidth:360,width:'100%',background:card,border:`1px solid ${border}`,borderRadius:20,padding:20}}><h2 style={{fontWeight:800}}>Masuk Dompet</h2><p style={{color:sub,fontSize:12}}>Sign up dengan Google/Facebook + PIN</p>
   <button onClick={()=>{setAuth(true);localStorage.setItem('v23-auth','1')}} style={{width:'100%',marginTop:16,padding:12,borderRadius:12,border:`1px solid ${border}`,background:'#fff',color:'#000',fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center',gap:8}}><span>🔵</span> Sign up with Google</button>
   <button onClick={()=>{setAuth(true);localStorage.setItem('v23-auth','1')}} style={{width:'100%',marginTop:8,padding:12,borderRadius:12,border:'1px solid ${border}',background:'#1877F2',color:'#fff',fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center',gap:8}}><span>📘</span> Sign up with Facebook</button>
   <div style={{marginTop:16}}><label style={{fontSize:11,color:sub}}>Buat PIN 6 digit (untuk 2FA Crypto)</label><input value={pinSet} onChange={e=>setPinSet(e.target.value)} type='password' maxLength={6} placeholder='••••••' style={{width:'100%',marginTop:6,padding:12,borderRadius:12,border:`1px solid ${border}`,background:theme==='dark'?'#27272a':'#f1f5f9',color:text,fontSize:18,letterSpacing:8,textAlign:'center'}}/></div>
   <button onClick={()=>{if(pinSet.length>=4){setAuth(true);localStorage.setItem('v23-auth','1');localStorage.setItem('v23-pin',pinSet)}}} style={{width:'100%',marginTop:12,padding:12,borderRadius:12,border:'none',background:'linear-gradient(135deg,#a78bfa,#ec4899)',color:'#fff',fontWeight:800}}>Lanjut + Simpan PIN</button></div></div>
 }

 return <div style={{maxWidth:440,margin:'0 auto',minHeight:'100vh',background:bg,color:text,paddingBottom:90,fontWeight:600}}>
  {/* TOP CENTER NAV Dompet/Crypto */}
  <div style={{position:'sticky',top:0,zIndex:20,background:bg,borderBottom:`1px solid ${border}`,padding:10}}>
   <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
    <div style={{display:'flex',alignItems:'center',gap:8}}><div style={{width:36,height:36,borderRadius:10,background:'linear-gradient(135deg,#a78bfa,#ec4899)',display:'grid',placeItems:'center',fontWeight:800}}>W</div><div><b style={{fontSize:13}}>Dompet AI 3IN1</b><div style={{fontSize:9,color:sub}}>V23 • {region} • BTC ${btc.toLocaleString()}</div></div></div>
    <div style={{display:'flex',gap:6}}><button onClick={()=>setTheme(theme==='dark'?'light':'dark')} style={{width:32,height:32,borderRadius:8,border:`1px solid ${border}`,background:card,color:text}}>{theme==='dark'?'☀️':'🌙'}</button><button onClick={()=>{localStorage.clear();location.reload()}} style={{width:32,height:32,borderRadius:8,border:`1px solid ${border}`,background:card,color:text}}>🚪</button></div>
   </div>
   {/* Tengah Dompet/Crypto */}
   <div style={{display:'flex',justifyContent:'center'}}><div style={{background:card,border:`1px solid ${border}`,borderRadius:12,padding:4,display:'flex',gap:4}}><button onClick={()=>setMode('Dompet')} style={{padding:'8px 24px',borderRadius:8,border:'none',background:mode==='Dompet'?text:card,color:mode==='Dompet'?bg:text,fontWeight:800,fontSize:13}}>💳 Dompet</button><button onClick={()=>setMode('Crypto')} style={{padding:'8px 24px',borderRadius:8,border:'none',background:mode==='Crypto'?text:card,color:mode==='Crypto'?bg:text,fontWeight:800,fontSize:13}}>₿ Crypto</button></div></div>
  </div>

  {bottom==='home'&&<>
   {/* GROUPING TABUNGAN + TAB BARU beda warna */}
   <div style={{padding:12}}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}><b style={{fontSize:13}}>Tabungan & Tab Baru</b><button style={{fontSize:10,background:card,border:`1px solid ${border}`,padding:'4px 8px',borderRadius:8,color:text}}>+ Tab Baru</button></div>
    <div style={{display:'flex',gap:8,overflowX:'auto',paddingBottom:4}}>
     {tabs.map(t=><div key={t.id} style={{minWidth:160,padding:14,borderRadius:16,background:`linear-gradient(135deg,${t.color},${t.color}bb)`,color:'#fff'}}><div style={{fontSize:9,opacity:.9,textTransform:'uppercase',letterSpacing:1}}>{t.type==='tabungan'?'TABUNGAN':'TAB BARU'}</div><div style={{fontWeight:800,fontSize:13,marginTop:4}}>{t.name}</div><div style={{fontWeight:800,fontSize:16,marginTop:6}}>Rp {t.balance.toLocaleString('id-ID')}</div></div>)}
    </div>
   </div>

   {/* BANK LIST */}
   <div style={{padding:'0 12px'}}>
    <b style={{fontSize:13}}>{region==='ID'?'🏦 Bank Indonesia':'🌍 Bank & Akun'} • {banks.length}</b>
    <div style={{marginTop:8,display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8}}>
     {banks.map(b=><div key={b.id} style={{background:card,border:`1px solid ${border}`,borderRadius:12,padding:10,textAlign:'center'}}><div style={{width:32,height:32,borderRadius:8,background:b.color,display:'grid',placeItems:'center',margin:'0 auto',color:'#fff',fontWeight:800}}>{b.name[0]}</div><div style={{fontSize:11,fontWeight:700,marginTop:6}}>{b.name}</div><div style={{fontSize:9,color:sub}}>{b.flag} {b.curr}</div></div>)}
    </div>
    {region==='GLOBAL'&&<div style={{marginTop:12,background:card,border:`1px solid ${border}`,borderRadius:12,padding:12}}><b style={{fontSize:11}}>➕ Tambah Akun Custom (Global)</b><div style={{display:'flex',gap:6,marginTop:8}}><input value={customBank.name} onChange={e=>setCustomBank({...customBank,name:e.target.value})} placeholder='Nama Bank (Chase, DBS)' style={{flex:1,padding:8,borderRadius:8,border:`1px solid ${border}`,background:bg,color:text,fontSize:11}}/><select value={customBank.curr} onChange={e=>setCustomBank({...customBank,curr:e.target.value})} style={{padding:8,borderRadius:8,border:`1px solid ${border}`,background:bg,color:text,fontSize:11}}><option>USD</option><option>EUR</option><option>SGD</option><option>JPY</option><option>IDR</option></select></div><button onClick={()=>{if(customBank.name){setBanks([...banks,{id:Date.now().toString(),name:customBank.name,flag:customBank.flag,curr:customBank.curr,color:'#8b5cf6'}]);setCustomBank({name:'',curr:'USD',flag:'🇺🇸'})}}} style={{width:'100%',marginTop:8,padding:8,borderRadius:8,border:'none',background:text,color:bg,fontWeight:700,fontSize:11}}>Tambah Bank {customBank.curr}</button></div>}
   </div>

   <div style={{padding:12}}><div style={{background:card,border:`1px solid ${border}`,borderRadius:14,padding:12}}><div style={{display:'flex',justifyContent:'space-between'}}><b style={{fontSize:12}}>Saldo {mode}</b><span style={{fontSize:10,color:sub}}>Real • {mode==='Dompet'?'IDR':'BTC $'+btc}</span></div><div style={{fontSize:22,fontWeight:800,marginTop:6}}>Rp 12.472.000</div><div style={{display:'flex',gap:6,marginTop:10}}><button onClick={()=>setShowPin(true)} style={{flex:1,padding:10,borderRadius:10,border:'none',background:text,color:bg,fontWeight:700,fontSize:11}}>💸 Transfer (PIN)</button><button onClick={()=>setChat(true)} style={{flex:1,padding:10,borderRadius:10,border:`1px solid ${border}`,background:card,color:text,fontWeight:700,fontSize:11}}>🤖 Meta AI</button></div></div></div>
  </>}

  {bottom==='profile'&&<div style={{padding:12}}>
   <b>Profile & Izin</b>
   <div style={{marginTop:10,background:card,border:`1px solid ${border}`,borderRadius:14,padding:12}}><div style={{fontSize:12,fontWeight:700}}>🔐 Keamanan</div><div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:10}}><span style={{fontSize:12}}>2FA Crypto (PIN)</span><button onClick={()=>setTwoFA(!twoFA)} style={{width:44,height:24,borderRadius:12,border:'none',background:twoFA?'#22c55e':'#27272a',position:'relative'}}><div style={{width:20,height:20,borderRadius:10,background:'#fff',position:'absolute',top:2,left:twoFA?22:2,transition:'all .2s'}}/></button></div><div style={{fontSize:10,color:sub,marginTop:6}}>{twoFA?'Aktif: Setiap transaksi crypto butuh PIN 6 digit':''}</div></div>
   <div style={{marginTop:10,background:card,border:`1px solid ${border}`,borderRadius:14,padding:12}}><div style={{fontSize:12,fontWeight:700}}>🔑 Izin</div>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:10}}><span style={{fontSize:12}}>📁 Google Drive (Backup)</span><button onClick={()=>setDrivePerm(!drivePerm)} style={{width:44,height:24,borderRadius:12,border:'none',background:drivePerm?'#22c55e':'#27272a',position:'relative'}}><div style={{width:20,height:20,borderRadius:10,background:'#fff',position:'absolute',top:2,left:drivePerm?22:2,transition:'all .2s'}}/></button></div>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:10}}><span style={{fontSize:12}}>💬 Meta AI Chat + Voice</span><button onClick={()=>setMetaPerm(!metaPerm)} style={{width:44,height:24,borderRadius:12,border:'none',background:metaPerm?'#22c55e':'#27272a',position:'relative'}}><div style={{width:20,height:20,borderRadius:10,background:'#fff',position:'absolute',top:2,left:metaPerm?22:2,transition:'all .2s'}}/></button></div>
   </div>
   <div style={{marginTop:10,background:card,border:`1px solid ${border}`,borderRadius:14,padding:12}}><div style={{fontSize:12,fontWeight:700}}>🎨 Tema</div><div style={{display:'flex',gap:8,marginTop:8}}><button onClick={()=>{setTheme('dark');localStorage.setItem('v23-theme','dark')}} style={{flex:1,padding:10,borderRadius:10,border:theme==='dark'?`2px solid ${text}`:`1px solid ${border}`,background:theme==='dark'?text:bg,color:theme==='dark'?bg:text,fontWeight:700}}>🌙 Dark</button><button onClick={()=>{setTheme('light');localStorage.setItem('v23-theme','light')}} style={{flex:1,padding:10,borderRadius:10,border:theme==='light'?`2px solid ${text}`:`1px solid ${border}`,background:theme==='light'?text:bg,color:theme==='light'?bg:text,fontWeight:700}}>☀️ White</button></div></div>
   <div style={{marginTop:10,fontSize:10,color:sub,textAlign:'center'}}>Font: Plus Jakarta Sans Bold • User Friendly • Elegant Simple</div>
  </div>}

  {/* PIN MODAL */}
  {showPin&&<div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.7)',display:'grid',placeItems:'center',zIndex:60,padding:16}}><div style={{background:card,border:`1px solid ${border}`,borderRadius:18,padding:16,width:'100%',maxWidth:320,textAlign:'center'}}><b>🔐 Masukkan PIN 2FA</b><p style={{fontSize:11,color:sub}}>Untuk transaksi Crypto</p><input value={pin} onChange={e=>setPin(e.target.value)} type='password' maxLength={6} placeholder='••••••' style={{width:'100%',marginTop:12,padding:12,borderRadius:12,border:`1px solid ${border}`,background:bg,color:text,fontSize:20,letterSpacing:10,textAlign:'center'}}/><div style={{display:'flex',gap:8,marginTop:12}}><button onClick={()=>setShowPin(false)} style={{flex:1,padding:10,borderRadius:10,border:`1px solid ${border}`,background:card,color:text}}>Batal</button><button onClick={()=>{if(pin===localStorage.getItem('v23-pin')||pin.length>=4){alert('✅ PIN Benar! Transaksi Crypto diizinkan');setShowPin(false);setPin('')}else{alert('❌ PIN Salah!')}}} style={{flex:1,padding:10,borderRadius:10,border:'none',background:text,color:bg,fontWeight:800}}>Verifikasi</button></div></div></div>}

  {/* META AI CHAT VOICE/TYPE */}
  {chat&&<div style={{position:'fixed',bottom:0,left:'50%',transform:'translateX(-50%)',width:'100%',maxWidth:440,height:380,background:card,border:`1px solid ${border}`,borderTopLeftRadius:18,borderTopRightRadius:18,display:'flex',flexDirection:'column',zIndex:50}}><div style={{padding:10,display:'flex',justifyContent:'space-between',borderBottom:`1px solid ${border}`}}><b style={{fontSize:12}}>🤖 Meta AI Wallet • Voice/Type</b><div style={{display:'flex',gap:6}}><button onClick={()=>setVoice(!voice)} style={{background:voice?'#22c55e':'#27272a',border:'none',color:'#fff',padding:'4px 8px',borderRadius:8,fontSize:10}}>{voice?'🎤 Listening':'🎤 Voice'}</button><button onClick={()=>setChat(false)} style={{background:bg,border:`1px solid ${border}`,color:text,width:22,height:22,borderRadius:11}}>x</button></div></div><div style={{flex:1,overflowY:'auto',padding:10,display:'flex',flexDirection:'column',gap:6}}>{msgs.map((x,i)=><div key={i} style={{alignSelf:x.r==='user'?'flex-end':'flex-start',maxWidth:'80%',background:x.r==='user'?text:theme==='dark'?'#27272a':'#f1f5f9',color:x.r==='user'?bg:text,padding:'6px 9px',borderRadius:11,fontSize:11}}>{x.t}</div>)}</div><div style={{padding:7,display:'flex',gap:6,borderTop:`1px solid ${border}`}}><input value={msg} onChange={e=>setMsg(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'){setMsgs([...msgs,{r:'user',t:msg},{r:'ai',t:`Meta AI: ${region} mode ${mode}, saldo Rp 12.472jt, BTC $${btc}. Izin Drive:${drivePerm?'✅':'❌'} Meta:${metaPerm?'✅':'❌'}`} ]);setMsg('')}}} placeholder='Ketik atau pake suara...' style={{flex:1,background:bg,border:`1px solid ${border}`,borderRadius:9,padding:'7px 9px',color:text,fontSize:11}}/><button onClick={()=>{setMsgs([...msgs,{r:'user',t:msg},{r:'ai',t:`Meta AI: Paham!`} ]);setMsg('')}} style={{background:text,color:bg,border:'none',borderRadius:9,padding:'0 10px',fontWeight:700}}>➤</button></div></div>}

  {/* BOTTOM NAV - FIX AMBURADUL */}
  <div style={{position:'fixed',bottom:0,left:'50%',transform:'translateX(-50%)',width:'100%',maxWidth:440,background:card,borderTop:`1px solid ${border}`,display:'flex',justifyContent:'space-around',padding:'8px 0',zIndex:30}}>
   {[{k:'home',i:'🏠',l:'Home'},{k:'wallet',i:'💳',l:'Wallet'},{k:'crypto',i:'₿',l:'Crypto'},{k:'history',i:'📜',l:'History'},{k:'profile',i:'👤',l:'Profile'}].map(b=><button key={b.k} onClick={()=>setBottom(b.k)} style={{background:'transparent',border:'none',color:bottom===b.k?text:sub,display:'flex',flexDirection:'column',alignItems:'center',gap:2}}><span style={{fontSize:18}}>{b.i}</span><span style={{fontSize:9,fontWeight:bottom===b.k?800:400}}>{b.l}</span>{bottom===b.k&&<div style={{width:4,height:4,borderRadius:2,background:text}}/>}</button>)}
  </div>
 </div>
)
}
