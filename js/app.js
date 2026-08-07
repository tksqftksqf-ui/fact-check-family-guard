/**
 * SafeFamily Guard - 主控制器邏輯 (Main App Controller)
 */

document.addEventListener('DOMContentLoaded', function () {
  // 1. 初始化 DOM 元素
  const seniorToggle = document.getElementById('btn-senior-mode');
  const contrastToggle = document.getElementById('btn-contrast-mode');
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  // 2. 初始化長輩友善與對比度模式
  if (localStorage.getItem('seniorMode') === 'true') {
    document.body.classList.add('senior-mode');
    seniorToggle?.classList.add('active');
  }
  if (localStorage.getItem('highContrast') === 'true') {
    document.body.classList.add('high-contrast-mode');
    contrastToggle?.classList.add('active');
  }

  seniorToggle?.addEventListener('click', function () {
    document.body.classList.toggle('senior-mode');
    const isSenior = document.body.classList.contains('senior-mode');
    this.classList.toggle('active', isSenior);
    localStorage.setItem('seniorMode', isSenior);
  });

  contrastToggle?.addEventListener('click', function () {
    document.body.classList.toggle('high-contrast-mode');
    const isContrast = document.body.classList.contains('high-contrast-mode');
    this.classList.toggle('active', isContrast);
    localStorage.setItem('highContrast', isContrast);
  });

  // 3. 頁籤切換邏輯 (Tabs Switching)
  tabBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const targetTab = this.dataset.tab;

      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      this.classList.add('active');
      document.getElementById(`panel-${targetTab}`)?.classList.add('active');
    });
  });

  // 全域切換 Tab 函式 (同步更新桌面頂部與手機底部導覽列)
  window.switchTab = function (tabId) {
    const desktopBtns = document.querySelectorAll('.tab-btn');
    const mobileBtns = document.querySelectorAll('.mobile-nav-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    desktopBtns.forEach(b => b.classList.toggle('active', b.dataset.tab === tabId));
    mobileBtns.forEach(b => b.classList.toggle('active', b.dataset.tab === tabId));
    tabPanels.forEach(p => p.classList.toggle('active', p.id === `panel-${tabId}`));
  };

  // 全域二選一查證方式切換 (貼上文字 vs 上傳圖片)
  window.selectInputMethod = function (method) {
    const btnText = document.getElementById('btn-method-text');
    const btnImage = document.getElementById('btn-method-image');
    const boxText = document.getElementById('method-box-text');
    const boxImage = document.getElementById('method-box-image');

    if (method === 'text') {
      if (btnText) { btnText.style.background = '#ffffff'; btnText.style.color = '#1e3a8a'; btnText.style.boxShadow = 'var(--shadow-sm)'; }
      if (btnImage) { btnImage.style.background = 'transparent'; btnImage.style.color = 'var(--text-muted)'; btnImage.style.boxShadow = 'none'; }
      if (boxText) boxText.style.display = 'block';
      if (boxImage) boxImage.style.display = 'none';
    } else {
      if (btnImage) { btnImage.style.background = '#ffffff'; btnImage.style.color = '#1e3a8a'; btnImage.style.boxShadow = 'var(--shadow-sm)'; }
      if (btnText) { btnText.style.background = 'transparent'; btnText.style.color = 'var(--text-muted)'; btnText.style.boxShadow = 'none'; }
      if (boxText) boxText.style.display = 'none';
      if (boxImage) boxImage.style.display = 'block';
    }
  };

  // 綁定方式一與方式二按鈕點擊事件
  const btnMethodText = document.getElementById('btn-method-text');
  const btnMethodImage = document.getElementById('btn-method-image');
  if (btnMethodText) {
    btnMethodText.addEventListener('click', function() { window.selectInputMethod('text'); });
  }
  if (btnMethodImage) {
    btnMethodImage.addEventListener('click', function() { window.selectInputMethod('image'); });
  }

  // 長輩友善：一鍵範例訊息快捷帶入並發起分析
  window.fillExample = function (type) {
    const input = document.getElementById('diagnostic-text-input');
    if (!input) return;

    let sampleText = '';
    if (type === 'sms_points') {
      sampleText = '【中華電信】您的門號會員點數 5,300 點即將於今日 24:00 到期！請點擊官方連結 http://cht-vip-claim.top 兌換商品，逾期無效。';
    } else if (type === 'stock_group') {
      sampleText = '恭喜您獲得【台股翻倍計畫】名額！張老師今日佈局內線飆股，預計爆賺 300%！請加入 LINE 下載 VIP 交易 App，保證獲利！';
    } else if (type === 'water_steam') {
      sampleText = '轉發救人一命！已故長庚林教授稱：電鍋蒸東西一定要用開水或過濾水，直接用自來水有氯，蒸氣蓋著會包覆在食物上致癌！';
    }

    input.value = sampleText;
    
    // 自動觸發安全分析
    handleDiagnostic();
  };

  // 4. 渲染診斷儀勾選清單 (Diagnostic Checklist)
  renderDiagnosticChecklist();

  // 5. 綁定診斷儀按鈕事件
  const btnAnalyze = document.getElementById('btn-analyze-msg');
  if (btnAnalyze) {
    btnAnalyze.addEventListener('click', handleDiagnostic);
  }

  // 5.5 長輩圖 / 訊息照片 OCR 圖片文字辨識
  const imageInput = document.getElementById('image-upload-input');
  if (imageInput) {
    imageInput.addEventListener('change', function (e) {
      const file = e.target.files[0];
      if (!file) return;

      const previewContainer = document.getElementById('image-preview-container');
      const previewImg = document.getElementById('image-preview');
      const statusText = document.getElementById('ocr-status-text');
      const textarea = document.getElementById('diagnostic-text-input');

      // 1. 顯示圖片預覽
      const reader = new FileReader();
      reader.onload = function (event) {
        if (previewImg) previewImg.src = event.target.result;
        if (previewContainer) previewContainer.style.display = 'block';
        if (statusText) statusText.innerText = '⌛ 正在為您識別圖片中的文字...';

        // 2. 呼叫 Tesseract.js 進行繁體中文 (chi_tra) + 英文 (eng) 辨識
        if (window.Tesseract) {
          window.Tesseract.recognize(
            event.target.result,
            'chi_tra+eng',
            { logger: m => console.log(m) }
          ).then(({ data: { text } }) => {
            let cleanText = text ? text.trim() : '';
            if (cleanText.length > 0) {
              if (textarea) textarea.value = cleanText;
              if (statusText) statusText.innerHTML = '✅ 圖片文字識別成功！已自動填入並為您分析。';
              // 自動觸發診斷分析
              handleDiagnostic();
            } else {
              if (statusText) statusText.innerHTML = '⚠️ 未能在圖片中識別出清晰文字，您可以手動輸入說明。';
            }
          }).catch(err => {
            console.error('OCR Error:', err);
            if (statusText) statusText.innerHTML = '⚠️ 圖片辨識完成，您可以直接點擊「立即幫我查證」。';
          });
        } else {
          if (statusText) statusText.innerHTML = '⚠️ 辨識元件載入中，您可以直接點擊「立即幫我查證」。';
        }
      };
      reader.readAsDataURL(file);
    });
  }

  // 6. 初始化實戰測驗 (Quiz)
  window.QuizEngine.init();
  renderQuizQuestion();

  // 7. 渲染詐騙案例庫 (Scam Library)
  renderScamLibrary();

  // 8. 渲染查證五步驟與工具庫 (Tools & 5 Steps)
  renderFiveStepsAndTools();

  // 9. 初始化緊急親友聯絡卡 (Emergency Contacts)
  initFamilyContacts();
});

/* ==========================================================================
   診斷儀 (Diagnostic Tool)
   ========================================================================== */
function renderDiagnosticChecklist() {
  const container = document.getElementById('diagnostic-checklist-container');
  if (!container) return;

  const rules = window.FamilyGuardData.diagnosticRules;
  let html = '';

  rules.forEach(rule => {
    html += `
      <label class="checkbox-item">
        <input type="checkbox" name="diagnostic_rule" value="${rule.id}">
        <span class="checkbox-text">${rule.text}</span>
      </label>
    `;
  });

  container.innerHTML = html;
}

function handleDiagnostic() {
  const textInput = document.getElementById('diagnostic-text-input')?.value || '';

  if (!textInput.trim()) {
    showModal('請貼上或輸入訊息', '⚠️ 請將您收到的可疑簡訊、LINE 訊息或文章文字貼入框內，方便系統為您進行安全查證！', '💡');
    return;
  }

  const result = window.DiagnosticEngine.analyze(textInput);

  // 顯示結果區域
  const resultCard = document.getElementById('diagnostic-result-card');
  const gauge = document.getElementById('result-gauge');
  const gaugeScore = document.getElementById('gauge-score');
  const resultTitle = document.getElementById('result-title');
  const resultDesc = document.getElementById('result-desc');
  const resultAdvice = document.getElementById('result-advice-box');
  const triggerContainer = document.getElementById('result-triggers-container');

  if (resultCard && gauge && gaugeScore) {
    resultCard.style.display = 'block';
    gaugeScore.innerText = `${result.score}分`;
    gauge.className = `result-gauge ${result.level}`;

    if (resultTitle) resultTitle.innerText = result.levelTitle;
    if (resultDesc) resultDesc.innerText = result.levelDesc;
    if (resultAdvice) resultAdvice.innerText = result.actionAdvice;

    // 渲染實時 165 / Cofacts / MyGoPen 搜尋按鈕
    renderLiveSearchShortcuts(textInput, result.triggers);

    // 異步嘗試從 Cofacts API 獲取即時比對結果
    if (textInput && textInput.trim().length > 0) {
      window.DiagnosticEngine.queryCofactsApi(textInput).then(cofactsRes => {
        const liveContainer = document.getElementById('live-search-shortcuts');
        if (liveContainer && cofactsRes && cofactsRes.found) {
          const typeBadge = cofactsRes.replyType === 'RUMOR' ? '❌ 網路謠言/詐騙' : 'ℹ️ 查核資料庫已有紀錄';
          const cofactsBox = document.createElement('div');
          cofactsBox.style.cssText = 'background:#ffffff; border-left:4px solid #0f766e; padding:0.75rem; border-radius:6px; margin-top:0.75rem; font-size:0.9rem;';
          cofactsBox.innerHTML = `
            <div style="font-weight:800; color:#0f766e; margin-bottom:0.25rem;">
              🤖 Cofacts 資料庫線上即時比對成功！【${typeBadge}】
            </div>
            <div style="color:var(--text-muted); font-size:0.85rem; line-height:1.4;">
              ${escapeHtml(cofactsRes.replyText.substring(0, 150))}...
            </div>
          `;
          liveContainer.appendChild(cofactsBox);
        }
      });
    }

    // 渲染觸發可疑項目
    if (triggerContainer) {
      if (result.triggers.length > 0) {
        let triggersHtml = '<div style="font-weight:700; margin-bottom:0.5rem;">🔍 經系統偵測到的風險項目：</div>';
        result.triggers.forEach(t => {
          triggersHtml += `
            <div class="trigger-item">
              <div class="trigger-item-title">${t.title} [${t.category}]</div>
              <div class="trigger-item-hint">${t.hint}</div>
            </div>
          `;
        });
        triggerContainer.innerHTML = triggersHtml;
      } else {
        triggerContainer.innerHTML = '<div style="color:var(--safe-color); font-weight:700;">✅ 未發現明顯可疑關鍵特徵。</div>';
      }
    }

    // 平滑滾動到結果
    resultCard.scrollIntoView({ behavior: 'smooth' });
  }
}

/* ==========================================================================
   實戰測驗 (Quiz)
   ========================================================================== */
function renderQuizQuestion() {
  const quizEngine = window.QuizEngine;
  const q = quizEngine.getCurrentQuestion();
  const container = document.getElementById('quiz-question-container');
  const progressBar = document.getElementById('quiz-progress-bar');
  const progressText = document.getElementById('quiz-progress-text');

  if (!container || !q) return;

  // 更新進度條
  const total = quizEngine.questions.length;
  const current = quizEngine.currentIndex + 1;
  if (progressBar) progressBar.style.width = `${(current / total) * 100}%`;
  if (progressText) progressText.innerText = `第 ${current} / ${total} 題`;

  let optionsHtml = '';
  q.options.forEach((opt, idx) => {
    optionsHtml += `
      <button class="option-btn" onclick="selectQuizAnswer(${idx})">
        ${opt.text}
      </button>
    `;
  });

  container.innerHTML = `
    <!-- 擬真對話框 -->
    <div class="chat-window type-${q.type}">
      <div class="chat-header">
        <div class="chat-avatar">${q.senderAvatar}</div>
        <div class="chat-user-info">
          <div class="chat-user-name">${q.senderName}</div>
          <div class="chat-user-time">${q.timestamp} · ${q.type === 'LINE' ? 'LINE 訊息' : '簡訊'}</div>
        </div>
      </div>
      <div class="chat-body">
        <div class="chat-bubble-received">${escapeHtml(q.messageContent)}</div>
      </div>
    </div>

    <div style="font-weight:800; font-size:1.1rem; margin-bottom:1rem; color:var(--primary-color);">
      ❓ 請問收到這則訊息時，最正確的處置方式是什麼？
    </div>

    <div class="quiz-options">
      ${optionsHtml}
    </div>
  `;
}

window.selectQuizAnswer = function (optionIndex) {
  const quizEngine = window.QuizEngine;
  const res = quizEngine.submitAnswer(optionIndex);

  const modalTitle = res.isCorrect ? '🎉 答對了！非常正確！' : '❌ 糟糕！這是詐騙陷阱！';
  const modalIcon = res.isCorrect ? '🎯' : '🚨';
  const modalText = `
    <div style="margin-bottom:0.75rem; font-weight:700; color:var(--primary-color);">
      本題情境屬於：【${res.scamType}】
    </div>
    <div style="background:#f8fafc; padding:0.85rem; border-radius:8px; border-left:4px solid var(--primary-color);">
      ${res.explanation}
    </div>
  `;

  showModal(modalTitle, modalText, modalIcon, () => {
    if (res.isLast) {
      renderQuizSummary();
    } else {
      quizEngine.nextQuestion();
      renderQuizQuestion();
    }
  });
};

function renderQuizSummary() {
  const quizEngine = window.QuizEngine;
  const badgeInfo = quizEngine.getResultBadge();
  const container = document.getElementById('quiz-question-container');

  if (!container) return;

  container.innerHTML = `
    <div style="text-align:center; padding:2rem 1rem;">
      <div style="font-size:4rem; margin-bottom:0.5rem;">${badgeInfo.badge.split(' ')[0]}</div>
      <h3 style="font-size:1.6rem; font-weight:900; color:var(--primary-color); margin-bottom:0.5rem;">
        測驗完成！總得分：${quizEngine.score} 分
      </h3>
      <div style="font-size:1.2rem; font-weight:800; color:${badgeInfo.color}; margin-bottom:1rem;">
        榮獲稱號：${badgeInfo.badge}
      </div>
      <p style="max-width:500px; margin:0 auto 1.5rem; color:var(--text-muted); font-size:1.05rem;">
        ${badgeInfo.desc}
      </p>
      <button class="btn-submit" onclick="restartQuiz()" style="max-width:300px; margin:0 auto;">
        🔄 重新挑戰測驗
      </button>
    </div>
  `;
}

window.restartQuiz = function () {
  window.QuizEngine.init();
  renderQuizQuestion();
};

/* ==========================================================================
   案例庫 (Scam Library)
   ========================================================================== */
function renderScamLibrary() {
  const container = document.getElementById('scam-library-container');
  if (!container) return;

  const scenarios = window.FamilyGuardData.scamScenarios;
  let html = '';

  scenarios.forEach(s => {
    let indicatorsHtml = '';
    s.indicators.forEach(ind => {
      indicatorsHtml += `<li>${ind}</li>`;
    });

    html += `
      <div class="scam-card">
        <div class="scam-header">
          <div class="scam-icon">${s.icon}</div>
          <div>
            <div class="scam-title">${s.title}</div>
            <div style="font-size:0.8rem; color:var(--text-muted);">${s.category}</div>
          </div>
          <div class="scam-severity">${s.severity}</div>
        </div>
        <div class="scam-tagline">${s.tagline}</div>
        <p style="font-size:0.9rem; margin-bottom:0.5rem; color:var(--text-main);">${s.description}</p>
        
        <div class="scam-section-label">⚠️ 常見可疑徵兆：</div>
        <ul class="scam-indicators-list">
          ${indicatorsHtml}
        </ul>

        <div class="scam-advice-box">
          🛡️ 防禦心法：${s.defenseAdvice}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

/* ==========================================================================
   防詐五步驟與官方工具庫 (5 Steps & Verification Tools)
   ========================================================================== */
function renderFiveStepsAndTools() {
  // 防詐五步驟
  const stepsContainer = document.getElementById('five-steps-container');
  if (stepsContainer) {
    const steps = window.FamilyGuardData.fiveSteps;
    let stepsHtml = '';
    steps.forEach(st => {
      stepsHtml += `
        <div class="step-card" style="border-top-color: ${st.color}">
          <div class="step-number" style="color: ${st.color}">${st.step}</div>
          <div class="step-title">${st.title}</div>
          <div class="step-desc">${st.desc}</div>
        </div>
      `;
    });
    stepsContainer.innerHTML = stepsHtml;
  }

  // 官方工具
  const toolsContainer = document.getElementById('tools-container');
  if (toolsContainer) {
    const tools = window.FamilyGuardData.verificationTools;
    let toolsHtml = '';
    tools.forEach(t => {
      toolsHtml += `
        <div class="tool-card">
          <div>
            <span class="tool-badge">${t.badge}</span>
            <div class="tool-name">${t.icon} ${t.name}</div>
            <div class="tool-org">${t.org}</div>
            <div class="tool-desc">${t.desc}</div>
          </div>
          <a href="${t.url}" target="_blank" rel="noopener noreferrer" class="btn-tool-link">
            ${t.actionText} ↗
          </a>
        </div>
      `;
    });
    toolsContainer.innerHTML = toolsHtml;
  }
}

/* ==========================================================================
   家庭求助電話卡 (Family Emergency Contacts)
   ========================================================================== */
function initFamilyContacts() {
  const c1Name = document.getElementById('contact-1-name');
  const c1Phone = document.getElementById('contact-1-phone');
  const c2Name = document.getElementById('contact-2-name');
  const c2Phone = document.getElementById('contact-2-phone');

  // 載入已儲存資訊
  if (c1Name) c1Name.value = localStorage.getItem('family_c1_name') || '大兒子 / 大女兒';
  if (c1Phone) c1Phone.value = localStorage.getItem('family_c1_phone') || '';
  if (c2Name) c2Name.value = localStorage.getItem('family_c2_name') || '信任親友';
  if (c2Phone) c2Phone.value = localStorage.getItem('family_c2_phone') || '';

  // 綁定自動儲存
  [c1Name, c1Phone, c2Name, c2Phone].forEach(input => {
    input?.addEventListener('input', function () {
      localStorage.setItem('family_c1_name', c1Name?.value || '');
      localStorage.setItem('family_c1_phone', c1Phone?.value || '');
      localStorage.setItem('family_c2_name', c2Name?.value || '');
      localStorage.setItem('family_c2_phone', c2Phone?.value || '');
    });
  });
}

/* ==========================================================================
   通用 Modal 彈窗與輔助函式
   ========================================================================== */
let modalCallback = null;

function showModal(title, contentHtml, icon = 'ℹ️', onClose = null) {
  const modal = document.getElementById('app-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalIcon = document.getElementById('modal-icon');
  const modalBody = document.getElementById('modal-body');
  const modalConfirm = document.getElementById('modal-confirm-btn');

  if (modalTitle) modalTitle.innerText = title;
  if (modalIcon) modalIcon.innerText = icon;
  if (modalBody) modalBody.innerHTML = contentHtml;

  modalCallback = onClose;
  if (modal) modal.classList.add('active');

  if (modalConfirm) {
    modalConfirm.onclick = function () {
      closeModal();
    };
  }
}

function closeModal() {
  const modal = document.getElementById('app-modal');
  if (modal) modal.classList.remove('active');
  if (typeof modalCallback === 'function') {
    modalCallback();
    modalCallback = null;
  }
}

/* ==========================================================================
   實時 165 / Cofacts / MyGoPen 搜尋捷徑生成器
   ========================================================================== */
function renderLiveSearchShortcuts(textInput, triggers) {
  const container = document.getElementById('live-search-btns-container');
  if (!container) return;

  // 1. 提煉搜尋關鍵字 (前 30 個字或觸發關鍵字)
  let queryText = textInput.trim();
  if (!queryText && triggers.length > 0) {
    queryText = triggers.map(t => t.title).join(' ');
  }

  let encodedQuery = encodeURIComponent(queryText.substring(0, 30));

  // 2. 構建各大平台的搜尋連結
  let npa165Url = `https://165.npa.gov.tw/#/article/list?search=${encodedQuery}`;
  let cofactsUrl = `https://cofacts.tw/articles?q=${encodedQuery}`;
  let mygopenUrl = `https://www.mygopen.com/search?q=${encodedQuery}`;
  let lineCheckerUrl = `https://fact-checker.line.me/search?q=${encodedQuery}`;

  container.innerHTML = `
    <a href="${npa165Url}" target="_blank" rel="noopener noreferrer" class="btn-hero" style="font-size:0.85rem; padding:0.4rem 0.8rem; background:#1e3a8a; color:#ffffff;">
      🚨 165 全民防騙網查詢 ↗
    </a>
    <a href="${cofactsUrl}" target="_blank" rel="noopener noreferrer" class="btn-hero btn-hero-outline" style="font-size:0.85rem; padding:0.4rem 0.8rem; background:#0f766e; color:#ffffff; border:none;">
      🤖 Cofacts 真的假的比對 ↗
    </a>
    <a href="${mygopenUrl}" target="_blank" rel="noopener noreferrer" class="btn-hero btn-hero-outline" style="font-size:0.85rem; padding:0.4rem 0.8rem; background:#0369a1; color:#ffffff; border:none;">
      🛡️ MyGoPen 麥購騙查詢 ↗
    </a>
    <a href="${lineCheckerUrl}" target="_blank" rel="noopener noreferrer" class="btn-hero btn-hero-outline" style="font-size:0.85rem; padding:0.4rem 0.8rem; background:#059669; color:#ffffff; border:none;">
      🟢 LINE 訊息查證 ↗
    </a>
  `;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
