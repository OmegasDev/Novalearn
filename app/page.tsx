import Hero from "./components/Hero";
import Books from "./components/Books";
import Offer from "./components/Offer";
import Affiliate from "./components/Affiliate";
import SaaS from "./components/SaaS";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Books />
      <Offer />
      <Affiliate commissionRate={0} />
      <SaaS />
      <Footer />
    </main>
  );
}


