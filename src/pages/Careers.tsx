import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Careers = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Careers</h1>
        <p className="text-muted-foreground max-w-2xl">Join the Kenpoly team. Check back for open positions.</p>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;
