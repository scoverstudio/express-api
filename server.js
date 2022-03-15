const express = require("express");
const app = express();

const testimonialsRoutes = require("./routes/testimonials.routes");
const concertsRoutes = require("./routes/concerts.routes");
const seatsRoutes = require("./routes/seats.routes");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// TESTIMONIALS
app.use("/api", testimonialsRoutes);

// CONCERTS
app.use("/api", concertsRoutes);

// SEATS
app.use("/api", seatsRoutes);

app.use((req, res) => {
  if (res.status(404)) {
    res.json({ message: "Not found..." });
  }
});

app.listen(8000, () => {
  console.log("Server is running on port: 8000");
});
