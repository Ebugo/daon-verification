/**
 * Un-bundles the message from either a request response or error
 *
 * @param {object} args Function arguments
 * @param {object} args.error Error response object
 * @param {object} args.response Response object
 * @returns {string} Message
 */
export const responseMessageHandler = ({
  response,
  error,
}: {
  response?: any;
  error?: any;
}): string => {
  if (error) {
    if (error.code === "ECONNABORTED") {
      return "There seems to be a connection timeout, please try again.";
    }
    if (
      error?.response?.status >= 500 &&
      (typeof error?.response?.data !== "string" ||
        error?.response?.data?.toLowerCase()?.includes("server error") ||
        error?.response?.data?.message?.toLowerCase()?.includes("server error"))
    ) {
      return "Oops! Something went wrong. Please try again.";
    }
    if (error.response?.data?.concatenatedErrors) {
      return error.response?.data?.concatenatedErrors;
    }
    if (error?.response?.data?.message) {
      return error?.response?.data?.message?.split(" - ")?.[0];
    }

    if (error?.response?.data?.messages?.length) {
      return error?.response?.data?.messages?.join(", ");
    }

    if (typeof error === "string") {
      const errorResponse = JSON.parse(error);
      return errorResponse?.message;
    }

    if (error?.response?.data?.data?.message) {
      return error?.response?.data?.data?.message;
    }

    return (
      error?.response?.data?.message ||
      error?.response?.data?.data ||
      error?.response?.data?.title ||
      error?.response?.data ||
      error?.response?.data?.data?.message ||
      error?.response?.data?.errorMessage ||
      (error?.response?.status === 413 &&
        "File too large, please upload a smaller file") ||
      (error?.response?.status === 200 &&
        error?.response?.data?.data?.message) ||
      "An error occurred. Please try again."
    );
  }

  if (response?.data?.messages?.length) {
    return response?.data?.messages?.join(", ");
  }

  if (response?.data?.concatenatedErrors) {
    return response?.data?.concatenatedErrors;
  }

  if (response?.data?.message) {
    return response?.data?.message;
  }

  if (response?.data?.data) {
    return response?.data?.data;
  }

  return response?.data?.message || response?.data?.data?.message || "Success";
};
