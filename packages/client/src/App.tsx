import { useEffect } from 'react'
import './styles/style.scss'
import { LeaderPage } from './components/leaderboard/leaderPage/leaderpage'

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
  return <LeaderPage />
}

export default App
