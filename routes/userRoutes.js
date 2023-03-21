const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const upload = require('../middlewares/multer');

const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.post('/uploadProfilePicture', upload.single('image'), (req, res) => {
 res.status(200).json({
  status: 'success',
  message: 'Image uploaded',
 });
});

router.post('/forgotPassword', authController.forgotPassword);
router.post('/resetPassword/:token', authController.resetPassword);

module.exports = router;
