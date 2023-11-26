import express, { Request, Response } from 'express';

const app = express();
const port:Number = 3000;

app.listen(port,()=>{
    console.log(`Server running on https:\\localhost:${port}`);
});
