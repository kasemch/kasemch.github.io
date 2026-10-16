(()=>{
  'use strict';
  const PAGE='/arm-jobs/';
  const ENDPOINT='https://armstats.compute.c-4.ap-southeast-1.aws.neon.tech/visit';
  const KEY='armstatsSessionV1';
  function sessionId(){
    let id=sessionStorage.getItem(KEY);
    if(!id){
      const raw=(globalThis.crypto&&crypto.randomUUID)?crypto.randomUUID():`${Date.now()}_${Math.random().toString(36).slice(2)}`;
      id=`s_${raw.replace(/[^A-Za-z0-9_-]/g,'_')}`.slice(0,80);
      sessionStorage.setItem(KEY,id);
    }
    return id;
  }
  function send(event,detail=''){
    const body={visitor_id:sessionId(),page_path:PAGE,event:String(event||'').slice(0,40),detail:String(detail||'').slice(0,120)};
    try{fetch(ENDPOINT,{method:'POST',mode:'cors',keepalive:true,headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}).catch(()=>{});}catch(_){/* analytics must never block UX */}
  }
  window.ARMStats={track:send};
  window.addEventListener('DOMContentLoaded',()=>send('page_view'));
})();
