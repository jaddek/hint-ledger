import init from "./src/init";
init()

import express, { Express, Request, Response } from "express";
import {getProcessEnv as gpe} from "./src/config";
import helmet from "helmet";
import morgan from "morgan";
import {createJob, Job} from "./src/models/jobs.model";
import {ObjectId} from "mongodb";


const app: Express = express();
const port = gpe("PORT", 3000)

app.use(helmet())
app.use(morgan('dev'))
app.use(express.json())

app.get("/", (req: Request, res: Response) => {
    res.json({"health": "ok"});
});

app.post("/", (req: Request, res: Response) => {

    let jsonBody = req.body

    let job: Job = {
        id: new ObjectId(),
        link: jsonBody.link,
        title:jsonBody.title,
        description: jsonBody.description,
        type: jsonBody.type
    };

    createJob(job).then(() => {
        res.status(204)
        res.json({})
    })
})

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});