const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const cors = require('cors')
const env = require('env-var')
const routes = require('./routes')

mongoose.connect('mongodb+srv://victor:'+env.get('DB_PASSWORD').asString()+'@cluster0-lncw3.mongodb.net/weak10?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express()

app.listen(3333)
app.use(cors())
app.use(express.json())
app.use(routes)
