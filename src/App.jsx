import "./App.css";

import CategorySection from "./components/CategorySection";

import FeaturedCollection from "./components/FeaturedCollection";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/NavBar";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <HeroSection></HeroSection>
      <CategorySection></CategorySection>
      <FeaturedCollection></FeaturedCollection>
    </>
  );
}

export default App;
