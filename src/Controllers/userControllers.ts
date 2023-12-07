    import { Request, Response } from "express";

    import UserModel from "../Models/userModels";

    export const signup = async (req: Request, res: Response) => {
        try {
            const { fullname, email, password, confirmPassword,phoneNumber } = req.body;

            if (!email || !password) return res.status(400).json({
                message: "email and/or password is required"
            })

            const existingUser = await UserModel.findOne({ email: email })

            if (existingUser) {
                return res.status(400).json({
                    message: "User already exists"
                })
            } else {
                const user = await UserModel.create({
                    fullname,
                    email,
                    password,
                    confirmPassword,
                    phoneNumber
                })

                if(user){
                    return res.status(201).json({
                        user
                    })
                }

            }



        } catch (error) {
            res.status(500).json({
                message: (error as Error).message,
            })
        }
    }

    export const signin = async (req:Request, res:Response)=>{
        const { email, password } = req.body as { email: string; password: string };;

        try {
            const token = await UserModel.matchPassword(email,password);

            // If the password matches, you can return a success response or perform additional actions.
            // For example, you can generate a token for authentication and send it back in the response.

            // Return a success response with a token or other information.
            res.cookie('token', token, { httpOnly: true });
            
            res.status(200).json({ message: 'Signin successful',token  });
        } catch (error) {
            // If the password does not match or the user is not found, return an error response.
            res.status(401).json({ message: 'Signin failed', error: (error as Error).message });
        }
    };

    export const logout=async (req:Request,res:Response)=>{
        res.clearCookie('token');
        res.json({
            message:"Logged Out Successfully"
        })
    }
    