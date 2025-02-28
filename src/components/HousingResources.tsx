
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ResourceProps {
  title: string;
  description: string;
  link: string;
  category: string;
}

const resources: ResourceProps[] = [
  {
    title: "Section 8 Housing Vouchers",
    description: "Learn about Section 8 housing vouchers and eligibility requirements.",
    link: "#",
    category: "Government Programs"
  },
  {
    title: "Low-Income Housing Tax Credit (LIHTC)",
    description: "Information about LIHTC properties and how to apply.",
    link: "#",
    category: "Government Programs"
  },
  {
    title: "First-Time Homebuyer Assistance",
    description: "Programs to help first-time homebuyers with down payments and loans.",
    link: "#",
    category: "Homebuying"
  },
  {
    title: "Rental Assistance Programs",
    description: "Emergency rental assistance and ongoing support programs.",
    link: "#",
    category: "Rental Support"
  },
  {
    title: "Understanding Your Rights as a Tenant",
    description: "Information about tenant rights and protections.",
    link: "#",
    category: "Legal Resources"
  },
  {
    title: "Housing Discrimination",
    description: "How to recognize and report housing discrimination.",
    link: "#",
    category: "Legal Resources"
  }
];

const ResourceCard = ({ title, description, link, category }: ResourceProps) => {
  return (
    <Card className="h-full bg-white/80 backdrop-blur-sm border-housing-200 hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-display text-housing-800">
          {title}
        </CardTitle>
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
          Access important information about affordable housing programs and resources
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
