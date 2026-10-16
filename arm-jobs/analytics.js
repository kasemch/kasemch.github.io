(()=>{
  'use strict';
  const PAGE='/arm-jobs/';
  const BASE='https://br-gentle-voice-b3op1wfq-armstats.compute.c-4.ap-southeast-1.aws.neon.tech';
  const KEY='armstatsSessionV1';
  const ALLOWED=new Set(['job_source_click','prepare_application','cv_builder']);
  const productionPage=()=>location.pathname===PAGE;
  function sessionId(){let id=sessionStorage.getItem(KEY);if(!id){const raw=(globalThis.crypto&&crypto.randomUUID)?crypto.randomUUID():`${Date.now()}_${Math.random().toString(36).slice(2)}`;id=`s_${raw.replace(/[^A-Za-z0-9_-]/g,'_')}`.slice(0,80);sessionStorage.setItem(KEY,id)}return id}
  function send(path,payload){if(!productionPage())return;try{fetch(BASE+path,{method:'POST',mode:'cors',keepalive:true,headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}).catch(()=>{})}catch(_){}}
  function pageView(){send('/visit',{visitor_id:sessionId(),page_path:PAGE})}
  function event(name,detail=''){if(!ALLOWED.has(name))return;send('/event',{visitor_id:sessionId(),page_path:PAGE,event:name,detail:String(detail).slice(0,120)})}
  window.ARMAnalytics={pageView,event};
  window.addEventListener('DOMContentLoaded',pageView);
})();
