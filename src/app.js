"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const logger_1 = __importDefault(require("./utils/logger"));
const routes_1 = __importDefault(require("./routes"));
//dotenv.config()
const app = (0, express_1.default)();
const PORT = config_1.default.get("port");
app.use('/api', routes_1.default);
app.listen(PORT, () => {
    logger_1.default.info("Server listening on port: " + PORT);
    // connectDb()
});
