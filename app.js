const express=require('express')
const app=new express();
var morgan = require('morgan');
const api=require('./routes/sample');
// require('dotenv').config();
// app.use(morgan('dev'));
app.use('/api',api);

app.listen(7000,()=>{
    console.log(`Server is running on port 7000`);
    
});