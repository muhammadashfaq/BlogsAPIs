const express = require('express');
const blogController = require('../controllers/blogController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/').get(blogController.getAll);
router.route('/:id').get(blogController.getBlog);

router.route('/').post(authController.protect, blogController.createBlog);
router
 .route('/:id')
 .patch(authController.protect, blogController.updateBlog)
 .delete(authController.protect, blogController.deleteBlog);

module.exports = router;
