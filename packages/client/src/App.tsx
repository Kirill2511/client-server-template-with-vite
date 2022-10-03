import { useEffect, useState } from 'react'
import './App.css'
import Game from './pages/game/game'

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])
  return <div className="App">
    <Game />
  </div>
}

export default App
