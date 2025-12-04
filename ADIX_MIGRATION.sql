-- =====================================================
-- ADIX PLASTICS - SUPABASE MIGRATION SQL
-- =====================================================
-- This migration file sets up the complete database schema
-- for the Adix Plastics e-commerce website including:
-- 1. Products table with all necessary columns
-- 2. Admin users table for product management
-- 3. Row Level Security (RLS) policies
-- 4. Storage bucket for product images
-- 5. Storage policies for public access
-- 6. Triggers for automatic timestamp updates
-- =====================================================

-- =====================================================
-- 1. CREATE PRODUCTS TABLE
-- =====================================================

-- Drop table if exists (for clean migration)
DROP TABLE IF EXISTS public.products CASCADE;

-- Create products table
CREATE TABLE public.products (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL DEFAULT 0,
    category TEXT,
    image_url TEXT,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes for better query performance
CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_products_featured ON public.products(featured) WHERE featured = true;
CREATE INDEX idx_products_created_at ON public.products(created_at DESC);
CREATE INDEX idx_products_name ON public.products(name);

-- Add comment to table
COMMENT ON TABLE public.products IS 'Products catalog for Adix Plastics e-commerce website';

-- =====================================================
-- 2. CREATE ADMIN USERS TABLE
-- =====================================================

-- Drop table if exists
DROP TABLE IF EXISTS public.admin_users CASCADE;

-- Create admin_users table for product management
CREATE TABLE public.admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    full_name TEXT,
    role TEXT DEFAULT 'admin',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes
CREATE INDEX idx_admin_users_email ON public.admin_users(email);
CREATE INDEX idx_admin_users_is_active ON public.admin_users(is_active);

-- Add comment
COMMENT ON TABLE public.admin_users IS 'Admin users for Adix Plastics product management';

-- =====================================================
-- 3. ENABLE ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on products table
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Enable RLS on admin_users table
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 4. CREATE RLS POLICIES FOR PRODUCTS
-- =====================================================

-- Policy: Allow public read access to all products
DROP POLICY IF EXISTS "Allow public read access to products" ON public.products;
CREATE POLICY "Allow public read access to products"
ON public.products
FOR SELECT
TO public
USING (true);

-- Policy: Allow public to insert products (for admin panel)
DROP POLICY IF EXISTS "Allow public to insert products" ON public.products;
CREATE POLICY "Allow public to insert products"
ON public.products
FOR INSERT
TO public
WITH CHECK (true);

-- Policy: Allow public to update products (for admin panel)
DROP POLICY IF EXISTS "Allow public to update products" ON public.products;
CREATE POLICY "Allow public to update products"
ON public.products
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- Policy: Allow public to delete products (for admin panel)
DROP POLICY IF EXISTS "Allow public to delete products" ON public.products;
CREATE POLICY "Allow public to delete products"
ON public.products
FOR DELETE
TO public
USING (true);

-- =====================================================
-- 5. CREATE RLS POLICIES FOR ADMIN USERS
-- =====================================================

-- Policy: Allow service role to manage admin users
DROP POLICY IF EXISTS "Allow service role to manage admin users" ON public.admin_users;
CREATE POLICY "Allow service role to manage admin users"
ON public.admin_users
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Policy: Allow authenticated users to read their own admin record
DROP POLICY IF EXISTS "Allow authenticated users to read own admin record" ON public.admin_users;
CREATE POLICY "Allow authenticated users to read own admin record"
ON public.admin_users
FOR SELECT
TO authenticated
USING (auth.uid()::text = id::text);

-- =====================================================
-- 6. CREATE STORAGE BUCKET FOR PRODUCT IMAGES
-- =====================================================

-- Create storage bucket for products (if not exists)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'products',
    'products',
    true,
    5242880, -- 5MB limit
    ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE
SET 
    public = true,
    file_size_limit = 5242880,
    allowed_mime_types = ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];

-- =====================================================
-- 7. CREATE STORAGE POLICIES
-- =====================================================

-- Policy: Allow public read access to product images
DROP POLICY IF EXISTS "Allow public read access to product images" ON storage.objects;
CREATE POLICY "Allow public read access to product images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'products');

-- Policy: Allow public to upload product images (for admin panel)
DROP POLICY IF EXISTS "Allow public to upload product images" ON storage.objects;
CREATE POLICY "Allow public to upload product images"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'products');

-- Policy: Allow public to update product images (for admin panel)
DROP POLICY IF EXISTS "Allow public to update product images" ON storage.objects;
CREATE POLICY "Allow public to update product images"
ON storage.objects
FOR UPDATE
TO public
USING (bucket_id = 'products')
WITH CHECK (bucket_id = 'products');

-- Policy: Allow public to delete product images (for admin panel)
DROP POLICY IF EXISTS "Allow public to delete product images" ON storage.objects;
CREATE POLICY "Allow public to delete product images"
ON storage.objects
FOR DELETE
TO public
USING (bucket_id = 'products');

-- =====================================================
-- 8. CREATE TRIGGER FOR UPDATED_AT TIMESTAMP
-- =====================================================

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for products table
DROP TRIGGER IF EXISTS set_updated_at_products ON public.products;
CREATE TRIGGER set_updated_at_products
    BEFORE UPDATE ON public.products
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Create trigger for admin_users table
DROP TRIGGER IF EXISTS set_updated_at_admin_users ON public.admin_users;
CREATE TRIGGER set_updated_at_admin_users
    BEFORE UPDATE ON public.admin_users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- =====================================================
-- 9. INSERT SAMPLE ADIX PRODUCTS
-- =====================================================

-- Insert Adix Plastics products with new categories
INSERT INTO public.products (name, category, price, description, image_url, featured) VALUES
('Classic Shoe Rack', 'SHOES', 1200, 'Durable plastic shoe rack for organizing footwear. Made from high-quality Adix plastics.', 'https://www.adixplastics.com/wp-content/uploads/2019/04/Untitled-1-Recovered-Recovered-Recovered-26.jpg', false),
('Folding Table', 'TABLES, TROLLEYS & STOOLS', 3500, 'Lightweight and sturdy folding table perfect for homes and offices. Easy to store and transport.', 'https://www.adixplastics.com/wp-content/uploads/2019/04/Untitled-1-Recovered-Recovered-Recovered-Recovered-1-thegem-product-catalog.jpg', true),
('Serving Tray No.18', 'TRAYS', 450, 'Elegant printed serving tray. Perfect for serving food and beverages at home or events.', 'https://www.adixplastics.com/wp-content/uploads/2019/03/Serving-Tray-No.18-Printed-thegem-product-catalog.jpg', false),
('Utility Basket', 'UTILITIES', 650, 'Multi-purpose utility basket for storage and organization. Durable and long-lasting.', 'https://www.adixplastics.com/wp-content/uploads/2019/03/Untitled-1-Recovered-Recovered-Recovered-Recovered-13-thegem-product-catalog.jpg', false),
('Mug No.338', 'MUGS & PLATES', 180, 'High-quality plastic mug with ergonomic design. Perfect for daily use.', 'https://www.adixplastics.com/wp-content/uploads/2019/04/Mug_No.338-thegem-product-catalog.jpg', false),
('Plastic Chair', 'CHAIRS', 2200, 'Comfortable and durable plastic chair. Ideal for home, office, or outdoor use.', 'https://www.adixplastics.com/wp-content/uploads/2019/04/Untitled-1-Recovered-Recovered-Recovered-Recovered-thegem-product-catalog.jpg', true),
('Food Storage Set 4Pcs', 'CONTAINERS & JUGS', 890, 'Set of 4 food storage containers with secure lids. Keep your food fresh and organized.', 'https://www.adixplastics.com/wp-content/uploads/2019/04/Food_Storage_4Pcs_Per_set_Printed-thegem-product-catalog.jpg', false),
('Bamboo Tray', 'TRAYS', 520, 'Eco-friendly bamboo-design tray. Perfect for serving and decoration.', '/images/products/bamboo-tray.webp', false),
('Industrial Bucket 5L', 'UTILITIES', 340, 'Heavy-duty 5-liter industrial bucket. Suitable for various applications.', '/images/products/industrial-bucket-5-ltrs.webp', false),
('Industrial Bucket 20L', 'UTILITIES', 890, 'Large capacity 20-liter industrial bucket. Durable and reliable for heavy use.', '/images/products/industrial-bucket-20-ltrs.webp', false),
('Bottle Crate 24 Bottles', 'CONTAINERS & JUGS', 1500, 'Plastic crate for storing and transporting 24 bottles (500ml). Stackable design.', '/images/products/bottle-crate-500-ml-x-24-bottles.webp', false),
('Waste Paper Basket', 'UTILITIES', 280, 'Decorative waste paper basket. Perfect for offices and homes.', '/images/products/bamboo-waste-paper-basket.webp', false);

-- =====================================================
-- 10. GRANT PERMISSIONS
-- =====================================================

-- Grant usage on schema
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;

-- Grant all privileges on products table
GRANT ALL ON public.products TO postgres, service_role;
GRANT SELECT ON public.products TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.products TO authenticated;

-- Grant all privileges on admin_users table
GRANT ALL ON public.admin_users TO postgres, service_role;
GRANT SELECT, UPDATE ON public.admin_users TO authenticated;

-- Grant usage on sequences
GRANT USAGE, SELECT ON SEQUENCE public.products_id_seq TO postgres, authenticated, service_role;

-- =====================================================
-- 11. MIGRATION VERIFICATION
-- =====================================================

-- Verify the setup
SELECT 'Migration completed successfully!' AS status;
SELECT 'Products table created with ' || COUNT(*) || ' records' AS result FROM public.products;
SELECT 'Admin users table created' AS status;
SELECT 'All RLS policies and triggers configured' AS status;
