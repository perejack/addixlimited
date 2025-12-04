import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { supabase, type Product } from "@/lib/supabase";
import { CATEGORIES, toSlug } from "@/lib/categories";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart } from "lucide-react";

const PAGE_SIZE = 9;
// Categories imported from shared lib

const Products = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [sp, setSp] = useSearchParams();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    toast({
      title: "Added to cart!",
      description: `${product.name} added to your cart.`,
    });
  };

  const q = sp.get("q") || "";
  const page = Number(sp.get("page") || "1");
  const SLUG_TO_CATEGORY = useMemo(() => {
    const map: Record<string, string> = {};
    CATEGORIES.forEach((c) => { map[toSlug(c)] = c; });
    return map;
  }, []);

  const selectedCategory = useMemo(() => {
    if (params.slug) {
      const slug = decodeURIComponent(params.slug);
      return SLUG_TO_CATEGORY[slug] || "";
    }
    return sp.get("category") || "";
  }, [params.slug, sp, SLUG_TO_CATEGORY]);

  const load = async () => {
    setLoading(true);
    let query = supabase.from("products").select("id,name,price,image_url,category", { count: "exact" });
    if (selectedCategory) query = query.eq("category", selectedCategory);
    if (q) query = query.ilike("name", `%${q}%`);

    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data, error, count } = await query.order("id", { ascending: false }).range(from, to);
    if (!error && data) {
      setItems(data as Product[]);
      setTotal(count || 0);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, page, selectedCategory]);

  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);
    const term = (fd.get("q") as string) || "";
    const next = new URLSearchParams(sp);
    if (term) next.set("q", term); else next.delete("q");
    next.set("page", "1");
    navigate(`/products?${next.toString()}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">Products</h1>

          <form onSubmit={submitSearch} className="flex gap-2 w-full md:w-auto">
            <Input name="q" defaultValue={q} placeholder="Search products..." className="w-full md:w-80" />
            <Button type="submit">Search</Button>
          </form>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <Select
            value={selectedCategory && selectedCategory.length ? selectedCategory : undefined}
            onValueChange={(v) => {
              const next = new URLSearchParams(sp);
              if (v === "__ALL__") next.delete("category"); else next.set("category", v);
              next.set("page", "1");
              navigate(`/products?${next.toString()}`);
            }}
          >
            <SelectTrigger className="w-60">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__ALL__">All categories</SelectItem>
              {CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading && <div className="col-span-full text-center text-muted-foreground">Loading...</div>}
          {!loading && items.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground">No products found.</div>
          )}
          {items.map((p) => (
            <div key={p.id} className="bg-background rounded-2xl overflow-hidden shadow-card">
              <div className="bg-gray-100 h-64 flex items-center justify-center">
                {p.image_url ? (
                  <img src={p.image_url} alt={p.name} className="h-full w-full object-contain p-6" />
                ) : (
                  <div className="text-muted-foreground">No image</div>
                )}
              </div>
              <div className="p-6">
                <div className="text-sm text-muted-foreground mb-2">{p.category}</div>
                <h3 className="font-semibold mb-2 line-clamp-2">{p.name}</h3>
                <div className="font-bold text-blue-600 mb-4 text-lg">KSH {Number(p.price).toFixed(2)}</div>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => handleAddToCart(p)}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 rounded-xl"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                  <Button asChild variant="outline" className="flex-1 rounded-xl">
                    <Link to={`/product/${p.id}`}>View</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 mt-10">
          <Button variant="outline" disabled={page <= 1} onClick={() => navigate(`/products?${new URLSearchParams({ ...Object.fromEntries(sp.entries()), page: String(page-1) }).toString()}`)}>Prev</Button>
          <div className="text-sm text-muted-foreground">Page {page} of {pages}</div>
          <Button variant="outline" disabled={page >= pages} onClick={() => navigate(`/products?${new URLSearchParams({ ...Object.fromEntries(sp.entries()), page: String(page+1) }).toString()}`)}>Next</Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Products;
