import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { signIn, signUp } from "../../reducer/apiSlice";

const initialState = {
  fullname: "",
  username: "",
  email: "",
  password: "",
  avatar: null
};

const SignIn = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, error } = useSelector(state => state.user)

  useEffect(() => {
    user && navigate("/")
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignup) {
      const formData = new FormData();
      formData.append('username', form.username)
      formData.append('fullname', form.fullname)
      formData.append('email', form.email)
      formData.append('password', form.password)
      formData.append('avatar', form.avatar)

      dispatch(signUp(formData))
      
      clear();
    } else {
      dispatch(signIn(form, navigate))

      clear();
    }
  };


  const clear = () => {
    setForm({ username: "", fullname: "", email: "", password:"", avatar: null });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if(name === 'avatar') {
      setForm({ ...form, [name]: files[0]})
    } else {
      setForm({ ...form, [name]: value})
    }
  }


  return (
    <section className="p-4 text-tertiary ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-4">
        <div className="w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0 shadow-[0_2px_15px_-3px_rgba(23,125,232,0.2),0_10px_20px_-2px_rgba(23,125,232,0.2)]">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className='text-center text-5xl font-bold'>
              {isSignup ? "Sign Up" : "Sign In"}
            </h1>
            { user && <p className="text-center text-red-500"> User already signed in</p>}
            <form
              className="space-y-8 md:w-96 w-auto "
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              {isSignup && (
                <div>
                  <label
                    htmlFor="fullname"
                    className="block mb-2 text-sm font-medium"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="fullname"
                    id="fullname"
                    value={form.fullname}
                    onChange={handleChange}
                    className="shadow-sm text-sm rounded-lg block p-2 w-full text-secondary"
                    placeholder="FirstName LastName"
                    required
                  />

                <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium mt-8"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={form.username}
                    onChange={handleChange}
                    className="shadow-sm text-sm rounded-lg block p-2 w-full text-secondary"
                    placeholder="Username"
                    required
                  />
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium "
                >
                  Email
                </label>
                <input
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                    id="email"
                    name="email"
                    className="shadow-sm text-sm rounded-lg block p-2 w-full text-secondary"
                    placeholder="name@example.com"
                    required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium "
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="shadow-sm text-sm rounded-lg block p-2 w-full text-secondary"
                  required
                />
                { error && !isSignup && <p className="text-red-500"> {error.message} </p>}
              </div>
                { isSignup && 
              <div>
                <label
                  htmlFor="avatar"
                  className="block mb-2 text-sm font-medium "
                >
                  Avatar
                </label>
                <input
                  type="file"
                  name="avatar"
                  accept=".png, .jpg, .jpeg"
                  onChange={handleChange} 
                  className="shadow-sm text-sm rounded-lg block p-2 w-full text-secondary"
                  required
                />
              </div>
}

              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border rounded focus:ring-3 focus:ring-primary-300 text-secondary"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className=" "
                    >
                      Remember me
                    </label>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 px-5 text-sm font-bold text-center rounded-lg hover:bg-primary hover:text-secondary bg-secondary text-tertiary"              
              >
                {isSignup ? "SIGN UP" : "SIGN IN"}
              </button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                <button onClick={() => setIsSignup(!isSignup)} className="font-medium hover:underline">
                  {isSignup
                    ? "Already have an account? Sign in"
                    : "Don't have an account? Sign up"}
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
