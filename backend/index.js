import express from 'express'
import 'dotenv/config.js'
import dbConfig from './dbConfig/dbConfig.js'
import router from './router/router.js'
const app = express()
import cors from 'cors'
dbConfig()
app.use(cors())
app.use(express.json())
app.use('/api', router)

const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log(`Serverv is running on port ${PORT}`);
    
})  