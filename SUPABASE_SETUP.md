# Supabase Setup Instructions - Kenpoly Kenya

This guide will help you set up your new Supabase instance for the Kenpoly Kenya e-commerce website.

## 📋 New Credentials

Your application has been updated with the following credentials:

- **Project URL**: `https://sllrvkmzqmbatdnqeqsd.supabase.co`
- **Anon API Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsbHJ2a216cW1iYXRkbnFlcXNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1OTM5OTgsImV4cCI6MjA3ODE2OTk5OH0.k3TIgObUfoyWu_dHQ2VM01yn0c12o5ScAgu8aoiS5es`

## 🚀 Quick Setup Steps

### Step 1: Execute the Migration SQL

1. Go to your Supabase project dashboard: [https://supabase.com/dashboard/project/sllrvkmzqmbatdnqeqsd](https://supabase.com/dashboard/project/sllrvkmzqmbatdnqeqsd)

2. Navigate to **SQL Editor** in the left sidebar

3. Click **New Query**

4. Copy the entire contents of `supabase-migration.sql` file

5. Paste it into the SQL Editor

6. Click **Run** or press `Ctrl+Enter` (or `Cmd+Enter` on Mac)

7. Wait for the success message: "Migration completed successfully!"

### Step 2: Verify Database Setup

After running the migration, verify that everything is set up correctly:

1. Go to **Table Editor** in the left sidebar
2. You should see the `products` table listed
3. Click on it to view the table structure

**Expected Table Structure:**
- `id` (bigint, primary key)
- `name` (text, not null)
- `description` (text)
- `price` (numeric)
- `category` (text)
- `image_url` (text)
- `featured` (boolean)
- `created_at` (timestamp with timezone)
- `updated_at` (timestamp with timezone)

### Step 3: Verify Storage Bucket

1. Go to **Storage** in the left sidebar
2. You should see a bucket named `products`
3. This bucket is configured to:
   - Be publicly accessible for reading
   - Accept only authenticated uploads
   - Allow image files only (JPEG, PNG, WebP, GIF)
   - Have a 5MB file size limit

### Step 4: Test the Application

1. Install dependencies (if not already done):
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open the application in your browser (typically `http://localhost:5173`)

4. Navigate to the Admin page (usually at `/admin`)

5. Try adding a test product to verify the connection works

## 🔐 Authentication Setup (Important for Admin Features)

To use the admin features, you need to set up authentication:

### Option 1: Email Authentication (Recommended for Development)

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Enable **Email** provider
3. Disable email confirmation for development:
   - Go to **Authentication** → **Settings**
   - Under **Email Auth**, disable "Confirm email"
4. Create a test user:
   - Go to **Authentication** → **Users**
   - Click **Add user** → **Create new user**
   - Enter an email and password (e.g., `admin@kenpoly.com` / `admin123`)
   - Click **Create user**

### Option 2: Disable RLS for Testing (Quick but Less Secure)

If you want to test without authentication:

1. Go to **Table Editor** → **products** table
2. Click the **RLS** toggle to disable Row Level Security
3. **⚠️ Warning**: This makes your database publicly writable. Only use for testing!

### Option 3: Update Policies to Allow Anonymous Access (Alternative)

Run this SQL to allow anonymous users to modify products:

```sql
-- Allow anon users to insert products
CREATE POLICY "Allow anon insert" ON public.products
FOR INSERT TO anon WITH CHECK (true);

-- Allow anon users to update products
CREATE POLICY "Allow anon update" ON public.products
FOR UPDATE TO anon USING (true) WITH CHECK (true);

-- Allow anon users to delete products
CREATE POLICY "Allow anon delete" ON public.products
FOR DELETE TO anon USING (true);

-- Allow anon users to upload to storage
CREATE POLICY "Allow anon upload" ON storage.objects
FOR INSERT TO anon WITH CHECK (bucket_id = 'products');
```

**⚠️ Warning**: This is NOT recommended for production as it allows anyone to modify your data!

## 📦 Importing Products

Once your database is set up, you can import the seed products:

### Method 1: Using the Admin Panel (Recommended)

1. Open the application and navigate to `/admin`
2. Click the **"Import local products"** button
3. Wait for the import to complete
4. Refresh the page to see all imported products

### Method 2: Using SQL (Alternative)

Uncomment the sample data section in `supabase-migration.sql` (section 7) and run it in the SQL Editor.

## 🔍 Troubleshooting

### Issue: "Failed to fetch" or connection errors

- **Check**: Verify your Supabase project is active and not paused
- **Check**: Ensure the API key is correct in `src/lib/supabase.ts`
- **Check**: Your internet connection is stable

### Issue: "Permission denied" when adding products

- **Solution**: Make sure you've set up authentication (see Step 4 above)
- **Or**: Temporarily disable RLS for testing (not recommended for production)

### Issue: Image upload fails

- **Check**: Storage bucket `products` exists and is public
- **Check**: Storage policies are correctly set (run migration SQL again)
- **Check**: File size is under 5MB and is an image format

### Issue: Products table doesn't exist

- **Solution**: Run the migration SQL again from Step 1
- **Check**: You're looking at the correct project in Supabase dashboard

## 📝 What Was Set Up

The migration script (`supabase-migration.sql`) configured:

✅ **Products Table** with all necessary columns and indexes
✅ **Row Level Security (RLS)** enabled with appropriate policies
✅ **Storage Bucket** for product images with 5MB limit
✅ **Storage Policies** for public read and authenticated write access
✅ **Triggers** for automatic `updated_at` timestamp updates
✅ **Permissions** for different user roles (anon, authenticated, service_role)

## 🎯 Next Steps

1. ✅ Run the migration SQL
2. ✅ Set up authentication
3. ✅ Import products using the admin panel
4. ✅ Test all admin features (add, edit, delete products)
5. ✅ Test image upload functionality
6. ✅ Verify products display on the frontend

## 📞 Support

If you encounter any issues:

1. Check the browser console for error messages
2. Check the Supabase logs in the dashboard
3. Verify all steps above were completed correctly
4. Make sure you're using the correct project URL and API key

---

**🎉 Your Kenpoly Kenya website should now be fully functional with Supabase!**
