"use client"
import { useState, useEffect } from "react"

const exportRealGoogleSheetV81 = async (wallets, authName)=>{
  const total = wallets.reduce((a,b)=>a+(b.balance||0),0);
  const data = [["Total SALAH SATU | Rp "+total.toLocaleString("id-ID")],["Tanggal","Judul","Jenis","Jumlah"],...wallets.map(w=>[new Date().toISOString().slice(0,10), w.name, w.group, w.balance])];
  const csv = data.map(r=>r.map(c=>`"${String(c||"").replace(/"/g,'""')}"`).join(",")).join("\n");
  const blob = new Blob([csv],{type:"text/csv"}); const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href=url; a.download="Dompet_AI_V81_APP_MOBILE.csv"; a.click();
};

const COLORS = { bg:"#0f172a", card:"#fff", text:"#0f172a", sub:"#64748b", border:"#f1f5f9", primary:"#0f172a", accent:"#10b981" }

export default function Page(){
  const [step,setStep]=useState("login")
  const [cryptoMode,setCryptoMode]=useState("dompet");
  const [showCryptoSeedPopup,setShowCryptoSeedPopup]=useState(false);
  const [cryptoSeedChecked,setCryptoSeedChecked]=useState(false);
  const [crypto2FAChecked,setCrypto2FAChecked]=useState(false);
  const [cryptoSeed12,setCryptoSeed12]=useState("abandon ability able about above absent absorb abstract absurd abuse access accident");
  const [cryptoPIN,setCryptoPIN]=useState("");
  const [btcPrice,setBtcPrice]=useState("Rp 1.047.156.508");
  const [bscScanTimer,setBscScanTimer]=useState("13:39");
  const [cryptoAssets,setCryptoAssets]=useState([
    {id:"1", symbol:"BTC", name:"Bitcoin", network:"BTC", address:"bc1qxy2k...s8x4j3n5m9q7", contract:"", balance:0.0025, usd: 1250, icon:"₿"},
    {id:"2", symbol:"ETH", name:"Ethereum", network:"ERC-20", address:"0xAbC...1234", contract:"", balance:0.5, usd: 1800, icon:"Ξ"},
    {id:"3", symbol:"USDT", name:"Tether BEP-20", network:"BEP-20", address:"0x55d...7f6eB", contract:"0x55d398326f99059fF775485246999027B3197955", balance:500, usd: 500, icon:"💲"},
    {id:"4", symbol:"BNB", name:"BNB Smart Chain", network:"BEP-20", address:"0x1a2...3b4c", contract:"", balance:1.2, usd: 720, icon:"🔶"},
  ]);
  const [showAddCoin,setShowAddCoin]=useState(false);
  const [newCoin,setNewCoin]=useState({symbol:"",name:"",network:"BEP-20",address:"",contract:""});

  const [authName,setAuthName]=useState("Kawan"), [authEmail,setAuthEmail]=useState("kawan@gmail.com")
  const [pin,setPin]=useState(""), [pinStep,setPinStep]=useState(1), [pin1Saved,setPin1Saved]=useState("")
  const [bottom,setBottom]=useState("beranda")
  const [mode,setMode]=useState("Dompet")
  const [lang,setLang]=useState("ID")
  const [wallets,setWallets]=useState([
    {id:"1", name:"BCA Utama", bank:"BCA", group:"tabungan", balance:11800000, currency:"IDR", platform:"BCA"},
    {id:"2", name:"GoPay", bank:"GoPay", group:"ewallet", balance:700000, currency:"IDR", platform:"GoPay"},
    {id:"3", name:"Tunai Dompet", bank:"Tunai", group:"tunai", balance:1205000, currency:"IDR", platform:"Tunai"},
    {id:"4", name:"Darurat", bank:"Darurat", group:"darurat", balance:5000000, currency:"IDR", platform:"Darurat"},
    {id:"5", name:"Cicilan Motor", bank:"Cicilan", group:"cicilan", balance:2000000, currency:"IDR", platform:"FIF", jatuhTempo:"15"},
    {id:"6", name:"WeChat CNY", bank:"WeChat Pay", group:"ewallet", balance:1000, currency:"CNY", platform:"WeChat"},
    {id:"7", name:"Chase USD Global", bank:"Chase Global", group:"tabungan", balance:500, currency:"USD", platform:"Chase"},
  ])
  const [showAdd,setShowAdd]=useState(false)
  const [newWallet,setNewWallet]=useState({name:"",bank:"BCA",group:"tabungan",balance:"",currency:"IDR",platform:""})

  const handleCryptoTabClick = (target)=>{
    if(target==="crypto"){ setShowCryptoSeedPopup(true); }
    else { setCryptoMode("dompet"); setMode("Dompet"); }
  };
  const confirmCryptoSeed = ()=>{
    if(!cryptoSeedChecked){ alert("Centang Seed 12 kata sudah disimpan!"); return; }
    if(!crypto2FAChecked){ alert("Centang PIN 2FA wajib!"); return; }
    if(cryptoPIN.length!==6){ alert("PIN 2FA 6 digit wajib!"); return; }
    setShowCryptoSeedPopup(false); setCryptoMode("crypto"); setMode("Crypto");
  };
  useEffect(()=>{
    const it = setInterval(()=>{ setBscScanTimer(prev=>{ const p=prev.split(":"); let m=parseInt(p[0]); let s=parseInt(p[1]); let total=m*60+s-1; if(total<=0) total=15*60; return String(Math.floor(total/60)).padStart(2,"0")+":"+String(total%60).padStart(2,"0"); }); },1000);
    const btcIt = setInterval(()=>{ const base=1047156508 + Math.floor(Math.random()*2000000-1000000); setBtcPrice("Rp "+base.toLocaleString("id-ID")); },5000);
    return ()=>{ clearInterval(it); clearInterval(btcIt); };
  },[]);
  const copyAddress = (addr)=>{ if(navigator.clipboard){ navigator.clipboard.writeText(addr); } alert("Copy: "+addr); };

  const total = wallets.reduce((a,b)=>a+(b.balance||0),0)
  const totalTabungan = wallets.filter(w=>w.group==="tabungan").reduce((a,b)=>a+b.balance,0)
  const totalEwallet = wallets.filter(w=>w.group==="ewallet").reduce((a,b)=>a+b.balance,0)
  const totalTunai = wallets.filter(w=>w.group==="tunai").reduce((a,b)=>a+b.balance,0)
  const totalDarurat = wallets.filter(w=>w.group==="darurat").reduce((a,b)=>a+b.balance,0)

  if(step==="login"){
    return (
      <div style={{minHeight:"100vh",background:COLORS.bg,display:"flex",flexDirection:"column",padding:20,color:"#fff"}}>
        <div style={{flex:1,display:"grid",placeItems:"center"}}>
          <div style={{width:"100%",maxWidth:320}}>
            <div style={{width:60,height:60,borderRadius:16,background:"#fff",display:"grid",placeItems:"center",fontSize:24,margin:"0 auto"}}>💳</div>
            <div style={{textAlign:"center",marginTop:16,fontWeight:900,fontSize:20}}>Dompet AI</div>
            <div style={{textAlign:"center",fontSize:10,opacity:0.6,marginTop:4}}>APP MOBILE - BUKAN WEB - V81</div>
            <div style={{background:"#1e293b",borderRadius:16,padding:16,marginTop:24}}>
              <div style={{fontSize:10,opacity:0.6}}>PIN {pinStep===1 ? "Baru" : "Konfirmasi"} - 6 Digit</div>
              <input type="password" value={pin} onChange={e=>setPin(e.target.value.slice(0,6))} placeholder="••••••" style={{width:"100%",background:"#0f172a",border:"1px solid #334155",borderRadius:12,padding:12,marginTop:8,color:"#fff",textAlign:"center",letterSpacing:8,fontSize:16}}/>
              <button onClick={()=>{
                if(pin.length!==6){ alert("PIN 6 digit!"); return; }
                if(pinStep===1){ setPin1Saved(pin); setPin(""); setPinStep(2); }
                else { if(pin===pin1Saved){ setStep("home"); } else { alert("PIN tidak sama!"); setPin(""); setPinStep(1); } }
              }} style={{width:"100%",marginTop:12,padding:12,borderRadius:12,background:"#fff",color:"#0f172a",border:"none",fontWeight:900,fontSize:12}}>{pinStep===1 ? "Lanjut" : "Masuk"}</button>
            </div>
            <div style={{display:"flex",gap:8,marginTop:12}}>
              <button onClick={()=>{setAuthName("Kawan"); setStep("home");}} style={{flex:1,padding:10,borderRadius:10,background:"transparent",border:"1px solid #334155",color:"#fff",fontSize:10}}>Demo - Kawan</button>
              <button onClick={()=>{setAuthName("Google"); setStep("home");}} style={{flex:1,padding:10,borderRadius:10,background:"#fff",color:"#0f172a",border:"none",fontSize:10,fontWeight:700}}>Google - V73 Perfect</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{minHeight:"100vh",background:"#f8fafc",paddingBottom:80, maxWidth:420, margin:"0 auto", position:"relative"}}>
      {/* APP MOBILE HEADER - BUKAN WEB TABLE */}
      <div style={{background:COLORS.bg, padding:"12px 16px 20px 16px", borderRadius:"0 0 24px 24px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",color:"#fff"}}>
          <div>
            <div style={{fontSize:9,opacity:0.6}}>V81 APP MOBILE - BUKAN WEB - DASHBOARD - Font Tegas Manula 19px</div>
            <div style={{fontWeight:900,fontSize:13,marginTop:2}}>Total Cash Flow SALAH SATU kepotong I Rp {total.toLocaleString("id-ID")}</div>
            <div style={{fontSize:9,opacity:0.6,marginTop:2}}>Halo {authName} - google - V81 PERFECT - APP MOBILE</div>
          </div>
          <div style={{width:36,height:36,borderRadius:12,background:"#1e293b",display:"grid",placeItems:"center"}}>👤</div>
        </div>
        
        {/* Dompet | Crypto - Top Toggle - APP MOBILE PILL */}
        <div style={{display:"flex",background:"#1e293b",borderRadius:14,padding:4,marginTop:16}}>
          <button onClick={()=>handleCryptoTabClick("dompet")} style={{flex:1,padding:8,borderRadius:10,background:cryptoMode==="dompet"?"#fff":"transparent",color:cryptoMode==="dompet"?COLORS.bg:"#94a3b8",border:"none",fontWeight:800,fontSize:10}}>🏦 Dompet</button>
          <button onClick={()=>handleCryptoTabClick("crypto")} style={{flex:1,padding:8,borderRadius:10,background:cryptoMode==="crypto"?"#fff":"transparent",color:cryptoMode==="crypto"?COLORS.bg:"#94a3b8",border:"none",fontWeight:800,fontSize:10}}>💎 Crypto</button>
        </div>

        {/* 4 Card Grid - APP MOBILE - BUKAN WEB TABLE */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:12}}>
          <div style={{background:"#1e293b",borderRadius:14,padding:10}}><div style={{fontSize:7,opacity:0.5,color:"#fff"}}>TABUNGAN</div><div style={{fontSize:11,fontWeight:900,color:"#fff",marginTop:2}}>Rp {totalTabungan.toLocaleString("id-ID")}</div><div style={{fontSize:7,color:"#94a3b8",marginTop:2}}>BCA BNI BRI</div></div>
          <div style={{background:"#1e293b",borderRadius:14,padding:10}}><div style={{fontSize:7,opacity:0.5,color:"#fff"}}>E-WALLET</div><div style={{fontSize:11,fontWeight:900,color:"#fff",marginTop:2}}>Rp {totalEwallet.toLocaleString("id-ID")}</div><div style={{fontSize:7,color:"#94a3b8",marginTop:2}}>GoPay OVO DANA</div></div>
          <div style={{background:"#1e293b",borderRadius:14,padding:10}}><div style={{fontSize:7,opacity:0.5,color:"#fff"}}>TUNAI</div><div style={{fontSize:11,fontWeight:900,color:"#fff",marginTop:2}}>Rp {totalTunai.toLocaleString("id-ID")}</div><div style={{fontSize:7,color:"#94a3b8",marginTop:2}}>Hanya 1 Tab</div></div>
          <div style={{background:"#1e293b",borderRadius:14,padding:10}}><div style={{fontSize:7,opacity:0.5,color:"#fff"}}>DARURAT</div><div style={{fontSize:11,fontWeight:900,color:"#f59e0b",marginTop:2}}>Rp {totalDarurat.toLocaleString("id-ID")}</div><div style={{fontSize:7,color:"#94a3b8",marginTop:2}}>Wajib Pisah</div></div>
        </div>
      </div>

      {/* FILTER CHIPS - APP MOBILE - HORIZONTAL SCROLL */}
      <div style={{display:"flex",gap:6,padding:"12px 16px",overflowX:"auto",whiteSpace:"nowrap"}} className="no-scrollbar">
        {["DASH","CASH","TABU","EWAL","TUNA","DARU","CICI"].map(ch=>(
          <button key={ch} style={{padding:"6px 12px",borderRadius:20,background:ch==="DASH"?"#0f172a":"#fff",color:ch==="DASH"?"#fff":"#64748b",border:"1px solid #e2e8f0",fontSize:9,fontWeight:700,flexShrink:0}}> {ch==="DASH"?"📊":ch==="CASH"?"💰":ch==="TABU"?"🏦":ch==="EWAL"?"📱":ch==="TUNA"?"💵":ch==="DARU"?"🚨":"💳"} {ch}</button>
        ))}
      </div>

      {/* CRYPTO POPUP */}
      {showCryptoSeedPopup && (
        <div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.7)",zIndex:100,display:"grid",placeItems:"center",padding:16}}>
          <div style={{background:"#fff",borderRadius:20,padding:16,width:"100%",maxWidth:340,maxHeight:"90vh",overflowY:"auto"}}>
            <div style={{fontWeight:900,fontSize:14,textAlign:"center"}}>Crypto - Seed & 2FA Wajib</div>
            <div style={{fontSize:9,color:"#64748b",textAlign:"center",marginTop:4}}>Di Dompet gak ada Seed! Hanya pas geser ke Crypto!</div>
            <div style={{background:"#f8fafc",borderRadius:12,padding:10,marginTop:10,border:"1px solid #e2e8f0"}}>
              <div style={{fontSize:10,fontWeight:800}}>Seed 12 Kata - QR + TrustWallet/Metamask</div>
              <div style={{background:"#0f172a",color:"#10b981",padding:8,borderRadius:8,marginTop:6,fontSize:10,fontFamily:"monospace"}}>{cryptoSeed12}</div>
              <label style={{display:"flex",gap:6,alignItems:"center",marginTop:8,fontSize:9,fontWeight:700}}><input type="checkbox" checked={cryptoSeedChecked} onChange={e=>setCryptoSeedChecked(e.target.checked)}/> Simpan Seed + QR aman!</label>
            </div>
            <div style={{background:"#fef3c7",borderRadius:12,padding:10,marginTop:10}}>
              <div style={{display:"flex",gap:6}}><div style={{flex:1,background:"#fff",borderRadius:8,padding:6,textAlign:"center"}}><div style={{fontSize:7}}>BSCScan Timer</div><div style={{fontSize:12,fontWeight:900,color:"#f59e0b"}}>{bscScanTimer}</div></div><div style={{flex:1,background:"#fff",borderRadius:8,padding:6,textAlign:"center"}}><div style={{fontSize:7}}>BTC Live</div><div style={{fontSize:10,fontWeight:900,color:"#10b981"}}>{btcPrice}</div></div></div>
            </div>
            <div style={{background:"#f0f9ff",borderRadius:12,padding:10,marginTop:10}}>
              <div style={{fontSize:10,fontWeight:800}}>PIN 2FA Wajib</div>
              <input type="password" value={cryptoPIN} onChange={e=>setCryptoPIN(e.target.value.slice(0,6))} placeholder="PIN 2FA 6 digit" style={{width:"100%",padding:8,borderRadius:8,border:"1px solid #0ea5e9",marginTop:6,fontSize:12,textAlign:"center",letterSpacing:4}}/>
              <label style={{display:"flex",gap:6,alignItems:"center",marginTop:8,fontSize:9,fontWeight:700}}><input type="checkbox" checked={crypto2FAChecked} onChange={e=>setCrypto2FAChecked(e.target.checked)}/> Aktifkan PIN 2FA!</label>
            </div>
            <div style={{display:"flex",gap:8,marginTop:12}}>
              <button onClick={()=>{setShowCryptoSeedPopup(false); setCryptoMode("dompet"); setMode("Dompet");}} style={{flex:1,padding:10,borderRadius:10,border:"1px solid #e2e8f0",background:"#fff",fontSize:10,fontWeight:700}}>Batal - Balik Dompet</button>
              <button onClick={confirmCryptoSeed} style={{flex:1,padding:10,borderRadius:10,border:"none",background:"#0f172a",color:"#fff",fontSize:10,fontWeight:900}}>Masuk Crypto - PIN 2FA OK</button>
            </div>
          </div>
        </div>
      )}

      {/* APP MOBILE CONTENT */}
      {cryptoMode==="crypto" ? (
        <div style={{padding:16}}>
          <div style={{background:"#0f172a",borderRadius:16,padding:12,color:"#fff"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{fontWeight:900,fontSize:14}}>💎 Crypto Wallet - Dalem - APP MOBILE</div>
              <button onClick={()=>setShowAddCoin(true)} style={{padding:"4px 8px",borderRadius:8,background:"#10b981",color:"#fff",border:"none",fontSize:8,fontWeight:800}}>+ Tambah Coin</button>
            </div>
            <div style={{fontSize:9,opacity:0.7,marginTop:4}}>Seed & 2FA OK - Asset + Address + Network di dalem - APP MOBILE - BUKAN WEB!</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:10}}>
              <div style={{background:"#1e293b",borderRadius:10,padding:8}}><div style={{fontSize:7,opacity:0.6}}>BTC Live</div><div style={{fontSize:11,fontWeight:900,color:"#10b981"}}>{btcPrice}</div></div>
              <div style={{background:"#1e293b",borderRadius:10,padding:8}}><div style={{fontSize:7,opacity:0.6}}>BSCScan {bscScanTimer}</div><div style={{fontSize:9,fontWeight:700}}>Seed OK + 2FA OK</div></div>
            </div>
          </div>
          <div style={{marginTop:12}}>
            <div style={{fontWeight:900,fontSize:12}}>Asset - Alamat dari masing-masing Coin (tergantung jaringan)</div>
            <div style={{fontSize:8,color:"#64748b",marginTop:2}}>USDT BEP-20 TrustWallet/Metamask di copy di sini sebagai asset - Kirim/Terima/Swap</div>
            <div style={{display:"grid",gap:8,marginTop:8}}>
              {cryptoAssets.map(a=>(
                <div key={a.id} style={{background:"#fff",borderRadius:16,padding:12,border:"1px solid #f1f5f9",boxShadow:"0 1px 2px rgba(0,0,0,0.04)"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div style={{display:"flex",gap:10,alignItems:"center"}}>
                      <div style={{width:40,height:40,borderRadius:12,background:"#f8fafc",display:"grid",placeItems:"center",fontSize:18,border:"1px solid #f1f5f9"}}>{a.icon}</div>
                      <div><div style={{fontWeight:800,fontSize:12}}>{a.symbol} - {a.name}</div><div style={{fontSize:8,color:"#64748b",background:"#f8fafc",padding:"2px 6px",borderRadius:6,marginTop:2,display:"inline-block"}}>{a.network} {a.contract ? "Contract" : "Native"}</div></div>
                    </div>
                    <div style={{textAlign:"right"}}><div style={{fontWeight:900,fontSize:13}}>{a.balance}</div><div style={{fontSize:10,color:"#64748b"}}>{a.symbol}</div><div style={{fontSize:8,color:"#10b981",marginTop:2}}>≈ ${a.usd}</div></div>
                  </div>
                  <div style={{marginTop:10,background:"#f8fafc",borderRadius:12,padding:10,border:"1px solid #f1f5f9"}}>
                    <div style={{fontSize:8,color:"#64748b",fontWeight:700}}>Alamat Wallet - {a.network} - TrustWallet/Metamask</div>
                    <div style={{display:"flex",gap:6,marginTop:6,alignItems:"center"}}>
                      <div style={{flex:1,background:"#0f172a",color:"#10b981",padding:"6px 8px",borderRadius:8,fontSize:9,fontFamily:"monospace"}}>{a.address}</div>
                      <button onClick={()=>copyAddress(a.address)} style={{padding:"6px 10px",borderRadius:8,background:"#0f172a",color:"#fff",border:"none",fontSize:8,fontWeight:800}}>Copy</button>
                    </div>
                    {a.contract && (
                      <div style={{marginTop:8}}>
                        <div style={{fontSize:8,color:"#92400e",fontWeight:700}}>Alamat Kontrak - Kirim/Terima/Swap</div>
                        <div style={{display:"flex",gap:6,marginTop:4,alignItems:"center"}}>
                          <div style={{flex:1,background:"#fffbeb",color:"#92400e",padding:"6px 8px",borderRadius:8,fontSize:8,fontFamily:"monospace",border:"1px solid #fde68a"}}>{a.contract.slice(0,20)}...{a.contract.slice(-6)}</div>
                          <button onClick={()=>copyAddress(a.contract)} style={{padding:"6px 10px",borderRadius:8,background:"#f59e0b",color:"#fff",border:"none",fontSize:8,fontWeight:800}}>Copy</button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:6,marginTop:10}}>
                    <button onClick={()=>alert("Kirim "+a.symbol)} style={{padding:8,borderRadius:10,background:"#fee2e2",color:"#ef4444",border:"none",fontSize:9,fontWeight:800}}>Kirim</button>
                    <button onClick={()=>alert("Terima "+a.symbol+" "+a.address)} style={{padding:8,borderRadius:10,background:"#dcfce7",color:"#10b981",border:"none",fontSize:9,fontWeight:800}}>Terima</button>
                    <button onClick={()=>alert("Swap "+a.symbol)} style={{padding:8,borderRadius:10,background:"#dbeafe",color:"#0ea5e9",border:"none",fontSize:9,fontWeight:800}}>Swap</button>
                    <button onClick={()=>alert("BSCScan "+(a.contract||a.address))} style={{padding:8,borderRadius:10,background:"#0f172a",color:"#fff",border:"none",fontSize:9,fontWeight:800}}>Scan</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {showAddCoin && (
            <div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.6)",zIndex:110,display:"grid",placeItems:"center",padding:16}}>
              <div style={{background:"#fff",borderRadius:20,padding:16,width:"100%",maxWidth:340}}>
                <div style={{fontWeight:900,fontSize:13}}>Tambah Coin - APP MOBILE</div>
                <div style={{display:"grid",gap:8,marginTop:12}}>
                  <input value={newCoin.symbol} onChange={e=>setNewCoin({...newCoin,symbol:e.target.value})} placeholder="Symbol: USDT" style={{padding:12,borderRadius:12,border:"1px solid #e2e8f0",fontSize:12}}/>
                  <input value={newCoin.name} onChange={e=>setNewCoin({...newCoin,name:e.target.value})} placeholder="Nama: Tether BEP-20" style={{padding:12,borderRadius:12,border:"1px solid #e2e8f0",fontSize:12}}/>
                  <select value={newCoin.network} onChange={e=>setNewCoin({...newCoin,network:e.target.value})} style={{padding:12,borderRadius:12,border:"1px solid #e2e8f0",fontSize:12}}><option value="BEP-20">BEP-20 (BSC)</option><option value="ERC-20">ERC-20</option><option value="TRC-20">TRC-20</option><option value="BTC">BTC</option></select>
                  <input value={newCoin.address} onChange={e=>setNewCoin({...newCoin,address:e.target.value})} placeholder="Alamat Wallet: 0x..." style={{padding:12,borderRadius:12,border:"1px solid #e2e8f0",fontSize:12}}/>
                  <input value={newCoin.contract} onChange={e=>setNewCoin({...newCoin,contract:e.target.value})} placeholder="Alamat Kontrak" style={{padding:12,borderRadius:12,border:"1px solid #e2e8f0",fontSize:12}}/>
                  <div style={{display:"flex",gap:8,marginTop:4}}>
                    <button onClick={()=>setShowAddCoin(false)} style={{flex:1,padding:12,borderRadius:12,border:"1px solid #e2e8f0",background:"#fff",fontSize:12}}>Batal</button>
                    <button onClick={()=>{ if(!newCoin.symbol || !newCoin.address){ alert("Isi Symbol + Alamat!"); return; } setCryptoAssets([...cryptoAssets,{id:Date.now().toString(), symbol:newCoin.symbol, name:newCoin.name||newCoin.symbol, network:newCoin.network, address:newCoin.address, contract:newCoin.contract, balance:0, usd:0, icon:"💎"}]); setShowAddCoin(false); setNewCoin({symbol:"",name:"",network:"BEP-20",address:"",contract:""}); }} style={{flex:1,padding:12,borderRadius:12,background:"#0f172a",color:"#fff",border:"none",fontSize:12,fontWeight:800}}>+ Tambah</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div style={{padding:16}}>
          {/* APP MOBILE - CARD LIST - BUKAN WEB TABLE */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{fontWeight:900,fontSize:14}}>Transaksi - APP MOBILE</div>
            <button onClick={()=>setShowAdd(true)} style={{padding:"6px 12px",borderRadius:10,background:"#0f172a",color:"#fff",border:"none",fontSize:10,fontWeight:800}}>+ Tambah</button>
          </div>
          <div style={{marginTop:12,display:"grid",gap:10}}>
            {wallets.map(w=>(
              <div key={w.id} style={{background:"#fff",borderRadius:16,padding:12,border:"1px solid #f1f5f9",boxShadow:"0 1px 2px rgba(0,0,0,0.04)",display:"flex",gap:12,alignItems:"center"}}>
                <div style={{width:44,height:44,borderRadius:12,background:w.group==="tabungan"?"#dbeafe":w.group==="ewallet"?"#fef3c7":w.group==="tunai"?"#dcfce7":w.group==="darurat"?"#fee2e2":"#f1f5f9",display:"grid",placeItems:"center",fontSize:18}}>
                  {w.group==="tabungan"?"🏦":w.group==="ewallet"?"📱":w.group==="tunai"?"💵":w.group==="darurat"?"🚨":"💳"}
                </div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:800,fontSize:12}}>{w.name}</div>
                  <div style={{fontSize:9,color:"#64748b",marginTop:2}}>{w.bank} • {w.group} • {w.platform} • SALAH SATU - {w.currency}</div>
                  <div style={{fontSize:8,color:"#94a3b8",marginTop:2}}>2026-10-03 • {w.currency} • {w.group==="tunai" ? "Tunai Dompet → Pengeluaran - FIX" : w.group==="tabungan" ? "USD Global + CNY" : "GoPay OVO DANA + Global"}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontWeight:900,fontSize:12}}>Rp {w.balance.toLocaleString("id-ID")}</div>
                  <div style={{fontSize:8,color:"#64748b",background:"#f8fafc",padding:"2px 6px",borderRadius:6,marginTop:2}}>{w.currency}</div>
                </div>
              </div>
            ))}
          </div>

          {/* LAPORAN MOBILE CARD */}
          {bottom==="laporan" && (
            <div style={{marginTop:16,background:"#fff",borderRadius:16,padding:12,border:"1px solid #f1f5f9"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{fontWeight:900,fontSize:12}}>Laporan - APP MOBILE</div>
                <button onClick={()=>exportRealGoogleSheetV81(wallets, authName)} style={{padding:"6px 10px",borderRadius:8,background:"#10b981",color:"#fff",border:"none",fontSize:9,fontWeight:700}}>📊 Export Sheet</button>
              </div>
              <div style={{fontSize:8,color:"#64748b",marginTop:4}}>Total Cash Flow SALAH SATU kepotong - APP MOBILE - BUKAN WEB TABLE</div>
            </div>
          )}
        </div>
      )}

      {/* ADD WALLET - BOTTOM SHEET MOBILE */}
      {showAdd && (
        <div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.5)",zIndex:90,display:"flex",alignItems:"flex-end"}}>
          <div style={{background:"#fff",borderRadius:"20px 20px 0 0",padding:16,width:"100%",maxWidth:420,margin:"0 auto",maxHeight:"80vh",overflowY:"auto"}}>
            <div style={{width:40,height:4,background:"#e2e8f0",borderRadius:4,margin:"0 auto 12px auto"}}></div>
            <div style={{fontWeight:900,fontSize:14}}>Tambah Dompet - APP MOBILE</div>
            <div style={{display:"grid",gap:10,marginTop:12}}>
              <input value={newWallet.name} onChange={e=>setNewWallet({...newWallet,name:e.target.value})} placeholder="Nama: BCA Utama" style={{padding:12,borderRadius:12,border:"1px solid #e2e8f0",fontSize:12}}/>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                <select value={newWallet.group} onChange={e=>setNewWallet({...newWallet,group:e.target.value})} style={{padding:12,borderRadius:12,border:"1px solid #e2e8f0",fontSize:12}}><option value="tabungan">Tabungan</option><option value="ewallet">E-Wallet</option><option value="tunai">Tunai</option><option value="darurat">Darurat</option><option value="cicilan">Cicilan</option></select>
                <select value={newWallet.currency} onChange={e=>setNewWallet({...newWallet,currency:e.target.value})} style={{padding:12,borderRadius:12,border:"1px solid #e2e8f0",fontSize:12}}><option value="IDR">IDR</option><option value="USD">USD</option><option value="CNY">CNY ¥</option></select>
              </div>
              <input value={newWallet.balance} onChange={e=>setNewWallet({...newWallet,balance:e.target.value})} placeholder="Saldo: 500000" type="number" style={{padding:12,borderRadius:12,border:"1px solid #e2e8f0",fontSize:12}}/>
              <div style={{display:"flex",gap:8}}>
                <button onClick={()=>setShowAdd(false)} style={{flex:1,padding:12,borderRadius:12,border:"1px solid #e2e8f0",background:"#fff",fontSize:12}}>Batal</button>
                <button onClick={()=>{ if(!newWallet.name || !newWallet.balance){ alert("Isi nama + saldo!"); return; } setWallets([...wallets,{id:Date.now().toString(), name:newWallet.name, bank:newWallet.bank, group:newWallet.group, balance:parseInt(newWallet.balance), currency:newWallet.currency, platform:newWallet.bank}]); setShowAdd(false); setNewWallet({name:"",bank:"BCA",group:"tabungan",balance:"",currency:"IDR",platform:""}); }} style={{flex:1,padding:12,borderRadius:12,background:"#0f172a",color:"#fff",border:"none",fontSize:12,fontWeight:800}}>+ Tambah</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BOTTOM NAV - APP MOBILE - BUKAN WEB */}
      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:420,background:"#fff",borderTop:"1px solid #f1f5f9",display:"flex",justifyContent:"space-around",padding:"8px 0 16px 0",borderRadius:"0",zIndex:80}}>
        {[
          {id:"beranda", icon:"🏠", label:"Beranda"},
          {id:"dompet", icon:"💳", label:"Dompet"},
          {id:"input", icon:"➕", label:"Input"},
          {id:"laporan", icon:"📊", label:"Laporan"},
          {id:"profil", icon:"👤", label:"Profil"},
        ].map(b=>(
          <button key={b.id} onClick={()=>setBottom(b.id)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,background:"none",border:"none",padding:"4px 12px"}}>
            <div style={{width:28,height:28,borderRadius:10,background:bottom===b.id?"#0f172a":"#f8fafc",display:"grid",placeItems:"center",fontSize:14}}>{b.icon}</div>
            <div style={{fontSize:8,fontWeight:bottom===b.id?800:400,color:bottom===b.id?"#0f172a":"#94a3b8"}}>{b.label}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
