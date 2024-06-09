import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import axios from "axios";
import Account from "./Pages/Account";
import PlacesPage from "./Pages/PlacesPage";
import PlacesFormPage from "./Pages/PlacesFormPage";
import Home from "./Pages/Home";
import Placepage from "./Pages/Placepage";
import PlacePage from "./Pages/Placepage";
import BookingPage from "./Pages/BookingPage";
import BookingsPage from "./Pages/BookingsPage";
axios.defaults.baseURL = "https://booking2-phi.vercel.app/api";
axios.defaults.withCredentials = true;
function App() {
  return (
    <div className="h-screen w-screen m-0 p-0">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
          <Route path="/places/:id" element={<Placepage />} />
          <Route path="/place/:id" element={<PlacePage />} />
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route path="/account/bookings/:id" element={<BookingPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
