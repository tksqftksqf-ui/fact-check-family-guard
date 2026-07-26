/**
 * SafeFamily Guard - 數據與案例庫 (Data & Scenarios)
 */

window.FamilyGuardData = {
  // 防詐診斷檢核項目
  diagnosticRules: [
    {
      id: 'rule_money',
      text: '要求提供銀行帳號、ATM操作、轉帳或交付現金',
      weight: 35,
      category: '資金風險',
      hint: '任何提到「轉帳」、「解除分期」、「監管帳戶」、「購買點數卡」幾乎都是詐騙！'
    },
    {
      id: 'rule_urgency',
      text: '強調「限時急迫」、「立刻處理」，或要求「秘密不得告訴他人」',
      weight: 25,
      category: '心理操縱',
      hint: '詐騙集團最常用「製造恐慌與時間壓力」，讓你沒時間思考求證。'
    },
    {
      id: 'rule_credentials',
      text: '要求提供 LINE 簡訊驗證碼、銀行 OTP 密碼或身分證件照片',
      weight: 35,
      category: '資安風險',
      hint: '驗證碼就像家裡的鑰匙，絕不能給任何人！給了帳號就會被盜用。'
    },
    {
      id: 'rule_shorturl',
      text: '附帶可疑連結（如短網址 bit.ly、不明 .top/.xyz/.cc 網域或 LINE 假登入頁面）',
      weight: 20,
      category: '連結風險',
      hint: '請勿隨意點擊未知網址，可能包含釣魚網站或惡意程式下載。'
    },
    {
      id: 'rule_high_return',
      text: '宣稱「穩賺不賠」、「高額回報」、「內線飆股」或「飆股社群專人帶操」',
      weight: 30,
      category: '投資陷阱',
      hint: '世界上沒有保證獲利又無風險的投資！凡是拉你進 LINE 群教投資多半是詐騙。'
    },
    {
      id: 'rule_official_impersonation',
      text: '自稱警察、檢察官、電信局、健保局，並稱你涉案或帳戶異常',
      weight: 30,
      category: '身份冒用',
      hint: '公務機關絕不會在電話中做筆錄，也不會要求管帳戶或派人收現金！'
    },
    {
      id: 'rule_unverified_health',
      text: '宣稱「祖傳秘方」、「徹底根治慢性病」、「神奇抗癌」或未經證實的醫療功效',
      weight: 20,
      category: '假健康資訊',
      hint: '誇大療效的食品或藥品多為誇大不實假新聞，請諮詢專業醫師。'
    },
    {
      id: 'rule_free_reward',
      text: '宣稱「免費領取貼圖」、「填問卷送大額禮券」、「點擊分享給10人即可領取」',
      weight: 15,
      category: '社交釣魚',
      hint: '免費好康經常是誘導你加入假帳號、收集個人資料或散布釣魚連結的陷阱。'
    }
  ],

  // 8 大詐騙與假訊息案例庫
  scamScenarios: [
    {
      id: 'stock_investment',
      title: '📈 LINE 飆股與假投資詐騙',
      category: '投資詐騙',
      severity: '高危險 🔴',
      tagline: '「保證獲利、內線消息、老師帶你賺大錢」',
      description: '詐騙集團在 FB/YouTube 投放廣告，吸引你加入 LINE 群組，裡面有一群「假學員」每天曬獲利圖，誘騙你下載假的交易 App 投入大筆資金，最後無法提領。',
      indicators: [
        '拉你進 LINE 投資討論群組',
        '宣稱有權威分析師/老師一對一指導',
        '要求下載非官方的 App 或前往不明網頁註冊投資帳戶',
        '想要出金提領時，要求先繳交高額保證金或稅金'
      ],
      defenseAdvice: '記住：「保證獲利 = 100% 詐騙」。切勿加入簡訊或網路上的不明投資 LINE 群組！',
      icon: '📈'
    },
    {
      id: 'fake_relative',
      title: '📱 猜猜我是誰 / 假親友急需用錢',
      category: '假冒親友',
      severity: '高危險 🔴',
      tagline: '「爸！我換電話了/手提包丟了，急需轉帳救急！」',
      description: '詐騙者冒充兒女、孫子或多年好友，稱手機遺失換新號碼，接著隔天以「車禍、急需付貨款、保釋金、卡在外國」等藉口要求緊急轉帳。',
      indicators: [
        '聲音聽起來有點像，但辯稱「感冒聲音啞了」',
        '要求加新的 LINE 帳號或新的電話號碼',
        '語氣非常焦急，要求「立刻轉帳」、「不能告訴其他人」'
      ],
      defenseAdvice: '掛斷電話！用「原本紀錄的舊電話」或親自向其他家人求證，絕不直接轉帳！',
      icon: '👴'
    },
    {
      id: 'fake_authority',
      title: '⚖️ 假檢警 / 戶政 / 健保局帳戶監管',
      category: '假冒公務員',
      severity: '極高危險 🔴',
      tagline: '「你涉及洗錢犯罪，必須交出帳戶密碼接受監管！」',
      description: '自稱警察、檢察官或醫院工作人員，稱你的健保卡被盜用或涉及重大金融犯罪，要傳喚你，並要求傳真假公文或派面交人員取走存摺現金。',
      indicators: [
        '電話中轉接給「高階警官」或「檢察官」',
        '強調「偵查不公開」，威脅洩密要坐牢',
        '要求把錢轉到「安全指定帳戶」或約定地點面交黃金/現金'
      ],
      defenseAdvice: '檢警不會在電話中做筆錄，更不會監管帳戶或收現金！聽到「監管帳戶」請直接掛斷撥打 165。',
      icon: '🏛️'
    },
    {
      id: 'e_commerce_cancel',
      title: '🛒 網購解除分期付款 / 假客服詐騙',
      category: '電商詐騙',
      severity: '高危險 🔴',
      tagline: '「工作人員設定錯誤，將每月重複扣款，請到 ATM 操作取消！」',
      description: '電商平台資料洩漏後，假客服來電精確說出你買了什麼，稱系統出錯把你設為高級批發會員，要聯絡銀行協助解除，隨後假銀行來電指導操作 ATM 或網銀。',
      indicators: [
        '電話號碼開頭帶有「+886」或「+」字號（跨境竄改來電）',
        '要求你前往 ATM、網路銀行輸入「解除代碼」或「確認碼」',
        '稱若不處理今晚就會被扣款大筆金額'
      ],
      defenseAdvice: 'ATM 只有「轉帳」與「提款」功能，絕對「無法解除分期扣款」！聽到操作 ATM 請立即掛斷。',
      icon: '💳'
    },
    {
      id: 'free_stickers_phishing',
      title: '🎁 免費貼圖 / 假優惠禮券釣魚連結',
      category: '社交釣魚',
      severity: '中危險 🟡',
      tagline: '「慶祝歡慶！點擊連結分享給 10 位好友即可免費領取貼圖！」',
      description: '社群平台上流傳免費貼圖或百貨禮券連結，點進去後要求登入 LINE 帳號密碼，或是邀請好友分享。實則為竊取 LINE 帳號或增加假帳號好友數。',
      indicators: [
        '網址並非 LINE 官方網域（非 line.me）',
        '頁面要求輸入 LINE 帳號、密碼或手機簡訊驗證碼',
        '強制要求分享給多個群組才能領取'
      ],
      defenseAdvice: 'LINE 官方免費貼圖只會在「貼圖小舖」內發布，不需要點連結分享給好友即可領取。',
      icon: '🎁'
    },
    {
      id: 'fake_health_news',
      title: '💊 偏方奇藥與誇大健康假新聞',
      category: '健康假訊息',
      severity: '中疑慮 🟡',
      tagline: '「驚人突破！每天喝這種水能徹底消除癌症與糖尿病，醫生不敢公開！」',
      description: '網路上常見的長輩圖或聳動文章，宣稱某些日常食材具有神級療效，或警告某種日常食物有劇毒，煽動不安恐懼或誘騙購買昂貴劣質保健品。',
      indicators: [
         me = '標題過於聳動（如：震驚！神醫秘方！終生無病！）',
        '缺乏專業權威醫學期刊或衛福部認證出處',
        '文章底部附帶購買連結或特定 LINE 賣家'
      ],
      defenseAdvice: '健康生病請尋求正規醫院醫師診斷！可善用「MyGoPen」或「Cofacts 真的假的」查證醫療文章。',
      icon: '🥗'
    },
    {
      id: 'job_recruitment_scam',
      title: '💼 居家兼職 / 假求職租借帳戶',
      category: '求職詐騙',
      severity: '高危險 🔴',
      tagline: '「在家打字/點讚包裝即可日領三千，只需提供提款卡做發薪認證！」',
      description: '主打高薪、輕鬆、在家工作的求職廣告，誘騙求職者寄出存摺與提款卡（稱公司要撥款），導致求職者帳戶變為人頭帳戶，慘遭列為警示帳戶並負擔刑事責任。',
      indicators: [
        '工作內容極度簡單卻標榜高額薪資',
        '要求提供存摺正本、提款卡並告知密碼',
        '面試地點約在超商或僅透過 LINE 聯絡'
      ],
      defenseAdvice: '正規公司絕不會要求寄送存摺與提款卡正本！保護帳戶資訊是個人法律權益。',
      icon: '💼'
    },
    {
      id: 'ai_voice_clone',
      title: '🤖 AI 擬真語音與換臉深偽詐騙',
      category: '前沿 AI 詐騙',
      severity: '極高危險 🔴',
      tagline: '「電話裡的聲音跟我兒子一模一樣，連視訊畫面都很像！」',
      description: '詐騙集團利用社群媒體上搜集到的幾秒鐘親友語音或短影音，複製聲音甚至進行 AI 視訊換臉，模擬親友來電借錢或稱遇險。',
      indicators: [
        '電話中聲音幾乎一樣，但對話語意稍微僵硬或有延遲',
        '視訊通話時畫面邊緣稍有模糊，或是要求快速掛斷視訊切換為語音',
        '同樣急迫要求轉帳或現金面交'
      ],
      defenseAdvice: '事前與家人約定「防詐密碼/通關密語」（例如兒時寵物名字或特定事件）！無法回答通關密語的就是假人。',
      icon: '🤖'
    }
  ],

  // 擬真測驗題目 (Quiz Questions with chat simulators)
  quizQuestions: [
    {
      id: 1,
      type: 'LINE',
      senderName: '阿明 (兒子)',
      senderAvatar: '👨‍🦱',
      timestamp: '下午 02:15',
      messageContent: '爸！我手機剛才掉到水裡壞了，這是我借同事手機辦的新 LINE。我現在在外面跟客戶簽約急需付兩萬塊保證金，但我卡片讀不到，你能不能現在幫我轉帳到這個帳戶？晚一點回家我馬上還你！',
      options: [
        { text: 'A. 兒子很著急，趕快去附近的 ATM 轉帳兩萬給他', isCorrect: false },
        { text: 'B. 點擊連結直接線上刷卡', isCorrect: false },
        { text: 'C. 先掛斷訊息，撥打兒子「原本紀錄的舊電話」或聯絡其他家人確認', isCorrect: true },
        { text: 'D. 在新 LINE 裡面發問「你真的急用嗎？」', isCorrect: false }
      ],
      explanation: '這是典型的「猜猜我是誰 / 假冒親友」詐騙！詐騙集團常用「手機壞了換新帳號」作為藉口。切記：無論對方語氣多著急，都必須用「原本紀錄的舊電話」親自聯繫求證，或詢問只有你們兩人知道的「防詐密碼」。',
      scamType: '假冒親友詐騙'
    },
    {
      id: 2,
      type: 'SMS',
      senderName: '+886 912-345-678 (自稱中華電信)',
      senderAvatar: '📲',
      timestamp: '下午 04:30',
      messageContent: '【中華電信】您的門號會員點數 5,300 點即將於今日 24:00 到期！請儘速點擊官方連結 http://cht-vip-claim.top 兌換 iPhone 15 或禮券，逾期不候。',
      options: [
        { text: 'A. 點數快到期很可惜，趕快點擊連結登入兌換', isCorrect: false },
        { text: 'B. 檢查網址發現是 .top 而非 official cht.com.tw 網域，此為釣魚簡訊不予理會', isCorrect: true },
        { text: 'C. 把這個簡訊轉發給所有群組提醒大家領取', isCorrect: false },
        { text: 'D. 在網頁中輸入自己的信用卡號付運費領取', isCorrect: false }
      ],
      explanation: '這是「點數到期釣魚簡訊」！電信公司或百貨公司的官方網址都是固定的（如 cht.com.tw）。不明的短網址或像 `.top` / `.xyz` 等奇怪網域都是詐騙集團架設的假網站，目的在竊取你的信用卡號或個人資料。',
      scamType: '簡訊釣魚詐騙'
    },
    {
      id: 3,
      type: 'LINE',
      senderName: '股市權威-張老師助理小美',
      senderAvatar: '👩‍💼',
      timestamp: '上午 10:05',
      messageContent: '哥/姐早安！恭喜您獲得我們機構【台股翻倍計畫】名額！張老師今日佈局一檔內線主力飆股，預計本週爆賺 300%！請點擊連結下載【富盈國際 VIP 交易 App】，由專人帶您下單，保證獲利！',
      options: [
        { text: 'A. 賺 300% 太吸引人了，先下載 App 投入一萬試試看', isCorrect: false },
        { text: 'B. 天下沒有保證獲利的事，直接封鎖並檢舉該 LINE 帳號', isCorrect: true },
        { text: 'C. 留言問他「真的會賺錢嗎？」', isCorrect: false },
        { text: 'D. 把積蓄全部匯入 App 內的指定個人帳戶', isCorrect: false }
      ],
      explanation: '這是「假投資飆股詐騙」！標榜「保證獲利」、「內線飆股」、「下載非官方 App」都是 100% 的投資詐騙。投入資金後初期可能讓你看見假帳面數字，但最後絕對無法出金。',
      scamType: '投資飆股詐騙'
    },
    {
      id: 4,
      type: 'SMS',
      senderName: '未知號碼 (自稱台北地檢署)',
      senderAvatar: '🏛️',
      timestamp: '上午 11:20',
      messageContent: '【緊急通知】受文者台端涉及國家洗錢防制法重罪案，台北地檢署已開立拘票。請於半小時內撥打專線 02-2345-6789 配合檢察官進行電話筆錄與資產監管，切勿洩密否則加重刑責！',
      options: [
        { text: 'A. 害怕被抓，立刻撥電話配合監管帳戶', isCorrect: false },
        { text: 'B. 檢警絕不會以簡訊或電話要求筆錄與監管帳戶，直接撥打 165 求證', isCorrect: true },
        { text: 'C. 跑去超商買點數卡交給對方當作保釋金', isCorrect: false },
        { text: 'D. 把自己的存摺照片傳給簡訊中的號碼', isCorrect: false }
      ],
      explanation: '這是「假檢警監管帳戶詐騙」！政府司法機關（警察、檢察官、法院）辦案絕不會在電話中製作筆錄，更不可能要求民眾「匯款、交出存摺、購買點數」或「監管帳戶」。',
      scamType: '假檢警詐騙'
    },
    {
      id: 5,
      type: 'LINE',
      senderName: '親友健康交流群',
      senderAvatar: '🌿',
      timestamp: '晚上 08:40',
      messageContent: '【轉發救人一命】台大權威名醫私下透露：每天早晚將大蒜加檸檬水煮沸喝下，能在 3 天內徹底消除體內所有癌細胞與慢性病，醫生因為利益不敢公開！快分享給摯愛親友！',
      options: [
        { text: 'A. 聽起來很神奇，立刻轉發到所有群組', isCorrect: false },
        { text: 'B. 這屬於誇大療效的未經證實假新聞，先用「MyGoPen」或「Cofacts」查證，不隨意散布', isCorrect: true },
        { text: 'C. 停掉目前醫生開的慢性病藥物，改喝大蒜檸檬水', isCorrect: false },
        { text: 'D. 花錢向傳這訊息的人購買大蒜萃取液', isCorrect: false }
      ],
      explanation: '這是常見的「醫療健康假新聞」！誇大療效、宣稱「名醫不敢公開的秘方」通常未經過臨床醫學證實，隨意相信甚至停用正規藥物會延誤病情。遇到健康文章一定要先查證！',
      scamType: '健康假新聞'
    }
  ],

  // 官方查證與求助資源 (Official Verification Tools)
  verificationTools: [
    {
      name: '165 反詐騙諮詢專線',
      org: '內政部警政署',
      desc: '24 小時免費防詐諮詢與檢舉專線，遇到任何疑慮直接撥打！',
      phone: '165',
      url: 'https://165.npa.gov.tw/',
      actionText: '撥打 165 專線',
      badge: '官方警政',
      icon: '📞'
    },
    {
      name: 'LINE 官方查證',
      org: 'LINE Taiwan',
      desc: 'LINE 官方防詐查核帳號，可將疑慮文字或連結直接傳給它自動比對。',
      url: 'https://fact-checker.line.me/',
      actionText: '開啟 LINE 查證',
      badge: '訊息查證',
      icon: '🟢'
    },
    {
      name: 'Cofacts 真的假的',
      org: '公民社群全民查核',
      desc: '台灣最大全民協作訊息查核資料庫，貼上訊息即可查看群眾與查核員的解答。',
      url: 'https://cofacts.tw/',
      actionText: '造訪 Cofacts',
      badge: '全民查核',
      icon: '🤖'
    },
    {
      name: 'MyGoPen 麥擱騙',
      org: '民間專業查核網站',
      desc: '專門查核長輩圖、健康偏方、詐騙簡訊與網路假新聞的權威團隊。',
      url: 'https://www.mygopen.com/',
      actionText: '前往 MyGoPen',
      badge: '假新聞查核',
      icon: '🛡️'
    },
    {
      name: '台灣事實查核中心 (TFC)',
      org: '財團法人台灣事實查核教育基金會',
      desc: '符合國際事實查核標準 (IFCN) 的獨立非營利查核機構。',
      url: 'https://tfc-taiwan.org.tw/',
      actionText: '查看查核報告',
      badge: '深度查核',
      icon: '🔍'
    }
  ],

  // 防詐五字訣 (5-Step Mantra)
  fiveSteps: [
    {
      step: '1. 停',
      title: '保持冷靜，暫停操作',
      desc: '遇到要求匯款、急迫威脅或好康連結時，先呼吸停下動作，絕不在急迫情緒下做決定。',
      color: '#EF4444'
    },
    {
      step: '2. 看',
      title: '細心觀察，尋找漏洞',
      desc: '檢查發送者號碼是否帶有 +886、網址是否非官方網域、語氣是否反常或字體粗劣。',
      color: '#F59E0B'
    },
    {
      step: '3. 查',
      title: '善用工具，多方查核',
      desc: '使用 165 專線、LINE 官方查證或 Google 搜尋關鍵字＋「詐騙」進行比對。',
      color: '#3B82F6'
    },
    {
      step: '4. 問',
      title: '詢問家人，共同商量',
      desc: '拿不準的訊息直接發到家庭 LINE 群組或詢問親友：「你幫我看這個是真的嗎？」',
      color: '#10B981'
    },
    {
      step: '5. 檢',
      title: '積極舉報，防範未然',
      desc: '若確認是詐騙或釣魚連結，立即封鎖檢舉，並撥打 165 提供資訊保護其他人。',
      color: '#8B5CF6'
    }
  ]
};
