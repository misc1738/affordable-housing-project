
import { useState } from 'react';
import { Bell, BellOff, Plus, Settings, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface PropertyAlert {
  id: string;
  name: string;
  location: string;
  priceMin: number;
  priceMax: number;
  bedrooms: string;
  propertyType: string;
  isActive: boolean;
  frequency: 'daily' | 'weekly' | 'immediately';
  createdAt: Date;
}

const PropertyAlerts = () => {
  const [alerts, setAlerts] = useState<PropertyAlert[]>([
    {
      id: '1',
      name: 'Affordable in Kilimani',
      location: 'Kilimani, Nairobi',
      priceMin: 30000,
      priceMax: 70000,
      bedrooms: '2',
      propertyType: 'apartment',
      isActive: true,
      frequency: 'daily',
      createdAt: new Date('2023-05-10')
    },
    {
      id: '2',
      name: 'Family Home Search',
      location: 'Karen, Nairobi',
      priceMin: 80000,
      priceMax: 150000,
      bedrooms: '3+',
      propertyType: 'house',
      isActive: true,
      frequency: 'weekly',
      createdAt: new Date('2023-06-15')
    }
  ]);
  
  const [newAlert, setNewAlert] = useState<Omit<PropertyAlert, 'id' | 'createdAt'>>({
    name: '',
    location: '',
    priceMin: 0,
    priceMax: 150000,
    bedrooms: 'any',
    propertyType: 'any',
    isActive: true,
    frequency: 'daily'
  });
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { toast } = useToast();

  const handleCreateAlert = () => {
    if (!newAlert.name || !newAlert.location) {
      toast({
        title: "Missing information",
        description: "Please provide a name and location for your alert",
        variant: "destructive",
      });
      return;
    }
    
    const alert: PropertyAlert = {
      ...newAlert,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    
    setAlerts([...alerts, alert]);
    setIsFormOpen(false);
    resetForm();
    
    toast({
      title: "Alert created",
      description: "You'll receive notifications based on your preferences",
    });
  };

  const resetForm = () => {
    setNewAlert({
      name: '',
      location: '',
      priceMin: 0,
      priceMax: 150000,
      bedrooms: 'any',
      propertyType: 'any',
      isActive: true,
      frequency: 'daily'
    });
  };

  const toggleAlertStatus = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, isActive: !alert.isActive } : alert
    ));
    
    const alert = alerts.find(a => a.id === id);
    if (alert) {
      toast({
        title: alert.isActive ? "Alert paused" : "Alert activated",
        description: alert.isActive 
          ? "You will no longer receive notifications for this alert" 
          : "You will now receive notifications for this alert",
      });
    }
  };

  const deleteAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
    toast({
      title: "Alert deleted",
      description: "The property alert has been removed",
      variant: "destructive",
    });
  };

  // Format price for display
  const formatPrice = (price: number) => {
    return `KSh ${price.toLocaleString()}`;
  };

  return (
    <Card className="bg-white shadow-sm border border-housing-200">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-2xl font-display text-housing-800">Property Alerts</CardTitle>
          <CardDescription>
            Get notified when new properties match your criteria
          </CardDescription>
        </div>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Alert
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create Property Alert</DialogTitle>
              <DialogDescription>
                Set up notifications for properties that match your preferences
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="alert-name">Alert Name</Label>
                <Input
                  id="alert-name"
                  placeholder="e.g. Dream Apartment in Kilimani"
                  value={newAlert.name}
                  onChange={(e) => setNewAlert({ ...newAlert, name: e.target.value })}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g. Kilimani, Nairobi"
                  value={newAlert.location}
                  onChange={(e) => setNewAlert({ ...newAlert, location: e.target.value })}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="min-price">Min Price (KSh)</Label>
                  <Input
                    id="min-price"
                    type="number"
                    placeholder="0"
                    value={newAlert.priceMin}
                    onChange={(e) => setNewAlert({ ...newAlert, priceMin: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="max-price">Max Price (KSh)</Label>
                  <Input
                    id="max-price"
                    type="number"
                    placeholder="150000"
                    value={newAlert.priceMax}
                    onChange={(e) => setNewAlert({ ...newAlert, priceMax: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Select
                    value={newAlert.bedrooms}
                    onValueChange={(value) => setNewAlert({ ...newAlert, bedrooms: value })}
                  >
                    <SelectTrigger id="bedrooms">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="3+">3+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="property-type">Property Type</Label>
                  <Select
                    value={newAlert.propertyType}
                    onValueChange={(value) => setNewAlert({ ...newAlert, propertyType: value })}
                  >
                    <SelectTrigger id="property-type">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="studio">Studio</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="frequency">Notification Frequency</Label>
                <Select
                  value={newAlert.frequency}
                  onValueChange={(value: 'daily' | 'weekly' | 'immediately') => 
                    setNewAlert({ ...newAlert, frequency: value })
                  }
                >
                  <SelectTrigger id="frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="immediately">Immediately</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsFormOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateAlert}>Create Alert</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      
      <CardContent>
        {alerts.length === 0 ? (
          <div className="text-center py-10 text-housing-500">
            <Bell className="h-12 w-12 mx-auto text-housing-300 mb-2" />
            <p className="mb-4">You don't have any property alerts yet</p>
            <Button 
              variant="outline" 
              onClick={() => setIsFormOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Alert
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {alerts.map(alert => (
              <div 
                key={alert.id} 
                className={`border rounded-lg p-4 ${
                  alert.isActive ? 'bg-white' : 'bg-gray-50 opacity-75'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-housing-800">{alert.name}</h3>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={alert.isActive}
                      onCheckedChange={() => toggleAlertStatus(alert.id)}
                    />
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => deleteAlert(alert.id)}
                      className="text-housing-500 hover:text-red-600 hover:bg-red-50 h-8 w-8 p-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="outline" className="text-housing-600 bg-housing-50">
                    {alert.location}
                  </Badge>
                  <Badge variant="outline" className="text-housing-600 bg-housing-50">
                    {formatPrice(alert.priceMin)} - {formatPrice(alert.priceMax)}
                  </Badge>
                  {alert.bedrooms !== 'any' && (
                    <Badge variant="outline" className="text-housing-600 bg-housing-50">
                      {alert.bedrooms} {parseInt(alert.bedrooms) === 1 ? 'Bedroom' : 'Bedrooms'}
                    </Badge>
                  )}
                  {alert.propertyType !== 'any' && (
                    <Badge variant="outline" className="text-housing-600 bg-housing-50">
                      {alert.propertyType.charAt(0).toUpperCase() + alert.propertyType.slice(1)}
                    </Badge>
                  )}
                </div>
                
                <div className="flex justify-between items-center text-xs text-housing-500">
                  <div className="flex items-center">
                    <Settings className="h-3 w-3 mr-1" />
                    <span>
                      Notifications: {alert.frequency.charAt(0).toUpperCase() + alert.frequency.slice(1)}
                    </span>
                  </div>
                  <span>Created {alert.createdAt.toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PropertyAlerts;
