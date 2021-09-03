const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      isUnique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      // just in case we need it
      type: Boolean,
      required: true,
      default: false,
    },
    pic: {
      type: String,
      required: true,
      dafault:
        'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
    },
  },

  {
    timestamps: true,
  }
);

// encrypting the password
// below pre method will run before save operation
userSchema.pre('save', async function (next) {
  // if password is not change, move to next middleware
  if (!this.isModified('password')) {
    next();
  }

  // else, generate a encrypted password and set it to password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// decrypt the password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
