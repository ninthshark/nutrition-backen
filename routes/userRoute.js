const userRoute = require("express").Router();
const User = require("../models/user.model");

userRoute.post("/register", async (req, res) => {
  const user = req.body;
  const newUser = new User({
    username: user.username,
    email: user.email,
    password: user.password,
  });

  // const newUser = new User({ user });
  try {
    const userAdded = await newUser.save();
    console.log(userAdded);
    res.status(200).send("New user added");
  } catch (err) {
    res.status(400).send(err);
  }
});

//   newUser
//   .save()
//   .then(() => res.send("New user added"))
//   .catch((err) => res.status(400).send(err));

module.exports = userRoute;
