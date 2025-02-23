
require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRouter = require('./routes/user.js')

app.use(cors())
 

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json())

app.use('/api', userRouter)




const PORT = process.env.SERVER_PORT || 5000


app.listen(PORT,()=>{
	console.log('server running on port ' + PORT)

})






