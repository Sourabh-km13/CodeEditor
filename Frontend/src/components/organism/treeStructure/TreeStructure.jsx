
import { useTreeStructureStore } from "../../../store/treeStructureStore"
import { useEffect } from "react";
import Tree from "../../molecule/TreeNode/TreeNode";


export default function TreeStructure() {
    const {treeStructure,setTreeStructure,ProjectID}=useTreeStructureStore()    
    
    useEffect(()=>{
      if(treeStructure){
        console.log('treeStructure:',treeStructure);
        
      }
      else{
        setTreeStructure(ProjectID)
      }
    },[setTreeStructure ,treeStructure])
  return (
    <>
      {treeStructure && <Tree fileFolderData={treeStructure.data}/>} 
    </>
  )
}
