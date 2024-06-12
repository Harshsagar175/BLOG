import React from 'react'
import Biography from '../components/Biography'
import Hero from '../components/Hero'
import Department from '../components/Department'
import MessageFrom from '../components/MessageFrom'

const Home = () => {
  return (
    <div>
      <Hero title={"Welcome to ZEE medical"} imageUrl={"/hero.png"} />
      <Biography imageUrl={"/about.png"} />
      <Department />
      <MessageFrom />
    </div>
  )
}

export default Home
