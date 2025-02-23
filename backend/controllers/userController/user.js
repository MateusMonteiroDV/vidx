require('dotenv').config()

const jwt  = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const db = require('../../models/knex/knex.js')
const uuid = require('uuid')


module.exports = {
 	
 	signup: async (req,res)=>{
	try{	
		const {name, email, password} = req.body

		const salt = await bcrypt.genSalt()
		const hashPassword = await bcrypt.hash(password,salt)

	
		const isExist= await db('user').where('email',email).first()

		if(isExist){
			res.status(400).json({message:'Email already exist'})

		}	


	 const user = await db('user').insert({
	 	id_user: uuid.v4(),
	 	name: name,
	 	email: email,
	 	password: hashPassword

	 }).returning('*')	
	const new_user = user[0];	


	const token = jwt.sign({id_user: new_user.id_user},
		process.env.JWT_PASSWORD, 
		{expiresIn:'1h'}  )						

	const refreshToken = jwt.sign({id_user: new_user.id_user},process.env.JWT_PASSWORD, {expiresIn:'30d'}  )	
	 
	 res.cookie('jwt', refreshToken,{
	 	httpOnly: true,
	 	sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax'


	 })

		res.status(200).json({user:new_user, token:token})	

	}catch(err){
		console.log(err)
		res.status(500).json({message:'error from the server'})
	}


	},

  login: async (req,res)=>{
	try{

	const {email, password} = req.body

	
	const user = await db('user')
			.where('email',email)
			.returning('*')
	if(!user){
		res.status(400).json({message:"User not found"})
	}

	const newUser =user[0]

	const isValid = bcrypt.compare(password,newUser.password)		

		if(!isValid){
		 res.status(400).json({message:'Passoword invalid'})
		}	
		
		const acessToken = jwt.sign({id_user:newUser.id_user },
		 process.env.JWT_PASSWORD, 
		 {expiresIn: '1h'})
		
		const refreshToken = jwt.sign({id_user:newUser.id_user}, 
			process.env.JWT_PASSWORD, 
			{expiresIn: '30d'})

			res.cookie('jwt', refreshToken,{
				httpOnly: true,
				sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax'
			})
			
			res.status(200).json({token:acessToken})



	}catch(err){
		console.log(err)
		res.status(500).json({message:err})
	}

},
	refresh: async (req,res)=>{
		try{
			
			console.log(req.cookies['jwt'])
			const refreshToken = req.cookies['jwt']
			
			if(!refreshToken){
				return res.status(404).json({message:'Uhnatorized'})
			}

			const user = jwt.verify(refreshToken, process.env.JWT_PASSWORD)

			const acessToken=jwt.sign({id_user: user.id_user}, process.env.JWT_PASSWORD,{expiresIn: '1h'})

		

			return res.status(200).json({token:acessToken})


	}catch(err){
		console.log("Message erro " + err)
		res.status(500).json({message:'Error from the server'})
	}	
	}



}