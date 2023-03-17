const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
 title: {
  type: String,
  required: [true, 'Title is required for blog'],
 },
 author: {
  type: mongoose.Schema.ObjectId,
  ref: 'User',
 },
 content: {
  type: String,
  required: [true, 'Content is required for blog'],
 },
});

blogSchema.pre(/^find/, function () {
 this.populate({
  path: 'author',
 });
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
