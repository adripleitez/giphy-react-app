import React from 'react'
import Home from '../components/Home';
import "../styles/index.css"

const HomePage = () => {
  return (
    <>
        <title>Giffy | Home</title>
        <h2 className='font-mono text-white text-5xl text-center my-10 tracking-wider'>Trending</h2>
        <Home/>
    </>
  )
}

export default HomePage;