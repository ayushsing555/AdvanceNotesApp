const mongoose = require("mongoose");
const db = process.env.DATABASE_NAME;
mongoose.connect(db).then(()=>{
    console.log("database connection successful")
}).catch((error)=>{
    console.log(error)
})
