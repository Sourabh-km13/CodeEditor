import Docker  from "dockerode";
import { log } from "node:console";


const docker = new Docker();
export const listContainer = async()=>{
    const containers = await docker.listContainers();
    containers.forEach((con)=>{
        console.log(con.Ports);
        
    })
}
export const handleContainerCreate = async (projectId, webSocket, req, tcpSocket ,head) => {
    
    

    console.log('projectId received after container connection', projectId);
    try {
        const container = await docker.createContainer({
            Image: 'sandbox',
            AttachStdin: true,
            AttachStdout: true,
            AttachStderr: true,
            Cmd: ['/bin/bash'],
            Tty: true,
            User: 'sandbox',
            ExposedPorts: {
                '5173/tcp': {}
            },
            Env: ['HOST=0.0.0.0'],

            HostConfig: {
                Binds: [//mounting the project directory in the container
                    `${process.cwd()}/projects/${projectId}:/home/sandbox/app`
                ],
                PortBindings: {
                    '5173/tcp': [
                        {
                            'HostPort': '0'
                        }
                    ]
                },
                
            },
        })
        console.log("container created", container.id);
        await container.start()

        console.log('container started successfully');

        
        webSocket.handleUpgrade(req , tcpSocket ,head,(ws)=>{
            console.log('inside handleupgrade');
            
            webSocket.emit("connection",ws , req ,container) 
                    
        })
        tcpSocket.on("error", (err) => {
            console.error("Socket error:", err);
        });

    } catch (error) {
        console.log('error while creating container', error);

    }


}
