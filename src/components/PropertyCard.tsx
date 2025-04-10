
import { BedDouble, Home, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface PropertyCardProps {
  id: number;
  title: string;
  address: string;
  price: number;
  bedrooms: number;
  type: string;
  imageUrl: string;
}

const PropertyCard = ({
  id,
  title,
  address,
  price,
  bedrooms,
  type,
  imageUrl,
}: PropertyCardProps) => {
  return (
    <Card className="overflow-hidden transition-transform hover:scale-[1.02] bg-white/80 backdrop-blur-sm border-housing-200 h-full flex flex-col">
      <Link to={`/property/${id}`} className="overflow-hidden">
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full transition-transform hover:scale-110 duration-700"
          />
          <Badge className="absolute top-4 left-4 bg-white/90 text-housing-800 hover:bg-white">
            {type}
          </Badge>
        </div>
      </Link>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-display text-housing-800">
            {title}
          </CardTitle>
          <span className="text-lg font-semibold text-housing-700">
            KSh {price.toLocaleString()}/mo
          </span>
        </div>
        <CardDescription className="flex items-center gap-1">
          <MapPin className="w-4 h-4 text-housing-400" />
          {address}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center gap-4 text-housing-600">
          <div className="flex items-center gap-1">
            <BedDouble className="w-4 h-4" />
            <span>{bedrooms} Beds</span>
          </div>
          <div className="flex items-center gap-1">
            <Home className="w-4 h-4" />
            <span>{type}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link to={`/property/${id}`}>
          <Button variant="outline">View Details</Button>
        </Link>
        <Link to={`/apply?propertyId=${id}&propertyName=${encodeURIComponent(title)}`}>
          <Button>Apply Now</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
