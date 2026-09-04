import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface Payload {
    id: number;
    email: string;
}

export const generateToken = (payload: Payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: Number(process.env.JWT_EXPIRES_IN) || 86400,
    });

    console.log("Token gerado: ", token); 

    return token;
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET as string);
};
