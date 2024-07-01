  import helpers from "../helpers/helpers";
import axios from "axios";

const { apiUrl } = helpers;

const refreshToken = async () => {
  const token = sessionStorage.getItem("token");
  const tokens = JSON.parse(token);
  const refreshToken = tokens?.refreshToken;

  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  try {
    const result = await axios.post(`${apiUrl}/auth/refresh-tokens`, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    const { data } = result.data;
    sessionStorage.setItem("token", JSON.stringify(data));
    return data?.accessToken;
  } catch (error) {
    sessionStorage.removeItem("token");
    throw new Error("Failed to refresh token");
  }
};

const axiosInstance = axios.create({
  baseURL: apiUrl,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = sessionStorage.getItem("token");
    const tokens = JSON.parse(token);

    const accessToken = tokens?.accessToken;

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(error);
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshToken();
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed", refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const loginFunc = async (loginDetails) => {
  try {
    const result = await axios.post(`${apiUrl}/auth/login`, loginDetails);
    const data = result.data;

    return data;
  } catch (error) {
    console.error(error);
    throw error?.response?.data;
  }
};

export const register = async (registerDetails) => {
  try {
    const result = await axios.post(
      `${apiUrl}/auth/register/celebrity`,
      registerDetails
    );
    const data = result.data;

    return data;
  } catch (error) {
    console.log(error);
    throw error.response.data;
  }
};
export const SendEmailOTP = async (email) => {
  try {
    const result = await axiosInstance.post(`/auth/send-email-otp`, { email });
    const data = result.data;

    return data;
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};

export const verifyOTP = async (details) => {
  try {
    const result = await axiosInstance.post(`/auth/verify-email-otp`, {
      details,
    });
    const data = result.data;

    return data;
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};
export const forgotPassword = async (details) => {
  try {
    const result = await axiosInstance.patch(
      `/auth/send-reset-password-mail`,
      details
    );
    const data = result.data;

    return data;
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};

export const resetPassword = async (details) => {
  try {
    const result = await axiosInstance.patch(`/auth/reset-password`, details);

    const data = result.data;

    return data;
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};

export const postRequest = async ({ url, data }) => {
  try {
    const result = await axiosInstance.post(url, data);

    const response = result.data;

    return response;
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};

export const getRequest = async (url) => {
  try {
    const result = await axiosInstance.get(url);

    const response = result.data;

    return response;
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};

export const deleteRequest = async ({ url, data }) => {
  try {
    const result = await axiosInstance.delete(url, data);

    const response = result.data;

    return response;
  } catch (error) {
    console.error(error);
    throw error?.response?.data;
  }
};
