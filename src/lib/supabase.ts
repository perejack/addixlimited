import { createClient } from "@supabase/supabase-js";

// Client-side Supabase (use anon key ONLY)
const supabaseUrl = "https://aferoswwzdxfjacmuejj.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmZXJvc3d3emR4ZmphY211ZWpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5NzU5OTksImV4cCI6MjA3OTU1MTk5OX0.UfdgnR0WwQALcVMJPcMkVDT_bS0K7KxdfUalbQ5JD1o";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Product = {
  id: number;
  name: string;
  description?: string | null;
  price: number;
  category?: string | null;
  image_url?: string | null;
  featured?: boolean | null;
  created_at?: string;
};
