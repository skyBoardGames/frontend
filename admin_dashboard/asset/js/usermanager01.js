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

// Function to generate table rows
var users = [];

const fsa = () => {
  const editButtons = document.querySelectorAll(".edit");
  const popupOverlay = document.getElementById("popupOverlay");
  const popupFormRegular = document.getElementById("popupFormRegular");
  const popupFormCelebrity = document.getElementById("popupFormCelebrity");

  editButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const row = button.closest("tr");
      const username = row.querySelector("td:nth-child(1) p").textContent;
      const email = row.querySelector("td:nth-child(2) p").textContent;
      const userType = row.querySelector("td:nth-child(4) p").textContent;

      if (userType === "Celebrity") {
        document.getElementById("celebrityUsername").value = username;
        document.getElementById("celebrityEmail").value = email;
        document.getElementById("celebrityUserType").value = userType;

        // Hide the regular form and show the celebrity form
        popupFormRegular.style.display = "none";
        popupFormCelebrity.style.display = "block";
      } else {
        document.getElementById("regularUsername").value = username;
        document.getElementById("regularEmail").value = email;
        document.getElementById("regularUserType").value = userType;

        // Hide the celebrity form and show the regular form
        popupFormCelebrity.style.display = "none";
        popupFormRegular.style.display = "block";
      }

      // Display the overlay
      popupOverlay.style.display = "block";
    });
  });

  function closeForm() {
    document.getElementById("popupOverlay").style.display = "none";
    document.getElementById("popupFormRegular").style.display = "none";
    document.getElementById("popupFormCelebrity").style.display = "none";
  }

  // Close the form when the overlay is clicked
  popupOverlay.addEventListener("click", closeForm);
};
const generateTableRows = async () => {
  const tbody = document.getElementById("userData");
  console.log(tbody);
  //   tbody.innerHTML = ""; // Clear existing rows
  const response = await customFetch(
    `${apiUrl}/admin/users?resultsPerPage=10`,
    {
      method: "GET",
    }
  );

  const data = await response.json();

  users = data?.data;
  tbody.innerHTML = "";

  console.log(users);

  const da = document.createElement("div");

  da.innerHTML = `
         <div class="d-flex justify-content-between align-items-center text-white">
                        <h5 class="px-4 pt-2 text-white">User Overview</h5>
                      </div>

            `;
  tbody.append(da);

  const thead = document.createElement("tr");

  thead.innerHTML = `
    <th>Username</th>
    <th>Email</th>
    <th>Registration Date</th>
    <th>Type</th>
    <th>Status</th>
    `;

  thead.classList.add("header");

  tbody.append(thead);

  users.forEach((user) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>
          <div class="d-flex align-items-center">
            <div class="user-icon teal my-2">
              <img src="asset/images/userProfile6.png" alt="" class="w-100 mx-auto">
            </div>
            <p class="mx-2 my-2">${user.username}</p>
          </div>
        </td>
        <td><p class="mx-2 my-2">${user.email}</p></td>
        <td><p class="mx-2 my-2">${new Date(
          user.createdAt
        ).toLocaleDateString()}</p></td>
        <td><p class="mx-2 my-2">Regular</p></td>
        <td><button class="activated">${
          user.accountIsActive ? "Active" : "Inactive"
        }</button></td>
        <td class="d-flex justify-content-between align-items-center">
          <button class="edit"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 14.2485V17.9985H3.75L14.81 6.93854L11.06 3.18854L0 14.2485ZM17.71 4.03854C17.8027 3.94602 17.8762 3.83614 17.9264 3.71516C17.9766 3.59419 18.0024 3.46451 18.0024 3.33354C18.0024 3.20257 17.9766 3.07289 17.9264 2.95191C17.8762 2.83094 17.8027 2.72105 17.71 2.62854L15.37 0.288538C15.2775 0.195834 15.1676 0.122287 15.0466 0.0721052C14.9257 0.0219237 14.796 -0.00390625 14.665 -0.00390625C14.534 -0.00390625 14.4043 0.0219237 14.2834 0.0721052C14.1624 0.122287 14.0525 0.195834 13.96 0.288538L12.13 2.11854L15.88 5.86854L17.71 4.03854Z" fill="white" fill-opacity="0.8"/>
            </svg></button>
          <button class="delete"><i class="fa fa-trash"></i></button>
        </td>
      `;
    tbody.appendChild(tr);
    fsa();
    console.log(tbody);
  });
};

// Generate table rows on page load
document.addEventListener("DOMContentLoaded", async () => {
  await generateTableRows();
});

const search = document.getElementById("search");
console.log(search);
search.addEventListener("input", async (e) => {
  const tbody = document.getElementById("userData");
  console.log(e.target.value);

  const response = await customFetch(
    `${apiUrl}/admin/users?searchTerm=${e.target.value}&resultsPerPage=10`,
    {
      method: "GET",
    }
  );

  const data = await response.json();

  console.log(data);
  users = data?.data;

  tbody.innerHTML = "";

  console.log(users);

  const da = document.createElement("div");

  da.innerHTML = `
         <div class="d-flex justify-content-between align-items-center text-white">
                        <h5 class="px-4 pt-2 text-white">User Overview</h5>
                      </div>

            `;
  tbody.append(da);

  const thead = document.createElement("tr");

  thead.innerHTML = `
    <th>Username</th>
    <th>Email</th>
    <th>Registration Date</th>
    <th>Type</th>
    <th>Status</th>
    `;

  thead.classList.add("header");

  tbody.append(thead);

  users.forEach((user) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
          <td>
            <div class="d-flex align-items-center">
              <div class="user-icon teal my-2">
                <img src="asset/images/userProfile6.png" alt="" class="w-100 mx-auto">
              </div>
              <p class="mx-2 my-2">${user.username}</p>
            </div>
          </td>
          <td><p class="mx-2 my-2">${user.email}</p></td>
          <td><p class="mx-2 my-2">${new Date(
            user.createdAt
          ).toLocaleDateString()}</p></td>
          <td><p class="mx-2 my-2">Regular</p></td>
          <td><button class="activated">${
            user.accountIsActive ? "Active" : "Inactive"
          }</button></td>
          <td class="d-flex justify-content-between align-items-center">
            <button class="edit"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 14.2485V17.9985H3.75L14.81 6.93854L11.06 3.18854L0 14.2485ZM17.71 4.03854C17.8027 3.94602 17.8762 3.83614 17.9264 3.71516C17.9766 3.59419 18.0024 3.46451 18.0024 3.33354C18.0024 3.20257 17.9766 3.07289 17.9264 2.95191C17.8762 2.83094 17.8027 2.72105 17.71 2.62854L15.37 0.288538C15.2775 0.195834 15.1676 0.122287 15.0466 0.0721052C14.9257 0.0219237 14.796 -0.00390625 14.665 -0.00390625C14.534 -0.00390625 14.4043 0.0219237 14.2834 0.0721052C14.1624 0.122287 14.0525 0.195834 13.96 0.288538L12.13 2.11854L15.88 5.86854L17.71 4.03854Z" fill="white" fill-opacity="0.8"/>
              </svg></button>
            <button class="delete"><i class="fa fa-trash"></i></button>
          </td>
        `;
    tbody.appendChild(tr);
    fsa();
    console.log(tbody);
  });
});
