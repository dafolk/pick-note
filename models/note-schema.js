const mongoose = require("mongoose");
const { Schema } = mongoose;

const noteScheme = new Schema(
  {
    title: {
      type: String,
      required: false,
    },
    body: {
      type: String,
      required: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true, versionKey: false }
);

const noteModel = mongoose.model("Note", noteScheme);

module.exports = noteModel;
