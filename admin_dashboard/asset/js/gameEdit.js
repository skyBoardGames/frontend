const apiUrl = "https://skyboardgames.com/api";

// Function to refresh token
const refreshToken = async () => {
  const token = sessionStorage.getItem("token");
  const tokens = JSON.parse(token);

  const refreshToken = tokens ? tokens.refreshToken : null;

  console.log("Token refreshed", refreshToken);

  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  try {
    const response = await fetch(`${apiUrl}/auth/refresh-tokens`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    const result = await response.json();
    const { tokens } = result;

    console.log(tokens);
    sessionStorage.setItem("token", JSON.stringify(tokens));
    return tokens?.accessToken;
  } catch (error) {
    console.error(error);
    sessionStorage.removeItem("token");
    throw new Error("Failed to refresh token");
  }
};

// Custom fetch function with interceptors
const customFetch = async (url, options = {}) => {
  // Request interceptor
  const token = sessionStorage.getItem("token");

  const tokens = JSON.parse(token);
  const accessToken = tokens ? tokens.accessToken : null;

  if (accessToken) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok && response.status === 401) {
      // Handle token refresh
      const originalRequest = options;

      if (!originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const newAccessToken = await refreshToken();

          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          // Retry original request with new token
          const retryResponse = await fetch(url, originalRequest);

          if (!retryResponse.ok) {
            throw new Error("Failed to fetch after token refresh");
          }

          return retryResponse;
        } catch (refreshError) {
          console.error("Token refresh failed", refreshError);
          throw refreshError;
        }
      }
    }

    return response;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

const editForm = document.getElementById("regularForm");
console.log(editForm);

editForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("gameName").value;
  const description = document.getElementById("gameDescribtion").value;
  const image = document.getElementById("gameUpload").files[0];
  const gameId = document.getElementById("id").value;
  const isActive = document.getElementById("regularUserType").value;
  const data = {
    name,
    description,
    image,
    isActive,
  };

  console.log(data);

  const response = await customFetch(`${apiUrl}/admin/game/${gameId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(data),
  });

  const newGameData = await response.json();

  console.log(newGameData);
});
