const SUPABASE_URL="https://lztxpjsuzqvtgyasfnyj.supabase.co";
const SUPABASE_KEY="sb_publishable_7bv5GR0-ksXJn91sRHV0Mg_k4nblIGI";
const EVENT_CODE="HPE-2569";
const API_BASE=SUPABASE_URL+"/functions/v1";
const PUBLIC_EVENT_URL="https://kasemch.github.io/seminar-edtech-2569/";
const sb=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY);
const $=s=>document.querySelector(s);
let currentSession=null,currentReport=null,currentParticipants=[];

function showLogin(msg=""){ $("#loginPanel").classList.remove("hidden");$("#consolePanel").classList.add("hidden");$("#loginMsg").textContent=msg }
function showConsole(){ $("#loginPanel").classList.add("hidden");$("#consolePanel").classList.remove("hidden") }
async function authApi(name,payload={}){
  const {data:{session}}=await sb.auth.getSession();
  if(!session) throw new Error("session_required");
  const r=await fetch(API_BASE+"/"+name,{method:"POST",headers:{
    "Content-Type":"application/json","Authorization":"Bearer "+session.access_token,"apikey":SUPABASE_KEY
  },body:JSON.stringify(payload)});
  const j=await r.json().catch(()=>({error:"invalid_response"}));
  if(!r.ok) throw new Error(j.error||"request_failed");
  return j;
}
function metric(label,value){return '<div class="metric"><strong>'+String(value??"—")+'</strong><span>'+label+'</span></div>'}
function yes(v){return v?'<span class="ok">✓</span>':'<span class="no">—</span>'}
function esc(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[m]))}

$("#loginForm").onsubmit=async e=>{
 e.preventDefault();const fd=new FormData(e.target),email=String(fd.get("email")).trim();
 $("#loginMsg").textContent="กำลังส่ง Magic Link...";
 const {error}=await sb.auth.signInWithOtp({email,options:{emailRedirectTo:location.href.split("#")[0],shouldCreateUser:false}});
 $("#loginMsg").textContent=error?"ส่งไม่สำเร็จ: "+error.message:"ส่งแล้ว กรุณาเปิดลิงก์ในอีเมลจากอุปกรณ์นี้";
};
$("#signOut").onclick=async()=>{await sb.auth.signOut();showLogin("ออกจากระบบแล้ว")};
$("#refreshAll").onclick=()=>loadAll();
$("#reloadParticipants").onclick=()=>loadParticipants();
$("#participantSearch").oninput=e=>{const q=String(e.target.value||"").trim().toLowerCase();renderParticipants(!q?currentParticipants:currentParticipants.filter(p=>(p.name+" "+p.email).toLowerCase().includes(q)))};
$("#loadReport").onclick=()=>loadReport();
$("#downloadReport").onclick=()=>{
 if(!currentReport){alert("กรุณาสร้างรายงานก่อน");return}
 const blob=new Blob([JSON.stringify(currentReport,null,2)],{type:"application/json"});
 const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="HPE-2569-TEST-PILOT-report.json";a.click();URL.revokeObjectURL(a.href)
};

async function loadDashboard(){
 $("#dashboardMsg").textContent="กำลังโหลด...";
 try{
  const j=await authApi("seminar-admin-dashboard",{event_code:EVENT_CODE});
  $("#adminRole").textContent="สิทธิ์: "+j.role+" • Event: "+j.status;
  $("#dashboardCards").innerHTML=[
   metric("ลงทะเบียน",j.counts.registered),metric("เช็กอิน",j.counts.checked_in),
   metric("Pre-test",j.counts.pre),metric("Post-test",j.counts.post),
   metric("แบบประเมิน",j.counts.survey),metric("Workshop Evidence",j.counts.workshop_evidence),
   metric("Certificate อนุมัติ",j.counts.certificates_approved),
   metric("Pre mean",j.means.pre===null?"—":Number(j.means.pre).toFixed(2)),
   metric("Post mean",j.means.post===null?"—":Number(j.means.post).toFixed(2)),
   metric("Survey mean",j.means.survey===null?"—":Number(j.means.survey).toFixed(2))
  ].join("");
  $("#dashboardMsg").textContent="อัปเดตล่าสุด "+new Date().toLocaleTimeString("th-TH");
 }catch(e){$("#dashboardMsg").textContent="โหลด Dashboard ไม่สำเร็จ: "+e.message;if(e.message==="forbidden") showLogin("บัญชีนี้ไม่มีสิทธิ์ Admin")}
}

function renderParticipants(list){
  const tbody=$("#participantRows");tbody.innerHTML="";
  list.forEach(p=>{
    const cert=p.certificate;
    const approved=cert&&cert.status==="approved";
    const certText=approved?'<span class="ok">'+esc(cert.certificate_no)+'</span>':cert?esc(cert.status):"—";
    const tr=document.createElement("tr");
    tr.innerHTML='<td><strong>'+esc(p.name)+'</strong><br><small>'+esc(p.email)+'</small></td>'+
      '<td>'+esc(p.participant_role)+'</td><td>'+yes(p.steps.check_in)+'</td><td>'+yes(p.steps.pre)+'</td>'+
      '<td>'+yes(p.steps.post)+'</td><td>'+yes(p.steps.survey)+'</td>'+
      '<td>'+(p.eligible?'<span class="ok">พร้อม</span>':'<span class="no">ยังไม่ครบ</span>')+'</td>'+
      '<td>'+certText+'</td><td class="actions"></td>';
    const actions=tr.querySelector(".actions");
    if(approved){
      const a=document.createElement("a");a.className="action-btn";a.target="_blank";a.rel="noopener";a.textContent="เปิดใบประกาศ";
      a.href="./certificate.html?cert="+encodeURIComponent(cert.certificate_no)+"&token="+encodeURIComponent(cert.verification_token);actions.appendChild(a);
    }else{
      const b=document.createElement("button");b.className="action-btn";b.textContent="อนุมัติ";b.disabled=!p.eligible;
      b.onclick=()=>approveCertificate(p.participant_id,p.name,b);actions.appendChild(b);
    }
    tbody.appendChild(tr);
  });
}
async function loadParticipants(){
 $("#participantsMsg").textContent="กำลังโหลดรายชื่อ...";
 try{
  const j=await authApi("seminar-admin-participants",{event_code:EVENT_CODE});
  currentParticipants=j.participants||[];
  renderParticipants(currentParticipants);
  $("#participantsMsg").textContent=currentParticipants.length+" รายการ • "+(j.test_mode?"TEST-PILOT":"");
 }catch(e){$("#participantsMsg").textContent="โหลดรายชื่อไม่สำเร็จ: "+e.message}
}
async function approveCertificate(id,name,button){
 if(!confirm("อนุมัติ TEST E-Certificate ให้ "+name+" ?")) return;
 button.disabled=true;button.textContent="กำลังอนุมัติ...";
 try{
  const j=await authApi("seminar-admin-approve",{event_code:EVENT_CODE,participant_id:id});
  alert("อนุมัติแล้ว: "+j.certificate_no);await Promise.all([loadParticipants(),loadDashboard()]);
 }catch(e){alert("อนุมัติไม่สำเร็จ: "+e.message);button.disabled=false;button.textContent="อนุมัติ"}
}

$("#checkpointForm").onsubmit=async e=>{
 e.preventDefault();const fd=new FormData(e.target);
 const opens=new Date(String(fd.get("opensAt"))),closes=new Date(String(fd.get("closesAt")));
 $("#checkpointResult").textContent="กำลังสร้าง...";
 try{
  const j=await authApi("seminar-admin-checkpoint",{event_code:EVENT_CODE,checkpoint:fd.get("checkpoint"),opens_at:opens.toISOString(),closes_at:closes.toISOString()});
  const link=PUBLIC_EVENT_URL+"?checkpoint="+encodeURIComponent(j.token);
  $("#checkpointResult").innerHTML="<strong>สร้าง Checkpoint แล้ว</strong><br>เปิด "+new Date(j.opens_at).toLocaleString("th-TH")+" ถึง "+new Date(j.closes_at).toLocaleString("th-TH");
  $("#qrBox").classList.remove("hidden");$("#qrLink").href=link;$("#qrLink").textContent=link;
  QRCode.toCanvas($("#qrCanvas"),link,{width:220,margin:1},err=>{if(err)$("#checkpointResult").textContent+=" • QR render error"});
 }catch(e){$("#checkpointResult").textContent="สร้างไม่สำเร็จ: "+e.message}
};

async function loadReport(){
 $("#reportJson").textContent="กำลังสร้างรายงาน...";
 try{
  const j=await authApi("seminar-admin-report",{event_code:EVENT_CODE});currentReport=j;
  $("#reportCards").innerHTML=[
   metric("ลงทะเบียน",j.participation.registered),metric("เช็กอิน",j.participation.checked_in),
   metric("Pre completed",j.assessment.pre_completed),metric("Post completed",j.assessment.post_completed),
   metric("Survey completed",j.assessment.survey_completed),metric("Workshop",j.workshop.evidence_records),
   metric("Certificate approved",j.certificates.approved)
  ].join("");
  $("#reportJson").textContent=JSON.stringify(j,null,2);
 }catch(e){$("#reportJson").textContent="สร้างรายงานไม่สำเร็จ: "+e.message}
}
async function loadAll(){await Promise.all([loadDashboard(),loadParticipants()]);}

async function boot(){
 const {data:{session}}=await sb.auth.getSession();currentSession=session;
 if(!session){showLogin();return}
 $("#adminIdentity").textContent=session.user.email||"Admin";
 showConsole();await loadAll();
}
sb.auth.onAuthStateChange((event,session)=>{currentSession=session;if(session){$("#adminIdentity").textContent=session.user.email||"Admin";showConsole();setTimeout(()=>loadAll(),150)}else if(event==="SIGNED_OUT")showLogin()});
boot();