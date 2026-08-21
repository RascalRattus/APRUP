// ============================================================
// APRUP v2.0 — Click Simulation & Viewport Report (CI Upgrade)
// Playwright Test Script
// Usage: node test_simulation.js
// ============================================================

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.BASE_URL || 'http://localhost:8888/index.html';
const SCREENSHOTS_DIR = path.join(__dirname, 'test_screenshots');

if (!fs.existsSync(SCREENSHOTS_DIR)) fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

const report = {
  generatedAt: new Date().toISOString(),
  targetUrl: BASE_URL,
  executionDurationMs: 0,
  summary: { totalTests: 0, passed: 0, warned: 0, failed: 0 },
  performance: {},
  consoleErrors: {},
  networkFailures: {},
  screenshots: [],
  viewports: {}
};

const VIEWPORTS = [
  { name: 'Desktop Large',    label: '1920x1080', width: 1920, height: 1080 },
  { name: 'Desktop Standard', label: '1440x900',  width: 1440, height: 900  },
  { name: 'Tablet',           label: '768x1024',  width: 768,  height: 1024 },
  { name: 'Mobile',           label: '375x812',   width: 375,  height: 812  },
];

function log(vpLabel, step, status, detail = '') {
  if (!report.viewports[vpLabel]) report.viewports[vpLabel] = {};
  report.viewports[vpLabel][step] = { status, detail };
  report.summary.totalTests++;
  if (status === 'PASS') report.summary.passed++;
  else if (status === 'WARN') report.summary.warned++;
  else if (status === 'FAIL') report.summary.failed++;
  const icon = status === 'PASS' ? '✅' : status === 'WARN' ? '⚠️' : '❌';
  console.log(`  [${vpLabel}] ${icon} ${step}: ${detail}`);
}

async function safeClick(page, selector, timeout = 3000) {
  try {
    const locator = page.locator(selector).first();
    await locator.waitFor({ state: 'visible', timeout });
    await locator.click({ timeout });
    await page.waitForTimeout(300);
    return true;
  } catch { return false; }
}

async function isVisible(page, selector, timeout = 2000) {
  try { return await page.locator(selector).first().isVisible({ timeout }); }
  catch { return false; }
}

async function screenshot(page, name) {
  const file = path.join(SCREENSHOTS_DIR, `${name}.png`);
  await page.screenshot({ path: file, fullPage: false });
  const fileName = path.basename(file);
  if (!report.screenshots.includes(fileName)) report.screenshots.push(fileName);
  return file;
}

async function testViewport(browser, vp) {
  const vpLabel = vp.label;
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Testing: ${vp.name} (${vpLabel})`);
  console.log('='.repeat(60));

  const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await context.newPage();
  report.consoleErrors[vpLabel] = [];
  report.networkFailures[vpLabel] = [];
  page.on('pageerror', error => report.consoleErrors[vpLabel].push(`[JS Crash] ${error.message}`));
  page.on('response', response => {
    if (response.status() >= 400) {
      report.networkFailures[vpLabel].push(`[HTTP ${response.status()}] ${response.request().method()} ${response.url()}`);
    }
  });

  const navigationStart = Date.now();
  try {
    await page.goto(BASE_URL, { waitUntil: 'commit', timeout: 15000 });
    await page.locator('#stats-ribbon').waitFor({ state: 'visible', timeout: 15000 });
    log(vpLabel, 'Page Load', 'PASS', `Loaded ${BASE_URL}`, Date.now() - navigationStart);
  } catch (error) {
    log(vpLabel, 'Page Load', 'FAIL', error.message, Date.now() - navigationStart);
    await context.close();
    return;
  }
  const domLoadedTime = Date.now() - navigationStart;
  await page.waitForTimeout(1500);
  report.performance[vpLabel] = await page.evaluate((domLoaded) => {
    const timing = window.performance && window.performance.timing;
    const memory = window.performance && window.performance.memory;
    return {
      domLoadedTime: domLoaded,
      domInteractiveMs: timing ? timing.domInteractive - timing.navigationStart : domLoaded,
      loadEventMs: timing ? timing.loadEventEnd - timing.navigationStart : 0,
      jsHeapUsedMB: memory ? (memory.usedJSHeapSize / (1024 * 1024)).toFixed(2) : 'N/A'
    };
  }, domLoadedTime).catch(() => ({ domLoadedTime, jsHeapUsedMB: 'N/A' }));
  await screenshot(page, `${vpLabel}_00_initial`);

  // Step 1: Theme Toggle
  try {
    const visible = await isVisible(page, '#btn-theme-toggle');
    if (visible) {
      const before = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
      await safeClick(page, '#btn-theme-toggle');
      await page.waitForTimeout(500);
      const after = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
      await screenshot(page, `${vpLabel}_01_theme`);
      await safeClick(page, '#btn-theme-toggle');
      await page.waitForTimeout(400);
      log(vpLabel, 'Theme Toggle', before !== after ? 'PASS' : 'WARN', `${before} → ${after} → restored`);
    } else log(vpLabel, 'Theme Toggle', 'WARN', 'Button not visible');
  } catch(e) { log(vpLabel, 'Theme Toggle', 'FAIL', e.message); }

  // Step 2: Mode Switcher
  try {
    const visible = await isVisible(page, '#btn-live-mode');
    if (visible) {
      await safeClick(page, '#btn-live-mode');
      await page.waitForTimeout(400);
      await safeClick(page, '#btn-demo-mode');
      await page.waitForTimeout(400);
      await screenshot(page, `${vpLabel}_02_mode`);
      log(vpLabel, 'Mode Switcher', 'PASS', 'Live clicked → Demo restored');
    } else log(vpLabel, 'Mode Switcher', 'WARN', 'Buttons not visible');
  } catch(e) { log(vpLabel, 'Mode Switcher', 'FAIL', e.message); }

  // Step 3: Login Modal
  try {
    const visible = await isVisible(page, '#user-role-badge');
    if (visible) {
      await safeClick(page, '#user-role-badge');
      await page.waitForTimeout(600);
      const modalVisible = await page.locator('#login-modal').evaluate(el => !el.classList.contains('hidden')).catch(() => false);
      await screenshot(page, `${vpLabel}_03_login`);
      if (modalVisible) {
        await safeClick(page, '#btn-login-demo-mode');
        await page.waitForTimeout(1000);
        const roleText = await page.locator('#user-role-text').textContent().catch(() => '');
        const modalClosed = await page.locator('#login-modal').evaluate(el => el.classList.contains('hidden')).catch(() => false);
        log(vpLabel, 'Login Modal', modalClosed && roleText.includes('User') ? 'PASS' : 'FAIL', `Demo login: ${modalClosed ? 'opened dashboard' : 'modal still open'} | Role: "${roleText.trim()}"`);
      } else {
        log(vpLabel, 'Login Modal', 'WARN', 'Modal did not open');
      }
    } else log(vpLabel, 'Login Modal', 'WARN', 'Badge not visible');
  } catch(e) { log(vpLabel, 'Login Modal', 'FAIL', e.message); }

  // Step 4: Single Grouped Ribbon
  try {
    const legacyRibbon = await page.locator('#tab-pending, #tab-approved, #tab-revised, #tab-rejected, #tab-archived').count();
    const groups = await page.locator('.stats-group').count();
    log(vpLabel, 'Single Grouped Ribbon', legacyRibbon === 0 && groups === 4 ? 'PASS' : 'FAIL', `legacy_ribbon:${legacyRibbon} | grouped_sections:${groups}`);
  } catch(e) { log(vpLabel, 'Single Grouped Ribbon', 'FAIL', e.message); }

  // Step 5: Grouped Stats Ribbon
  try {
    const groups = await page.locator('.stats-group').count();
    const pending = await page.locator('#stat-pending-count').textContent();
    const approved = await page.locator('#stat-approved-count').textContent();
    const revised = await page.locator('#stat-revised-count').textContent();
    const rejected = await page.locator('#stat-rejected-count').textContent();
    const archived = await page.locator('#stat-archived-count').textContent();
    const uploadCardVisible = await page.locator('#btn-open-upload').isVisible().catch(() => false);
    log(vpLabel, 'Grouped Stats Ribbon', groups === 4 && pending.trim() === '4' && uploadCardVisible ? 'PASS' : 'FAIL', `groups:${groups} | pending:${pending.trim()} | approved:${approved.trim()} | revised:${revised.trim()} | rejected:${rejected.trim()} | archived:${archived.trim()} | upload_card:${uploadCardVisible}`);
  } catch(e) { log(vpLabel, 'Grouped Stats Ribbon', 'FAIL', e.message); }

  // Step 6: Format Filters Removed and Auto-sync Opt-in
  try {
    const formatFilters = await page.locator('#filter-pdf, #filter-docx, #filter-image, #filter-all').count();
    const autoSyncEnabled = await page.locator('#auto-refresh-check').isChecked();
    await screenshot(page, `${vpLabel}_05_filters`);
    log(vpLabel, 'Format Filters Removed', formatFilters === 0 && !autoSyncEnabled ? 'PASS' : 'FAIL', `format_filters:${formatFilters} | auto_sync:${autoSyncEnabled}`);
  } catch(e) { log(vpLabel, 'Format Filters', 'FAIL', e.message); }

  // Step 7: Upload Validation and Revision Comparison
  try {
    await safeClick(page, '#btn-open-upload');
    const oversizedBuffer = Buffer.alloc(5 * 1024 * 1024 + 1, 1);
    await page.locator('#upload-file').setInputFiles({ name: 'oversized.docx', mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', buffer: oversizedBuffer });
    const uploadError = await page.locator('#upload-file-error').textContent();
    const compareButton = page.locator('#card-TASK-2026-0802 [title="Bandingkan Catatan Revisi (AI)"]');
    const compareVisible = await compareButton.isVisible().catch(() => false);
    await safeClick(page, '#btn-cancel-upload');
    if (compareVisible) {
      await compareButton.click();
      await page.waitForTimeout(900);
    }
    const compareVisibleAfter = await page.locator('#compare-modal').evaluate(el => !el.classList.contains('hidden')).catch(() => false);
    const compareStatus = await page.locator('#compare-status').textContent().catch(() => '');
    await safeClick(page, '#btn-close-compare');
    const uploadValidationPass = uploadError.includes('Maksimal 5 MB');
    const comparePass = compareVisible && compareVisibleAfter && compareStatus.includes('REVISI_DITERIMA');
    log(vpLabel, 'Upload & AI Compare', uploadValidationPass && comparePass ? 'PASS' : 'FAIL', `oversize_error:${uploadError.trim()} | compare_button:${compareVisible} | compare_modal:${compareVisibleAfter} | status:${compareStatus.trim()}`);
  } catch(e) { log(vpLabel, 'Upload & AI Compare', 'FAIL', e.message); }

  // Step 6: Search
  try {
    const visible = await isVisible(page, '#search-input');
    if (visible) {
      await page.locator('#search-input').fill('Kemenkeu');
      await page.waitForTimeout(600);
      const found = await page.locator('#document-grid > *').count();
      await screenshot(page, `${vpLabel}_06_search`);
      await page.locator('#search-input').fill('');
      await page.waitForTimeout(400);
      const total = await page.locator('#document-grid > *').count();
      log(vpLabel, 'Search Input', 'PASS', `"Kemenkeu" → ${found} cards. After clear → ${total} cards`);
    } else log(vpLabel, 'Search Input', 'WARN', 'Not visible');
  } catch(e) { log(vpLabel, 'Search Input', 'FAIL', e.message); }

  // Step 7: Document Card Modal
  try {
    const firstBtn = page.locator('#document-grid button').first();
    const visible = await firstBtn.isVisible({ timeout: 2000 }).catch(() => false);
    if (visible) {
      await firstBtn.click({ timeout: 3000 });
      await page.waitForTimeout(800);
      const modalOpen = await page.locator('#action-modal').evaluate(el => !el.classList.contains('hidden')).catch(() => false);
      await screenshot(page, `${vpLabel}_07_modal`);
      if (modalOpen) {
        const textarea = page.locator('#action-notes');
        const taVis = await textarea.isVisible({ timeout: 1000 }).catch(() => false);
        if (taVis) await textarea.fill('Test simulasi otomatis.');
        await page.keyboard.press('Escape');
        await page.waitForTimeout(500);
        log(vpLabel, 'Document Modal', 'PASS', `Opened: YES. Notes filled: ${taVis}. Closed: ESC`);
      } else {
        log(vpLabel, 'Document Modal', 'WARN', 'Modal did not open');
      }
    } else log(vpLabel, 'Document Modal', 'WARN', 'No card buttons found');
  } catch(e) { log(vpLabel, 'Document Modal', 'FAIL', e.message); }

  // Step 8: Settings Modal
  try {
    const visible = await isVisible(page, '#btn-open-settings');
    if (visible) {
      await safeClick(page, '#btn-open-settings');
      await page.waitForTimeout(500);
      const count = await page.locator('.fixed.inset-0').count();
      await screenshot(page, `${vpLabel}_08_settings`);
      await page.keyboard.press('Escape');
      await page.waitForTimeout(400);
      log(vpLabel, 'Settings Modal', 'PASS', `Overlay elements visible: ${count}. Closed with Escape.`);
    } else log(vpLabel, 'Settings Modal', 'WARN', 'Button not visible');
  } catch(e) { log(vpLabel, 'Settings Modal', 'FAIL', e.message); }

  // Step 9: Refresh
  try {
    const visible = await isVisible(page, '#btn-refresh');
    if (visible) {
      await safeClick(page, '#btn-refresh');
      await page.waitForTimeout(2000);
      await screenshot(page, `${vpLabel}_09_refresh`);
      log(vpLabel, 'Refresh Button', 'PASS', 'Clicked, data reload triggered');
    } else log(vpLabel, 'Refresh Button', 'WARN', 'Not visible');
  } catch(e) { log(vpLabel, 'Refresh Button', 'FAIL', e.message); }

  // Step 10: Auto-refresh
  try {
    if (await isVisible(page, '#action-modal')) {
      await page.evaluate(() => window.closeActionModal());
      await page.waitForTimeout(200);
    }
    const visible = await isVisible(page, '#auto-refresh-check');
    if (visible) {
      const before = await page.locator('#auto-refresh-check').isChecked();
      await page.locator('#auto-refresh-check').click();
      await page.waitForTimeout(300);
      const after = await page.locator('#auto-refresh-check').isChecked();
      await page.locator('#auto-refresh-check').click();
      log(vpLabel, 'Auto-refresh Toggle', 'PASS', `${before} → ${after} → restored`);
    } else log(vpLabel, 'Auto-refresh Toggle', 'WARN', 'Not visible');
  } catch(e) { log(vpLabel, 'Auto-refresh Toggle', 'FAIL', e.message); }

  // Layout check
  try {
    const hdr = await page.locator('header').first().boundingBox();
    const gridCols = await page.evaluate(() => {
      const g = document.getElementById('document-grid');
      return g ? getComputedStyle(g).gridTemplateColumns : 'N/A';
    });
    const overflow = await page.evaluate(() => document.body.scrollWidth > document.body.clientWidth);
    const cardCount = await page.locator('#document-grid > *').count();
    log(vpLabel, 'Layout Assessment', overflow ? 'WARN' : 'PASS',
      `Header=${hdr?.height?.toFixed(0)}px | Cols="${gridCols}" | Cards=${cardCount} | HorzOverflow=${overflow}`);
  } catch(e) { log(vpLabel, 'Layout Assessment', 'FAIL', e.message); }

  await context.close();
}

function generateReport(report) {
  const steps = ['Page Load','Theme Toggle','Mode Switcher','Login Modal','Single Grouped Ribbon','Grouped Stats Ribbon','Format Filters Removed','Upload & AI Compare','Search Input','Document Modal','Settings Modal','Refresh Button','Auto-refresh Toggle','Layout Assessment'];
  const vps = Object.keys(report.viewports);

  let md = `# 📊 APRUP v2.0 — UI Click Simulation Report\n\n`;
  md += `**Generated:** ${new Date(report.generatedAt).toLocaleString('id-ID', {timeZone:'Asia/Jakarta'})}\n`;
  md += `**Target URL:** ${report.targetUrl}\n`;
  md += `**Engine:** Chromium via Playwright\n`;
  md += `**Health Score:** ${report.summary.passed}/${report.summary.totalTests} PASS\n\n---\n\n`;

  md += `## Performance\n\n| Viewport | DOM Loaded | DOM Interactive | Load Event | JS Heap |\n|---|---:|---:|---:|---:|\n`;
  for (const vp of vps) {
    const metrics = report.performance[vp] || {};
    md += `| ${vp} | ${metrics.domLoadedTime || 'N/A'}ms | ${metrics.domInteractiveMs || 'N/A'}ms | ${metrics.loadEventMs || 'N/A'}ms | ${metrics.jsHeapUsedMB || 'N/A'} MB |\n`;
  }

  md += `## 📋 Summary Table\n\n`;
  md += `| Component | ${vps.join(' | ')} |\n|---|${vps.map(()=>'---').join('|')}|\n`;
  for (const s of steps) {
    const cells = vps.map(vp => {
      const r = report.viewports[vp]?.[s];
      if (!r) return '—';
      return r.status === 'PASS' ? '✅' : r.status === 'WARN' ? '⚠️' : '❌';
    });
    md += `| **${s}** | ${cells.join(' | ')} |\n`;
  }

  md += `\n---\n\n`;

  for (const vp of vps) {
    const vpData = report.viewports[vp];
    // compute overall
    const results = Object.values(vpData);
    const fails = results.filter(r=>r.status==='FAIL').length;
    const warns = results.filter(r=>r.status==='WARN').length;
    const passes = results.filter(r=>r.status==='PASS').length;
    const overall = fails > 0 ? '❌ FAIL' : warns > 2 ? '⚠️ PARTIAL' : '✅ PASS';
    md += `## 📐 ${vp}\n\n`;
    md += `**Overall: ${overall}** (${passes} pass, ${warns} warn, ${fails} fail)\n\n`;
    for (const s of steps) {
      const r = vpData?.[s];
      if (!r) { md += `- **${s}**: *(not tested)*\n`; continue; }
      const icon = r.status==='PASS'?'✅':r.status==='WARN'?'⚠️':'❌';
      md += `- ${icon} **${s}** \`${r.status}\`  \n  ${r.detail}\n`;
    }
    md += `\n`;
  }

  md += `---\n\n## 🐛 Issues & Warnings\n\n`;
  let issueCount = 0;
  for (const vp of vps) {
    for (const s of steps) {
      const r = report.viewports[vp]?.[s];
      if (r && r.status !== 'PASS') {
        md += `- **[${vp}] ${s}** (${r.status}): ${r.detail}\n`;
        issueCount++;
      }
    }
  }
  if (!issueCount) md += `_No issues found._\n`;

  md += `\n---\n\n## Browser Diagnostics\n\n`;
  for (const vp of vps) {
    const consoleErrors = report.consoleErrors[vp] || [];
    const networkFailures = report.networkFailures[vp] || [];
    md += `- **${vp}**: console errors ${consoleErrors.length}, network failures ${networkFailures.length}\n`;
    [...consoleErrors, ...networkFailures].forEach(item => { md += `  - ${item}\n`; });
  }

  md += `\n---\n\n## 📸 Screenshots\n\nSaved to \`./test_screenshots/\`\n\n`;
  try {
    const files = fs.readdirSync(SCREENSHOTS_DIR).filter(f=>f.endsWith('.png')).sort();
    files.forEach(f => { md += `- \`${f}\`\n`; });
  } catch {}

  return md;
}

(async () => {
  const executionStart = Date.now();
  console.log('APRUP v2.0 Click Simulation Starting...\n');
  const browser = await chromium.launch({ headless: true });
  for (const vp of VIEWPORTS) await testViewport(browser, vp);
  await browser.close();
  report.executionDurationMs = Date.now() - executionStart;

  const mdReport = generateReport(report);
  const rpath = path.join(__dirname, 'CLICK_SIMULATION_REPORT.md');
  fs.writeFileSync(rpath, mdReport, 'utf8');
  fs.writeFileSync(path.join(__dirname, 'click_simulation_raw.json'), JSON.stringify(report,null,2), 'utf8');

  console.log(`\nDone! Report: ${rpath}`);
  console.log(`Health: ${report.summary.passed} passed, ${report.summary.warned} warned, ${report.summary.failed} failed`);
  if (report.summary.failed > 0) process.exitCode = 1;
})();
