const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "member"],
    default: "member",
  },
  google: {
    calendarIds: { type: Array, default: [] },
    tokens: { type: Object },
    default: {},
  },
  jira: {
    url: { type: String },
    authType: {
      type: String,
      enum: ["basic", "bearer"],
      default: "bearer",
    },
    email: { type: String },
    apiKey: { type: String },
    issueKey: { type: String },
    default: {},
  },
  ai: {
    provider: { type: String },
    selectedModel: { type: String },
    default: {},
  },
});

UserSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password") || this.isNew) {
      this.password = await bcrypt.hash(this.password, 12);
    }
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", UserSchema);

module.exports = { User };
