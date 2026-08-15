import { askCalculatorAssistant } from "../lib/chat-manager.js";

const questions = [
  "請幫我計算 10 + 5 * 2",
  "請計算 (100 - 20) / 4",
  "請問 3.5 * 2 + 1 等於多少？",
];

for (const question of questions) {
  console.log("\n==============================");
  console.log(`測試問題：${question}`);
  const result = await askCalculatorAssistant(question, { verbose: true });
  console.log("\nAI 回答：");
  console.log(result.answer);
}
