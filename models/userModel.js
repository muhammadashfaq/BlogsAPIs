const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const AppError = require('../utils/appError');

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
 passwordChangedAt: Date,
 passwordResetToken: String,
 passwordResetExpires: Date,
});

userSchema.pre('save', async function (next) {
 if (!this.isModified('password')) return next();
 this.password = await bcrypt.hash(this.password, 10);
 next();
});

userSchema.methods.correctPassword = async function (
 candidatePassword,
 userPassword
) {
 return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.createPasswordResetToken = function () {
 const resetToken = crypto.randomBytes(32).toString('hex');
 this.passwordResetToken = crypto
  .createHash('sha256')
  .update(resetToken)
  .digest('hex');
 this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
 return resetToken;
};

userSchema.pre('save', function (next) {
 if (!this.isModified('password') || this.isNew) return next();

 this.passwordChangedAt = Date.now() - 1000;
 next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
