# 戴良恭聯合洗腎中心 官網 v2

戴良恭聯合洗腎中心的官方網站，提供分院資訊、醫療團隊介紹、服務項目以及衛教資源。

## 專案簡介

本專案使用 Vue.js 2.7 和 Bootstrap 5 構建，提供響應式設計，支援桌面和行動裝置瀏覽。

### 主要功能

- 分院資訊展示
- 醫療團隊介紹
- 服務項目說明
- 衛教專欄資源
- 響應式導航設計
- SEO 優化（預渲染）

## 技術棧

- **前端框架**: Vue.js 2.7.16
- **路由**: Vue Router 3.6.5
- **UI 框架**: Bootstrap 5.3.3
- **樣式預處理器**: Sass
- **構建工具**: Vue CLI 5.0.8
- **預渲染**: Prerender SPA Plugin

## 開始使用

### 環境需求

- Node.js 14.x 或更高版本
- npm 6.x 或更高版本

### 安裝

```bash
# 克隆專案
git clone <repository-url>

# 進入專案目錄
cd luensen-v2

# 安裝依賴
npm install
```

### 開發

```bash
# 啟動開發伺服器
npm run serve

# 開發伺服器將運行於 http://localhost:8080
```

### 構建

```bash
# 完整構建（包含預渲染）
npm run build

# 基本構建（不含預渲染）
npm run build:basic

# 單獨執行預渲染
npm run prerender
```

### 程式碼檢查

```bash
# 執行 ESLint 檢查
npm run lint
```

## 專案結構

```
luensen-v2/
├── public/              # 靜態資源
│   ├── index.html      # HTML 模板
│   └── pdf/            # PDF 文件
├── src/
│   ├── assets/         # 資源文件
│   │   └── scss/       # 樣式文件
│   ├── components/     # Vue 組件
│   ├── content/        # JSON 資料文件
│   ├── router/         # 路由配置
│   ├── utils/          # 工具函數
│   ├── views/          # 頁面組件
│   ├── App.vue         # 根組件
│   └── main.js         # 入口文件
├── scripts/            # 構建腳本
│   └── prerender.js    # 預渲染腳本
├── .eslintrc.js        # ESLint 配置
├── .prettierrc         # Prettier 配置
├── vue.config.js       # Vue CLI 配置
└── package.json        # 專案配置
```

## 路由結構

- `/` - 首頁（手機版）
- `/clinics/:branch` - 分院介紹
- `/team` - 醫療團隊
- `/services` - 服務項目
- `/learning-resources` - 衛教專欄

## 開發規範

### 代碼風格

專案使用 ESLint 和 Prettier 進行代碼格式化：

- 使用 Tab 縮排
- 單引號
- 不使用分號
- 每行最多 80 字元

### 組件命名

- 組件使用 PascalCase 命名
- 文件名與組件名保持一致

### 提交規範

建議使用語義化的提交訊息：

- `feat:` 新功能
- `fix:` 修復錯誤
- `docs:` 文檔更新
- `style:` 代碼格式調整
- `refactor:` 重構
- `perf:` 性能優化
- `test:` 測試相關
- `chore:` 構建或工具相關

## 已知問題

### 安全性

專案存在一些依賴項的安全漏洞，主要來自開發依賴：

- `braces` < 3.0.3 (高風險) - 來自預渲染插件
- `postcss` < 8.4.31 (中風險) - 來自 Vue CLI
- `vue-template-compiler` (中風險) - Vue 2 相關

大部分漏洞不影響生產環境，但建議未來升級到 Vue 3 以獲得更好的安全性支持。

### 瀏覽器支持

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)
- 不支援 IE11

## 部署

構建完成後，`dist` 目錄包含所有可部署的靜態文件。

### 靜態託管

可以部署到任何靜態託管服務：

- GitHub Pages
- Netlify
- Vercel
- AWS S3
- Azure Static Web Apps

### 部署步驟

1. 執行 `npm run build` 構建專案
2. 將 `dist` 目錄上傳至託管服務
3. 配置伺服器將所有路由指向 `index.html`（SPA 路由支持）

## 維護與更新

### 更新依賴

```bash
# 檢查過時的依賴
npm outdated

# 更新依賴
npm update

# 檢查安全漏洞
npm audit

# 自動修復安全漏洞
npm audit fix
```

## 授權

版權所有 © 戴良恭聯合洗腎中心

## 聯絡方式

如有問題或建議，請聯繫網站管理員。
