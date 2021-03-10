const foodRoute = require("express").Router();
const Nutri = require("../models/nutri.model");

foodRoute.get("/:item", async (req, res) => {
  const searchTerm = req.params.item;
  try {
    const result = await Nutri.find(
      { $text: { $search: searchTerm } },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });

    res.json(result).end();
  } catch (err) {
    res.status(400).send(err);
  }
});

foodRoute.get("/id/:id", async (req, res) => {
  try {
    const result = await Nutri.findById({ _id: req.params.id });
    res.json(result).end();
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = foodRoute;
