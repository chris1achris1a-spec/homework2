## 作業 2：新增⼀個 Function Calling ⼯具
# 任務描述：
  參考課程的天氣⼯具，新增⼀個「計算機」⼯具，讓 AI 可以進⾏數學運算。

# 實作
@chris1achris1a-spec ➜ /workspaces/homework2 (main) $ node function_call.js

[呼叫 tool] get_current_time({})

[呼叫 tool] get_weather({"city":"Taipei"})

[呼叫 tool] get_nearby_youbike({"lat":25.0478,"lon":121.517,"radius":500,"available_amount":1,"limit":3})

[呼叫 tool] calculate({"expression":"(10 + 5) * 2"})

[呼叫 tool] calculate({"expression":"15 * 2"})
現在是 **2026 年 8 月 13 日晚上 10:41**（台灣時間）。

台北車站附近的即時天氣資料目前無法取得（天氣服務發生錯誤）。

附近有 YouBike 可租借：

- **承德鄭州路口（市民高架下）**：約 133 公尺，**30 輛**
- **捷運臺北車站（M2 出口）**：約 210 公尺，**5 輛**
- **臺北轉運站（華陰街）**：約 277 公尺，**5 輛**

計算結果：**(10 + 5) × 2 = 30**。