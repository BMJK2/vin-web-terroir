import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WineShowcase from "@/components/WineShowcase";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <WineShowcase />
      <Footer />
    </div>
  );
};

export default Index;
