import express,{ Request,Response,Router } from "express";
import { signup,signin,logout } from "../Controllers/userControllers";

const userRouter:Router = express.Router();

userRouter.use(express.json())

userRouter.post('/signup',signup)
userRouter.post('/login',signin)
userRouter.get('/logout',logout)

export default userRouter;
