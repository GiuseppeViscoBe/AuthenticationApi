import logger from "pino";
import dayjs from "dayjs";
import dotenv from "dotenv";

dotenv.config();  // 🔑 Loads variables from .env

const level = process.env.LOG_LEVEL || "info";

const log = logger({
  transport: {
    target: "pino-pretty",
  },
  level,
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default log;
