import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL});

export const fetchProducts = createAsyncThunk(
    "fetchProducts",
    async () => {
        const response = await API.get("/api/v1/products/products")

        try {
            return response.data.data;
        } catch (error) {
            return error.message;
        }
    }
)

export const addProduct = createAsyncThunk(
    "addProduct",
    async (newProduct) => {
        try {
            const { data } = await API.post("api/v1/products/add", newProduct, {withCredentials: true});
            return data;
          } catch (error) {
            console.log("Error in api :: addProduct: ", error.message);
            return error;
          }
    }
)

export const deleteProduct = createAsyncThunk(
    "deleteProduct",
    async (id) => {
        try {
            const { data } = await API.delete(`/api/v1/products/delete/${id}`, {withCredentials: true});
            return data;
          } catch (error) {
            console.log("Error in api :: deleteProduct: ", error.message);
            return error.message
          }
    }
)

export const getProductsByCategory = createAsyncThunk(
    "getproductsByCategory",
    async () => {
        try {

            const { data } = await API.get(`/api/v1/products/categoryProduct/${id}`, {withCredentials: true})
            
            return data;
          } catch (error) {
            console.log("Error in api :: getProductsByCategory: ", error.message)
          }
    }
)

export const getCategories = createAsyncThunk(
    "getCategories",
    async () => {
        try {
            
        } catch (error) {
            console.log("Error in apiSlice :: getCategories: ", error.message)
        }
    }
)


// user related calls

export const signIn = createAsyncThunk(
    "signIn",
    async (formData, {rejectWithValue}) => {
        try {
            const { data } = await API.post("/api/v1/users/login", formData, {withCredentials: true});
            return data;
          } catch (error) {
            // console.log("Error in api :: signIn: ", error);
            return rejectWithValue(error.response.data)
          }
    }
)

export const signUp = createAsyncThunk(
    "signUp",
    async (formData, {rejectWithValue}) => {
        try {
            const { data } = await axios.post("/api/v1/users/register", formData)
            
            return data;
        } catch (error) {
            // console.log("Error in apiSlice :: singUp: ", error);
            return rejectWithValue(error.response.data)
        }
    }
)

export const signOut = createAsyncThunk(
    "signOut",
    async (_, {rejectWithValue}) => {

        try {
            const response = await API.post("/api/v1/users/logout", _, {withCredentials: true});
            return response.data;
        } catch (error) {
            console.log("Error in apiSlice :: signOut: ", error.message);
            return rejectWithValue(error.response.data)
        }
    }
)

export const changePassword = createAsyncThunk(
    "changePassword",
    async (formData, {rejectWithValue}) => {
        try {
            const response = await API.post("/api/v1/users/change-password", formData.password , {withCredentials: true});
            return response.data
        } catch (error) {
            console.log("Error in apiSlice :: changePassword ", error.message)
            return rejectWithValue(error.response.data)
        }
    }
)

export const editPersonalInfo = createAsyncThunk(
    "editPersonalInfo",
    async (formData, {rejectWithValue}) => {
        try {
            const response = await API.post("/users/", formData.form, {withCredentials: true});

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const editAvatar = createAsyncThunk(
    "editAvatar",
    async (formData, {rejectWithValue}) => {

        try {
            const response = await API.post("/users/", formData.avatar, _, {withCredentials: true});
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const persistLogin = createAsyncThunk(
    "persistLogin",
    async (_, {rejectWithValue}) => {
        try {
            const response = await API.post("/api/v1/users/refresh-token", _, {withCredentials:true})
            return response.data
        } catch (error) {
            throw rejectWithValue(error.response.data)
        }
    }
)