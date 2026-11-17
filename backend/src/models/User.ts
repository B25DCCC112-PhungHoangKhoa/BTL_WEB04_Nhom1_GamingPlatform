import mongoose, { Schema, type InferSchemaType } from "mongoose";

export const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Họ và tên không được để trống"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email không được để trống"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Email không đúng định dạng"],
    },
    password: {
      type: String,
      minLength: [6, "Mật khẩu phải có ít nhất 6 ký tự"],
    },
    googleId: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ["client", "admin"] as const,
      default: "client" as const,
    },
    phoneNumber: {
      type: String,
      default: null,
      trim: true,
    },
  },
  { timestamps: true },
);

export type UserSchemaType = InferSchemaType<typeof userSchema>;
export type IUser = UserSchemaType & { _id: mongoose.Types.ObjectId };
export type UserRole = UserSchemaType['role'];

export const User = mongoose.model("User", userSchema);
export default User;