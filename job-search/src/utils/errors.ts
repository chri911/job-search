import type { ErrorInfo } from "react";
import { ApiError } from "../api/client";

export interface ErrorDescription {
  title: string;
  message: string;
  retryable: boolean;
}

export const describeError = (error: unknown): ErrorDescription => {
  if (error instanceof ApiError) {
    if (error.status === 0) {
      return {
        title: "Can't reach the server",
        message:
          "Check your connection and make sure the API is running, then try again.",
        retryable: true,
      };
    }
    if (error.status === 404) {
      return { title: "Not found", message: error.message, retryable: false };
    }
    if (error.status >= 500) {
      return {
        title: "Server error",
        message:
          "Something went wrong on our side. Please try again in a moment.",
        retryable: true,
      };
    }
    return {
      title: "Request failed",
      message: error.message,
      retryable: false,
    };
  }
  return {
    title: "Something went wrong",
    message: "An unexpected error occurred. Please try again.",
    retryable: true,
  };
};

export const errorDetails = (error: unknown): string => {
  return error instanceof Error
    ? (error.stack ?? error.message)
    : String(error);
};

export const logError = (error: unknown, info: ErrorInfo) => {
  console.error("Unhandled UI error:", error, info.componentStack);
};
