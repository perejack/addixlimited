# Adix Plastics Database Migration Guide

## Overview
This guide walks you through migrating your Adix Plastics e-commerce app to the new Supabase database.

## New Database Credentials
- **Project URL:** https://aferoswwzdxfjacmuejj.supabase.co
- **API Key (Anon):** eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmZXJvc3d3emR4ZmphY211ZWpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5NzU5OTksImV4cCI6MjA3OTU1MTk5OX0.UfdgnR0WwQALcVMJPcMkVDT_bS0K7KxdfUalbQ5JD1o

## Step 1: Run the Migration SQL

1. Go to your Supabase dashboard: https://app.supabase.com
2. Select your new project (aferoswwzdxfjacmuejj)
3. Navigate to **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy the entire contents of `ADIX_MIGRATION.sql` from this project
6. Paste it into the SQL editor
7. Click **Run** to execute the migration

## What the Migration Creates

### Tables
- **products** - Main products catalog with columns:
  - id (auto-increment)
  - name
  - description
  - price
  - category
  - image_url
  - featured (boolean)
  - created_at
  - updated_at

- **admin_users** - Admin user management with columns:
  - id (UUID)
  - email
  - password_hash
  - full_name
  - role
  - is_active
  - created_at
  - updated_at

### Storage
- **products** bucket - For storing product images (5MB limit)

### Security
- Row Level Security (RLS) policies for:
  - Public read access to products
  - Authenticated users can create/update/delete products
  - Authenticated users can upload/manage product images

### Sample Data
The migration includes 12 sample Adix Plastics products across all categories:
- SHOES
- TABLES, TROLLEYS & STOOLS
- TRAYS
- UTILITIES
- MUGS & PLATES
- CHAIRS
- CONTAINERS & JUGS

## Step 2: Verify the Migration

After running the SQL, verify everything is set up correctly:

1. In Supabase SQL Editor, run:
```sql
SELECT COUNT(*) as product_count FROM public.products;
```

You should see **12 products** returned.

2. Check the admin_users table:
```sql
SELECT COUNT(*) as admin_count FROM public.admin_users;
```

3. Verify storage bucket:
```sql
SELECT * FROM storage.buckets WHERE name = 'products';
```

## Step 3: Update Your App Configuration

The app credentials have already been updated in:
- `src/lib/supabase.ts` - Contains the new Supabase URL and API key

No additional configuration needed!

## Step 4: Test the App

1. Start your development server:
```bash
npm run dev
```

2. Test the following functionality:
   - **Browse products** - Should display all 12 sample products
   - **Filter by category** - Click on category cards to filter
   - **Add to cart** - Add products to your cart
   - **Checkout** - Complete a WhatsApp order
   - **Admin panel** - Add/edit/delete products (if admin routes are set up)

## Product Categories

The new database includes these Adix Plastics categories:

| Category | Sample Products |
|----------|-----------------|
| SHOES | Classic Shoe Rack |
| TABLES, TROLLEYS & STOOLS | Folding Table |
| TRAYS | Serving Tray No.18, Bamboo Tray |
| UTILITIES | Utility Basket, Industrial Buckets, Waste Paper Basket |
| MUGS & PLATES | Mug No.338 |
| CHAIRS | Plastic Chair |
| CONTAINERS & JUGS | Food Storage Set, Bottle Crate |

## Troubleshooting

### Products not showing?
1. Verify the migration ran successfully
2. Check that RLS policies are enabled
3. Ensure the anon key has SELECT permissions

### Can't upload product images?
1. Check that the 'products' storage bucket exists
2. Verify storage policies are created
3. Ensure authenticated user has INSERT permission

### Admin features not working?
1. Verify admin_users table exists
2. Check that admin authentication is properly configured
3. Ensure RLS policies allow authenticated operations

## Adding More Products

To add more products via SQL:

```sql
INSERT INTO public.products (name, category, price, description, image_url, featured) VALUES
('Product Name', 'CATEGORY', 1000, 'Description here', 'https://image-url.jpg', false);
```

Or use the admin panel in your app if it's configured.

## Backing Up Your Data

To backup your data:

1. In Supabase dashboard, go to **Settings** → **Backups**
2. Click **Request a backup**
3. Download the backup when ready

## Support

If you encounter any issues:
1. Check the Supabase logs in the dashboard
2. Verify all SQL statements executed without errors
3. Ensure RLS policies are correctly configured
4. Check browser console for any client-side errors

---

**Migration completed successfully!** Your Adix Plastics app is now running on the new database.
