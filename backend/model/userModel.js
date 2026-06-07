import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
        name: String,
        email: String,
        phone: String,
        company: String,
        status: String,
        notes: String
    },{
        timestamps : true
    })


const userModel = mongoose.model("users", userSchema)

export default userModel