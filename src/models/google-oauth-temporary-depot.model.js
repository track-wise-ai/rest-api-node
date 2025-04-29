const mongoose = require("mongoose");

const googleOAuthTemporaryDepotSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  state: {
    type: String,
    default: undefined,
  },
});

const GoogleOAuthTemporaryDepot = mongoose.model(
  "GoogleOAuthTemporaryDepot",
  googleOAuthTemporaryDepotSchema,
);

module.exports = { GoogleOAuthTemporaryDepot };
