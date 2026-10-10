
"use client";
import { useState } from "react";
export default function CryptoWallet({ btcPrice, bscScanTimer, cryptoSeed12, cryptoPIN, onBack }) {
  const [cryptoBottom,setCryptoBottom]=useState("beranda");
  const [selectedCoin,setSelectedCoin]=useState(null);
  const coins = [
    {symbol:"BTC", name:"Bitcoin", network:"BTC", bal:"0.0025 BTC", usd:"$125", icon:"BTC", color:"#f7931a", addr:"bc1qxy2k...s8x4j3n5m9q7", contract:""},
    {symbol:"USDT", name:"Tether BEP-20", network:"BEP-20", bal:"500 USDT", usd:"$500", icon:"USDT", color:"#26a17b", addr:"0x55d...7f6eB", contract:"0x55d398326f99059fF775485246999027B3197955"},
    {symbol:"BNB", name:"BNB", network:"BEP-20", bal:"1.2 BNB", usd:"$720", icon:"BNB", color:"#f3ba2f", addr:"0x1a2...3b4c", contract:""},
  ];
  return (
    <div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"#fff",zIndex:50,overflowY:"auto",paddingBottom:80}}>
      {cryptoBottom==="beranda" && !selectedCoin && (
        <div>
          <div style={{background:"#0f172a",padding:"12px 16px 20px 16px",color:"#fff"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{fontWeight:900,fontSize:14}}>Crypto Wallet - TrustWallet - Satu List Coin - $4,270.00</div>
              <button onClick={onBack} style={{padding:"4px 8px",borderRadius:8,background:"#1e293b",color:"#fff",border:"none",fontSize:8}}>Dompet</button>
            </div>
            <div style={{textAlign:"center",marginTop:12}}><div style={{fontSize:10,opacity:0.6}}>Total Balance</div><div style={{fontWeight:900,fontSize:22}}>$4,270.00</div><div style={{fontSize:9,opacity:0.6,marginTop:4}}>{btcPrice} • BSCScan {bscScanTimer}</div></div>
          </div>
          <div style={{padding:12}}>
            <div style={{fontWeight:800,fontSize:11}}>Beranda Daftar Coin - Satu aja list coin - Klik coin tampil sub menu terima kirim swap di bawahnya</div>
            <div style={{marginTop:8}}>
              {coins.map(a=>(
                <div key={a.symbol+a.network} onClick={()=>setSelectedCoin(a)} style={{display:"flex",gap:12,alignItems:"center",padding:"12px 0",borderBottom:"1px solid #f8fafc",cursor:"pointer"}}>
                  <div style={{width:40,height:40,borderRadius:20,background:a.color+"20",display:"grid",placeItems:"center",fontSize:10}}>{a.symbol[0]}</div>
                  <div style={{flex:1}}><div style={{fontWeight:800,fontSize:12}}>{a.symbol} - {a.name}</div><div style={{fontSize:8,color:"#64748b"}}>{a.network} • {a.addr}</div></div>
                  <div style={{textAlign:"right"}}><div style={{fontWeight:800,fontSize:12}}>{a.bal}</div><div style={{fontSize:8,color:"#64748b"}}>{a.usd}</div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {selectedCoin && (
        <div style={{padding:12}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}><button onClick={()=>setSelectedCoin(null)} style={{width:32,height:32,borderRadius:8,background:"#f1f5f9",border:"none"}}>←</button><div style={{fontWeight:900,fontSize:14}}>{selectedCoin.symbol} - {selectedCoin.name}</div></div>
          <div style={{background:"#0f172a",borderRadius:16,padding:16,color:"#fff",textAlign:"center",marginTop:12}}>
            <div style={{fontWeight:900,fontSize:18}}>{selectedCoin.bal}</div>
            <div style={{fontSize:8,opacity:0.6,marginTop:6,wordBreak:"break-all"}}>Wallet: {selectedCoin.addr}</div>
            {selectedCoin.contract && <div style={{fontSize:7,opacity:0.8,marginTop:6,background:"#fffbeb",color:"#92400e",padding:"6px 10px",borderRadius:8,wordBreak:"break-all"}}>Kontrak: {selectedCoin.contract} - Kirim Terima Swap - USDT BEP-20 TrustWallet Metamask di copy di sini sebagai asset</div>}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginTop:12}}>
            <button style={{padding:14,borderRadius:12,background:"#dcfce7",border:"none",fontWeight:800,fontSize:11}}>↓ Terima</button>
            <button style={{padding:14,borderRadius:12,background:"#fee2e2",border:"none",fontWeight:800,fontSize:11}}>↑ Kirim</button>
            <button style={{padding:14,borderRadius:12,background:"#dbeafe",border:"none",fontWeight:800,fontSize:11}}>⇄ Swap</button>
          </div>
        </div>
      )}
      {cryptoBottom==="dapp" && !selectedCoin && (
        <div style={{padding:12}}>
          <div style={{fontWeight:900,fontSize:14}}>🌐 dApp Browser - PancakeSwap dlsbg</div>
          <div style={{fontSize:9,color:"#64748b",marginTop:4}}>Menu lainnya biasanya dApp masukan situs seperti pancakeswap dlsbg</div>
          <div style={{marginTop:12,display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            <div style={{background:"#fff",borderRadius:12,padding:10,border:"1px solid #f1f5f9"}}><div style={{fontWeight:800,fontSize:10}}>🥞 PancakeSwap</div><div style={{fontSize:7,color:"#64748b"}}>pancakeswap.finance - BSC DEX - Swap BEP-20 - USDT BEP-20 Contract: 0x55d...7f6eB</div></div>
            <div style={{background:"#fff",borderRadius:12,padding:10,border:"1px solid #f1f5f9"}}><div style={{fontWeight:800,fontSize:10}}>🦄 Uniswap</div><div style={{fontSize:7,color:"#64748b"}}>uniswap.org - ETH DEX</div></div>
            <div style={{background:"#fff",borderRadius:12,padding:10,border:"1px solid #f1f5f9"}}><div style={{fontWeight:800,fontSize:10}}>1inch</div><div style={{fontSize:7,color:"#64748b"}}>app.1inch.io - Aggregator</div></div>
            <div style={{background:"#fff",borderRadius:12,padding:10,border:"1px solid #f1f5f9"}}><div style={{fontWeight:800,fontSize:10}}>🌊 OpenSea</div><div style={{fontSize:7,color:"#64748b"}}>opensea.io - NFT Marketplace</div></div>
          </div>
        </div>
      )}
      {!selectedCoin && (
        <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:420,background:"#fff",borderTop:"1px solid #f1f5f9",display:"flex",justifyContent:"space-around",padding:"8px 0 16px 0",zIndex:80}}>
          <button onClick={()=>setCryptoBottom("beranda")} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,background:"none",border:"none",padding:"4px 20px"}}>
            <div style={{width:28,height:28,borderRadius:10,background:cryptoBottom==="beranda"?"#0f172a":"#f8fafc",display:"grid",placeItems:"center",fontSize:14}}>💎</div>
            <div style={{fontSize:8,fontWeight:cryptoBottom==="beranda"?800:400,color:cryptoBottom==="beranda"?"#0f172a":"#94a3b8"}}>Beranda - Daftar Coin</div>
          </button>
          <button onClick={()=>setCryptoBottom("dapp")} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,background:"none",border:"none",padding:"4px 20px"}}>
            <div style={{width:28,height:28,borderRadius:10,background:cryptoBottom==="dapp"?"#0f172a":"#f8fafc",display:"grid",placeItems:"center",fontSize:14}}>🌐</div>
            <div style={{fontSize:8,fontWeight:cryptoBottom==="dapp"?800:400,color:cryptoBottom==="dapp"?"#0f172a":"#94a3b8"}}>dApp - PancakeSwap dlsbg</div>
          </button>
        </div>
      )}
      {selectedCoin && (
        <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:420,background:"#fff",borderTop:"1px solid #f1f5f9",display:"flex",justifyContent:"space-around",padding:"8px 0 16px 0",zIndex:80}}>
          <button style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,background:"none",border:"none",padding:"4px 12px"}}><div style={{width:28,height:28,borderRadius:10,background:"#dcfce7",display:"grid",placeItems:"center",fontSize:14}}>↓</div><div style={{fontSize:8,fontWeight:700}}>Terima</div></button>
          <button style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,background:"none",border:"none",padding:"4px 12px"}}><div style={{width:28,height:28,borderRadius:10,background:"#fee2e2",display:"grid",placeItems:"center",fontSize:14}}>↑</div><div style={{fontSize:8,fontWeight:700}}>Kirim</div></button>
          <button style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,background:"none",border:"none",padding:"4px 12px"}}><div style={{width:28,height:28,borderRadius:10,background:"#dbeafe",display:"grid",placeItems:"center",fontSize:14}}>⇄</div><div style={{fontSize:8,fontWeight:700}}>Swap</div></button>
          <button onClick={()=>setSelectedCoin(null)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,background:"none",border:"none",padding:"4px 12px"}}><div style={{width:28,height:28,borderRadius:10,background:"#f1f5f9",display:"grid",placeItems:"center",fontSize:14}}>←</div><div style={{fontSize:8,fontWeight:700}}>Kembali - Daftar Coin</div></button>
        </div>
      )}
    </div>
  )
}
