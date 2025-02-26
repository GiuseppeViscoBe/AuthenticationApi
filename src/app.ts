import dotenv from "dotenv";
import express from 'express'
import config from 'config'
import log from "./utils/logger";
import router from './routes'
import connectDb from "./utils/connectDb";


dotenv.config()

const app = express()
const PORT = Number(process.env.PORT) || 8000;

app.use(express.json())

app.use('/api', router)


app.listen(PORT, () => {
    log.info("Server listening on port: " + PORT)

    connectDb()
})