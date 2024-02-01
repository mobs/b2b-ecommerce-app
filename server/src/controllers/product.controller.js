import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../models/products.model.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";

export const getProducts = asyncHandler(async (req, res) => {
  // no auth required
  // as its a b2b, so we need not any authetication
  try {
    const products = await Product.find();

    if (!products) {
      throw ApiError(404, "Products not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, products, "Products fetched successfully"));
  } catch (error) {
    throw res.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message,
    });
  }
});

export const addProduct = asyncHandler(async (req, res) => {
  const { name, description, category, subCategory, offer } = req.body;
  try {
    const user = req?.user;

    if (!user?.isAuthorized) {
      throw new ApiError(400, "User not authorized to add product");
    }

    if (!name || !category || !subCategory) {
      throw new ApiError(400, "Product name and categories are required");
    }

    const imageLocalPath = req.file?.path;

    if (!imageLocalPath) {
      throw new ApiError(400, "Product image is required");
    }

    const image = await uploadOnCloudinary(imageLocalPath);

    if (!image) {
      throw new ApiError(400, "Product image does not exists");
    }

    const product = await Product.create({
      name,
      image: image.url,
      category,
      subCategory,
      description: description || "",
      offer: offer || "",
    });

    if (!product) {
      throw new ApiError(500, "Something went wrong while creating product");
    }

    return res
      .status(201)
      .json(new ApiResponse(201, product, "Product added successfully"));
  } catch (error) {
    throw res.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message,
    });
  }
});

export const deleteProduct = asyncHandler(async (req, res) => {
  // can we do something like we put a middleware and from there get the id for the product to be deleted
  // as one can only delete a product if logged in and we are stroing the list of products in the user also
  // the issue here will be let say we inject a middleware which verifies the if user is logged in or not and then getting the id
  // so we will get the id's of all the product, how come we know which is the particular product we need to delete
  // Algorithm
  // get the id of the product from Frontend(user)
  // check if the user is authorized to delete the product
  // go ahead delete the product, the product id from user products list(if maintaining), image of product from cloudinary

  const { id } = req.params;
  try {
    const user = req?.user;

    if (!id) {
      throw new ApiError(400, "Id is required to delete product");
    }

    if (!user?.isAuthorized) {
      throw new ApiError(404, "User is not authorized to delete product");
    }

    const product = await Product.findByIdAndDelete(id);

    const imageDeletedFromCloudinary = await deleteFromCloudinary(
      product?.image
    );

    if (!imageDeletedFromCloudinary) {
      throw new ApiError(500, "Image not deleted from Cloudinary");
    }

    res
      .status(200)
      .json(new ApiResponse(200, product, "Product deleted successfully"));
  } catch (error) {
    throw res.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message,
    });
  }
});

export const getProductsByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;

  if (!category) {
    throw new ApiError(400, "Category is required");
  }

  const products = await Product.find({ category });

  if (!products) {
    throw new ApiError(404, "Products with the category not found");
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        products,
        "Products with category fetched successfully"
      )
    );
});

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Product.distinct("category");

  if (!categories) {
    throw new ApiError(500, "Error while fetching categories from DB");
  }

  res
    .status(200)
    .json(new ApiResponse(200, categories, "Categories fetched successfully"));
});
