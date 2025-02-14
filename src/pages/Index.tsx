
import SearchHero from "@/components/SearchHero";
import AffordabilityCalculator from "@/components/AffordabilityCalculator";
import PropertyCard from "@/components/PropertyCard";

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

const Index = () => {
  return (
    <div className="min-h-screen bg-housing-50">
      <SearchHero />
      
      <section className="container mx-auto px-4 py-16">
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

      <footer className="bg-housing-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-display font-bold mb-4">
              Ready to Find Your Next Home?
            </h3>
            <p className="text-housing-200 mb-8">
              Join thousands of people who found their perfect affordable home through our platform
            </p>
            <button className="px-8 py-3 bg-white text-housing-800 rounded-lg font-semibold hover:bg-housing-100 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
