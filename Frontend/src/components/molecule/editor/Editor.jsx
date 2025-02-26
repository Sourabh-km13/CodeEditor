import React, { useState } from 'react'
import Editor from '@monaco-editor/react'
import { useEffect } from 'react'
import { useEditorSocketStore } from '../../../store/editorSocketStore'
import { userActiveTabStore } from '../../../store/activeFileTabStore';
export default function CodeEditor() {

    const {editorSocket} = useEditorSocketStore()
    const {activeFileTab ,setActiveFileTab}  = userActiveTabStore()

    const[editorState,setEditorState]=useState({theme:null})
    async function downloadTheme(){
      const response = await fetch('/Dracula.json')
      const data = await response.json();
      setEditorState({...editorState,theme:data})
      
    }

    editorSocket&&editorSocket.on('readFileSuccess',(data)=>{
      console.log('read file success', data);
      setActiveFileTab(data.path , data.value ,undefined)
    })

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
        width="75%"
        height="100vh"
        defaultLanguage= {undefined}
        defaultValue="//Welcome to playground"
        theme="vs-dark"
        options={{
          fontSize:16,
          fontFamily:'monospace',
        }}
        onMount={handleEditorTheme}
        value={activeFileTab?.value}
      />
      }
    </>    
  )
}
