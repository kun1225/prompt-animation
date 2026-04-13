建立一個滾動觸發（scroll-trigger）的文字動畫

製作 `word-blur-reveal` 組件，初始 props 有：

1. text?: string
2. classname?: string

文字透過 prop text 傳入，預設文字內容為：

```
What started as a home by the water evolved into a sanctuary — stewarded with intention, rooted in preserved land, and dedicated to meaningful pause.
```

動畫效果：

- 將文字按空格切成單字
- 頁面捲動到該區塊時，每個單字依序從下往上浮現（stagger 效果）
- 每個單字的動畫包含（用常數寫在檔案最上方，方便日後調整）：：
  - `opacity`：0 → 1
  - `translateY`：24px → 0
  - `rotate`：6deg -> 0deg
  - `filter: blur`：8px → 0px
- 使用以下動畫參數（用常數寫在檔案最上方，方便日後調整）：
  - `stagger`：0.06 秒（每個單字之間的延遲）
  - `duration`：0.6 秒（每個單字的動畫時長）
- 動畫只播放一次（`once: true`）
- 不需要 useReduceMotion
- 樣式：
  - 字體大小：40px
  - 字體：`font-serif`
  - 不要使用 overflow: hidden 切掉文字
  - 設定 max-width 和 margin-inline-auto 將文字置中
- 用專案依賴的動畫庫（GSAP 或 Motion）製作，如沒有動畫庫，使用 Motion。

完成後，詢問用戶：

「動畫已完成！你想接著做什麼？

**A.** 修改文字內容
**B.** 調整動畫速度或 stagger 節奏
**C.** 更換背景色或文字顏色
**D.** 抽離成接受 props 的可重複使用元件
**E.** 告訴我實現方式與步驟
**F.** 其他調整」
