import { useEffect, useState } from 'react'
import './app.css'

import usePing from './hooks/apis/queries/usePing'

import Router from './routes/Router';



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
    <Router />
  )
}

export default App
