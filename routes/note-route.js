const express = require("express");
const {
  getAllNotes,
  createNote,
  updateNote,
  deleteNote,
} = require("../controllers/note-controller");
const router = express();

router.get("/notes", getAllNotes);
router.post("/notes", createNote);
router.put("/notes/:id", updateNote);
router.delete("/notes/:id", deleteNote);

exports.default = (app) => {
  app.use("/api", router);
};
