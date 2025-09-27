import Navbar from './Components/Nav/Navbar.jsx'
import Hero from './Components/CardsHero/HeroSection.jsx'
import About from './Components/CardsHero/About.jsx'
import Features from './Components/CardsHero/Features.jsx'
import Story from './Components/CardsHero/Story.jsx'
import Contact from './Components/CardsHero/Contact.jsx'
import Footer from './Components/Nav/Footer.jsx'
import CmsCard from './Components/CardsHero/CmsCard.jsx'
import FontPreview from './Components/CardsHero/FontPreview.jsx'

const App = () => {
  return (
    <main className='min-h-screen w-screen overflow-x-hidden'>
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Story />
      <Contact />
      <FontPreview />
      <CmsCard />
      <Footer />
    </main>
  )
}

export default App
