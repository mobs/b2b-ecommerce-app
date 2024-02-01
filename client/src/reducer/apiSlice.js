import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/v1/"});

export const fetchProducts = createAsyncThunk(
    "fetchProducts",
    async () => {
        const response = await API.get("/products/products")

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
            const { data } = await API.post("/products/add", newProduct);
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
            const { data } = await API.delete(`/products/delete/${id}`);
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

            const { data } = await API.get(`/products/categoryProduct/${id}`)
            
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
            const { data } = await API.post("/users/login", formData);
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
            const { data } = await API.post("/users/register", formData)
            
            return data;
        } catch (error) {
            // console.log("Error in apiSlice :: singUp: ", error);
            return rejectWithValue(error.response.data)
        }
    }
)

export const signOut = createAsyncThunk(
    "signOut",
    async (token, {rejectWithValue}) => {
        const headers = {
            'Authorization': `Bearer ${token}`
        }

        try {
            const response = await API.get("/users/logout", {headers});
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
        const headers = {
            'Authorization': `Bearer ${formData.token}`
        }
        try {
            const response = await API.post("/users/change-password", formData.password , {headers});
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
    async ( {rejectWithValue}) => {
        console.log("in apislice")
        const headers = {
            token: localStorage.getItem("tokens")
        }
        try {
            const response = await API.post("/users/refresh-token", {headers} )

            return response.data;
        } catch (error) {
            console.log("in error apislice")
            return rejectWithValue(error.response.data)
        }
    }
)