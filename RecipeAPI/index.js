//Import packages
const express = require('express')
const morgan = require('morgan')

//App
const app = express()

//Fixes CORS issue #FuckCORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Morgan
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(require('./routes/index.routes'))

//First Route
app.get('/', (req, res) => {
    res.json({message: 'Hello World'})
})

//Starting server
app.listen('3001', '10.5.5.132')
