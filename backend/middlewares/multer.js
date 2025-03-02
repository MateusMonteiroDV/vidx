const multer = require('multer')
const path = require('path');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
       cb(null, path.join(__dirname, '..', 'public', 'temp'));
    },
    filename: function (req, file, cb) {
     const sanitizedFileName = file.originalname.replace(/\s+/g, '-')
   
      cb(null,  Date.now() + '-' + sanitizedFileName)
    }
})


const upload =multer({
	storage,
})

module.exports = {upload}