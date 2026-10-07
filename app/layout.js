export const dynamic="force-dynamic";
export const revalidate=0;
export const metadata={title:"Dompet AI V72 V40 SEMPURNA NO ANCUR - FINAL", manifest:"/manifest.json", themeColor:"#0ea5e9"};
export default function RootLayout({children}){
  return (
    <html lang="id">
      <head>
        <link rel="manifest" href="/manifest.json"/>
        <meta name="theme-color" content="#0ea5e9"/>
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <link rel="apple-touch-icon" href="/icon-192.png"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <script src="https://apis.google.com/js/api.js" async defer></script>
        <script src="https://accounts.google.com/gsi/client" async defer></script>
        <style>{`body{margin:0;font-family:Inter,system-ui;background:#f8fafc} .no-scrollbar::-webkit-scrollbar{display:none} .no-scrollbar{scrollbar-width:none}`}</style>
      </head>
      <body>
        {children}
        <script dangerouslySetInnerHTML={{__html: `
          if('serviceWorker' in navigator){ window.addEventListener('load',()=>{navigator.serviceWorker.register('/sw.js').catch(()=>{});}); }
          window.loadGapi = function(){
            return new Promise((res)=>{
              let i=setInterval(()=>{
                if(window.gapi && window.google){
                  clearInterval(i);
                  window.gapi.load('client', async ()=>{
                    try{ await window.gapi.client.init({apiKey: localStorage.getItem('dompetAI_apiKey')||'', discoveryDocs:["https://sheets.googleapis.com/$discovery/rest?version=v4","https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"]}); }catch(e){}
                    res();
                  });
                }
              },300);
              setTimeout(()=>{clearInterval(i); res();},8000);
            });
          };
        `}} />
      </body>
    </html>
  )
}
