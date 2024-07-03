import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });

  const navigate = useNavigate();
  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    setPasswordMatch(
      formData.password === formData.confirmPassword ||
        formData.confirmPassword === ""
    );
  }, [formData.password, formData.confirmPassword]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "profileImage" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    try {
      const register_form = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        register_form.append(key, value);
      });

      const response = await axios.post(
        "http://localhost:3000/auth/register",
        register_form
      );
      if (response.status === 200) {
        console.log("file updated sucessfully");
        navigate("/login");
      }
    } catch (err) {
      console.log("Registration failed", err.message);
    }
  };
  return (
    <div
      className="register bg-cover bg-center"
    >
      <div className="register_content flex justify-center items-center flex-col">
        <form
          className="register_content_form mt-5 w-3/5 md:w-4/5 lg:w-3/5 flex flex-col items-center gap-6 p-10 bg-black bg-opacity-80 rounded-lg"
          onSubmit={handleSubmit}
        >
          <input
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-transparent border-b border-white outline-none text-white placeholder-white"
          />
          <input
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-transparent border-b border-white outline-none text-white placeholder-white"
          />
          <input
            placeholder="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-transparent border-b border-white outline-none text-white placeholder-white"
          />
          <input
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            required
            className="w-full px-4 py-2 bg-transparent border-b border-white outline-none text-white placeholder-white"
          />
          <input
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            type="password"
            required
            className="w-full px-4 py-2 bg-transparent border-b border-white outline-none text-white placeholder-white"
          />

          {!passwordMatch && (
            <p style={{ color: "red" }}>Passwords are not matched!</p>
          )}

          <input
            id="image"
            type="file"
            name="profileImage"
            accept="image/*"
            className="hidden"
            onChange={handleChange}
            required
          />
          <label
            htmlFor="image"
            className="flex flex-col items-center gap-3 cursor-pointer text-white text-sm"
          >
            <img
              src="../ifgb/addImage.png"
              alt="add profile photo"
              className="w-6"
            />
            <p>Upload Your Photo</p>
          </label>

          {formData.profileImage && (
            <img
              src={URL.createObjectURL(formData.profileImage)}
              alt="profile photo"
              className="max-w-20"
            />
          )}
          <button
            type="submit"
            disabled={!passwordMatch}
            className="w-1/2 px-4 py-2 bg-pinkred border-none font-semibold cursor-pointer transition duration-300 ease-in-out text-white rounded-md disabled:opacity-50"
          >
            REGISTER
          </button>
          <a href="/login" className="text-white text-xs mt-4">
            Already have an account?{" "}
            <span className="underline">Log In Here</span>
          </a>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
