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

document.addEventListener("DOMContentLoaded", async () => {
  await getTransactions();
});

const getTransactions = async () => {
    console.log("waslkdlk");
  const tbody = document.getElementById("transacTable");
  console.log(tbody);
  const response = customFetch(
    `${apiUrl}/admin/transactions?pageNo=1&resultsPerPage=5&monthAndYear=2024-06-18T12:29:04.676Z`,
    {
      method: "GET",
    }
  );

  const data = await response.json();

  console.log(data);

  const transactions = data?.data[0]?.allTransactions;
  tbody.innerHTML = "";

  console.log(transactions);

  const da = document.createElement("div");

  da.innerHTML = `
      <div class="d-flex justify-content-between align-items-center text-white">
        <h5 class="px-4 pt-2 text-white">User Overview</h5>
    </div>
            `;
  tbody.append(da);

  const thead = document.createElement("tr");

  thead.innerHTML = `
    <th>User ID</th>
    <th>Transction Type</th>
    <th>Amouont (&#x20A6;)</th>
    <th>Date and Time</th>
    <th>Status</th>
    `;

  thead.classList.add("header");

  tbody.append(thead);

  transactions.forEach((transac) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
         <td><p class="mx-2 my-2">${transac?.userId}</p></td>
        <td><p class="mx-2 my-2">${transac?.type}</p></td>
        <td>
        <p class="mx-2 my-2">&#x20A6; <span>${transac?.amount}</span></p>
        </td>
        <td><p class="mx-2 my-2">${new Date(
          transac?.createdAt
        ).toLocaleDateString()}</p></td>
        <td><button class="activated">${transac?.status}</button></td>
      `;
    tbody.appendChild(tr);
    console.log(tbody);
  });
};
