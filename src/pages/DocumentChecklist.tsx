
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { CheckCircle2, Circle, Download, Info, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface DocumentItem {
  id: string;
  name: string;
  description: string;
  required: boolean;
  uploaded: boolean;
}

const DocumentChecklist = () => {
  const { toast } = useToast();
  const [documents, setDocuments] = useState<DocumentItem[]>([
    {
      id: "id-proof",
      name: "ID / Passport",
      description: "Valid government-issued identification",
      required: true,
      uploaded: true
    },
    {
      id: "income-proof",
      name: "Proof of Income",
      description: "Last 3 months pay slips or bank statements",
      required: true,
      uploaded: false
    },
    {
      id: "employment-letter",
      name: "Employment Letter",
      description: "Confirmation of employment status",
      required: true,
      uploaded: false
    },
    {
      id: "tax-compliance",
      name: "Tax Compliance Certificate",
      description: "KRA tax compliance certificate",
      required: true,
      uploaded: false
    },
    {
      id: "references",
      name: "References",
      description: "Character references from previous landlords",
      required: false,
      uploaded: false
    },
    {
      id: "credit-report",
      name: "Credit Report",
      description: "Recent credit report (if available)",
      required: false,
      uploaded: false
    },
  ]);

  const handleUpload = (id: string) => {
    // In a real app, this would handle file upload
    const updatedDocuments = documents.map(doc => 
      doc.id === id ? { ...doc, uploaded: true } : doc
    );
    setDocuments(updatedDocuments);
    
    toast({
      title: "Document uploaded",
      description: "Your document has been successfully uploaded",
    });
  };

  const completedCount = documents.filter(doc => doc.uploaded).length;
  const totalCount = documents.length;
  const completionPercentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="min-h-screen bg-housing-50">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-housing-800 mb-2">
            Document Checklist
          </h1>
          <p className="text-housing-600">
            Track required documents for your housing application
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-display text-housing-800">Required Documents</CardTitle>
                <CardDescription>
                  Upload the following documents to complete your application
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {documents.map((doc) => (
                    <div key={doc.id} className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        {doc.uploaded ? (
                          <CheckCircle2 className="h-6 w-6 text-green-600 mt-1" />
                        ) : (
                          <Circle className="h-6 w-6 text-housing-300 mt-1" />
                        )}
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-medium text-housing-800">{doc.name}</h3>
                            {doc.required && (
                              <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
                                Required
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-housing-600 mt-1">{doc.description}</p>
                        </div>
                      </div>
                      
                      <div>
                        {doc.uploaded ? (
                          <Button variant="outline" size="sm" className="text-housing-600">
                            <Download className="h-4 w-4 mr-1" /> View
                          </Button>
                        ) : (
                          <Button size="sm" onClick={() => handleUpload(doc.id)}>
                            <Upload className="h-4 w-4 mr-1" /> Upload
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-display text-housing-800">Completion Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-housing-600 mb-2">
                    <span>Progress</span>
                    <span>{completionPercentage}%</span>
                  </div>
                  <Progress value={completionPercentage} className="h-2" />
                </div>
                
                <div className="text-sm">
                  <p className="font-medium text-housing-800 mb-2">
                    {completedCount} of {totalCount} documents uploaded
                  </p>
                  
                  <div className="bg-amber-50 border border-amber-200 rounded-md p-3 flex items-start mt-4">
                    <Info className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
                    <div className="text-amber-800 text-sm">
                      <p className="font-medium">Important</p>
                      <p className="mt-1">All required documents must be uploaded before your application can be processed. Make sure all documents are clear and legible.</p>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="text-center">
                    <Button className="w-full" disabled={completedCount < documents.filter(d => d.required).length}>
                      Submit Application
                    </Button>
                    <p className="text-xs text-housing-500 mt-2">
                      {completedCount < documents.filter(d => d.required).length ? 
                        "Upload all required documents to continue" : 
                        "Your application is ready to be submitted"}
                    </p>
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

export default DocumentChecklist;
