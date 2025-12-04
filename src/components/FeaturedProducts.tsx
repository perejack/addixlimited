import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase, type Product } from "@/lib/supabase";

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("id,name,price,image_url,category,featured")
        .eq("featured", true)
        .order("id", { ascending: false })
        .limit(9);
      if (!error && data) setProducts(data as Product[]);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Featured Products
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading && (
            <div className="col-span-full text-center text-muted-foreground">Loading featured products...</div>
          )}
          {!loading && products.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground">No featured products yet.</div>
          )}
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-background rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:scale-105 group"
            >
              {/* Product Image */}
              <div className="relative bg-gray-100 h-64 flex items-center justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute top-4 right-4 rounded-full p-2 bg-white/80 hover:bg-white"
                >
                  <Heart className="h-4 w-4" />
                </Button>
                {product.image_url ? (
                  <img src={product.image_url} alt={product.name} className="h-full w-full object-contain p-6" />
                ) : (
                  <div className="text-muted-foreground">No image</div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="text-sm text-muted-foreground mb-2">{product.category}</div>
                <h3 className="font-semibold text-lg mb-4 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-bold text-lg text-secondary">Kshs{Number(product.price).toLocaleString()}</span>
                </div>

                <Button asChild className="w-full bg-secondary hover:bg-secondary-light rounded-xl">
                  <Link to={`/product/${product.id}`}>View Product</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg" className="rounded-xl px-8">
            <Link to="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;