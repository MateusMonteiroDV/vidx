const multer = require('multer');

const upload = multer({
  storage: multer.memoryStorage(), // Store files in memory
  limits: { fileSize: 500 * 1024 * 1024 }, // 500 MB file size limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('video/') || file.mimetype === 'application/octet-stream') {
      cb(null, true);
    } else {
      cb(new Error('Not a video file. Please upload only videos.'));
    }
  },
});

module.exports = { upload };