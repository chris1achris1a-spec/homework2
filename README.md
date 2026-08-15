# 作業 2：新增一個 Function Calling 工具 - 計算機 calculate

## 一、作業方向

本作業依照課後作業要求，參考課程中的天氣工具與 Function Calling 流程，新增一個「計算機」工具，讓 AI 可以在對話中呼叫 `calculate` 工具進行數學運算。

## 二、測試問題與預期結果

| 測試問題 | 預期工具呼叫 | 正確結果 |
|---|---|---:|
| 請幫我計算 `10 + 5 * 2` | `calculate({"expression":"10 + 5 * 2"})` | 20 |
| 請計算 `(100 - 20) / 4` | `calculate({"expression":"(100 - 20) / 4"})` | 20 |
| 請問 `3.5 * 2 + 1` 等於多少？ | `calculate({"expression":"3.5 * 2 + 1"})` | 8 |
| 請幫我計算 `(10 + 5) * 2` | `calculate({"expression":"(10 + 5) * 2"})` | 30 |

## 三、實際執行結果範例，供截圖驗收

[呼叫 tool] calculate({"expression":"(10 + 5) * 2"})
[工具結果] {"expression":"(10 + 5) * 2","result":30,"success":true}

[AI 回答]
(10 + 5) * 2 的計算結果是 30。
```

這段輸出可以作為老師要求「AI 能在對話中正確呼叫計算機」的截圖依據。

