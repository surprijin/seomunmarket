const express = require('express');
const app = express();
var expressLayouts = require('express-ejs-layouts');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var path = require('path');
const http = require('https');

setInterval(function(){
    http.get("https://seomunfinal.herokuapp.com/")
},600000)

function handleDisconnect() {
    db.connect(function(err) {            
      if(err) {                            
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 2000); 
      }                                   
    });                                 
                                           
    db.on('error', function(err) {
      console.log('db error', err);
      if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
        return handleDisconnect();                      
      } else {                                    
        throw err;                              
      }
    });
  }
  
  handleDisconnect();

const routers = require('./routes/route.js');


app.set('views', __dirname + "/views");
app.set('view engine', 'ejs');
app.set('layout','layout');
app.set('layout extractScripts', true);
//app.engine('html', require('ejs').renderFile);



app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(logger('dev'));
 


//css, img, js의 파일 사용을 위한 경로 설정
app.use(express.static(__dirname + '/public'));
app.use('/', routers);

module.exports = app;

