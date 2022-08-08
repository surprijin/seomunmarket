const mysql = require('mysql');

const connection = mysql.createConnection({
    host : 'us-cdbr-east-06.cleardb.net',
    user : 'be07ab9fb79386', //ID
    password : '3d555bdf', //비밀번호
    port : '3306',
    database : 'heroku_115af1c702855df',
    dateStrings :'date' //날짜 시간 출력
  });

  function handleDisconnect() {
    connection.connect(function(err) {            
      if(err) {                            
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 2000); 
      }                                   
    });                                 
                                           
    connection.on('error', function(err) {
      console.log('db error', err);
      if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
        return handleDisconnect();                      
      } else {                                    
        throw err;                              
      }
    });
  }
  
  handleDisconnect();


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

/************************** 공지사항 검색 ****************************/

function countAll(callback){
    connection.query('SELECT COUNT(*) FROM notice',(err, result) => {
        let count = Object.values(result[0])[0];
        if (err) throw err;
        callback(count);
    });
}

function searchMemo(keyword, callback){
    console.log(keyword);
    connection.query(`SELECT * FROM (SELECT *, @rownum:=@rownum+1 AS RNUM FROM notice, (SELECT @rownum :=0 as R)NUM)SUB WHERE title LIKE '%${keyword}%' ORDER BY id DESC`, (err, rows, fields) => {
        if (err) throw err;
        callback(rows);
});
}


module.exports = {
    getAllMemos,
    insertMemo,
    getMemoById,
    updateMemoById,
    deleteMemoById,
    getpageByid,
    getMainMemos,
    countAll,
    searchMemo
  }