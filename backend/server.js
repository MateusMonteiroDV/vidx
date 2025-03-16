require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const cookieParser = require('cookie-parser')

const userRouter = require('./routes/user.js')
const courseRouter = require('./routes/course.js')
const auth = require('./middlewares/auth.js')

app.use(cors())
 

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public'))); 

//app.use('/video', express.static(path.join(__dirname,'public','uploads')));





app.use('/api', userRouter)
app.use('/api', courseRouter)




const PORT = process.env.PORT || 5000


app.listen(PORT,()=>{
	console.log('server running on port ' + PORT)

})






