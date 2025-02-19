import React ,{useEffect} from 'react'
import { useParams } from 'react-router-dom'
import CodeEditor from '../components/molecule/editor/Editor'
import { EditorButton } from '../components/atoms/EditorButton/EditorButton'
import TreeStructure from '../components/organism/treeStructure/TreeStructure'
import { useTreeStructureStore } from '../store/treeStructureStore'

export default function Project() {
  const {projectid:projectidfromurl}=useParams()
 
  
  const {setProjectId,ProjectId} = useTreeStructureStore()
  useEffect(() => {
    setProjectId(projectidfromurl)
  }, [])
  return (
    <div>Project id is : {projectidfromurl}
    {ProjectId && (
      <div
      style={{
        backgroundColor:'#333643',
        paddingRight:'10px',
        minWidth:'250px',
        paddingTOp:'0.3vh',
        height:'100vh',
        maxWidth:'25%',
        height:'99.7vh',
        overflow:'auto'
      }}>
        <TreeStructure/>
      </div>
    )}
    <CodeEditor />
    <EditorButton isActive={true}/>
    <EditorButton isActive={false}/>
    </div>
    
  )
}
