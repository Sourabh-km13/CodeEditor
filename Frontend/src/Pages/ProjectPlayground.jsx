import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CodeEditor from '../components/molecule/editor/Editor'
import { EditorButton } from '../components/atoms/EditorButton/EditorButton'
import TreeStructure from '../components/organism/treeStructure/TreeStructure'
import { useTreeStructureStore } from '../store/treeStructureStore'
import { useEditorSocketStore } from '../store/editorSocketStore'
import io from 'socket.io-client'
import { BrowserTerminal } from '../components/molecule/BrowserTerminal/BrowserTerminal'
import { useTerminalSocketStore } from '../store/TerminalSocketStore'

export default function Project() {
  const { projectId: projectIdfromurl } = useParams()
  const { setEditorSocket, editorSocket } = useEditorSocketStore();
  const { setprojectId, projectId } = useTreeStructureStore()
  const { setTerminalSocket } = useTerminalSocketStore()

  function fetchPort() {

    editorSocket.emit('getPort')

  }
  useEffect(() => {
      if (projectIdfromurl) {
        setprojectId(projectIdfromurl)
  
        const editorSocketCon = io(`${import.meta.env.VITE_BACKEND_URL}/editor`, {
          query: {
            projectId: projectIdfromurl
          }
        })
        setEditorSocket(editorSocketCon)
      
          const ws = new WebSocket(`ws://${import.meta.env.VITE_BACKEND_URL}/terminal?projectId=${projectIdfromurl}`);
          ws.onopen = () => console.log("✅ WebSocket terminal connected");
          ws.onerror = (err) => console.error("❌ WebSocket error:", err);
          setTerminalSocket(ws);
          console.log(ws)
      }
      


  }, [setprojectId, projectIdfromurl,setEditorSocket, setTerminalSocket])
  return (

    <>
      <div style={{ display: 'flex' }}>
        {projectId && (
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
      <button
      onClick={fetchPort}
      >getPort</button>
      <div>
        <BrowserTerminal />
      </div>
    </>

  )
}
