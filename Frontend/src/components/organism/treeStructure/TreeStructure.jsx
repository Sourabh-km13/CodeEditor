
import { useTreeStructureStore } from "../../../store/treeStructureStore"
import { useEffect } from "react";
import Tree from "../../molecule/TreeNode/TreeNode";
import { useFileContextMenu } from "../../../store/fileContextMenuStore";
import FileContextMenu from "../../molecule/ContextMenu/FileContextMenu";


export default function TreeStructure() {
    const {treeStructure,setTreeStructure,ProjectID}=useTreeStructureStore()    
    const{
          file,
          isOpen:isFileContextOpen ,
          x: fileContextX,
          y: fileContextY
        } = useFileContextMenu()


    useEffect(()=>{
      if(treeStructure){
        
      }
      else{
        setTreeStructure(ProjectID)
      }
    },[setTreeStructure ,treeStructure])
  return (
    <>
      {
        isFileContextOpen&& fileContextX&& fileContextY &&
        <FileContextMenu 
          x={fileContextX}
          y={fileContextY}
          path={file}
        />
      }
      {treeStructure && <Tree fileFolderData={treeStructure.data}/>} 
    </>
  )
}
