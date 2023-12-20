import mongoose from "mongoose";
const usernameCustomPattern = /^[A-Z][a-z]freight\d{4}$/;

export interface IUser {
  _id: string;
  username: string;
  password: string;
  role: string;
  token: string;
  resetPassword: boolean;
  createdAt: Date
};

const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    min: 2,
    max: 50,
    unique: true,
    required: true,
    match: usernameCustomPattern,
  },
  password: {
    type: String,
    min: 6,
    max: 255,
    required: true,
  },
  role: {
    type: String,
    enum: ["superAdmin", "admin", "employee"],
    default: "employee",
    required: true,
  },
  resetPassword: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  }
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;