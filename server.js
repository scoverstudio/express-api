const express = require("express");
const cors = require("cors");
const path = require("path");
const socket = require("socket.io");
const mongoose = require("mongoose");

const app = express();

app.use((req, res, next) => {
  req.io = io;
  next();
});

const testimonialsRoutes = require("./routes/testimonials.routes");
const concertsRoutes = require("./routes/concerts.routes");
const seatsRoutes = require("./routes/seats.routes");

app.use(cors());

app.use(express.static(path.join(__dirname, "/client/build")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// TESTIMONIALS
app.use("/api", testimonialsRoutes);

// CONCERTS
app.use("/api", concertsRoutes);

// SEATS
app.use("/api", seatsRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

app.use((req, res) => {
  if (res.status(404)) {
    res.json({ message: "Not found..." });
  }
});

mongoose.connect("mongodb://localhost:27017/concertsApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("Connected to the database");
});

db.on("error", (err) => console.log("Error " + err));

const server = app.listen(process.env.PORT || 8000, () => {
  console.log("Server is running on port: 8000");
});

const io = socket(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("New client! Its id – " + socket.id);
});
