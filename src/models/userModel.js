import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an password"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

// As Nextjs run on edge time so it doesn't know if you are first time connected
// to the DB or its a new instance so we have to pass users not user
const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
