-- =====================================================
-- UPDATE PRODUCT CATEGORIES
-- =====================================================
-- This script updates existing products with old category names
-- to the new category names
-- =====================================================

-- Update POULTRIES to FOOD & BEVERAGE PRODUCTS
UPDATE public.products
SET category = 'FOOD & BEVERAGE PRODUCTS'
WHERE category = 'POULTRIES';

-- Update BABY & KIDS to GENERAL PRODUCTS
UPDATE public.products
SET category = 'GENERAL PRODUCTS'
WHERE category = 'BABY & KIDS';

-- Update BOTTLES & LUNCH BOXES to GROCERY STAPLES
UPDATE public.products
SET category = 'GROCERY STAPLES'
WHERE category = 'BOTTLES & LUNCH BOXES';

-- Show updated counts
SELECT 
  'Category update complete!' AS status,
  COUNT(*) FILTER (WHERE category = 'FOOD & BEVERAGE PRODUCTS') AS "Food & Beverage Products",
  COUNT(*) FILTER (WHERE category = 'GENERAL PRODUCTS') AS "General Products",
  COUNT(*) FILTER (WHERE category = 'GROCERY STAPLES') AS "Grocery Staples"
FROM public.products;
