import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, Heart, Phone, MessageCircle, ShoppingCart } from "lucide-react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState, useMemo } from "react";
import { supabase, type Product } from "@/lib/supabase";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState<Product[]>([]);
  const [loadingRelated, setLoadingRelated] = useState(false);
  const railRef = useRef<HTMLDivElement | null>(null);
  const PHONE = "+254788672917";

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, qty);
      toast({
        title: "Added to cart!",
        description: `${qty} × ${product.name} added to your cart.`,
      });
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, qty);
      navigate("/cart");
    }
  };

  const waLink = useMemo(() => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const pname = product?.name ? ` for ${product.name}` : "";
    const text = encodeURIComponent(`Hi Adix Plastics, I'd like to place an order${pname}. Page: ${url}`);
    const digits = PHONE.replace(/[^\d]/g, "");
    return `https://wa.me/${digits}?text=${text}`;
  }, [product?.name]);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("id,name,description,price,category,image_url,featured,created_at")
        .eq("id", Number(id))
        .single();
      if (!error && data) setProduct(data as Product);
      setLoading(false);
    };
    load();
  }, [id]);

  // Load 'Frequently Bought Together' as random products (not necessarily related)
  useEffect(() => {
    const loadRelated = async () => {
      setLoadingRelated(true);
      let q = supabase
        .from("products")
        .select("id,name,price,image_url,category")
        .order("id", { ascending: false })
        .limit(24);
      if (product?.id) q = q.neq("id", product.id);
      const { data, error } = await q;
      if (!error && data) {
        // Shuffle client-side for randomness
        const arr = [...(data as Product[])];
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        setRelated(arr.slice(0, 12));
      }
      setLoadingRelated(false);
    };
    loadRelated();
  }, [product?.id]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-4 text-sm text-muted-foreground">
          <Link to="/" className="hover:underline">Home</Link> / <span>Product</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {loading && (
            <div className="lg:col-span-2 text-center text-muted-foreground">Loading product...</div>
          )}
          {!loading && !product && (
            <div className="lg:col-span-2 text-center text-muted-foreground">Product not found.</div>
          )}
          {product && (
            <>
              {/* Gallery */}
              <div className="bg-card rounded-2xl p-4 border">
                <div className="relative rounded-2xl overflow-hidden bg-white aspect-square flex items-center justify-center">
                  <img
                    src={product.image_url || "https://via.placeholder.com/600x600?text=No+Image"}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Info */}
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
                <div className="text-sm text-muted-foreground mb-4">{product.category || "Uncategorized"}</div>

                <div className="flex items-center gap-3 mb-6">
                  <span className="text-secondary font-bold text-xl">Kshs{Number(product.price).toLocaleString()}</span>
                </div>

                {product.description && (
                  <div className="prose prose-sm max-w-none text-muted-foreground mb-6">
                    {product.description}
                  </div>
                )}

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border rounded-xl">
                      <Button variant="ghost" size="icon" onClick={() => setQty(Math.max(1, qty-1))}><Minus /></Button>
                      <div className="w-10 text-center font-semibold">{qty}</div>
                      <Button variant="ghost" size="icon" onClick={() => setQty(qty+1)}><Plus /></Button>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Total: <span className="font-bold text-blue-600">KSH {(Number(product.price) * qty).toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      onClick={handleAddToCart}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 rounded-xl py-6 text-base"
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Add to Cart
                    </Button>
                    <Button 
                      onClick={handleBuyNow}
                      variant="secondary" 
                      className="flex-1 rounded-xl py-6 text-base"
                    >
                      Buy Now
                    </Button>
                  </div>
                </div>

                {/* Call / WhatsApp Order CTA */}
                <div className="mb-6 p-4 rounded-2xl border shadow-sm bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20">
                  <div className="flex items-start md:items-center justify-between gap-4 flex-col md:flex-row">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Call to order</div>
                        <div className="text-lg font-semibold tracking-wide">+254 729 000 788</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button asChild variant="outline" className="rounded-full">
                        <a href={`tel:${PHONE}`} aria-label="Call to order">
                          <Phone className="h-4 w-4 mr-2" /> Call Now
                        </a>
                      </Button>
                      <Button asChild className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
                        <a href={waLink} target="_blank" rel="noopener noreferrer" aria-label="Order via WhatsApp">
                          <MessageCircle className="h-4 w-4 mr-2" /> WhatsApp Order
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm text-muted-foreground">
                  <div className="p-4 border rounded-xl">Delivery Available</div>
                  <div className="p-4 border rounded-xl">In-Store Collection</div>
                  <div className="p-4 border rounded-xl">Bulk Discount</div>
                  <div className="p-4 border rounded-xl">Secure Payment</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Frequently Bought Together */}
      {product && (
        <section className="py-10 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-bold">Frequently Bought Together</h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  onClick={() => railRef.current && (railRef.current.scrollLeft -= 320)}
                >
                  ‹
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  onClick={() => railRef.current && (railRef.current.scrollLeft += 320)}
                >
                  ›
                </Button>
              </div>
            </div>

            {loadingRelated && (
              <div className="text-muted-foreground">Loading related products...</div>
            )}
            {!loadingRelated && related.length === 0 && (
              <div className="text-muted-foreground">No related products yet.</div>
            )}

            <div
              ref={railRef}
              className="flex gap-4 overflow-x-auto scroll-smooth pb-4 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:bg-muted-foreground/20"
            >
              {related.map((rp) => (
                <div
                  key={rp.id}
                  className="min-w-[220px] max-w-[220px] bg-background rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:scale-[1.02]"
                >
                  <Link to={`/product/${rp.id}`} className="block">
                    <div className="relative bg-white h-44 flex items-center justify-center">
                      {rp.image_url ? (
                        <img src={rp.image_url} alt={rp.name} className="h-full w-full object-contain p-4" />
                      ) : (
                        <div className="text-muted-foreground">No image</div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="text-xs text-muted-foreground mb-1">{rp.category}</div>
                      <div className="font-semibold text-sm line-clamp-2 mb-2">{rp.name}</div>
                      <div className="font-bold text-secondary">Kshs{Number(rp.price).toLocaleString()}</div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default ProductDetails;
