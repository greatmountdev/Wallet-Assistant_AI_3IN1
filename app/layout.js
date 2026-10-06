export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";
export const metadata={title:"Dompet AI V62 FIX BLANK - DYNAMIC DI LAYOUT SAJA", description:"V62 Fix blank - dynamic di layout server, page client tanpa export dynamic"};
export default function RootLayout({children}){
  return <html lang="id"><head><meta name="viewport" content="width=device-width, initial-scale=1"/></head><body style={{margin:0,fontFamily:"Inter, system-ui, sans-serif"}}>{children}</body></html>
}
