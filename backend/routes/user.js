const express = require('express')
const router = express.Router()
const user = require('../controllers/userController/user.js') 
const auth = require('../middlewares/auth.js')

router.post('/signup', user.signup)
router.post('/login', user.login)
router.post('/validateInstructorForm',auth.authenticationJwt,user.validateInstructorForm)


router.post('/refresh', user.refresh)







module.exports = router