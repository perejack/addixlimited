import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LatestArticles = () => {
  const articles = [
    {
      category: "Plastic Products",
      date: "09 Jul 2025",
      title: "Trusted Plastics for Everyday Use in Nairobi",
      excerpt: "Plastic products play a big role in everyday living. From storing food to organising laundry or hand...",
      image: "/images/articles/plastic-basin.jpg.webp"
    },
    {
      category: "Plastic Products", 
      date: "02 Jul 2025",
      title: "Maintaining Your Multipurpose Plastic Utensils in Naivasha",
      excerpt: "Multipurpose plastic utensils are a big part of daily cooking and food prep. They're used often, put...",
      image: "/images/articles/hans-isaacson-Mpdd1qA12g-unsplash.jpg.webp"
    },
    {
      category: "Plastic Products",
      date: "24 Jun 2025", 
      title: "Fixing Broken Heavy-Duty Plastic Bins in Nakuru Heaps",
      excerpt: "Heavy-duty plastic bins are often put to the test, especially in places with high use like Nakuru. W...",
      image: "/images/articles/annie-spratt-dBuUYGYkfj4-unsplash.jpg.webp"
    },
    {
      category: "Plastic Products",
      date: "24 Jun 2025",
      title: "How to Ensure Kids' Study Tables Are Clean and Hygienic in Kisumu", 
      excerpt: "Keeping kids' study areas clean can feel like an uphill task, especially when there are crayons, sna...",
      image: "/images/articles/getty-images-n6o6sXJON1I-unsplash.jpg.webp"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Latest Articles
          </h2>
          <Button asChild className="bg-secondary hover:bg-secondary-light rounded-xl">
            <Link to="/blog">Visit the Blog →</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article, index) => (
            <article
              key={index}
              className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:scale-105 group cursor-pointer"
            >
              {/* Article Image */}
              <div className="bg-muted h-48 flex items-center justify-center overflow-hidden">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover" loading="lazy" />
              </div>

              {/* Article Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <span>{article.category}</span>
                  <span>•</span>
                  <span>{article.date}</span>
                </div>

                <h3 className="font-semibold text-lg mb-3 group-hover:text-primary transition-colors leading-tight">
                  {article.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {article.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestArticles;