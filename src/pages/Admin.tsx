import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase, type Product } from "@/lib/supabase";
import { CATEGORIES } from "@/lib/categories";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Trash2, Pencil, Plus } from "lucide-react";

const emptyProduct: Omit<Product, "id"> = {
  name: "",
  description: "",
  price: 0,
  category: "",
  image_url: "",
  featured: false,
};

const Admin = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Omit<Product, "id">>(emptyProduct);
  const [editing, setEditing] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("id,name,description,price,category,image_url,featured,created_at")
      .order("id", { ascending: false });
    if (!error && data) setProducts(data as Product[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const normalizeCategory = (value?: string | null) => {
    const v = (value || "").trim();
    if (!v) return "";
    const match = CATEGORIES.find((c) => c.toLowerCase() === v.toLowerCase());
    return match || v;
  };

  const importLocal = async () => {
    try {
      setImporting(true);
      const res = await fetch('/data/seed-products.json', { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to fetch seed-products.json');
      const items: Array<Omit<Product, 'id'>> = await res.json();
      for (const it of items) {
        const name = (it.name || '').trim();
        if (!name) continue;
        // dedupe by name
        const { data: exist, error: existErr } = await supabase.from('products').select('id').eq('name', name).limit(1);
        if (existErr) continue;
        if (exist && exist.length > 0) continue;
        await supabase.from('products').insert([{ 
          name,
          description: (it.description || '').trim(),
          price: Number(it.price) || 0,
          category: normalizeCategory(it.category || ''),
          image_url: it.image_url || '',
          featured: !!it.featured,
        }]);
      }
      await load();
    } catch (e) {
      console.error('Import failed', e);
    } finally {
      setImporting(false);
    }
  };

  const resetForm = () => {
    setForm(emptyProduct);
    setEditing(null);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    let image_url = form.image_url || "";
    const payload = {
      ...form,
      name: (form.name || "").trim(),
      description: (form.description || "").trim(),
      category: normalizeCategory(form.category),
    } as Omit<Product, "id">;
    try {
      if (file) {
        const path = `p_${Date.now()}_${file.name}`;
        const { error: upErr } = await supabase.storage.from("products").upload(path, file, { upsert: false });
        if (upErr) throw upErr;
        const { data: pub } = supabase.storage.from("products").getPublicUrl(path);
        image_url = pub.publicUrl;
      }
    } catch (err) {
      console.error("Upload failed", err);
    }
    if (editing) {
      const { error } = await supabase
        .from("products")
        .update({ ...payload, image_url: image_url || form.image_url })
        .eq("id", editing.id);
      if (!error) {
        await load();
        resetForm();
      }
    } else {
      const { error } = await supabase
        .from("products")
        .insert([{ ...payload, image_url }]);
      if (!error) {
        await load();
        resetForm();
      }
    }
    setSaving(false);
  };

  const onEdit = (p: Product) => {
    setEditing(p);
    setForm({
      name: p.name,
      description: p.description || "",
      price: p.price,
      category: p.category || "",
      image_url: p.image_url || "",
      featured: !!p.featured,
    });
  };

  const onDelete = async (id: number) => {
    if (!confirm("Delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (!error) await load();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-2">
            <Button variant="secondary" onClick={importLocal} disabled={importing}>
              {importing ? 'Importing…' : 'Import local products'}
            </Button>
            {editing ? (
              <Button variant="outline" onClick={resetForm}>Cancel Edit</Button>
            ) : null}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-1 border rounded-2xl p-6 bg-card">
            <h2 className="font-semibold mb-4 flex items-center gap-2">{editing ? "Edit product" : "Add new product"}</h2>
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div>
                <Label htmlFor="image_url">Image URL</Label>
                <Input id="image_url" value={form.image_url || ""} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="https://..." />
              </div>
              <div>
                <Label htmlFor="image_file">Or Upload Image</Label>
                <input id="image_file" type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} className="block w-full text-sm" />
              </div>
              <div>
                <Label htmlFor="price">Price (Kshs)</Label>
                <Input id="price" type="number" min={0} step={1} value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} required />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={form.category && form.category.length ? form.category : undefined}
                  onValueChange={(v) => setForm({ ...form, category: v === "__NONE__" ? "" : v })}
                >
                  <SelectTrigger id="category" className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__NONE__">None</SelectItem>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <textarea id="description" className="w-full rounded-md border bg-background p-2 h-28" value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <label className="inline-flex items-center gap-2 text-sm">
                <input type="checkbox" checked={!!form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
                Show in Featured Products
              </label>
              <Button type="submit" className="w-full" disabled={saving}>
                {editing ? "Save Changes" : (<> <Plus className="mr-2 h-4 w-4"/> Add Product</>)}
              </Button>
            </form>
          </div>

          {/* List */}
          <div className="lg:col-span-2">
            <div className="border rounded-2xl overflow-hidden">
              <div className="p-4 border-b bg-muted/40 flex items-center justify-between">
                <div className="font-semibold">Products</div>
                {loading && <div className="text-sm text-muted-foreground">Loading...</div>}
              </div>
              <div className="divide-y">
                {products.map((p) => (
                  <div key={p.id} className="p-4 flex gap-4 items-center">
                    <div className="w-16 h-16 rounded bg-muted flex items-center justify-center overflow-hidden">
                      {p.image_url ? <img src={p.image_url} alt={p.name} className="w-full h-full object-cover"/> : <div className="text-xs text-muted-foreground">No image</div>}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">{p.name}</div>
                      <div className="text-sm text-muted-foreground">Kshs{Number(p.price).toLocaleString()} • {p.category || "Uncategorized"} {p.featured ? "• Featured" : ""}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => onEdit(p)}><Pencil className="h-4 w-4 mr-1"/>Edit</Button>
                      <Button variant="destructive" size="sm" onClick={() => onDelete(p.id)}><Trash2 className="h-4 w-4 mr-1"/>Delete</Button>
                    </div>
                  </div>
                ))}
                {(!loading && products.length === 0) && (
                  <div className="p-6 text-center text-muted-foreground">No products yet. Add your first product.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Admin;
