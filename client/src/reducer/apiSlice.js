import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const API = axios.create({ baseURL: "http://localhost:5000/api/v1/"});

export const fetchProducts = createAsyncThunk(
    "fetchProducts",
    async () => {
        const response = await axios.get("/api/v1/products/products")

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
            const { data } = await axios.post("api/v1/products/add", newProduct);
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
            const { data } = await axios.delete(`/api/v1/products/delete/${id}`);
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

            const { data } = await axios.get(`/api/v1/products/categoryProduct/${id}`)
            
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
            const { data } = await axios.post("/api/v1/users/login", formData);
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
            const response = await axios.post("/api/v1/users/logout");
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
        // const headers = {
        //     'Authorization': `Bearer ${formData.token}`
        // }
        try {
            const response = await axios.post("/api/v1/users/change-password", formData.password , {withCredentials: true});
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
        const headers = {
            'Authorization': `Bearer ${formData.token}`
        }

        try {
            const response = await API.post("/users/", formData.form, {headers});

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const editAvatar = createAsyncThunk(
    "editAvatar",
    async (formData, {rejectWithValue}) => {
        const headers = {
            'Authorization': `Bearer ${formData.token}`
        }

        try {
            const response = await API.post("/users/", formData.avatar, {headers});
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
            const response = await axios.post("/api/v1/users/refresh-token")
            return response.data
        } catch (error) {
            throw rejectWithValue(error.response.data)
        }
    }
)