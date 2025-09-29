import Navbar from '@components/layout/Navbar.jsx'
import Hero from '@features/hero/components/HeroSection.jsx'
import About from '@features/hero/components/About.jsx'
import Features from '@features/hero/components/Features.jsx'
import Story from '@features/hero/components/Story.jsx'
import Contact from '@features/contact/pages/Contact.jsx'
import Footer from '@components/layout/Footer.jsx'
import CmsCard from '@features/blog/components/CmsCard.jsx'
import FontPreview from '@features/foundry/components/FontPreview.jsx'

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
