import { ArrowRight, ShoppingBag, TrendingUp, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import adixNewHero from "@/images/adixnewhero.jpeg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={adixNewHero}
          alt="Adix Plastics manufacturing and household products" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/80 to-slate-900/70"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-sky-500/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-cyan-400/15 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 text-white lg:col-span-2 lg:max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-600 via-cyan-500 to-emerald-500 px-6 py-3 rounded-full shadow-lg animate-fade-in">
              <Award className="h-5 w-5" />
              <span className="font-semibold text-sm">Manufacturers of Quality Household Plastics</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">
                  Designed for
                </span>
                <br />
                <span className="text-white">Modern Homes & Businesses</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl leading-relaxed">
                <span className="font-semibold text-sky-400">Durable.</span>{" "}
                <span className="font-semibold text-cyan-300">Functional.</span>{" "}
                <span className="font-semibold text-emerald-300">Made in Nairobi.</span>
              </p>

              <p className="text-lg text-gray-400 max-w-xl">
                From storage containers and kitchenware to industrial-grade plastics, Adix delivers products
                engineered for everyday life and demanding environments.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/shop">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-sky-600 via-cyan-500 to-emerald-500 hover:brightness-110 text-white px-8 py-6 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <Link to="/products">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-6 text-lg rounded-xl transition-all duration-300 hover:scale-105"
                >
                  Browse Products
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
              <div className="space-y-1">
                <div className="text-3xl font-bold text-sky-400">400+</div>
                <div className="text-sm text-gray-400">Household & utility SKUs</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-cyan-300">10+ yrs</div>
                <div className="text-sm text-gray-400">Injection molding experience</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-emerald-300">KEBS</div>
                <div className="text-sm text-gray-400">Certified quality products</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/50 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;