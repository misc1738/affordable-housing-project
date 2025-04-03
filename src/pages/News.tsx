
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Calendar, ArrowRight, Search, Tag, User, Filter, ThumbsUp, MessageSquare, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: "policy" | "projects" | "tips" | "announcements";
  imageUrl: string;
  tags: string[];
  likes: number;
  comments: number;
  featured?: boolean;
}

const News = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([
    {
      id: "news-001",
      title: "Government Launches New Affordable Housing Initiative in Nairobi",
      excerpt: "The Kenyan government has announced a major affordable housing initiative aimed at addressing the housing deficit in Nairobi.",
      content: "The Kenyan government has announced a major affordable housing initiative aimed at addressing the housing deficit in Nairobi. The program, which is expected to deliver 100,000 new housing units over the next five years, will focus on providing quality housing at below-market rates for low and middle-income families. The initiative includes tax incentives for developers, streamlined approval processes, and innovative financing models to ensure affordability.",
      author: "Housing Ministry",
      date: "April 2, 2023",
      category: "policy",
      imageUrl: "https://images.unsplash.com/photo-1460317442991-0ec209397118",
      tags: ["government", "policy", "nairobi", "affordable-housing"],
      likes: 45,
      comments: 12,
      featured: true
    },
    {
      id: "news-002",
      title: "Five Tips for First-Time Affordable Housing Applicants",
      excerpt: "Navigating the affordable housing application process can be daunting for first-time applicants. Here are five essential tips to improve your chances of success.",
      content: "Navigating the affordable housing application process can be daunting for first-time applicants. Here are five essential tips to improve your chances of success: 1) Start gathering your documentation early, 2) Understand the income requirements, 3) Be thorough and accurate on your application, 4) Follow up regularly on your application status, and 5) Consider multiple housing options simultaneously. By following these guidelines, you can significantly improve your chances of securing affordable housing.",
      author: "Housing Advisor",
      date: "March 28, 2023",
      category: "tips",
      imageUrl: "https://images.unsplash.com/photo-1554469384-e58fac16e23a",
      tags: ["tips", "application", "first-time-applicants"],
      likes: 67,
      comments: 24
    },
    {
      id: "news-003",
      title: "Westlands Affordable Housing Project Breaks Ground",
      excerpt: "Construction has begun on a new affordable housing development in Westlands, with 200 units expected to be completed by late 2024.",
      content: "Construction has begun on a new affordable housing development in Westlands, with 200 units expected to be completed by late 2024. The development, named Westlands Community Heights, will include a mix of one, two, and three-bedroom apartments, as well as community facilities such as a daycare center, green spaces, and retail shops. The project is a public-private partnership and aims to create a sustainable, mixed-income community in one of Nairobi's most desirable neighborhoods.",
      author: "Development Authority",
      date: "April 5, 2023",
      category: "projects",
      imageUrl: "https://images.unsplash.com/photo-1486325212027-8081e485255e",
      tags: ["westlands", "construction", "development"],
      likes: 38,
      comments: 7
    },
    {
      id: "news-004",
      title: "Affordable Housing Lottery Opens for Karen Development",
      excerpt: "Applications are now being accepted for the lottery for 150 affordable housing units in the new Karen Green Estate development.",
      content: "Applications are now being accepted for the lottery for 150 affordable housing units in the new Karen Green Estate development. The development includes studio, one-bedroom, and two-bedroom units, with prices starting at KSh 1.5 million. To be eligible, applicants must meet income requirements and be first-time homebuyers. The lottery will be open for 30 days, with winners selected in a public drawing next month.",
      author: "Housing Authority",
      date: "April 1, 2023",
      category: "announcements",
      imageUrl: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf",
      tags: ["karen", "lottery", "applications"],
      likes: 92,
      comments: 31,
      featured: true
    },
    {
      id: "news-005",
      title: "How Affordable Housing is Transforming Nairobi's Urban Landscape",
      excerpt: "Nairobi's urban landscape is evolving as affordable housing initiatives address historical inequalities and create more inclusive communities.",
      content: "Nairobi's urban landscape is evolving as affordable housing initiatives address historical inequalities and create more inclusive communities. With the implementation of mixed-income developments, neighborhoods that were once sharply divided are now becoming more integrated. This trend is not only providing much-needed housing but also contributing to economic development in previously underserved areas. Urban planners are increasingly incorporating sustainable design principles and community spaces to ensure these developments enhance the overall quality of urban life.",
      author: "Urban Planning Expert",
      date: "March 30, 2023",
      category: "policy",
      imageUrl: "https://images.unsplash.com/photo-1444653007905-d9c7409f6a12",
      tags: ["urban-planning", "development", "nairobi"],
      likes: 53,
      comments: 15
    },
    {
      id: "news-006",
      title: "New Financing Options Make Affordable Housing More Accessible",
      excerpt: "Several Kenyan banks have announced new mortgage products specifically designed for affordable housing purchasers.",
      content: "Several Kenyan banks have announced new mortgage products specifically designed for affordable housing purchasers. These new financing options include lower down payment requirements, extended repayment periods, and interest rates as much as 2% below market rates. Additionally, the Kenya Mortgage Refinance Company (KMRC) is providing liquidity to banks to enable them to offer more favorable terms to lower and middle-income borrowers. These initiatives are expected to significantly increase homeownership rates among demographics that have traditionally been excluded from the property market.",
      author: "Financial Analyst",
      date: "March 25, 2023",
      category: "tips",
      imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3",
      tags: ["financing", "mortgages", "banks"],
      likes: 41,
      comments: 9
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter articles based on search query
  const filteredArticles = searchQuery.trim() === "" 
    ? articles 
    : articles.filter(article => 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        article.author.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const featuredArticles = articles.filter(article => article.featured);
  
  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "policy":
        return <Badge className="bg-blue-100 text-blue-800">Policy</Badge>;
      case "projects":
        return <Badge className="bg-green-100 text-green-800">Projects</Badge>;
      case "tips":
        return <Badge className="bg-amber-100 text-amber-800">Tips</Badge>;
      case "announcements":
        return <Badge className="bg-purple-100 text-purple-800">Announcements</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-housing-50">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-housing-800 mb-2">
            Housing News & Updates
          </h1>
          <p className="text-housing-600">
            Stay informed about affordable housing policies, projects, and opportunities
          </p>
        </div>

        {featuredArticles.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-display font-semibold text-housing-800 mb-4">Featured News</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredArticles.map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-48 relative">
                    <img 
                      src={article.imageUrl} 
                      alt={article.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      {getCategoryBadge(article.category)}
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-display">{article.title}</CardTitle>
                    <div className="flex items-center text-sm text-housing-500">
                      <User className="h-3 w-3 mr-1" />
                      <span className="mr-3">{article.author}</span>
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{article.date}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-housing-600">{article.excerpt}</p>
                  </CardContent>
                  <CardFooter className="pt-0 flex justify-between">
                    <div className="flex items-center space-x-4 text-housing-500 text-sm">
                      <span className="flex items-center">
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        {article.likes}
                      </span>
                      <span className="flex items-center">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        {article.comments}
                      </span>
                    </div>
                    <Button variant="outline" size="sm">
                      Read More <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-housing-400 h-4 w-4" />
            <Input
              placeholder="Search news articles..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            <span>Filter</span>
          </Button>
          <Button variant="outline" className="flex items-center">
            <Tag className="h-4 w-4 mr-2" />
            <span>Topics</span>
          </Button>
        </div>

        <Tabs defaultValue="all" className="mb-6">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All News</TabsTrigger>
            <TabsTrigger value="policy">Policy Updates</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="tips">Tips & Guides</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-40 relative">
                    <img 
                      src={article.imageUrl} 
                      alt={article.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      {getCategoryBadge(article.category)}
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-display line-clamp-2">{article.title}</CardTitle>
                    <div className="flex items-center text-xs text-housing-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{article.date}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-housing-600 line-clamp-3">{article.excerpt}</p>
                  </CardContent>
                  <CardFooter className="pt-0 flex justify-between">
                    <div className="flex items-center space-x-3 text-housing-500 text-xs">
                      <span className="flex items-center">
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        {article.likes}
                      </span>
                      <span className="flex items-center">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        {article.comments}
                      </span>
                    </div>
                    <Button variant="outline" size="sm">
                      Read
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="policy">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredArticles
                .filter(article => article.category === "policy")
                .map((article) => (
                  <Card key={article.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    {/* Same card content as above */}
                    <div className="h-40 relative">
                      <img 
                        src={article.imageUrl} 
                        alt={article.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3">
                        {getCategoryBadge(article.category)}
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-display line-clamp-2">{article.title}</CardTitle>
                      <div className="flex items-center text-xs text-housing-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{article.date}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-housing-600 line-clamp-3">{article.excerpt}</p>
                    </CardContent>
                    <CardFooter className="pt-0 flex justify-between">
                      <div className="flex items-center space-x-3 text-housing-500 text-xs">
                        <span className="flex items-center">
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          {article.likes}
                        </span>
                        <span className="flex items-center">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          {article.comments}
                        </span>
                      </div>
                      <Button variant="outline" size="sm">
                        Read
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="projects">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredArticles
                .filter(article => article.category === "projects")
                .map((article) => (
                  <Card key={article.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    {/* Same card content as above */}
                    <div className="h-40 relative">
                      <img 
                        src={article.imageUrl} 
                        alt={article.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3">
                        {getCategoryBadge(article.category)}
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-display line-clamp-2">{article.title}</CardTitle>
                      <div className="flex items-center text-xs text-housing-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{article.date}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-housing-600 line-clamp-3">{article.excerpt}</p>
                    </CardContent>
                    <CardFooter className="pt-0 flex justify-between">
                      <div className="flex items-center space-x-3 text-housing-500 text-xs">
                        <span className="flex items-center">
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          {article.likes}
                        </span>
                        <span className="flex items-center">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          {article.comments}
                        </span>
                      </div>
                      <Button variant="outline" size="sm">
                        Read
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="tips">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredArticles
                .filter(article => article.category === "tips")
                .map((article) => (
                  <Card key={article.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    {/* Same card content as above */}
                    <div className="h-40 relative">
                      <img 
                        src={article.imageUrl} 
                        alt={article.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3">
                        {getCategoryBadge(article.category)}
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-display line-clamp-2">{article.title}</CardTitle>
                      <div className="flex items-center text-xs text-housing-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{article.date}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-housing-600 line-clamp-3">{article.excerpt}</p>
                    </CardContent>
                    <CardFooter className="pt-0 flex justify-between">
                      <div className="flex items-center space-x-3 text-housing-500 text-xs">
                        <span className="flex items-center">
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          {article.likes}
                        </span>
                        <span className="flex items-center">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          {article.comments}
                        </span>
                      </div>
                      <Button variant="outline" size="sm">
                        Read
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="border-t border-housing-200 mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-display font-semibold text-housing-800 mb-4">Policy Resources</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <FileText className="h-5 w-5 text-housing-600 mr-2" />
                  <a href="#" className="text-housing-700 hover:text-housing-900 hover:underline">Affordable Housing Act Guidelines</a>
                </li>
                <li className="flex items-center">
                  <FileText className="h-5 w-5 text-housing-600 mr-2" />
                  <a href="#" className="text-housing-700 hover:text-housing-900 hover:underline">Income Qualification Standards</a>
                </li>
                <li className="flex items-center">
                  <FileText className="h-5 w-5 text-housing-600 mr-2" />
                  <a href="#" className="text-housing-700 hover:text-housing-900 hover:underline">Housing Policy Framework 2023</a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-display font-semibold text-housing-800 mb-4">Popular Topics</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-housing-700 hover:bg-housing-100 cursor-pointer">
                  #affordability
                </Badge>
                <Badge variant="outline" className="text-housing-700 hover:bg-housing-100 cursor-pointer">
                  #nairobi
                </Badge>
                <Badge variant="outline" className="text-housing-700 hover:bg-housing-100 cursor-pointer">
                  #financing
                </Badge>
                <Badge variant="outline" className="text-housing-700 hover:bg-housing-100 cursor-pointer">
                  #newdevelopments
                </Badge>
                <Badge variant="outline" className="text-housing-700 hover:bg-housing-100 cursor-pointer">
                  #firsttimehomebuyer
                </Badge>
                <Badge variant="outline" className="text-housing-700 hover:bg-housing-100 cursor-pointer">
                  #mortgages
                </Badge>
                <Badge variant="outline" className="text-housing-700 hover:bg-housing-100 cursor-pointer">
                  #rentalproperties
                </Badge>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-display font-semibold text-housing-800 mb-4">Subscribe to Updates</h3>
              <p className="text-housing-600 mb-4">Stay informed about the latest housing news and opportunities.</p>
              <div className="flex gap-2">
                <Input placeholder="Enter your email" className="flex-grow" />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
