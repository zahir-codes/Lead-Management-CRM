import userModel from "../model/userModel.js"
import generateResponse from "../utils/generateResponse.js"

export const register = async(req, res)=>{
    try{
        const {name, email, phone, company, status, notes} = req.body
        const isExist = await userModel.findOne({email})
        if(isExist){
            return generateResponse(res, false, 400, "User Already Registered!", [], true)
        }
        else{
            const data = new userModel({name, email, phone, company, status, notes})
            const result = await data.save()
            return generateResponse(res, true, 200, "User Registered Successfully...", result, false)
        }
    }
    catch(error){
        generateResponse(res ,false, 500, "Internal Server Error!", [], true)
    }
}

export const getData = async(req, res)=>{
    try{
        const isExist = await userModel.find()
        if(isExist){
            return generateResponse(res, true, 200, "Data Get Successfully!", isExist, false)
        }
        else{
            return generateResponse(res, false, 404, "User Not Found...", [], true)
        }
    }
    catch(error){
        generateResponse(res ,false, 500, "Internal Server Error!", [], true)
    }
}

export const editData = async(req, res)=>{
    try{
        const {name, email, phone, company, status, notes} = req.body
        const {id} = req.params
        const isExist = await userModel.updateOne({_id:id}, {$set:{name, email, phone, company, status, notes}})
        if(isExist){
            return generateResponse(res, true, 200, "Data updated Successfully...", isExist, false)
        }
        else{
            return generateResponse(res, false, 404, "User Not Found...", [], true)
        }
    }
    catch(error){
        generateResponse(res ,false, 500, "Internal Server Error!", [], true)
    }
}

export const delData = async(req, res)=>{
    try{
        const {id} = req.params
        const isExist = await userModel.deleteOne({_id:id})
        if(isExist){
            return generateResponse(res, true, 200, "Data deleted Successfully...", isExist, false)
        }
        else{
            return generateResponse(res, false, 404, "User Not Found...", [], true)
        }
    }
    catch(error){
        generateResponse(res ,false, 500, "Internal Server Error!", [], true)
    }
}

export const searchData = async(req, res)=>{
    try{
        const {keyword} = req.query
        const result = await userModel.find({
            $or: [
                {name:{ $regex:keyword, $options:"i" }},
                {email:{ $regex:keyword, $options:"i" }},
                {company:{ $regex:keyword, $options:"i" }}
            ]
        })
        if(result.length === 0){
           return generateResponse(res, true, 404, "User Not Found!", [], false)
        }
        else{
            return generateResponse(res, true, 200, "Data fetched Successfully...", result, false)
        }
    }
    catch(error){
        generateResponse(res, false, 500, "Internal Server Error!", [], true)
    }
}