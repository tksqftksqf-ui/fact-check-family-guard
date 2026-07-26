/**
 * SafeFamily Guard - 擬真實戰測驗模組 (Quiz Logic)
 */

window.QuizEngine = {
  currentIndex: 0,
  score: 0,
  userAnswers: [],
  questions: [],

  init: function () {
    this.questions = window.FamilyGuardData.quizQuestions;
    this.currentIndex = 0;
    this.score = 0;
    this.userAnswers = [];
  },

  getCurrentQuestion: function () {
    return this.questions[this.currentIndex];
  },

  submitAnswer: function (optionIndex) {
    let q = this.getCurrentQuestion();
    let isCorrect = q.options[optionIndex].isCorrect;

    if (isCorrect) {
      this.score += 20; // 5 題每題 20 分
    }

    this.userAnswers.push({
      questionId: q.id,
      selectedOption: optionIndex,
      isCorrect: isCorrect
    });

    return {
      isCorrect: isCorrect,
      explanation: q.explanation,
      scamType: q.scamType,
      isLast: this.currentIndex === this.questions.length - 1
    };
  },

  nextQuestion: function () {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      return true;
    }
    return false;
  },

  getResultBadge: function () {
    let finalScore = this.score;
    if (finalScore === 100) {
      return {
        badge: '🛡️ 火眼金睛 - 防詐神射手',
        desc: '太棒了！您對詐騙陷阱具備絕佳的敏銳度與警覺心，是全家人的防詐守護大師！',
        color: '#10B981'
      };
    } else if (finalScore >= 80) {
      return {
        badge: '💡 智慧長者 - 警覺達人',
        desc: '表現非常出色！您能辨識絕大多數常見的詐騙與假訊息，繼續保持求證好習慣！',
        color: '#3B82F6'
      };
    } else if (finalScore >= 60) {
      return {
        badge: '☘️ 安全新手 - 防護好手',
        desc: '通過防詐測驗！遇到疑慮訊息記得落實「停、看、查、問、檢」五步驟喔！',
        color: '#F59E0B'
      };
    } else {
      return {
        badge: '🔰 溫馨提醒 - 需多加留意',
        desc: '別氣餒！詐騙集團手法花樣百出，多看本站的「常見詐騙案例庫」，並多與家人討論喔！',
        color: '#EF4444'
      };
    }
  }
};
