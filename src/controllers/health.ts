import {Request, Response} from "express";

export default function health(req: Request, res: Response) {
    res.json({"health": "ok"});
}