import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const Testimonials = () => {
  const testimonials = [
    {
      name: "James Kimani",
      timeAgo: "2 weeks ago",
      rating: 5,
      review: "Adix Plastics has been our reliable partner for over a year. Their household plastic products are top quality and delivery is always on time. Highly recommended!",
      avatar: "👨‍💼",
      business: "Kimani Supermarket"
    },
    {
      name: "Grace Wanjiru", 
      timeAgo: "1 month ago",
      rating: 5,
      review: "Best distributor in Nairobi! Their bulk order prices are unbeatable and the customer service is exceptional. They truly understand retail business needs.",
      avatar: "👩‍💼",
      business: "Grace Retail Store"
    },
    {
      name: "Mohamed Hassan",
      timeAgo: "3 weeks ago", 
      rating: 5,
      review: "Professional service and a wide plastic range. Adix has everything we need for our shop. The ordering process is smooth and hassle-free.",
      avatar: "👨",
      business: "Hassan General Store"
    },
    {
      name: "Lucy Akinyi",
      timeAgo: "1 week ago",
      rating: 5, 
      review: "Reliable, accessible, and affordable - exactly as promised! Their household products section is excellent. We've increased our profit margins since partnering with them.",
      avatar: "👩",
      business: "Akinyi Traders"
    }
  ];

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              ⭐ Client Testimonials
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by Retailers Across Kenya
            </h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <span className="text-2xl font-bold text-blue-600">5.0</span>
                <div className="flex">
                  {renderStars(5)}
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                powered by <span className="font-semibold">Google</span>
              </div>
            </div>
          </div>
          
          <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            Write Review →
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-background rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300"
            >
              {/* Google logo */}
              <div className="flex justify-end mb-4">
                <div className="text-xl">🔍</div>
              </div>

              {/* Customer info */}
              <div className="flex items-center gap-3 mb-4">
                <div className="text-2xl">{testimonial.avatar}</div>
                <div>
                  <h4 className="font-semibold text-sm">{testimonial.name}</h4>
                  <p className="text-xs text-blue-600 font-medium">{testimonial.business}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.timeAgo}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Review */}
              <p className="text-sm text-muted-foreground">
                {testimonial.review}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;