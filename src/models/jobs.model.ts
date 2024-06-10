import {ObjectId} from 'mongodb';
import db from '../db/connection'


export type Job = {
    id: ObjectId
    link: string,
    title: string,
    description: string,
    type: string
}

const collection = 'jobs';

export const getJobs =
    async (): Promise<Job[]> => {
        return await db
            .collection<Job>('jobs')
            .find()
            .toArray();
    };

export const createJob =
    async (job: Job): Promise<ObjectId | null> => {
        const result = await db
            .collection<Job>('jobs')
            .insertOne(job);
        return result.insertedId ? result.insertedId : null;
    };

export const updateJob =
    async (job: Job): Promise<boolean> => {
        const result = await db
            .collection<Job>(collection)
            .updateOne({ id: job.id }, { $set: job });
        return result.modifiedCount === 1;
    };

