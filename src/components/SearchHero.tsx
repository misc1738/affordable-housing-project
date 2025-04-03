
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchHero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/properties${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ""}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-housing-50 to-housing-100">
      <div className="absolute inset-0 bg-housing-800/5 backdrop-blur-sm" />
      <div className="relative z-10 container mx-auto px-4 text-center">
        <span className="inline-block animate-fade-in px-3 py-1 text-sm font-medium bg-housing-700/10 text-housing-900 rounded-full mb-6">
          Find Your Dream Home in Kenya
        </span>
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-housing-900 mb-6 animate-fade-in [animation-delay:200ms]">
          Affordable Housing
          <br />
          Made Simple
        </h1>
        <p className="text-housing-600 text-lg md:text-xl max-w-2xl mx-auto mb-8 animate-fade-in [animation-delay:400ms]">
          Connect with verified affordable housing options across Kenya tailored to your needs and budget
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto animate-fade-in [animation-delay:600ms]">
          <Input
            type="text"
            placeholder="Enter location (e.g., Kilimani, Westlands, Karen)"
            className="w-full sm:w-2/3 h-12 bg-white/80 backdrop-blur-sm border-housing-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button 
            className="w-full sm:w-auto h-12 px-8 bg-housing-800 hover:bg-housing-900 text-white transition-all"
            onClick={handleSearch}
          >
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchHero;
