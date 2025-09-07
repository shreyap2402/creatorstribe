import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft,
  Users, 
  Instagram, 
  Youtube, 
  TrendingUp,
  MessageCircle,
  ExternalLink,
  Calendar,
  MapPin,
  Award,
  Camera,
  Heart,
  Share2,
  Play,
  Star,
  CheckCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Extended creator data with full profile information
const creatorsData = {
  '1': {
    id: 1,
    name: 'Sarah Johnson',
    category: 'Lifestyle',
    followers: '2.5M',
    engagement: '8.5%',
    specialties: ['Lifestyle', 'Travel', 'Wellness'],
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop',
    verified: true,
    bio: "Lifestyle creator passionate about authentic living, mindful travel, and wellness. I believe in creating content that inspires positive change and genuine connections.",
    location: "Los Angeles, CA",
    joinedDate: "March 2020",
    totalPosts: 1247,
    avgViews: "350K",
    topBrands: ["Nike", "Sephora", "Airbnb", "Whole Foods", "Lululemon"],
    achievements: [
      "Creator of the Year 2023",
      "100M+ total views",
      "Featured in Vogue Digital"
    ],
    portfolio: [
      {
        id: 1,
        title: "Nike Summer Campaign",
        type: "video",
        thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
        views: "2.5M",
        engagement: "15.2%",
        brand: "Nike"
      },
      {
        id: 2,
        title: "Wellness Morning Routine",
        type: "image",
        thumbnail: "https://images.unsplash.com/photo-1506629905607-c2b7de75d757?w=600&h=400&fit=crop",
        views: "890K",
        engagement: "12.8%",
        brand: "Personal"
      },
      {
        id: 3,
        title: "Travel Diary: Bali",
        type: "video",
        thumbnail: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=600&h=400&fit=crop",
        views: "1.8M",
        engagement: "18.5%",
        brand: "Airbnb"
      },
      {
        id: 4,
        title: "Sustainable Fashion Haul",
        type: "image",
        thumbnail: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=400&fit=crop",
        views: "650K",
        engagement: "14.3%",
        brand: "Everlane"
      }
    ],
    testimonials: [
      {
        brand: "Nike",
        text: "Sarah's authentic approach to lifestyle content perfectly aligned with our brand values. The campaign exceeded all KPIs.",
        person: "Marketing Director"
      },
      {
        brand: "Airbnb",
        text: "Working with Sarah was seamless. Her travel content is visually stunning and drives real bookings.",
        person: "Brand Partnerships"
      }
    ],
    rates: {
      post: "$15,000",
      story: "$5,000",
      video: "$25,000",
      campaign: "$75,000+"
    },
    socialStats: {
      instagram: "2.5M",
      youtube: "890K",
      tiktok: "1.2M"
    }
  },
  '2': {
    id: 2,
    name: 'Marcus Chen',
    category: 'Fashion',
    followers: '1.8M',
    engagement: '12.3%',
    specialties: ['Fashion', 'Menswear', 'Streetwear'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    verified: true,
    bio: "Fashion enthusiast and style curator focusing on modern menswear and streetwear culture. Bringing accessible fashion to the everyday man.",
    location: "New York, NY",
    joinedDate: "June 2019",
    totalPosts: 892,
    avgViews: "280K",
    topBrands: ["Adidas", "Zara", "H&M", "Uniqlo", "Patagonia"],
    achievements: [
      "Men's Fashion Influencer 2023",
      "50M+ total reach",
      "GQ Featured Creator"
    ],
    portfolio: [
      {
        id: 1,
        title: "Adidas Originals Campaign",
        type: "video",
        thumbnail: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&h=400&fit=crop",
        views: "1.9M",
        engagement: "16.7%",
        brand: "Adidas"
      },
      {
        id: 2,
        title: "Street Style Essentials",
        type: "image",
        thumbnail: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=600&h=400&fit=crop",
        views: "720K",
        engagement: "13.4%",
        brand: "Personal"
      }
    ],
    testimonials: [
      {
        brand: "Adidas",
        text: "Marcus has an incredible eye for street fashion and connects authentically with our target demographic.",
        person: "Creative Director"
      }
    ],
    rates: {
      post: "$12,000",
      story: "$4,000",
      video: "$20,000",
      campaign: "$60,000+"
    },
    socialStats: {
      instagram: "1.8M",
      youtube: "450K",
      tiktok: "980K"
    }
  },
  // Add more creators as needed...
};

export default function CreatorProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');

  const creator = creatorsData[id as keyof typeof creatorsData];

  if (!creator) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2>Creator Not Found</h2>
          <p className="text-muted-foreground">The creator profile you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/creators')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Creators
          </Button>
        </div>
      </div>
    );
  }

  const handleContactCreator = () => {
    toast({
      title: "Contact Request Sent",
      description: `We'll connect you with ${creator.name} shortly. Check your email for collaboration details.`,
    });
  };

  const handleBookConsultation = () => {
    toast({
      title: "Consultation Booked",
      description: "A member of our team will reach out within 24 hours to discuss your campaign needs.",
    });
  };

  return (
    <div className="w-full">
      {/* Header with back button */}
      <div className="border-b">
        <div className="container mx-auto container-padding py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/creators')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Creators
          </Button>
        </div>
      </div>

      {/* Profile Header */}
      <section className="section-padding">
        <div className="container mx-auto container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-muted overflow-hidden">
                    <img
                      src={creator.image}
                      alt={creator.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {creator.verified && (
                    <div className="absolute -bottom-2 -right-2">
                      <CheckCircle className="h-8 w-8 text-blue-500 bg-white rounded-full" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 space-y-4">
                  <div>
                    <h1 className="text-3xl font-bold">{creator.name}</h1>
                    <p className="text-xl text-muted-foreground">{creator.category} Creator</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {creator.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{creator.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Joined {creator.joinedDate}</span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground">{creator.bio}</p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold">{creator.followers}</div>
                    <div className="text-sm text-muted-foreground">Total Followers</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold">{creator.engagement}</div>
                    <div className="text-sm text-muted-foreground">Engagement Rate</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold">{creator.avgViews}</div>
                    <div className="text-sm text-muted-foreground">Avg Views</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold">{creator.totalPosts}</div>
                    <div className="text-sm text-muted-foreground">Total Posts</div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Get In Touch</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full" onClick={handleContactCreator}>
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Contact Creator
                  </Button>
                  <Button variant="outline" className="w-full" onClick={handleBookConsultation}>
                    <Calendar className="mr-2 h-4 w-4" />
                    Book Consultation
                  </Button>
                  <div className="text-xs text-muted-foreground text-center">
                    Professional representation by Creator's Tribe
                  </div>
                </CardContent>
              </Card>

              {/* Social Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Social Presence</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Instagram className="h-4 w-4 text-pink-500" />
                      <span className="text-sm">Instagram</span>
                    </div>
                    <span className="font-semibold">{creator.socialStats.instagram}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Youtube className="h-4 w-4 text-red-500" />
                      <span className="text-sm">YouTube</span>
                    </div>
                    <span className="font-semibold">{creator.socialStats.youtube}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">TT</span>
                      <span className="text-sm">TikTok</span>
                    </div>
                    <span className="font-semibold">{creator.socialStats.tiktok}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Rates */}
              <Card>
                <CardHeader>
                  <CardTitle>Starting Rates</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Instagram Post</span>
                    <span className="font-semibold">{creator.rates.post}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Story</span>
                    <span className="font-semibold">{creator.rates.story}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Video Content</span>
                    <span className="font-semibold">{creator.rates.video}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Full Campaign</span>
                    <span className="font-semibold">{creator.rates.campaign}</span>
                  </div>
                  <div className="text-xs text-muted-foreground text-center mt-4">
                    Custom packages available
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="section-padding border-t">
        <div className="container mx-auto container-padding">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="testimonials">Reviews</TabsTrigger>
              <TabsTrigger value="brands">Brand Partners</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-8 space-y-8">
              {/* Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {creator.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <Star className="h-5 w-5 text-yellow-500" />
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">+15.2%</div>
                      <div className="text-sm text-muted-foreground">Engagement Growth</div>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">2.8M</div>
                      <div className="text-sm text-muted-foreground">Total Reach (30d)</div>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">98%</div>
                      <div className="text-sm text-muted-foreground">Brand Satisfaction</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="portfolio" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {creator.portfolio.map((item) => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="relative group">
                        <div className="aspect-video bg-muted">
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          {item.type === 'video' ? (
                            <Play className="h-12 w-12 text-white" />
                          ) : (
                            <Camera className="h-12 w-12 text-white" />
                          )}
                        </div>
                        <Badge className="absolute top-3 right-3">
                          {item.type}
                        </Badge>
                      </div>
                      
                      <div className="p-4 space-y-3">
                        <h4 className="font-semibold">{item.title}</h4>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>{item.views} views</span>
                          <span>{item.engagement} engagement</span>
                        </div>
                        <Badge variant="outline">{item.brand}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="testimonials" className="mt-8">
              <div className="grid gap-6">
                {creator.testimonials.map((testimonial, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <div className="flex text-yellow-500">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-current" />
                            ))}
                          </div>
                          <Badge variant="outline">{testimonial.brand}</Badge>
                        </div>
                        <blockquote className="text-lg italic">
                          "{testimonial.text}"
                        </blockquote>
                        <div className="text-sm text-muted-foreground">
                          — {testimonial.person}, {testimonial.brand}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="brands" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Top Brand Partners</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {creator.topBrands.map((brand, index) => (
                      <div
                        key={index}
                        className="aspect-square bg-muted rounded-lg flex items-center justify-center p-4 hover:bg-muted/80 transition-colors"
                      >
                        <span className="font-semibold text-center">{brand}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}