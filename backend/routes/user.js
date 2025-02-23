const express = require('express')
const router = express.Router()
const user = require('../controllers/userController/user.js') 
const auth = require('../middlewares/auth.js')

router.post('/signup', user.signup)
router.post('/login', user.login)
router.get('/test',auth.authenticationJwt, (req,res)=>{
	const {id_user} = req.user
	res.status(200).json({message:'Authorizatin aceppt and the id user '+ id_user})


})

router.post('/refresh', user.refresh)







module.exports = router