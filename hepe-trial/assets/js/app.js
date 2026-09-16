import {supabase} from "./supabase.js";
const $=s=>document.querySelector(s);
let cfg=null;
const say=(t,k="info")=>{const el=$("#status"); if(!el) return; el.textContent=t; el.dataset.kind=k;};

async function resolveAuthCallback(){
  const url=new URL(window.location.href);
  const code=url.searchParams.get("code");
  if(code){
    say("กำลังยืนยัน Magic Link…");
    const {error}=await supabase.auth.exchangeCodeForSession(code);
    if(error) throw error;
    url.searchParams.delete("code");
    history.replaceState({},document.title,url.pathname+url.search+url.hash);
  }
}

async function boot(){
  cfg=await fetch("./config/state.json",{cache:"no-store"}).then(r=>r.json());
  $("#course").textContent=`${cfg.course_code} · ${cfg.programme_code} · AY ${cfg.academic_year}/${cfg.term_code}`;
  await resolveAuthCallback();
  const {data:{session},error:sessionError}=await supabase.auth.getSession();
  if(sessionError) throw sessionError;
  $("#login").hidden=!!session;
  $("#workspace").hidden=!session;
  if(!session){say("ยังไม่พบ session ในเบราว์เซอร์นี้ กรุณาใช้ Magic Link จากหน้านี้","warn");return;}
  const {data:ctx,error}=await supabase.rpc("hepe_my_context");
  if(error) throw error;
  $("#identity").textContent=`${ctx?.display_label??""} · ${(ctx?.roles??[]).map(r=>r.role_code).join(", ")}`;
  await refreshReadiness();
  await autoRun();
}

async function signIn(e){
  e.preventDefault();
  const email=$("#email").value.trim();
  const {error}=await supabase.auth.signInWithOtp({
    email,
    options:{shouldCreateUser:false,emailRedirectTo:new URL("./",location.href).href}
  });
  say(error?error.message:"ส่ง Magic Link แล้ว กรุณาเปิดลิงก์จากอีเมลในเบราว์เซอร์นี้",error?"warn":"ok");
}
function identityArgs(){return {p_programme_code:cfg.programme_code,p_course_code:cfg.course_code,p_academic_year:cfg.academic_year,p_term_code:cfg.term_code};}
function payload(){return {course_code:cfg.course_code,canonical:{credit_value:3,credit_pattern:cfg.canonical.credit_pattern},working_source:cfg.working_source,conflict:{field:"credit_pattern",canonical:cfg.canonical.credit_pattern,working_source:cfg.working_conflict.credit_pattern,resolution:cfg.working_conflict.resolution},source_supported_content:{course_description:true,plo_clo_llo_mapping:true,assessment_structure:"60% formative/project-based + 40% summative",rubrics:["Role Play Sexual Counseling","Sexuality Board Game","Micro-teaching Performance"]}};}
async function createDraft(){
  say("กำลังสร้าง governed TQF3 draft…");
  const {data,error}=await supabase.rpc("hepe_create_tqf3_working_draft_by_code",{...identityArgs(),p_content:payload(),p_source_status:"LATEST_WORKING_CONFIRMED"});
  $("#result").textContent=JSON.stringify(error??data,null,2);
  if(error) throw error;
  say(data?.created===false?"พบ TQF3 เดิมแล้ว ไม่สร้างซ้ำ":"สร้าง governed TQF3 draft สำเร็จ","ok");
  return data;
}
async function createPreview(){
  say("กำลังสร้าง authenticated preview…");
  const {data,error}=await supabase.rpc("hepe_create_tqf3_preview_by_code",{...identityArgs(),p_target_format:"HTML"});
  $("#result").textContent=JSON.stringify(error??data,null,2);
  if(error) throw error;
  say("สร้าง Preview Session สำเร็จ","ok");
  return data;
}
async function refreshReadiness(){
  const {data,error}=await supabase.rpc("hepe_release_readiness_by_code",identityArgs());
  if(error) throw error;
  $("#readiness").textContent=JSON.stringify(data,null,2);
  const t=!!data?.tqf3?.record_id,p=!!data?.preview?.preview_session_id;
  $("#create-draft").disabled=t;
  $("#create-preview").disabled=!t||p;
  return data;
}
async function autoRun(){
  let r=await refreshReadiness();
  if(!r?.tqf3?.record_id){await createDraft(); r=await refreshReadiness();}
  if(r?.tqf3?.record_id && !r?.preview?.preview_session_id){await createPreview(); r=await refreshReadiness();}
  if(r?.tqf3?.record_id && r?.preview?.preview_session_id) say("TQF3 Draft และ Authenticated Preview พร้อมแล้ว","ok");
}
$("#login-form").onsubmit=signIn;
$("#create-draft").onclick=()=>createDraft().then(refreshReadiness).catch(e=>say(e.message,"warn"));
$("#create-preview").onclick=()=>createPreview().then(refreshReadiness).catch(e=>say(e.message,"warn"));
$("#refresh").onclick=()=>refreshReadiness().catch(e=>say(e.message,"warn"));
$("#logout").onclick=async()=>{await supabase.auth.signOut();location.reload();};
supabase.auth.onAuthStateChange((event,session)=>{if(event==="SIGNED_IN"&&session) boot().catch(e=>say(e.message,"warn"));});
boot().catch(e=>say(e.message,"warn"));
