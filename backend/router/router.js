import express from 'express'
import { delData, editData, getData, register, searchData } from '../controller/controller.js'
const router = express.Router()


router.post("/register", register)
router.get("/get-data", getData)
router.put("/edit-data/:id", editData)
router.delete("/del-data/:id", delData)
router.get("/search", searchData)

export default router