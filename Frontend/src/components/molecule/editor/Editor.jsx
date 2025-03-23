import React, { useState } from 'react'
import Editor from '@monaco-editor/react'
import { useEffect } from 'react'

import { userActiveTabStore } from '../../../store/activeFileTabStore';
import { useEditorSocketStore } from './../../../store/editorSocketStore';
export default function CodeEditor() {


    const {activeFileTab}  = userActiveTabStore()
    const {editorSocket} = useEditorSocketStore()
    const[editorState,setEditorState]=useState({theme:null})
    
    async function downloadTheme(){
      const response = await fetch('/Dracula.json')
      const data = await response.json();
      setEditorState({...editorState,theme:data})
      
    }

    let timerId = null

    function handleChange(value){
      if(timerId!=null){
        clearTimeout(timerId)
      }
      timerId=setTimeout(() => {
        const editorContent = value;
        editorSocket.emit("writeFile",{
          data:editorContent,
          filePath:activeFileTab.path
        })
      }, 2000);

    }
    // function handleChange (value){
    //   const editorContent = value;
    //     editorSocket.emit("writeFile",{
    //       data:editorContent,
    //       filePath:activeFileTab.path
    //     })
    // }
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
        onChange={handleChange}
      />
      }
    </>    
  )
}
