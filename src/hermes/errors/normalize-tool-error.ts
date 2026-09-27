import { ZodError } from "zod";

import { ToolError } from "./tools-error.js";

export const normalizeToolError = (
  error: unknown
): ToolError => {
  if (error instanceof ToolError) {
    return error;
  }

  if (error instanceof ZodError) {
    return new ToolError(
      "INVALID_TOOL_INPUT",
      "Tool input is invalid"
    );
  }

  if (error instanceof Error) {
    return new ToolError(
      "TOOL_EXECUTION_FAILED",
      error.message
    );
  }

  return new ToolError(
    "UNKNOWN_TOOL_ERROR",
    "An unknown tool error occurred"
  );
};