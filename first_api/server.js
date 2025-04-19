const fs = require('fs');
const http = require('http');
const path = require('path');
const mimetypes = require('mime-types');
const configs = require('./Configs.js').configs;
const queryStringHandler = require('qs');
const controllers = require('./controllers/ControllerLoader.js').controllers;

const server = http.createServer((req,res) =>{
    console.log(req.url);

    req.parsedURL= new URL(path.join('http://localhost:8080',req.url));
    let data =getReqestData(req);

    if(req.parsedURL.pathname.search('/api')>=0){
        route = getAPIControllerMethodName(req);
        if (controllers[route.controller] != undefined){
            response = controllers[route.controller][route.method](data);
            res.writeHead(200,{"Content-Type": "application/json"});
            res.write(JSON.stringify(response), "binary");
            res.end();
            return;
        }
        res.writeHead(404)
        res.end(route.controller + 'Controller not found!');
        return;
    }
    let filepath=path.join(__dirname,req.parsedURL.pathname);
    fs.readFile(filepath,(err,data)=>{
        if(err){
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return
        }
        let mimeType=mimetypes.lookup(filepath);
        console.log(mimeType);
        res.writeHead(200,{"content-type":mimeType});
        res.write(data,"binary");
        res.end();
    });
})
server.listen(8080,()=>{
    console.log('listen on port: 8080');
});

function getReqestData(req){
    let data=queryStringHandler.parse(req.parsedURL.search);

    if (req.method == 'GET'){
        return data;
    }
    let postData= '';
    req.on('data',dataPart=>{
        postData +=dataPart;
    });
    req.on('end',()=>{
        data=Object.assign(data,JSON.parse(postData));
    });
}
function getAPIControllerMethodName(req){
    parts = req.parsedURL.pathname.split('/');

    return{
        controller: (parts[2] != undefined ? parts[2]: 'Home'),
        method:(parts[3] != undefined ? parts[3]: 'index')
    };
}