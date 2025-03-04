const express = require('express')
const router = express.Router()
const multer = require('multer')
const course = require('../controllers/courseController/course.js') 
const {upload} = require('../middlewares/multerVideos.js')
const auth = require('../middlewares/auth.js')

router.post('/uploadingVideo',auth.authenticationJwt,
	upload.single('video'),course.uploadingVideo)





module.exports = router