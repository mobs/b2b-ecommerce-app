import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/users.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


export const registerUser = ( async (req, res) => {
// take data from frontend(user) from body
// check using email or id for user to be present
// if present return saying user exisits
// if not present add a new user to the database
// return to user, user created or login()

/* More detailed algorith(appraoch) for registration */
// get user details from frontend
// validation - not empty
// check if user already exists: username, email
// check for images, check for avatar as it is required
// upload all images to cloudinary and get the url, check avatar again
// create user object => entry in db
// remove password and refresh tokem field from response
// check if user is succesfully created
// return the response

    const { username, email, fullname, password } = req.body;
    
    // condition to check if any of them are empty
    if(
        [fullname, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = User.findOne({
        $or: [{ email }, { username }]
    })

    if(existedUser) {
        throw new ApiError(409, "User with email or username already exist")
    }

    // req.files is given by multer to check if files are available, we can access it as we have already setup the multer middleware in our post request for register
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath) {
        throw new ApiError(400, "Avatar file does not exists")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverLocalPath);

    if(!avatar) {
        throw new ApiError(400, "Avatar file does not exists")
    }

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser =  await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(createdUser) {
        throw new ApiError(500, "Something went wrong while registring user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered succesfully")
    )

})