import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const Footer = () => {
  const footerSections = [
    {
      title: "Quick Links",
      links: [
        { label: "Home", to: "/" },
        { label: "About Us", to: "/about" },
        { label: "Shop Online", to: "/shop" },
        { label: "New Arrivals", to: "/new-arrivals" },
        { label: "Contact Us", to: "/contact" },
      ]
    },
    {
      title: "Categories", 
      links: [
        { label: "Furniture", to: "/category/furniture" },
        { label: "Household", to: "/category/household" },
        { label: "Industrial", to: "/category/industrial" },
        { label: "Gardening", to: "/category/gardening" },
        { label: "General Products", to: "/category/general-products" },
      ]
    },
    {
      title: "Customer Service",
      links: [
        { label: "FAQ", to: "/faq" },
        { label: "Shipping Info", to: "/shipping" },
        { label: "Returns", to: "/returns" },
        { label: "Size Guide", to: "/size-guide" },
        { label: "Track Your Order", to: "/track-order" },
      ]
    },
    {
      title: "Business",
      links: [
        { label: "Business Enquiries", to: "/business" },
        { label: "Bulk Orders", to: "/bulk-orders" },
        { label: "Wholesale", to: "/wholesale" },
        { label: "Partnership", to: "/partnership" },
        { label: "Careers", to: "/careers" },
      ]
    }
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-br from-sky-600 via-cyan-500 to-emerald-500 text-white px-4 py-2 rounded-xl shadow-lg">
                <div className="font-bold text-2xl tracking-tight">
                  ADIX
                </div>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/80 mb-6 leading-relaxed">
              Adix Plastics is a Nairobi-based manufacturer of quality household and industrial plastic
              products. From storage and kitchenware to utility solutions, we design durable plastics for
              modern homes and businesses.
            </p>
            
            {/* Contact info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-secondary" />
                <span>Nairobi, Kenya</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-secondary" />
                <span>+254 781 515 889</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-secondary" />
                <span>info@adixplastics.com</span>
              </div>
            </div>
          </div>

          {/* Footer links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-4 text-secondary">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.to}
                      className="text-sm text-primary-foreground/80 hover:text-secondary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter signup */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="font-semibold mb-2 text-secondary">Stay Updated</h4>
              <p className="text-sm text-primary-foreground/80">
                Subscribe to our newsletter for the latest products and offers
              </p>
            </div>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <Button className="bg-secondary hover:bg-secondary-light">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Social links and copyright */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <span className="text-sm text-primary-foreground/80">Follow us:</span>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" className="rounded-full p-2 border-primary-foreground/20 hover:bg-secondary hover:border-secondary">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="rounded-full p-2 border-primary-foreground/20 hover:bg-secondary hover:border-secondary">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="rounded-full p-2 border-primary-foreground/20 hover:bg-secondary hover:border-secondary">
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="rounded-full p-2 border-primary-foreground/20 hover:bg-secondary hover:border-secondary">
                  <Linkedin className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/admin" className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-secondary text-sm">
                <Settings className="h-4 w-4" /> Admin
              </Link>
              <div className="text-sm text-primary-foreground/60">
                2024 Adix Plastics Ltd. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
