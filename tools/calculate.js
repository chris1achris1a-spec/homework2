import { z } from "zod";
import { defineTool } from "../utils/func-tool.js";

const SAFE_EXPRESSION_PATTERN = /^[0-9+\-*/().%\s]+$/;

export function calculate({ expression }) {
  const normalizedExpression = String(expression ?? "").trim();

  if (!normalizedExpression) {
    return {
      expression: normalizedExpression,
      success: false,
      error: "運算式不可為空。",
    };
  }

  if (!SAFE_EXPRESSION_PATTERN.test(normalizedExpression)) {
    return {
      expression: normalizedExpression,
      success: false,
      error: "運算式只能包含數字、空白、+、-、*、/、%、小數點與括號。",
    };
  }

  try {
    const result = Function(`"use strict"; return (${normalizedExpression});`)();

    if (typeof result !== "number" || !Number.isFinite(result)) {
      return {
        expression: normalizedExpression,
        success: false,
        error: "計算結果不是有效數字。",
      };
    }

    return {
      expression: normalizedExpression,
      result,
      success: true,
    };
  } catch (error) {
    return {
      expression: normalizedExpression,
      success: false,
      error: error.message,
    };
  }
}

export const calculateTool = defineTool({
  name: "calculate",
  description: "進行數學計算，可計算加減乘除、括號、小數與百分比符號。",
  fn: calculate,
  parameters: z.object({
    expression: z.string().describe("數學運算式，例如 10 + 5 * 2 或 (10 + 5) * 2"),
  }),
});

export const calculateJsonSchemaForReport = {
  type: "function",
  name: "calculate",
  description: "進行數學計算",
  parameters: {
    type: "object",
    properties: {
      expression: {
        type: "string",
        description: "數學運算式，例如 10 + 5 * 2",
      },
    },
    required: ["expression"],
    additionalProperties: false,
  },
  strict: true,
};
