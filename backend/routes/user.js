const express = require('express')
const router = express.Router()
const user = require('../controllers/userController/user.js') 
const auth = require('../middlewares/auth.js')
const multe = require('multer')
const{upload} = require('../middlewares/multerImage.js')

router.post('/signup', user.signup)
router.post('/login', user.login)
router.post('/validateInstructorForm',auth.authenticationJwt,upload.single('image'),
	user.validateInstructorForm)


router.post('/refresh', user.refresh)







module.exports = router