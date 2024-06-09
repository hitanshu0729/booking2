const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const multer = require("multer");
const PlaceModel = require("./Models/Place.js");
const Booking = require("./Models/Booking.js");
app.use(express.json());
const fs = require("fs");
const imageDownloader = require("image-downloader");
const mongoose = require("mongoose");
require("dotenv").config();
app.use("/uploads", express.static(__dirname + "/uploads"));
const allowedOrigins = [
  "https://deploy-mern-frontend-three-eight.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
    ], // Allowed headers
  })
);
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bcryptSalt = bcrypt.genSaltSync(10);
const User = require("./Models/User.js");
app.use(cookieParser());

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(
      req.cookies.token,
      process.env.JWT_SECRET,
      {},
      async (err, userData) => {
        if (err) throw err;
        resolve(userData);
      }
    );
  });
}

app.get("/api/", (req, res) => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected");
    })
    .catch((err) => {
      console.log(err);
    });

  res.send("hello world");
});

app.post("/api/register", async (req, res) => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected");
    })
    .catch((err) => {
      console.log(err);
    });

  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
    console.log(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

const Upload = require("./Helpers/Upload.js");

app.post("/api/login", async (req, res) => {
  mongoose.connect(process.env.MONGO_URI);
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        {
          email: userDoc.email,
          id: userDoc._id,
        },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("pass not ok");
    }
  } else {
    res.status(403).json("not found");
  }
});

app.post("/api/places", (req, res) => {
  mongoose.connect(process.env.MONGO_URI);
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhotos,
    description,
    price,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
  } = req.body;
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await PlaceModel.create({
      owner: userData.id,
      price,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    });
    res.json(placeDoc);
  });
});

app.get("/api/profile", (req, res) => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected");
    })
    .catch((err) => {
      console.log(err);
    });

  console.log(req);
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.post("/api/upload-by-link", async (req, res) => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected");
    })
    .catch((err) => {
      console.log(err);
    });

  try {
    const { link } = req.body;
    console.log(req.body);
    const fileurl = await cloudinary.uploader.upload(link);
    console.log(fileurl.secure_url);
    res.json(fileurl.secure_url);
  } catch (e) {
    res.status(422).json({ error: e.message });
  }
});

app.post("/api/logout", (req, res) => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected");
    })
    .catch((err) => {
      console.log(err);
    });

  res.cookie("token", "").json(true);
});

const upload = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 5000000 }, // 500 KB limit
});

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

uploadFile = async (filePath) => {
  console.log(filePath);
  console.log("Hitanshu");
  try {
    const result = await cloudinary.uploader.upload(filePath);
    return result.secure_url;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const uploadFun = async (req, res) => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected");
    })
    .catch((err) => {
      console.log(err);
    });

  console.log(req.files);
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files were uploaded." });
    }

    const uploadPromises = req.files.map((file) => {
      console.log(file.path);
      return uploadFile(file.path);
    });
    const uploadResults = await Promise.all(uploadPromises);

    res.json(uploadResults);
  } catch (e) {
    res.status(422).json({ error: e.message });
  }
};

app.post("/api/upload", upload.array("photos", 100), uploadFun);

app.get("/api/userplaces", (req, res) => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected");
    })
    .catch((err) => {
      console.log(err);
    });

  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
      const { id } = userData;
      const places = await PlaceModel.find({ owner: id });
      res.json(places);
    });
  } else {
    res.json(null);
  }
});

app.get("/api/places/:id", async (req, res) => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected");
    })
    .catch((err) => {
      console.log(err);
    });

  const { id } = req.params;
  res.json(await PlaceModel.findById(id));
});

app.put("/api/places", async (req, res) => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected");
    })
    .catch((err) => {
      console.log(err);
    });

  const { token } = req.cookies;
  console.log(req.body);
  const {
    id,
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
  } = req.body;
  jwt.verify(token, process.env.JWT_SECRET, async (err, userdata) => {
    const placeDoc = await PlaceModel.findById(id);

    if (userdata.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      console.log(placeDoc);
      await placeDoc.save();
      res.json(placeDoc);
    }
  });
});

app.get("/api/places", async (req, res) => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected");
    })
    .catch((err) => {
      console.log(err);
    });

  const data = await PlaceModel.find();
  res.json(data);
});

app.get("/api/bookings", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log(req);
  const userData = await getUserDataFromReq(req);
  res.json(await Booking.find({ user: userData.id }).populate("place"));
});

app.post("/api/bookings", async (req, res) => {
  mongoose.connect(process.env.MONGO_URI);
  const userData = await getUserDataFromReq(req);
  const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
    req.body;
  Booking.create({
    place,
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    phone,
    price,
    user: userData.id,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      throw err;
    });
});

app.listen(4000, () => {
  console.log("server is running on port 4000");
});
