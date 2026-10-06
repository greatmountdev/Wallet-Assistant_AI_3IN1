export const dynamic="force-dynamic";
export const revalidate=0;
export const metadata={title:"Dompet AI V69 FINAL PWA - PIN 2X SAVE ONCE + LOGIN 1X - 6 Grup FULL", manifest:"/manifest.json", themeColor:"#0ea5e9"};
export default function RootLayout({children}){
  return (
    <html lang="id">
      <head>
        <link rel="manifest" href="/manifest.json"/>
        <meta name="theme-color" content="#0ea5e9"/>
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
        <meta name="apple-mobile-web-app-title" content="Dompet AI 6 Grup"/>
        <link rel="apple-touch-icon" href="/icon-192.png"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
      </head>
      <body style={{margin:0,fontFamily:"Inter,system-ui",background:"#f8fafc"}}>
        {children}
        <script dangerouslySetInnerHTML={{__html: `
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
              navigator.serviceWorker.register('/sw.js').then(reg=>console.log('SW V69 FINAL PWA registered',reg.scope)).catch(err=>console.log('SW fail',err));
            });
          }
          let deferredPrompt;
          window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            console.log('PWA installable - V69 FINAL');
          });
        `}} />
      </body>
    </html>
  )
}
