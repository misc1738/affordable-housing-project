
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { 
  Calendar, 
  MessageSquare, 
  ThumbsUp, 
  User, 
  MapPin, 
  Search,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
    role: "resident" | "landlord" | "admin";
  };
  date: string;
  likes: number;
  replies: number;
  category: "general" | "experience" | "advice" | "question";
  location?: string;
  tags: string[];
}

const Community = () => {
  const [posts, setPosts] = useState<ForumPost[]>([
    {
      id: "post-1",
      title: "My experience with the Kilimani housing project",
      content: "I recently moved into the new affordable housing development in Kilimani and wanted to share my experience. The application process was straightforward, though document verification took longer than expected. The community is welcoming and the amenities are excellent for the price point.",
      author: {
        name: "Jane Muthoni",
        role: "resident"
      },
      date: "April 15, 2023",
      likes: 24,
      replies: 8,
      category: "experience",
      location: "Kilimani, Nairobi",
      tags: ["kilimani", "experience", "new-resident"]
    },
    {
      id: "post-2",
      title: "Tips for speeding up your application approval",
      content: "After going through the process twice, I've learned some valuable lessons on how to get your affordable housing application approved faster. Make sure all your documents are clearly scanned, follow up weekly with the office, and have your references prepared in advance.",
      author: {
        name: "Michael Omondi",
        role: "resident"
      },
      date: "March 30, 2023",
      likes: 47,
      replies: 12,
      category: "advice",
      tags: ["application", "tips", "approval"]
    },
    {
      id: "post-3",
      title: "Questions about the Westlands project requirements",
      content: "I'm interested in applying for the new Westlands affordable housing project but I'm unsure about the income requirements. The website mentions 'affordable housing criteria' but doesn't specify income thresholds. Has anyone successfully applied who can share insights?",
      author: {
        name: "Daniel Kamau",
        role: "general"
      },
      date: "April 3, 2023",
      likes: 8,
      replies: 15,
      category: "question",
      location: "Westlands, Nairobi",
      tags: ["westlands", "requirements", "income-verification"]
    },
    {
      id: "post-4",
      title: "Official update on new Karen housing project",
      content: "We're excited to announce that applications for the Karen affordable housing project will open next month. This development includes 200 units ranging from studios to 3-bedroom apartments, with 30% reserved for first-time homebuyers. Stay tuned for the official application link.",
      author: {
        name: "Housing Administrator",
        role: "admin"
      },
      date: "April 12, 2023",
      likes: 89,
      replies: 34,
      category: "general",
      location: "Karen, Nairobi",
      tags: ["announcement", "karen", "new-project"]
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter posts based on search query
  const filteredPosts = searchQuery.trim() === "" 
    ? posts 
    : posts.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (post.location && post.location.toLowerCase().includes(searchQuery.toLowerCase()))
      );

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Administrator</Badge>;
      case "landlord":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Property Owner</Badge>;
      case "resident":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Resident</Badge>;
      default:
        return null;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "experience":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200";
      case "advice":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "question":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-housing-50">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-housing-800 mb-2">
            Community Forum
          </h1>
          <p className="text-housing-600">
            Connect with others, share experiences, and get advice about affordable housing
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-housing-400 h-4 w-4" />
                <Input
                  placeholder="Search discussions..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                <span>Filter</span>
              </Button>
              <Button>
                <MessageSquare className="h-4 w-4 mr-2" />
                <span>New Post</span>
              </Button>
            </div>

            <Tabs defaultValue="all" className="mb-6">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Discussions</TabsTrigger>
                <TabsTrigger value="experiences">Experiences</TabsTrigger>
                <TabsTrigger value="advice">Advice</TabsTrigger>
                <TabsTrigger value="questions">Questions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <div className="space-y-4">
                  {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                      <Card key={post.id} className="overflow-hidden">
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <div className="flex items-start space-x-4">
                              <Avatar>
                                <AvatarImage src={post.author.avatar} />
                                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center flex-wrap gap-2">
                                  <h3 className="text-lg font-medium text-housing-800">{post.author.name}</h3>
                                  {getRoleBadge(post.author.role)}
                                </div>
                                <div className="flex items-center text-sm text-housing-500 mt-1">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  <span>{post.date}</span>
                                  {post.location && (
                                    <>
                                      <span className="mx-2">•</span>
                                      <MapPin className="h-3 w-3 mr-1" />
                                      <span>{post.location}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                            <Badge className={getCategoryColor(post.category)}>
                              {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                            </Badge>
                          </div>
                          <CardTitle className="text-xl font-display mt-4">{post.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="pb-3">
                          <p className="text-housing-600">{post.content}</p>
                          <div className="flex flex-wrap gap-2 mt-4">
                            {post.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-housing-600">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter className="pt-0 flex justify-between">
                          <div className="flex items-center space-x-4">
                            <Button variant="ghost" size="sm" className="text-housing-600">
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              <span>{post.likes}</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="text-housing-600">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              <span>{post.replies} replies</span>
                            </Button>
                          </div>
                          <Button variant="outline" size="sm">
                            Read More
                          </Button>
                        </CardFooter>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-12 bg-white rounded-lg border border-housing-200">
                      <p className="text-housing-500">No discussions found matching your search.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="experiences">
                <div className="space-y-4">
                  {filteredPosts
                    .filter(post => post.category === "experience")
                    .map((post) => (
                      <Card key={post.id}>
                        {/* Same card content as above */}
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <div className="flex items-start space-x-4">
                              <Avatar>
                                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center flex-wrap gap-2">
                                  <h3 className="text-lg font-medium text-housing-800">{post.author.name}</h3>
                                  {getRoleBadge(post.author.role)}
                                </div>
                                <div className="flex items-center text-sm text-housing-500 mt-1">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  <span>{post.date}</span>
                                  {post.location && (
                                    <>
                                      <span className="mx-2">•</span>
                                      <MapPin className="h-3 w-3 mr-1" />
                                      <span>{post.location}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                            <Badge className={getCategoryColor(post.category)}>
                              Experience
                            </Badge>
                          </div>
                          <CardTitle className="text-xl font-display mt-4">{post.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="pb-3">
                          <p className="text-housing-600">{post.content}</p>
                        </CardContent>
                        <CardFooter className="pt-0 flex justify-between">
                          <div className="flex items-center space-x-4">
                            <Button variant="ghost" size="sm" className="text-housing-600">
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              <span>{post.likes}</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="text-housing-600">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              <span>{post.replies} replies</span>
                            </Button>
                          </div>
                          <Button variant="outline" size="sm">
                            Read More
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </TabsContent>
              
              {/* Similar content for advice and questions tabs */}
              <TabsContent value="advice">
                <div className="space-y-4">
                  {filteredPosts
                    .filter(post => post.category === "advice")
                    .map((post) => (
                      <Card key={post.id}>
                        {/* Card content */}
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <div className="flex items-start space-x-4">
                              <Avatar>
                                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center flex-wrap gap-2">
                                  <h3 className="text-lg font-medium text-housing-800">{post.author.name}</h3>
                                  {getRoleBadge(post.author.role)}
                                </div>
                                <div className="flex items-center text-sm text-housing-500 mt-1">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  <span>{post.date}</span>
                                </div>
                              </div>
                            </div>
                            <Badge className={getCategoryColor(post.category)}>
                              Advice
                            </Badge>
                          </div>
                          <CardTitle className="text-xl font-display mt-4">{post.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="pb-3">
                          <p className="text-housing-600">{post.content}</p>
                        </CardContent>
                        <CardFooter className="pt-0 flex justify-between">
                          <div className="flex items-center space-x-4">
                            <Button variant="ghost" size="sm" className="text-housing-600">
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              <span>{post.likes}</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="text-housing-600">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              <span>{post.replies} replies</span>
                            </Button>
                          </div>
                          <Button variant="outline" size="sm">
                            Read More
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </TabsContent>
              
              <TabsContent value="questions">
                <div className="space-y-4">
                  {filteredPosts
                    .filter(post => post.category === "question")
                    .map((post) => (
                      <Card key={post.id}>
                        {/* Card content */}
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <div className="flex items-start space-x-4">
                              <Avatar>
                                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center flex-wrap gap-2">
                                  <h3 className="text-lg font-medium text-housing-800">{post.author.name}</h3>
                                  {getRoleBadge(post.author.role)}
                                </div>
                                <div className="flex items-center text-sm text-housing-500 mt-1">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  <span>{post.date}</span>
                                </div>
                              </div>
                            </div>
                            <Badge className={getCategoryColor(post.category)}>
                              Question
                            </Badge>
                          </div>
                          <CardTitle className="text-xl font-display mt-4">{post.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="pb-3">
                          <p className="text-housing-600">{post.content}</p>
                        </CardContent>
                        <CardFooter className="pt-0 flex justify-between">
                          <div className="flex items-center space-x-4">
                            <Button variant="ghost" size="sm" className="text-housing-600">
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              <span>{post.likes}</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="text-housing-600">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              <span>{post.replies} replies</span>
                            </Button>
                          </div>
                          <Button variant="outline" size="sm">
                            Read More
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-xl font-display text-housing-800">Community Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-housing-600">
                  <li className="flex items-start">
                    <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">1</span>
                    <span>Be respectful and considerate in all interactions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">2</span>
                    <span>Do not share private information about housing applications</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">3</span>
                    <span>Keep discussions focused on affordable housing topics</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">4</span>
                    <span>No solicitation or promotional content</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-xl font-display text-housing-800">Popular Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-housing-600">
                    #application
                  </Badge>
                  <Badge variant="outline" className="text-housing-600">
                    #kilimani
                  </Badge>
                  <Badge variant="outline" className="text-housing-600">
                    #first-time-buyer
                  </Badge>
                  <Badge variant="outline" className="text-housing-600">
                    #requirements
                  </Badge>
                  <Badge variant="outline" className="text-housing-600">
                    #tips
                  </Badge>
                  <Badge variant="outline" className="text-housing-600">
                    #experience
                  </Badge>
                  <Badge variant="outline" className="text-housing-600">
                    #westlands
                  </Badge>
                  <Badge variant="outline" className="text-housing-600">
                    #karen
                  </Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-display text-housing-800">Active Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>JM</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-housing-800">Jane Muthoni</p>
                        <p className="text-xs text-housing-500">24 contributions</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Resident</Badge>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>MO</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-housing-800">Michael Omondi</p>
                        <p className="text-xs text-housing-500">18 contributions</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Resident</Badge>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>HA</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-housing-800">Housing Admin</p>
                        <p className="text-xs text-housing-500">42 contributions</p>
                      </div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Admin</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
