// APRUP v2.0 — State Management Engine (Multi-File Architecture)
const DEFAULT_N8N_WEBHOOK_URL = 'https://n8n.almaudin.my.id/webhook';
const savedWebhookUrl = localStorage.getItem('n8n_webhook_url');
const configuredWebhookUrl = savedWebhookUrl && !savedWebhookUrl.includes('your-n8n-domain')
  ? savedWebhookUrl
  : DEFAULT_N8N_WEBHOOK_URL;

let appState = {
  theme: localStorage.getItem('dashboard_theme') || 'dark', // 'dark' (Malam) or 'light' (Siang)
  mode: localStorage.getItem('dashboard_mode') || 'demo', // 'live' or 'demo'
  webhookUrl: configuredWebhookUrl,
  isOnline: false,
  currentUser: null,
  activeTab: 'pending', // 'pending' | 'approved' | 'needs revision' | 'rejected'
  documents: [],
  filters: {
    search: '',
    type: 'all'
  },
  pendingActionDocId: null,
  pendingActionType: null, // 'revise' or 'reject'
  healthCheckTimer: null,
  autoRefreshTimer: null
};

// Pesan status untuk kondisi server n8n offline
const offlineHumors = [
  "Server n8n sedang restart atau dalam maintenance singkat. Coba sinkronisasi kembali dalam beberapa saat.",
  "Koneksi ke n8n belum merespons. Periksa apakah service n8n aktif dan dapat diakses.",
  "Tidak dapat terhubung ke server n8n. Pastikan koneksi internet dan status server dalam kondisi baik.",
  "Koneksi terputus. Periksa status container Docker atau VPS tempat n8n berjalan.",
  "Server n8n tidak dapat dijangkau saat ini. Silakan verifikasi konfigurasi endpoint di pengaturan."
];

// Mock Data for Demo Mode
const mockDocuments = [
  {
    Task_ID: "TASK-2026-0801",
    File_ID: "gdrive-file-001",
    File_Name: "Modul_Kemenkeu",
    File_Size: "1.2 MB",
    Timestamp: "2026-08-13 10:15:30",
    Spesifikasi_Check: "Mutu: Lengkap | Teknis: Sesuai | Waktu: 30 Hari | Layanan: SLA 99%",
    TOR_Completeness: "Lengkap (10/10 Bab Terpenuhi)",
    AI_Notes: "Integrasi regulasi internal dengan Core Values ASN BerAKHLAK berjalan baik.",
    Is_Reapplication: false,
    Refer_Task_ID: "-",
    Admin_Notes: "-",
    Status: "Pending",
    File_Link: "https://drive.google.com/file/d/demo1/view?usp=drivesdk"
  },
  {
    Task_ID: "TASK-2026-0802",
    File_ID: "gdrive-file-002",
    File_Name: "Laporan_Pengadaan_TI",
    File_Size: "3.4 MB",
    Timestamp: "2026-08-13 11:20:00",
    Spesifikasi_Check: "Mutu: Standar | Teknis: Perlu Penyesuaian | Waktu: 45 Hari | Layanan: SLA 95%",
    TOR_Completeness: "Perlu Revisi Bab 3 (Skema Biaya Belum Rinci)",
    AI_Notes: "Estimasi efisiensi operasional 22% per tahun, namun SLA vendor kedua berisiko.",
    Is_Reapplication: true,
    Refer_Task_ID: "TASK-2026-0789",
    Admin_Notes: "Pengajuan ulang revisi dari minggu lalu.",
    Status: "Pending",
    File_Link: "https://drive.google.com/file/d/demo2/view?usp=drivesdk"
  },
  {
    Task_ID: "TASK-2026-0803",
    File_ID: "gdrive-file-003",
    File_Name: "Kuitansi_AWS_Server",
    File_Size: "820 KB",
    Timestamp: "2026-08-13 14:02:11",
    Spesifikasi_Check: "Mutu: Baik | Teknis: Valid Invoice | Waktu: Jatuh Tempo 25 Ags | Layanan: AWS Direct",
    TOR_Completeness: "Lengkap (Nomor Faktur & Tax ID Terbaca)",
    AI_Notes: "Total tagihan USD 1,425.50 (Rp 22.800.000). Pembayaran via Kartu Kredit 8891.",
    Is_Reapplication: false,
    Refer_Task_ID: "-",
    Admin_Notes: "-",
    Status: "Pending",
    File_Link: "https://drive.google.com/file/d/demo3/view?usp=drivesdk"
  },
  {
    Task_ID: "TASK-2026-0804",
    File_ID: "gdrive-file-004",
    File_Name: "Foto_Kondisi_Gudang_B",
    File_Size: "2.1 MB",
    Timestamp: "2026-08-13 15:45:00",
    Spesifikasi_Check: "Mutu: Kritis | Teknis: Miring 15 Derajat | Waktu: Penanganan Segera | Layanan: Pemeliharaan Gudang",
    TOR_Completeness: "Dokumentasi Foto Lapangan Terlampir",
    AI_Notes: "Kerusakan struktur penyangga rak 12-B. Bahaya keselamatan kerja jika tidak dilas ulang.",
    Is_Reapplication: false,
    Refer_Task_ID: "-",
    Admin_Notes: "-",
    Status: "Pending",
    File_Link: "https://drive.google.com/file/d/demo4/view?usp=drivesdk"
  }
];

// DOM Elements Cache
const elements = {
  btnThemeToggle: document.getElementById('btn-theme-toggle'),
  themeToggleIcon: document.getElementById('theme-toggle-icon'),
  btnLiveMode: document.getElementById('btn-live-mode'),
  btnDemoMode: document.getElementById('btn-demo-mode'),
  healthBadge: document.getElementById('health-badge'),
  healthText: document.getElementById('health-text'),
  btnOpenSettings: document.getElementById('btn-open-settings'),
  userRoleBadge: document.getElementById('user-role-badge'),
  userRoleText: document.getElementById('user-role-text'),
  loginModal: document.getElementById('login-modal'),
  loginForm: document.getElementById('login-form'),
  loginUsername: document.getElementById('login-username'),
  loginPassword: document.getElementById('login-password'),
  btnLoginDemoMode: document.getElementById('btn-login-demo-mode'),
  
  // Tabs
  tabPending: document.getElementById('tab-pending'),
  tabApproved: document.getElementById('tab-approved'),
  tabRevised: document.getElementById('tab-revised'),
  tabRejected: document.getElementById('tab-rejected'),
  tabArchived: document.getElementById('tab-archived'),
  badgePendingCount: document.getElementById('badge-pending-count'),
  badgeApprovedCount: document.getElementById('badge-approved-count'),
  badgeRevisedCount: document.getElementById('badge-revised-count'),
  badgeRejectedCount: document.getElementById('badge-rejected-count'),
  badgeArchivedCount: document.getElementById('badge-archived-count'),
  statPendingCount: document.getElementById('stat-pending-count'),
  statApprovedCount: document.getElementById('stat-approved-count'),
  statRevisedCount: document.getElementById('stat-revised-count'),
  statRejectedCount: document.getElementById('stat-rejected-count'),
  statArchivedCount: document.getElementById('stat-archived-count'),

  // Filters
  searchInput: document.getElementById('search-input'),
  autoRefreshCheck: document.getElementById('auto-refresh-check'),
  btnRefresh: document.getElementById('btn-refresh'),
  refreshIcon: document.getElementById('refresh-icon'),
  
  // Banners & Grid
  offlineAlert: document.getElementById('offline-humor-alert'),
  offlineErrorDetails: document.getElementById('offline-error-details'),
  btnToggleDemoFallback: document.getElementById('btn-toggle-demo-fallback'),
  loadingState: document.getElementById('loading-state'),
  emptyState: document.getElementById('empty-state'),
  emptyStateMessage: document.getElementById('empty-state-message'),
  documentGrid: document.getElementById('document-grid'),

  // Action Modal (Dynamic Reasons Modal)
  actionModal: document.getElementById('action-modal'),
  modalIcon: document.getElementById('modal-icon'),
  modalTitle: document.getElementById('modal-title'),
  actionModalFilename: document.getElementById('action-modal-filename'),
  referTaskContainer: document.getElementById('refer-task-container'),
  referTaskIdInput: document.getElementById('refer-task-id'),
  referTaskInfo: document.getElementById('refer-task-info'),
  referTaskDocName: document.getElementById('refer-task-doc-name'),
  referTaskDocMeta: document.getElementById('refer-task-doc-meta'),
  referTaskDocLink: document.getElementById('refer-task-doc-link'),
  referTaskAdminNotes: document.getElementById('refer-task-admin-notes'),
  lblActionNotes: document.getElementById('lbl-action-notes'),
  actionNotes: document.getElementById('action-notes'),
  btnSubmitAction: document.getElementById('btn-submit-action'),
  btnSubmitActionText: document.getElementById('btn-submit-action-text'),
  btnCompareRevision: document.getElementById('btn-compare-revision'),

  // Upload KAK/TOR Modal
  btnOpenUpload: document.getElementById('btn-open-upload'),
  uploadModal: document.getElementById('upload-modal'),
  uploadForm: document.getElementById('upload-form'),
  uploadDropzone: document.getElementById('upload-dropzone'),
  uploadFile: document.getElementById('upload-file'),
  uploadFileLabel: document.getElementById('upload-file-label'),
  uploadFileError: document.getElementById('upload-file-error'),
  btnSubmitUpload: document.getElementById('btn-submit-upload'),
  btnCloseUpload: document.getElementById('btn-close-upload'),
  btnCancelUpload: document.getElementById('btn-cancel-upload'),

  // AI Revision Comparison Modal
  compareModal: document.getElementById('compare-modal'),
  compareLoading: document.getElementById('compare-loading'),
  compareResult: document.getElementById('compare-result'),
  compareTaskLabel: document.getElementById('compare-task-label'),
  compareStatus: document.getElementById('compare-status'),
  compareVerified: document.getElementById('compare-verified'),
  compareRemaining: document.getElementById('compare-remaining'),
  compareSummary: document.getElementById('compare-summary'),
  btnCloseCompare: document.getElementById('btn-close-compare'),
  btnDismissCompare: document.getElementById('btn-dismiss-compare'),

  // Settings Modal
  settingsModal: document.getElementById('settings-modal'),
  btnSaveSettings: document.getElementById('btn-save-settings'),
  btnCancelSettings: document.getElementById('btn-cancel-settings'),
  btnCloseSettingsX: document.getElementById('btn-close-settings-x'),
  webhookUrlInput: document.getElementById('webhook-url'),
  btnTestConnection: document.getElementById('btn-test-connection'),
  testConnIcon: document.getElementById('test-conn-icon'),
  lblGetEndpoint: document.getElementById('lbl-get-endpoint'),
  lblPostEndpoint: document.getElementById('lbl-post-endpoint'),

  // Document Preview Modal
  docPreviewModal: document.getElementById('doc-preview-modal'),
  docPreviewIframe: document.getElementById('doc-preview-iframe'),
  docPreviewFilename: document.getElementById('doc-preview-filename'),
  docPreviewOpenLink: document.getElementById('doc-preview-open-link'),
  docPreviewLoading: document.getElementById('doc-preview-loading'),

  // Toast
  toast: document.getElementById('toast'),
  toastIcon: document.getElementById('toast-icon'),
  toastMessage: document.getElementById('toast-message')
};

function normalizeReferTaskValue(value) {
  if (value === null || value === undefined) return '';

  const normalized = String(value).trim();
  if (!normalized || normalized === '-' || normalized.toLowerCase() === 'null' || normalized.toLowerCase() === 'undefined') {
    return '';
  }

  return normalized;
}

function hasValidReferTaskReference(doc) {
  const status = (doc.Status || doc.status || '').toLowerCase();
  const value = normalizeReferTaskValue(doc.Refer_Task_ID ?? doc.refer_task_id);
  return (status === 'needs revision' || status === 'rejected') && value !== '';
}

function getReferenceCandidateDocs() {
  return appState.documents.filter(doc => {
    const status = (doc.Status || doc.status || '').toLowerCase();
    const taskId = normalizeReferTaskValue(doc.Task_ID ?? doc.task_id);
    const referTaskId = normalizeReferTaskValue(doc.Refer_Task_ID ?? doc.refer_task_id);
    return (status === 'needs revision' || status === 'rejected') && taskId !== '' && referTaskId === '';
  });
}

function populateReferTaskDatalist() {
  const datalist = document.getElementById('refer-task-datalist');
  if (!datalist) return;

  const visibleReferenceDocs = getReferenceCandidateDocs();

  const seen = new Set();
  const options = visibleReferenceDocs
    .map(doc => {
      const taskId = normalizeReferTaskValue(doc.Task_ID ?? doc.task_id);
      const fileName = (doc.File_Name || doc.filename || 'Dokumen tanpa judul').trim();
      if (!taskId || seen.has(taskId)) return null;
      seen.add(taskId);
      return `<option value="${taskId}" label="${taskId} — ${fileName}">${taskId} — ${fileName}</option>`;
    })
    .filter(Boolean)
    .join('');

  datalist.innerHTML = options;
}

function updateReferTaskInfo() {
  const inputValue = normalizeReferTaskValue(elements.referTaskIdInput ? elements.referTaskIdInput.value : '');
  const infoPanel = elements.referTaskInfo;

  if (!inputValue) {
    if (infoPanel) infoPanel.classList.add('hidden');
    return;
  }

  const doc = appState.documents.find(d => normalizeReferTaskValue(d.Task_ID ?? d.task_id) === inputValue);
  if (!doc) {
    if (infoPanel) infoPanel.classList.add('hidden');
    return;
  }

  const fileName = doc.File_Name || doc.filename || 'Dokumen tanpa judul';
  const status = doc.Status || doc.status || 'Unknown';
  const adminNotes = doc.Admin_Notes || doc.admin_notes || 'Tidak ada catatan.';
  const fileLink = doc.File_Link || doc.file_link || '#';

  if (elements.referTaskDocName) elements.referTaskDocName.innerText = `${doc.Task_ID || doc.task_id || inputValue} — ${fileName}`;
  if (elements.referTaskDocMeta) elements.referTaskDocMeta.innerText = `Status: ${status}`;
  if (elements.referTaskAdminNotes) elements.referTaskAdminNotes.innerText = adminNotes;
  if (elements.referTaskDocLink) {
    elements.referTaskDocLink.href = fileLink;
    elements.referTaskDocLink.classList.remove('pointer-events-none', 'opacity-50');
    if (!fileLink || fileLink === '#') {
      elements.referTaskDocLink.href = '#';
      elements.referTaskDocLink.classList.add('pointer-events-none', 'opacity-50');
    }
  }

  if (infoPanel) infoPanel.classList.remove('hidden');
}

function updateCompareActionVisibility() {
  if (!elements.btnCompareRevision) return;
  const referTaskId = normalizeReferTaskValue(elements.referTaskIdInput ? elements.referTaskIdInput.value : '');
  elements.btnCompareRevision.classList.toggle('hidden', !referTaskId);
  elements.btnCompareRevision.classList.toggle('flex', Boolean(referTaskId));
}

function getPengesahanValue(doc) {
  const value = doc.Pengesahan || doc.pengesahan || doc['Pengesahan (TTD)'] || doc['pengesahan_ttd'] || 'Belum ada data';
  return String(value).trim() || 'Belum ada data';
}

function getPengesahanStyle(value) {
  const normalized = String(value).trim();
  if (!normalized || normalized.toLowerCase().includes('belum')) {
    return 'bg-brandwine-500/10 border border-brandwine-500/20 text-brandwine-300';
  }
  if (normalized.toLowerCase().includes('tte') || normalized.toLowerCase().includes('menggunakan')) {
    return 'bg-brandpurple-500/10 border border-brandpurple-500/20 text-brandpurple-300';
  }
  if (normalized.toLowerCase().includes('bukan')) {
    return 'bg-brandgold-500/10 border border-brandgold-500/20 text-brandgold-300';
  }
  return 'bg-stone-500/10 border border-stone-500/20 text-stone-300';
}

// Initialize Application
function init() {
  applyTheme(appState.theme);
  updateRoleUI();
  setModeUI(appState.mode);
  
  if (elements.webhookUrlInput) {
    elements.webhookUrlInput.value = appState.webhookUrl;
    updateEndpointLabels(appState.webhookUrl);
  }

  // Setup Event Listeners
  if (elements.btnThemeToggle) elements.btnThemeToggle.addEventListener('click', toggleTheme);
  
  if (elements.btnLiveMode) elements.btnLiveMode.addEventListener('click', () => changeMode('live'));
  if (elements.btnDemoMode) elements.btnDemoMode.addEventListener('click', () => changeMode('demo'));
  
  if (elements.btnOpenSettings) elements.btnOpenSettings.addEventListener('click', openSettings);
  if (elements.btnCancelSettings) elements.btnCancelSettings.addEventListener('click', closeSettings);
  if (elements.btnCloseSettingsX) elements.btnCloseSettingsX.addEventListener('click', closeSettings);
  if (elements.btnSaveSettings) elements.btnSaveSettings.addEventListener('click', saveSettings);
  if (elements.btnTestConnection) elements.btnTestConnection.addEventListener('click', testSettingsConnection);
  if (elements.webhookUrlInput) elements.webhookUrlInput.addEventListener('input', (e) => updateEndpointLabels(e.target.value));

  if (elements.btnSubmitAction) elements.btnSubmitAction.addEventListener('click', submitActionModal);
  if (elements.btnLoginDemoMode) elements.btnLoginDemoMode.addEventListener('click', enableDemoLogin);
  if (elements.btnOpenUpload) elements.btnOpenUpload.addEventListener('click', openUploadModal);
  if (elements.btnCloseUpload) elements.btnCloseUpload.addEventListener('click', closeUploadModal);
  if (elements.btnCancelUpload) elements.btnCancelUpload.addEventListener('click', closeUploadModal);
  if (elements.uploadForm) elements.uploadForm.addEventListener('submit', submitUpload);
  if (elements.uploadFile) elements.uploadFile.addEventListener('change', handleUploadFileChange);
  if (elements.uploadDropzone) {
    elements.uploadDropzone.addEventListener('dragover', handleUploadDragOver);
    elements.uploadDropzone.addEventListener('dragleave', handleUploadDragLeave);
    elements.uploadDropzone.addEventListener('drop', handleUploadDrop);
  }
  if (elements.btnCloseCompare) elements.btnCloseCompare.addEventListener('click', closeCompareModal);
  if (elements.btnDismissCompare) elements.btnDismissCompare.addEventListener('click', closeCompareModal);

  if (elements.searchInput) elements.searchInput.addEventListener('input', handleSearch);
  if (elements.filterAll) elements.filterAll.addEventListener('click', () => setTypeFilter('all'));
  if (elements.btnRefresh) elements.btnRefresh.addEventListener('click', () => syncData(true));
  if (elements.btnToggleDemoFallback) elements.btnToggleDemoFallback.addEventListener('click', () => changeMode('demo'));

  if (elements.autoRefreshCheck) elements.autoRefreshCheck.addEventListener('change', toggleAutoRefresh);

  startHealthCheckLoop();
  toggleAutoRefresh();
  if (appState.currentUser) {
    syncData(true);
  } else {
    openLoginModal();
    showToast('Login diperlukan sebelum mengakses dashboard.', 'warning');
  }
}

// Status Navigation Tabs Switcher
function switchStatusTab(status) {
  appState.activeTab = status;

  const tabs = [
    { el: elements.tabPending, key: 'pending' },
    { el: elements.tabApproved, key: 'approved' },
    { el: elements.tabRevised, key: 'needs revision' },
    { el: elements.tabRejected, key: 'rejected' },
    { el: elements.tabArchived, key: 'archived' }
  ];

  tabs.forEach(t => {
    if (t.el) {
      if (t.key === status) {
        t.el.className = "nav-tab-item active flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200";
      } else {
        t.el.className = "nav-tab-item flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--text)] flex items-center justify-center gap-2 transition-all duration-200";
      }
    }
  });

  renderDocs();
}

// Authentication & RBAC Modal Handlers
function openLoginModal() {
  if (elements.loginModal) {
    elements.loginModal.classList.remove('hidden');
    setTimeout(() => elements.loginModal.classList.remove('opacity-0'), 50);
  }
}

function closeLoginModal() {
  if (!appState.currentUser) return;
  if (elements.loginModal) {
    elements.loginModal.classList.add('opacity-0');
    setTimeout(() => elements.loginModal.classList.add('hidden'), 300);
  }
}

async function handleLoginSubmit(e) {
  if (e) e.preventDefault();
  const user = elements.loginUsername.value.trim().toLowerCase();
  const pass = elements.loginPassword.value.trim();

  const btn = document.getElementById('btn-login-submit');
  if (btn) {
    btn.setAttribute('disabled', 'true');
    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Verifikasi...</span>`;
  }

  try {
    const authenticatedUser = await authenticateWithN8n(user, pass);

    if (!authenticatedUser) throw new Error('Kredensial tidak valid.');
    appState.currentUser = { ...authenticatedUser, authSource: 'live' };
    appState.mode = 'live';
    localStorage.setItem('dashboard_mode', 'live');
    setModeUI('live');
    updateRoleUI();
    closeLoginModal();
    showToast(`Autentikasi berhasil. Login sebagai ${authenticatedUser.role === 'admin' ? 'Admin' : 'User'}.`, authenticatedUser.role === 'admin' ? 'success' : 'warning');
    renderDocs();
    syncData(true);
  } catch (error) {
    console.error('Gagal autentikasi:', error);
    if (error.message === 'AUTH_ENDPOINT_MISSING') {
      showToast('Webhook /auth/login belum dibuat di n8n. Gunakan Masuk Demo atau buat endpoint Live.', 'error');
    } else if (error.message === 'AUTH_INVALID') {
      showToast('Username atau password salah.', 'error');
    } else if (error.message.startsWith('AUTH_HTTP_')) {
      showToast(`Webhook login n8n error (${error.message.replace('AUTH_HTTP_', 'HTTP ')}). Cek execution n8n dan environment variable.`, 'error');
    } else if (error.message === 'AUTH_EMPTY_RESPONSE' || error.message === 'AUTH_INVALID_RESPONSE') {
      showToast('Webhook login merespons tanpa kontrak JSON success/role. Import ulang workflow auth dan aktifkan Production URL.', 'error');
    } else if (error.message === 'AUTH_NETWORK') {
      showToast(`Tidak dapat menghubungi ${appState.webhookUrl}/auth/login. Cek URL webhook, workflow aktif, dan CORS.`, 'error');
    } else {
      showToast('Server autentikasi n8n tidak tersedia atau koneksi gagal.', 'error');
    }
  } finally {
    if (btn) {
      btn.removeAttribute('disabled');
      btn.innerHTML = `<i class="fa-solid fa-right-to-bracket"></i> <span>Masuk</span>`;
    }
  }
}

function enableDemoLogin() {
  appState.currentUser = { username: 'demo', role: 'user', name: 'Demo User', authSource: 'demo' };
  appState.mode = 'demo';
  sessionStorage.removeItem('aprup_token');
  localStorage.setItem('dashboard_mode', 'demo');
  setModeUI('demo');
  updateRoleUI();
  closeLoginModal();
  renderDocs();
  syncData(true);
  showToast('Demo Mode aktif. Tidak ada koneksi ke webhook n8n.', 'info');
}

async function authenticateWithN8n(username, password) {
  let response;
  try {
    response = await fetch(`${appState.webhookUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
  } catch (error) {
    console.error('Auth network/CORS error:', error);
    throw new Error('AUTH_NETWORK');
  }
  if (response.status === 404) throw new Error('AUTH_ENDPOINT_MISSING');
  if (response.status === 401 || response.status === 403) throw new Error('AUTH_INVALID');
  if (!response.ok) throw new Error(`AUTH_HTTP_${response.status}`);
  const responseText = await response.text();
  if (!responseText.trim()) throw new Error('AUTH_EMPTY_RESPONSE');
  let result;
  try {
    result = JSON.parse(responseText);
  } catch (error) {
    throw new Error('AUTH_INVALID_RESPONSE');
  }
  if (!result.success || !result.role) throw new Error('AUTH_INVALID_RESPONSE');
  if (result.token) sessionStorage.setItem('aprup_token', result.token);
  return { username, role: result.role, name: result.user?.name || username };
}

function authHeaders() {
  const token = sessionStorage.getItem('aprup_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function updateRoleUI() {
  const isAuthenticated = Boolean(appState.currentUser);
  const isAdmin = isAuthenticated && appState.currentUser.role === 'admin';
  if (elements.userRoleText) elements.userRoleText.innerText = isAdmin ? "Role: Admin" : isAuthenticated ? "Role: User (Read-Only)" : "Belum Login";
  if (elements.userRoleBadge) {
    if (!isAuthenticated) {
      elements.userRoleBadge.className = "flex items-center gap-1.5 px-3 py-1 rounded-full border border-brandwine-500/30 bg-brandwine-500/15 text-brandwine-300 text-xs font-semibold select-none cursor-pointer";
    } else if (isAdmin) {
      elements.userRoleBadge.className = "flex items-center gap-1.5 px-3 py-1 rounded-full border border-brandgold-500/30 bg-brandgold-500/15 text-brandgold-300 text-xs font-semibold select-none cursor-pointer";
    } else {
      elements.userRoleBadge.className = "flex items-center gap-1.5 px-3 py-1 rounded-full border border-stone-500/30 bg-stone-500/15 text-stone-300 text-xs font-semibold select-none cursor-pointer";
    }
  }
}

// Theme Switcher Logic
function toggleTheme() {
  const newTheme = appState.theme === 'dark' ? 'light' : 'dark';
  appState.theme = newTheme;
  localStorage.setItem('dashboard_theme', newTheme);
  applyTheme(newTheme);

  const themeLabel = newTheme === 'light' ? 'Mode Siang' : 'Mode Malam';
  showToast(`Berhasil berpindah ke ${themeLabel}`, 'info');
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  if (elements.themeToggleIcon) {
    if (theme === 'light') {
      elements.themeToggleIcon.className = "fa-solid fa-sun text-brandgold-500 text-sm";
      if (elements.btnThemeToggle) elements.btnThemeToggle.title = "Mode Siang Aktif (Klik untuk Mode Malam)";
    } else {
      elements.themeToggleIcon.className = "fa-solid fa-moon text-brandgold-300 text-sm";
      if (elements.btnThemeToggle) elements.btnThemeToggle.title = "Mode Malam Aktif (Klik untuk Mode Siang)";
    }
  }
}

// Mode Selection Handler
function changeMode(newMode) {
  if (appState.mode === newMode) return;
  if (newMode === 'live' && appState.currentUser?.authSource === 'demo') {
    showToast('Session Demo tetap berada di Demo Mode. Login Live diperlukan untuk mengakses n8n.', 'warning');
    return;
  }
  
  appState.mode = newMode;
  localStorage.setItem('dashboard_mode', newMode);
  setModeUI(newMode);
  
  showToast(`Berhasil berpindah ke ${newMode === 'live' ? 'Live Mode' : 'Demo/Mock Mode'}`, 'success');
  
  if (newMode === 'demo') {
    appState.documents = JSON.parse(JSON.stringify(mockDocuments));
  } else {
    appState.documents = [];
  }
  
  if (appState.currentUser) syncData(true);
}

function setModeUI(mode) {
  if (elements.btnLiveMode && elements.btnDemoMode) {
    if (mode === 'live') {
      elements.btnLiveMode.className = "px-3 py-1 rounded-full bg-brandpurple-600 text-white font-semibold shadow-md shadow-brandpurple-500/20 transition-all duration-200";
      elements.btnDemoMode.className = "px-3 py-1 rounded-full text-[var(--text-muted)] font-semibold hover:text-[var(--text)] transition-all duration-200";
    } else {
      elements.btnDemoMode.className = "px-3 py-1 rounded-full bg-brandpurple-600 text-white font-semibold shadow-md shadow-brandpurple-500/20 transition-all duration-200";
      elements.btnLiveMode.className = "px-3 py-1 rounded-full text-[var(--text-muted)] font-semibold hover:text-[var(--text)] transition-all duration-200";
    }
  }
}

// Toast Notification
function showToast(message, type = 'info') {
  if (!elements.toast || !elements.toastMessage) return;

  elements.toastMessage.innerText = message;
  elements.toast.className = "fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl border shadow-2xl transition-all duration-300 transform translate-y-0 opacity-100 max-w-sm backdrop-blur-md";
  
  if (type === 'success') {
    elements.toastIcon.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    elements.toast.classList.add('bg-brandpurple-500/10', 'border-brandpurple-500/20', 'text-brandpurple-300');
  } else if (type === 'error') {
    elements.toastIcon.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i>';
    elements.toast.classList.add('bg-brandwine-500/10', 'border-brandwine-500/20', 'text-brandwine-300');
  } else if (type === 'warning') {
    elements.toastIcon.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i>';
    elements.toast.classList.add('bg-brandgold-500/10', 'border-brandgold-500/20', 'text-brandgold-300');
  } else {
    elements.toastIcon.innerHTML = '<i class="fa-solid fa-circle-info"></i>';
    elements.toast.classList.add('bg-brandpurple-500/10', 'border-brandpurple-500/20', 'text-brandpurple-300');
  }

  setTimeout(() => {
    elements.toast.classList.add('translate-y-12', 'opacity-0');
    elements.toast.classList.remove('translate-y-0', 'opacity-100');
  }, 4000);
}

// Health Check Logic
async function checkHealth() {
  if (appState.mode === 'demo') {
    updateHealthUI(true, "n8n aktif (Demo Mode)");
    return;
  }

  const endpoint = `${appState.webhookUrl}/get-pending-docs`;
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: authHeaders(),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);

    if (response.status === 200 || response.ok) {
      updateHealthUI(true, "n8n Aktif");
    } else {
      updateHealthUI(false, `n8n Gagal (${response.status})`);
    }
  } catch (error) {
    let reason = "Koneksi Gagal / Timeout";
    if (error.name === 'AbortError') reason = "Koneksi Timeout";
    updateHealthUI(false, `n8n Offline: ${reason}`);
  }
}

function updateHealthUI(online, text) {
  appState.isOnline = online;
  if (elements.healthText) elements.healthText.innerText = text;
  
  if (elements.healthBadge) {
    const dot = elements.healthBadge.querySelector('span:first-child');
    if (online) {
      elements.healthBadge.className = "flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-brandpurple-500/20 bg-brandpurple-500/10 text-brandpurple-300 text-xs font-semibold select-none shrink-0";
      if (dot) dot.className = "w-2.5 h-2.5 rounded-full pulse-dot-green";
      if (elements.offlineAlert) elements.offlineAlert.classList.add('hidden');
      document.querySelectorAll('.btn-action-trigger').forEach(btn => {
        if (appState.currentUser && appState.currentUser.role === 'admin') {
          btn.removeAttribute('disabled');
          btn.classList.remove('opacity-50', 'cursor-not-allowed');
        }
      });
    } else {
      elements.healthBadge.className = "flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-brandwine-500/20 bg-brandwine-500/10 text-brandwine-300 text-xs font-semibold select-none shrink-0 animate-bounce";
      if (dot) dot.className = "w-2.5 h-2.5 rounded-full pulse-dot-red";
      
      const humorMsg = offlineHumors[Math.floor(Math.random() * offlineHumors.length)];
      if (elements.offlineAlert) {
        elements.offlineAlert.querySelector('h4').innerText = "Server n8n Tidak Terhubung";
        elements.offlineAlert.querySelector('p').innerText = humorMsg;
        if (elements.offlineErrorDetails) elements.offlineErrorDetails.innerText = `Endpoint: ${appState.webhookUrl}/get-pending-docs`;
        elements.offlineAlert.classList.remove('hidden');
      }
      
      document.querySelectorAll('.btn-action-trigger').forEach(btn => {
        btn.setAttribute('disabled', 'true');
        btn.classList.add('opacity-50', 'cursor-not-allowed');
      });
    }
  }
}

// Sync Data (Silent Auto-Sync Without Flicker)
async function syncData(manualTrigger = false) {
  if (manualTrigger) {
    if (elements.refreshIcon) elements.refreshIcon.classList.add('fa-spin');
    if (appState.documents.length === 0) {
      showLoading(true);
    }
  }

  await checkHealth();

  if (appState.mode === 'demo') {
    if (appState.documents.length === 0) {
      appState.documents = JSON.parse(JSON.stringify(mockDocuments));
    }
    
    setTimeout(() => {
      renderDocs();
      showLoading(false);
      if (manualTrigger) {
        if (elements.refreshIcon) elements.refreshIcon.classList.remove('fa-spin');
        showToast("Sinkronisasi sukses! Data v2.0 dimuat.", "success");
      }
    }, manualTrigger ? 500 : 0);
    return;
  }

  if (!appState.isOnline) {
    showLoading(false);
    renderDocs();
    if (manualTrigger) {
      if (elements.refreshIcon) elements.refreshIcon.classList.remove('fa-spin');
      showToast("Koneksi n8n offline. Gagal mengambil data terbaru.", "error");
    }
    return;
  }

  const endpoint = `${appState.webhookUrl}/get-pending-docs`;
  try {
    const response = await fetch(endpoint, { headers: authHeaders() });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    
    if (Array.isArray(data)) {
      appState.documents = data;
    } else {
      console.error("Payload from n8n is not an array:", data);
      appState.documents = [];
    }
    
    renderDocs();
    if (manualTrigger) showToast("Sinkronisasi data Google Sheets v2.0 sukses!", "success");
  } catch (error) {
    console.error("Gagal sinkronisasi data:", error);
    if (manualTrigger) showToast("Gagal mengambil data dari Google Sheets via n8n.", "error");
  } finally {
    showLoading(false);
    if (manualTrigger && elements.refreshIcon) elements.refreshIcon.classList.remove('fa-spin');
  }
}

function showLoading(loading) {
  if (!elements.loadingState || !elements.documentGrid || !elements.emptyState) return;

  if (loading) {
    elements.loadingState.classList.remove('hidden');
    elements.documentGrid.classList.add('hidden');
    elements.emptyState.classList.add('hidden');
  } else {
    elements.loadingState.classList.add('hidden');
    elements.documentGrid.classList.remove('hidden');
  }
}

// Format Spesifikasi_Check: pipe-separated → list items with label coloring
function formatSpesifikasi(raw) {
  if (!raw) return '<li class="text-[var(--text-muted)] italic">Tidak ada data spesifikasi.</li>';
  return raw.split('|').map(item => {
    const trimmed = item.trim();
    if (!trimmed) return '';
    const colonIdx = trimmed.indexOf(':');
    if (colonIdx !== -1) {
      const label = trimmed.substring(0, colonIdx).trim();
      const value = trimmed.substring(colonIdx + 1).trim();
      return `<li class="flex items-start gap-1.5">
        <span class="shrink-0 mt-0.5 w-1.5 h-1.5 rounded-full bg-brandgold-400/60 inline-block"></span>
        <span><span class="font-extrabold text-brandgold-300">${label}:</span> ${value}</span>
      </li>`;
    }
    return `<li class="flex items-start gap-1.5">
      <span class="shrink-0 mt-0.5 w-1.5 h-1.5 rounded-full bg-brandgold-400/60 inline-block"></span>
      <span>${trimmed}</span>
    </li>`;
  }).join('');
}

// Extract Google Drive File ID from a Drive link, or use raw ID
function extractDriveFileId(link, rawFileId) {
  if (link && link.includes('/d/')) {
    const match = link.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match) return match[1];
  }
  if (rawFileId && rawFileId !== 'gdrive-file-001' && rawFileId !== 'gdrive-file-002'
      && rawFileId !== 'gdrive-file-003' && rawFileId !== 'gdrive-file-004') {
    return rawFileId;
  }
  return null;
}

// Open Document Preview Modal with Google Drive iframe
function openDocPreview(taskId, fileName, gdriveLink, fileId) {
  const fileIdResolved = extractDriveFileId(gdriveLink, fileId);

  if (!elements.docPreviewModal) return;

  // Reset loading state
  if (elements.docPreviewLoading) elements.docPreviewLoading.style.display = '';

  // Set filename label
  if (elements.docPreviewFilename) elements.docPreviewFilename.innerText = `${taskId} — ${fileName}`;

  // Set "Buka di Drive" link (original file link)
  if (elements.docPreviewOpenLink) {
    elements.docPreviewOpenLink.href = gdriveLink !== '#' ? gdriveLink : '#';
  }

  // Build iframe preview URL
  if (elements.docPreviewIframe) {
    if (fileIdResolved) {
      elements.docPreviewIframe.src = `https://drive.google.com/file/d/${fileIdResolved}/preview`;
    } else {
      // Fallback: no valid ID → show message inside iframe area
      elements.docPreviewIframe.src = '';
      if (elements.docPreviewLoading) {
        elements.docPreviewLoading.innerHTML = `
          <i class="fa-solid fa-triangle-exclamation text-2xl text-brandgold-400"></i>
          <p class="text-xs text-center px-4">Preview tidak tersedia.<br>File ID tidak valid atau belum dikonfigurasi.<br>
          <a href="${gdriveLink}" target="_blank" class="text-brandgold-400 underline mt-1 inline-block">Buka dokumen di Google Drive</a></p>`;
        elements.docPreviewLoading.style.display = '';
      }
    }
  }

  elements.docPreviewModal.classList.remove('hidden');
  setTimeout(() => elements.docPreviewModal.classList.remove('opacity-0'), 50);
}

// Close Document Preview Modal
function closeDocPreview() {
  if (!elements.docPreviewModal) return;
  elements.docPreviewModal.classList.add('hidden');
  // Clear iframe src to stop loading / save bandwidth
  if (elements.docPreviewIframe) elements.docPreviewIframe.src = '';
}

// Render Document Cards According to Active Status Tab
function updateStatusCounters(counts) {
  const counterMap = [
    ['badgePendingCount', 'statPendingCount', counts.pending],
    ['badgeApprovedCount', 'statApprovedCount', counts.approved],
    ['badgeRevisedCount', 'statRevisedCount', counts.revised],
    ['badgeRejectedCount', 'statRejectedCount', counts.rejected],
    ['badgeArchivedCount', 'statArchivedCount', counts.archived]
  ];

  counterMap.forEach(([tabKey, statKey, value]) => {
    if (elements[tabKey]) elements[tabKey].innerText = value;
    if (elements[statKey]) elements[statKey].innerText = value;
  });
}

function renderDocs() {
  if (!elements.documentGrid) return;
  elements.documentGrid.innerHTML = '';

  const archivedDocuments = appState.documents.filter(doc => hasValidReferTaskReference(doc));
  const visibleDocuments = appState.documents.filter(doc => !hasValidReferTaskReference(doc));
  const searchVal = appState.filters.search.toLowerCase();
  const activeTabStatus = appState.activeTab.toLowerCase();

  const pendingDocs = visibleDocuments.filter(d => (d.Status || d.status || 'Pending').toLowerCase() === 'pending');
  const approvedDocs = visibleDocuments.filter(d => (d.Status || d.status || '').toLowerCase() === 'approved');
  const revisedDocs = visibleDocuments.filter(d => (d.Status || d.status || '').toLowerCase() === 'needs revision');
  const rejectedDocs = visibleDocuments.filter(d => (d.Status || d.status || '').toLowerCase() === 'rejected');
  const archivedDocs = archivedDocuments;

  updateStatusCounters({
    pending: pendingDocs.length,
    approved: approvedDocs.length,
    revised: revisedDocs.length,
    rejected: rejectedDocs.length,
    archived: archivedDocs.length
  });

  populateReferTaskDatalist();

  const currentTabDocs = activeTabStatus === 'archived' ? archivedDocuments : visibleDocuments;
  const filteredDocs = currentTabDocs.filter(doc => {
    const fileName = doc.File_Name || doc.filename || '';
    const taskId = doc.Task_ID || doc.id || '';
    const aiNotes = doc.AI_Notes || doc.key_points || '';

    const nameMatch = fileName.toLowerCase().includes(searchVal) ||
      taskId.toLowerCase().includes(searchVal) ||
      aiNotes.toLowerCase().includes(searchVal);

    const docStatus = (doc.Status || doc.status || 'Pending').toLowerCase();
    const statusMatch = activeTabStatus === 'archived' ? true : docStatus === activeTabStatus;

    return nameMatch && statusMatch;
  });

  if (filteredDocs.length === 0) {
    if (elements.emptyState) {
      elements.emptyState.classList.remove('hidden');
      if (elements.emptyStateMessage) {
        elements.emptyStateMessage.innerText = `Tidak ada dokumen pada tab "${activeTabStatus.toUpperCase()}" saat ini.`;
      }
    }
    elements.documentGrid.classList.add('hidden');
    return;
  }

  if (elements.emptyState) elements.emptyState.classList.add('hidden');
  elements.documentGrid.classList.remove('hidden');

  const isAdmin = appState.currentUser.role === 'admin';

  filteredDocs.forEach((doc, index) => {
    const card = document.createElement('div');
    const taskId = doc.Task_ID || doc.id || `TASK-${index+100}`;
    const fileName = doc.File_Name || doc.filename || 'Dokumen';
    const fileSize = doc.File_Size || doc.file_size || 'N/A';
    const gdriveLink = doc.File_Link || doc.gdrive_link || '#';
    const isReapplication = doc.Is_Reapplication ? 'Ya (Revisi)' : 'Tidak (Pengajuan Baru)';
    const referTaskId = doc.Refer_Task_ID && doc.Refer_Task_ID !== '-' ? doc.Refer_Task_ID : null;
    const docStatus = (doc.Status || doc.status || 'Pending').toLowerCase();
    const adminNotes = doc.Admin_Notes || doc.admin_notes || (docStatus === 'rejected' ? 'Tidak ada alasan penolakan yang tercatat.' : docStatus === 'needs revision' ? 'Belum ada catatan revisi dari admin.' : 'Tidak ada catatan.');
    const decisionNotesLabel = docStatus === 'rejected' ? 'Catatan Penolakan' : docStatus === 'needs revision' ? 'Catatan Revisi' : null;
    const showDecisionNotes = docStatus === 'rejected' || docStatus === 'needs revision';
    const pengesahanValue = getPengesahanValue(doc);
    const pengesahanClass = getPengesahanStyle(pengesahanValue);
    const showActionButtons = docStatus === 'pending';

    card.id = `card-${taskId}`;
    card.className = "glass-panel p-5 md:p-6 rounded-3xl border border-white/5 flex flex-col justify-between hover:border-brandgold-500/30 transition-all duration-300 animate-fade-in-up";
    card.style.animationDelay = `${index * 50}ms`;

    const iconClass = 'fa-file-lines text-brandgold-400 bg-brandgold-500/10 border-brandgold-500/20';

    const actionDisabled = (!appState.isOnline && appState.mode === 'live') || !isAdmin ? 'disabled' : '';
    const btnClasses = (!appState.isOnline && appState.mode === 'live') || !isAdmin ? 'opacity-50 cursor-not-allowed' : '';

    card.innerHTML = `
      <div>
        <div class="flex items-center justify-between border-b border-brandgold-500/10 pb-4 mb-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl border flex items-center justify-center text-lg ${iconClass}">
              <i class="fa-solid"></i>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-brandgold-500/20 text-brandgold-300 border border-brandgold-500/30">${taskId}</span>
                <h4 class="text-xs md:text-sm font-bold text-[var(--text)] truncate max-w-[150px] sm:max-w-[220px]" title="${fileName}">${fileName}</h4>
              </div>
              <span class="text-[10px] text-[var(--text-muted)] uppercase font-bold tracking-wider mt-0.5 block">${fileSize}</span>
            </div>
          </div>
          <span class="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brandgold-500/15 border border-brandgold-500/30 text-brandgold-300">
            ${doc.Status || 'Pending'}
          </span>
        </div>

        <div class="space-y-3.5 text-xs">
          <div>
            <span class="text-[10px] uppercase font-extrabold tracking-wider text-brandgold-400 font-mono block">1. Spesifikasi Check </span>
            <ul class="text-xs text-[var(--text)] mt-1 font-medium bg-white/5 p-2.5 rounded-xl border border-white/5 leading-relaxed space-y-1 list-none">
              ${formatSpesifikasi(doc.Spesifikasi_Check || 'Mutu & Teknis Sesuai Standard')}
            </ul>
          </div>

          <div>
            <span class="text-[10px] uppercase font-extrabold tracking-wider text-brandgold-400 font-mono block">2. Kelengkapan TOR</span>
            <div class="mt-1">
              <span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-brandpurple-500/10 border border-brandpurple-500/20 text-brandpurple-300">
                ${doc.TOR_Completeness || 'Lengkap (10/10 Bab Terpenuhi)'}
              </span>
            </div>
          </div>

          <div>
            <span class="text-[10px] uppercase font-extrabold tracking-wider text-brandgold-400 font-mono block">3. Catatan Tambahan AI</span>
            <p class="text-xs text-[var(--text)] mt-1 leading-relaxed italic">
              "${doc.AI_Notes || doc.key_points || 'Tidak ada catatan khusus.'}"
            </p>
          </div>

          ${showDecisionNotes ? `
            <div>
              <span class="text-[10px] uppercase font-extrabold tracking-wider text-brandgold-400 font-mono block">4. ${decisionNotesLabel}</span>
              <p class="text-xs text-[var(--text)] mt-1 leading-relaxed italic">
                "${adminNotes}"
              </p>
            </div>
          ` : ''}

          <div class="pt-1 border-t border-white/5 mt-1">
            <div class="flex items-center justify-between gap-2">
              <span class="text-[10px] uppercase font-extrabold tracking-wider text-brandgold-400 font-mono">${showDecisionNotes ? '5' : '4'}. Pengesahan</span>
              <span class="px-2 py-1 rounded-full text-[10px] font-semibold ${pengesahanClass}">${pengesahanValue}</span>
            </div>
          </div>

          <div class="flex flex-wrap items-center justify-between gap-2 pt-1">
            <span class="text-[10px] text-[var(--text-muted)]">
              Pengajuan Ulang: <strong class="${doc.Is_Reapplication ? 'text-brandwine-400' : 'text-stone-300'}">${isReapplication}</strong>
            </span>
            ${referTaskId ? `<span class="text-[10px] bg-brandpurple-500/20 text-brandpurple-300 border border-brandpurple-500/30 px-2 py-0.5 rounded font-mono">Ref: ${referTaskId}</span>` : ''}
          </div>
        </div>
      </div>

      <div class="flex flex-wrap sm:flex-nowrap gap-2 pt-5 border-t border-brandgold-500/10 mt-5">
        ${showActionButtons ? `
          <button onclick="openActionModal('${taskId}', 'approve')" ${actionDisabled} class="btn-action-trigger ${btnClasses} flex-1 min-h-[40px] px-3 py-2 bg-brandpurple-600 hover:bg-brandpurple-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all duration-300 active:scale-95" title="${isAdmin ? 'Approve Document' : 'Read-Only Mode'}">
            <i class="fa-solid fa-check"></i>
            <span>Approve</span>
          </button>

          <button onclick="openActionModal('${taskId}', 'revise')" ${actionDisabled} class="btn-action-trigger ${btnClasses} flex-1 min-h-[40px] px-3 py-2 bg-brandgold-600/20 hover:bg-brandgold-600 border border-brandgold-500/30 hover:border-brandgold-500 text-brandgold-300 hover:text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all duration-300 active:scale-95" title="${isAdmin ? 'Minta Revisi' : 'Read-Only Mode'}">
            <i class="fa-regular fa-pen-to-square"></i>
            <span>Revisi</span>
          </button>

          <button onclick="openActionModal('${taskId}', 'reject')" ${actionDisabled} class="btn-action-trigger ${btnClasses} flex-1 min-h-[40px] px-3 py-2 bg-brandwine-600/20 hover:bg-brandwine-600 border border-brandwine-500/30 hover:border-brandwine-500 text-brandwine-300 hover:text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all duration-300 active:scale-95" title="${isAdmin ? 'Tolak Dokumen' : 'Read-Only Mode'}">
            <i class="fa-solid fa-xmark"></i>
            <span>Tolak</span>
          </button>
        ` : ''}

        ${referTaskId ? `
          <button onclick="compareRevision('${taskId}', '${referTaskId}')" class="min-h-[40px] ${showActionButtons ? 'w-[40px]' : 'flex-1'} rounded-xl bg-brandpurple-500/10 border border-brandpurple-500/25 text-brandpurple-300 hover:bg-brandpurple-500/20 transition-all duration-200 flex items-center justify-center shrink-0" title="Bandingkan Catatan Revisi (AI)">
            <i class="fa-solid fa-wand-magic-sparkles text-xs"></i>
            ${showActionButtons ? '' : '<span class="ml-2 text-[10px] font-bold">Bandingkan AI</span>'}
          </button>
        ` : ''}

        <button onclick="openDocPreview('${taskId}', '${fileName}', '${gdriveLink}', '${doc.File_ID || ''}')" class="${showActionButtons ? 'min-h-[40px] w-[40px]' : 'flex-1 min-h-[40px]'} rounded-xl bg-white/5 border border-brandgold-500/20 text-[var(--text-muted)] hover:text-brandgold-300 hover:bg-brandgold-500/10 transition-all duration-200 flex items-center justify-center shrink-0" title="Preview Dokumen">
          <i class="fa-solid fa-eye text-xs"></i>
          ${showActionButtons ? '' : '<span class="ml-2 text-[10px] font-bold">Preview</span>'}
        </button>
      </div>
    `;

    elements.documentGrid.appendChild(card);
  });
}

// Action Trigger: Approve (Direct Single POST Webhook Engine)
async function approveDocument(taskId) {
  if (!appState.currentUser || appState.currentUser.role !== 'admin') {
    showToast("Akses Ditolak: Hanya Admin yang dapat menyetujui dokumen!", "error");
    return;
  }

  const card = document.getElementById(`card-${taskId}`);
  if (card) card.querySelectorAll('button').forEach(btn => btn.setAttribute('disabled', 'true'));

  if (appState.mode === 'demo') {
    simulateSuccessAction(taskId, 'approve');
    return;
  }

  const doc = appState.documents.find(d => (d.Task_ID || d.id) === taskId);
  const referTaskId = normalizeReferTaskValue(doc ? (doc.Refer_Task_ID ?? doc.refer_task_id) : '') || '-';

  const endpoint = `${appState.webhookUrl}/update-doc-status`;
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { ...authHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify({
        task_id: taskId,
        action: 'approve',
        admin_notes: 'Disetujui oleh Admin',
        refer_task_id: referTaskId
      })
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    animateCardOut(taskId, () => {
      const doc = appState.documents.find(d => (d.Task_ID || d.id) === taskId);
      if (doc) doc.Status = 'Approved';
      renderDocs();
      showToast(`Task ${taskId} berhasil disetujui!`, "success");
    });
  } catch (error) {
    console.error("Gagal approve dokumen:", error);
    showToast("Gagal mengirim persetujuan ke server n8n.", "error");
    if (card) card.querySelectorAll('button').forEach(btn => btn.removeAttribute('disabled'));
  }
}

// Dynamic Action Modal Handling (Approve / Revisi / Tolak with searchable Refer Task ID)
function openActionModal(taskId, actionType) {
  if (!appState.currentUser || appState.currentUser.role !== 'admin') {
    showToast("Akses Ditolak: Hanya Admin yang dapat memproses aksi ini!", "error");
    return;
  }

  const doc = appState.documents.find(d => (d.Task_ID || d.id) === taskId);
  if (!doc) return;

  appState.pendingActionDocId = taskId;
  appState.pendingActionType = actionType;

  if (elements.actionModalFilename) {
    elements.actionModalFilename.innerText = `${taskId} — ${doc.File_Name || doc.filename}`;
  }

  const modalIconWrap = elements.modalIcon ? elements.modalIcon.closest('div') : null;

  if (actionType === 'approve') {
    if (elements.modalIcon) elements.modalIcon.className = "fa-solid fa-check text-sm";
    if (modalIconWrap) modalIconWrap.className = "w-9 h-9 rounded-lg bg-brandpurple-500/10 border border-brandpurple-500/30 flex items-center justify-center text-brandpurple-400 shrink-0";
    if (elements.modalTitle) elements.modalTitle.innerText = "Persetujuan Dokumen";
    if (elements.lblActionNotes) elements.lblActionNotes.innerText = "Catatan persetujuan atau keterangan tambahan";
    if (elements.btnSubmitActionText) elements.btnSubmitActionText.innerText = "Konfirmasi Approve";
  } else if (actionType === 'revise') {
    if (elements.modalIcon) elements.modalIcon.className = "fa-regular fa-pen-to-square text-sm";
    if (modalIconWrap) modalIconWrap.className = "w-9 h-9 rounded-lg bg-brandgold-500/10 border border-brandgold-500/30 flex items-center justify-center text-brandgold-400 shrink-0";
    if (elements.modalTitle) elements.modalTitle.innerText = "Instruksi Revisi Dokumen";
    if (elements.lblActionNotes) elements.lblActionNotes.innerText = "Catatan instruksi revisi untuk n8n / AI";
    if (elements.btnSubmitActionText) elements.btnSubmitActionText.innerText = "Kirim Instruksi Revisi";
  } else {
    if (elements.modalIcon) elements.modalIcon.className = "fa-solid fa-xmark text-sm";
    if (modalIconWrap) modalIconWrap.className = "w-9 h-9 rounded-lg bg-brandwine-500/10 border border-brandwine-500/30 flex items-center justify-center text-brandwine-400 shrink-0";
    if (elements.modalTitle) elements.modalTitle.innerText = "Alasan Penolakan Dokumen";
    if (elements.lblActionNotes) elements.lblActionNotes.innerText = "Alasan penolakan dokumen (wajib diisi)";
    if (elements.btnSubmitActionText) elements.btnSubmitActionText.innerText = "Konfirmasi Tolak";
  }

  if (elements.referTaskContainer) elements.referTaskContainer.classList.remove('hidden');
  if (elements.referTaskIdInput) {
    const existingReferTask = normalizeReferTaskValue(doc.Refer_Task_ID ?? doc.refer_task_id);
    elements.referTaskIdInput.value = existingReferTask || '';
    elements.referTaskIdInput.setAttribute('list', 'refer-task-datalist');
    elements.referTaskIdInput.oninput = () => {
      updateReferTaskInfo();
      updateCompareActionVisibility();
    };
  }

  populateReferTaskDatalist();
  updateReferTaskInfo();
  updateCompareActionVisibility();

  if (elements.actionNotes) elements.actionNotes.value = '';

  if (elements.actionModal) {
    elements.actionModal.classList.remove('hidden');
    setTimeout(() => elements.actionModal.classList.remove('opacity-0'), 50);
  }
}

function closeActionModal() {
  if (elements.actionModal) {
    elements.actionModal.classList.add('opacity-0');
    setTimeout(() => {
      elements.actionModal.classList.add('hidden');
      appState.pendingActionDocId = null;
      appState.pendingActionType = null;
    }, 300);
  }
}

async function submitActionModal() {
  const notes = elements.actionNotes ? elements.actionNotes.value.trim() : '';
  const taskId = appState.pendingActionDocId;
  const actionType = appState.pendingActionType;
  const referTaskId = elements.referTaskIdInput ? elements.referTaskIdInput.value.trim() : '';

  if (!taskId || !actionType) {
    showToast("Tidak ada dokumen yang diproses. Silakan pilih aksi lagi.", "error");
    return;
  }

  if (!notes) {
    showToast(`Harap isi catatan ${actionType === 'revise' ? 'instruksi revisi' : actionType === 'approve' ? 'persetujuan' : 'alasan penolakan'}!`, "error");
    return;
  }

  if (elements.btnSubmitAction) {
    elements.btnSubmitAction.setAttribute('disabled', 'true');
    elements.btnSubmitAction.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Mengirim...</span>`;
  }

  const normalizedReferTaskId = normalizeReferTaskValue(referTaskId) || '-';

  if (appState.mode === 'demo') {
    setTimeout(() => {
      closeActionModal();
      simulateSuccessAction(taskId, actionType);
      if (elements.btnSubmitAction) {
        elements.btnSubmitAction.removeAttribute('disabled');
        elements.btnSubmitAction.innerHTML = `<i class="fa-solid fa-paper-plane"></i> <span id="btn-submit-action-text">Kirim Instruksi</span>`;
      }
    }, 600);
    return;
  }

  const endpoint = `${appState.webhookUrl}/update-doc-status`;
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { ...authHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify({
        task_id: taskId,
        action: actionType,
        admin_notes: notes,
        refer_task_id: normalizedReferTaskId
      })
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    closeActionModal();
    animateCardOut(taskId, () => {
      const doc = appState.documents.find(d => (d.Task_ID || d.id) === taskId);
      if (doc) {
        doc.Status = actionType === 'approve' ? 'Approved' : actionType === 'revise' ? 'Needs Revision' : 'Rejected';
      }
      if (actionType === 'approve') {
        showToast(`Dokumen ${taskId} berhasil disetujui!`, "success");
      } else if (actionType === 'revise') {
        showToast(`Instruksi revisi ${taskId} berhasil dikirim ke n8n!`, "success");
      } else {
        showToast(`Dokumen ${taskId} telah ditolak.`, "warning");
      }
      renderDocs();
    });
  } catch (error) {
    console.error("Gagal memproses aksi webhook:", error);
    showToast("Gagal mengirim data ke server n8n.", "error");
  } finally {
    if (elements.btnSubmitAction) {
      elements.btnSubmitAction.removeAttribute('disabled');
      elements.btnSubmitAction.innerHTML = `<i class="fa-solid fa-paper-plane"></i> <span id="btn-submit-action-text">Kirim Instruksi</span>`;
    }
  }
}

function openUploadModal() {
  if (!elements.uploadModal) return;
  if (elements.uploadFileError) elements.uploadFileError.classList.add('hidden');
  elements.uploadModal.classList.remove('hidden');
  setTimeout(() => elements.uploadModal.classList.remove('opacity-0'), 50);
}

function closeUploadModal() {
  if (!elements.uploadModal) return;
  elements.uploadModal.classList.add('opacity-0');
  setTimeout(() => elements.uploadModal.classList.add('hidden'), 300);
}

function setUploadError(message) {
  if (!elements.uploadFileError) return;
  elements.uploadFileError.innerText = message;
  elements.uploadFileError.classList.toggle('hidden', !message);
}

function validateUploadFile(file) {
  if (!file) return 'Pilih file KAK/TOR terlebih dahulu.';
  if (file.size > 5 * 1024 * 1024) return 'Ukuran file terlalu besar! Maksimal 5 MB.';

  const allowedExtensions = ['pdf', 'doc', 'docx'];
  const extension = file.name.split('.').pop().toLowerCase();
  if (!allowedExtensions.includes(extension)) return 'Format file tidak didukung. Gunakan PDF, DOC, atau DOCX.';
  return '';
}

function handleUploadFileChange() {
  const file = elements.uploadFile ? elements.uploadFile.files[0] : null;
  const error = validateUploadFile(file);
  setUploadError(error);
  if (elements.uploadFileLabel) {
    elements.uploadFileLabel.innerText = file && !error ? `${file.name} (${formatBytes(file.size)})` : 'Pilih file KAK / TOR';
  }
}

function handleUploadDragOver(event) {
  event.preventDefault();
  if (event.dataTransfer) event.dataTransfer.dropEffect = 'copy';
  if (elements.uploadDropzone) elements.uploadDropzone.classList.add('is-dragging');
}

function handleUploadDragLeave(event) {
  event.preventDefault();
  if (elements.uploadDropzone && !elements.uploadDropzone.contains(event.relatedTarget)) {
    elements.uploadDropzone.classList.remove('is-dragging');
  }
}

function handleUploadDrop(event) {
  event.preventDefault();
  if (elements.uploadDropzone) elements.uploadDropzone.classList.remove('is-dragging');

  const file = event.dataTransfer && event.dataTransfer.files[0];
  if (!file || !elements.uploadFile) return;

  const fileTransfer = new DataTransfer();
  fileTransfer.items.add(file);
  elements.uploadFile.files = fileTransfer.files;
  handleUploadFileChange();
}

function formatBytes(bytes) {
  if (!bytes) return '0 B';
  const units = ['B', 'KB', 'MB'];
  const unitIndex = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / (1024 ** unitIndex)).toFixed(unitIndex ? 1 : 0)} ${units[unitIndex]}`;
}

async function submitUpload(event) {
  if (event) event.preventDefault();
  const file = elements.uploadFile ? elements.uploadFile.files[0] : null;
  const validationError = validateUploadFile(file);
  if (validationError) {
    setUploadError(validationError);
    showToast(validationError, 'error');
    return;
  }

  if (elements.btnSubmitUpload) {
    elements.btnSubmitUpload.disabled = true;
    elements.btnSubmitUpload.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i><span>Mengunggah...</span>';
  }

  if (appState.mode === 'demo') {
    setTimeout(() => {
      closeUploadModal();
      showToast('Simulasi upload KAK berhasil. Data diperbarui.', 'success');
      if (elements.btnSubmitUpload) resetUploadButton();
    }, 700);
    return;
  }

  const formData = new FormData();
  formData.append('data', file);
  formData.append('action', 'TOR');

  try {
    const response = await fetch(`${appState.webhookUrl}/upload-dokumen`, {
      method: 'POST',
      headers: authHeaders(),
      body: formData
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    closeUploadModal();
    showToast('Upload KAK berhasil dikirim ke n8n.', 'success');
    await syncData(true);
  } catch (error) {
    console.error('Gagal upload KAK/TOR:', error);
    showToast('Upload gagal. Periksa koneksi n8n dan coba lagi.', 'error');
  } finally {
    resetUploadButton();
  }
}

function resetUploadButton() {
  if (!elements.btnSubmitUpload) return;
  elements.btnSubmitUpload.disabled = false;
  elements.btnSubmitUpload.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i><span>Upload Dokumen</span>';
}

function openCompareModal() {
  if (!elements.compareModal) return;
  elements.compareModal.classList.remove('hidden');
  setTimeout(() => elements.compareModal.classList.remove('opacity-0'), 50);
}

function closeCompareModal() {
  if (!elements.compareModal) return;
  elements.compareModal.classList.add('opacity-0');
  setTimeout(() => elements.compareModal.classList.add('hidden'), 300);
}

function renderCompareResult(result) {
  const accepted = result.status_revisi === 'REVISI_DITERIMA';
  if (elements.compareStatus) {
    elements.compareStatus.innerText = result.status_revisi || 'STATUS TIDAK TERSEDIA';
    elements.compareStatus.className = `compare-status-badge ${accepted ? 'compare-status-accepted' : 'compare-status-revision'}`;
  }
  if (elements.compareVerified) elements.compareVerified.innerText = result.perbaikan_terverifikasi || 'Tidak ada poin yang terverifikasi.';
  if (elements.compareRemaining) elements.compareRemaining.innerText = result.kekurangan_tersisa || 'Nihil';
  if (elements.compareSummary) elements.compareSummary.innerText = result.ringkasan_analisis || 'Tidak ada ringkasan analisis.';
}

async function compareRevision(taskId, referTaskId) {
  const normalizedReferTaskId = normalizeReferTaskValue(referTaskId);
  if (!taskId || !normalizedReferTaskId) {
    showToast('Refer Task ID diperlukan untuk komparasi revisi.', 'error');
    return;
  }

  if (elements.compareTaskLabel) elements.compareTaskLabel.innerText = `${taskId} dibandingkan dengan ${normalizedReferTaskId}`;
  if (elements.compareResult) elements.compareResult.classList.add('hidden');
  if (elements.compareLoading) elements.compareLoading.classList.remove('hidden');
  openCompareModal();

  if (appState.mode === 'demo') {
    setTimeout(() => {
      renderCompareResult({
        status_revisi: 'REVISI_DITERIMA',
        perbaikan_terverifikasi: 'Catatan revisi utama sudah ditindaklanjuti pada dokumen baru.',
        kekurangan_tersisa: 'Nihil',
        ringkasan_analisis: 'Simulasi Gemini: dokumen baru memenuhi perbaikan yang diminta.'
      });
      if (elements.compareLoading) elements.compareLoading.classList.add('hidden');
      if (elements.compareResult) elements.compareResult.classList.remove('hidden');
    }, 700);
    return;
  }

  try {
    const response = await fetch(`${appState.webhookUrl}/update-doc-status`, {
      method: 'POST',
      headers: { ...authHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'compare-revision', task_id: taskId, refer_task_id: normalizedReferTaskId })
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const result = await response.json();
    if (!result.success) throw new Error('n8n mengembalikan status gagal.');
    renderCompareResult(result);
  } catch (error) {
    console.error('Gagal membandingkan revisi:', error);
    closeCompareModal();
    showToast('Komparasi revisi gagal diproses oleh n8n.', 'error');
  } finally {
    if (elements.compareLoading) elements.compareLoading.classList.add('hidden');
    if (elements.compareResult) elements.compareResult.classList.remove('hidden');
  }
}

function compareRevisionFromActionModal() {
  const taskId = appState.pendingActionDocId;
  const referTaskId = elements.referTaskIdInput ? elements.referTaskIdInput.value : '';
  closeActionModal();
  compareRevision(taskId, referTaskId);
}

// Local Simulation Helper (Demo Mode)
function simulateSuccessAction(taskId, action) {
  animateCardOut(taskId, () => {
    const doc = appState.documents.find(d => (d.Task_ID || d.id) === taskId);
    
    if (action === 'approve') {
      if (doc) doc.Status = 'Approved';
      showToast(`Simulasi: ${taskId} disetujui & status diubah ke 'Approved'!`, "success");
    } else if (action === 'reject') {
      if (doc) doc.Status = 'Rejected';
      showToast(`Simulasi: ${taskId} ditolak & status diubah ke 'Rejected'!`, "warning");
    } else {
      if (doc) doc.Status = 'Needs Revision';
      showToast(`Simulasi: Instruksi revisi dikirim. Status diubah ke 'Needs Revision'!`, "success");
    }
    renderDocs();
  });
}

function animateCardOut(taskId, callback) {
  const card = document.getElementById(`card-${taskId}`);
  if (card) {
    card.classList.remove('animate-fade-in-up');
    card.classList.add('animate-fade-out-down');
    setTimeout(callback, 300);
  } else {
    callback();
  }
}

// Settings Modal Handling
function openSettings() {
  if (elements.webhookUrlInput) elements.webhookUrlInput.value = appState.webhookUrl;
  updateEndpointLabels(appState.webhookUrl);
  
  if (elements.settingsModal) {
    elements.settingsModal.classList.remove('hidden');
    setTimeout(() => elements.settingsModal.classList.remove('opacity-0'), 50);
  }
}

function closeSettings() {
  if (elements.settingsModal) {
    elements.settingsModal.classList.add('opacity-0');
    setTimeout(() => elements.settingsModal.classList.add('hidden'), 300);
  }
}

function updateEndpointLabels(url) {
  const cleanUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  if (elements.lblGetEndpoint) elements.lblGetEndpoint.innerText = `${cleanUrl}/get-pending-docs`;
  if (elements.lblPostEndpoint) elements.lblPostEndpoint.innerText = `${cleanUrl}/update-doc-status`;
}

function saveSettings() {
  const inputUrl = elements.webhookUrlInput ? elements.webhookUrlInput.value.trim() : '';
  if (!inputUrl) {
    showToast("Harap masukkan URL Webhook n8n yang valid!", "error");
    return;
  }

  const url = inputUrl.endsWith('/') ? inputUrl.slice(0, -1) : inputUrl;
  appState.webhookUrl = url;
  localStorage.setItem('n8n_webhook_url', url);
  
  closeSettings();
  showToast("Pengaturan Webhook n8n berhasil disimpan!", "success");
  syncData(true);
}

async function testSettingsConnection() {
  const inputUrl = elements.webhookUrlInput ? elements.webhookUrlInput.value.trim() : '';
  if (!inputUrl) {
    showToast("Isi URL terlebih dahulu sebelum mengetes koneksi!", "error");
    return;
  }

  const url = inputUrl.endsWith('/') ? inputUrl.slice(0, -1) : inputUrl;
  const testEndpoint = `${url}/get-pending-docs`;

  if (elements.btnTestConnection && elements.testConnIcon) {
    elements.btnTestConnection.setAttribute('disabled', 'true');
    elements.testConnIcon.className = "fa-solid fa-circle-notch fa-spin text-brandgold-400";
  }
  showToast("Mencoba melakukan ping ke webhook...", "info");

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const response = await fetch(testEndpoint, {
      method: 'GET',
      headers: authHeaders(),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (response.status === 200 || response.ok) {
      showToast("Koneksi Sukses! n8n merespon dengan benar.", "success");
    } else {
      showToast(`Koneksi Gagal: Server merespon status ${response.status}`, "error");
    }
  } catch (error) {
    showToast("Tes Koneksi Gagal! Periksa URL webhook n8n Anda.", "error");
  } finally {
    if (elements.btnTestConnection && elements.testConnIcon) {
      elements.btnTestConnection.removeAttribute('disabled');
      elements.testConnIcon.className = "fa-solid fa-plug-circle-check";
    }
  }
}

// Search and Filters Logic
function handleSearch(e) {
  appState.filters.search = e.target.value;
  renderDocs();
}

// Auto Refresh Loops
function toggleAutoRefresh() {
  const isChecked = elements.autoRefreshCheck ? elements.autoRefreshCheck.checked : false;
  
  if (appState.autoRefreshTimer) {
    clearInterval(appState.autoRefreshTimer);
    appState.autoRefreshTimer = null;
  }

  if (isChecked) {
    appState.autoRefreshTimer = setInterval(() => {
      syncData(false);
    }, 15000);
  }
}

function startHealthCheckLoop() {
  if (appState.healthCheckTimer) {
    clearInterval(appState.healthCheckTimer);
  }

  appState.healthCheckTimer = setInterval(() => {
    checkHealth();
  }, 10000);
}

// Run application on DOM Load
window.addEventListener('DOMContentLoaded', init);