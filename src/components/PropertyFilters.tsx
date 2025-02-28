
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DollarSign } from "lucide-react";

const PropertyFilters = () => {
  const [priceRange, setPriceRange] = useState("1000-2000");
  const [bedrooms, setBedrooms] = useState("any");
  const [propertyType, setPropertyType] = useState("any");
  const [eligibility, setEligibility] = useState("any");

  return (
    <div className="w-full bg-white/90 backdrop-blur-sm rounded-lg border border-housing-200 p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-housing-800 mb-4">Filter Properties</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="space-y-2">
          <Label htmlFor="price-range">Price Range</Label>
          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger id="price-range" className="w-full">
              <SelectValue placeholder="Select price range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-1000">$0 - $1,000</SelectItem>
              <SelectItem value="1000-2000">$1,000 - $2,000</SelectItem>
              <SelectItem value="2000-3000">$2,000 - $3,000</SelectItem>
              <SelectItem value="3000+">$3,000+</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="bedrooms">Bedrooms</Label>
          <Select value={bedrooms} onValueChange={setBedrooms}>
            <SelectTrigger id="bedrooms" className="w-full">
              <SelectValue placeholder="Select bedrooms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="studio">Studio</SelectItem>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3+</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="property-type">Property Type</Label>
          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger id="property-type" className="w-full">
              <SelectValue placeholder="Select property type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
              <SelectItem value="townhouse">Townhouse</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="eligibility">Eligibility</Label>
          <Select value={eligibility} onValueChange={setEligibility}>
            <SelectTrigger id="eligibility" className="w-full">
              <SelectValue placeholder="Select eligibility" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="section-8">Section 8</SelectItem>
              <SelectItem value="low-income">Low Income</SelectItem>
              <SelectItem value="senior">Senior Housing</SelectItem>
              <SelectItem value="disabled">Disability Housing</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-housing-100">
        <h4 className="text-sm font-medium text-housing-700 mb-3">Income Based Options</h4>
        <RadioGroup defaultValue="all" className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="all" />
            <Label htmlFor="all">All Properties</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="subsidized" id="subsidized" />
            <Label htmlFor="subsidized">Subsidized Only</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="income-restricted" id="income-restricted" />
            <Label htmlFor="income-restricted">Income Restricted</Label>
          </div>
        </RadioGroup>
      </div>
      
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <Button className="sm:flex-1 bg-housing-800 hover:bg-housing-900 text-white">
          Apply Filters
        </Button>
        <Button 
          variant="outline" 
          className="sm:flex-1 border-housing-300 text-housing-700 hover:bg-housing-50"
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default PropertyFilters;
