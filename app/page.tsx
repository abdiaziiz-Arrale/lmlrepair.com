import Hero from "@/components/website/Hero";
import Gallery from "@/components/website/Gallery";
import AboutUs from "@/components/website/AboutUs";
import ChooseUs from "@/components/website/ChooseUs";
import Services from "@/components/website/Services";
import Faqs from "@/components/website/Faqs";
import Header from "@/components/website/header";
import Footer from "@/components/website/footer";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <AboutUs />
      <Services />
      <ChooseUs />
      <Gallery />
      <Faqs />
      <Footer />
    </div>
  );
}
