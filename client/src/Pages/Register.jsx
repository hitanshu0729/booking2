import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function registerUser(ev) {
    ev.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      alert("Registration successful. Now you can log in");
    } catch (e) {
      console.log(e);
      alert("Registration failed. Please try again later");
    }
  }
  return (
    <div className="h-full w-full  mt-4 flex  flex-col  items-center justify-around">
      <form className="relative bottom-20 m-auto" onSubmit={registerUser}>
        <div className="text-4xl text-center  mb-3">Register</div>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
        />
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button className="w-full bg-red-500 text-white p-1 rounded-2xl">
          Go
        </button>
        <div className="text-center mt-3 text-gray-600">
          Already have an account ?{" "}
          <Link to="/login" className="text-black underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};
export default Register;
