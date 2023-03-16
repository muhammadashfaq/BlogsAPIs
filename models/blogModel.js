const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
 title: {
  type: String,
  required: [true, 'Title is required for blog'],
 },
 author: {
  type: String,
  required: [true, 'Author is required for blog'],
 },
 content: {
  type: String,
  required: [true, 'Content is required for blog'],
 },
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
