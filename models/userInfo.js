const mongoose = require("mongoose");
const crypto = require("crypto");
const uuid = require("uuidv1");

const userInfoSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    encry_password: String,
    salt: String,
  },
  {
    timestamps: true,
  }
);

userInfoSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuid();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

userInfoSchema.methods = {
  authenticate: function (plainpassword) {
    return this.securePassword(plainpassword) == this.encry_password;
  },
  securePassword: function (plainpassword) {
    if (!plainpassword) {
      return "";
    }
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (error) {
      return error;
    }
  },
};

module.exports = mongoose.model("userinfo", userInfoSchema);
