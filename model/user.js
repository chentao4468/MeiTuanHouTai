//import { Mongoose, Schema } from "mongoose";

var mongoose = require("mongoose");

var Schema=mongoose.Schema;

var obj={
    username:String,
    email:String,
    phone:Number,
    password:String


}



var model = mongoose.model("meituanuser ",new Schema(obj));

module.exports=model;