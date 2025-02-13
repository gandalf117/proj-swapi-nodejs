import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export const AuthMiddleware = async (req: Request, res: Response, next: Function) => {
    try {
        const jwt = req.cookies['jwt'];

        const payload: any = verify(jwt, process.env.SECRET_KEY);

        if (!payload) {
            return res.status(401).send({
                message: "Unauthorized! Please, go here to login: api/login?username=Anonymous"
            });
        }

        req["user"] = payload.username;

        next();
    } catch (e) {
        return res.status(401).send({
            message: "Unauthorized! Please, go here to login: api/login?username=Anonymous"
        });
    }
}
