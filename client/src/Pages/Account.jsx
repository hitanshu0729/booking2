import React from "react";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";

import AccountNav from "../AccountNav";
const Account = () => {
  const { ready, user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = React.useState(null);
  let { subpage } = useParams();
  if (!subpage) subpage = "profile";
  async function logout() {
    console.log("d");
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }
  if (ready && !user && !redirect) return <Navigate to="/login" />;
  if (redirect) <Navigate to={redirect} />;
  return (
    <div className="w-full">
    <AccountNav/>
      {subpage == "profile" && user && (
        <div className=" max-w-lg mx-auto text-center">
          Logged in as {user.name} ({user.email})<br />
          <button
            className="bg-primary w-30vw min-w-[100px] p-1 rounded-lg mt-2 text-white w-30%"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && user && <PlacesPage />}
    </div>
  );
};

export default Account;
