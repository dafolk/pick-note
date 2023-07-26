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

module.exports = { getAllNotes, createNote };
