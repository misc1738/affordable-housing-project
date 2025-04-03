
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Check, ChevronLeft, ChevronRight, Home, DollarSign, MapPin, Users, Building, Layout, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { PropertyCard } from "@/components/PropertyCard";
import { useNavigate } from "react-router-dom";

interface Question {
  id: string;
  question: string;
  description?: string;
  type: "single" | "multiple" | "slider" | "radio";
  options?: Array<{
    id: string;
    label: string;
    icon?: React.ReactNode;
  }>;
  minLabel?: string;
  maxLabel?: string;
  sliderMin?: number;
  sliderMax?: number;
  sliderStep?: number;
}

interface PropertyRecommendation {
  id: number;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: string;
  image: string;
  matchScore: number;
  features: string[];
}

const PreferenceQuiz = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [results, setResults] = useState<PropertyRecommendation[]>([]);
  const [showResults, setShowResults] = useState(false);

  const questions: Question[] = [
    {
      id: "budget",
      question: "What's your monthly budget for housing?",
      description: "Drag the slider to indicate your maximum monthly housing budget",
      type: "slider",
      sliderMin: 10000,
      sliderMax: 100000,
      sliderStep: 5000,
      minLabel: "KSh 10,000",
      maxLabel: "KSh 100,000+"
    },
    {
      id: "location",
      question: "Which areas are you interested in?",
      description: "Select all locations that interest you",
      type: "multiple",
      options: [
        { id: "kilimani", label: "Kilimani" },
        { id: "westlands", label: "Westlands" },
        { id: "karen", label: "Karen" },
        { id: "langata", label: "Langata" },
        { id: "south-b", label: "South B" },
        { id: "south-c", label: "South C" },
        { id: "eastleigh", label: "Eastleigh" },
        { id: "parklands", label: "Parklands" },
      ]
    },
    {
      id: "property-type",
      question: "What type of property are you looking for?",
      description: "Select the type of property you're interested in",
      type: "radio",
      options: [
        { id: "apartment", label: "Apartment", icon: <Building className="h-5 w-5" /> },
        { id: "house", label: "House", icon: <Home className="h-5 w-5" /> },
        { id: "studio", label: "Studio", icon: <Layout className="h-5 w-5" /> },
        { id: "any", label: "Any", icon: <Sparkles className="h-5 w-5" /> }
      ]
    },
    {
      id: "bedrooms",
      question: "How many bedrooms do you need?",
      type: "radio",
      options: [
        { id: "1", label: "1 Bedroom" },
        { id: "2", label: "2 Bedrooms" },
        { id: "3", label: "3 Bedrooms" },
        { id: "4plus", label: "4+ Bedrooms" }
      ]
    },
    {
      id: "amenities",
      question: "Which amenities are important to you?",
      description: "Select all that apply",
      type: "multiple",
      options: [
        { id: "security", label: "24/7 Security" },
        { id: "parking", label: "Parking" },
        { id: "gym", label: "Gym" },
        { id: "pool", label: "Swimming Pool" },
        { id: "wifi", label: "High-speed Internet" },
        { id: "backup-power", label: "Backup Generator" },
        { id: "water-storage", label: "Water Storage" },
        { id: "children-play-area", label: "Children's Play Area" }
      ]
    },
    {
      id: "commute",
      question: "What's your maximum acceptable commute time?",
      description: "Drag the slider to indicate your maximum one-way commute time in minutes",
      type: "slider",
      sliderMin: 10,
      sliderMax: 60,
      sliderStep: 5,
      minLabel: "10 min",
      maxLabel: "60+ min"
    },
    {
      id: "household",
      question: "How many people will be living in the home?",
      type: "radio",
      options: [
        { id: "1", label: "Just me" },
        { id: "2", label: "2 people" },
        { id: "3-4", label: "3-4 people" },
        { id: "5plus", label: "5+ people" }
      ]
    }
  ];

  const handleNextStep = () => {
    if (currentStep < questions.length - 1) {
      // Check if the current question is answered
      const currentQuestion = questions[currentStep];
      if (!answers[currentQuestion.id] && currentQuestion.type !== "multiple") {
        toast({
          title: "Please answer the question",
          description: "This question requires an answer before proceeding",
          variant: "destructive",
        });
        return;
      }
      
      if (currentQuestion.type === "multiple" && 
          (!answers[currentQuestion.id] || answers[currentQuestion.id].length === 0)) {
        toast({
          title: "Please select at least one option",
          description: "This question requires at least one selection",
          variant: "destructive",
        });
        return;
      }
      
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      // Submit answers and show results
      generateResults();
      setShowResults(true);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSingleAnswer = (questionId: string, value: any) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleMultipleAnswer = (questionId: string, value: string) => {
    const currentAnswers = answers[questionId] || [];
    const updatedAnswers = currentAnswers.includes(value)
      ? currentAnswers.filter((item: string) => item !== value)
      : [...currentAnswers, value];
    
    setAnswers({ ...answers, [questionId]: updatedAnswers });
  };

  const generateResults = () => {
    // This would typically call an API with the answers
    // For demo purposes, we're generating fake recommendations based on answers
    
    // Sample property data - in a real app, this would be filtered based on user preferences
    const sampleProperties: PropertyRecommendation[] = [
      {
        id: 1,
        title: "Modern Apartment in Kilimani",
        location: "Kilimani, Nairobi",
        price: 45000,
        bedrooms: 2,
        bathrooms: 2,
        area: 80,
        type: "Apartment",
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
        matchScore: 95,
        features: ["24/7 Security", "Parking", "Backup Generator", "Water Storage"]
      },
      {
        id: 2,
        title: "Spacious Family Home in Karen",
        location: "Karen, Nairobi",
        price: 85000,
        bedrooms: 4,
        bathrooms: 3,
        area: 220,
        type: "House",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
        matchScore: 80,
        features: ["Large Garden", "24/7 Security", "Parking", "Swimming Pool"]
      },
      {
        id: 3,
        title: "Cozy Studio in Westlands",
        location: "Westlands, Nairobi",
        price: 30000,
        bedrooms: 1,
        bathrooms: 1,
        area: 45,
        type: "Studio",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
        matchScore: 85,
        features: ["High-speed Internet", "Gym", "24/7 Security", "Backup Generator"]
      }
    ];
    
    // Filter based on answers
    let filteredProperties = [...sampleProperties];
    
    // Filter by location if specified
    if (answers.location && answers.location.length > 0) {
      filteredProperties = filteredProperties.filter(property => {
        const propertyLocation = property.location.split(",")[0].trim().toLowerCase();
        return answers.location.some((loc: string) => 
          propertyLocation.includes(loc.toLowerCase())
        );
      });
    }
    
    // Filter by budget if specified
    if (answers.budget) {
      filteredProperties = filteredProperties.filter(property => 
        property.price <= answers.budget
      );
    }
    
    // Filter by property type if specified
    if (answers["property-type"] && answers["property-type"] !== "any") {
      filteredProperties = filteredProperties.filter(property => 
        property.type.toLowerCase() === answers["property-type"].toLowerCase()
      );
    }
    
    // Filter by number of bedrooms if specified
    if (answers.bedrooms) {
      const bedroomFilter = answers.bedrooms === "4plus" ? 4 : parseInt(answers.bedrooms);
      filteredProperties = filteredProperties.filter(property => 
        answers.bedrooms === "4plus" 
          ? property.bedrooms >= bedroomFilter
          : property.bedrooms === bedroomFilter
      );
    }
    
    // If no properties match exactly, return all with adjusted match scores
    if (filteredProperties.length === 0) {
      filteredProperties = sampleProperties.map(property => ({
        ...property,
        matchScore: Math.max(50, Math.min(70, property.matchScore - 30))
      }));
    }
    
    // Sort by match score
    filteredProperties.sort((a, b) => b.matchScore - a.matchScore);
    
    setResults(filteredProperties);
  };

  const handleRetakeQuiz = () => {
    setShowResults(false);
    setCurrentStep(0);
    setAnswers({});
  };

  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case "slider":
        return (
          <div className="space-y-6">
            <div className="pt-6">
              <Slider
                defaultValue={[answers[question.id] || (question.sliderMin || 0)]}
                min={question.sliderMin}
                max={question.sliderMax}
                step={question.sliderStep}
                onValueChange={(value) => handleSingleAnswer(question.id, value[0])}
              />
            </div>
            <div className="flex justify-between text-sm text-housing-500">
              <span>{question.minLabel}</span>
              <span>
                {question.id === "budget" 
                  ? `KSh ${(answers[question.id] || (question.sliderMin || 0)).toLocaleString()}`
                  : `${answers[question.id] || (question.sliderMin || 0)} minutes`}
              </span>
              <span>{question.maxLabel}</span>
            </div>
          </div>
        );
      
      case "multiple":
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-4">
            {question.options?.map(option => (
              <div key={option.id}>
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id={`${question.id}-${option.id}`} 
                    checked={(answers[question.id] || []).includes(option.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        handleMultipleAnswer(question.id, option.id);
                      } else {
                        handleMultipleAnswer(question.id, option.id);
                      }
                    }}
                  />
                  <Label 
                    htmlFor={`${question.id}-${option.id}`}
                    className="text-housing-700 cursor-pointer"
                  >
                    {option.icon && (
                      <span className="mr-2 inline-flex items-center justify-center">
                        {option.icon}
                      </span>
                    )}
                    {option.label}
                  </Label>
                </div>
              </div>
            ))}
          </div>
        );
      
      case "radio":
        return (
          <RadioGroup 
            value={answers[question.id] || ""} 
            onValueChange={(value) => handleSingleAnswer(question.id, value)}
            className="pt-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {question.options?.map(option => (
                <div key={option.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.id} id={`${question.id}-${option.id}`} />
                  <Label 
                    htmlFor={`${question.id}-${option.id}`}
                    className="flex items-center text-housing-700 cursor-pointer"
                  >
                    {option.icon && <span className="mr-2">{option.icon}</span>}
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        );
      
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
            Housing Preference Quiz
          </h1>
          <p className="text-housing-600">
            Answer a few questions to find your ideal affordable housing match
          </p>
        </div>

        {!showResults ? (
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-housing-500">Question {currentStep + 1} of {questions.length}</p>
                <span className="text-sm font-medium text-housing-700">
                  {Math.round(((currentStep + 1) / questions.length) * 100)}% Complete
                </span>
              </div>
              <Progress value={((currentStep + 1) / questions.length) * 100} className="h-2" />
              
              <CardTitle className="text-2xl font-display mt-6 flex items-center">
                {currentStep === 0 && <DollarSign className="h-6 w-6 mr-2 text-housing-700" />}
                {currentStep === 1 && <MapPin className="h-6 w-6 mr-2 text-housing-700" />}
                {currentStep === 2 && <Home className="h-6 w-6 mr-2 text-housing-700" />}
                {currentStep === 3 && <Building className="h-6 w-6 mr-2 text-housing-700" />}
                {currentStep === 4 && <Sparkles className="h-6 w-6 mr-2 text-housing-700" />}
                {currentStep === 5 && <ChevronRight className="h-6 w-6 mr-2 text-housing-700" />}
                {currentStep === 6 && <Users className="h-6 w-6 mr-2 text-housing-700" />}
                {questions[currentStep].question}
              </CardTitle>
              
              {questions[currentStep].description && (
                <CardDescription className="mt-2">
                  {questions[currentStep].description}
                </CardDescription>
              )}
            </CardHeader>
            
            <CardContent>
              {renderQuestion(questions[currentStep])}
            </CardContent>
            
            <CardFooter className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={handlePreviousStep}
                disabled={currentStep === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              
              <Button onClick={handleNextStep}>
                {currentStep < questions.length - 1 ? (
                  <>
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </>
                ) : (
                  <>
                    See Results
                    <Sparkles className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-2xl font-display text-housing-800">Your Personalized Recommendations</CardTitle>
                <CardDescription>
                  Based on your preferences, we've found these housing options that might be a good match for you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-6">
                  <p className="text-housing-700 font-medium">Your preferences:</p>
                  <div className="flex flex-wrap gap-2">
                    {answers.budget && (
                      <div className="bg-housing-100 text-housing-800 px-3 py-1 rounded-full text-sm flex items-center">
                        <DollarSign className="h-3 w-3 mr-1" />
                        Budget: Up to KSh {answers.budget.toLocaleString()}
                      </div>
                    )}
                    
                    {answers.location && answers.location.length > 0 && (
                      <div className="bg-housing-100 text-housing-800 px-3 py-1 rounded-full text-sm flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {answers.location.length === 1 
                          ? `Location: ${answers.location[0]}` 
                          : `Locations: ${answers.location.length} selected`}
                      </div>
                    )}
                    
                    {answers["property-type"] && (
                      <div className="bg-housing-100 text-housing-800 px-3 py-1 rounded-full text-sm flex items-center">
                        <Home className="h-3 w-3 mr-1" />
                        Type: {answers["property-type"].charAt(0).toUpperCase() + answers["property-type"].slice(1)}
                      </div>
                    )}
                    
                    {answers.bedrooms && (
                      <div className="bg-housing-100 text-housing-800 px-3 py-1 rounded-full text-sm flex items-center">
                        <Building className="h-3 w-3 mr-1" />
                        {answers.bedrooms === "4plus" 
                          ? "Bedrooms: 4+" 
                          : `Bedrooms: ${answers.bedrooms}`}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.map(property => (
                    <div key={property.id} className="relative">
                      <div className="absolute top-3 right-3 bg-housing-800 text-white px-2 py-1 rounded-full text-sm flex items-center">
                        <Check className="h-3 w-3 mr-1" />
                        {property.matchScore}% Match
                      </div>
                      <PropertyCard
                        id={property.id.toString()}
                        title={property.title}
                        location={property.location}
                        price={property.price}
                        bedrooms={property.bedrooms}
                        bathrooms={property.bathrooms}
                        size={property.area}
                        imageUrl={property.image}
                        onClick={() => navigate(`/property/${property.id}`)}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleRetakeQuiz}>
                  Retake Quiz
                </Button>
                <Button onClick={() => navigate("/properties")}>
                  Browse All Properties
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreferenceQuiz;
