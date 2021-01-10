const express=require('express');
const logger= require('./logger');
const http = require('http');
const https = require('https');
const fs = require('fs');

const app=express();
const PORT = process.env.PORT || 5000;
sslCredentials = {
  key: fs.readFileSync('./certificates/server.key'),
  cert: fs.readFileSync('./certificates/server.crt')
};
const server= https.createServer({key: sslCredentials.key, cert: sslCredentials.cert}, app);
counter = 0;
const jsonResponse = {"menu": {
    "id": "file",
    "value": "File",
    "popup": {
      "menuitem": [
        {"value": "New", "onclick": "CreateNewDoc()"},
        {"value": "Open", "onclick": "OpenDoc()"},
        {"value": "Close", "onclick": "CloseDoc()"}
      ]
    }
  }};

  //middleware 


app.use(logger);
app.get('/', (req, res) => {
    res.send('<h1>hello world</h1>');
});

app.get('/api/info', (req, res) => {
  counter +=1;
  if( counter ==1){
    res.json({"test" : "this is a test"});
  }
  if(counter === 2){
    res.json(jsonResponse);
  }
  
  console.log(`counter ${counter}`); 
} );

server.listen(PORT, () => console.log(`app started on PORT: ${PORT}`));