import axios from "axios";

// Prouduct List Api
export const products = async () => {
  const endPoint = "https://api.escuelajs.co/api/v1/products";
  return axios.get(endPoint);
};

// Prouduct Detail By Id Api
export const productbyId = async (id: number) => {
  const endPoint = `https://api.escuelajs.co/api/v1/products/${id}`;
  return axios.get(endPoint);
};
