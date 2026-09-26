const API_BASE_URL = "http://localhost:5010";

class ApiError extends Error {
  status: number;
  fields?: Record<string, string>;

  constructor(message: string, status: number, fields: Record<string, string>) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.fields = fields;
  }
}
async function apiClient<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    let message = response.statusText;
    let fields: Record<string, string> | undefined;

    try {
      const body = await response.json();
      if (body?.error) message = body.error;
      if (body?.fields) fields = body.fields;
    } catch {
      // тело не JSON — оставляем message как statusText
    }

    throw new ApiError(message, response.status, fields);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export { apiClient, ApiError };
