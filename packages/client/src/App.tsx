import { useEffect } from 'react'
import './App.css'
import './styles/style.scss'
import { Route, Routes } from 'react-router-dom'
//import { PhorumMainPage } from './pages/Phorum/PhorumMain/phorum-main-page'
import { LeaderBoardPage } from './pages/LeaderBoardPage/LeaderBoardPage'
import { PhorumMainPage } from './pages/Phorum/PhorumMainPage/PhorumMainPage'
import { PhorumPost } from './components/Phorum/PhorumThreadPage/__Post/PhorumPost'
import { PhorumThreadPage } from './pages/Phorum/PhorumThreadPage/PhorumThreadPage'

import { HowToPlay } from './pages/HowTo/HowToPlayPage'

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
  return  (
    <Routes>
  <Route path="/" element={<PhorumMainPage />} />
  <Route path="/leaderboard" element={<LeaderBoardPage />} />
  <Route path="/phorum" element={<PhorumMainPage  />} />
  <Route path="/phorum/thread" element={<PhorumThreadPage title="Какие у кого стратегии при игре в тетрис?"/>} />
  <Route path="/profile" element={<PhorumMainPage />} />
  <Route path="/rules" element={<HowToPlay />} />

</Routes>
  );
}

export default App

{/* <Routes>
<Route path="/" >
  <LeaderPage />
  </Route> 
  <Route path="/phorum" >
  <PhorumMainPage />
  </Route> 
  <Route path="/leaderboard" >
  <LeaderPage />
  </Route> 

</Routes> */}
