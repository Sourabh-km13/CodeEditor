import { create } from "zustand"
import { userActiveTabStore } from "./activeFileTabStore"
import { useTreeStructureStore } from "./treeStructureStore"

export const useEditorSocketStore = create((set) => ({
    editorSocket: null,
    setEditorSocket: (incomingSocket) => {
        const activeFileTabSetter = userActiveTabStore.getState().setActiveFileTab
        const projectTreeSetter = useTreeStructureStore.getState().setTreeStructure

        incomingSocket?.on("readFileSuccess", (data) => {
            console.log("read file success")
            activeFileTabSetter(data.path, data.value, undefined)
        })

        incomingSocket?.on('writeFileSuccess',(data)=>{
            console.log(data.value);
            incomingSocket.emit('readFile',{
                filePath: data.path,
            })
        })

        incomingSocket?.on('deleteFileSuccess',(data)=>{
            console.log(data);
            projectTreeSetter(); 
        })
        set({
            editorSocket: incomingSocket,
        })
    },
}))
