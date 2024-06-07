import helpers from "../helpers/helpers";
import axios from "axios";

const { BaseUrl } = helpers;
const { apiUrl } = helpers;

export const requestApi = async ({ url, method, data, token }) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config = {
    url: `${BaseUrl}${url}`,
    method,
    headers,
  };

  if (data) {
    config.data = data;
  }

  console.log(config.url);

  return axios(config)
    .then((response) => {
      return { result: response.data, responseStatus: true };
    })
    .catch((error) => {
      console.log(error);
      if (error.response) {
        //Request made and server responded
        return { responseStatus: false, errorMsg: error.response.data };
      } else if (error.request) {
        //Request made but no server response
        return {
          responseStatus: false,
          errorMsg: { error: "Server error, try again later" },
        };
      } else {
        return {
          responseStatus: false,
          errorMsg: { error: "Server error, try again later" },
        };
      }
    });
};

export const cloudinaryUpload = async ({ files }) => {
  try {
    const formData = new FormData();
    const url = "https://api.cloudinary.com/v1_1/dqcmfizfd/upload";

    const uploadedFiles = [];

    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      formData.append("file", file);
      formData.append("upload_preset", "beatsbank");

      const uploadedFile = await fetch(url, { method: "POST", body: formData });
      const uploadedFile_data = await uploadedFile.text();
      const parsedFile = JSON.parse(uploadedFile_data);

      const { secure_url } = parsedFile;
      uploadedFiles.push(secure_url);
    }

    return { responseStatus: true, result: uploadedFiles, errorMsg: null };
  } catch (error) {
    return {
      responseStatus: false,
      result: null,
      errorMsg: {
        error: "An unexpected error occured, try again later",
        actualError: error,
      },
    };
  }
};

export const loginFunc = async (loginDetails) => {
  try {
    const result = await axios.post(`${apiUrl} + "/auth/login`, loginDetails);
    const data = result.data;

    return data;
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};

export const register = async (registerDetails) => {
  try {
    const result = await axios.post(
      apiUrl + "/auth/register/user",
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
    const result = await axios.post(`${apiUrl}/auth/send-email-otp`, { email });
    const data = result.data;

    return data;
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};

export const verifyOTP = async (details) => {
  try {
    const result = await axios.post(`${apiUrl}/auth/verify-email-otp`, {
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
    const result = await axios.post(`${apiUrl}/auth/forgotPassword`, details);
    const data = result.data;

    return data;
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};

export const postRequest = async ({ url, data, token }) => {
  try {
    const headers = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const result = await axios.post(`${apiUrl}${url}`, data, {
      headers: headers,
    });

    const response = result.data;

    return response;
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};

export const getUserDetails = async () => {
  try {
    const result = await axios.get(`${apiUrl}/auth/profile`);

    const data = result.data;

    return data;
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};

export const requests = async ({ url, method, data, token = null }) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config = {
    url: `${apiUrl}${url}`,
    method,
    headers,
  };

  if (data) {
    config.data = data;
  }

  console.log(config.url);

  return axios(config)
    .then((response) => {
      return { result: response.data, responseStatus: true };
    })
    .catch((error) => {
      console.log(error);
      if (error) {
        //Request made and server responded
        return { responseStatus: false, errorMsg: error };
      } else if (error.request) {
        //Request made but no server response
        return {
          responseStatus: false,
          errorMsg: { error: "Server error, try again later" },
        };
      } else {
        return {
          responseStatus: false,
          errorMsg: { error: "Server error, try again later" },
        };
      }
    });
};
