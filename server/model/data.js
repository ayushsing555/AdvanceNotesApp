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
    createDate:{
         type:Date,
         default:Date.now()
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
    },
    readTime:[{
        slot:{
             type:Date,
             default:Date.now()
        }
    }]
})
dataStructure.methods.addFavourite = async function(){
    this.favourite = true;
    await this.save();
    return this;
}
dataStructure.methods.addTime = async function() {
    const date = Date.now();
    console.log(date)
    this.readTime = this.readTime.concat({slot:date});
    await this.save()
    return this;
}
const Data = mongoose.model("Data",dataStructure);
module.exports = Data;