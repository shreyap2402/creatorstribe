import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Users, 
  Instagram, 
  Youtube, 
  TrendingUp,
  MessageCircle,
  Filter,
  Eye
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const creatorCategories = ['All', 'Lifestyle', 'Fashion', 'Food Blogger', 'Tech', 'Fitness'];

const featuredCreators = [
  {
    id: 1,
    name: 'Sarah Johnson',
    category: 'Lifestyle',
    followers: '2.5M',
    engagement: '8.5%',
    specialties: ['Lifestyle', 'Travel', 'Wellness'],
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop',
    verified: true,
  },
  {
    id: 2,
    name: 'Marcus Chen',
    category: 'Fashion',
    followers: '1.8M',
    engagement: '12.3%',
    specialties: ['Fashion', 'Menswear', 'Streetwear'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    verified: true,
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    category: 'Food Blogger',
    followers: '3.2M',
    engagement: '15.7%',
    specialties: ['Cooking', 'Recipe Development', 'Food Photography'],
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    verified: true,
  },
  {
    id: 4,
    name: 'David Kim',
    category: 'Tech',
    followers: '900K',
    engagement: '9.2%',
    specialties: ['Tech Reviews', 'Gadgets', 'AI'],
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    verified: false,
  },
  {
    id: 5,
    name: 'Lisa Parker',
    category: 'Fitness',
    followers: '1.5M',
    engagement: '11.8%',
    specialties: ['Fitness', 'Nutrition', 'Mental Health'],
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
    verified: true,
  },
  {
    id: 6,
    name: 'Alex Thompson',
    category: 'Lifestyle',
    followers: '2.1M',
    engagement: '7.9%',
    specialties: ['Lifestyle', 'Photography', 'Art'],
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    verified: true,
  },
];

export default function CreatorsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const filteredCreators = featuredCreators.filter(creator => {
    const matchesCategory = selectedCategory === 'All' || creator.category === selectedCategory;
    const matchesSearch = creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         creator.specialties.some(specialty => 
                           specialty.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    return matchesCategory && matchesSearch;
  });

  const handleContactCreator = (creatorName: string) => {
    toast({
      title: "Contact Request Sent",
      description: `We'll connect you with ${creatorName} shortly. Check your email for next steps.`,
    });
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto container-padding">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1>Our Creators</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Meet our talented community of lifestyle, fashion, and food creators 
              who are shaping the digital landscape
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 border-b">
        <div className="container mx-auto container-padding">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search creators..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {creatorCategories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Creators Grid */}
      <section className="section-padding">
        <div className="container mx-auto container-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCreators.map((creator) => (
              <Card key={creator.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="aspect-square bg-muted">
                      <img
                        src={creator.image}
                        alt={creator.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {creator.verified && (
                      <Badge className="absolute top-3 right-3 bg-blue-500">
                        Verified
                      </Badge>
                    )}
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold">{creator.name}</h3>
                      <p className="text-muted-foreground">{creator.category}</p>
                    </div>
                    
                    <div className="flex gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{creator.followers}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        <span>{creator.engagement}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {creator.specialties.map((specialty, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="space-y-2">
                      <Button 
                        className="w-full" 
                        onClick={() => navigate(`/creators/${creator.id}`)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Profile
                      </Button>
                      <Button 
                        className="w-full" 
                        variant="outline"
                        onClick={() => handleContactCreator(creator.name)}
                      >
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Quick Contact
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredCreators.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No creators found matching your criteria. Try adjusting your search or filters.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-muted/40">
        <div className="container mx-auto container-padding">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2>Join Our Creator Network</h2>
            <p className="text-lg text-muted-foreground">
              Are you a creator looking for professional representation? 
              Join our exclusive network and unlock new opportunities.
            </p>
            <Button size="lg">
              Apply to Join
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}