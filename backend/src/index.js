import express, { urlencoded } from "express"
import { PORT } from "./config/serverconfig.js"
import cors from "cors"
import apiroute from "./router/index.js"
import { Server } from "socket.io"
import { createServer } from "node:http"
import chokidar from "chokidar"
import path from "path"
import { handleEditorSocketEvents } from "./socketHandlers/editorHandler.js"
import { handleContainerCreate } from "./Containers/handleContainer.js"

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
})

const terminalNamespace = io.of('/terminal')
terminalNamespace.on('connection',(socket)=>{
    const projectId = socket.handshake.query.projectId
    console.log('terminal connected');
    socket.on('disconnect',()=>{
        console.log('terminal disconnected');
    })
    socket.on('shell-input',(data)=>{
        socket.emit('shell-output',data)
    })
    handleContainerCreate(socket , projectId)
})

server.listen(3000, () => {
    console.log(`server is running on port:${PORT}`)
    console.log(process.cwd());
    
})
