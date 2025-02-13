import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';

export const Login = async (req: Request, res: Response) => {
    try {

        const incomingUsername = String(req.query.username) || "";
        let username = process.env.DUMMY_USERNAME;

        // Setup a master user for easier login
        const masterUser = "Anonymous";
        if (incomingUsername.toLowerCase() === masterUser.toLowerCase()) {
            username = masterUser;
        }

        // Simlutate fetching a user from a database and loggin in that user
        if (username.toLowerCase() !== incomingUsername) {
            return res.status(401).send({ message: 'Invalid credentials!' });
        }

        // Generate JWT token with expiration
        const SECRET_KEY = process.env.SECRET_KEY
        if (!SECRET_KEY) {
            throw new Error("SECRET_KEY environment variable is missing.");
        }

        const token = sign({ username }, SECRET_KEY, { expiresIn: '1d' });

        // Set the JWT as an HttpOnly cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });
        
        res.status(200).send({
            message: `You logged in successfully with user: ${username}`
        })
    } catch (error) {
        console.log('error is:', error)
        res.status(500).send({ message: 'An unexpectedverify error occurred. Please try again later.' });
    }
}

export const Logout = async (req: Request, res: Response) => {
    res.cookie('jwt', '', { maxAge: 0 });

    res.status(200).send({
        message: 'You logged out successfully!'
    })
}
