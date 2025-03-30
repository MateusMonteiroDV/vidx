require('dotenv').config()

const jwt  = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const db = require('../../models/knex/knex.js')
const uuid = require('uuid')
const { s3Client } = require('../../utils.js');
const {PutObjectCommand} = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { Upload } = require('@aws-sdk/lib-storage');


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

		res.status(200).json({ token:token})	

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
	},

	validateInstructorForm: async (req,res)=>{
	try{	

	
		const {id_user} = req.user
		const {title_course, desc_course} = req.body
		
		
		if (!title_course || !desc_course) {
    		return res.status(400)
    		.json(
    			{
    			 message: 'Title and description are required' 

    			});
   		}
			
   		const existCourse = await db('course')
		.where('title', title_course)
		.first()
		
		if(existCourse){
			return res.status(400).json({message:'Title course already exist'})
		}	

	


		const updatedUser =await db('user')
			.update({isAdmin: true})
			.where('id_user',id_user)
			.returning('*');

		if (!updatedUser || updatedUser.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

		const admin = updatedUser[0]	
		const fileName = `${Date.now()}-${req.file.originalname.replace(/\s+/g, '-')}`;
		const s3Key = `thumb/${fileName}`			

		const upload = new Upload({
        client: s3Client,
        params: {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: s3Key,
          Body: req.file.buffer,
          ContentType: req.file.mimetype,
        },
      });

			 await upload.done();


		const updatedCourse =await db('course').insert({
			id_course: uuid.v4(),
			title: title_course,
			description:desc_course,
			image: s3Key,
			id_user: admin.id_user,

		}).returning('*')

		if(!updatedCourse  || updatedCourse .length == 0){
			return res.status(500).json({message:'Failed to create course'})
		}

		const course = updatedCourse[0]

		return res.status(200).json(
			{
				message:'Validation sucess',
			  id_course: course.id_course
		})


	}catch(err){
		console.log(err)
		return res.status(500).json(
			{
				message: 'Error from the server',
				err: err.message
			})
	}	


	}



}