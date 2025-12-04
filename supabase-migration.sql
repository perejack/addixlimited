-- =====================================================
-- KENPOLY KENYA - SUPABASE MIGRATION SQL
-- =====================================================
-- This migration file sets up the complete database schema
-- for the Kenpoly Kenya e-commerce website including:
-- 1. Products table with all necessary columns
-- 2. Row Level Security (RLS) policies
-- 3. Storage bucket for product images
-- 4. Storage policies for public access
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
COMMENT ON TABLE public.products IS 'Products catalog for Kenpoly Kenya e-commerce website';

-- =====================================================
-- 2. ENABLE ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on products table
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 3. CREATE RLS POLICIES
-- =====================================================

-- Policy: Allow public read access to all products
DROP POLICY IF EXISTS "Allow public read access to products" ON public.products;
CREATE POLICY "Allow public read access to products"
ON public.products
FOR SELECT
TO public
USING (true);

-- Policy: Allow authenticated users to insert products
DROP POLICY IF EXISTS "Allow authenticated users to insert products" ON public.products;
CREATE POLICY "Allow authenticated users to insert products"
ON public.products
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Policy: Allow authenticated users to update products
DROP POLICY IF EXISTS "Allow authenticated users to update products" ON public.products;
CREATE POLICY "Allow authenticated users to update products"
ON public.products
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Policy: Allow authenticated users to delete products
DROP POLICY IF EXISTS "Allow authenticated users to delete products" ON public.products;
CREATE POLICY "Allow authenticated users to delete products"
ON public.products
FOR DELETE
TO authenticated
USING (true);

-- =====================================================
-- 4. CREATE STORAGE BUCKET FOR PRODUCT IMAGES
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
-- 5. CREATE STORAGE POLICIES
-- =====================================================

-- Policy: Allow public read access to product images
DROP POLICY IF EXISTS "Allow public read access to product images" ON storage.objects;
CREATE POLICY "Allow public read access to product images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'products');

-- Policy: Allow authenticated users to upload product images
DROP POLICY IF EXISTS "Allow authenticated users to upload product images" ON storage.objects;
CREATE POLICY "Allow authenticated users to upload product images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'products');

-- Policy: Allow authenticated users to update product images
DROP POLICY IF EXISTS "Allow authenticated users to update product images" ON storage.objects;
CREATE POLICY "Allow authenticated users to update product images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'products')
WITH CHECK (bucket_id = 'products');

-- Policy: Allow authenticated users to delete product images
DROP POLICY IF EXISTS "Allow authenticated users to delete product images" ON storage.objects;
CREATE POLICY "Allow authenticated users to delete product images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'products');

-- =====================================================
-- 6. CREATE TRIGGER FOR UPDATED_AT TIMESTAMP
-- =====================================================

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS set_updated_at ON public.products;
CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.products
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- =====================================================
-- 7. INSERT SAMPLE DATA (OPTIONAL)
-- =====================================================

-- Sample products from seed-products.json
-- You can uncomment this section if you want to add sample data

/*
INSERT INTO public.products (name, category, price, description, image_url, featured) VALUES
('CHICK FEEDER', 'POULTRIES', 66, 'Quality poultries product: CHICK FEEDER. Durable, affordable, and made for everyday use.', '/images/products/chick-feeder.webp', false),
('CHICK FEEDING TRAY', 'POULTRIES', 239, 'Quality poultries product: CHICK FEEDING TRAY. Durable, affordable, and made for everyday use.', '/images/products/chick-feeding-tray.webp', false),
('CHICKEN DRINKER NO.2', 'POULTRIES', 244, 'Quality poultries product: CHICKEN DRINKER NO.2. Durable, affordable, and made for everyday use.', '/images/products/chicken-drinker-no-2.webp', false),
('BOTTLE CRATE 500 ML X 24 BOTTLES', 'INDUSTRIAL', 1, 'Quality industrial product: BOTTLE CRATE 500 ML X 24 BOTTLES. Durable, affordable, and made for everyday use.', '/images/products/bottle-crate-500-ml-x-24-bottles.webp', false),
('INDUSTRIAL BUCKET 20 LTRS', 'INDUSTRIAL', 653, 'Quality industrial product: INDUSTRIAL BUCKET 20 LTRS. Durable, affordable, and made for everyday use.', '/images/products/industrial-bucket-20-ltrs.webp', false),
('INDUSTRIAL BUCKET 5 LTRS', 'INDUSTRIAL', 174, 'Quality industrial product: INDUSTRIAL BUCKET 5 LTRS. Durable, affordable, and made for everyday use.', '/images/products/industrial-bucket-5-ltrs.webp', false),
('BAMBOO TRAY', 'HOUSEHOLD', 182, 'Quality household product: BAMBOO TRAY. Durable, affordable, and made for everyday use.', '/images/products/bamboo-tray.webp', false);
*/

-- =====================================================
-- 8. GRANT PERMISSIONS
-- =====================================================

-- Grant usage on schema
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;

-- Grant all privileges on products table
GRANT ALL ON public.products TO postgres, service_role;
GRANT SELECT ON public.products TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.products TO authenticated;

-- Grant usage on sequence
GRANT USAGE, SELECT ON SEQUENCE public.products_id_seq TO postgres, authenticated, service_role;

-- =====================================================
-- MIGRATION COMPLETE
-- =====================================================

-- Verify the setup
SELECT 'Migration completed successfully!' AS status;
SELECT 'Products table created with ' || COUNT(*) || ' records' AS result FROM public.products;
