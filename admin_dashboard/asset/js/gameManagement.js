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

const getGames = async () => {
  try {
    const response = await customFetch(`${apiUrl}/admin/games`, {
      method: "GET",
    });

    const data = await response.json();
    const games = data?.data;
    const tbody = document.getElementById("gamestable");

    const div = document.createElement("div");

    div.innerHTML = `<div class="d-flex justify-content-between align-items-center text-white">`;

    tbody.appendChild(div);

    const h5 = document.createElement("h5");

    h5.innerHTML = `<h5 class="px-4 pt-2 text-white">Game Library</h5>`;

    tbody.appendChild(h5);

    games.forEach((game) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
            <td class="mx-4"><p class="mx-2 my-2">${game.name}</p></td>
            <td class="mx-4"><p class="mx-2 my-2">${
              game?.category ?? "No Category"
            }</p></td>
            <td class="mx-4"><button class="${
              game?.isActivated ? "activated" : "Inactive"
            }">${game?.isActivated ? "Activated" : "Deactivated"}</button></td>
                `;
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error(error);
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  await getGames();
});

const addGameForm = document.getElementById("regularForm");

console.log(addGameForm);

addGameForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  addGames();
});

const addGames = async () => {
  const name = document.getElementById("gameName").value;
  const description = document.getElementById("gameDescribtion").value;
  const image = document.getElementById("gameUpload").files[0];

  const data = {
    name,
    description,
    image,
    maxPlayers: 2,
  };

  console.log(data);

  const response = await customFetch(`${apiUrl}/admin/games`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(data),
  });

  const newGameData = await response.json();

  console.log(newGameData);
};
