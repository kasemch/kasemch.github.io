// HED3505 BUILD-11/16 Review Adapter — NON-PRODUCTION
// Requires an authenticated Supabase client instance passed to createHED3505ReviewAPI().
window.createHED3505ReviewAPI = function(sb){
  const escapeHtml = (value) => String(value ?? '')
    .replaceAll('&','&amp;')
    .replaceAll('<','&lt;')
    .replaceAll('>','&gt;')
    .replaceAll('"','&quot;')
    .replaceAll("'",'&#039;');
  const sanitizeRowsForHtml = (rows) => (rows || []).map(row => {
    const out = {};
    for (const [k,v] of Object.entries(row || {})) out[k] = typeof v === 'string' ? escapeHtml(v) : v;
    return out;
  });
  return {
    async getMyFeedback(wsId=null){
      const {data,error}=await sb.rpc('hed3505_get_my_feedback',{p_ws_id:wsId});
      if(error) throw error; return data;
    },
    async getMyRubric(wsId=null){
      const {data,error}=await sb.rpc('hed3505_get_my_rubric',{p_ws_id:wsId});
      if(error) throw error; return data;
    },
    async getMyReviewState(wsId=null){
      const {data,error}=await sb.rpc('hed3505_get_my_review_state',{p_ws_id:wsId});
      if(error) throw error; return data;
    },
    async submitMyRevision(wsId,reason=''){
      const {data,error}=await sb.rpc('hed3505_submit_my_ws_revision',{p_ws_id:wsId,p_reason:reason||null});
      if(error) throw error; return data;
    },
    async instructorGetPortfolio(learnerId,wsId=null){
      const {data,error}=await sb.rpc('hed3505_instructor_get_portfolio',{p_learner_id:learnerId,p_ws_id:wsId});
      if(error) throw error;
      return sanitizeRowsForHtml(data);
    },
    async instructorAddFeedback({learnerId,wsId,criterionId=null,feedbackCode=null,whatsGood=null,fixFirst=null,why=null,nextAction=null,requestRevision=false}){
      const {data,error}=await sb.rpc('hed3505_instructor_add_feedback',{
        p_learner_id:learnerId,p_ws_id:wsId,p_criterion_id:criterionId,p_feedback_code:feedbackCode,
        p_whats_good:whatsGood,p_fix_first:fixFirst,p_why:why,p_next_action:nextAction,p_request_revision:requestRevision
      });
      if(error) throw error; return data;
    },
    async instructorSetRubric({learnerId,wsId,criterionId,score,scoreStatus='PROVISIONAL',changeReason=null}){
      const {data,error}=await sb.rpc('hed3505_instructor_set_rubric_score',{
        p_learner_id:learnerId,p_ws_id:wsId,p_criterion_id:criterionId,p_score:score,p_score_status:scoreStatus,p_change_reason:changeReason
      });
      if(error) throw error; return data;
    },
    async instructorSetReviewStatus(learnerId,wsId,toStatus,reason=null){
      const {data,error}=await sb.rpc('hed3505_instructor_set_review_status',{
        p_learner_id:learnerId,p_ws_id:wsId,p_to_status:toStatus,p_reason:reason
      });
      if(error) throw error; return data;
    }
  };
};
