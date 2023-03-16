const Blog = require('../models/blogModel');
const factory = require('./handleFactory');

exports.createBlog = factory.createOne(Blog);
exports.getBlog = factory.getOne(Blog);
exports.getAll = factory.getAll(Blog);
exports.deleteBlog = factory.deleteOne(Blog);
exports.updateBlog = factory.updateOne(Blog);
