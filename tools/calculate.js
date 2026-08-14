import { z } from "zod";
import { defineTool } from "../utils/func-tool.js";

function calculate(expression) {
  try {
    const result = Function('"use strict"; return (' + expression + ')')();
    return {
      expression: expression,
      result: result,
      success: true
    };
  } catch (error) {
    return {
      expression: expression,
      error: error.message,
      success: false
    };
  }
}

export const calculateTool = defineTool({
  name: "calculate",
  description: "進行數學計算",
  fn: calculate,
  parameters: z.object({
    expression: z.string().describe("數學運算式，例如 '10 + 5 * 2'")
  }),
});