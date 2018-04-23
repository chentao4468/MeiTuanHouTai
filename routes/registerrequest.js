var express=require('express');

var router = express.Router();

var UserModel =require("../model/user");



router.get('/',function(req,res,next){
    
   
});

//获取前端post请求 req.body
//获取前端get请求 req.query
router.post('/',function(req,res,next){
    console.log(req.body);
        
    //存数据库
    // UserModel.create({
    //     username:req.body.username,
    //     email:req.body.email,
    //     phone:req.body.phone,
    //     password:req.body.password
    // },function(err,data){

    //     if(!err){
    //         res.send(data)
    //         console.log(data);
            
    //     }else{
    //         console.log(err);
            
    //     }
        
    // })


    // 存数据库之前要先 验证是否之前注册过 ------------------------------------
    // =========================================
    UserModel.find({
        // email:req.body.email,
        phone:req.body.phone,
       
    },function(err,data){

        if(!err){
            
            console.log(data);

            if (data.length==0) {

                UserModel.create({
                    username:req.body.username,
                    email:req.body.email,
                    phone:req.body.phone,
                    password:req.body.password
                },function(err,data){
            
                    if(!err){
                        res.send({isregister:1});
                    }else{
                        res.send({isregister:0});
                    }
                    
                })
                
            } else {
                console.log("已注册请登录");
                
              
                
            }
            
        }
    })


 
    
})


module.exports = router;