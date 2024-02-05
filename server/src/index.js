const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { ServerConfig } = require("./config");
const path = require("path");
const apiRoutes = require("./routes");
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
const corsOptions = {
  origin: "https://bookmark-club.onrender.com", // Allow requests only from this origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'ALLOW-FROM https://bookmark-club.onrender.com/');
  next();
});

app.use("/api", apiRoutes);

mongoose
  .connect(ServerConfig.MONGO_URI)
  .then(() => {
    app.listen(ServerConfig.PORT, () => {
      console.log('pathname=',__dirname)
      console.log(`Server running on port ${ServerConfig.PORT}`);
    });
  })
  .catch((error) => console.log(error));
