const express = require("express");
const { getAllNotes, createNote } = require("../controllers/note-controller");
const router = express();

router.get("/notes", getAllNotes);
router.post("/notes", createNote);

exports.default = (app) => {
  app.use("/api", router);
};
