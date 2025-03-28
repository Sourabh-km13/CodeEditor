import React, { useState } from 'react'
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import FileIcon from '../../atoms/fileicon/FileIcon';
import { useEditorSocketStore } from '../../../store/editorSocketStore';
import { useFileContextMenu } from '../../../store/fileContextMenuStore';
export default function Tree({ fileFolderData }) {

    const { editorSocket } = useEditorSocketStore()
    const {
        setIsOpen:setFileContextMenuIsOpen,
        setX:setFileContextMenuX,
        setY:setFileContextMenuY,
        setFile
    } = useFileContextMenu()

    const [visibility, setVisibility] = useState({})
    function toggleVisibility(name) {
        console.log(name);

        setVisibility({
            ...visibility,
            [name]: !visibility[name]
        })
    }
    function computeExtension(fileFolderData) {
        const names = fileFolderData.name.split('.')
        return names[names.length - 1]

    }

    function handleDoubleClick(fileData) {
        
        editorSocket.emit('readFile',{
            filePath: fileData.path
        })
    }
    function handleContextMenuForFile(e , path){
        e.preventDefault()
        setFile(path)
        setFileContextMenuX(e.clientX)
        setFileContextMenuY(e.clientY)
        setFileContextMenuIsOpen(true)
    }
    return (
        (fileFolderData && <div
            style={{
                paddingLeft: "15px",
                color: "white"

            }}
        >
            {fileFolderData.children ? (
                <button
                    onClick={() => { toggleVisibility(fileFolderData.name) }}
                    style={{
                        border: 'none',
                        outline: 'none',
                        cursor: 'pointer',
                        color: 'white',
                        backgroundColor: 'transparent',
                        paddingTop: '8px',
                        fontSize: '16px'

                    }}
                >
                    <IoIosArrowForward style={{ height: "10px", width: "10px" }} />
                    {fileFolderData.name}
                </button>
            ) : (
                <div
                    onDoubleClick={() => handleDoubleClick(fileFolderData)}
                    style={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                    <FileIcon extension={computeExtension(fileFolderData)} />
                    <p
                        style={{
                            fontSize: '15px',
                            paddingTop: '8px',
                            cursor: 'pointer',
                            marginLeft: '5px'
                        }}
                        onContextMenu={(e)=>handleContextMenuForFile(e,fileFolderData.path)}
                    >
                        {fileFolderData.name}
                    </p>
                </div>

            )}
            {visibility[fileFolderData.name] && fileFolderData.children && (
                fileFolderData.children.map((child) => {
                    return (
                        <Tree
                            fileFolderData={child}
                            key={child.name}
                        />
                    )
                })
            )}

        </div>)
    )

}
