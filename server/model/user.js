const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userstructure = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createTime:{
        type:Date,
        default:Date.now()
    },
    password: {
        type: String,
        required: true
    },
    identification: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    AllData: [{
            id: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            text: {
                type: String,
                required: true
            }
    }],
    tokens: [{
        token: {
            type: String,
            required: true
        },
        time:{
            type:Date,
            default:Date.now()
        }
    }]
});
userstructure.methods.addData = async function (name, text, generateID) {
    this.AllData = this.AllData.concat({ id: generateID, name: name, text: text });
    await this.save();
    return this.AllData;
}
userstructure.methods.generateToken = async function (next) {
    const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token ,time:Date.now() });
    this.save();
    return token;
}
userstructure.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
})
const User = mongoose.model("USER", userstructure);
module.exports = User;