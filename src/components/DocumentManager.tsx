
import { useState } from 'react';
import { File, Upload, Trash2, Check, AlertCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Document {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadDate: Date;
  status: 'pending' | 'approved' | 'rejected';
  category: 'identification' | 'financial' | 'employment' | 'other';
}

const DocumentManager = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'ID_card.pdf',
      size: 2400000, // 2.4 MB
      type: 'application/pdf',
      uploadDate: new Date('2023-05-15'),
      status: 'approved',
      category: 'identification'
    },
    {
      id: '2',
      name: 'bank_statement.pdf',
      size: 1800000, // 1.8 MB
      type: 'application/pdf',
      uploadDate: new Date('2023-05-18'),
      status: 'pending',
      category: 'financial'
    },
    {
      id: '3',
      name: 'employment_letter.docx',
      size: 950000, // 950 KB
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      uploadDate: new Date('2023-05-20'),
      status: 'rejected',
      category: 'employment'
    }
  ]);
  
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  // Function to format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  // Simulate file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          
          // Add the new document to the list
          const file = files[0];
          const newDoc: Document = {
            id: Date.now().toString(),
            name: file.name,
            size: file.size,
            type: file.type,
            uploadDate: new Date(),
            status: 'pending',
            category: 'other'
          };
          
          setDocuments([...documents, newDoc]);
          
          toast({
            title: "Document uploaded",
            description: `${file.name} has been successfully uploaded`,
          });
          
          // Reset file input
          e.target.value = '';
          
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  // Delete a document
  const handleDelete = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
    toast({
      title: "Document deleted",
      description: "The document has been removed from your profile",
      variant: "destructive",
    });
  };

  // Get status badge class and icon
  const getStatusDetails = (status: Document['status']) => {
    switch (status) {
      case 'approved':
        return {
          icon: <Check className="h-4 w-4 text-green-500" />,
          label: 'Approved',
          className: 'bg-green-100 text-green-800'
        };
      case 'rejected':
        return {
          icon: <AlertCircle className="h-4 w-4 text-red-500" />,
          label: 'Rejected',
          className: 'bg-red-100 text-red-800'
        };
      default:
        return {
          icon: <File className="h-4 w-4 text-amber-500" />,
          label: 'Pending',
          className: 'bg-amber-100 text-amber-800'
        };
    }
  };

  // Filter documents by category
  const getDocumentsByCategory = (category: Document['category']) => {
    return documents.filter(doc => doc.category === category);
  };

  return (
    <Card className="bg-white shadow-sm border border-housing-200">
      <CardHeader>
        <CardTitle className="text-2xl font-display text-housing-800">Document Manager</CardTitle>
        <CardDescription>
          Upload and manage your housing application documents
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="all" className="mb-6">
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="identification">ID</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="employment">Employment</TabsTrigger>
            <TabsTrigger value="other">Other</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <DocumentList documents={documents} onDelete={handleDelete} />
          </TabsContent>
          
          <TabsContent value="identification">
            <DocumentList documents={getDocumentsByCategory('identification')} onDelete={handleDelete} />
          </TabsContent>
          
          <TabsContent value="financial">
            <DocumentList documents={getDocumentsByCategory('financial')} onDelete={handleDelete} />
          </TabsContent>
          
          <TabsContent value="employment">
            <DocumentList documents={getDocumentsByCategory('employment')} onDelete={handleDelete} />
          </TabsContent>
          
          <TabsContent value="other">
            <DocumentList documents={getDocumentsByCategory('other')} onDelete={handleDelete} />
          </TabsContent>
        </Tabs>
        
        <div className="border-t border-housing-200 pt-6 mt-4">
          <h3 className="text-lg font-medium text-housing-800 mb-4">Upload New Document</h3>
          
          <div className="border-2 border-dashed border-housing-300 rounded-lg p-6 text-center">
            <Upload className="h-10 w-10 text-housing-400 mx-auto mb-4" />
            <p className="text-housing-600 mb-4">
              Drag and drop your files here, or click to browse
            </p>
            <p className="text-xs text-housing-500 mb-4">
              Supported formats: PDF, JPG, PNG, DOC, DOCX (max 10MB)
            </p>
            <input 
              type="file" 
              id="document-upload" 
              className="hidden" 
              onChange={handleFileUpload}
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            />
            <Button asChild>
              <label htmlFor="document-upload" className="cursor-pointer">
                Browse Files
              </label>
            </Button>
          </div>
          
          {isUploading && (
            <div className="mt-4">
              <div className="flex justify-between text-sm text-housing-600 mb-2">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="border-t border-housing-200 pt-4 text-sm text-housing-500">
        <p>
          All uploaded documents are encrypted and securely stored. Documents may be reviewed by our team for verification purposes.
        </p>
      </CardFooter>
    </Card>
  );
};

// Document list component
const DocumentList = ({ 
  documents, 
  onDelete 
}: { 
  documents: Document[],
  onDelete: (id: string) => void
}) => {
  // Function to format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };
  
  // Get status badge class and icon
  const getStatusDetails = (status: Document['status']) => {
    switch (status) {
      case 'approved':
        return {
          icon: <Check className="h-4 w-4 text-green-500" />,
          label: 'Approved',
          className: 'bg-green-100 text-green-800'
        };
      case 'rejected':
        return {
          icon: <AlertCircle className="h-4 w-4 text-red-500" />,
          label: 'Rejected',
          className: 'bg-red-100 text-red-800'
        };
      default:
        return {
          icon: <File className="h-4 w-4 text-amber-500" />,
          label: 'Pending',
          className: 'bg-amber-100 text-amber-800'
        };
    }
  };
  
  return (
    <div className="space-y-2">
      {documents.length === 0 ? (
        <div className="text-center py-10 text-housing-500">
          <FileText className="h-12 w-12 mx-auto text-housing-300 mb-2" />
          <p>No documents in this category</p>
        </div>
      ) : (
        documents.map(doc => {
          const { icon, label, className } = getStatusDetails(doc.status);
          
          return (
            <div 
              key={doc.id} 
              className="flex items-center justify-between p-3 border border-housing-200 rounded-md hover:bg-housing-50"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-housing-100 p-2 rounded">
                  <File className="h-5 w-5 text-housing-600" />
                </div>
                <div>
                  <p className="font-medium text-housing-800">{doc.name}</p>
                  <div className="flex items-center text-xs text-housing-500">
                    <span>{formatFileSize(doc.size)}</span>
                    <span className="mx-2">•</span>
                    <span>{doc.uploadDate.toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className={`flex items-center space-x-1 text-xs px-2 py-1 rounded-full ${className}`}>
                  {icon}
                  <span>{label}</span>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onDelete(doc.id)}
                  className="text-housing-500 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default DocumentManager;
