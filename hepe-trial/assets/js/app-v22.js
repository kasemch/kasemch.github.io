(function(){
'use strict';
const $=s=>document.querySelector(s);
const SUPABASE_URL='https://lztxpjsuzqvtgyasfnyj.supabase.co';
const KEY='sb_publishable_7bv5GR0-ksXJn91sRHV0Mg_k4nblIGI';
const client=window.supabase.createClient(SUPABASE_URL,KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true,flowType:'implicit'}});
let cfg=null;
const COOLDOWN_KEY='hepe_magic_link_cooldown_until';const NORMAL_COOLDOWN_MS=120000;const RATE_LIMIT_COOLDOWN_MS=900000;let cooldownTimer=null;
const say=(t,k='info')=>{const e=$('#status');if(e){e.textContent=t;e.dataset.kind=k;}};
function args(){return {p_programme_code:cfg.programme_code,p_course_code:cfg.course_code,p_academic_year:cfg.academic_year,p_term_code:cfg.term_code};}
function badge(id,text,state){const e=$(id);if(!e)return;e.textContent=text;e.className='badge '+state;}
function esc(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
function fmtDate(v){if(!v)return '—';try{return new Date(v).toLocaleString('th-TH',{dateStyle:'medium',timeStyle:'medium'});}catch{return v;}}
function cooldownUntil(){return Number(localStorage.getItem(COOLDOWN_KEY)||0);}function setCooldown(ms=NORMAL_COOLDOWN_MS){localStorage.setItem(COOLDOWN_KEY,String(Math.max(cooldownUntil(),Date.now()+ms)));syncCooldown();}function clearCooldown(){localStorage.removeItem(COOLDOWN_KEY);if(cooldownTimer){clearInterval(cooldownTimer);cooldownTimer=null;}syncCooldown();}function fmt(ms){const s=Math.max(0,Math.ceil(ms/1000)),m=Math.floor(s/60);return m?`${m}:${String(s%60).padStart(2,'0')}`:`${s} วินาที`;}function syncCooldown(){const b=$('#magic-link-btn'),n=$('#magic-cooldown');if(!b||!n)return;const rem=Math.max(0,cooldownUntil()-Date.now());if(!rem){b.disabled=false;b.textContent='ส่ง Magic Link';n.textContent='';if(cooldownTimer){clearInterval(cooldownTimer);cooldownTimer=null;}return;}b.disabled=true;b.textContent=`ส่งได้อีกครั้งใน ${fmt(rem)}`;n.textContent='ระบบพักการส่งอีเมลเพื่อป้องกัน rate limit';if(!cooldownTimer)cooldownTimer=setInterval(syncCooldown,1000);}
function renderRelease(release){
  if(!release){badge('#s-final','NOT FOUND','warn');$('#release-note').textContent='ยังไม่พบ authoritative controlled release record';return;}
  badge('#s-final',release.record_status||'FINAL',release.record_status==='FINAL'?'ok':'warn');
  badge('#s-gate',release.gate?.status||'—',release.gate?.status==='FINALIZED'?'ok':'warn');
  badge('#s-publish',release.public_publish_status||'NOT_EXECUTED','block');
  $('#release-note').textContent=`${release.document_type||'TQF3'} · Finalized ${fmtDate(release.finalized_at)}`;
  $('#hash').textContent=release.bundle_sha256||'—';
  $('#finalizer').textContent=release.finalized_by_label||release.finalized_by||'—';
  $('#template').textContent=`${release.template_code||'—'} · v${release.template_version_no??'—'} · ${release.template_status||'—'}/${release.template_version_status||'—'}`;
  $('#source').textContent=release.source_provenance||'—';
  const checks=release.checks||[];
  $('#checks').innerHTML=checks.map(c=>`<div class="stage"><span>${esc(c.check_code)}</span><b class="badge ${c.check_result==='PASS'?'ok':'block'}">${esc(c.check_result)}</b></div>`).join('')||'<p class="note">ไม่พบ check history</p>';
  $('#technical').textContent=JSON.stringify(release,null,2);
}
async function loadRegistry(){
  say('กำลังโหลด Release Registry & Audit Trail…');
  const {data,error}=await client.rpc('hepe_authoritative_release_registry_by_code',args());if(error)throw error;
  $('#release-count').textContent=String(data?.release_count??0);
  badge('#s-publish',data?.public_publish?.status||'NOT_EXECUTED','block');
  const releases=data?.releases||[];
  renderRelease(releases[0]);
  $('#history').innerHTML=releases.map((r,i)=>`<article class="card"><h3>Release ${i+1} · ${esc(r.record_status)}</h3><p><strong>Finalized:</strong> ${esc(fmtDate(r.finalized_at))}</p><p><strong>SHA-256:</strong> <code>${esc(r.bundle_sha256)}</code></p><p><strong>Template:</strong> ${esc(r.template_code)} v${esc(r.template_version_no)}</p><p><strong>Source:</strong> ${esc(r.source_provenance)}</p><p><strong>Gate:</strong> ${esc(r.gate?.status)}</p></article>`).join('')||'<p class="note">ยังไม่มี release history</p>';
  say('B03.21 Release Registry & Audit Viewer พร้อมใช้งาน; Public Publish ยัง NOT_EXECUTED','ok');
}
async function boot(){
  say('กำลังตรวจ session…');
  cfg=await fetch('./config/state.json?v=22',{cache:'no-store'}).then(r=>r.json());
  $('#course').textContent=`${cfg.course_code} · ${cfg.programme_code} · AY ${cfg.academic_year}/${cfg.term_code}`;
  syncCooldown();
  const {data:{session},error}=await client.auth.getSession();if(error)throw error;
  $('#login').hidden=!!session;$('#workspace').hidden=!session;
  if(!session){say('ยังไม่พบ session — ใช้ Magic Link เฉพาะเมื่อจำเป็น','warn');return;}
  clearCooldown();
  const ctx=await client.rpc('hepe_my_context');if(ctx.error)throw ctx.error;
  $('#identity').textContent=`${ctx.data?.display_label??''} · ${(ctx.data?.roles??[]).map(r=>r.role_code).join(', ')}`;
  await loadRegistry();
}
async function signIn(e){e.preventDefault();const {data:{session}}=await client.auth.getSession();if(session)return boot();if(Date.now()<cooldownUntil()){syncCooldown();return;}const email=$('#email').value.trim();const {error}=await client.auth.signInWithOtp({email,options:{shouldCreateUser:false,emailRedirectTo:'https://kasemch.github.io/hepe-trial/'}});if(error){setCooldown(/rate limit/i.test(error.message||'')?RATE_LIMIT_COOLDOWN_MS:NORMAL_COOLDOWN_MS);say(error.message,'warn');return;}setCooldown();say('ส่ง Magic Link แล้ว ใช้อีเมลฉบับล่าสุดเพียงฉบับเดียว','ok');}
$('#login-form').addEventListener('submit',e=>signIn(e).catch(x=>say(x.message,'warn')));
$('#refresh').onclick=()=>loadRegistry().catch(x=>say(x.message,'warn'));
$('#logout').onclick=async()=>{await client.auth.signOut();location.reload();};
client.auth.onAuthStateChange((event,session)=>{if(event==='SIGNED_IN'&&session)setTimeout(()=>boot().catch(e=>say(e.message,'warn')),0);});
boot().catch(e=>say(e.message||String(e),'warn'));
})();