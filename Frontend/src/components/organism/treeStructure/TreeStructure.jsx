import { useParams } from "react-router-dom"
import { useTreeStructureStore } from "../../../store/treeStructureStore"
import { useEffect } from "react";


export default function TreeStructure() {
    const {treeStructure,setTreeStructure}=useTreeStructureStore()
    const {projectid} = useParams();
    useEffect(()=>{
        setTreeStructure(projectid)
    },[projectid])
  return (
    <div>TreeStructure</div>
  )
}
