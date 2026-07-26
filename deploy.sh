#!/bin/bash
# ------------------------------------------------------------------
# SafeFamily Guard - GitHub Pages 一鍵自動部署腳本
# ------------------------------------------------------------------

set -e

if [ -z "$1" ]; then
  echo "❌ 錯誤：請提供您的 GitHub 使用者名稱！"
  echo "使用範例：./deploy.sh 您的GitHub帳號"
  exit 1
fi

GITHUB_USER=$1
REPO_NAME="fact-check-family-guard"

echo "🚀 開始設定 GitHub 遠端儲存庫: https://github.com/$GITHUB_USER/$REPO_NAME.git"

# 1. 綁定遠端分支
git remote remove origin 2>/dev/null || true
git remote add origin "https://github.com/$GITHUB_USER/$REPO_NAME.git"

# 2. 推送程式碼
echo "📤 正在推送程式碼至 GitHub..."
git branch -M main
git push -u origin main

echo ""
echo "🎉 程式碼推成功！"
echo "請至下方網址開啟 GitHub Pages (Settings -> Pages -> Branch: main -> Save):"
echo "👉 https://github.com/$GITHUB_USER/$REPO_NAME/settings/pages"
echo ""
echo "部署完成後，您的防詐網址為："
echo "👉 https://$GITHUB_USER.github.io/$REPO_NAME/"
