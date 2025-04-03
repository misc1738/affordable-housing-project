
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building, FileText, CreditCard, Home, User, Book, Link } from "lucide-react";

interface ResourceProps {
  title: string;
  description: string;
  link: string;
  category: string;
  icon?: React.ReactNode;
}

const resources: ResourceProps[] = [
  {
    title: "Affordable Housing Program (AHP)",
    description: "Learn about Kenya's national initiative to provide affordable housing to citizens.",
    link: "#",
    category: "Government Programs",
    icon: <Building className="h-5 w-5 text-housing-700" />
  },
  {
    title: "Kenya Mortgage Refinance Company",
    description: "Information about KMRC and how it makes home loans more affordable.",
    link: "#",
    category: "Government Programs",
    icon: <Home className="h-5 w-5 text-housing-700" />
  },
  {
    title: "First-Time Home Ownership Scheme",
    description: "Nairobi County's program to help first-time homebuyers with down payments and loans.",
    link: "#",
    category: "Nairobi Housing Initiatives",
    icon: <User className="h-5 w-5 text-housing-700" />
  },
  {
    title: "Tenant Purchase Scheme",
    description: "How to participate in Kenya's rent-to-own housing programs.",
    link: "#",
    category: "Nairobi Housing Initiatives",
    icon: <Home className="h-5 w-5 text-housing-700" />
  },
  {
    title: "SACCO Housing Loans",
    description: "How to access affordable housing loans through Kenyan SACCOs.",
    link: "#",
    category: "Financial Resources",
    icon: <CreditCard className="h-5 w-5 text-housing-700" />
  },
  {
    title: "Housing Finance Bank Options",
    description: "Compare mortgage options from Kenyan financial institutions.",
    link: "#",
    category: "Financial Resources",
    icon: <CreditCard className="h-5 w-5 text-housing-700" />
  },
  {
    title: "Tenant Rights in Kenya",
    description: "Understanding your legal rights as a tenant under Kenyan law.",
    link: "#",
    category: "Legal Resources",
    icon: <FileText className="h-5 w-5 text-housing-700" />
  },
  {
    title: "Rent Tribunal Information",
    description: "How to resolve landlord-tenant disputes through Kenya's Rent Tribunal.",
    link: "#",
    category: "Legal Resources",
    icon: <FileText className="h-5 w-5 text-housing-700" />
  },
  {
    title: "Housing Cooperatives",
    description: "Join community-based housing cooperatives in Kenya for better housing options.",
    link: "#",
    category: "Community Resources",
    icon: <Book className="h-5 w-5 text-housing-700" />
  },
  {
    title: "Housing Advisory Services",
    description: "Connect with professional housing advisors in Kenya for guidance.",
    link: "#",
    category: "Community Resources",
    icon: <Link className="h-5 w-5 text-housing-700" />
  }
];

const ResourceCard = ({ title, description, link, category, icon }: ResourceProps) => {
  return (
    <Card className="h-full bg-white/80 backdrop-blur-sm border-housing-200 hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-display text-housing-800">
            {title}
          </CardTitle>
          <div className="flex-shrink-0 ml-2">
            {icon}
          </div>
        </div>
        <CardDescription>
          <span className="inline-block px-2 py-1 text-xs rounded-full bg-housing-100 text-housing-800">
            {category}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-housing-600 mb-4">
          {description}
        </p>
        <a 
          href={link} 
          className="text-sm font-medium text-housing-800 hover:underline"
        >
          Learn more →
        </a>
      </CardContent>
    </Card>
  );
};

const HousingResources = () => {
  // Group resources by category
  const categories = Array.from(
    new Set(resources.map((resource) => resource.category))
  );

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-housing-800 mb-4">
          Housing Resources
        </h2>
        <p className="text-housing-600 max-w-2xl mx-auto">
          Access important information about affordable housing programs and resources in Kenya
        </p>
      </div>

      <div className="space-y-8">
        {categories.map((category) => (
          <div key={category}>
            <h3 className="text-xl font-semibold text-housing-800 mb-4">
              {category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {resources
                .filter((resource) => resource.category === category)
                .map((resource) => (
                  <ResourceCard key={resource.title} {...resource} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HousingResources;
