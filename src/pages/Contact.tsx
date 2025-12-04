import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-muted-foreground max-w-2xl mb-6">Have questions or business enquiries? We're here to help.</p>
        <div className="space-y-2 text-sm">
          <div>Email: info@adixplastics.com</div>
          <div>Phone: +254 729 000 788</div>
          <div>Location: Nairobi, Kenya</div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
