const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cookieParser = require('cookie-parser')

require('dotenv').config()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser());


app.use('/',require('./router/auth'));
app.use('/',require('./router/noteCrud'));


app.listen(process.env.PORT || 3000 ,(err)=>{
if(err){
    console.log(`error in connection ${err}`)
}
else{
    
    console.log('server is running on port 3000')
}
})
