interface APIprops {
  method: string;
  url: string;
  data?: any;
  headers: Record<string, string>;
}

export const apiConnecter = async ({
  method,
  url,
  data,
  headers,
}: APIprops) => {
  const option: RequestInit = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  // Only attach body for methods other than GET or HEAD
  if (method !== "GET" && method !== "HEAD" && data) {
    option.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, option);

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "API Error");
    }

    return {
      success: true,
      data: responseData,
    };
  } catch (error: any) {
    console.error("API Error:", error);

    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
};
