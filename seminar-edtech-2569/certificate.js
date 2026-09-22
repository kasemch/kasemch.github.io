const API="https://lztxpjsuzqvtgyasfnyj.supabase.co/functions/v1/seminar-certificate-data";
const VERIFY_PAGE="https://kasemch.github.io/seminar-edtech-2569/verify-certificate.html";
const $=s=>document.querySelector(s);
const params=new URLSearchParams(location.search),cert=params.get("cert"),token=params.get("token");
let certificateData=null;
function fitText(el,base,min,limit){const n=[...(el.textContent||"")].length;el.style.fontSize=(n<=limit?base:Math.max(min,Math.floor(base*limit/n)))+"px"}
async function load(){
 if(!cert||!token){return fail("ลิงก์ใบประกาศไม่สมบูรณ์")}
 try{
  const r=await fetch(API+"?cert="+encodeURIComponent(cert)+"&token="+encodeURIComponent(token),{cache:"no-store"});
  const j=await r.json();
  if(!r.ok||!j.ok) throw new Error(j.error||"certificate_not_found");
  certificateData=j;
  $("#recipientName").textContent=j.recipient_name;
  $("#projectTitle").textContent=j.event.title;
  $("#certificateNo").textContent=j.certificate_no;
  $("#signerName").textContent=j.signer.name;
  $("#signerTitle").textContent=j.signer.title;
  const d=new Date(j.event.date+"T00:00:00+07:00");
  $("#eventDate").textContent="วันที่ "+new Intl.DateTimeFormat("th-TH",{day:"numeric",month:"long",year:"numeric",timeZone:"Asia/Bangkok"}).format(d);
  $("#testBadge").textContent=j.watermark||"";
  $("#watermarkGhost").textContent=j.watermark||"";
  if(!j.watermark){$("#testBadge").classList.add("hidden")}
  fitText($("#recipientName"),54,36,25);fitText($("#projectTitle"),30,21,58);
  $("#verifyQr").src=j.qr_data_url;
  $("#loadingBox").classList.add("hidden");$("#certificate").classList.remove("hidden");$("#viewerStatus").textContent="ตรวจสอบแล้ว • "+j.certificate_no;
 }catch(e){fail("ไม่สามารถเปิดใบประกาศได้: "+e.message)}
}
function fail(msg){$("#loadingBox").classList.add("hidden");$("#errorBox").classList.remove("hidden");$("#errorBox").textContent=msg;$("#viewerStatus").textContent="เปิดไม่ได้"}
$("#printBtn").onclick=()=>window.print();
$("#pdfBtn").onclick=async()=>{
 if(!certificateData)return;
 const popup=window.open("","_blank");
 $("#pdfBtn").disabled=true;$("#pdfBtn").textContent="กำลังสร้าง PDF...";
 try{
  const node=$("#certificate");
  const canvas=await html2canvas(node,{scale:2,useCORS:true,backgroundColor:"#fffdfa",logging:false});
  const img=canvas.toDataURL("image/jpeg",0.96);
  const {jsPDF}=window.jspdf;
  const pdf=new jsPDF({orientation:"landscape",unit:"mm",format:"a4",compress:true});
  pdf.addImage(img,"JPEG",0,0,297,210,undefined,"FAST");
  pdf.setProperties({title:certificateData.certificate_no+" E-Certificate",subject:certificateData.event.title,creator:"HPE EdTech 2569 TEST-PILOT"});
  const blob=pdf.output("blob"),url=URL.createObjectURL(blob);
  if(popup){popup.location.href=url}else{const a=document.createElement("a");a.href=url;a.target="_blank";a.rel="noopener";a.click()}
  setTimeout(()=>URL.revokeObjectURL(url),120000);
 }catch(e){if(popup)popup.close();alert("สร้าง PDF ไม่สำเร็จ: "+e.message)}
 finally{$("#pdfBtn").disabled=false;$("#pdfBtn").textContent="เปิด / บันทึก PDF"}
};
load();