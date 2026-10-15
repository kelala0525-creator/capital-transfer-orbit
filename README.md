# 資金星月圖 | CAPITAL TRANSFER ORBIT

React + TypeScript + Vite + Three.js + Netlify Functions 的單頁式金融資料視覺化專案。

## 使用方式

1. 在有網路的電腦安裝 Node.js 20 或以上版本。
2. 解壓縮 ZIP，在專案目錄執行 `npm install`。
3. 執行 `npx netlify dev`（第一次需安裝 Netlify CLI），使用含 Functions 的本機環境預覽。
4. 執行 `npm run build` 檢查 TypeScript 與 Vite 編譯。
5. 推送到 GitHub，於 Netlify 選取「Add new project → Import an existing project」，連接該 repo。Build command: `npm run build`；Publish directory: `dist`。Netlify 自動使用 `netlify.toml` 及 `netlify/functions`。

注意：單純以 `npm run dev` 啟動 Vite 不會提供 `/.netlify/functions/*` API；開發帶有資料的頁面應使用 `netlify dev`。

## 資料真實性與限制

- 資產節點只從官方可取得且成功合併的法人成交股數與收盤價生成，依絕對估算淨額排序，最多展示 **131 個**；不是固定自動捏造 131 檔。
- 「有效母體」是本次 API 成功匹配並具有可計算淨額的項目，不保證是所有 990 檔證券。部分來源連線失敗時仍可能返回局部資料與註記。
- ETF 資料取自上市 ETF 專用三大法人報表與上市收盤資料；不等於全市場所有 ETF。現行解碼依官方中文表頭的關鍵字對照，官方改版後可能需要更新。
- 估算金額 = 三大法人淨買賣超股數 × 收盤價，不是實際逐筆資金流；動畫連線為**視覺化推測**，不表示 A 產業的資金真正流入 B 產業。
- TPEx 與 TWSE 開放資料有時可能因 CORS、限流、更新時差或欄位異動而失敗；Netlify Function 失敗時不以假行情取代。
- 盤後資料成功抓取時，瀏覽器 localStorage 才保存當期快照以供歷史範圍切換。**歷史紀錄只在相同瀏覽器可見**；不是跨使用者或跨裝置的資料庫。需要公共歷史資料時，應增加部署時定時同步並儲存靜態 JSON 的排程（目前未實作），因此「近一年」在新裝置不會假裝有資料。
- TAIFEX `getVixData` 的每日分時內容可能為 CSV 或其他格式，解析器只接受能辨認的時間與值；不能解析時明確顯示無資料，**不會使用 27.53 之類的舊值當作即時數字**。
- 台股財經新聞獨立每 5 分鐘抓取中央社 RSS 和鉅亨網 JSON。只顯示來源、分類、標題、時間與連結，不抓全文；排除距最新稿逾 60 小時和逾當前約 61 小時的舊稿。
- 本專案不需要後端資料庫、登入、外部圖片，也不需要瀏覽器直接跨站存取交易所。

## 路徑

- `src/main.tsx`：UI 與市場資訊組合、篩選、資料抓取排程
- `src/Globe.tsx`：Three.js 場景、拖曳/縮放、射線點選、WebGL 清理及 2D 備援
- `src/data.ts`：JSON 快照、期間彙總、數字格式、產業結論
- `src/types.ts`：節點資料模型
- `src/style.css`：響應式終端機視覺系統
- `netlify/functions/market.mjs`：TPEx/TWSE 官方資料代理及合併
- `netlify/functions/vix.mjs`：TAIFEX 代理
- `netlify/functions/news.mjs`：財經新聞代理

## 重要未驗證事項

本次交付環境無法下載 npm 依賴，因此**尚未完成真實安裝、npm run build、瀏覽器逐項驗收或公開 Netlify 上線**。源碼已建立，三個 Netlify Functions 已通過 Node 語法檢查；正式發布前必須在可連網 Node 環境完成編譯與官方 API 實測。此版本不應被描述為已外網上線的成品。
