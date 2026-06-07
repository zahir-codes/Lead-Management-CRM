import mongoose from "mongoose"

const dbConfig = async()=>{
    const conn = await mongoose.connect("mongodb://localhost:27017/InstawebLab")
    if(conn) console.log('Database connected Successfully...');
    
}
export default dbConfig