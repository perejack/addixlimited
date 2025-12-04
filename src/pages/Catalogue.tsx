import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const Catalogue = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Download Catalogue</h1>
        <p className="text-muted-foreground max-w-2xl mb-6">Download our latest product catalogue to explore our full range.</p>
        <Button asChild className="bg-secondary hover:bg-secondary-light">
          <a href="#" download>
            Download PDF
          </a>
        </Button>
      </main>
      <Footer />
    </div>
  );
};

export default Catalogue;
