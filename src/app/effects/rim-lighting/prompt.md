# 實現基於 WebGL Shader 的全螢幕液態虹彩邊框 (Liquid Rim Lighting)

## 1. 渲染技術與環境

- 使用 **Three.js / React Three Fiber** 在螢幕對齊的 Quad 上運行 Fragment Shader。
- 必須開啟 **Additive Blending** 並配置 **Post-processing Bloom** (Threshold 0.2, Intensity 1.5) 以達到發光質感。
- 實現 **Viewport Aspect Ratio Correction**，確保圓角在不同解析度下均勻不變形。

## 2. 核心幾幾算法 (Geometry & SDF)

- **Rounded Box SDF**: 使用 Signed Distance Function 定義邊框。
- **邊緣距離控制 (Rim Inset)**: 提供 `rim_inset` 參數。`0.0` 為貼合邊緣；負值（如 `-0.03`）會將邊框向外推，結合邊緣裁剪創造出更隱約的「外滲」感；正值則向內縮。
- **邊緣裁剪 (Edge Clipping)**: 將 SDF 的 `size` 設為 `vec2(aspect, 1.0) - rim_inset`，使線條中心與視口邊界互動，裁剪掉部分發光區域，形成半邊緣效果。
- **精確圓角 (Pixel-Perfect Corners)**: 提供 `corner_radius_px`（建議 24px ~ 128px），公式：`radius = (px * 2.0) / u_resolution.y`，確保跨裝置視覺一致。

## 3. 動態液態效果 (Animation Logic)

- **角動量映射 (Angular Mapping)**: 透過 `atan2(y, x)` 計算角度。
- **整數頻率 (Integer Frequencies) [重要避坑]**: 所有作用於 `angle` 的倍數必須為 **整數**，否則在 $\pi$ 到 $-\pi$ 的交界處（螢幕左側）會出現明顯斷層與接縫。
- **多層波形合成 (Multi-layered Waves)**: 合成至少三層不同頻率的波形來控制 `thickness` 與 `intensity`。建議 `base_thickness` 設為 `0.1` 左右以獲得更豐滿的液體質感。

## 4. 色彩與交互 (Color & Interaction)

- **無縫虹彩循環**: 使用餘弦色彩循環公式 `0.5 + 0.5 * cos(6.28 * (hue + vec3(0, 0.33, 0.67)))` 確保 360 度色彩連續。
- **滑鼠感應**: 實作 `u_mouse` 變量，在游標半徑內透過 `smoothstep` 增強發光。

## 5. 標題裝飾（Title）

使用以下標題，置於畫面中間

```tsx
<h1 className="text-white text-4xl font-light tracking-[0.5em] opacity-80 uppercase">
  Rim Lighting
</h1>
```

## 5. 程式碼架構與開發者避坑指南 (Pitfall Prevention)

- **Configurable Parameters**: 在 Shader `main` 頂部宣告變數區塊（`rim_inset`, `corner_radius_px`, `base_thickness` 等）。
- **長寬比修正**: 進入 SDF 前必須先修正座標 `p.x *= aspect`，否則圓角會變橢圓。
- **HDR 發光層次**: 讓波峰的強度超過 `1.0`（Super-white），能引發 Bloom 產生局部強發光，增加流動感。
- **效能優化**: 避免在 Shader 中使用複雜的分支判斷，盡量使用 `step` 或 `smoothstep`。
