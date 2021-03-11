const foodRoute = require("express").Router();
const Nutri = require("../models/nutri.model");

foodRoute.get("/search?", async (req, res) => {
  const searchTerm = req.query.name;
  const searchId = req.query.id;

  if (searchTerm) {
    try {
      const result = await Nutri.find(
        { $text: { $search: searchTerm } },
        { score: { $meta: "textScore" } }
      ).sort({ score: { $meta: "textScore" } });

      res.json(result).end();
    } catch (err) {
      res.status(400).send(err);
    }
  }
  if (searchId) {
    try {
      const result = await Nutri.findById({ _id: searchId });
      res.json(result).end();
    } catch (err) {
      res.status(400).send(err);
    }
  }
});

// foodRoute.get("/search?", async (req, res) => {
//   const searchId = req.query.id;
//   try {
//     const result = await Nutri.findById({ _id: searchId });
//     res.json(result).end();
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

module.exports = foodRoute;
