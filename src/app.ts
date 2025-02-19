import dotenv from "dotenv";
import express from 'express'
import config from 'config'

//dotenv.config()

const app = express()
const PORT = config.get("port")


app.listen(PORT, () => {
    console.log("Server listening on port: " + PORT)
})