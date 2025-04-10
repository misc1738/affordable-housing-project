
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Community = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Jane Doe',
      category: 'resident',
      content: 'Looking for recommendations for a good plumber in the area.',
      replies: [
        { author: 'John Smith', content: 'I recommend Plumbers R Us. They are reliable and affordable.' },
      ],
    },
    {
      id: 2,
      author: 'Alice Johnson',
      category: 'landlord',
      content: 'Reminder to all tenants: Rent is due on the 1st of each month.',
      replies: [],
    },
  ]);
  const [newPostContent, setNewPostContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('resident');

  const handlePostSubmit = () => {
    if (newPostContent.trim() === '') {
      toast({
        title: "Error",
        description: "Post content cannot be empty.",
        variant: "destructive",
      });
      return;
    }

    const newPost = {
      id: posts.length + 1,
      author: 'Current User', // Replace with actual user
      category: selectedCategory,
      content: newPostContent,
      replies: [],
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
    toast({
      title: "Success",
      description: "Post submitted successfully.",
    });
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
            Connect with neighbors, share recommendations, and stay informed.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* New Post Card */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Create a New Post</CardTitle>
                <CardDescription>Share your thoughts or ask a question.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="category">Category:</Label>
                    <Select
                      defaultValue="resident"
                      onValueChange={(value) => setSelectedCategory(value as "resident" | "landlord" | "admin")}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="resident">Resident</SelectItem>
                        <SelectItem value="landlord">Landlord</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Textarea
                      placeholder="Write your post here..."
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                    />
                  </div>
                  <Button onClick={handlePostSubmit}>Submit Post</Button>
                </div>
              </CardContent>
            </Card>

            {/* Posts List */}
            <ScrollArea className="rounded-md border h-[500px] w-full">
              <div className="space-y-4 p-4">
                {posts.map((post) => (
                  <Card key={post.id}>
                    <CardHeader className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt={post.author} />
                        <AvatarFallback>{post.author.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="text-sm font-medium">{post.author}</CardTitle>
                        <CardDescription className="text-xs text-gray-500">{post.category}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p>{post.content}</p>
                      {post.replies.length > 0 && (
                        <div className="mt-4 space-y-2">
                          {post.replies.map((reply, index) => (
                            <div key={index} className="bg-gray-100 p-2 rounded-md">
                              <p className="text-sm font-medium">{reply.author}</p>
                              <p className="text-xs">{reply.content}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Sidebar */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Community Guidelines</CardTitle>
                <CardDescription>Please adhere to these guidelines.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Be respectful to all members.</li>
                  <li>No spam or self-promotion.</li>
                  <li>Stay on topic.</li>
                  <li>Report any inappropriate content.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
