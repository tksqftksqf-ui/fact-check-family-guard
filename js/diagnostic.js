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
    { word: '限時領取', weight: 15, reason: '製造時間急迫感誘誘點擊' },
    // 健康假新聞與發票釣魚擴充關鍵字
    { word: '蒸煮', weight: 25, reason: '電鍋自來水蒸煮食物致癌謠言' },
    { word: '電鍋', weight: 25, reason: '電鍋自來水加熱致癌假訊息' },
    { word: '氯', weight: 25, reason: '自來水含氯加熱致癌流言' },
    { word: '致癌', weight: 30, reason: '宣稱日常家電或食材致癌假新聞' },
    { word: '抑癌', weight: 30, reason: '未經證實的抑癌食物百分比謠言' },
    { word: '骨膠原', weight: 25, reason: '地瓜含有骨膠原偽科學謠言' },
    { word: '癌症預防研究所', weight: 35, reason: '冒用機構發布之偽科學蔬菜排行' },
    { word: '轉發就是善行', weight: 25, reason: '情緒勒索強迫轉發網路謠言' },
    { word: '挽救', weight: 25, reason: '道德綁架轉發用語' },
    { word: '轉發', weight: 15, reason: '強烈要求轉發文章特徵' },
    { word: '中獎', weight: 25, reason: '假冒中獎領取訊息' },
    { word: '發票', weight: 20, reason: '電子發票釣魚詐騙特徵' }
  ],

  // 執行診斷計算
  analyze: function (selectedRuleIds, textInput) {
    let totalScore = 0;
    let detectedTriggers = [];
    let rules = window.FamilyGuardData.diagnosticRules;
    let isHealthRumorSpecial = false;

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

      // 特殊精準比對：電鍋自來水致癌 / 抑癌蔬菜排行健康謠言
      if (
        (text.includes('電鍋') && text.includes('氯')) ||
        (text.includes('自來水') && text.includes('致癌')) ||
        (text.includes('抑癌') && text.includes('番薯')) ||
        text.includes('轉發就是善行') ||
        text.includes('余宗憲')
      ) {
        isHealthRumorSpecial = true;
        totalScore = Math.max(totalScore, 85);
        detectedTriggers.push({
          title: '比對成功：流傳多年之「電鍋自來水致癌 / 抑癌蔬菜排行」網路謠言',
          category: '健康假新聞',
          hint: '此訊息已被長庚醫院、衛福部與事實查核中心證實為不實謠言，請絕對不要轉發！'
        });
      }

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

    if (isHealthRumorSpecial) {
      level = 'danger';
      levelTitle = '❌ 網路健康假新聞與謠言 🔴';
      levelDesc = '經權威醫學專家與事實查核機構比對，此訊息為流傳多年的不實網路謠言！';
      actionAdvice = '❌ 查證結論：這是一則流傳多年的「網路健康假新聞與謠言」！請勿轉發！\n\n【三大漏洞解析】\n1. 電鍋用自來水蒸食物，水蒸氣會帶走餘氯，絕不會致癌（已故長庚林杰樑醫師生前已親自澄清）。\n2. 抑癌蔬菜百分比排行榜為缺乏醫學根據之偽科學，無任何權威機構證實。\n3. 文章冒用名醫名義並進行情緒勒索（稱轉發救人一命），請告知家人勿再散布！';
    } else if (totalScore >= 50) {
      level = 'danger';
      levelTitle = '高度危險詐騙/假訊息 🔴';
      levelDesc = '此訊息包含多重極危險詐騙特徵！非常可能為詐騙陷阱或假新聞！';
      actionAdvice = '🚨 請絕對不要進行匯款、點擊連結、提供驗證碼或轉發！請使用下方按鈕一鍵向 165、Cofacts 或 MyGoPen 求證！';
    } else if (totalScore >= 20) {
      level = 'warning';
      levelTitle = '疑慮訊息 / 需查核 🟡';
      levelDesc = '此訊息帶有部分可疑特徵或不實內容風險，請勿冒然跟從訊息指示。';
      actionAdvice = '⚠️ 請先使用下方 165、LINE 官方查證或 Cofacts 按鈕進行線上比對！';
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
