import express, { urlencoded } from 'express'
import { PORT } from './config/serverconfig.js'
import cors from 'cors'

console.log(PORT,'port');

const app = express();
app.use(express.json());
app.use(urlencoded())
app.use(cors());

app.get('/ping',(req,res)=>{
    return res.json({message:'pong'})
})
app.listen(PORT ,()=>{
    console.log(`server is runing on port:${PORT}`);
    
})