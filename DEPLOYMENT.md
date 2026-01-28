# 🚀 部署到 Cloudflare Pages

本專案使用 **GitHub Actions** 自動建構（包含 Puppeteer pre-rendering），然後部署到 **Cloudflare Pages**。

> **為什麼使用 GitHub Actions？**  
> Cloudflare Pages 建構環境不支援 Puppeteer（缺少 Chromium），因此我們在 GitHub Actions 上完成 pre-rendering，確保每個頁面都有完整的 SEO 友善 HTML。

## 📋 前置準備

### 1. 取得 Cloudflare API Token

1. 登入 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 前往 **My Profile** → **API Tokens**
3. 點擊 **Create Token**
4. 選擇 **Edit Cloudflare Workers** 模板，或自訂權限：
   - **Account** → **Cloudflare Pages** → **Edit**
5. 複製生成的 token（只會顯示一次！）

### 2. 取得 Cloudflare Account ID

1. 登入 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 選擇任一網域（或前往 Workers & Pages）
3. 右側欄會顯示 **Account ID**，複製它

### 3. 設定 GitHub Secrets

1. 前往你的 GitHub Repository
2. 點擊 **Settings** → **Secrets and variables** → **Actions**
3. 點擊 **New repository secret**
4. 新增以下兩個 secrets：

| Name | Value |
|------|-------|
| `CLOUDFLARE_API_TOKEN` | 你的 Cloudflare API Token |
| `CLOUDFLARE_ACCOUNT_ID` | 你的 Cloudflare Account ID |

---

## 🔧 部署方式

### 使用 GitHub Actions 自動部署 ✅

**特點：**
- ✅ 完整支援 Puppeteer pre-rendering
- ✅ SEO 友善的靜態 HTML（每個頁面都有完整內容）
- ✅ 自動化部署流程
- ✅ 每次 push 到 main 分支自動觸發

**部署流程：**

```bash
# 1. 確保你已經設定好 GitHub Secrets（見上方）

# 2. 推送程式碼到 GitHub
git add .
git commit -m "Deploy to Cloudflare Pages"
git push origin main

# 3. GitHub Actions 會自動：
#    - 安裝 Node.js 和依賴套件
#    - 安裝 Chromium 和 Puppeteer 依賴
#    - 執行 Vue 建構 (vue-cli-service build)
#    - 執行 Puppeteer pre-rendering（生成 SEO 友善的 HTML）
#    - 部署到 Cloudflare Pages

# 4. 查看部署狀態：
#    前往 GitHub Repository → Actions 頁籤
```

**Workflow 檔案位置：**  
`.github/workflows/deploy.yml`

**建構時間：** 約 3-5 分鐘（包含 Puppeteer 渲染所有頁面）

---

## 🧪 本地測試

```bash
# 安裝依賴
npm install

# 建構專案（包含 Puppeteer pre-rendering）
npm run build

# 查看生成的 HTML 檔案（確認每個路由都有完整內容）
ls -R dist/
cat dist/clinics/jingan/index.html  # 查看是否包含完整的診所內容

# 本地測試靜態檔案
npx serve -s dist
# 訪問 http://localhost:3000/clinics/jingan
# 查看網頁原始碼，確認 HTML 中已包含完整內容
```

---

## 📁 建構產出

```
dist/
├── index.html                    # ✅ 完整渲染的首頁
├── about/
│   └── index.html               # ✅ 包含完整的「關於我們」內容
├── clinics/
│   ├── index.html               # ✅ 包含診所列表
│   ├── lkdiang/index.html       # ✅ 包含「洛卡鑽」診所詳細資訊
│   ├── jingan/index.html        # ✅ 包含「靜安」診所詳細資訊
│   ├── kanghe/index.html        # ✅ 包含「康和」診所詳細資訊
│   ├── shikang/index.html       # ✅ 包含「適康」診所詳細資訊
│   └── shinhe/index.html        # ✅ 包含「新和」診所詳細資訊
├── services/
│   └── index.html               # ✅ 包含服務項目內容
├── team/
│   └── index.html               # ✅ 包含醫療團隊資訊
├── learningResources/
│   └── index.html               # ✅ 包含衛教資訊列表
├── 404.html                     # 客戶端路由重定向
├── sitemap.xml                  # 自動生成的 sitemap
└── css/, js/, images/, fonts/   # 靜態資源
```

**SEO 優化特點：**
- ✅ 每個 `index.html` 都包含**完整渲染的內容**
- ✅ 搜尋引擎可以直接看到內容（無需執行 JavaScript）
- ✅ 社交媒體分享時能正確顯示標題、描述和預覽圖
- ✅ 首次載入速度更快（HTML 已包含內容，不需等待 JS）

---

## 🔍 故障排除

### GitHub Actions 建構失敗

**問題 1：Puppeteer 安裝失敗**

**錯誤訊息：** `The chromium binary is not available for arm64`

**解決方式：**
```yaml
# 確認 .github/workflows/deploy.yml 中有安裝 Chromium 依賴
- name: Install Puppeteer dependencies
  run: |
    sudo apt-get update
    sudo apt-get install -y chromium-browser ...
```

**問題 2：Prerender 超時**

**錯誤訊息：** `TimeoutError: Navigation timeout of 30000 ms exceeded`

**解決方式：**
- 檢查本地是否能成功執行 `npm run build`
- 可能是某個路由的資料載入過慢，考慮增加 timeout 時間：

```javascript
// scripts/prerender.js 第 55 行
await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 }) // 增加到 60 秒
```

**問題 3：Cloudflare API Token 無效**

**錯誤訊息：** `Authentication error`

**解決方式：**
- 重新生成 Cloudflare API Token
- 確認 Token 有 **Cloudflare Pages Edit** 權限
- 確認 GitHub Secrets 名稱正確：
  - `CLOUDFLARE_API_TOKEN`
  - `CLOUDFLARE_ACCOUNT_ID`

### 404 錯誤

**問題：** 訪問子路由（如 `/clinics/jingan`）返回 404

**解決方式：**
- 確保 `404.html` 已生成在 `dist/` 目錄
- Cloudflare Pages 會自動使用 404.html 處理 SPA 路由
- 如果還是不行，前往 Cloudflare Pages 設定檢查「Build output directory」是否設為 `dist`

---

## 🔗 相關資源

- [Cloudflare Pages 文件](https://developers.cloudflare.com/pages/)
- [GitHub Actions 文件](https://docs.github.com/en/actions)
- [Puppeteer 文件](https://pptr.dev/)

---

## 📝 更新日誌

- **2026-01-28**: 初始版本，支援 GitHub Actions + Cloudflare Pages 部署
