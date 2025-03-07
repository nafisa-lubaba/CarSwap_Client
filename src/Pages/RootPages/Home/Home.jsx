import CTASection from "./components/CTASection";
import FeaturesSection from "./components/FeaturesSection";
import HeroSection from "./components/HeroSection";
import PopularCars from "./components/PopularCars";


const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSection/>
      <FeaturesSection/>
      <PopularCars/>
      <CTASection/>   
    </div>
  );
};

export default Home;