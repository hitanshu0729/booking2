import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BiSolidFoodMenu } from "react-icons/bi";
import { RiBuilding2Fill } from "react-icons/ri";
import { FiUser } from "react-icons/fi";
const AccountNav = () => {
    const {pathname} = useLocation();
    let subpage=pathname.split('/')?.[2];
    if(!subpage){
        subpage='profile';
    }
  function linkClasses(type=null) {
    
    let classes = "py-2  acc rounded-full inline-flex items-center gap-1 ";
    if (type == subpage) classes += "bg-primary text-white";
    else classes += "bg-gray-200";
    return classes;
  }
  return (
    <nav className="w-full flex gap-2 justify-center mb-6 text-[1 rem] account">
      <Link to={"/account"} className={linkClasses("profile")}>
        <FiUser />
        My profile
      </Link>
      <Link to={"/account/bookings"} className={linkClasses("bookings")}>
        <BiSolidFoodMenu />
        My bookings
      </Link>
      <Link to={"/account/places"} className={linkClasses("places")}>
        <RiBuilding2Fill />
        My Accomodations
      </Link>
    </nav>
  );
};

export default AccountNav;
