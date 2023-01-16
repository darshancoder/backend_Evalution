const express = require("express")
const { connection } = require("./config/db")
require("dotenv").config()
const {userRouter} = require("./routes/user.router")
const {authenticate} = require("./middlewares/authenticate.middleware")
const {mediaRouter} = require("./routes/media.route")
const app = express()

app.use(express.json())

app.get("/", (req,res) => {
    res.send("Hello Home page")
})
app.use("/users",userRouter)
app.use(authenticate)

app.use("/post",mediaRouter)

app.listen(process.env.PORT, async () => {
    try{
        await connection
        console.log({MSG:"Mongodb connected successfully!"})
    }catch(e){
        console.log({Error:"MongoDB is connected failed!!!"})
    }
    console.log(`server is running on http://localhost:${process.env.PORT}`)
})