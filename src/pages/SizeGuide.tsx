import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SizeGuide = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Size Guide</h1>
        <p className="text-muted-foreground max-w-2xl">Guidance on sizes and dimensions for selected products.</p>
      </main>
      <Footer />
    </div>
  );
};

export default SizeGuide;
