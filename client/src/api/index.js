import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/" });

// Products related calls
export const getProducts = async () => {
  try {
    const { data } = await API.get("/product/getProducts");

    return data;
  } catch (error) {
    console.log("Error in api :: getProducts: ", error.message);
    throw error;
  }
};

export const addProduct = async (newProduct) => {
  try {
    const { data } = await API.post("/product/addProduct", newProduct);
    return data;
  } catch (error) {
    console.log("Error in api :: addProduct: ", error.message);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const { data } = await API.delete(`/product/deleteProduct/${id}`);
    return data;
  } catch (error) {
    console.log("Error in api :: deleteProduct: ", error.message);
  }
};

// User related calls
export const signIn = async (formData) => {
  try {
    const { data } = await API.post("/user/signin", formData);
    return data;
  } catch (error) {
    console.log("Error in api :: signIn: ", error.message);
  }
};

export const signUp = async (formData) => {
  try {
    const { data } = await API.post("/user/signup", formData);
    return data;
  } catch (error) {
    console.log("Error in api :: signUp: ", error.message);
  }
};
