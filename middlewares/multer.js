const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
 destination: function (req, file, cb) {
  cb(null, path.join(__dirname, 'uploads')); // set the destination folder for the uploaded file
 },
 filename: function (req, file, cb) {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9); // generate a unique filename to prevent overwriting
  cb(
   null,
   file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
  ); // set the filename for the uploaded file
 },
});

const upload = multer({storage: storage});

module.exports = upload;
