import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import InteractiveProductShowcase from '../components/InteractiveProductShowcase';
import IfoodIntegration from '../components/IfoodIntegration';
import SavingsCalculator from '../components/SavingsCalculator';
import FeaturesGrid from '../components/FeaturesGrid';
import GastronomyPresets from '../components/GastronomyPresets';
import PricingSection from '../components/PricingSection';
import FaqSection from '../components/FaqSection';
import CtaBanner from '../components/CtaBanner';
import Footer from '../components/Footer';
export default function LandingPage() {
  return <><a href="#conteudo" className="skip-link">Pular para o conteúdo</a><Navbar /><main id="conteudo"><Hero /><InteractiveProductShowcase /><IfoodIntegration /><FeaturesGrid /><GastronomyPresets /><SavingsCalculator /><PricingSection /><FaqSection /><CtaBanner /></main><Footer /></>;
}
