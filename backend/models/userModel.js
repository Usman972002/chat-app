const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Pre Save
userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(user.password, salt);

    user.password = hashedPassword;
    next();
  } catch (err) {
    return next(err);
  }
});

// // Function To compare Password
userSchema.methods.comparePassword = async function (typedPassword) {
  try {
    const isMatch = await bcrypt.compare(typedPassword, this.password);
    return isMatch;
  } catch (err) {
    throw err;
  }
};

const user = mongoose.model("user", userSchema);
module.exports = user;
