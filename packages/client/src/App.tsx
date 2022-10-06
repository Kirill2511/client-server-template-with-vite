import { useEffect } from 'react'
import './App.css'
import './styles/style.scss'
import { LeaderPage } from './components/leaderboard/leaderPage/leaderpage'
import { Route, Routes } from 'react-router-dom'
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
  return  (
    <Routes>
  <Route path="/" element={<LeaderPage />} />
  <Route path="/phorum" element={<PhorumMainPage />} />
  <Route path="/leaderboard" element={<LeaderPage />} />


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
