import {Terminal} from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import "@xterm/xterm/css/xterm.css";
import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';


export default function BrowserTerminal() {
    const terminalRef = useRef(null);
    const socket = useRef(null);
    
    const {projectId:projectIdFromUrl} = useParams()

    useEffect(() => {
        const term = new Terminal({
            cursorBlink:true,
            cursorStyle:'underline',
            fontSize:'16px',
            theme:{
                background:'#141b29',
                foreground:'#f5f5f5',
                cursor:'#00e1fa',
                cursorAccent:'#5e88bf',
                red:"#ff5544",
            },
            fontFamily:'Ubuntu mono',
            convertEol:true,
            
        })
        term.open(terminalRef.current);
        let fitAddon = new FitAddon();
        term.loadAddon(fitAddon);
        fitAddon.fit()

        socket.current = io(`${import.meta.env.VITE_BACKEND_URL}/terminal`,{
            query:{
                projectId:projectIdFromUrl,
            }
        })
        socket.current.on('shell-output',(data)=>{
            term.write(data)
        })
        term.onData((data)=>{
            console.log(data);
            socket.current.emit('shell-input', data)
            
        })

        return ()=>{
            term.dispose()
            socket.current.disconnect()
        }
    }, [])

    return (
        <div
        ref={terminalRef}
        style={{
            width:'100%',
            height:'25vh',
            overflow:'auto'
        }}
        id= 'terminal'
        className='terminal-container'
        >
            
            Terminal
        </div>
    )
}
