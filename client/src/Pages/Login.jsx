import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";

const Login = () => {
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const { data } = await axios.post("/login", { email, password });
      alert("Login successful");
      setUser(data);
      setRedirect(true);
    } catch (e) {
      console.log(e);
      alert("Login failed");
    }
  }
  if (redirect) return <Navigate to={"/account"} />;
  return (
    <div className="h-full w-full mt-4 flex  flex-col  items-center justify-around">
      <form
        className="max-w-[94%] relative bottom-20 m-auto"
        onSubmit={handleLoginSubmit}
      >
        <div className="text-4xl text-center  mb-3">Login</div>
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button className="w-full bg-red-500 text-white p-1 rounded-2xl">
          Login
        </button>
        <div className="text-center mt-3 text-gray-600">
          Do not have an account yet?{" "}
          <Link to="/register" className="text-black underline">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
