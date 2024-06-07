import React, { useEffect, useState } from "react";
import PhotosUploader from "../Components/PhotosUploader";
import Perks from "../Components/Perk";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import AccountNav from "../AccountNav";

const PlacesFormPage = () => {
  const { id } = useParams(); // Destructure id from useParams
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [perks, setPerks] = useState([]);
  const [redirect, setRedirect] = useState(false);

  async function addNewPlace(ev) {
    ev.preventDefault();
    const pdata = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    if (id) {
      const {data}=await axios.put("/places", {
        id,
        ...pdata,
      });
      console.log(data);
    } else {
      const { data } = await axios.post("/places", pdata);
    }
    setRedirect(true);
  }

  useEffect(() => {
    if (!id) return;

    async function fetchPlace() {
      try {
        const { data } = await axios.get(`/places/${id}`);
        console.log(data);
        setTitle(data.title || "");
        setAddress(data.address || "");
        setDescription(data.description || "");
        setExtraInfo(data.extraInfo || "");
        setCheckIn(data.checkIn || "");
        setCheckOut(data.checkOut || "");
        setMaxGuests(data.maxGuests || 1);
        setPrice(data.price || "");
        setAddedPhotos(data.photos || []);
        setPerks(data.perks || []);
        console.log(data.addedPhotos);
      } catch (error) {
        console.error("Error fetching place data:", error);
      }
    }

    fetchPlace();
  }, [id]);

  if (redirect) {
    return <Navigate to="/account/places" />;
  }

  return (
    <>
      <AccountNav />
      <form
        className="flex flex-col justify-center items-center w-full text-center"
        onSubmit={addNewPlace}
      >
        <div className="form-div">
          <label className="block mt-2">
            Title
            <span className="text-gray-600 block text-sm">
              Title for your place. Should be short and catchy as in
              advertisement.
            </span>
            <input
              type="text"
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
              placeholder="Title, for example: My lovely apt"
              className="block w-full mt-1 p-2 border rounded"
            />
          </label>
        </div>
        <div className="form-div">
          <label className="block mt-2">
            Address
            <span className="text-gray-600 block text-sm">
              Address to this place.
            </span>
            <input
              type="text"
              value={address}
              onChange={(ev) => setAddress(ev.target.value)}
              placeholder="Address"
              className="block w-full mt-1 p-2 border rounded"
            />
          </label>
        </div>
        <div className="form-div">
          <label className="block mt-2">
            Photos
            <span className="text-gray-600 block text-sm">More = better.</span>
            <PhotosUploader
              addedPhotos={addedPhotos}
              setAddedPhotos={setAddedPhotos}
            />
          </label>
        </div>
        <div className="form-div w-full">
          <label className="block mt-2 w-full">
            Description
            <span className="text-gray-600 block text-sm">
              Description of the place.
            </span>
            <textarea
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
              placeholder="Description"
              className="block w-full mt-1 p-2 border rounded"
            />
          </label>
        </div>
        <div className="form-div">
          <label className="block mt-2">
            Perks
            <span className="text-gray-600 block text-sm">
              Select all the perks of your place.
            </span>
            <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
              <Perks selected={perks} onChange={setPerks} />
            </div>
          </label>
        </div>
        <div className="form-div">
          <label className="block mt-2">
            Extra Info
            <span className="text-gray-600 block text-sm">
              House rules, etc.
            </span>
            <textarea
              value={extraInfo}
              onChange={(ev) => setExtraInfo(ev.target.value)}
              placeholder="Extra Info"
              className="block w-full mt-1 p-2 border rounded"
            />
          </label>
        </div>
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4 form-div">
          <div className="form-div2">
            <label className="block mt-2">
              Check-in Time
              <input
                type="text"
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
                placeholder="14:00"
                className="block w-full mt-1 p-2 border rounded"
              />
            </label>
          </div>
          <div className="form-div2">
            <label className="block mt-2">
              Check-out Time
              <input
                type="text"
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
                placeholder="11:00"
                className="block w-full mt-1 p-2 border rounded"
              />
            </label>
          </div>
          <div className="form-div2">
            <label className="block mt-2">
              Max Number of Guests
              <input
                type="number"
                value={maxGuests}
                onChange={(ev) => setMaxGuests(ev.target.value)}
                className="block w-full mt-1 p-2 border rounded"
              />
            </label>
          </div>
          <div className="form-div2">
            <label className="block mt-2">
              Price per Night
              <input
                type="number"
                value={price}
                onChange={(ev) => setPrice(ev.target.value)}
                className="block w-full mt-1 p-2 border rounded"
              />
            </label>
          </div>
        </div>
        <button className="bg-primary text-white py-2 px-4 rounded my-4 form-div">
          Save
        </button>
      </form>
    </>
  );
};

export default PlacesFormPage;
