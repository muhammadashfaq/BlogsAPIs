const factory = require('../controllers/handleFactory');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const upload = require('../middlewares/multer');

exports.getUser = factory.getOne(User);
exports.getAllUsers = factory.getAll(User);

exports.uploadProfilePicture = catchAsync(async (req, res, next) => {
 upload.single('image', function (req, res) {
  if (req.file) {
   res.send('Single file uploaded successfully');
   res.status(200).json({
    status: 'success',
    message: 'Single file uploaded successfully',
    data: {},
   });
  } else {
   res.status(400).send('Please upload a valid image');
  }
 });
 next();
});
