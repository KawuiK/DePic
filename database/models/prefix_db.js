const mongoose = require("mongoose");
const Guild = mongoose.Schema({
  Guild: String,
  Prefix: String,
});
module.exports = mongoose.model("Guild", Guild);
