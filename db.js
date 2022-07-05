const mysql = require('mysql');

const connection = mysql.createConnection({
    host : 'us-cdbr-east-05.cleardb.net',
    user : 'b38c0f41b180b6', //ID
    password : '07cfb1c9', //비밀번호
    port : '3306',
    database : 'heroku_f004714a26801c4',
    dateStrings :'date' //날짜 시간 출력
  });

function getAllMemos(callback) {
    connection.query('select * from notice order by id DESC', 
    (err, rows, fields) =>{
        if(err) throw err;
        callback(rows);
    })
}

function getMainMemos(callback) {
    connection.query('select * from notice order by id DESC LIMIT 6', 
    (err, rows, fields) =>{
        if(err) throw err;
        callback(rows);
    })
}

function insertMemo(title,NTuser,NTpw,NTdate,content, callback){
    connection.query(`INSERT INTO notice(title, NTuser, NTpw, NTdate, content) VALUES
    ('${title}','${NTuser}','${NTpw}', NOW(),'${content}')`,(err, result) => {
      if(err) throw err;
      callback();
    })
}

function getMemoById(id, callback){
    connection.query(`SELECT * FROM notice WHERE id = '${id}'`, (err, row, fields) =>{
        if(err) throw err;
        callback(row);
    })
}

function getpageByid(id, callback){
    connection.query(`SELECT * FROM notice WHERE id = '${id}'`, (err, row, fields) =>{
        if(err) throw err;
        callback(row);
    })
}

function updateMemoById(id,title,NTuser,NTpw,content, callback){
    connection.query(`UPDATE notice SET NTuser = '${NTuser}',title ='${title}', NTpw = '${NTpw}', content = '${content}', NTdate = NOW() WHERE id = '${id}'`
    ,(err,result) => {
        if(err) throw err;
        callback();
    });
}

function deleteMemoById(id, callback){
    connection.query(`DELETE FROM notice WHERE id = ${id}`, 
    (err, result) => {
        if(err) throw err;
        callback();
    })
}


module.exports = {
    getAllMemos,
    insertMemo,
    getMemoById,
    updateMemoById,
    deleteMemoById,
    getpageByid,
    getMainMemos
  }