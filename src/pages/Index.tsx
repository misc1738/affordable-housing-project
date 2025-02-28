
import SearchHero from "@/components/SearchHero";
import AffordabilityCalculator from "@/components/AffordabilityCalculator";
import PropertyCard from "@/components/PropertyCard";
import Navbar from "@/components/Navbar";
import PropertyFilters from "@/components/PropertyFilters";
import ApplicationTracker from "@/components/ApplicationTracker";
import HousingResources from "@/components/HousingResources";

// Sample properties data
const properties = [
  {
    id: 1,
    title: "Modern Apartment",
    address: "123 Main St, Brooklyn, NY",
    price: 1500,
    bedrooms: 2,
    type: "Apartment",
    imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
  },
  {
    id: 2,
    title: "Cozy Studio",
    address: "456 Park Ave, Manhattan, NY",
    price: 1200,
    bedrooms: 1,
    type: "Studio",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
  },
  {
    id: 3,
    title: "Family Home",
    address: "789 Oak St, Queens, NY",
    price: 2200,
    bedrooms: 3,
    type: "House",
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
  },
];

// Sample application steps
const applicationSteps = [
  {
    id: 1,
    title: "Application Submitted",
    description: "Your application has been received and is being processed.",
    status: "completed" as const,
    date: "May 1, 2023",
  },
  {
    id: 2,
    title: "Background Check",
    description: "We are reviewing your background and credit information.",
    status: "current" as const,
    date: "In progress",
  },
  {
    id: 3,
    title: "Landlord Approval",
    description: "Your application will be reviewed by the property owner.",
    status: "upcoming" as const,
  },
  {
    id: 4,
    title: "Final Approval",
    description: "Final decision and lease preparation.",
    status: "upcoming" as const,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-housing-50">
      <Navbar />
      
      <div className="pt-16"> {/* Add padding top to account for fixed navbar */}
        <SearchHero />
      </div>
      
      <section className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <PropertyFilters />
        </div>
        
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-housing-800 mb-4">
            Featured Properties
          </h2>
          <p className="text-housing-600 max-w-2xl mx-auto">
            Discover our handpicked selection of affordable properties in your area
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 bg-gradient-to-b from-transparent to-housing-100/50">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-housing-800 mb-4">
            Plan Your Budget
          </h2>
          <p className="text-housing-600 max-w-2xl mx-auto">
            Use our calculator to determine your ideal rental budget
          </p>
        </div>
        
        <AffordabilityCalculator />
      </section>
      
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-housing-800 mb-4">
            Track Your Applications
          </h2>
          <p className="text-housing-600 max-w-2xl mx-auto">
            Stay updated on your housing applications in real-time
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <ApplicationTracker 
            applicationId="APP-12345"
            property="Modern Apartment - 123 Main St, Brooklyn, NY"
            steps={applicationSteps}
          />
        </div>
      </section>
      
      <section className="container mx-auto px-4 py-16 bg-gradient-to-b from-transparent to-housing-100/50">
        <HousingResources />
      </section>

      <footer className="bg-housing-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-display text-xl font-bold mb-4">Affordable Abode</h3>
              <p className="text-housing-300 text-sm">
                Connecting people with affordable housing options tailored to their needs and budget.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-white/90">Quick Links</h4>
              <ul className="space-y-2 text-sm text-housing-300">
                <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Search Properties</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Apply for Housing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Resources</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-white/90">Resources</h4>
              <ul className="space-y-2 text-sm text-housing-300">
                <li><a href="#" className="hover:text-white transition-colors">Housing Programs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tenant Rights</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Financial Assistance</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-white/90">Contact Us</h4>
              <ul className="space-y-2 text-sm text-housing-300">
                <li>support@affordableabode.com</li>
                <li>(555) 123-4567</li>
                <li>Mon-Fri: 9am - 5pm EST</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-housing-700 pt-8 text-center">
            <p className="text-housing-400 text-sm">
              © {new Date().getFullYear()} Affordable Abode Connect. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
