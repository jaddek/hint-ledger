import {Request, Response} from "express";
import jwt from "jsonwebtoken"

export function isAuthorised(req: Request, res: Response, next: any) {
    const token: string | undefined = req.header('X-Authorisation-Token');
    const client: string | undefined = req.header('X-Authorisation-Client');

    if (client === undefined || token === undefined) {
        return forbidden(res)
    }

    const availableClients: string = process.env.AVAILABLE_CLIENTS || ''

    if (availableClients === '') {
        return forbidden(res)
    }

    if (availableClients.split(',').indexOf(client) === -1) {
        return forbidden(res)
    }

    try {
        jwt.verify(token, process.env.TOKEN_SECRET as string, (error: jwt.VerifyErrors | null, application) => {
            console.log(application)
            if (error) {
                throw new Error('Invalid token');
            }
        });
    } catch {
        return forbidden(res)
    }

    next()
}

function forbidden(res: Response) {
    return res.status(403).json({error: 'Forbidden'})
}

export function generateAccessTokenForCareerCollector() {
    return generateAccessToken('career')
}

function generateAccessToken(application: string) {
    return jwt.sign(
        {application: application},
        process.env.TOKEN_SECRET || '',
        {
            expiresIn: '1m'
        }
    );
}