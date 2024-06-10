import dotenv from "dotenv";

dotenv.config({path: [".env", ".env.local"], override: true})

import init from "./src/init";
import express from "express";
import {getProcessEnv as gpe} from "./src/config";

const app: express.Express = init()
const port = gpe("PORT", 3000)
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});