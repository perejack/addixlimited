import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Shop = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Shop Online</h1>
        <p className="text-muted-foreground max-w-2xl mb-6">Browse our full catalogue of quality plastic products.</p>
        <Button asChild>
          <Link to="/products">Go to Products</Link>
        </Button>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
