import dotenv from "dotenv";
import express from 'express'
import config from 'config'
import log from "./utils/logger";
import router from './routes'


dotenv.config()

const app = express()
const PORT = Number(process.env.PORT) || 8000;

app.use('/api', router)


app.listen(PORT, () => {
    log.info("Server listening on port: " + PORT)

    // connectDb()
})