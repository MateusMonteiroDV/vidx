const express = require('express')
const router = express.Router()
const course = require('../controllers/courseController/course.js') 
const auth = require('../middlewares/auth.js')
const multer = require('multer')
const {upload} = require('../middlewares/multerVideo.js')


router.get('/video/:key',auth.authenticationJwt, course.getVideo)
router.delete('/video/:key', auth.authenticationJwt, course.deleteVideo)
router.post('/uploadingVideo',
	auth.authenticationJwt,upload.single('video'),
	course.uploadingVideo)

router.delete('/deleteVideo/:filename',auth.authenticationJwt,course.deleteVideo)





module.exports = router