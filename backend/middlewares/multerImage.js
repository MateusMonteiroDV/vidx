const multer = require('multer');
const path = require('path');

const upload = multer({
  storage: multer.memoryStorage(), 
  limits: { 
    fileSize: 5 * 1024 * 1024 
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp'
    ];
    
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only images are allowed (JPEG, PNG, GIF)'), false);
    }
  }
});

module.exports = {upload}