let mongoose = require("mongoose"),
  schema = new mongoose.Schema({
    guild: { type: String },
    levels: [
      {
        user: { type: String },
        level: { type: Number },
        xp: { type: Number },
      },
    ],
  });
module.exports = mongoose.model("Levels", schema);
