import  fs  from 'fs/promises';

export const handleEditorSocketEvents = (socket ,editorNamespace)=>{
    socket.on('writeFile',async({data,filePath})=>{
        try {
            const response = await fs.writeFile(filePath,data)
            editorNamespace.emit('writeFileSuccess',{
                data: 'file written successfully',
                path:filePath,
            })
        } catch (error) {
            console.log(error);
            socket.emit('error',{
                data:'error writing in file'
            })
                
        }
    })
    socket.on('createFile' , async ({filePath})=>{
        const isFileAlreadyExist= await fs.stat(filePath)
        if(isFileAlreadyExist){
            socket.emit('error',{
                data:'file already exists'
            })
            return;
        }
        try {
            const response = await fs.writeFile(filePath,'');
            socket.emit('createdFileSuccess',{
                data:'file create successfully'
            })
        } catch (error) {
                console.log('error creating file');
                socket.emit('error',{
                    data:'error creating file'
                })
        }
    })

    socket.on('readFile',async ({filePath})=>{
        try {            
            const response = await fs.readFile(filePath);
            
            socket.emit('readFileSuccess',{
                value:response.toString(),
                path:filePath
            })
        } catch (error) {
            console.log('error reading the file',error);
            socket.emit('error',{
                data:'error reading the file'
            })
            
        }
    })
    socket.on('deleteFile',async ({filePath})=>{
        try {
            const response = await fs.unlink(filePath);
            socket.emit('deleteFileSuccess',{
                data:'file deleted successfully' 
            })  
        } catch (error) {
            console.log('error deleting file',error);
            socket.emit('error',{
                data:'error deleting the file',
            })        
        }
        
    })
    socket.on('createFolder',async({folderPath})=>{
        try {
            const response = await fs.mkdir(folderPath)
            socket.emit('createFolderSuccess',{
                data:'folder created successfully'
            })
        } catch (error) {
            socket.emit('error',{
                data:'error in creating folder'
            })
        }
    })
    socket.on('deleteFolder',async({folderPath})=>{
        try {
            const response = await fs.rmdir(folderPath,{recursive:true})
            socket.emit('deleteFolderSuccess',{
                data:'folder deleted successfully'
            })
        } catch (error) {
            console.log(error);
            
            socket.emit('error',{
                data:'error in deleting folder'
            })
        }
    })
}