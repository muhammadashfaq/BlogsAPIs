const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
 name: {
  type: String,
  required: [true, 'Please provide your good name'],
 },
 email: {
  type: String,
  required: [true, 'Please provide your email'],
  unique: true,
  lowercase: true,
  validate: [validator.isEmail, 'Please provide a valid email'],
 },
 password: {
  type: String,
  required: [true, 'Please provide a password'],
  minlength: 8,
  select: false,
 },
 passwordConfirm: {
  type: String,
  required: [true, 'Please confirm your password'],
  validate: {
   // This only works on CREATE and SAVE!!!
   validator: function (el) {
    return el === this.password;
   },
   message: 'Passwords are not the same!',
  },
 },
});

userSchema.methods.correctPassword = async function (
 candidatePassword,
 userPassword
) {
 return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
