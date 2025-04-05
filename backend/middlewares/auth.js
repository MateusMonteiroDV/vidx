require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports ={
	authenticationJwt :async (req,res,next)=>{
		  const authHeader = req.headers['authorization'];
		   const token = authHeader && authHeader.split(' ')[1];
		if (!token){ 
			return res.status(401).json({ error: 'Access denied' });
		}

	try{	
		jwt.verify(token, process.env.JWT_PASSWORD,(err,user)=>{
			if(err){
				console.log(err)
				return res.status(401).json({message:'Unauthorized'})

			}

		
			req.user = user

			next()
		} )
	}catch(err){
		res.status(500).json({message:'Error from the server'})
	}	

	}


}




