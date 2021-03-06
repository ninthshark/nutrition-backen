const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Nutri = require("./models/nutri.model");

require("dotenv").config();

const app = express();

const uri = process.env.DBURI;

app.use(cors());
app.use(express.json());

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const dbConnection = mongoose.connection;
dbConnection.on("error", console.error.bind(console, "connection error:"));
dbConnection.once("open", function () {
  console.log("Database connected");
});

app.get("/ingredients/:food_name", (req, res) => {
  const searchTerm = req.params.food_name;
  console.log(searchTerm);
  Nutri.find(
    { $text: { $search: searchTerm } },
    { score: { $meta: "textScore" } }
  )
    .sort({ score: { $meta: "textScore" } })
    .then((result) => {
      // console.log(json(result));
      res.json(result);
    })
    .catch((err) => console.log(err));
});

app.get("/ingredients/item/:id", (req, res) => {
  // const foodId = req.params.foodId;
  Nutri.findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => console.log(err));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
