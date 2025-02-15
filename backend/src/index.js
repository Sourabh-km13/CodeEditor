import express, { urlencoded } from 'express'
import { PORT } from './config/serverconfig.js'
import cors from 'cors'
import apiroute from './router/index.js'

console.log(PORT,'port');

const app = express();
app.use(express.json());
app.use(express.urlencoded())
app.use(cors());

app.use('/api', apiroute);
app.get('/ping',(req,res)=>{
    return res.json({message:'pong'})
})
app.listen(3000 ,()=>{
    console.log(`server is runing on port:${PORT}`);
    
})