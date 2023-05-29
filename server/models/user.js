const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: { type: String, unique: true },
    password: { type: String },
    profilePicture: { type: String, default: '' },
    firstName: { type: String  },
    lastName: { type: String },
    dateOfBirth: { type: Date},
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);

const User = mongoose.model('User', UserSchema);

module.exports = User ;
