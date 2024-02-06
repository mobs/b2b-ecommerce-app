import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/users.model.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (userId) => {  
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};

export const registerUser = asyncHandler(async (req, res) => {
  // take data from frontend(user) from body
  // check using email or id for user to be present
  // if present return saying user exisits
  // if not present add a new user to the database
  // return to user, user created or login()

  /* More detailed algorithm(appraoch) for registration */
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

  try {
    // condition to check if any of them are empty
    if (
      [fullname, email, username, password].some(
        (field) => field?.trim() === ""
      )
    ) {
      throw new ApiError(400, "All fields are required");
    }

    // check if user already exists
    const existedUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existedUser) {
      throw new ApiError(409, "User with email or username already exist");
    }

    // req.files is given by multer to check if files are available, we can access it as we have already setup the multer middleware in our post request for register
    const avatarLocalPath = req.files?.avatar[0]?.path;

    if (!avatarLocalPath) {
      throw new ApiError(400, "Avatar file does not exists");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar) {
      throw new ApiError(400, "Avatar file does not exists");
    }

    const user = await User.create({
      fullname,
      avatar: avatar.url,
      email,
      password,
      username: username.toLowerCase(),
    });

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    if (!createdUser) {
      throw new ApiError(500, "Something went wrong while registring user");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(201)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            user: createdUser,
            accessToken,
            refreshToken,
          },
          "User registered Successfully"
        )
      );
  } catch (error) {
    return res.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message,
    });
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  // Algorithm for logging in user

  // get data from body
  // find the user using email or username
  // validate the password
  // generate access and refresh tokens
  // send them in cookies

  const { email, username, password } = req.body;

  try {
    if (!(username || email)) {
      throw new ApiError(400, "username or email is required");
    }

    const user = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (!user) {
      throw new ApiError(404, "User does not exists");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid User Credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );

    // since the "user" we have does not refresh token as we have generated the tokens afterwards, so now either we have to update the user or we can again find the user using User and DB call
    // we have to keep in mind about the heaviness like if finding user is going to take a lot of time, then we update and use else we can find
    const loggedUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    // now, sending data in cookies(which can be modified at frontend also), so to make this cookies only updated by server we have to pass options like below -
    // this will allow the frontend to read the cookies but not modify it
    const options = {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 7*24*60*60*1000
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            user: loggedUser,
            accessToken,
            refreshToken,
          },
          "User Logged In Successfully"
        )
      );
  } catch (error) {
    return res.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message,
    });
  }
});

export const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", "", options)
    .clearCookie("refreshToken", "", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

export const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body;

  

  try {
    if (JSON.stringify(incomingRefreshToken) === '{}') {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const { accessToken, refreshToken } =
      await generateAccessAndRefreshTokens(user._id);
    
    const options = {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 7*24*60*60*1000
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            user,
            accessToken,
            refreshToken,
          },
          "User Logged In Successfully"
        )
      );

  } catch (error) {
    return res
      .status(error.statusCode)
      .json({
        status: error.statusCode,
        message: error.message,
      });
  }
});

export const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user?._id);
    const isPasswordValid = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordValid) {
      throw new ApiError(400, "Invalid Old Password");
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Password changed successfully"));
  } catch (error) {
    return res.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message,
    });
  }
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current user fetched successfully"));
});

// if we want to update any file give a seperate controller for it
export const updateUserDetails = asyncHandler(async (req, res) => {
  const { fullname, email } = req.body;

  try {
    if (!fullname || !email) {
      throw new ApiError(400, "All fields are required");
    }

    const user = await User.findByIdAndUpdate(
      req.user?._id,
      {
        $set: {
          fullname,
          email,
        },
      },
      { new: true }
    ).select("-password");

    res
      .status(200)
      .json(new ApiResponse(200, user, "Account details updated successfully"));
  } catch (error) {
    return res.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message,
    });
  }
});

export const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;

  try {
    if (!avatarLocalPath) {
      throw new ApiError(400, "Avatar file is missing");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar.url) {
      throw new ApiError(400, "Error while uploading on cloudinary");
    }
    const oldAvatarUrl = req.user.avatar;

    const user = await User.findByIdAndUpdate(
      req.user?._id,
      {
        $set: {
          avatar: avatar.url,
        },
      },
      { new: true }
    ).select("-password");
    await deleteFromCloudinary(oldAvatarUrl);

    res
      .status(200)
      .json(new ApiResponse(200, user, "Avatar updated successfully"));
  } catch (error) {
    return res.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message,
    });
  }
});
