const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      minlength: [3, 'Username must be at least 3 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\S+@\S+\.\S+$/,
        'Please provide a valid email address',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },

    // Optional fields (can be added later via profile update)
    profilePhoto: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      default: '',
    },
    availability: {
      type: String,
      default: '',
    },
    skillsOffered: [String],
    skillsWanted: [String],
    isPublic: {
      type: Boolean,
      default: true,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
    isProfileComplete: {
      type: Boolean,
      default: false,
}
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
