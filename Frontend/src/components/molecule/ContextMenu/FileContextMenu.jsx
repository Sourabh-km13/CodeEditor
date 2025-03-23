import { useFileContextMenu } from "../../../store/fileContextMenuStore";
import './FileContextMenu.css'
import { useEditorSocketStore } from './../../../store/editorSocketStore';

export default function FileContextMenu({
    x,
    y,
    path
    }) {

    const{editorSocket} = useEditorSocketStore()
    const {setIsOpen} = useFileContextMenu()

    
    function handleFileDelete(e) {
        e.preventDefault()
        editorSocket.emit('deleteFile',{
            filePath:path
        })
        
    }

    function handleMouseLeave(){
        setIsOpen(false)
    }
    return (
        <div
            className="fileContextOptionsWrapper"
            onMouseLeave={handleMouseLeave}
            style={{
                left: x,
                top: y,
            }}
        >
            <button
            className="fileContextButton"
            onClick={(e)=>handleFileDelete(e)}
            >
                delete
            </button>
            
            <button
            className="fileContextButton"
            >
                rename
            </button>
        </div>
    )
}
