import React from 'react'
import About from './Components/About.jsx'
import Hero from './Components/HeroSection.jsx'
import Navbar from './Components/Navbar.jsx'
import Features from './Components/Features.jsx'
import Story from './Components/Story.jsx'
import Contact from './Components/Contact.jsx'
import Footer from './Components/Footer.jsx'

const App = () => {
  return (
    <main className='relative min-h-screen w-screen overflow-x-hidden'>
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Story />
      <Contact />
      <Footer />



     
    </main>
  )
}

export default App
