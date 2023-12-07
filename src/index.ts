import express, { Request, Response } from 'express';
import userRouter from './Routers/userRouter';
import { checkforAuthCookie } from './middlewares/authhelper';
import cookieParser from 'cookie-parser';
const app = express();
const port:Number = 3000;


app.use(express.json());
app.use(cookieParser());

app.use(checkforAuthCookie("token"))
app.use('/users',userRouter)

app.listen(port,()=>{
    console.log(`Server running on https:\\localhost:${port}`);
});
