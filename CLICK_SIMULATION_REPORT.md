# 📊 APRUP v2.0 — UI Click Simulation Report

**Generated:** 21/8/2026, 18.46.55
**Target URL:** http://localhost:8888/index.html
**Engine:** Chromium via Playwright
**Health Score:** 44/56 PASS

---

## Performance

| Viewport | DOM Loaded | DOM Interactive | Load Event | JS Heap |
|---|---:|---:|---:|---:|
| 1920x1080 | 1860ms | 1751ms | 1908ms | 9.54 MB |
| 1440x900 | 811ms | 673ms | 813ms | 9.54 MB |
| 768x1024 | 810ms | 690ms | 851ms | 9.54 MB |
| 375x812 | 909ms | 908ms | 1047ms | 9.54 MB |
## 📋 Summary Table

| Component | 1920x1080 | 1440x900 | 768x1024 | 375x812 |
|---|---|---|---|---|
| **Page Load** | ✅ | ✅ | ✅ | ✅ |
| **Theme Toggle** | ⚠️ | ⚠️ | ⚠️ | ⚠️ |
| **Mode Switcher** | ✅ | ✅ | ✅ | ✅ |
| **Login Modal** | ✅ | ✅ | ✅ | ✅ |
| **Single Grouped Ribbon** | ✅ | ✅ | ✅ | ✅ |
| **Grouped Stats Ribbon** | ✅ | ✅ | ✅ | ✅ |
| **Format Filters Removed** | ✅ | ✅ | ✅ | ✅ |
| **Upload & AI Compare** | ✅ | ✅ | ✅ | ✅ |
| **Search Input** | ✅ | ✅ | ✅ | ✅ |
| **Document Modal** | ❌ | ❌ | ❌ | ❌ |
| **Settings Modal** | ✅ | ✅ | ✅ | ✅ |
| **Refresh Button** | ✅ | ✅ | ✅ | ✅ |
| **Auto-refresh Toggle** | ❌ | ❌ | ❌ | ❌ |
| **Layout Assessment** | ✅ | ✅ | ✅ | ✅ |

---

## 📐 1920x1080

**Overall: ❌ FAIL** (11 pass, 1 warn, 2 fail)

- ✅ **Page Load** `PASS`  
  Loaded http://localhost:8888/index.html
- ⚠️ **Theme Toggle** `WARN`  
  dark → dark → restored
- ✅ **Mode Switcher** `PASS`  
  Live clicked → Demo restored
- ✅ **Login Modal** `PASS`  
  Demo login: opened dashboard | Role: "Role: User (Read-Only)"
- ✅ **Single Grouped Ribbon** `PASS`  
  legacy_ribbon:0 | grouped_sections:4
- ✅ **Grouped Stats Ribbon** `PASS`  
  groups:4 | pending:4 | approved:0 | revised:0 | rejected:0 | archived:0 | upload_card:true
- ✅ **Format Filters Removed** `PASS`  
  format_filters:0 | auto_sync:false
- ✅ **Upload & AI Compare** `PASS`  
  oversize_error:Ukuran file terlalu besar! Maksimal 5 MB. | compare_button:true | compare_modal:true | status:REVISI_DITERIMA
- ✅ **Search Input** `PASS`  
  "Kemenkeu" → 1 cards. After clear → 4 cards
- ❌ **Document Modal** `FAIL`  
  locator.click: Timeout 3000ms exceeded.
Call log:
[2m  - waiting for locator('#document-grid button').first()[22m
[2m    - locator resolved to <button disabled title="Read-Only Mode" onclick="openActionModal('TASK-2026-0801', 'approve')" class="btn-action-trigger opacity-50 cursor-not-allowed flex-1 min-h-[40px] px-3 py-2 bg-brandpurple-600 hover:bg-brandpurple-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all duration-300 active:scale-95">…</button>[22m
[2m  - attempting click action[22m
[2m    2 × waiting for element to be visible, enabled and stable[22m
[2m      - element is not enabled[22m
[2m    - retrying click action[22m
[2m    - waiting 20ms[22m
[2m    2 × waiting for element to be visible, enabled and stable[22m
[2m      - element is not enabled[22m
[2m    - retrying click action[22m
[2m      - waiting 100ms[22m
[2m    5 × waiting for element to be visible, enabled and stable[22m
[2m      - element is not enabled[22m
[2m    - retrying click action[22m
[2m      - waiting 500ms[22m

- ✅ **Settings Modal** `PASS`  
  Overlay elements visible: 6. Closed with Escape.
- ✅ **Refresh Button** `PASS`  
  Clicked, data reload triggered
- ❌ **Auto-refresh Toggle** `FAIL`  
  locator.click: Timeout 30000ms exceeded.
Call log:
[2m  - waiting for locator('#auto-refresh-check')[22m
[2m    - locator resolved to <input type="checkbox" id="auto-refresh-check" class="rounded border-white/10 bg-white/5 text-brandgold-500 focus:ring-0"/>[22m
[2m  - attempting click action[22m
[2m    2 × waiting for element to be visible, enabled and stable[22m
[2m      - element is visible, enabled and stable[22m
[2m      - scrolling into view if needed[22m
[2m      - done scrolling[22m
[2m      - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events[22m
[2m    - retrying click action[22m
[2m    - waiting 20ms[22m
[2m    2 × waiting for element to be visible, enabled and stable[22m
[2m      - element is visible, enabled and stable[22m
[2m      - scrolling into view if needed[22m
[2m      - done scrolling[22m
[2m      - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events[22m
[2m    - retrying click action[22m
[2m      - waiting 100ms[22m
[2m    55 × waiting for element to be visible, enabled and stable[22m
[2m       - element is visible, enabled and stable[22m
[2m       - scrolling into view if needed[22m
[2m       - done scrolling[22m
[2m       - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events[22m
[2m     - retrying click action[22m
[2m       - waiting 500ms[22m

- ✅ **Layout Assessment** `PASS`  
  Header=77px | Cols="580px 580px" | Cards=4 | HorzOverflow=false

## 📐 1440x900

**Overall: ❌ FAIL** (11 pass, 1 warn, 2 fail)

- ✅ **Page Load** `PASS`  
  Loaded http://localhost:8888/index.html
- ⚠️ **Theme Toggle** `WARN`  
  dark → dark → restored
- ✅ **Mode Switcher** `PASS`  
  Live clicked → Demo restored
- ✅ **Login Modal** `PASS`  
  Demo login: opened dashboard | Role: "Role: User (Read-Only)"
- ✅ **Single Grouped Ribbon** `PASS`  
  legacy_ribbon:0 | grouped_sections:4
- ✅ **Grouped Stats Ribbon** `PASS`  
  groups:4 | pending:4 | approved:0 | revised:0 | rejected:0 | archived:0 | upload_card:true
- ✅ **Format Filters Removed** `PASS`  
  format_filters:0 | auto_sync:false
- ✅ **Upload & AI Compare** `PASS`  
  oversize_error:Ukuran file terlalu besar! Maksimal 5 MB. | compare_button:true | compare_modal:true | status:REVISI_DITERIMA
- ✅ **Search Input** `PASS`  
  "Kemenkeu" → 1 cards. After clear → 4 cards
- ❌ **Document Modal** `FAIL`  
  locator.click: Timeout 3000ms exceeded.
Call log:
[2m  - waiting for locator('#document-grid button').first()[22m
[2m    - locator resolved to <button disabled title="Read-Only Mode" onclick="openActionModal('TASK-2026-0801', 'approve')" class="btn-action-trigger opacity-50 cursor-not-allowed flex-1 min-h-[40px] px-3 py-2 bg-brandpurple-600 hover:bg-brandpurple-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all duration-300 active:scale-95">…</button>[22m
[2m  - attempting click action[22m
[2m    2 × waiting for element to be visible, enabled and stable[22m
[2m      - element is not enabled[22m
[2m    - retrying click action[22m
[2m    - waiting 20ms[22m
[2m    2 × waiting for element to be visible, enabled and stable[22m
[2m      - element is not enabled[22m
[2m    - retrying click action[22m
[2m      - waiting 100ms[22m
[2m    5 × waiting for element to be visible, enabled and stable[22m
[2m      - element is not enabled[22m
[2m    - retrying click action[22m
[2m      - waiting 500ms[22m

- ✅ **Settings Modal** `PASS`  
  Overlay elements visible: 6. Closed with Escape.
- ✅ **Refresh Button** `PASS`  
  Clicked, data reload triggered
- ❌ **Auto-refresh Toggle** `FAIL`  
  locator.click: Timeout 30000ms exceeded.
Call log:
[2m  - waiting for locator('#auto-refresh-check')[22m
[2m    - locator resolved to <input type="checkbox" id="auto-refresh-check" class="rounded border-white/10 bg-white/5 text-brandgold-500 focus:ring-0"/>[22m
[2m  - attempting click action[22m
[2m    2 × waiting for element to be visible, enabled and stable[22m
[2m      - element is visible, enabled and stable[22m
[2m      - scrolling into view if needed[22m
[2m      - done scrolling[22m
[2m      - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events[22m
[2m    - retrying click action[22m
[2m    - waiting 20ms[22m
[2m    2 × waiting for element to be visible, enabled and stable[22m
[2m      - element is visible, enabled and stable[22m
[2m      - scrolling into view if needed[22m
[2m      - done scrolling[22m
[2m      - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events[22m
[2m    - retrying click action[22m
[2m      - waiting 100ms[22m
[2m    54 × waiting for element to be visible, enabled and stable[22m
[2m       - element is visible, enabled and stable[22m
[2m       - scrolling into view if needed[22m
[2m       - done scrolling[22m
[2m       - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events[22m
[2m     - retrying click action[22m
[2m       - waiting 500ms[22m

- ✅ **Layout Assessment** `PASS`  
  Header=77px | Cols="580px 580px" | Cards=4 | HorzOverflow=false

## 📐 768x1024

**Overall: ❌ FAIL** (11 pass, 1 warn, 2 fail)

- ✅ **Page Load** `PASS`  
  Loaded http://localhost:8888/index.html
- ⚠️ **Theme Toggle** `WARN`  
  dark → dark → restored
- ✅ **Mode Switcher** `PASS`  
  Live clicked → Demo restored
- ✅ **Login Modal** `PASS`  
  Demo login: opened dashboard | Role: "Role: User (Read-Only)"
- ✅ **Single Grouped Ribbon** `PASS`  
  legacy_ribbon:0 | grouped_sections:4
- ✅ **Grouped Stats Ribbon** `PASS`  
  groups:4 | pending:4 | approved:0 | revised:0 | rejected:0 | archived:0 | upload_card:true
- ✅ **Format Filters Removed** `PASS`  
  format_filters:0 | auto_sync:false
- ✅ **Upload & AI Compare** `PASS`  
  oversize_error:Ukuran file terlalu besar! Maksimal 5 MB. | compare_button:true | compare_modal:true | status:REVISI_DITERIMA
- ✅ **Search Input** `PASS`  
  "Kemenkeu" → 1 cards. After clear → 4 cards
- ❌ **Document Modal** `FAIL`  
  locator.click: Timeout 3000ms exceeded.
Call log:
[2m  - waiting for locator('#document-grid button').first()[22m
[2m    - locator resolved to <button disabled title="Read-Only Mode" onclick="openActionModal('TASK-2026-0801', 'approve')" class="btn-action-trigger opacity-50 cursor-not-allowed flex-1 min-h-[40px] px-3 py-2 bg-brandpurple-600 hover:bg-brandpurple-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all duration-300 active:scale-95">…</button>[22m
[2m  - attempting click action[22m
[2m    2 × waiting for element to be visible, enabled and stable[22m
[2m      - element is not enabled[22m
[2m    - retrying click action[22m
[2m    - waiting 20ms[22m
[2m    2 × waiting for element to be visible, enabled and stable[22m
[2m      - element is not enabled[22m
[2m    - retrying click action[22m
[2m      - waiting 100ms[22m
[2m    5 × waiting for element to be visible, enabled and stable[22m
[2m      - element is not enabled[22m
[2m    - retrying click action[22m
[2m      - waiting 500ms[22m

- ✅ **Settings Modal** `PASS`  
  Overlay elements visible: 6. Closed with Escape.
- ✅ **Refresh Button** `PASS`  
  Clicked, data reload triggered
- ❌ **Auto-refresh Toggle** `FAIL`  
  locator.click: Timeout 30000ms exceeded.
Call log:
[2m  - waiting for locator('#auto-refresh-check')[22m
[2m    - locator resolved to <input type="checkbox" id="auto-refresh-check" class="rounded border-white/10 bg-white/5 text-brandgold-500 focus:ring-0"/>[22m
[2m  - attempting click action[22m
[2m    - waiting for element to be visible, enabled and stable[22m
[2m    - element is visible, enabled and stable[22m
[2m    - scrolling into view if needed[22m
[2m    - done scrolling[22m
[2m    - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events[22m
[2m  - retrying click action[22m
[2m    - waiting for element to be visible, enabled and stable[22m
[2m    - element is visible, enabled and stable[22m
[2m    - scrolling into view if needed[22m
[2m    - done scrolling[22m
[2m    - <div class="space-y-4">…</div> from <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> subtree intercepts pointer events[22m
[2m  - retrying click action[22m
[2m    - waiting 20ms[22m
[2m    - waiting for element to be visible, enabled and stable[22m
[2m    - element is visible, enabled and stable[22m
[2m    - scrolling into view if needed[22m
[2m    - done scrolling[22m
[2m    - <div class="space-y-4">…</div> from <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> subtree intercepts pointer events[22m
[2m  2 × retrying click action[22m
[2m      - waiting 100ms[22m
[2m      - waiting for element to be visible, enabled and stable[22m
[2m      - element is visible, enabled and stable[22m
[2m      - scrolling into view if needed[22m
[2m      - done scrolling[22m
[2m      - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events[22m
[2m  13 × retrying click action[22m
[2m       - waiting 500ms[22m
[2m       - waiting for element to be visible, enabled and stable[22m
[2m       - element is visible, enabled and stable[22m
[2m       - scrolling into view if needed[22m
[2m       - done scrolling[22m
[2m       - <div class="space-y-4">…</div> from <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> subtree intercepts pointer events[22m
[2m     - retrying click action[22m
[2m       - waiting 500ms[22m
[2m       - waiting for element to be visible, enabled and stable[22m
[2m       - element is visible, enabled and stable[22m
[2m       - scrolling into view if needed[22m
[2m       - done scrolling[22m
[2m       - <div class="space-y-4">…</div> from <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> subtree intercepts pointer events[22m
[2m     - retrying click action[22m
[2m       - waiting 500ms[22m
[2m       - waiting for element to be visible, enabled and stable[22m
[2m       - element is visible, enabled and stable[22m
[2m       - scrolling into view if needed[22m
[2m       - done scrolling[22m
[2m       - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events[22m
[2m     - retrying click action[22m
[2m       - waiting 500ms[22m
[2m       - waiting for element to be visible, enabled and stable[22m
[2m       - element is visible, enabled and stable[22m
[2m       - scrolling into view if needed[22m
[2m       - done scrolling[22m
[2m       - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events[22m
[2m  2 × retrying click action[22m
[2m      - waiting 500ms[22m
[2m      - waiting for element to be visible, enabled and stable[22m
[2m      - element is visible, enabled and stable[22m
[2m      - scrolling into view if needed[22m
[2m      - done scrolling[22m
[2m      - <div class="space-y-4">…</div> from <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> subtree intercepts pointer events[22m
[2m  - retrying click action[22m
[2m    - waiting 500ms[22m

- ✅ **Layout Assessment** `PASS`  
  Header=135px | Cols="672px" | Cards=4 | HorzOverflow=false

## 📐 375x812

**Overall: ❌ FAIL** (11 pass, 1 warn, 2 fail)

- ✅ **Page Load** `PASS`  
  Loaded http://localhost:8888/index.html
- ⚠️ **Theme Toggle** `WARN`  
  dark → dark → restored
- ✅ **Mode Switcher** `PASS`  
  Live clicked → Demo restored
- ✅ **Login Modal** `PASS`  
  Demo login: opened dashboard | Role: "Role: User (Read-Only)"
- ✅ **Single Grouped Ribbon** `PASS`  
  legacy_ribbon:0 | grouped_sections:4
- ✅ **Grouped Stats Ribbon** `PASS`  
  groups:4 | pending:4 | approved:0 | revised:0 | rejected:0 | archived:0 | upload_card:true
- ✅ **Format Filters Removed** `PASS`  
  format_filters:0 | auto_sync:false
- ✅ **Upload & AI Compare** `PASS`  
  oversize_error:Ukuran file terlalu besar! Maksimal 5 MB. | compare_button:true | compare_modal:true | status:REVISI_DITERIMA
- ✅ **Search Input** `PASS`  
  "Kemenkeu" → 1 cards. After clear → 4 cards
- ❌ **Document Modal** `FAIL`  
  locator.click: Timeout 3000ms exceeded.
Call log:
[2m  - waiting for locator('#document-grid button').first()[22m
[2m    - locator resolved to <button disabled title="Read-Only Mode" onclick="openActionModal('TASK-2026-0801', 'approve')" class="btn-action-trigger opacity-50 cursor-not-allowed flex-1 min-h-[40px] px-3 py-2 bg-brandpurple-600 hover:bg-brandpurple-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all duration-300 active:scale-95">…</button>[22m
[2m  - attempting click action[22m
[2m    2 × waiting for element to be visible, enabled and stable[22m
[2m      - element is not enabled[22m
[2m    - retrying click action[22m
[2m    - waiting 20ms[22m
[2m    2 × waiting for element to be visible, enabled and stable[22m
[2m      - element is not enabled[22m
[2m    - retrying click action[22m
[2m      - waiting 100ms[22m
[2m    5 × waiting for element to be visible, enabled and stable[22m
[2m      - element is not enabled[22m
[2m    - retrying click action[22m
[2m      - waiting 500ms[22m

- ✅ **Settings Modal** `PASS`  
  Overlay elements visible: 6. Closed with Escape.
- ✅ **Refresh Button** `PASS`  
  Clicked, data reload triggered
- ❌ **Auto-refresh Toggle** `FAIL`  
  locator.click: Timeout 30000ms exceeded.
Call log:
[2m  - waiting for locator('#auto-refresh-check')[22m
[2m    - locator resolved to <input type="checkbox" id="auto-refresh-check" class="rounded border-white/10 bg-white/5 text-brandgold-500 focus:ring-0"/>[22m
[2m  - attempting click action[22m
[2m    2 × waiting for element to be visible, enabled and stable[22m
[2m      - element is visible, enabled and stable[22m
[2m      - scrolling into view if needed[22m
[2m      - done scrolling[22m
[2m      - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events[22m
[2m    - retrying click action[22m
[2m    - waiting 20ms[22m
[2m    - waiting for element to be visible, enabled and stable[22m
[2m    - element is visible, enabled and stable[22m
[2m    - scrolling into view if needed[22m
[2m    - done scrolling[22m
[2m    - <div class="glass-modal w-full max-w-lg rounded-3xl p-6 md:p-8 animate-fade-in-up">…</div> from <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> subtree intercepts pointer events[22m
[2m  2 × retrying click action[22m
[2m      - waiting 100ms[22m
[2m      - waiting for element to be visible, enabled and stable[22m
[2m      - element is visible, enabled and stable[22m
[2m      - scrolling into view if needed[22m
[2m      - done scrolling[22m
[2m      - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events[22m
[2m  13 × retrying click action[22m
[2m       - waiting 500ms[22m
[2m       - waiting for element to be visible, enabled and stable[22m
[2m       - element is visible, enabled and stable[22m
[2m       - scrolling into view if needed[22m
[2m       - done scrolling[22m
[2m       - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events[22m
[2m     - retrying click action[22m
[2m       - waiting 500ms[22m
[2m       - waiting for element to be visible, enabled and stable[22m
[2m       - element is visible, enabled and stable[22m
[2m       - scrolling into view if needed[22m
[2m       - done scrolling[22m
[2m       - <div class="glass-modal w-full max-w-lg rounded-3xl p-6 md:p-8 animate-fade-in-up">…</div> from <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> subtree intercepts pointer events[22m
[2m     - retrying click action[22m
[2m       - waiting 500ms[22m
[2m       - waiting for element to be visible, enabled and stable[22m
[2m       - element is visible, enabled and stable[22m
[2m       - scrolling into view if needed[22m
[2m       - done scrolling[22m
[2m       - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events[22m
[2m     - retrying click action[22m
[2m       - waiting 500ms[22m
[2m       - waiting for element to be visible, enabled and stable[22m
[2m       - element is visible, enabled and stable[22m
[2m       - scrolling into view if needed[22m
[2m       - done scrolling[22m
[2m       - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events[22m
[2m  - retrying click action[22m
[2m    - waiting 500ms[22m
[2m    - waiting for element to be visible, enabled and stable[22m
[2m    - element is visible, enabled and stable[22m
[2m    - scrolling into view if needed[22m
[2m    - done scrolling[22m
[2m    - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events[22m
[2m  - retrying click action[22m
[2m    - waiting 500ms[22m
[2m    - waiting for element to be visible, enabled and stable[22m
[2m    - element is visible, enabled and stable[22m
[2m    - scrolling into view if needed[22m
[2m    - done scrolling[22m
[2m    - <div class="glass-modal w-full max-w-lg rounded-3xl p-6 md:p-8 animate-fade-in-up">…</div> from <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> subtree intercepts pointer events[22m
[2m  - retrying click action[22m
[2m    - waiting 500ms[22m
[2m    - waiting for element to be visible, enabled and stable[22m
[2m    - element is visible, enabled and stable[22m
[2m    - scrolling into view if needed[22m
[2m    - done scrolling[22m
[2m    - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events[22m
[2m  - retrying click action[22m
[2m    - waiting 500ms[22m

- ✅ **Layout Assessment** `PASS`  
  Header=248px | Cols="343px" | Cards=4 | HorzOverflow=false

---

## 🐛 Issues & Warnings

- **[1920x1080] Theme Toggle** (WARN): dark → dark → restored
- **[1920x1080] Document Modal** (FAIL): locator.click: Timeout 3000ms exceeded.
Call log:
[2m  - waiting for locator('#document-grid button').first()[22m
[2m    - locator resolved to <button disabled title="Read-Only Mode" onclick="openActionModal('TASK-2026-0801', 'approve')" class="btn-action-trigger opacity-50 cursor-not-allowed flex-1 min-h-[40px] px-3 py-2 bg-brandpurple-600 hover:bg-brandpurple-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all duration-300 active:scale-95">…</button>[22m
[2m  - attempting click action[22m
[2m    2 × waiting for element to be visible, enabled and stable[22m
[2m      - element is not enabled[22m
[2m    - retrying click action[22m
[2m    - waiting 20ms[22m
[2m    2 × waiting for element to be visible, enabled and stable[22m
[2m      - element is not enabled[22m
[2m    - retrying click action[22m
[2m      - waiting 100ms[22m
[2m    5 × waiting for element to be visible, enabled and stable[22m
[2m      - element is not enabled[22m
[2m    - retrying click action[22m
[2m      - waiting 500ms[22m

- **[1920x1080] Auto-refresh Toggle** (FAIL): locator.click: Timeout 30000ms exceeded.
Call log:
[2m  - waiting for locator('#auto-refresh-check')[22m
[2m    - locator resolved to <input type="checkbox" id="auto-refresh-check" class="rounded border-white/10 bg-white/5 text-brandgold-500 focus:ring-0"/>[22m
[2m  - attempting click action[22m
[2m    2 × waiting for element to be visible, enabled and stable[22m
[2m      - element is visible, enabled and stable[22m
[2m      - scrolling into view if needed[22m
[2m      - done scrolling[22m
[2m      - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events[22m
[2m    - retrying click action[22m
[2m    - waiting 20ms[22m
[2m    2 × waiting for element to be visible, enabled and stable[22m
[2m      - element is visible, enabled and stable[22m
[2m      - scrolling into view if needed[22m
[2m      - done scrolling[22m
[2m      - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events[22m
[2m    - retrying click action[22m
[2m      - waiting 100ms[22m
[2m    55 × waiting for element to be visible, enabled and stable[22m
[2m       - element is visible, enabled and stable[22m
[2m       - scrolling into view if needed[22m
[2m       - done scrolling[22m
[2m       - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events[22m
[2m     - retrying click action[22m
[2m       - waiting 500ms[22m

- **[1440x900] Theme Toggle** (WARN): dark → dark → restored
- **[1440x900] Document Modal** (FAIL): locator.click: Timeout 3000ms exceeded.
Call log:
[2m  - waiting for locator('#document-grid button').first()[22m
[2m    - locator resolved to <button disabled title="Read-Only Mode" onclick="openActionModal('TASK-2026-0801', 'approve')" class="btn-action-trigger opacity-50 cursor-not-allowed flex-1 min-h-[40px] px-3 py-2 bg-brandpurple-600 hover:bg-brandpurple-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all duration-300 active:scale-95">…</button>[22m
[2m  - attempting click action[22m
[2m    2 × waiting for element to be visible, enabled and stable[22m
[2m      - element is not enabled[22m
[2m    - retrying click action[22m
[2m    - waiting 20ms[22m
[2m    2 × waiting for element to be visible, enabled and stable[22m
[2m      - element is not enabled[22m
[2m    - retrying click action[22m
[2m      - waiting 100ms[22m
[2m    5 × waiting for element to be visible, enabled and stable[22m
[2m      - element is not enabled[22m
[2m    - retrying click action[22m
[2m      - waiting 500ms[22m

- **[1440x900] Auto-refresh Toggle** (FAIL): locator.click: Timeout 30000ms exceeded.
Call log:
[2m  - waiting for locator('#auto-refresh-check')[22m
[2m    - locator resolved to <input type="checkbox" id="auto-refresh-check" class="rounded border-white/10 bg-white/5 text-brandgold-500 focus:ring-0"/>[22m
[2m  - attempting click action[22m
[2m    2 × waiting for element to be visible, enabled and stable[22m
[2m      - element is visible, enabled and stable[22m
[2m      - scrolling into view if needed[22m
[2m      - done scrolling[22m
[2m      - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events[22m
[2m    - retrying click action[22m
[2m    - waiting 20ms[22m
[2m    2 × waiting for element to be visible, enabled and stable[22m
[2m      - element is visible, enabled and stable[22m
[2m      - scrolling into view if needed[22m
[2m      - done scrolling[22m
[2m      - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events[22m
[2m    - retrying click action[22m
[2m      - waiting 100ms[22m
[2m    54 × waiting for element to be visible, enabled and stable[22m
[2m       - element is visible, enabled and stable[22m
[2m       - scrolling into view if needed[22m
[2m       - done scrolling[22m
[2m       - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events[22m
[2m     - retrying click action[22m
[2m       - waiting 500ms[22m

- **[768x1024] Theme Toggle** (WARN): dark → dark → restored
- **[768x1024] Document Modal** (FAIL): locator.click: Timeout 3000ms exceeded.
Call log:
[2m  - waiting for locator('#document-grid button').first()[22m
[2m    - locator resolved to <button disabled title="Read-Only Mode" onclick="openActionModal('TASK-2026-0801', 'approve')" class="btn-action-trigger opacity-50 cursor-not-allowed flex-1 min-h-[40px] px-3 py-2 bg-brandpurple-600 hover:bg-brandpurple-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all duration-300 active:scale-95">…</button>[22m
[2m  - attempting click action[22m
[2m    2 × waiting for element to be visible, enabled and stable[22m
[2m      - element is not enabled[22m
[2m    - retrying click action[22m
[2m    - waiting 20ms[22m
[2m    2 × waiting for element to be visible, enabled and stable[22m
[2m      - element is not enabled[22m
[2m    - retrying click action[22m
[2m      - waiting 100ms[22m
[2m    5 × waiting for element to be visible, enabled and stable[22m
[2m      - element is not enabled[22m
[2m    - retrying click action[22m
[2m      - waiting 500ms[22m

- **[768x1024] Auto-refresh Toggle** (FAIL): locator.click: Timeout 30000ms exceeded.
Call log:
[2m  - waiting for locator('#auto-refresh-check')[22m
[2m    - locator resolved to <input type="checkbox" id="auto-refresh-check" class="rounded border-white/10 bg-white/5 text-brandgold-500 focus:ring-0"/>[22m
[2m  - attempting click action[22m
[2m    - waiting for element to be visible, enabled and stable[22m
[2m    - element is visible, enabled and stable[22m
[2m    - scrolling into view if needed[22m
[2m    - done scrolling[22m
[2m    - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events[22m
[2m  - retrying click action[22m
[2m    - waiting for element to be visible, enabled and stable[22m
[2m    - element is visible, enabled and stable[22m
[2m    - scrolling into view if needed[22m
[2m    - done scrolling[22m
[2m    - <div class="space-y-4">…</div> from <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> subtree intercepts pointer events[22m
[2m  - retrying click action[22m
[2m    - waiting 20ms[22m
[2m    - waiting for element to be visible, enabled and stable[22m
[2m    - element is visible, enabled and stable[22m
[2m    - scrolling into view if needed[22m
[2m    - done scrolling[22m
[2m    - <div class="space-y-4">…</div> from <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> subtree intercepts pointer events[22m
[2m  2 × retrying click action[22m
[2m      - waiting 100ms[22m
[2m      - waiting for element to be visible, enabled and stable[22m
[2m      - element is visible, enabled and stable[22m
[2m      - scrolling into view if needed[22m
[2m      - done scrolling[22m
[2m      - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events[22m
[2m  13 × retrying click action[22m
[2m       - waiting 500ms[22m
[2m       - waiting for element to be visible, enabled and stable[22m
[2m       - element is visible, enabled and stable[22m
[2m       - scrolling into view if needed[22m
[2m       - done scrolling[22m
[2m       - <div class="space-y-4">…</div> from <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> subtree intercepts pointer events[22m
[2m     - retrying click action[22m
[2m       - waiting 500ms[22m
[2m       - waiting for element to be visible, enabled and stable[22m
[2m       - element is visible, enabled and stable[22m
[2m       - scrolling into view if needed[22m
[2m       - done scrolling[22m
[2m       - <div class="space-y-4">…</div> from <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> subtree intercepts pointer events[22m
[2m     - retrying click action[22m
[2m       - waiting 500ms[22m
[2m       - waiting for element to be visible, enabled and stable[22m
[2m       - element is visible, enabled and stable[22m
[2m       - scrolling into view if needed[22m
[2m       - done scrolling[22m
[2m       - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events[22m
[2m     - retrying click action[22m
[2m       - waiting 500ms[22m
[2m       - waiting for element to be visible, enabled and stable[22m
[2m       - element is visible, enabled and stable[22m
[2m       - scrolling into view if needed[22m
[2m       - done scrolling[22m
[2m       - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events[22m
[2m  2 × retrying click action[22m
[2m      - waiting 500ms[22m
[2m      - waiting for element to be visible, enabled and stable[22m
[2m      - element is visible, enabled and stable[22m
[2m      - scrolling into view if needed[22m
[2m      - done scrolling[22m
[2m      - <div class="space-y-4">…</div> from <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> subtree intercepts pointer events[22m
[2m  - retrying click action[22m
[2m    - waiting 500ms[22m

- **[375x812] Theme Toggle** (WARN): dark → dark → restored
- **[375x812] Document Modal** (FAIL): locator.click: Timeout 3000ms exceeded.
Call log:
[2m  - waiting for locator('#document-grid button').first()[22m
[2m    - locator resolved to <button disabled title="Read-Only Mode" onclick="openActionModal('TASK-2026-0801', 'approve')" class="btn-action-trigger opacity-50 cursor-not-allowed flex-1 min-h-[40px] px-3 py-2 bg-brandpurple-600 hover:bg-brandpurple-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all duration-300 active:scale-95">…</button>[22m
[2m  - attempting click action[22m
[2m    2 × waiting for element to be visible, enabled and stable[22m
[2m      - element is not enabled[22m
[2m    - retrying click action[22m
[2m    - waiting 20ms[22m
[2m    2 × waiting for element to be visible, enabled and stable[22m
[2m      - element is not enabled[22m
[2m    - retrying click action[22m
[2m      - waiting 100ms[22m
[2m    5 × waiting for element to be visible, enabled and stable[22m
[2m      - element is not enabled[22m
[2m    - retrying click action[22m
[2m      - waiting 500ms[22m

- **[375x812] Auto-refresh Toggle** (FAIL): locator.click: Timeout 30000ms exceeded.
Call log:
[2m  - waiting for locator('#auto-refresh-check')[22m
[2m    - locator resolved to <input type="checkbox" id="auto-refresh-check" class="rounded border-white/10 bg-white/5 text-brandgold-500 focus:ring-0"/>[22m
[2m  - attempting click action[22m
[2m    2 × waiting for element to be visible, enabled and stable[22m
[2m      - element is visible, enabled and stable[22m
[2m      - scrolling into view if needed[22m
[2m      - done scrolling[22m
[2m      - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events[22m
[2m    - retrying click action[22m
[2m    - waiting 20ms[22m
[2m    - waiting for element to be visible, enabled and stable[22m
[2m    - element is visible, enabled and stable[22m
[2m    - scrolling into view if needed[22m
[2m    - done scrolling[22m
[2m    - <div class="glass-modal w-full max-w-lg rounded-3xl p-6 md:p-8 animate-fade-in-up">…</div> from <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> subtree intercepts pointer events[22m
[2m  2 × retrying click action[22m
[2m      - waiting 100ms[22m
[2m      - waiting for element to be visible, enabled and stable[22m
[2m      - element is visible, enabled and stable[22m
[2m      - scrolling into view if needed[22m
[2m      - done scrolling[22m
[2m      - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events[22m
[2m  13 × retrying click action[22m
[2m       - waiting 500ms[22m
[2m       - waiting for element to be visible, enabled and stable[22m
[2m       - element is visible, enabled and stable[22m
[2m       - scrolling into view if needed[22m
[2m       - done scrolling[22m
[2m       - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events[22m
[2m     - retrying click action[22m
[2m       - waiting 500ms[22m
[2m       - waiting for element to be visible, enabled and stable[22m
[2m       - element is visible, enabled and stable[22m
[2m       - scrolling into view if needed[22m
[2m       - done scrolling[22m
[2m       - <div class="glass-modal w-full max-w-lg rounded-3xl p-6 md:p-8 animate-fade-in-up">…</div> from <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> subtree intercepts pointer events[22m
[2m     - retrying click action[22m
[2m       - waiting 500ms[22m
[2m       - waiting for element to be visible, enabled and stable[22m
[2m       - element is visible, enabled and stable[22m
[2m       - scrolling into view if needed[22m
[2m       - done scrolling[22m
[2m       - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events[22m
[2m     - retrying click action[22m
[2m       - waiting 500ms[22m
[2m       - waiting for element to be visible, enabled and stable[22m
[2m       - element is visible, enabled and stable[22m
[2m       - scrolling into view if needed[22m
[2m       - done scrolling[22m
[2m       - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events[22m
[2m  - retrying click action[22m
[2m    - waiting 500ms[22m
[2m    - waiting for element to be visible, enabled and stable[22m
[2m    - element is visible, enabled and stable[22m
[2m    - scrolling into view if needed[22m
[2m    - done scrolling[22m
[2m    - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events[22m
[2m  - retrying click action[22m
[2m    - waiting 500ms[22m
[2m    - waiting for element to be visible, enabled and stable[22m
[2m    - element is visible, enabled and stable[22m
[2m    - scrolling into view if needed[22m
[2m    - done scrolling[22m
[2m    - <div class="glass-modal w-full max-w-lg rounded-3xl p-6 md:p-8 animate-fade-in-up">…</div> from <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> subtree intercepts pointer events[22m
[2m  - retrying click action[22m
[2m    - waiting 500ms[22m
[2m    - waiting for element to be visible, enabled and stable[22m
[2m    - element is visible, enabled and stable[22m
[2m    - scrolling into view if needed[22m
[2m    - done scrolling[22m
[2m    - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events[22m
[2m  - retrying click action[22m
[2m    - waiting 500ms[22m


---

## Browser Diagnostics

- **1920x1080**: console errors 0, network failures 0
- **1440x900**: console errors 0, network failures 0
- **768x1024**: console errors 0, network failures 0
- **375x812**: console errors 0, network failures 0

---

## 📸 Screenshots

Saved to `./test_screenshots/`

- `1440x900_00_initial.png`
- `1440x900_01_theme.png`
- `1440x900_02_mode.png`
- `1440x900_03_login.png`
- `1440x900_04_tabs.png`
- `1440x900_05_filters.png`
- `1440x900_06_search.png`
- `1440x900_07_modal.png`
- `1440x900_08_settings.png`
- `1440x900_09_refresh.png`
- `1920x1080_00_initial.png`
- `1920x1080_01_theme.png`
- `1920x1080_02_mode.png`
- `1920x1080_03_login.png`
- `1920x1080_04_tabs.png`
- `1920x1080_05_filters.png`
- `1920x1080_06_search.png`
- `1920x1080_07_modal.png`
- `1920x1080_08_settings.png`
- `1920x1080_09_refresh.png`
- `375x812_00_initial.png`
- `375x812_01_theme.png`
- `375x812_02_mode.png`
- `375x812_03_login.png`
- `375x812_04_tabs.png`
- `375x812_05_filters.png`
- `375x812_06_search.png`
- `375x812_07_modal.png`
- `375x812_08_settings.png`
- `375x812_09_refresh.png`
- `768x1024_00_initial.png`
- `768x1024_01_theme.png`
- `768x1024_02_mode.png`
- `768x1024_03_login.png`
- `768x1024_04_tabs.png`
- `768x1024_05_filters.png`
- `768x1024_06_search.png`
- `768x1024_07_modal.png`
- `768x1024_08_settings.png`
- `768x1024_09_refresh.png`
