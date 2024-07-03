import React, { useState } from 'react'
import { setLogin } from "../redux/state";
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from "axios"

function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log({ email, password });
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    }
    try {
      const response = await axios.post("http://localhost:3000/auth/login", data, {
        headers: {
          "content-type": "application/json"
        }
      });
      const logedIn = response.data;
      console.log(logedIn.token)
      if (logedIn) {
        dispatch(
          setLogin({
            user: logedIn.userExist,
            token: logedIn.token
          })
        )
        navigate("/")
      }
    }
    catch (err) {
      console.log("Login failed", err.message)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-cover bg-center" style={{ backgroundImage: "url('../../assets/login.jpg')" }}>
      <div className="flex flex-col gap-4 w-2/5 p-10 bg-black bg-opacity-80 rounded-xl sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/3">
        <form className="flex flex-col items-center gap-4" onSubmit={handleSubmit}>
          <input type="email" placeholder="email" required className="w-full px-4 py-2 bg-transparent border-b border-white outline-none text-center text-white placeholder-white" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="password" required className="w-full px-4 py-2 bg-transparent border-b border-white outline-none text-center text-white placeholder-white" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="w-1/2 px-4 py-2 bg-pink-500 border-none font-semibold cursor-pointer transition duration-300 ease-in-out text-white rounded-md hover:shadow-lg">LOG IN</button>
        </form>
        <a href="/register" className="text-white text-lg font-semibold text-center hover:underline">Don't have an account? <span className="underline">Sign In</span></a>
      </div>
    </div>

  )
}

export default LoginPage