const  mongoose = require("mongoose");
const dataStructure = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    text:{
        type:String,
        required:true
    },
    identification:{
        type:String,
        reqired:true
    },
    generateID:{
        type:String,
        required:true
    },
    favourite:{
        type:Boolean,
        default:false
    },
    read:{
        type:Boolean,
        default:false
    },
    downloads:{
        type:Number,
        default:0
    }
})
dataStructure.methods.addFavourite = async function(){
    this.favourite = true;
    await this.save();
    return this;
}
const Data = mongoose.model("Data",dataStructure);
module.exports = Data;