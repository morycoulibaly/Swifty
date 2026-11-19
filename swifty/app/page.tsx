import Preloader from "@/components/Preloader";
import HeroReveal from "@/components/HeroReveal";
import CategoryShowcase from "@/components/CategoryShowcase";
import FeaturedProducts from "@/components/FeaturedProducts";
import StoresSection from "@/components/StoresSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Preloader />
      <HeroReveal />
      <CategoryShowcase />
      <FeaturedProducts />
      <StoresSection />
      <NewsletterSection />
      <Footer />
    </main>
  );
}
