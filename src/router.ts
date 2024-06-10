import health from "./controllers/health";
import express from "express";
import {handleJobCreate, getValidationRules} from "./controllers/job/create.job";

export default function router(app: express.Express): void {
    app.get("/", health);
    app.post("/", getValidationRules(), handleJobCreate)
}