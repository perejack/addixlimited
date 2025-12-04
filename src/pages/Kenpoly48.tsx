import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Kenpoly48 = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">KENPOLY @ 48</h1>
        <p className="text-muted-foreground max-w-2xl">Celebrating 48 years of innovation and quality in plastics manufacturing.</p>
      </main>
      <Footer />
    </div>
  );
};

export default Kenpoly48;
