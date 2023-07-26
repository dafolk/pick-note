const noteModel = require("../models/note-schema");

const getAllNotes = async (req, res) => {
  const data = req.body;

  const notes = await noteModel.aggregate([
    {
      $lookup: {
        from: "users",
        as: "user",
        localField: "userId",
        foreignField: "_id",
      },
    },
    {
      $unwind: {
        path: "$user",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        userId: 0,
        "user.password": 0,
        "user.createdAt": 0,
        "user.updatedAt": 0,
      },
    },
  ]);

  res.status(200).json({
    notes: notes,
  });
};

const createNote = async (req, res) => {
  const data = req.body;

  await noteModel
    .create({
      title: data.title,
      body: data.body,
      userId: data.userId,
    })
    .then((note) => {
      res.status(200).json({
        error: false,
        message: "New note created",
        data: note,
      });
    });
};

const updateNote = async (req, res) => {
  const data = req.body;
  await noteModel
    .findByIdAndUpdate(req.params.id, { body: data.body }, { new: true })
    .then((update) => {
      res.status(200).json({
        error: false,
        message: "Note updated",
        data: update,
      });
    });
};

const deleteNote = async (req, res) => {
  const id = req.params.id;

  await noteModel.findByIdAndDelete(id).then((result) => {
    res.status(200).json({
      error: false,
      message: "Note deleted",
      data: result,
    });
  });
};

module.exports = { getAllNotes, createNote, updateNote, deleteNote };
