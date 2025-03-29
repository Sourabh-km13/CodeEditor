import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CodeEditor from '../components/molecule/editor/Editor'
import { EditorButton } from '../components/atoms/EditorButton/EditorButton'
import TreeStructure from '../components/organism/treeStructure/TreeStructure'
import { useTreeStructureStore } from '../store/treeStructureStore'
import { useEditorSocketStore } from '../store/editorSocketStore'
import io from 'socket.io-client'
import BrowserTerminal from '../components/molecule/BrowserTerminal/BrowserTerminal'

export default function Project() {
  const { projectid: projectidfromurl } = useParams()
  const { setEditorSocket } = useEditorSocketStore();
  const { setProjectId, ProjectId } = useTreeStructureStore()

  useEffect(() => {

    if (projectidfromurl) {
      setProjectId(projectidfromurl)

      const editorSocketCon = io(`${import.meta.env.VITE_BACKEND_URL}/editor`, {
        query: {
          projectId: projectidfromurl
        }
      })
      setEditorSocket(editorSocketCon)
    }
  }, [])
  return (

    <>
      <div style={{ display: 'flex' }}>
        {ProjectId && (
          <div
            style={{
              backgroundColor: '#333643',
              paddingRight: '10px',
              minWidth: '250px',
              paddingTop: '0.3vh',
              maxWidth: '25%',
              height: '99.7vh',
              overflow: 'auto'
            }}>
            <TreeStructure />
          </div>
        )}
        <CodeEditor />
      </div>

      <EditorButton isActive={true} />
      <EditorButton isActive={false} />
      <div>
        <BrowserTerminal/>
      </div>
    </>

  )
}
