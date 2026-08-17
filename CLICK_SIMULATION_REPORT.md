# 📊 APRUP v2.0 — UI Click Simulation Report

**Generated:** 13/8/2026, 15.56.27
**URL:** http://localhost:8888/index.html
**Engine:** Chromium via Playwright v1.62

---

## 📋 Summary Table

| Component | 1920x1080 | 1440x900 | 768x1024 | 375x812 |
|---|---|---|---|---|
| **Theme Toggle** | ✅ | ✅ | ✅ | ✅ |
| **Mode Switcher** | ✅ | ✅ | ✅ | ✅ |
| **Login Modal** | ✅ | ✅ | ✅ | ✅ |
| **Navigation Tabs** | ✅ | ✅ | ✅ | ✅ |
| **Format Filters** | ✅ | ✅ | ✅ | ✅ |
| **Search Input** | ✅ | ✅ | ✅ | ✅ |
| **Document Modal** | ⚠️ | ⚠️ | ⚠️ | ⚠️ |
| **Settings Modal** | ✅ | ✅ | ✅ | ✅ |
| **Refresh Button** | ✅ | ✅ | ✅ | ✅ |
| **Auto-refresh Toggle** | ❌ | ❌ | ❌ | ❌ |
| **Layout Assessment** | ✅ | ✅ | ✅ | ✅ |

---

## 📐 1920x1080

**Overall: ❌ FAIL** (9 pass, 1 warn, 1 fail)

- ✅ **Theme Toggle** `PASS`  
  dark → light → restored
- ✅ **Mode Switcher** `PASS`  
  Live clicked → Demo restored
- ✅ **Login Modal** `PASS`  
  Modal opened. Role after login: "Role: Admin"
- ✅ **Navigation Tabs** `PASS`  
  approved:clicked | revised:clicked | rejected:clicked | pending:clicked
- ✅ **Format Filters** `PASS`  
  pdf:1 | docx:1 | image:2 | all:4
- ✅ **Search Input** `PASS`  
  "Kemenkeu" → 1 cards. After clear → 4 cards
- ⚠️ **Document Modal** `WARN`  
  Modal did not open
- ✅ **Settings Modal** `PASS`  
  Overlay elements visible: 3. Closed with Escape.
- ✅ **Refresh Button** `PASS`  
  Clicked, data reload triggered
- ❌ **Auto-refresh Toggle** `FAIL`  
  locator.click: Timeout 30000ms exceeded.
Call log:
  - waiting for locator('#auto-refresh-check')
    - locator resolved to <input checked type="checkbox" id="auto-refresh-check" class="rounded border-white/10 bg-white/5 text-amber-500 focus:ring-0"/>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events
    - retrying click action
      - waiting 100ms
    51 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events
     - retrying click action
       - waiting 500ms

- ✅ **Layout Assessment** `PASS`  
  Header=77px | Cols="580px 580px" | Cards=3 | HorzOverflow=false

## 📐 1440x900

**Overall: ❌ FAIL** (9 pass, 1 warn, 1 fail)

- ✅ **Theme Toggle** `PASS`  
  dark → light → restored
- ✅ **Mode Switcher** `PASS`  
  Live clicked → Demo restored
- ✅ **Login Modal** `PASS`  
  Modal opened. Role after login: "Role: Admin"
- ✅ **Navigation Tabs** `PASS`  
  approved:clicked | revised:clicked | rejected:clicked | pending:clicked
- ✅ **Format Filters** `PASS`  
  pdf:1 | docx:1 | image:2 | all:4
- ✅ **Search Input** `PASS`  
  "Kemenkeu" → 1 cards. After clear → 4 cards
- ⚠️ **Document Modal** `WARN`  
  Modal did not open
- ✅ **Settings Modal** `PASS`  
  Overlay elements visible: 3. Closed with Escape.
- ✅ **Refresh Button** `PASS`  
  Clicked, data reload triggered
- ❌ **Auto-refresh Toggle** `FAIL`  
  locator.click: Timeout 30000ms exceeded.
Call log:
  - waiting for locator('#auto-refresh-check')
    - locator resolved to <input checked type="checkbox" id="auto-refresh-check" class="rounded border-white/10 bg-white/5 text-amber-500 focus:ring-0"/>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events
    - retrying click action
      - waiting 100ms
    50 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events
     - retrying click action
       - waiting 500ms

- ✅ **Layout Assessment** `PASS`  
  Header=77px | Cols="580px 580px" | Cards=3 | HorzOverflow=false

## 📐 768x1024

**Overall: ❌ FAIL** (9 pass, 1 warn, 1 fail)

- ✅ **Theme Toggle** `PASS`  
  dark → light → restored
- ✅ **Mode Switcher** `PASS`  
  Live clicked → Demo restored
- ✅ **Login Modal** `PASS`  
  Modal opened. Role after login: "Role: Admin"
- ✅ **Navigation Tabs** `PASS`  
  approved:clicked | revised:clicked | rejected:clicked | pending:clicked
- ✅ **Format Filters** `PASS`  
  pdf:1 | docx:1 | image:2 | all:4
- ✅ **Search Input** `PASS`  
  "Kemenkeu" → 1 cards. After clear → 4 cards
- ⚠️ **Document Modal** `WARN`  
  Modal did not open
- ✅ **Settings Modal** `PASS`  
  Overlay elements visible: 3. Closed with Escape.
- ✅ **Refresh Button** `PASS`  
  Clicked, data reload triggered
- ❌ **Auto-refresh Toggle** `FAIL`  
  locator.click: Timeout 30000ms exceeded.
Call log:
  - waiting for locator('#auto-refresh-check')
    - locator resolved to <input checked type="checkbox" id="auto-refresh-check" class="rounded border-white/10 bg-white/5 text-amber-500 focus:ring-0"/>
  - attempting click action
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events
  - retrying click action
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="glass-modal w-full max-w-lg rounded-3xl p-6 md:p-8 animate-fade-in-up">…</div> from <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> subtree intercepts pointer events
  - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="glass-modal w-full max-w-lg rounded-3xl p-6 md:p-8 animate-fade-in-up">…</div> from <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> subtree intercepts pointer events
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events
  13 × retrying click action
       - waiting 500ms
       - waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div class="glass-modal w-full max-w-lg rounded-3xl p-6 md:p-8 animate-fade-in-up">…</div> from <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> subtree intercepts pointer events
     - retrying click action
       - waiting 500ms
       - waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div class="glass-modal w-full max-w-lg rounded-3xl p-6 md:p-8 animate-fade-in-up">…</div> from <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> subtree intercepts pointer events
     - retrying click action
       - waiting 500ms
       - waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events
     - retrying click action
       - waiting 500ms
       - waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events
  - retrying click action
    - waiting 500ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed

- ✅ **Layout Assessment** `PASS`  
  Header=141px | Cols="672px" | Cards=3 | HorzOverflow=false

## 📐 375x812

**Overall: ❌ FAIL** (9 pass, 1 warn, 1 fail)

- ✅ **Theme Toggle** `PASS`  
  dark → light → restored
- ✅ **Mode Switcher** `PASS`  
  Live clicked → Demo restored
- ✅ **Login Modal** `PASS`  
  Modal opened. Role after login: "Role: Admin"
- ✅ **Navigation Tabs** `PASS`  
  approved:clicked | revised:clicked | rejected:clicked | pending:clicked
- ✅ **Format Filters** `PASS`  
  pdf:1 | docx:1 | image:2 | all:4
- ✅ **Search Input** `PASS`  
  "Kemenkeu" → 1 cards. After clear → 4 cards
- ⚠️ **Document Modal** `WARN`  
  Modal did not open
- ✅ **Settings Modal** `PASS`  
  Overlay elements visible: 3. Closed with Escape.
- ✅ **Refresh Button** `PASS`  
  Clicked, data reload triggered
- ❌ **Auto-refresh Toggle** `FAIL`  
  locator.click: Timeout 30000ms exceeded.
Call log:
  - waiting for locator('#auto-refresh-check')
    - locator resolved to <input checked type="checkbox" id="auto-refresh-check" class="rounded border-white/10 bg-white/5 text-amber-500 focus:ring-0"/>
  - attempting click action
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events
  - retrying click action
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="glass-modal w-full max-w-lg rounded-3xl p-6 md:p-8 animate-fade-in-up">…</div> from <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> subtree intercepts pointer events
  - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="glass-modal w-full max-w-lg rounded-3xl p-6 md:p-8 animate-fade-in-up">…</div> from <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> subtree intercepts pointer events
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events
  13 × retrying click action
       - waiting 500ms
       - waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div class="glass-modal w-full max-w-lg rounded-3xl p-6 md:p-8 animate-fade-in-up">…</div> from <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> subtree intercepts pointer events
     - retrying click action
       - waiting 500ms
       - waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div class="glass-modal w-full max-w-lg rounded-3xl p-6 md:p-8 animate-fade-in-up">…</div> from <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> subtree intercepts pointer events
     - retrying click action
       - waiting 500ms
       - waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events
     - retrying click action
       - waiting 500ms
       - waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events
  - retrying click action
    - waiting 500ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="glass-modal w-full max-w-lg rounded-3xl p-6 md:p-8 animate-fade-in-up">…</div> from <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms

- ✅ **Layout Assessment** `PASS`  
  Header=264px | Cols="343px" | Cards=3 | HorzOverflow=false

---

## 🐛 Issues & Warnings

- **[1920x1080] Document Modal** (WARN): Modal did not open
- **[1920x1080] Auto-refresh Toggle** (FAIL): locator.click: Timeout 30000ms exceeded.
Call log:
  - waiting for locator('#auto-refresh-check')
    - locator resolved to <input checked type="checkbox" id="auto-refresh-check" class="rounded border-white/10 bg-white/5 text-amber-500 focus:ring-0"/>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events
    - retrying click action
      - waiting 100ms
    51 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events
     - retrying click action
       - waiting 500ms

- **[1440x900] Document Modal** (WARN): Modal did not open
- **[1440x900] Auto-refresh Toggle** (FAIL): locator.click: Timeout 30000ms exceeded.
Call log:
  - waiting for locator('#auto-refresh-check')
    - locator resolved to <input checked type="checkbox" id="auto-refresh-check" class="rounded border-white/10 bg-white/5 text-amber-500 focus:ring-0"/>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events
    - retrying click action
      - waiting 100ms
    50 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events
     - retrying click action
       - waiting 500ms

- **[768x1024] Document Modal** (WARN): Modal did not open
- **[768x1024] Auto-refresh Toggle** (FAIL): locator.click: Timeout 30000ms exceeded.
Call log:
  - waiting for locator('#auto-refresh-check')
    - locator resolved to <input checked type="checkbox" id="auto-refresh-check" class="rounded border-white/10 bg-white/5 text-amber-500 focus:ring-0"/>
  - attempting click action
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events
  - retrying click action
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="glass-modal w-full max-w-lg rounded-3xl p-6 md:p-8 animate-fade-in-up">…</div> from <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> subtree intercepts pointer events
  - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="glass-modal w-full max-w-lg rounded-3xl p-6 md:p-8 animate-fade-in-up">…</div> from <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> subtree intercepts pointer events
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events
  13 × retrying click action
       - waiting 500ms
       - waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div class="glass-modal w-full max-w-lg rounded-3xl p-6 md:p-8 animate-fade-in-up">…</div> from <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> subtree intercepts pointer events
     - retrying click action
       - waiting 500ms
       - waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div class="glass-modal w-full max-w-lg rounded-3xl p-6 md:p-8 animate-fade-in-up">…</div> from <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> subtree intercepts pointer events
     - retrying click action
       - waiting 500ms
       - waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events
     - retrying click action
       - waiting 500ms
       - waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events
  - retrying click action
    - waiting 500ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed

- **[375x812] Document Modal** (WARN): Modal did not open
- **[375x812] Auto-refresh Toggle** (FAIL): locator.click: Timeout 30000ms exceeded.
Call log:
  - waiting for locator('#auto-refresh-check')
    - locator resolved to <input checked type="checkbox" id="auto-refresh-check" class="rounded border-white/10 bg-white/5 text-amber-500 focus:ring-0"/>
  - attempting click action
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events
  - retrying click action
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="glass-modal w-full max-w-lg rounded-3xl p-6 md:p-8 animate-fade-in-up">…</div> from <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> subtree intercepts pointer events
  - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="glass-modal w-full max-w-lg rounded-3xl p-6 md:p-8 animate-fade-in-up">…</div> from <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> subtree intercepts pointer events
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events
  13 × retrying click action
       - waiting 500ms
       - waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div class="glass-modal w-full max-w-lg rounded-3xl p-6 md:p-8 animate-fade-in-up">…</div> from <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> subtree intercepts pointer events
     - retrying click action
       - waiting 500ms
       - waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div class="glass-modal w-full max-w-lg rounded-3xl p-6 md:p-8 animate-fade-in-up">…</div> from <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> subtree intercepts pointer events
     - retrying click action
       - waiting 500ms
       - waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events
     - retrying click action
       - waiting 500ms
       - waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> intercepts pointer events
  - retrying click action
    - waiting 500ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="glass-modal w-full max-w-lg rounded-3xl p-6 md:p-8 animate-fade-in-up">…</div> from <div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">…</div> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms


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
