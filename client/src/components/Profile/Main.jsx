import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, editAvatar, editPersonalInfo } from "../../reducer/apiSlice";

const Main = ({ selectedCategory }) => {
  const { user, accessToken, error } = useSelector((state) => state.user);
  const dispatch = useDispatch()

  const [form, setForm] = useState({
    fullname: user?.fullname,
    username: user?.username,
    email: user?.email,
  });
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [avatar, setAvatar] = useState({
    avatar: null,
  });

  const [personalEdit, setPersonalEdit] = useState(false);
  const [passwordChange, setPasswordChange] = useState(false);
  const [avatarChange, setAvatarchange] = useState(false);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    dispatch(changePassword({password, token: accessToken}))
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();

    dispatch(editPersonalInfo({form, token: accessToken}))
  };

  const handleAvatarSubmit = (e) => {
    e.preventDefault();

    dispatch(editAvatar({avatar, token: accessToken }))
  }
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "avatar") {
      setAvatar({ [name]: files[0] });
    } else if (name === "oldPassword" || name === "newPassword") {
      setPassword((prevData) => ({...prevData, [name]: value}));
    } else {
      setForm((prevData) => ({ ...prevData, [name]: value}));
    }
  };
  return (
    <div className="text-tertiary">
      {selectedCategory === "Personal Information" ? (
        <div className="p-4 w-full shadow-[0_2px_15px_-3px_rgba(23,125,232,0.2),0_10px_20px_-2px_rgba(23,125,232,0.2)]">
          <span className="text-3xl font-bold"> Personal Information </span>
          <button
            className="ml-4 text-primary"
            onClick={() => setPersonalEdit((prev) => !prev)}
          >
            {" "}
            Edit{" "}
          </button>

          <form
            className="space-y-8 md:w-96 w-auto mt-8"
            onSubmit={handleFormSubmit}
            encType="multipart/form-data"
          >
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
                disabled={!personalEdit}
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
                disabled={!personalEdit}
              />
            </div>

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
                disabled={!personalEdit}
              />
            </div>
            {personalEdit && (
              <button
                type="submit"
                disabled={!personalEdit}
                className="w-full py-3 px-5 text-sm font-bold text-center rounded-lg hover:bg-primary hover:text-secondary bg-secondary text-tertiary"
              >
                Save Changes
              </button>
            )}
          </form>
        </div>
      ) : selectedCategory === "Password" ? (
        <div className="p-4 w-full shadow-[0_2px_15px_-3px_rgba(23,125,232,0.2),0_10px_20px_-2px_rgba(23,125,232,0.2)]">
          <span className="mt-16 text-3xl font-bold"> Change Password </span>
          <button
            className="ml-4 text-primary"
            onClick={() => setPasswordChange((prev) => !prev)}
          >
            {" "}
            Edit{" "}
          </button>
          <form
            className="space-y-8 md:w-96 w-auto mt-8"
            onSubmit={handlePasswordSubmit}
          >
            <div>
              <label
                htmlFor="oldPassword"
                className="block mb-2 text-sm font-medium "
              >
                Old Password
              </label>
              <input
                value={password.oldPassword}
                onChange={handleChange}
                type="password"
                id="oldPassword"
                name="oldPassword"
                className="shadow-sm text-sm rounded-lg block p-2 w-full text-secondary"
                placeholder="*******"
                required
                disabled={!passwordChange}
              />
            </div>
            <div>
              <label
                htmlFor="newPassword"
                className="block mb-2 text-sm font-medium "
              >
                New Password
              </label>
              <input
                value={password.newPassword}
                onChange={handleChange}
                type="password"
                id="newPassword"
                name="newPassword"
                className="shadow-sm text-sm rounded-lg block p-2 w-full text-secondary"
                placeholder="*******"
                required
                disabled={!passwordChange}
              />
            </div>
            {passwordChange && (
              <button
                type="submit"
                className="w-full py-3 px-5 text-sm font-bold text-center rounded-lg hover:bg-primary hover:text-secondary bg-secondary text-tertiary"
              >
                Save Changes
              </button>
            )}
          </form>
        </div>
      ) : (
        <div className="p-4 w-full shadow-[0_2px_15px_-3px_rgba(23,125,232,0.2),0_10px_20px_-2px_rgba(23,125,232,0.2)]">
          <span className="text-3xl font-bold"> Change Avatar Image </span>
          <button
            className="ml-4 text-primary"
            onClick={() => setAvatarchange((prev) => !prev)}
          >
            {" "}
            Edit{" "}
          </button>
          <form
            className="space-y-8 md:w-96 w-auto mt-8"
            onSubmit={handleAvatarSubmit}
          > 
          <div>
            <label
              htmlFor="avatar"
              className="block mb-2 text-sm font-medium mt-8"
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
              disabled={!avatarChange}
            />

            {avatarChange && (
              <button
                type="submit"
                disabled={!personalEdit}
                className="w-full py-3 px-5 text-sm font-bold text-center rounded-lg hover:bg-primary hover:text-secondary bg-secondary text-tertiary"
              >
                Save Changes
              </button>
            )}
            
          </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Main;
