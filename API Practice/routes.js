const express = require("express");

const route = express.Router();

const {
  getSingleBook,
  getAllBook,
  addBook,
  deleteBookByID,
  UpdateBookById,
} = require("./controllers");



route.get("/", getAllBook);
route.get("/:id", getSingleBook);
route.post("/", addBook);
route.delete("/:id", deleteBookByID);
route.put("/:id", UpdateBookById);

module.exports = route;
