
require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')



app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json())






const PORT = process.env.SERVER_PORT || 5000


app.listen(PORT,()=>{
	console.log('server running on port ' + PORT)

})






