const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String
  },
  firstname: {
    type: String
  },
  lastname: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  profil: {
    type: String,
  },
  avatar: {
    type: String,
  },
  rand: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: Boolean,
  }
}, {
  timestamps: true
});
UserSchema.method("toJSON", function () {
  const {
    __v,
    _id,
    ...object
  } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model("Users", UserSchema);