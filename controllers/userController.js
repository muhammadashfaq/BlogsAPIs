const factory = require('../controllers/handleFactory');
const User = require('../models/userModel');

exports.getUser = factory.getOne(User);
exports.getAllUsers = factory.getAll(User);
