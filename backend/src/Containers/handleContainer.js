import Docker from "dockerode";


const docker = new Docker();

export const handleContainerCreate = async(socket, projectId)=>{
    console.log('projectId received after container connection',projectId);
    try {
        const container = await docker.createContainer({
            Image:'sandbox',
            AttachStdin:true,
            AttachStdout:true,
            AttachStderr:true,
            CMD:['/bin/bash'],
            Tty:true,
            User:'sandbox',
            HostConfig:{
                Binds:[//mounting the project directory in the container
                    `${process.cwd()}/projects/${projectId}:/home/sandbox/app`
                ],
                PortBindings:{
                    '5173/tcp':[
                        {
                            'HostPort':'0'
                        }
                    ]
                },
                ExposedPorts:{
                    '5173/tcp':{}
                },
                Env:['HOST=0.0.0.0']
            },
        })   
        console.log("container created",container.id);
        await container.start()
        console.log('container started successfully');
        
    } catch (error) {
        console.log('error while creating container',error);
        
    }
    
    
}
