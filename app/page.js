const exportRealGoogleSheetV40 = async (wallets, authName, authEmail, clientId)=>{
  const total = wallets.reduce((a,b)=>a+(b.balance||0),0);
  const data = [
    ["Total Cash Flow (Tabungan+E-Wallet+Tunai+Darurat) - SALAH SATU kepotong | Rp "+total.toLocaleString("id-ID")],
    ["Total Tabungan (BCA BNI BRI + Global + CNY) | Rp "+wallets.filter(w=>w.group==="tabungan").reduce((a,b)=>a+b.balance,0).toLocaleString("id-ID")],
    ["Total E-Wallet (GoPay OVO DANA + Global + CNY ¥) | Rp "+wallets.filter(w=>w.group==="ewallet").reduce((a,b)=>a+b.balance,0).toLocaleString("id-ID")],
    [""],
    ["Tanggal","Judul - Sumber SALAH SATU","Jenis","Jumlah","Note FIX SALAH SATU","Foto","Currency","Mata Uang CNY","Account"],
   ...wallets.map(w=>[new Date().toISOString().slice(0,10), w.name+" - "+w.bank+" - SALAH SATU", w.group, w.balance, w.platform||""+" - SALAH SATU FIX", "", w.currency, w.currency==="CNY"?"¥ Yuan BARU":"", authEmail])
  ];
  try{
    if(clientId && window.google && window.gapi){
      const tc = window.google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: "https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/spreadsheets",
        callback: async (res)=>{
          window.gapi.client.setToken({access_token: res.access_token});
          const cr = await window.gapi.client.sheets.spreadsheets.create({properties:{title:"Dompet AI V40 ASLI - "+authName}});
          const sid = cr.result.spreadsheetId;
          const url = cr.result.spreadsheetUrl || "https://docs.google.com/spreadsheets/d/"+sid;
          await window.gapi.client.sheets.spreadsheets.values.update({spreadsheetId:sid, range:"Sheet1!A1", valueInputOption:"RAW", resource:{values:data}});
          alert("✅ REAL Sheet BENERAN Terbuat! - "+authEmail+" - "+url);
          window.open(url,"_blank");
        }
      });
      tc.requestAccessToken();
      return;
    }
  }catch(e){}
  const csv = data.map(r=>r.map(c=>`"${String(c||"").replace(/"/g,'""')}"`).join(",")).join("\n");
  const blob = new Blob([csv],{type:"text/csv"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href=url; a.download="Dompet_AI_V40_ASLI_SALAH_SATU_REAL.csv"; a.click();
  alert("📊 CSV REAL - Import ke sheets.google.com → jadi Sheet REAL");
};
