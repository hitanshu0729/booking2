import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import PlacesFormPage from "./PlacesFormPage";
import AccountNav from "../AccountNav";
import axios from "axios";
import Item from "../../Item";
const PlacesPage = () => {
  const [place, setPlace] = useState(null);
  useEffect(() => {
    axios.get(`/userplaces`).then((response) => {
      //   console.log(response.data);
      setPlace(response.data);
    });
  }, []);

  if (!place) return "";
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <AccountNav />
      <div className="text-center">
        <Link
          to={"/account/places/new"}
          className="bg-primary text-white py-2 px-4 rounded-full inline-flex items-center gap-1"
        >
          <FaPlus />
          Add new Places
        </Link>
      </div>

      {place &&
        place.map((place) => {
          return (
            <div
              key={place._id}
              className="flex placeMain bg-gray-200 p-4 rounded-2xl gap-4 mt-4 w-[500px] max-w-[90vw] box-border"
            >
              <div className="placeImage  bg-gray-100 gap-4 flex items-center shrink-0 grow-0 h-auto">
                {place.photos.length > 0 && (
                  <img
                    src={`${place.photos[0]}`}
                    className="w-full h-auto object-cover bg-top bg-red-300 text-white"
                    alt="image not available"
                  />
                )}
              </div>
              <div className=" flex flex-col  grow-0 shrink text-center">
                <h2 className="placep w-[300px] max-w-[300px] break-words text-2xl mb-4 border border-b-slate-400 font-semibold">
                  {place.title}
                </h2>
                <p className="placep max-w-[300px] break-words">
                  {place.description}
                </p>
                <div className="flex flex-grow justify-end items-end h-full ">
                  <Link
                    to={"/account/places/" + place._id}
                    className=" bg-primary text-white p-1 rounded-lg"
                  >
                    Go to place
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default PlacesPage;
