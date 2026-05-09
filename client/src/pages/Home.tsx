import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

/**
 * Wayne Passion Reggae Kitchen - Premium Caribbean Jerk Sauce Brand
 * Design Philosophy: Reggae Soul Maximalism
 * - Vibrant Rasta colors (red, gold, green) on black background
 * - Bold, commanding typography (Playfair Display + Poppins)
 * - Asymmetric layouts with organic flow
 * - Caribbean energy, premium feel, cultural authenticity
 */

const FLAVORS = [
  {
    id: 1,
    name: "Original Jerk Seasoning Sauce",
    color: "bg-green-600",
    accent: "text-green-600",
    description: "The classic blend that started it all. Aromatic spices, Caribbean heat, and authentic jerk tradition in every jar.",
    notes: "Allspice, Scotch Bonnet, Thyme",
  },
  {
    id: 2,
    name: "Tamarind Jerk Seasoning Sauce",
    color: "bg-amber-700",
    accent: "text-amber-700",
    description: "Tangy and complex. Tamarind brings sweet-sour depth to the bold jerk spices, perfect for grilling and marinating.",
    notes: "Tamarind, Allspice, Ginger",
  },
  {
    id: 3,
    name: "Curry Jerk Sauce",
    color: "bg-yellow-500",
    accent: "text-yellow-600",
    description: "Golden turmeric meets Caribbean fire. A warm, earthy blend that elevates any dish with Caribbean soul.",
    notes: "Turmeric, Curry Spices, Scotch Bonnet",
  },
  {
    id: 4,
    name: "Hot Jerk Sauce (XX Spicy)",
    color: "bg-red-700",
    accent: "text-red-700",
    description: "For the fearless. Double-heat jerk sauce that brings serious Caribbean fire. Not for the faint of heart.",
    notes: "Habanero, Scotch Bonnet, Ghost Pepper",
  },
  {
    id: 5,
    name: "Rosemary Jerk Sauce",
    color: "bg-emerald-700",
    accent: "text-emerald-700",
    description: "Herbaceous and refined. Rosemary adds Mediterranean elegance to Caribbean jerk traditions.",
    notes: "Rosemary, Thyme, Allspice",
  },
  {
    id: 6,
    name: "Original Jerk (Pepper-Free)",
    color: "bg-orange-600",
    accent: "text-orange-600",
    description: "All the flavor, none of the heat. Perfect for those who want authentic jerk taste without the spice.",
    notes: "Allspice, Thyme, Ginger",
  },
  {
    id: 7,
    name: "Mango Jerk Seasoning Sauce",
    color: "bg-orange-400",
    accent: "text-orange-500",
    description: "Tropical sweetness meets Caribbean fire. Mango brings fruity brightness to bold jerk spices.",
    notes: "Mango, Allspice, Scotch Bonnet",
  },
];

export default function Home() {
  const [selectedFlavor, setSelectedFlavor] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-sm z-50 border-b border-yellow-500/20">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold brand-text-gradient">
              🌴 REGGAE KITCHEN
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="hover:text-yellow-400 transition-colors">About</a>
            <a href="#products" className="hover:text-yellow-400 transition-colors">Flavors</a>
            <a href="#sommelier" className="hover:text-yellow-400 transition-colors">Sommelier</a>
            <a href="#contact" className="hover:text-yellow-400 transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-0 relative overflow-hidden">
        <div className="rasta-stripe-thin mb-8"></div>
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center min-h-[600px]">
            {/* Left: Bold Text */}
            <div className="flex flex-col justify-center space-y-6">
              <div>
                <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-4">
                  <span className="text-red-500">Wayne</span>
                  <br />
                  <span className="text-yellow-400">Passion</span>
                  <br />
                  <span className="text-green-500">REGGAE</span>
                  <br />
                  <span className="text-white">KITCHEN</span>
                </h1>
              </div>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                Premium Caribbean jerk sauces crafted with authentic Caribbean soul. Seven legendary flavors. One sacred legacy.
              </p>
              <div className="flex gap-4 pt-4">
                <Button 
                  size="lg" 
                  className="bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-8 py-6"
                >
                  Discover Flavors
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-yellow-400 text-yellow-400 hover:bg-yellow-400/10 font-bold text-lg px-8 py-6"
                >
                  Learn More
                </Button>
              </div>
            </div>

            {/* Right: Product Image */}
            <div className="relative h-[600px] flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-yellow-400/20 to-green-600/20 rounded-lg blur-3xl"></div>
              <img 
                src="/manus-storage/reggae-kitchen-product_e3ebe2e8.jpg" 
                alt="Wayne Passion Reggae Kitchen Products"
                className="relative z-10 h-full object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Rasta Stripe Divider */}
      <div className="rasta-stripe-thin my-12"></div>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-black via-black to-gray-900">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-yellow-400">The Reid</span> Family Legacy
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Wayne Passion Reggae Kitchen is more than a brand—it's a sacred family legacy. Born from generations of Caribbean culinary tradition, each jar carries the spirit of the islands, the heat of authentic jerk culture, and the pride of the Reid family.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Every flavor tells a story. Every recipe honors tradition. Every bottle brings Caribbean fire to your table.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-red-600/10 border border-red-600/30 p-8 rounded-lg hover:bg-red-600/20 transition-colors">
              <div className="text-4xl mb-4">🔥</div>
              <h3 className="text-2xl font-bold mb-3 text-red-400">Authentic Heat</h3>
              <p className="text-gray-300">Crafted with genuine Caribbean spices and time-honored jerk traditions passed down through generations.</p>
            </div>
            <div className="bg-yellow-400/10 border border-yellow-400/30 p-8 rounded-lg hover:bg-yellow-400/20 transition-colors">
              <div className="text-4xl mb-4">🌴</div>
              <h3 className="text-2xl font-bold mb-3 text-yellow-300">Island Spirit</h3>
              <p className="text-gray-300">Every bottle captures the vibrant energy, bold flavors, and cultural pride of the Caribbean islands.</p>
            </div>
            <div className="bg-green-600/10 border border-green-600/30 p-8 rounded-lg hover:bg-green-600/20 transition-colors">
              <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
              <h3 className="text-2xl font-bold mb-3 text-green-400">Family Pride</h3>
              <p className="text-gray-300">A sacred legacy from the McNeil family to your kitchen. Taste the pride in every drop.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Rasta Stripe Divider */}
      <div className="rasta-stripe-thin my-12"></div>

      {/* Products Section */}
      <section id="products" className="py-20">
        <div className="container">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-4">
            <span className="text-red-500">Seven</span> <span className="text-yellow-400">Legendary</span> <span className="text-green-500">Flavors</span>
          </h2>
          <p className="text-center text-gray-300 text-lg mb-16 max-w-2xl mx-auto">
            Each flavor is a journey through Caribbean spice, heat, and soul. From classic to extreme, find your perfect match.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FLAVORS.map((flavor, idx) => (
              <div
                key={flavor.id}
                onClick={() => setSelectedFlavor(selectedFlavor === flavor.id ? null : flavor.id)}
                className="group cursor-pointer"
              >
                <div className={`${flavor.color} p-1 rounded-lg mb-4 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-current`}>
                  <div className="bg-black p-8 rounded-md h-48 flex items-center justify-center">
                    <div className="text-6xl">🌶️</div>
                  </div>
                </div>
                <h3 className={`text-2xl font-bold mb-2 ${flavor.accent} group-hover:text-yellow-300 transition-colors`}>
                  {flavor.name}
                </h3>
                <p className="text-gray-300 mb-3 line-clamp-2 group-hover:line-clamp-none transition-all">
                  {flavor.description}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">Notes:</span> {flavor.notes}
                </p>
                {selectedFlavor === flavor.id && (
                  <div className="mt-4 p-4 bg-yellow-400/10 border border-yellow-400/30 rounded-lg animate-in fade-in">
                    <p className="text-yellow-300 text-sm font-semibold">✨ Premium Caribbean Flavor Profile</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rasta Stripe Divider */}
      <div className="rasta-stripe-thin my-12"></div>

      {/* Flavor Sommelier Section */}
      <section id="sommelier" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-yellow-400">Flavor</span> Sommelier
            </h2>
            <div className="bg-gradient-to-br from-red-600/20 via-yellow-400/20 to-green-600/20 border border-yellow-400/30 rounded-lg p-12">
              <div className="text-6xl mb-6">🎯</div>
              <h3 className="text-3xl font-bold mb-4 text-yellow-300">Coming Soon</h3>
              <p className="text-lg text-gray-300 mb-6">
                Our AI-powered Flavor Sommelier will help you discover the perfect jerk sauce for any dish, occasion, or mood. Match your palate to our legendary flavors.
              </p>
              <p className="text-gray-400">
                Powered by advanced recipe intelligence and Caribbean culinary wisdom.
              </p>
              <Button 
                className="mt-8 bg-yellow-400 text-black hover:bg-yellow-300 font-bold px-8 py-3"
                disabled
              >
                Notify Me When Available
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Rasta Stripe Divider */}
      <div className="rasta-stripe-thin my-12"></div>

      {/* Contact & Footer */}
      <footer id="contact" className="bg-black border-t border-yellow-500/20 py-16">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">Contact</h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center gap-3">
                  <Mail size={20} className="text-red-500" />
                  <a href="mailto:hello@reggaekitchen.com" className="hover:text-yellow-400 transition-colors">
                    hello@reggaekitchen.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={20} className="text-green-500" />
                  <span>+1 (555) REGGAE-KITCHEN</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={20} className="text-red-500" />
                  <span>Caribbean, Earth 🌍</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#about" className="hover:text-yellow-400 transition-colors">About Us</a></li>
                <li><a href="#products" className="hover:text-yellow-400 transition-colors">Our Flavors</a></li>
                <li><a href="#sommelier" className="hover:text-yellow-400 transition-colors">Flavor Sommelier</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Recipe Ideas</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">Follow Us</h3>
              <div className="space-y-2 text-gray-300">
                <p className="text-sm">Connect with the reggae kitchen family on social media for recipes, stories, and Caribbean vibes.</p>
                <div className="flex gap-4 pt-4">
                  <a href="#" className="text-red-500 hover:text-red-400 text-2xl transition-colors">f</a>
                  <a href="#" className="text-yellow-400 hover:text-yellow-300 text-2xl transition-colors">📷</a>
                  <a href="#" className="text-green-500 hover:text-green-400 text-2xl transition-colors">𝕏</a>
                </div>
              </div>
            </div>
          </div>

          <div className="rasta-stripe-thin mb-8"></div>

          <div className="text-center text-gray-500 text-sm">
            <p>© 2026 Wayne Passion Reggae Kitchen. A sacred Reid family legacy. 🌴🔥</p>
            <p className="mt-2">Crafted with Caribbean soul and authentic jerk tradition.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
