import {Request, Response} from "express";
import {ObjectId} from "mongodb";
import {createJob as modelCreateJob, Job} from "../../models/jobs.model";
import {checkSchema, validationResult} from 'express-validator';

export function handleJobCreate(req: Request, res: Response) {

    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.send({errors: result.array()});
    }

    let jsonBody = req.body;

    let job: Job = {
        id: new ObjectId(),
        link: jsonBody.link,
        title: jsonBody.title,
        description: jsonBody.description,
        type: jsonBody.type
    };

    return modelCreateJob(job).then(() => {
        res.status(204)
        return res.json({})
    })
}

export function getValidationRules() {
    return checkSchema({
        title: {
            notEmpty: true,
            isString: true,
        },
        type: {
            notEmpty: true,
            isString: true
        },
        description: {
            notEmpty: true,
            isString: true
        },
        link: {
            notEmpty: true,
            isString: true,
            isUrl: undefined
        }
    });
}
