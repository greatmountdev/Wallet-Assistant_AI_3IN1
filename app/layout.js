export const dynamic = "force-dynamic";
export const revalidate = 0;
export const metadata = { title: "Dompet AI V77 FINAL - FIX 404 - CRYPTO GESER - V39 ALMOST SEMPURNA", manifest: "/manifest.json", themeColor: "#0ea5e9" };
export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <script src="https://apis.google.com/js/api.js" async defer></script>
        <script src="https://accounts.google.com/gsi/client" async defer></script>
        <style>{\`body{margin:0;font-family:Inter,system-ui;background:#f8fafc} .no-scrollbar::-webkit-scrollbar{display:none} .no-scrollbar{scrollbar-width:none}\`}</style>
      </head>
      <body style={{margin:0}}>
        {children}
        <script dangerouslySetInnerHTML={{__html: `
          if('serviceWorker' in navigator){ window.addEventListener('load',()=>{navigator.serviceWorker.register('/sw.js').catch(()=>{});}); }
          window.loadGapi = function(){ return new Promise((res)=>{ let i=setInterval(()=>{ if(window.gapi && window.google){ clearInterval(i); window.gapi.load('client', async ()=>{ try{ await window.gapi.client.init({discoveryDocs:["https://sheets.googleapis.com/$discovery/rest?version=v4"]}); }catch(e){} res(); }); } },300); setTimeout(()=>{clearInterval(i); res();},8000); }); };
        `}} />
      </body>
    </html>
  );
}
