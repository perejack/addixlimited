import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProductDetails from "./pages/ProductDetails";
import Admin from "./pages/Admin";
import Products from "./pages/Products";
import About from "./pages/About";
import Shop from "./pages/Shop";
import Business from "./pages/Business";
import NewArrivals from "./pages/NewArrivals";
import Kenpoly48 from "./pages/Kenpoly48";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Catalogue from "./pages/Catalogue";
import ShippingInfo from "./pages/ShippingInfo";
import Returns from "./pages/Returns";
import SizeGuide from "./pages/SizeGuide";
import TrackOrder from "./pages/TrackOrder";
import BulkOrders from "./pages/BulkOrders";
import Wholesale from "./pages/Wholesale";
import Partnership from "./pages/Partnership";
import Careers from "./pages/Careers";
import Blog from "./pages/Blog";
import Cart from "./pages/Cart";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ScrollToTop from "@/components/ScrollToTop";
import { CartProvider } from "@/contexts/CartContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/category/:slug" element={<Products />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/business" element={<Business />} />
          <Route path="/new-arrivals" element={<NewArrivals />} />
          <Route path="/kenpoly-48" element={<Kenpoly48 />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/shipping" element={<ShippingInfo />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/size-guide" element={<SizeGuide />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/bulk-orders" element={<BulkOrders />} />
          <Route path="/wholesale" element={<Wholesale />} />
          <Route path="/partnership" element={<Partnership />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/cart" element={<Cart />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
          <FloatingWhatsApp />
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
