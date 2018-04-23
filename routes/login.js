var express = require('express');
var router = express.Router();

var UserModel = require('../model/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login' ,{showErr:false});
});


//响应前端请求

router.post('/',function(req,res){

    //登录时与数据库中的数据进行匹配
    UserModel.find({
        
        phone:req.body.phone,
        password:req.body.password
    },function(err,data){

        if(!err){
            
            console.log(data);
           
            

            if (data.length==0) {
                
                console.log('登录数据验证失败');
                res.send({islogin:0})
                
                
            } else {
                // req.session.user= true;
                console.log('登录数据验证成功');
                res.send({islogin:1})
                
            }
            
        }
    })

    

})

module.exports = router;