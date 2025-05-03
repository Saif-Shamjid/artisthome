
import './App.css'
import CategorySection from './components/CategorySection'
import CustomOrdersSection from './components/CustomOrderSection'
import FacebookCommerceSection from './components/FacebokkCommerceSection'
import FeaturedCollection from './components/FeaturedCollection'
import ArtisanFooter from './components/Footer'
import HeroSection from './components/HeroSection'
import Navbar from './components/NavBar'

function App() {

  return (
    <>
      <Navbar></Navbar>
      <HeroSection></HeroSection>
      <CategorySection></CategorySection> 
      <FeaturedCollection></FeaturedCollection>
      <CustomOrdersSection></CustomOrdersSection>
      <FacebookCommerceSection></FacebookCommerceSection>
      <ArtisanFooter></ArtisanFooter>
    </>
  )
}

export default App
