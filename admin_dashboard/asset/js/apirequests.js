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
          window.location.href = "../admin_dashboard/login.html";z
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

window.addEventListener("load", async () => {
  await getDashBoardSummary();
});

const getDashBoardSummary = async () => {
  try {
    const response = await customFetch(`${apiUrl}/admin/dashboard`, {
      method: "GET",
    });

    console.log(response);
    const data = await response.json();

    const {
      totalGames,
      totalRevenue,
      totalUsers,
      totalTransactions,
      topGames,
    } = data?.data;

    console.log(topGames);
    const userNum = document.getElementById("userNum");

    const gamesNum = document.getElementById("gamesNum");

    const totalRev = document.getElementById("totalRev");

    gamesNum.textContent = totalUsers;
    userNum.textContent = totalGames;
    totalRev.textContent = totalRevenue;

    topGames.forEach((game, index) => {
      const row = document.getElementById(`game${index + 1}`);

      console.log(row);

      if (row) {
        const nameCell = row.querySelectorAll("td p")[1];
        const progress = row.querySelector(".progress");
        const button = row.querySelector("button");

        nameCell.textContent = game.name;
        const ratingPercentage = game.averageRating * 20; // Assuming max rating is 5, hence 20% for each unit
        progress.style.width = `${ratingPercentage}%`;
        button.textContent = `${ratingPercentage}%`;
      }
    });
  } catch (error) {
    console.error(error);
  }
};
