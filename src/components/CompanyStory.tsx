import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TrendingUp, Users, Package, Award } from "lucide-react";

const CompanyStory = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block bg-sky-100 text-sky-700 px-4 py-2 rounded-full text-sm font-semibold">
                About Adix Plastics
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                Nairobi-based leaders in{" "}
                <span className="bg-gradient-to-r from-sky-600 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
                  household & industrial plastics
                </span>
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Adix Plastics has been manufacturing quality household and utility products in Nairobi for
              over a decade. With modern injection molding facilities and KEBS-certified standards, we
              supply durable plastics trusted by homes, retailers and institutions across Kenya.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Package className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-blue-600">500+</div>
                </div>
                <div className="text-sm text-muted-foreground">Quality Products</div>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm border border-orange-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 text-orange-600" />
                  </div>
                  <div className="text-2xl font-bold text-orange-600">1000+</div>
                </div>
                <div className="text-sm text-muted-foreground">Happy Clients</div>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm border border-green-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-green-600">24/7</div>
                </div>
                <div className="text-sm text-muted-foreground">Support Available</div>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm border border-purple-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Award className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-purple-600">100%</div>
                </div>
                <div className="text-sm text-muted-foreground">Quality Assured</div>
              </div>
            </div>

            <Link to="/about">
              <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 rounded-xl px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                LEARN MORE ABOUT US →
              </Button>
            </Link>
          </div>

          {/* Company Image */}
          <div className="relative">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl"></div>
            
            <div className="relative rounded-2xl overflow-hidden h-[500px] bg-gradient-to-br from-sky-100 to-emerald-50 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
                alt="Adix Plastics production and warehouse"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
              
              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-lg text-foreground">Trusted Excellence</div>
                    <div className="text-sm text-muted-foreground">Serving Kenya with Quality</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyStory;