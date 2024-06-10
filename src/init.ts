import dotenv from "dotenv";
import express, {Express} from "express";
import helmet from "helmet";
import morgan from "morgan";
import router from "./router";
import {isAuthorised} from "./security/auth";

export default function init(): express.Express {
    const app: Express = express();

    app.use(helmet())
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
    app.use(express.json())
    app.use(isAuthorised)

    router(app)

    return app
}
