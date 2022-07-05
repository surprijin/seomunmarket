
const express = require('express');
var expressLayouts = require('express-ejs-layouts');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const db = require('../db');
router.use(expressLayouts);

//route, routing 
router.get('/', (req, res) => {
    db.getMainMemos((rows) => {
        res.render('main',{ rows : rows });
    });
    //서문시장야시장의 메인페이지를 지정 하세요
});

router.get('/intro', (req, res) => {
    res.render("introduce");
});

router.get('/notice', function(req, res, next) {
    db.getAllMemos((rows) => {
        res.render('notice',{ rows : rows });
    });

});

router.get('/notice_page', function(req, res) {
    let id = req.query.id;

    db.getpageByid(id, (row)=>{
        if(typeof id === 'undefined' || row.length <= 0){
            res.status(404).json({error:'undefind memo'});
        } else {
            res.render('notice_page',{row:row[0]});
        }
    });
});

router.post('/store', 
    check('content').isLength({min: 1, max: 300}),
    function(req, res, next) {
    let errs = validationResult(req);
    console.log(errs); //테스트 필요할 때 사용
    if (errs['errors'].length > 0){ //화면에 에러 출력하기
        res.render('notice_write',{errs:errs['errors']}); 
    } else {
        let param = JSON.parse(JSON.stringify(req.body));
        var title = param['title'];
        var NTuser = param['NTuser'];
        var NTpw = param['NTpw'];
        var content = param['content'];
        var NTdate = param['NOW()'];

        db.insertMemo(title,NTuser,NTpw,NTdate,content,() => {
            res.redirect('/notice');
        });
    }
});

router.get('/join', (req, res) => {

    res.render("join");
});

router.get('/login', (req, res) => {
    res.render("login");
});

router.get('/general', (req, res) => {
    res.render("general");
});

router.get('/foodseller', (req, res) => {
    res.render("foodseller");
});

router.get('/freemarket', (req, res) => {
    res.render("freemarket");
});

router.get('/notice_write', (req, res) => {
    res.render("notice_write");
});


router.get('/noticeUpdate',(req,res) => {
    let id = req.query.id;
    
    db.getMemoById(id, (row)=>{
        if(typeof id === 'undefined' || row.length <= 0){
            res.status(404).json({error:'undefind memo'});
        } else {
            res.render('noticeUpdate',{row:row[0]});
        }
    });
});

router.post('/noticeUpdate',check('content').isLength({min: 1, max: 300}),
    (req,res) => {
        let errs = validationResult(req);

        let param = JSON.parse(JSON.stringify(req.body));
        let id = param['id'];
        let content = param['content'];
        let title = param['title'];
        let NTuser = param['NTuser'];
        let NTpw = param['NTpw'];

        if (errs['errors'].length>0){

            db.getMemoById(id, (row)=>{
                res.render('noticeUpdate',{row:row[0], errs: errs['errors']});
            });
        }else {
            db.updateMemoById(id,title,NTuser,NTpw,content, ()=>{
                res.redirect('/notice');
            });
        }
    });

    router.get('/deleteMemo', (req,res)=>{
        let id = req.query.id;
        db.deleteMemoById(id, () => {
            res.redirect('/notice');
        });
    })

    
module.exports = router;
