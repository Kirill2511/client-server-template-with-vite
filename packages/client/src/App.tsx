import { useEffect } from 'react'
import './App.css'
import './styles/style.scss'
//import { LeaderPage } from './components/leaderboard/leaderPage/leaderpage'
import { PhorumMainPage } from './components/phorum/phorum-main-page/phorum-main-page'

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
  return <PhorumMainPage />
}

export default App
