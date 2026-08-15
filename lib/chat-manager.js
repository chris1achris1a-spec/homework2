import { client, DEFAULT_MODEL } from "./openai.js";
import { toOpenAITool } from "../utils/func-tool.js";
import * as allTools from "../tools/index.js";

const SYSTEM_PROMPT = `你是一位會使用計算機工具的繁體中文助理。
規則：
1. 使用者要求計算、算式、數學運算時，必須呼叫 calculate 工具。
2. 不要自己心算後直接回答，必須先使用工具取得結果。
3. 工具回傳 success: true 時，請用繁體中文說明運算式與計算結果。
4. 工具回傳 success: false 時，請說明無法計算的原因，並提醒使用者輸入有效算式。`;

const toolList = Object.values(allTools);
const tools = toolList.map(toOpenAITool);
const toolsByName = Object.fromEntries(toolList.map((tool) => [tool.name, tool]));
const MAX_TOOL_ROUNDS = 8;

export async function askCalculatorAssistant(userQuestion, { verbose = true } = {}) {
  const history = [
    { role: "developer", content: SYSTEM_PROMPT },
    { role: "user", content: userQuestion },
  ];

  const toolCalls = [];

  for (let round = 1; round <= MAX_TOOL_ROUNDS; round += 1) {
    const response = await client.responses.create({
      model: DEFAULT_MODEL,
      input: history,
      tools,
      tool_choice: "auto",
    });

    history.push(...response.output);

    const functionCalls = response.output.filter(
      (item) => item.type === "function_call",
    );

    if (functionCalls.length === 0) {
      return {
        answer: response.output_text,
        toolCalls,
      };
    }

    for (const functionCall of functionCalls) {
      const tool = toolsByName[functionCall.name];
      if (!tool) {
        throw new Error(`模型要求了未註冊的工具：${functionCall.name}`);
      }

      const rawArgs = functionCall.arguments ? JSON.parse(functionCall.arguments) : {};
      const args = tool.parameters.parse(rawArgs);

      if (verbose) {
        console.log(`\n[呼叫 tool] ${functionCall.name}(${JSON.stringify(args)})`);
      }

      const result = await tool.fn(args);
      toolCalls.push({ name: functionCall.name, args, result });

      if (verbose) {
        console.log(`[工具結果] ${JSON.stringify(result)}`);
      }

      history.push({
        type: "function_call_output",
        call_id: functionCall.call_id,
        output: JSON.stringify(result),
      });
    }
  }

  throw new Error(`Tool calling 超過 ${MAX_TOOL_ROUNDS} 輪，已停止執行`);
}
