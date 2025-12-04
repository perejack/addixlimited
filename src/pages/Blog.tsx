import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, User, ArrowRight, TrendingUp, Package, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Blog = () => {
  const articles = [
    {
      id: 1,
      title: "Top 10 FMCG Products Every Retailer Should Stock",
      excerpt: "Discover the essential fast-moving consumer goods that drive sales and keep customers coming back to your store.",
      category: "Business Tips",
      date: "Nov 5, 2024",
      author: "Adix Team",
      image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&q=80",
      icon: <ShoppingBag className="h-5 w-5" />
    },
    {
      id: 2,
      title: "How to Maximize Profit Margins in Retail Distribution",
      excerpt: "Learn proven strategies to increase your profit margins while maintaining competitive pricing in the FMCG sector.",
      category: "Profit Tips",
      date: "Nov 3, 2024",
      author: "Business Advisor",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
      icon: <TrendingUp className="h-5 w-5" />
    },
    {
      id: 3,
      title: "The Ultimate Guide to Bulk Ordering for Small Businesses",
      excerpt: "Everything you need to know about bulk ordering: benefits, best practices, and how to get started with wholesale purchasing.",
      category: "Wholesale Guide",
      date: "Oct 30, 2024",
      author: "Supply Chain Expert",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
      icon: <Package className="h-5 w-5" />
    },
    {
      id: 4,
      title: "5 Ways to Improve Your Store's Inventory Management",
      excerpt: "Effective inventory management is crucial for retail success. Here are five strategies to optimize your stock levels.",
      category: "Operations",
      date: "Oct 28, 2024",
      author: "Operations Manager",
      image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80",
      icon: <Package className="h-5 w-5" />
    },
    {
      id: 5,
      title: "Understanding FMCG Market Trends in Kenya 2024",
      excerpt: "Stay ahead of the competition with insights into the latest FMCG market trends and consumer behavior in Kenya.",
      category: "Market Insights",
      date: "Oct 25, 2024",
      author: "Market Analyst",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      icon: <TrendingUp className="h-5 w-5" />
    },
    {
      id: 6,
      title: "Building Strong Relationships with Your Distributor",
      excerpt: "Learn how to create lasting partnerships with distributors that benefit both parties and drive business growth.",
      category: "Partnerships",
      date: "Oct 22, 2024",
      author: "Partnership Manager",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80",
      icon: <ShoppingBag className="h-5 w-5" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-4">
              📚 Adix Insights
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Resources & Insights for Retail Success
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Expert advice, industry trends, and practical tips to help your business thrive in the FMCG sector.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <main className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                  {article.icon}
                  {article.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <h2 className="text-xl font-bold text-foreground group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h2>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {article.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground pt-4 border-t">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {article.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {article.author}
                  </div>
                </div>

                {/* Read More */}
                <Button
                  variant="ghost"
                  className="w-full justify-between group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors"
                >
                  Read Article
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Stay Updated with Industry Insights</h3>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and get the latest FMCG trends, business tips, and exclusive offers delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-xl font-semibold">
              Subscribe
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
