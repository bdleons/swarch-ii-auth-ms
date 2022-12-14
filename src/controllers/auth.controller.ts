import { NextFunction, Request, Response, Router } from "express";
import { IUserCreate , IUserLogin} from "../interfaces/user.interface";
import { createUser, getUserByUsername } from "../repositories/user.repository";
import * as argon2 from "argon2";
import { generateJWTToken, verifyJWTToken } from "../services/jwt.service";

const router = Router();

router.post("/signUp", async(req: Request, res:Response, next:NextFunction) => {
    try{
        const body = req.body as IUserCreate;
        body.birthDate = new Date(body.birthDate);

        const hashedPassword = await argon2.hash(body.password);

        body.password = hashedPassword;

        const user = await createUser(body);

        res.status(201).json({message: "User Created"});

    }catch(err){
        next(err);
    }
});

router.post("/login", async(req: Request, res:Response, next:NextFunction) => {
    try{
        const body = req.body as IUserLogin;

        const user = await getUserByUsername(body.username);
        
        if(!user){
            res.status(404).json({message: "User not found"});
        }else{
            const passwordValid = await argon2.verify(user.password, body.password);
            if(passwordValid){
                const jwtToken = generateJWTToken({id: user.id, username: user.username, role: user.role});
                res.status(200).json({token: jwtToken});
            }else{
                res.status(401).json({message: "Wrong password"});
            }
        }

        res.status(201);


    }catch(err){
        next(err);
    }
});

router.post("/verifyToken", async(req: Request, res:Response, next:NextFunction) => {
    try{
        const token = req.headers.authorization;
        if(!token){
            res.status(401).json({message: "No token provided"});
        }else{
            verifyJWTToken(res, token);
        }
    }catch(err){
        next(err);
    }

});

export default router;