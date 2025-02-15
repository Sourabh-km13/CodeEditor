import React from 'react'
import { useParams } from 'react-router-dom'
import CodeEditor from '../components/molecule/editor/Editor'
import { EditorButton } from '../components/atoms/EditorButton/EditorButton'

export default function Project() {
  const {projectid}=useParams()
  return (
    <div>Project id is : {projectid}
    <EditorButton isActive={true}/>
    <EditorButton isActive={false}/>
    <CodeEditor />
  
    </div>
    
  )
}
