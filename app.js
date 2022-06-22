const express = require('express');
const app = express();
var expressLayouts = require('express-ejs-layouts');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

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

