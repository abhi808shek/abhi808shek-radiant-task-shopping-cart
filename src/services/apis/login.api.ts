import axios from "axios";

type CREDENTIAL_TYPE = {
  email: string;
  password: string;
};

// Login Api
export const login = async (credential: CREDENTIAL_TYPE) => {
  const endPoint = "https://reqres.in/api/login";
  return axios.post(endPoint, credential);
};
