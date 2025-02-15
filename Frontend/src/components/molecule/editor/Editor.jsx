import React, { useState } from 'react'
import Editor from '@monaco-editor/react'
import { useEffect } from 'react'
import axios from 'axios'
export default function CodeEditor() {
    const[editorState,setEditorState]=useState({theme:null})
    async function downloadTheme(){
      const response = await fetch('/Dracula.json')
      const data = await response.json();
      setEditorState({...editorState,theme:data})
      
    }
    useEffect(()=>{
        downloadTheme();
    },[])
    function handleEditorTheme(editor, monaco){
        monaco.editor.defineTheme('dracula',editorState.theme)
        monaco.editor.setTheme('dracula')
    }
  return (
    <>
    {editorState.theme &&
    <Editor
        width="100%"
        height="100vh"
        defaultLanguage="javascript"
        value="//Welcome to playground"
        theme="vs-dark"
        options={{
          fontSize:16,
          fontFamily:'monospace',
        }}
        onMount={handleEditorTheme}
      />
      }
    </>    
  )
}
