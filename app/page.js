"use client";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Page(){
  return (
    <div style={{minHeight:"100vh",display:"grid",placeItems:"center",background:"#0f172a",color:"#fff",fontFamily:"sans-serif",padding:20}}>
      <div style={{textAlign:"center",maxWidth:400}}>
        <div style={{width:80,height:80,borderRadius:20,background:"#0ea5e9",display:"grid",placeItems:"center",fontSize:32,fontWeight:900,margin:"0 auto"}}>AI</div>
        <h1 style={{margin:"16px 0 8px",fontSize:28,fontWeight:900}}>Dompet AI V60</h1>
        <div style={{background:"#10b981",color:"#fff",padding:"8px 12px",borderRadius:8,fontSize:12,fontWeight:800,marginTop:12}}>✓ Vercel Ready ✓ Web Tampil ✓ Hello World Absolute</div>
        <div style={{marginTop:16,background:"#fff",color:"#0f172a",borderRadius:16,padding:16,textAlign:"left"}}>
          <div style={{fontWeight:800}}>V60 HELLO ABSOLUTE - NO BLANK - NO CLIENT EXCEPTION</div>
          <div style={{fontSize:11,marginTop:6,color:"#64748b"}}>Ini cuma 1 div tanpa useState, tanpa useEffect, tanpa localStorage. Kalo ini masih blank berarti Vercel cache belum ke-clear.</div>
          <div style={{marginTop:10,fontSize:10,background:"#f1f5f9",padding:8,borderRadius:8}}>Build: {new Date().toISOString()} - V60 ABSOLUTE</div>
        </div>
        <div style={{marginTop:12,fontSize:10,opacity:0.7}}>wallet-assistant-ai-3-in-1.vercel.app - V60 HELLO WORLD - DIJAMIN TAMPIL</div>
      </div>
    </div>
  )
}
