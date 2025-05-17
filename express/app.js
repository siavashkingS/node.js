const express = require('express');
const application = express();

application.get('/',(request,response)=>{
    response.send({
        status:true,
        message: "hello you"
    })
})

const runapp =()=>{
    application.listen(8000,()=>{
        console.log('the app is working');
    });
}

module.exports = runapp;