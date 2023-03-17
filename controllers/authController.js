const {promisify} = require('util');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

const saltRounds = 10; // increase this number to increase the security level

const signToken = (id) => {
 return jwt.sign({id}, process.env.JWT_SECRET, {
  expiresIn: process.env.JWT_EXPIRES_IN,
 });
};

const createSendToken = async (user, statusCode, res) => {
 const token = signToken(user._id);
 const cookieOptions = {
  expires: new Date(
   Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
  ),
  httpOnly: true,
 };
 if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

 console.log('[token]', token);
 console.log('[cookieOptions]', cookieOptions);

 res.cookie('jwt', token, cookieOptions);

 // Remove password from output
 user.password = undefined;

 res.status(statusCode).json({
  status: 'success',
  token,
  data: {
   user,
  },
 });
};

exports.signUp = catchAsync(async (req, res, next) => {
 const {name, email, password, confirmPassword} = req.body;

 if (password !== confirmPassword)
  return next(new AppError('Password and confirm Password do not match!', 400));

 const newUser = await User.create({
  name: name,
  email: email,
  password: password,
 });

 await newUser?.save();
 createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
 const {email, password} = req.body;

 if (!email || !password) {
  return next(new AppError('Please provide email and password!', 400));
 }
 const user = await User.findOne({email}).select('+password');

 if (!user || !(await user.correctPassword(password, user.password))) {
  return next(new AppError('Incorrect email or password', 401));
 }

 createSendToken(user, 200, res);
});

exports.logout = (req, res) => {
 res.cookie('jwt', 'loggedout', {
  expires: new Date(Date.now() + 10 * 1000),
  httpOnly: true,
 });
 res.status(200).json({status: 'success', message: 'Logged out'});
};

exports.protect = catchAsync(async (req, res, next) => {
 // 1) Getting token and check of it's there
 let token;
 if (
  req.headers.authorization &&
  req.headers.authorization.startsWith('Bearer')
 ) {
  token = req.headers.authorization.split(' ')[1];
 }

 if (!token) {
  return next(
   new AppError('You are not logged in! Please log in to get access.', 401)
  );
 }

 // 2) Verification token
 const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

 // 3) Check if user still exists
 const currentUser = await User.findById(decoded.id);
 if (!currentUser) {
  return next(
   new AppError('The user belonging to this token does no longer exist.', 401)
  );
 }

 // GRANT ACCESS TO PROTECTED ROUTE
 req.user = currentUser;
 res.locals.user = currentUser;
 next();
});
