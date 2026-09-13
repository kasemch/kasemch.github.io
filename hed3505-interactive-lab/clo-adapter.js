// HED3505 BUILD-12 CLO Analytics Adapter
// Requires window.supabase client library and window.HED3505_LIVE_CONFIG.
// No secret/service-role credentials belong in browser code.
(() => {
  const cfg = window.HED3505_LIVE_CONFIG;
  if (!cfg?.projectUrl || !cfg?.publishableKey || !window.supabase) return;
  const client = window.HED3505CloClient || window.supabase.createClient(cfg.projectUrl, cfg.publishableKey, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
  });

  async function rpc(name, args = {}) {
    const { data, error } = await client.rpc(name, args);
    if (error) throw error;
    return data;
  }

  window.HED3505CLO = {
    client,
    getMyCloProgress() {
      return rpc('hed3505_get_my_clo_progress');
    },
    getMyCloEvidence(cloId = null) {
      return rpc('hed3505_get_my_clo_evidence', { p_clo_id: cloId });
    },
    instructorRefreshCloSnapshots(snapshotType = 'PREVIEW') {
      return rpc('hed3505_instructor_refresh_clo_snapshots', { p_snapshot_type: snapshotType });
    },
    instructorGetCloAnalytics() {
      return rpc('hed3505_instructor_get_clo_analytics');
    },
    instructorGetCqiSignals() {
      return rpc('hed3505_instructor_get_cqi_signals');
    },
    instructorSetSignalDisposition(signalId, status, reason = null) {
      return rpc('hed3505_instructor_set_signal_disposition', {
        p_signal_id: signalId,
        p_status: status,
        p_reason: reason
      });
    }
  };
})();
