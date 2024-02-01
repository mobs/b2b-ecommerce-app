import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import Main from "./Main"

const Profile = () => {
  const [selectedCategory, setSelectedCategory] = useState("Personal Information")

  const { user, error } = useSelector((state) => state.user);
  const [form, setForm] = useState({
    fullname: user?.fullname,
    username: user?.username,
    email: user?.email,
  });
  const [password, setPassword] = useState({
    oldPassword: "", newPassword: ""
  })

  const [avatar, setAvatar] = useState({
    avatar: null
  })

  const [personalEdit, setPersonalEdit] = useState(false);
  const [passwordChange, setPasswordChange] = useState(false);
  const [avatarChange, setAvatarchange] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("enabled");
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "avatar") {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };
  return (
    <div className="flex gap-4">
      <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <div className="h-16 w-8 border-5 border-white"></div>
      <Main selectedCategory={selectedCategory} />
    </div>
  );
};

export default Profile;
