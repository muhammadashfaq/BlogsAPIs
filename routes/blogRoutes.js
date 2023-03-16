const express = require('express');
const blogController = require('../controllers/blogController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/').get(blogController.getAll);
router.route('/:id').get(blogController.getBlog);

// Protect all routes after this middleware
router.use(authController.protect);

router.route('/').post(blogController.createBlog);
router
 .route('/:id')
 .patch(blogController.updateBlog)
 .delete(blogController.deleteBlog);

module.exports = router;
