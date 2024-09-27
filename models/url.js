const mongoose = require("mongoose");
const { Schema } = mongoose;

const urlSchema = new Schema(
  {
    shortid: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    visitHistory: [{timestamp: { type: Number }}],
  },
  { timestamp: true }
);
const URL = mongoose.model("url", urlSchema);
module.exports = URL;
