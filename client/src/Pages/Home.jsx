import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [places, setPlaces] = useState([]);
  let o = 0;
  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces(response.data);
    });
  }, []);
  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 home flex-wrap">
      {places.length > 0 &&
        places.map((place) => (
          <Link to={"places/" + place._id} className="w-full" key={place._id}>
            <div className=" mb-2 rounded-2xl flex h-60 w-full">
              {place.photos?.[0] && (
                <img
                  className='rounded-2xl  object-fit aspect-square homeimg '
                  src={"http://localhost:4000/uploads/" + place.photos?.[0]}
                  alt=""
                />
              )}
            </div>
            <h2 className="font-bold truncate">{place.address}</h2>
            <h3 className="text-sm text-gray-500 truncate">{place.title}</h3>
            <div className="mt-1 truncate">
              <span className="font-bold">₹{place.price}</span> per night
            </div>
          </Link>
        ))}
    </div>
  );
};

export default Home;
