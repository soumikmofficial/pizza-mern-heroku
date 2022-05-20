const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema(
  {
    email: {
      requried: true,
      type: String,
      unique: [true, "try different email"],
      validate: {
        validator: validator.isEmail,
        message: "Please provide valid email",
      },
    },
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: [15, "name too long. Try nickname"],
    },
    password: {
      type: String,
      required: true,
      minLength: [6, "password cannot be than 6 characters"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: String,
    verified: Date,
    passwordResetToken: String,
    passwordTokenExpirationDate: { type: Date },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.matchPassword = async function (userInput) {
  const isMatch = await bcrypt.compare(userInput, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
