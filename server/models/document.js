const mongoose = require("mongoose");

const documentSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  url: String,
  children: [{ name: String, id: String, url: String }],
  description: String,
});

module.exports = mongoose.model("Document", documentSchema);
