import { askCalculatorAssistant } from "./lib/chat-manager.js";

const question = "請幫我計算 (10 + 5) * 2";
const result = await askCalculatorAssistant(question, { verbose: true });

console.log("\n[AI 回答]");
console.log(result.answer);
