const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  guild: String,
  ChannelID: {
    type: String,
    default: "No hay canal",
  },
});
module.exports = mongoose.model("setsuggestions_data", schema);
