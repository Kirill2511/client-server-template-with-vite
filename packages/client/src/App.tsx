import { useEffect } from 'react'
import './App.css'
import './styles/style.scss'
import { Route, Routes } from 'react-router-dom'
//import { PhorumMainPage } from './pages/Phorum/PhorumMain/phorum-main-page'
import { LeaderBoardPage } from './pages/LeaderBoardPage/LeaderBoardPage'
import { PhorumMainPage } from './pages/Phorum/PhorumMainPage/PhorumMainPage'

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
  <Route path="/" element={<LeaderBoardPage />} />
  <Route path="/leaderboard" element={<LeaderBoardPage />} />
  <Route path="/phorum" element={<PhorumMainPage />} />


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
