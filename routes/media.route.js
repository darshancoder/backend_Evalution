require("dotenv").config()
const express = require("express")
const {MediaModel} = require("../model/media.model")
const mediaRouter = express.Router()

mediaRouter.get("/", async (req,res) => {
    const {userID} = req.body
    try{
        const allData = await MediaModel.find({userID:userID})
        res.send(allData)
    }catch(e){
        res.send(e.message)
    }
})


mediaRouter.post("/create", async (req,res) => {
    try{
        const payload = req.body
        await MediaModel.create(payload)
        res.send({"Res":"Your Todos Created"})

    }catch(e){
        res.send(e.message)
    }
})


mediaRouter.patch("/update/:id", async (req,res) => {
    const todoId = req.params.id
    const payload = req.body

    try{
        const user = await MediaModel.findOne({_id:id})
        if(user.userID === req.body.userID){
            await MediaModel.findByIdAndUpdate({_id:id},payload)
            res.send({"MSG":"Post Updated Successfully.."})
        }else{
            res.send({"MSG":"Nott Authorized"})
        }

    }catch(e){
        res.send(e.message)
    }
})


mediaRouter.delete("/delete/:id",async (req,res)=> {
    const id = req.params.id
    try{
        const post = await MediaModel.findOne({_id:id})
        const userID = req.body.userID
        if(userID !== post.userID){
            res.send({"Msg":"Not Authorized"})
        }else{
            await MediaModel.findByIdAndUpdate({_id:id})
            res.send({"MSG":"Deleted Successfully"})
        }

    }catch(e){
        res.send(e.message)
    }
})


module.exports = {mediaRouter}