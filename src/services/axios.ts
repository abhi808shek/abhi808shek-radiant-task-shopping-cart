import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

interface ErrorResponseData {
  Message: string;
  error: string;
}

const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    // baseURL: "https://reqres.in/api",
  });

  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = true;
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      if (response.data.Status !== 200 || !response.data.Success) {
        if (response.data.Status === 401) {
          return response.data.Success;
        }
        throw Error(response.data.Message);
      }
      return response;
    },
    (error: AxiosError<ErrorResponseData>) => {
      if (error.response) {
        if (error.response.status === 401) {
          return Promise.reject(error);
        }
        if (error.response.status === 404) {
          error.message = error.response.data.Message;
        }
        if (error.response?.data && error.response?.data.error) {
          error.message = error.response?.data?.error;
        }
      } else if (error.request) {
        console.error("Request error:", error.request);
      } else {
        console.error("Error:", error.message);
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

const AXIOS = createAxiosInstance();

export default AXIOS;
