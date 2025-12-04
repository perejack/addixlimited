import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Business = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Business Enquiries</h1>
        <p className="text-muted-foreground max-w-2xl">Partner with us for wholesale and distribution opportunities. Get in touch via the Contact page.</p>
      </main>
      <Footer />
    </div>
  );
};

export default Business;
