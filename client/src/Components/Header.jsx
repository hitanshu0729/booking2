import React, { useContext } from "react";
import "../App.css";
import { PiPaperPlaneFill } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";
const Header = () => {
  const { user } = useContext(UserContext);
  return (
    <header className="py-[1rem] flex items-center justify-evenly w-[100%] box-border">
      <div className="cursor-pointer flex items-center bnb p-1">
        <div className="bg-red-500 text-white text-[1.3rem] m-1">
          <PiPaperPlaneFill />
        </div>
        <Link to={'/'} className="bold">Flyfy</Link>
      </div>

      <div className="flex items-center search border-[2px] border-grey-400 rounded-full gap-2 shadow-md shadow-grey-500 p-1 box-border text-center">
        <div className="header-item   p-2 h-full">Anywhere</div>
        <div className="header-item border-r-[2px] border-l-[2px] border-r-grey-400 p-2 text-center">
          Any week
        </div>
        <div className="header-item flex items-center p-1 gap-1 search2">
          <div>AddGuests</div>
          <div className="bg-primary text-white  rounded-full p-2">
            <CiSearch />
          </div>
        </div>
      </div>
      <div className=" user flex m-1 items-center search border-[2px] border-grey-400 rounded-full gap-2 p-1">
        <div>
          <AiOutlineMenu />
        </div>
        <Link
          to={user ? "/account" : "/login"}
          className="bg-gray-500 text-white border border-gray-500 p-1 rounded-full"
        >
          <FaUser />
        </Link>
        {user && <div>{user.name}</div>}
      </div>
    </header>
  );
};

export default Header;
