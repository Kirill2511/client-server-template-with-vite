import { useEffect, useState } from 'react'
import './App.css'
import Game from './pages/game'

function App() {
  const [IsGameStarted, setIsGameStarted] = useState(false)
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
    Вот тут будет жить ваше приложение :)
    <button onClick={() => setIsGameStarted(true)}>Начать игру</button>
    {IsGameStarted && <Game />}
  </div>
}

export default App
