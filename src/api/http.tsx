const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

const buildUrl = (endpoint: string) => {
  const trimmedBase = API_BASE_URL.endsWith("/")
    ? API_BASE_URL
    : `${API_BASE_URL}/`;

  return `${trimmedBase}${endpoint}`;
};

const request = async <TResponse, TBody = unknown>(
  endpoint: string,
  method: HttpMethod,
  body?: TBody,
): Promise<TResponse> => {
  const token = localStorage.getItem("token");
  const response = await fetch(buildUrl(endpoint), {
    method,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const payload = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message =
      typeof payload === "object" &&
        payload !== null &&
        "message" in payload &&
        typeof payload.message === "string"
        ? payload.message
        : "Request failed";

    throw new Error(message);
  }

  return payload as TResponse;
};

export const http = {
  get: <TResponse,>(endpoint: string) =>
    request<TResponse>(endpoint, "GET"),
  post: <TResponse, TBody>(endpoint: string, body: TBody) =>
    request<TResponse, TBody>(endpoint, "POST", body),
  put: <TResponse, TBody>(endpoint: string, body: TBody) =>
    request<TResponse, TBody>(endpoint, "PUT", body),
  delete: <TResponse,>(endpoint: string) =>
    request<TResponse>(endpoint, "DELETE"),
};
