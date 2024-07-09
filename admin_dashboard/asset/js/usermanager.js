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

window.addEventListener("load", async () => {
  await getUserSummary();
  await getUsers();
});

const getUserSummary = async () => {
  const response = await customFetch(`${apiUrl}/admin/users-summary`, {
    method: "GET",
  });

  const data = await response.json();

  const { totalAdminAccounts, totalCelebrityUsers, totalRegularUsers } =
    data?.data;

  const celebNum = document.getElementById("celebNum");
  const adminNum = document.getElementById("adminNum");
  const regularNum = document.getElementById("regularNum");

  celebNum.textContent = totalCelebrityUsers;
  adminNum.textContent = totalAdminAccounts;
  regularNum.textContent = totalRegularUsers;
};

const getUsers = async () => {
  const response = await customFetch(`${apiUrl}/admin/users?resultsPerPage=5`, {
    method: "GET",
  });

  const data = await response.json();

  const users = data?.data;

  users.forEach((user, index) => {
    const row = document.getElementById(`user${index + 1}`); // Assuming IDs are user1, user2, ...

    console.log(row);
    if (row) {
      const usernameCell = row.querySelector("td:nth-child(1) p");
      console.log(usernameCell);
      const emailCell = row.querySelector("td:nth-child(2) p");
      const createdAtCell = row.querySelector("td:nth-child(3) p");
      const statusCell = row.querySelector("td:nth-child(4) p");
      console.log(statusCell);
      const activationButton = row.querySelector("td:nth-child(5) button");
      console.log(activationButton);
      // Format createdAt date
      const createdAtDate = new Date(user.createdAt);
      const formattedDate = `${createdAtDate
        .getDate()
        .toString()
        .padStart(2, "0")}-${(createdAtDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${createdAtDate.getFullYear()}`;

      // Populate data into cells
      usernameCell.textContent = user.username;
      emailCell.textContent = user.email;
      createdAtCell.textContent = formattedDate;
      statusCell.textContent = user.isCelebrity ? "Celebrity" : "Regular";
      activationButton.textContent = user.accountIsActive
        ? "Active"
        : "Inactive";

      if (user.accountIsActive) {
        activationButton.classList.remove("Deleted");
        activationButton.classList.remove("Inactive");
        activationButton.classList.add("activated");
      } else {
        activationButton.classList.remove("Deleted");
        activationButton.classList.remove("activated");
        activationButton.classList.add("Inactive");
      }
    }
  });
};
