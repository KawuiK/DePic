const mongoose = require("mongoose");
const con =
  "NoXD";
const db = mongoose.connection;
mongoose
  .connect(con, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.log(err));
db.once("open", (_) => {
  console.log("Connected to MongoDB ✔️");
});
db.on("error", (e) => {
  console.log("Ups!: " + e);
});
