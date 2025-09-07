import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { CreatorForm } from '@/components/CreatorForm';
import { creatorsService, Creator, CreatorFormData } from '@/services/creatorsService';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  BarChart3, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Plus,
  Star,
  Calendar,
  Target,
  Award,
  Loader2,
  Video,
  Settings,
  Download,
  MessageSquare
} from 'lucide-react';

export function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [specialtyFilter, setSpecialtyFilter] = useState('all');
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [editingCreator, setEditingCreator] = useState<Creator | null>(null);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();

  // Load creators on component mount
  useEffect(() => {
    loadCreators();
  }, [statusFilter, specialtyFilter]);

  const loadCreators = async () => {
    try {
      setLoading(true);
      const options: any = {};
      
      if (specialtyFilter !== 'all') {
        options.specialty = specialtyFilter;
      }
      if (statusFilter !== 'all') {
        options.status = statusFilter;
      }
      if (searchTerm.trim()) {
        options.searchTerm = searchTerm.trim();
      }

      const result = await creatorsService.getAllCreators(options);
      setCreators(result.creators);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load creators. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCreator = async (data: CreatorFormData) => {
    try {
      setFormLoading(true);
      await creatorsService.createCreator(data);
      toast({
        title: 'Success',
        description: 'Creator created successfully!'
      });
      setShowForm(false);
      loadCreators();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create creator. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdateCreator = async (data: CreatorFormData) => {
    if (!editingCreator) return;
    
    try {
      setFormLoading(true);
      const updatedCreator: Creator = {
        ...editingCreator,
        ...data,
        portfolio_items: JSON.stringify(data.portfolio_items)
      };
      
      await creatorsService.updateCreator(updatedCreator);
      toast({
        title: 'Success',
        description: 'Creator updated successfully!'
      });
      setEditingCreator(null);
      loadCreators();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update creator. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteCreator = async (creator: Creator) => {
    if (!creator._uid || !creator._id) return;
    
    try {
      await creatorsService.deleteCreator(creator._uid, creator._id);
      toast({
        title: 'Success',
        description: 'Creator deleted successfully!'
      });
      loadCreators();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete creator. Please try again.',
        variant: 'destructive'
      });
    }
  };

  const handleSearch = () => {
    loadCreators();
  };

  // Filter creators based on search term
  const filteredCreators = creators.filter(creator => {
    if (!searchTerm.trim()) return true;
    const searchLower = searchTerm.toLowerCase();
    return creator.name.toLowerCase().includes(searchLower) ||
           creator.email.toLowerCase().includes(searchLower) ||
           creator.specialty.toLowerCase().includes(searchLower) ||
           creator.location.toLowerCase().includes(searchLower);
  });

  // Calculate stats from real data
  const stats = {
    totalCreators: creators.length,
    activeCreators: creators.filter(c => c.status === 'Active').length,
    pendingCreators: creators.filter(c => c.status === 'Pending').length,
    totalCampaigns: creators.reduce((sum, c) => sum + (c.completed_campaigns || 0), 0),
    avgRating: creators.length > 0 ? (creators.reduce((sum, c) => sum + (c.rating || 0), 0) / creators.length).toFixed(1) : '0',
    totalRevenue: creators.reduce((sum, c) => sum + ((c.rate_per_post || 0) * (c.completed_campaigns || 0)), 0)
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage creators, campaigns, and analytics</p>
        </div>

        {/* Main Dashboard */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="creators" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Creators
            </TabsTrigger>
            <TabsTrigger value="campaigns" className="flex items-center gap-2">
              <Video className="w-4 h-4" />
              Campaigns
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Creators</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalCreators}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats.activeCreators} active, {stats.pendingCreators} pending
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
                  <Video className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalCampaigns}</div>
                  <p className="text-xs text-muted-foreground">
                    Completed campaigns
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    Avg rating: {stats.avgRating}/5
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Creator Applications</CardTitle>
                  <CardDescription>Latest creator applications pending review</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {creators.filter(c => c.status === 'Pending').slice(0, 3).map(creator => (
                    <div key={creator._id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{creator.name}</p>
                        <p className="text-sm text-muted-foreground">{creator.email} • {creator.specialty}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Review</Button>
                        <Button size="sm">Approve</Button>
                      </div>
                    </div>
                  ))}
                  {creators.filter(c => c.status === 'Pending').length === 0 && (
                    <p className="text-muted-foreground text-center py-4">No pending applications</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performers</CardTitle>
                  <CardDescription>Highest rated creators this month</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {creators
                    .filter(c => c.status === 'Active')
                    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
                    .slice(0, 3)
                    .map(creator => (
                      <div key={creator._id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{creator.name}</p>
                          <p className="text-sm text-muted-foreground">{creator.specialty}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                            <span className="font-medium">{creator.rating || 0}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{creator.followers?.toLocaleString() || 0} followers</p>
                        </div>
                      </div>
                    ))}
                  {creators.filter(c => c.status === 'Active').length === 0 && (
                    <p className="text-muted-foreground text-center py-4">No active creators</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Creators Tab */}
          <TabsContent value="creators" className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search creators..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="pl-10 w-64"
                  />
                </div>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                    <SelectItem value="Fashion">Fashion</SelectItem>
                    <SelectItem value="Food">Food</SelectItem>
                    <SelectItem value="Beauty">Beauty</SelectItem>
                    <SelectItem value="Travel">Travel</SelectItem>
                    <SelectItem value="Fitness">Fitness</SelectItem>
                    <SelectItem value="Tech">Tech</SelectItem>
                    <SelectItem value="Home">Home</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button onClick={handleSearch} variant="outline">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
              
              <Dialog open={showForm} onOpenChange={setShowForm}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Creator
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Creator</DialogTitle>
                  </DialogHeader>
                  <CreatorForm
                    onSubmit={handleCreateCreator}
                    onCancel={() => setShowForm(false)}
                    isLoading={formLoading}
                  />
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              {loading ? (
                <div className="flex items-center justify-center p-8">
                  <Loader2 className="w-6 h-6 animate-spin mr-2" />
                  Loading creators...
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Creator</TableHead>
                      <TableHead>Specialty</TableHead>
                      <TableHead>Followers</TableHead>
                      <TableHead>Engagement</TableHead>
                      <TableHead>Rate</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCreators.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          {searchTerm || statusFilter !== 'all' || specialtyFilter !== 'all' 
                            ? 'No creators found matching your filters.'
                            : 'No creators found. Click "Add Creator" to get started.'}
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredCreators.map((creator) => (
                        <TableRow key={creator._id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <img
                                src={creator.image_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'}
                                alt={creator.name}
                                className="w-10 h-10 rounded-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face';
                                }}
                              />
                              <div>
                                <div className="font-medium">{creator.name}</div>
                                <div className="text-sm text-muted-foreground">{creator.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{creator.specialty}</TableCell>
                          <TableCell>{creator.followers?.toLocaleString() || 0}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 mr-1" />
                              {creator.engagement_rate || 0}%
                            </div>
                          </TableCell>
                          <TableCell>${creator.rate_per_post?.toLocaleString() || 0}</TableCell>
                          <TableCell>
                            <Badge 
                              variant={creator.status === 'Active' ? 'default' : 
                                      creator.status === 'Pending' ? 'secondary' : 
                                      creator.status === 'Suspended' ? 'destructive' : 'outline'}
                            >
                              {creator.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => {
                                  window.open(`/creators/${creator._id}`, '_blank');
                                }}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => setEditingCreator(creator)}
                                  >
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                                  <DialogHeader>
                                    <DialogTitle>Edit Creator</DialogTitle>
                                  </DialogHeader>
                                  {editingCreator && (
                                    <CreatorForm
                                      creator={editingCreator}
                                      onSubmit={handleUpdateCreator}
                                      onCancel={() => setEditingCreator(null)}
                                      isLoading={formLoading}
                                    />
                                  )}
                                </DialogContent>
                              </Dialog>
                              
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Creator</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete {creator.name}? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDeleteCreator(creator)}
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              )}
            </Card>
          </TabsContent>

          {/* Campaigns Tab - Placeholder */}
          <TabsContent value="campaigns" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Campaign Management</h2>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New Campaign
              </Button>
            </div>

            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Video className="w-16 h-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Campaign Management</h3>
                <p className="text-muted-foreground text-center max-w-md">
                  Campaign management functionality will be available in a later phase. 
                  Focus on creator management for now.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab - Placeholder */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Analytics & Reports</h2>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export Data
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Creators</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalCreators}</div>
                  <p className="text-xs text-muted-foreground">registered users</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.avgRating}/5</div>
                  <p className="text-xs text-muted-foreground">creator rating</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalCampaigns}</div>
                  <p className="text-xs text-muted-foreground">completed</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Revenue Generated</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">total earnings</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <BarChart3 className="w-16 h-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Advanced Analytics</h3>
                <p className="text-muted-foreground text-center max-w-md">
                  Detailed analytics and reporting features will be available in a later phase.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab - Placeholder */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold">System Settings</h2>

            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>Basic configuration options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Company Name</label>
                      <Input defaultValue="Creator's Tribe" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Contact Email</label>
                      <Input defaultValue="admin@creatorstribe.com" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Default Commission Rate</label>
                      <Input defaultValue="15%" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Minimum Payout</label>
                      <Input defaultValue="$100" />
                    </div>
                  </div>
                  <Button>Save Changes</Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <Settings className="w-16 h-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Advanced Settings</h3>
                  <p className="text-muted-foreground text-center max-w-md">
                    Additional system configuration options will be available in a later phase.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}