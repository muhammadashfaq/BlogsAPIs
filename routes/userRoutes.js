const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const upload = require('../middlewares/multer');

const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.post('/uploadProfilePicture', upload.single('image'), (req, res) => {
 if (!req.file) {
  console.log('No file received');
  return res.send({
   success: false,
  });
 } else {
  console.log('file received');
  return res.send({
   success: true,
  });
 }
});

router.post('/forgotPassword', authController.forgotPassword);
router.post('/resetPassword/:token', authController.resetPassword);

module.exports = router;
