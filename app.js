// APRUP v2.0 — State Management Engine (Multi-File Architecture)
let appState = {
  theme: localStorage.getItem('dashboard_theme') || 'dark', // 'dark' (Malam) or 'light' (Siang)
  mode: localStorage.getItem('dashboard_mode') || 'demo', // 'live' or 'demo'
  webhookUrl: localStorage.getItem('n8n_webhook_url') || 'https://n8n.almaudin.my.id/webhook',
  isOnline: false,
  currentUser: JSON.parse(sessionStorage.getItem('aprup_user')) || { username: 'admin', role: 'admin', name: 'Administrator' },
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

// Indonesian Humorous Messages for Offline State
const offlineHumors = [
  "n8n (n8n.almaudin.my.id) Sedang Istirahat / Server lagi direstart, ngopi dulu Bos! ☕🔌",
  "Waduh! n8n sepertinya lagi pingsan. Ambil kopi dulu gih, entar kalau server dinyalain dia bangun sendiri! 🛌",
  "Wah, n8n sedang bobo siang. Hubungkan kembali koneksi internet atau cek status server n8n! 🛠️",
  "Koneksi putus! n8n sedang mogok kerja. Coba cek Docker Desktop atau VPS terminal Anda! 🐳",
  "Mimin n8n lagi healing ke luar kota. Tolong dicolok dulu chargernya biar dia balik kerja! 🏖️"
];

// Mock Data for Demo Mode
const mockDocuments = [
  {
    Task_ID: "TASK-2026-0801",
    File_ID: "gdrive-file-001",
    File_Name: "Modul_Kemenkeu.pdf",
    File_Type: "pdf",
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
    File_Name: "Laporan_Pengadaan_TI.docx",
    File_Type: "docx",
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
    File_Name: "Kuitansi_AWS_Server.jpg",
    File_Type: "image",
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
    File_Name: "Foto_Kondisi_Gudang_B.png",
    File_Type: "image",
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

  // Filters
  searchInput: document.getElementById('search-input'),
  filterAll: document.getElementById('filter-all'),
  filterPdf: document.getElementById('filter-pdf'),
  filterDocx: document.getElementById('filter-docx'),
  filterImage: document.getElementById('filter-image'),
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
  if (elements.referTaskDocMeta) elements.referTaskDocMeta.innerText = `Status: ${status} • ${doc.File_Type || doc.file_type || 'Unknown'}`;
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

function getPengesahanValue(doc) {
  const value = doc.Pengesahan || doc.pengesahan || doc['Pengesahan (TTD)'] || doc['pengesahan_ttd'] || 'Belum ada data';
  return String(value).trim() || 'Belum ada data';
}

function getPengesahanStyle(value) {
  const normalized = String(value).trim();
  if (!normalized || normalized.toLowerCase().includes('belum')) {
    return 'bg-rose-500/10 border border-rose-500/20 text-rose-300';
  }
  if (normalized.toLowerCase().includes('tte') || normalized.toLowerCase().includes('menggunakan')) {
    return 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-300';
  }
  if (normalized.toLowerCase().includes('bukan')) {
    return 'bg-amber-500/10 border border-amber-500/20 text-amber-300';
  }
  return 'bg-slate-500/10 border border-slate-500/20 text-slate-300';
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

  if (elements.searchInput) elements.searchInput.addEventListener('input', handleSearch);
  if (elements.filterAll) elements.filterAll.addEventListener('click', () => setTypeFilter('all'));
  if (elements.filterPdf) elements.filterPdf.addEventListener('click', () => setTypeFilter('pdf'));
  if (elements.filterDocx) elements.filterDocx.addEventListener('click', () => setTypeFilter('docx'));
  if (elements.filterImage) elements.filterImage.addEventListener('click', () => setTypeFilter('image'));

  if (elements.btnRefresh) elements.btnRefresh.addEventListener('click', () => syncData(true));
  if (elements.btnToggleDemoFallback) elements.btnToggleDemoFallback.addEventListener('click', () => changeMode('demo'));

  if (elements.autoRefreshCheck) elements.autoRefreshCheck.addEventListener('change', toggleAutoRefresh);

  startHealthCheckLoop();
  toggleAutoRefresh();
  syncData(true);
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

  // Verification simulation
  setTimeout(() => {
    if (user === 'admin' && pass === 'admin') {
      appState.currentUser = { username: 'admin', role: 'admin', name: 'Administrator' };
      sessionStorage.setItem('aprup_user', JSON.stringify(appState.currentUser));
      updateRoleUI();
      closeLoginModal();
      showToast("Autentikasi Berhasil! Login sebagai Admin (Akses Penuh)", "success");
      renderDocs();
    } else if (user === 'user' && pass === 'user') {
      appState.currentUser = { username: 'user', role: 'user', name: 'Standard User' };
      sessionStorage.setItem('aprup_user', JSON.stringify(appState.currentUser));
      updateRoleUI();
      closeLoginModal();
      showToast("Autentikasi Berhasil! Login sebagai User (Read-Only)", "warning");
      renderDocs();
    } else {
      showToast("Kredensial Salah! Gunakan admin/admin atau user/user.", "error");
    }

    if (btn) {
      btn.removeAttribute('disabled');
      btn.innerHTML = `<i class="fa-solid fa-right-to-bracket"></i> <span>Masuk System</span>`;
    }
  }, 600);
}

function updateRoleUI() {
  const isAdmin = appState.currentUser.role === 'admin';
  if (elements.userRoleText) elements.userRoleText.innerText = isAdmin ? "Role: Admin" : "Role: User (Read-Only)";
  if (elements.userRoleBadge) {
    if (isAdmin) {
      elements.userRoleBadge.className = "flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/15 text-amber-300 text-xs font-semibold select-none cursor-pointer";
    } else {
      elements.userRoleBadge.className = "flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-500/30 bg-slate-500/15 text-slate-300 text-xs font-semibold select-none cursor-pointer";
    }
  }
}

// Theme Switcher Logic
function toggleTheme() {
  const newTheme = appState.theme === 'dark' ? 'light' : 'dark';
  appState.theme = newTheme;
  localStorage.setItem('dashboard_theme', newTheme);
  applyTheme(newTheme);

  const themeLabel = newTheme === 'light' ? 'Mode Siang ☀️' : 'Mode Malam 🌙';
  showToast(`Berhasil berpindah ke ${themeLabel}`, 'info');
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  if (elements.themeToggleIcon) {
    if (theme === 'light') {
      elements.themeToggleIcon.className = "fa-solid fa-sun text-amber-500 text-sm";
      if (elements.btnThemeToggle) elements.btnThemeToggle.title = "Mode Siang Aktif (Klik untuk Mode Malam)";
    } else {
      elements.themeToggleIcon.className = "fa-solid fa-moon text-amber-300 text-sm";
      if (elements.btnThemeToggle) elements.btnThemeToggle.title = "Mode Malam Aktif (Klik untuk Mode Siang)";
    }
  }
}

// Mode Selection Handler
function changeMode(newMode) {
  if (appState.mode === newMode) return;
  
  appState.mode = newMode;
  localStorage.setItem('dashboard_mode', newMode);
  setModeUI(newMode);
  
  showToast(`Berhasil berpindah ke ${newMode === 'live' ? 'Live Mode' : 'Demo/Mock Mode'}`, 'success');
  
  if (newMode === 'demo') {
    appState.documents = JSON.parse(JSON.stringify(mockDocuments));
  } else {
    appState.documents = [];
  }
  
  syncData(true);
}

function setModeUI(mode) {
  if (elements.btnLiveMode && elements.btnDemoMode && elements.statMode) {
    if (mode === 'live') {
      elements.btnLiveMode.className = "px-3 py-1 rounded-full bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-500/20 transition-all duration-200";
      elements.btnDemoMode.className = "px-3 py-1 rounded-full text-[var(--text-muted)] font-semibold hover:text-[var(--text)] transition-all duration-200";
    } else {
      elements.btnDemoMode.className = "px-3 py-1 rounded-full bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-500/20 transition-all duration-200";
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
    elements.toastIcon.innerHTML = "🏆";
    elements.toast.classList.add('bg-emerald-500/10', 'border-emerald-500/20', 'text-emerald-300');
  } else if (type === 'error') {
    elements.toastIcon.innerHTML = "⚠️";
    elements.toast.classList.add('bg-rose-500/10', 'border-rose-500/20', 'text-rose-300');
  } else if (type === 'warning') {
    elements.toastIcon.innerHTML = "☕";
    elements.toast.classList.add('bg-amber-500/10', 'border-amber-500/20', 'text-amber-300');
  } else {
    elements.toastIcon.innerHTML = "ℹ️";
    elements.toast.classList.add('bg-blue-500/10', 'border-blue-500/20', 'text-blue-300');
  }

  setTimeout(() => {
    elements.toast.classList.add('translate-y-12', 'opacity-0');
    elements.toast.classList.remove('translate-y-0', 'opacity-100');
  }, 4000);
}

// Health Check Logic
async function checkHealth() {
  if (appState.mode === 'demo') {
    updateHealthUI(true, "🟢 n8n.almaudin.my.id (Demo Mode)");
    return;
  }

  const endpoint = `${appState.webhookUrl}/get-pending-docs`;
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const response = await fetch(endpoint, {
      method: 'GET',
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);

    if (response.status === 200 || response.ok) {
      updateHealthUI(true, "🟢 n8n Aktif (n8n.almaudin.my.id)");
    } else {
      updateHealthUI(false, `🔴 n8n Gagal (${response.status})`);
    }
  } catch (error) {
    let reason = "Koneksi Gagal / Timeout";
    if (error.name === 'AbortError') reason = "Koneksi Timeout";
    updateHealthUI(false, `🔴 n8n Offline: ${reason}`);
  }
}

function updateHealthUI(online, text) {
  appState.isOnline = online;
  if (elements.healthText) elements.healthText.innerText = text;
  
  if (elements.healthBadge) {
    const dot = elements.healthBadge.querySelector('span:first-child');
    if (online) {
      elements.healthBadge.className = "flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-300 text-xs font-semibold select-none shrink-0";
      if (dot) dot.className = "w-2.5 h-2.5 rounded-full pulse-dot-green";
      if (elements.offlineAlert) elements.offlineAlert.classList.add('hidden');
      document.querySelectorAll('.btn-action-trigger').forEach(btn => {
        if (appState.currentUser.role === 'admin') {
          btn.removeAttribute('disabled');
          btn.classList.remove('opacity-50', 'cursor-not-allowed');
        }
      });
    } else {
      elements.healthBadge.className = "flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-rose-500/20 bg-rose-500/10 text-rose-300 text-xs font-semibold select-none shrink-0 animate-bounce";
      if (dot) dot.className = "w-2.5 h-2.5 rounded-full pulse-dot-red";
      
      const humorMsg = offlineHumors[Math.floor(Math.random() * offlineHumors.length)];
      if (elements.offlineAlert) {
        elements.offlineAlert.querySelector('h4').innerText = "Aduh! Server n8n Sedang Istirahat!";
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
    const response = await fetch(endpoint);
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
        <span class="shrink-0 mt-0.5 w-1.5 h-1.5 rounded-full bg-amber-400/60 inline-block"></span>
        <span><span class="font-extrabold text-amber-300">${label}:</span> ${value}</span>
      </li>`;
    }
    return `<li class="flex items-start gap-1.5">
      <span class="shrink-0 mt-0.5 w-1.5 h-1.5 rounded-full bg-amber-400/60 inline-block"></span>
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
          <i class="fa-solid fa-triangle-exclamation text-2xl text-amber-400"></i>
          <p class="text-xs text-center px-4">Preview tidak tersedia.<br>File ID tidak valid atau belum dikonfigurasi.<br>
          <a href="${gdriveLink}" target="_blank" class="text-amber-400 underline mt-1 inline-block">Buka dokumen di Google Drive</a></p>`;
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
function renderDocs() {
  if (!elements.documentGrid) return;
  elements.documentGrid.innerHTML = '';

  const archivedDocuments = appState.documents.filter(doc => hasValidReferTaskReference(doc));
  const visibleDocuments = appState.documents.filter(doc => !hasValidReferTaskReference(doc));
  const searchVal = appState.filters.search.toLowerCase();
  const typeVal = appState.filters.type;
  const activeTabStatus = appState.activeTab.toLowerCase();

  const pendingDocs = visibleDocuments.filter(d => (d.Status || d.status || 'Pending').toLowerCase() === 'pending');
  const approvedDocs = visibleDocuments.filter(d => (d.Status || d.status || '').toLowerCase() === 'approved');
  const revisedDocs = visibleDocuments.filter(d => (d.Status || d.status || '').toLowerCase() === 'needs revision');
  const rejectedDocs = visibleDocuments.filter(d => (d.Status || d.status || '').toLowerCase() === 'rejected');
  const archivedDocs = archivedDocuments;

  if (elements.badgePendingCount) elements.badgePendingCount.innerText = pendingDocs.length;
  if (elements.badgeApprovedCount) elements.badgeApprovedCount.innerText = approvedDocs.length;
  if (elements.badgeRevisedCount) elements.badgeRevisedCount.innerText = revisedDocs.length;
  if (elements.badgeRejectedCount) elements.badgeRejectedCount.innerText = rejectedDocs.length;
  if (elements.badgeArchivedCount) elements.badgeArchivedCount.innerText = archivedDocs.length;

  populateReferTaskDatalist();

  const currentTabDocs = activeTabStatus === 'archived' ? archivedDocuments : visibleDocuments;
  const filteredDocs = currentTabDocs.filter(doc => {
    const fileName = doc.File_Name || doc.filename || '';
    const taskId = doc.Task_ID || doc.id || '';
    const aiNotes = doc.AI_Notes || doc.key_points || '';

    const nameMatch = fileName.toLowerCase().includes(searchVal) ||
      taskId.toLowerCase().includes(searchVal) ||
      aiNotes.toLowerCase().includes(searchVal);

    const docType = (doc.File_Type || doc.file_type || '').toLowerCase();
    const typeMatch = typeVal === 'all' || docType === typeVal;

    const docStatus = (doc.Status || doc.status || 'Pending').toLowerCase();
    const statusMatch = activeTabStatus === 'archived' ? true : docStatus === activeTabStatus;

    return nameMatch && typeMatch && statusMatch;
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
    const fileName = doc.File_Name || doc.filename || 'Dokumen.pdf';
    const fileType = doc.File_Type || doc.file_type || 'pdf';
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
    card.className = "glass-panel p-5 md:p-6 rounded-3xl border border-white/5 flex flex-col justify-between hover:border-amber-500/30 transition-all duration-300 animate-fade-in-up";
    card.style.animationDelay = `${index * 50}ms`;

    const isPdf = fileType === 'pdf';
    const isDocx = fileType === 'docx';
    let iconClass = 'fa-file-pdf text-rose-400 bg-rose-500/10 border-rose-500/20';
    if (isDocx) iconClass = 'fa-file-word text-blue-400 bg-blue-500/10 border-blue-500/20';
    else if (!isPdf) iconClass = 'fa-image text-emerald-400 bg-emerald-500/10 border-emerald-500/20';

    const actionDisabled = (!appState.isOnline && appState.mode === 'live') || !isAdmin ? 'disabled' : '';
    const btnClasses = (!appState.isOnline && appState.mode === 'live') || !isAdmin ? 'opacity-50 cursor-not-allowed' : '';

    card.innerHTML = `
      <div>
        <div class="flex items-center justify-between border-b border-amber-500/10 pb-4 mb-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl border flex items-center justify-center text-lg ${iconClass}">
              <i class="fa-solid"></i>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">${taskId}</span>
                <h4 class="text-xs md:text-sm font-bold text-[var(--text)] truncate max-w-[150px] sm:max-w-[220px]" title="${fileName}">${fileName}</h4>
              </div>
              <span class="text-[10px] text-[var(--text-muted)] uppercase font-bold tracking-wider mt-0.5 block">${fileSize} • ${fileType.toUpperCase()}</span>
            </div>
          </div>
          <span class="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 border border-amber-500/30 text-amber-300">
            ${doc.Status || 'Pending'}
          </span>
        </div>

        <div class="space-y-3.5 text-xs">
          <div>
            <span class="text-[10px] uppercase font-extrabold tracking-wider text-amber-400 font-mono block">1. Spesifikasi Check </span>
            <ul class="text-xs text-[var(--text)] mt-1 font-medium bg-white/5 p-2.5 rounded-xl border border-white/5 leading-relaxed space-y-1 list-none">
              ${formatSpesifikasi(doc.Spesifikasi_Check || 'Mutu & Teknis Sesuai Standard')}
            </ul>
          </div>

          <div>
            <span class="text-[10px] uppercase font-extrabold tracking-wider text-amber-400 font-mono block">2. Kelengkapan TOR</span>
            <div class="mt-1">
              <span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                ${doc.TOR_Completeness || 'Lengkap (10/10 Bab Terpenuhi)'}
              </span>
            </div>
          </div>

          <div>
            <span class="text-[10px] uppercase font-extrabold tracking-wider text-amber-400 font-mono block">3. Catatan Tambahan AI</span>
            <p class="text-xs text-[var(--text)] mt-1 leading-relaxed italic">
              "${doc.AI_Notes || doc.key_points || 'Tidak ada catatan khusus.'}"
            </p>
          </div>

          ${showDecisionNotes ? `
            <div>
              <span class="text-[10px] uppercase font-extrabold tracking-wider text-amber-400 font-mono block">4. ${decisionNotesLabel}</span>
              <p class="text-xs text-[var(--text)] mt-1 leading-relaxed italic">
                "${adminNotes}"
              </p>
            </div>
          ` : ''}

          <div class="pt-1 border-t border-white/5 mt-1">
            <div class="flex items-center justify-between gap-2">
              <span class="text-[10px] uppercase font-extrabold tracking-wider text-amber-400 font-mono">${showDecisionNotes ? '5' : '4'}. Pengesahan</span>
              <span class="px-2 py-1 rounded-full text-[10px] font-semibold ${pengesahanClass}">${pengesahanValue}</span>
            </div>
          </div>

          <div class="flex flex-wrap items-center justify-between gap-2 pt-1">
            <span class="text-[10px] text-[var(--text-muted)]">
              Pengajuan Ulang: <strong class="${doc.Is_Reapplication ? 'text-rose-400' : 'text-slate-300'}">${isReapplication}</strong>
            </span>
            ${referTaskId ? `<span class="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded font-mono">Ref: ${referTaskId}</span>` : ''}
          </div>
        </div>
      </div>

      <div class="flex flex-wrap sm:flex-nowrap gap-2 pt-5 border-t border-amber-500/10 mt-5">
        ${showActionButtons ? `
          <button onclick="openActionModal('${taskId}', 'approve')" ${actionDisabled} class="btn-action-trigger ${btnClasses} flex-1 min-h-[40px] px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 glow-btn-emerald transition-all duration-300 active:scale-95" title="${isAdmin ? 'Approve Document' : 'Read-Only Mode'}">
            <i class="fa-solid fa-check"></i>
            <span>Approve</span>
          </button>

          <button onclick="openActionModal('${taskId}', 'revise')" ${actionDisabled} class="btn-action-trigger ${btnClasses} flex-1 min-h-[40px] px-3 py-2 bg-amber-600/20 hover:bg-amber-600 border border-amber-500/30 hover:border-amber-500 text-amber-300 hover:text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 glow-btn-amber transition-all duration-300 active:scale-95" title="${isAdmin ? 'Minta Revisi' : 'Read-Only Mode'}">
            <i class="fa-regular fa-pen-to-square"></i>
            <span>Revisi</span>
          </button>

          <button onclick="openActionModal('${taskId}', 'reject')" ${actionDisabled} class="btn-action-trigger ${btnClasses} flex-1 min-h-[40px] px-3 py-2 bg-rose-600/20 hover:bg-rose-600 border border-rose-500/30 hover:border-rose-500 text-rose-300 hover:text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 glow-btn-rose transition-all duration-300 active:scale-95" title="${isAdmin ? 'Tolak Dokumen' : 'Read-Only Mode'}">
            <i class="fa-solid fa-xmark"></i>
            <span>Tolak</span>
          </button>
        ` : ''}

        <button onclick="openDocPreview('${taskId}', '${fileName}', '${gdriveLink}', '${doc.File_ID || ''}')" class="${showActionButtons ? 'min-h-[40px] w-[40px]' : 'flex-1 min-h-[40px]'} rounded-xl bg-white/5 border border-amber-500/20 text-[var(--text-muted)] hover:text-amber-300 hover:bg-amber-500/10 transition-all duration-200 flex items-center justify-center shrink-0" title="Preview Dokumen">
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
  if (appState.currentUser.role !== 'admin') {
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
      headers: { 'Content-Type': 'application/json' },
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
  if (appState.currentUser.role !== 'admin') {
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

  if (actionType === 'approve') {
    if (elements.modalIcon) elements.modalIcon.innerText = "✅";
    if (elements.modalTitle) elements.modalTitle.innerText = "Persetujuan Dokumen";
    if (elements.lblActionNotes) elements.lblActionNotes.innerText = "Catatan Persetujuan atau keterangan tambahan";
    if (elements.btnSubmitActionText) elements.btnSubmitActionText.innerText = "Konfirmasi Approve";
  } else if (actionType === 'revise') {
    if (elements.modalIcon) elements.modalIcon.innerText = "✏️";
    if (elements.modalTitle) elements.modalTitle.innerText = "Instruksi Revisi Dokumen";
    if (elements.lblActionNotes) elements.lblActionNotes.innerText = "Catatan Instruksi Revisi untuk Gemini AI";
    if (elements.btnSubmitActionText) elements.btnSubmitActionText.innerText = "Kirim Instruksi Revisi";
  } else {
    if (elements.modalIcon) elements.modalIcon.innerText = "❌";
    if (elements.modalTitle) elements.modalTitle.innerText = "Alasan Penolakan Dokumen";
    if (elements.lblActionNotes) elements.lblActionNotes.innerText = "Alasan Penolakan Dokumen (Wajib Diisi)";
    if (elements.btnSubmitActionText) elements.btnSubmitActionText.innerText = "Konfirmasi Tolak";
  }

  if (elements.referTaskContainer) elements.referTaskContainer.classList.remove('hidden');
  if (elements.referTaskIdInput) {
    const existingReferTask = normalizeReferTaskValue(doc.Refer_Task_ID ?? doc.refer_task_id);
    elements.referTaskIdInput.value = existingReferTask || '';
    elements.referTaskIdInput.setAttribute('list', 'refer-task-datalist');
    elements.referTaskIdInput.addEventListener('input', updateReferTaskInfo, { once: false });
  }

  populateReferTaskDatalist();
  updateReferTaskInfo();

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
      headers: { 'Content-Type': 'application/json' },
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
    elements.testConnIcon.className = "fa-solid fa-circle-notch fa-spin text-amber-400";
  }
  showToast("Mencoba melakukan ping ke webhook...", "info");

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const response = await fetch(testEndpoint, {
      method: 'GET',
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (response.status === 200 || response.ok) {
      showToast("Koneksi Sukses! n8n merespon dengan benar.", "success");
    } else {
      showToast(`Koneksi Gagal: Server merespon status ${response.status}`, "error");
    }
  } catch (error) {
    showToast("Tes Koneksi Gagal! Periksa URL n8n.almaudin.my.id Anda.", "error");
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

function setTypeFilter(type) {
  appState.filters.type = type;
  
  const btns = [elements.filterAll, elements.filterPdf, elements.filterDocx, elements.filterImage].filter(Boolean);
  btns.forEach(btn => {
    btn.className = "flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] transition-all duration-200";
  });

  if (type === 'all' && elements.filterAll) elements.filterAll.className = "flex-1 sm:flex-none px-3 py-1.5 rounded-lg bg-white/10 font-medium transition-all duration-200";
  else if (type === 'pdf' && elements.filterPdf) elements.filterPdf.className = "flex-1 sm:flex-none px-3 py-1.5 rounded-lg bg-white/10 font-medium transition-all duration-200";
  else if (type === 'docx' && elements.filterDocx) elements.filterDocx.className = "flex-1 sm:flex-none px-3 py-1.5 rounded-lg bg-white/10 font-medium transition-all duration-200";
  else if (type === 'image' && elements.filterImage) elements.filterImage.className = "flex-1 sm:flex-none px-3 py-1.5 rounded-lg bg-white/10 font-medium transition-all duration-200";

  renderDocs();
}

// Auto Refresh Loops
function toggleAutoRefresh() {
  const isChecked = elements.autoRefreshCheck ? elements.autoRefreshCheck.checked : true;
  
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
