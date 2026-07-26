/**
 * SafeFamily Guard - 訊息互動診斷引擎 (Diagnostic Logic)
 */

window.DiagnosticEngine = {
  // 檢測關鍵字庫
  keywords: [
    { word: '匯款', weight: 25, reason: '包含資金轉帳指令' },
    { word: '轉帳', weight: 25, reason: '要求資金移動操作' },
    { word: 'ATM', weight: 30, reason: '提到自動櫃員機操作' },
    { word: '監管', weight: 35, reason: '包含假檢警監管帳戶用語' },
    { word: '解除分期', weight: 35, reason: '網購解除分期扣款詐騙關鍵字' },
    { word: '飆股', weight: 30, reason: '投資飆股與內線消息騙局' },
    { word: '保證獲利', weight: 35, reason: '違法保證獲利宣傳' },
    { word: '驗證碼', weight: 30, reason: '要求索取個人驗證碼或 OTP' },
    { word: '點數卡', weight: 30, reason: '要求購買超商點數卡付費' },
    { word: '手續費', weight: 20, reason: '要求預付手續費或保證金' },
    { word: '換手機', weight: 20, reason: '假冒親友換新 LINE 帳號' },
    { word: '急需用錢', weight: 25, reason: '親友緊急借錢情境' },
    { word: '神醫', weight: 20, reason: '誇大醫療與神秘偏方' },
    { word: '根治', weight: 20, reason: '宣稱根治慢性病假新聞' },
    { word: '限時領取', weight: 15, reason: '製造時間急迫感誘誘點擊' }
  ],

  // 執行診斷計算
  analyze: function (selectedRuleIds, textInput) {
    let totalScore = 0;
    let detectedTriggers = [];
    let rules = window.FamilyGuardData.diagnosticRules;

    // 1. 計算勾選項目分數
    selectedRuleIds.forEach(id => {
      let rule = rules.find(r => r.id === id);
      if (rule) {
        totalScore += rule.weight;
        detectedTriggers.push({
          title: rule.text,
          category: rule.category,
          hint: rule.hint
        });
      }
    });

    // 2. 分析文字輸入框的關鍵字
    if (textInput && textInput.trim().length > 0) {
      let text = textInput.trim();

      // 檢查短網址/不明網址
      if (/bit\.ly|tinyurl|\.top|\.xyz|\.cc|line-vip|line-claim/i.test(text)) {
        totalScore += 25;
        detectedTriggers.push({
          title: '訊息中包含疑似可疑短網址或非官方網域',
          category: '網址安全',
          hint: '切勿在點開的頁面上輸入任何帳號密碼或信用卡號！'
        });
      }

      // 檢查電話號碼跨境竄改標記 (+886)
      if (/\+886/i.test(text)) {
        totalScore += 20;
        detectedTriggers.push({
          title: '帶有 +886 國際竄改來電標記',
          category: '來電疑慮',
          hint: '+886 開頭的國內電話多為境外機房竄改的詐騙來電！'
        });
      }

      // 關鍵字比對
      this.keywords.forEach(kw => {
        if (text.includes(kw.word)) {
          // 避免重複計算同類別過多次
          let exists = detectedTriggers.some(t => t.title.includes(kw.word));
          if (!exists) {
            totalScore += kw.weight;
            detectedTriggers.push({
              title: `觸發可疑關鍵字：「${kw.word}」`,
              category: '內容特徵',
              hint: kw.reason
            });
          }
        }
      });
    }

    // 分數上限限制為 100
    totalScore = Math.min(100, totalScore);

    // 評定風險等級
    let level = 'safe';
    let levelTitle = '相對安全 🟢';
    let levelDesc = '目前未偵測到明顯的詐騙特徵，但收看各類訊息仍請保持謹慎求證習慣。';
    let actionAdvice = '若訊息提及金錢、個資或健康議題，建議仍可發送到家庭群組與家人確認。';

    if (totalScore >= 50) {
      level = 'danger';
      levelTitle = '高度危險詐騙訊息 🔴';
      levelDesc = '此訊息包含多重極危險詐騙特徵！非常可能為詐騙集團發出的陷阱！';
      actionAdvice = '🚨 請絕對不要進行匯款、點擊連結、提供驗證碼或交付現金！請立即撥打 165 反詐騙專線，或將此訊息截圖發給家人求助！';
    } else if (totalScore >= 20) {
      level = 'warning';
      levelTitle = '疑慮訊息 / 需查核 🟡';
      levelDesc = '此訊息帶有部分可疑特徵或不實內容風險，請勿冒然跟從訊息指示。';
      actionAdvice = '⚠️ 請先使用 165、LINE 官方查證或 Cofacts 查核，或先詢問家人，切勿直接依指示操作！';
    }

    return {
      score: totalScore,
      level: level,
      levelTitle: levelTitle,
      levelDesc: levelDesc,
      actionAdvice: actionAdvice,
      triggers: detectedTriggers
    };
  },

  // 異步呼叫 Cofacts 開放 API (GraphQL) 獲取實時查核紀錄
  queryCofactsApi: async function (keyword) {
    if (!keyword || keyword.trim().length === 0) return null;

    const graphqlQuery = {
      query: `
        query SearchCofacts($query: String!) {
          ListArticles(filter: { search: $query }, first: 2) {
            edges {
              node {
                id
                text
                articleReplies {
                  reply {
                    type
                    text
                  }
                }
              }
            }
          }
        }
      `,
      variables: { query: keyword.trim().substring(0, 40) }
    };

    try {
      const response = await fetch('https://cofacts-api.g0v.tw/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(graphqlQuery)
      });
      const resData = await response.json();
      const articles = resData?.data?.ListArticles?.edges || [];

      if (articles.length > 0) {
        const firstNode = articles[0].node;
        const replyObj = firstNode.articleReplies?.[0]?.reply;
        return {
          found: true,
          originalText: firstNode.text,
          replyType: replyObj?.type || 'NOT_RUMOR',
          replyText: replyObj?.text || '已有查核記錄'
        };
      }
      return { found: false };
    } catch (err) {
      console.warn('Cofacts API fetch warning:', err);
      return { found: false, error: true };
    }
  }
};
