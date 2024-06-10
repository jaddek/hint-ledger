import dotenv from "dotenv";

dotenv.config({path: [".env", ".env.local"], override: true})

import init from "./src/init";
import express from "express";

const app: express.Express = init()
const port = process.env.PORT as string
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});