const express = require("express");
const mongoose = require("mongoose");
// const cors = require("cors");
const User = require("./models/user.model");
const foodRoute = require("./routes/foodRoute");
const userRoute = require("./routes/userRoute");

require("dotenv").config();

const app = express();

const uri = process.env.DBURI;

// app.use(cors());
app.use(express.json());

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const dbConnection = mongoose.connection;
dbConnection.on("error", console.error.bind(console, "connection error:"));
dbConnection.once("open", () => console.log("Database connected"));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/api/json/v0.1/search", foodRoute);

app.use("/user/", userRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
