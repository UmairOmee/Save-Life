var express = require('express');
var passport = require('passport');
var bodyParser = require("body-parser");
var morgan = require('morgan');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var mongoose = require("mongoose");
var cors = require('cors')
const PORT = process.env.PORT || 5000;

const users = require('./routes/api/auth');
const profile = require('./routes/api/profile');
const bookingRoutes = require('./routes/api/bookingRoutes')

// mongodb+srv://omair:(792871)@cluster0.aemeh.mongodb.net/myproject?retryWrites=true&w=majority
// mongodb://127.0.0.1/myproject

// 786umair

// Connection to Mongodb database 
// mongodb+srv://umair:<password>@cluster0.d9vd4.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose.connect("mongodb+srv://umair:786umair@cluster0.d9vd4.mongodb.net/myproject?retryWrites=true&w=majority", 
    {useNewUrlParser:true, useFindAndModify: false,useUnifiedTopology: true },(err) => {
    if (err)
        {console.log(err)}
        else {console.log("db connected");}
})



var server = express()

// server.use(express.static('./build'))
// server.use('/uploads', express.static('./uploads'));
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(cookieParser("secret-word"));
server.use(morgan('dev'));
server.use(flash());
server.use(cors());

require('./Authenticaticaton with passportjs/passport')(server);
require('./Http requests/routes')(server);
server.use('/api/users', users);
server.use('/api/profile', profile);
server.use('/api/booking', bookingRoutes);

server.use((err, req, res, next) => {
    console.warn(err)
    res.status(500).send("Error Catched by error handler.")
})

if(process.env.NODE_ENV === 'production'){
    server.use(express.static('client/build'))
    const path = require('path');
    server.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}


server.listen( PORT, () => console.log("server is running"))
