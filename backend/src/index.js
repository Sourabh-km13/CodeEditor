import express, { urlencoded } from "express"
import { PORT } from "./config/serverconfig.js"
import cors from "cors"
import apiroute from "./router/index.js"
import { Server } from "socket.io"
import { createServer } from "node:http"
import chokidar from "chokidar"
import { handleEditorSocketEvents } from "./socketHandlers/editorHandler.js"
import { WebSocketServer , WebSocket,} from "ws";

import handleTerminalCreation from "./Containers/handleTerminalCreation.js"
import { handleContainerCreate, listContainer } from "./Containers/handleContainer.js"
import { setTimeout } from "node:timers"

console.log(PORT, "port")

const app = express()
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
})

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
app.use("/api", apiroute)
app.get("/ping", (req, res) => {
    return res.json({ message: "pong" })
})

const editorNameSpace = io.of("/editor")
editorNameSpace.on("connection", (socket) => {
    console.log("editor connected")
    const projectId = socket.handshake.query.projectId
    console.log("projectId received after connection", projectId)

    if (projectId) {
        var watcher = chokidar.watch(`./projects/${projectId}`, {
            ignored: (path) => {
                path.includes("node_modules")
            },
            persistent: true,
            awaitWriteFinish: {
                stabilityThreshold: 2000,
            },
            ignoreInitial: true,
        })
        watcher.on("all", (event, path) => {
            console.log(event, path)
        })
    }
    handleEditorSocketEvents(socket, editorNameSpace)
    socket.on('getPort',()=>{
        console.log('port received');
        listContainer()
        
    })
})



server.listen(3000, () => {
    console.log(`server is running on port:${PORT}`)
    
    
})

const webSocketForTerminal = new WebSocketServer({
    noServer:true,

})  
server.on('upgrade',(req, tcpSocket ,head)=>{
    
    const isTerminal = req.url.includes('/terminal')
    if (isTerminal) {
        console.log("✅ WebSocket upgrade for terminal");
        const projectId = new URLSearchParams(req.url.split("?")[1]).get("projectId");
        console.log(projectId,'inside upgrade requesr');
        
            handleContainerCreate(projectId,webSocketForTerminal,req,tcpSocket,head)
        }
    else{
        
        console.log('unwanted req');
        
    }
    
})
webSocketForTerminal.on('connection',(ws ,req ,container)=>{
    console.log('terminal connected');
    handleTerminalCreation(container,ws)
    ws.on('close',()=>{
        container.remove({force :true},(err , data)=>{
            if(err){
                console.log('error while removing container',err); 
            }
            
                console.log('container removed');
                
        })
    })
})

