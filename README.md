# 作業 2：新增一個 Function Calling 工具 - 計算機 calculate

## 一、作業方向

本作業依照課後作業要求，參考課程中的天氣工具與 Function Calling 流程，新增一個「計算機」工具，讓 AI 可以在對話中呼叫 `calculate` 工具進行數學運算。

## 二、實作

@chris1achris1a-spec ➜ /workspaces/homework2 (main) $ node main.js
✔ 請輸入你的計算問題： 10 + 5 * 2
[已呼叫工具] calculate({"expression":"10 + 5 * 2"})
[工具結果] {"expression":"10 + 5 * 2","result":20,"success":true}
運算式：10 + 5 × 2  
依照先乘除後加減，結果為 **20**。

@chris1achris1a-spec ➜ /workspaces/homework2 (main) $ node main.js
✔ 請輸入你的計算問題： 2*5+6
[已呼叫工具] calculate({"expression":"2*5+6"})
[工具結果] {"expression":"2*5+6","result":16,"success":true}
2 × 5 + 6 = **16**