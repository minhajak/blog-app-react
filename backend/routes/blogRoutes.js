const express = require('express');
const Blog = require('../models/blog');
const router = express.Router();
const currentUser = require('../models/user');


router.post('/add-blog', async (req, res) => {
  const { title, content, userId } = req.body;
  console.log(`${title}  ${content} ${userId}`);
  console.log("trying add blog ...........................................")
  try {
    // Check if the userId is valid (you can verify it by checking the user in the DB)
    const cuser = await currentUser.findById(userId);
    if (!cuser) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log("new blog step 2")

    const newBlog = new Blog({
      title,
      content,
      userId,
      likes: 0,
      views: 0,
      createdAt: Date.now(),
    });

    await newBlog.save();
    res.status(201).json({ message: 'Blog created successfully', newBlog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating blog in server' });
  }
});


router.get('/myblogs/:id', async (req, res) => {
  try {
    const { id } = req.params;  // Retrieve the userId from the request params
    const blogs = await Blog.find({ userId: id });  // Find blogs for the user
    if (blogs.length === 0) {
      return res.status(404).json({ message: 'No blogs found for this user.' }); // If no blogs found, return 404
    }
    res.status(200).json(blogs);  // Return the list of blogs
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blogs', error }); // Handle any error
  }
});

router.get('/myblogs', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blogs', error });
  }
});

router.get('/latest', async (req, res) => {
  try {
    // Find blogs and sort by createdAt field in descending order
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blogs', error });
  }
});



router.put('/update-blog/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: 'Error updating blog', error });
  }
});
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    console.log("step 1")
    await Blog.findByIdAndDelete(id);
    console.log("step 1")
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting blog', error });
  }
});

router.get('/blog/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: 'No blog found with this id.' }); // Early return
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error(error);  // Log the error for debugging
    res.status(500).json({ message: 'Error fetching blog', error: error.message });
  }
});


router.put('/likes/:id',async (req,res)=>{
  const { id } = req.params;
  const { likes } = req.body;
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { likes },
      { new: true }
    );
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: 'Error updating blog', error });
  }
})


module.exports = router;