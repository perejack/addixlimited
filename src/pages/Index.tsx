import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductCategories from "@/components/ProductCategories";
import FeaturedProducts from "@/components/FeaturedProducts";
import CompanyStory from "@/components/CompanyStory";
import Testimonials from "@/components/Testimonials";
import LatestArticles from "@/components/LatestArticles";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ProductCategories />
      <FeaturedProducts />
      <CompanyStory />
      <Testimonials />
      <LatestArticles />
      <Footer />
    </div>
  );
};

export default Index;
