import { useEffect, useState } from 'react'

import './App.css'

import usePing from './hooks/apis/queries/usePing'


function App() {
  const {isPending,data} = usePing();

  
  if(isPending){
    return(
      <div>
        loading ...
      </div>
    )
  }
  return (
    <>
     <div>hello</div>
    </>
  )
}

export default App
