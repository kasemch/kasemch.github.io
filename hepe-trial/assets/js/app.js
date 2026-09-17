(function(){
'use strict';
const $=s=>document.querySelector(s);const say=(t,k='info')=>{const e=$('#status');if(e){e.textContent=t;e.dataset.kind=k;}};
const timeout=(p,ms,label)=>Promise.race([p,new Promise((_,rej)=>setTimeout(()=>rej(new Error(label||'timeout')),ms))]);
const URL='https://lztxpjsuzqvtgyasfnyj.supabase.co',KEY='sb_publishable_7bv5GR0-ksXJn91sRHV0Mg_k4nblIGI';
const client=window.supabase.createClient(URL,KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true,flowType:'implicit'}});let cfg=null,last=null;
const COOLDOWN_KEY='hepe_magic_link_cooldown_until';const NORMAL_COOLDOWN_MS=120000;const RATE_LIMIT_COOLDOWN_MS=900000;let cooldownTimer=null;
function args(){return {p_programme_code:cfg.programme_code,p_course_code:cfg.course_code,p_academic_year:cfg.academic_year,p_term_code:cfg.term_code};}
function badge(id,text,state){const e=$(id);if(!e)return;e.textContent=text;e.className='badge '+state;}
function isApprovedStatus(s){return s==='APPROVED_FOR_CONTROLLED_EXPORT';}
function render(r){
 last=r||{};
 const previewStatus=r?.preview?.preview_status||'';
 badge('#s-draft',r?.tqf3?.record_id?'READY':'MISSING',r?.tqf3?.record_id?'ok':'warn');
 badge('#s-preview',r?.preview?.preview_session_id?(previewStatus||'READY'):'MISSING',r?.preview?.preview_session_id?(isApprovedStatus(previewStatus)?'ok':'ok'):'warn');
 badge('#s-template',r?.template?.template_status||'UNKNOWN',r?.template?.template_status==='APPROVED'?'ok':'block');
 badge('#s-release',r?.release_gate?.status||'BLOCKED',r?.release_gate?.status==='READY'?'ok':'block');
 const submitted=previewStatus==='SUBMITTED';const approved=isApprovedStatus(previewStatus);
 $('#review-note').textContent=approved?'Reviewer อนุมัติ Controlled Export แล้ว':(submitted?'ส่งเข้าสู่ Review แล้ว — รอ Reviewer Decision จริง':(r?.preview?.preview_session_id?'Preview พร้อมส่ง Review':'ยังไม่มี Preview'));
 const submitBtn=$('#submit-review');if(submitBtn){submitBtn.disabled=submitted||approved||!r?.preview?.preview_session_id;submitBtn.textContent=approved?'Controlled Export Approved':(submitted?'Submitted — Awaiting Reviewer':'Submit for Review');}
 const approveBtn=$('#approve-review');if(approveBtn){approveBtn.hidden=!submitted;approveBtn.disabled=!submitted;}
 if(approved)$('#action').textContent='Review Decision: APPROVE_CONTROLLED_EXPORT · Authoritative Release ยังถูกแยกและยังไม่อนุมัติ';
 else if(submitted)$('#action').textContent='Human Decision Gate: ต้องใช้ Reviewer/Programme Chair ที่ authenticated เพื่อบันทึกคำตัดสิน';
 $('#technical').textContent=JSON.stringify(r,null,2);
}
function cooldownUntil(){return Number(localStorage.getItem(COOLDOWN_KEY)||0);}
function setCooldown(ms=NORMAL_COOLDOWN_MS){const until=Math.max(cooldownUntil(),Date.now()+ms);localStorage.setItem(COOLDOWN_KEY,String(until));syncCooldown();}
function clearCooldown(){localStorage.removeItem(COOLDOWN_KEY);if(cooldownTimer){clearInterval(cooldownTimer);cooldownTimer=null;}syncCooldown();}
function fmtRemaining(ms){const sec=Math.max(0,Math.ceil(ms/1000));const m=Math.floor(sec/60);const s=sec%60;return m>0?`${m}:${String(s).padStart(2,'0')}`:`${s} วินาที`;}
function syncCooldown(){const btn=$('#magic-link-btn'),note=$('#magic-cooldown');if(!btn||!note)return;const remaining=Math.max(0,cooldownUntil()-Date.now());if(remaining<=0){btn.disabled=false;btn.textContent='ส่ง Magic Link';note.textContent='';if(cooldownTimer){clearInterval(cooldownTimer);cooldownTimer=null;}return;}btn.disabled=true;btn.textContent=`ส่งได้อีกครั้งใน ${fmtRemaining(remaining)}`;note.textContent='ระบบพักการส่งอีเมลไว้ชั่วคราวเพื่อป้องกัน rate limit และการกดซ้ำ';if(!cooldownTimer)cooldownTimer=setInterval(syncCooldown,1000);}
async function readiness(){const {data,error}=await timeout(client.rpc('hepe_release_readiness_by_code',args()),12000,'ตรวจ readiness timeout');if(error)throw error;render(data);return data;}
async function createDraft(){const payload={course_code:cfg.course_code,canonical:{credit_value:3,credit_pattern:cfg.canonical.credit_pattern},working_source:cfg.working_source,conflict:{field:'credit_pattern',canonical:cfg.canonical.credit_pattern,working_source:cfg.working_conflict.credit_pattern,resolution:cfg.working_conflict.resolution}};const {error}=await client.rpc('hepe_create_tqf3_working_draft_by_code',{...args(),p_content:payload,p_source_status:'LATEST_WORKING_CONFIRMED'});if(error)throw error;}
async function createPreview(){const {error}=await client.rpc('hepe_create_tqf3_preview_by_code',{...args(),p_target_format:'HTML'});if(error)throw error;}
async function submitReview(){say('กำลังส่ง Preview เข้าสู่ Review…');const before=await readiness();if(before?.preview?.preview_status==='SUBMITTED'||isApprovedStatus(before?.preview?.preview_status)){say('Preview อยู่ในขั้น Review แล้ว','ok');return before;}const {data,error}=await client.rpc('hepe_submit_tqf3_preview_by_code',args());if(error){if(/INVALID_PREVIEW_STATE/i.test(error.message||'')){const after=await readiness();if(after?.preview?.preview_status==='SUBMITTED'||isApprovedStatus(after?.preview?.preview_status)){say('Preview อยู่ในขั้น Review แล้ว','ok');return after;}}throw error;}$('#action').textContent='ส่ง Preview เข้าสู่ Review สำเร็จ';return data;}
async function approveControlledExport(note='Approved by Programme Chair through authenticated HEPE Review Workflow after explicit human decision.'){
 say('กำลังบันทึก Reviewer Decision…');
 const before=await readiness();
 if(isApprovedStatus(before?.preview?.preview_status)){say('Controlled Export ได้รับอนุมัติแล้ว','ok');return before;}
 if(before?.preview?.preview_status!=='SUBMITTED')throw new Error('PREVIEW_NOT_SUBMITTED');
 const {data,error}=await client.rpc('hepe_decide_tqf3_preview_by_code',{...args(),p_decision:'APPROVE_CONTROLLED_EXPORT',p_note:note});
 if(error)throw error;
 $('#action').textContent='Reviewer Decision บันทึกแล้ว: APPROVE_CONTROLLED_EXPORT';
 const after=await readiness();say('Reviewer อนุมัติ Controlled Export แล้ว','ok');return after;
}
async function maybeApplyDecisionFromURL(){
 const u=new URL(location.href);const decision=(u.searchParams.get('decision')||'').toLowerCase();
 if(decision!=='approve')return;
 await approveControlledExport();
 u.searchParams.delete('decision');history.replaceState({},document.title,u.pathname+(u.searchParams.toString()?`?${u.searchParams}`:'')+u.hash);
}
async function autoRun(){let r=await readiness();if(!r?.tqf3?.record_id){await createDraft();r=await readiness();}if(!r?.preview?.preview_session_id){await createPreview();r=await readiness();}if(r?.preview?.preview_session_id&&r?.preview?.preview_status==='READY_FOR_REVIEW'){await submitReview();r=await readiness();}await maybeApplyDecisionFromURL();r=await readiness();if(isApprovedStatus(r?.preview?.preview_status))say('B03.17B สำเร็จ: Controlled Export ได้รับอนุมัติแล้ว','ok');else if(r?.preview?.preview_status==='SUBMITTED')say('B03.17B ถึง Reviewer Decision Gate แล้ว','ok');else say('Authenticated workspace พร้อมใช้งาน','ok');}
async function boot(){say('กำลังตรวจ session…');cfg=await fetch('./config/state.json?v=12',{cache:'no-store'}).then(r=>r.json());$('#course').textContent=`${cfg.course_code} · ${cfg.programme_code} · AY ${cfg.academic_year}/${cfg.term_code}`;syncCooldown();const {data:{session},error}=await client.auth.getSession();if(error)throw error;$('#login').hidden=!!session;$('#workspace').hidden=!session;if(!session){say('ยังไม่พบ session — ระบบจะไม่ส่ง Magic Link ซ้ำจนกว่าคุณจะกดเอง','warn');return;}clearCooldown();const ctx=await client.rpc('hepe_my_context');if(ctx.error)throw ctx.error;$('#identity').textContent=`${ctx.data?.display_label??''} · ${(ctx.data?.roles??[]).map(r=>r.role_code).join(', ')}`;await autoRun();}
async function signIn(e){e.preventDefault();const {data:{session}}=await client.auth.getSession();if(session){clearCooldown();say('พบ session ที่ยังใช้งานได้ กำลังเปิด workspace…','ok');return boot();}if(Date.now()<cooldownUntil()){syncCooldown();say('ยังอยู่ในช่วงพักการส่ง Magic Link กรุณารอให้ตัวนับหมดก่อน','warn');return;}const email=$('#email').value.trim();const btn=$('#magic-link-btn');btn.disabled=true;say('กำลังส่ง Magic Link…');const {error}=await client.auth.signInWithOtp({email,options:{shouldCreateUser:false,emailRedirectTo:'https://kasemch.github.io/hepe-trial/'}});if(error){const rateLimited=/rate limit/i.test(error.message||'');setCooldown(rateLimited?RATE_LIMIT_COOLDOWN_MS:NORMAL_COOLDOWN_MS);say(rateLimited?'Supabase จำกัดการส่งอีเมลชั่วคราว ระบบพักปุ่ม 15 นาทีเพื่อป้องกันการส่งซ้ำ':error.message,'warn');return;}setCooldown(NORMAL_COOLDOWN_MS);say('ส่ง Magic Link แล้ว ใช้อีเมลฉบับล่าสุดเพียงฉบับเดียว','ok');}
$('#login-form').addEventListener('submit',e=>signIn(e).catch(x=>{setCooldown(NORMAL_COOLDOWN_MS);say(x.message,'warn');}));$('#refresh').onclick=()=>readiness().catch(x=>say(x.message,'warn'));$('#submit-review').onclick=()=>submitReview().then(readiness).catch(x=>say(x.message,'warn'));$('#approve-review').onclick=()=>approveControlledExport().catch(x=>say(x.message,'warn'));$('#logout').onclick=async()=>{await client.auth.signOut();location.reload();};client.auth.onAuthStateChange((event,session)=>{if(event==='SIGNED_IN'&&session){clearCooldown();setTimeout(()=>boot().catch(e=>say(e.message||String(e),'warn')),0);}});boot().catch(e=>say(e.message||String(e),'warn'));
})();