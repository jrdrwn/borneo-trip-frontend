const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  let data;

  try {
    data = await response.json();
  } catch {
    data = { message: "Response backend tidak berbentuk JSON" };
  }

  if (!response.ok) {
    throw new Error(data.detail || data.message || "Request ke backend gagal");
  }

  return data;
}

function toQueryString(params = {}) {
  const search = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      search.set(key, value);
    }
  });

  const query = search.toString();
  return query ? `?${query}` : "";
}

export const api = {
  health: () => request("/api/health"),

  getCategories: () => request("/api/public/categories"),

  getRegions: () => request("/api/public/regions"),

  getEvents: (params = {}) =>
    request(`/api/public/events${toQueryString(params)}`),

  getDestinations: (params = {}) =>
    request(`/api/public/destinations${toQueryString(params)}`),

  getDestinationDetail: (id) =>
    request(`/api/public/destinations/${encodeURIComponent(id)}`),

  getFeaturedRecommendations: (params = {}) =>
    request(`/api/public/recommendations/featured${toQueryString(params)}`),

  askAI: (question, context = null) =>
    request("/api/qa/ask", {
      method: "POST",
      body: JSON.stringify({
        question,
        context
      })
    })
};