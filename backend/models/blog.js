const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  likes: {
    type: Array,
    default: [null]
  },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const Blog = mongoose.model('blog', blogSchema, 'blog');
module.exports = Blog;
