import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import GifDetail from './pages/GifDetails'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'
import './styles/index.css'

function App() {

  return (
      <section>
          <Router>
            <Routes>
              <Route exact path="/" element={<HomePage/>} />
              <Route exact path="/:number" element={<HomePage/>} />
              <Route exact path="/gif/:id" element={<GifDetail/>}/>
              <Route element={<NotFound/>} path="/:rest/*" />
            </Routes>
          </Router>
      </section>
  );
}

export default App;