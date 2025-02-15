import React from 'react'
import { useParams } from 'react-router-dom'
import CodeEditor from '../components/molecule/editor/Editor'
import { EditorButton } from '../components/atoms/EditorButton/EditorButton'
import TreeStructure from '../components/organism/treeStructure/TreeStructure'

export default function Project() {
  const {projectid}=useParams()
  return (
    <div>Project id is : {projectid}
    <EditorButton isActive={true}/>
    <EditorButton isActive={false}/>
    <CodeEditor />
    <TreeStructure/>
    </div>
    
  )
}
