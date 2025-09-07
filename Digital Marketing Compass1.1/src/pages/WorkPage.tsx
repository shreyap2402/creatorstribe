import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VideoShowcase from '@/components/VideoShowcase';
import { ExternalLink, TrendingUp, Users, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const workCategories = ['All', 'Brand Campaigns', 'Case Studies', 'Testimonials'];

const portfolioItems = [
  {
    id: 1,
    title: 'Nike x Urban Lifestyle Campaign',
    category: 'Brand Campaigns',
    type: 'Campaign',
    client: 'Nike',
    results: { reach: '15M+', engagement: '8.5%', conversions: '12K+' },
    description: 'Multi-platform lifestyle campaign featuring 5 creators across fashion and fitness niches.',
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&h=600&fit=crop',
    tags: ['Fashion', 'Fitness', 'Lifestyle']
  },
  {
    id: 2,
    title: 'Sustainable Fashion Movement',
    category: 'Case Studies',
    type: 'Case Study',
    client: 'EcoWear',
    results: { reach: '8M+', engagement: '15.2%', conversions: '5K+' },
    description: 'Environmental awareness campaign promoting sustainable fashion through authentic storytelling.',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop',
    tags: ['Sustainability', 'Fashion', 'Environment']
  },
  {
    id: 3,
    title: 'Food Innovation Series',
    category: 'Brand Campaigns',
    type: 'Video Series',
    client: 'FreshBox',
    results: { reach: '22M+', engagement: '18.7%', conversions: '18K+' },
    description: 'Recipe innovation series featuring top food bloggers creating unique dishes.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop',
    tags: ['Food', 'Innovation', 'Video']
  },
  {
    id: 4,
    title: 'Tech Product Launch',
    category: 'Case Studies',
    type: 'Product Launch',
    client: 'TechFlow',
    results: { reach: '12M+', engagement: '22.1%', conversions: '25K+' },
    description: 'Comprehensive product launch campaign across multiple tech influencers and platforms.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop',
    tags: ['Technology', 'Product Launch', 'Innovation']
  },
  {
    id: 5,
    title: 'Wellness Journey Campaign',
    category: 'Brand Campaigns',
    type: 'Wellness',
    client: 'MindfulLiving',
    results: { reach: '10M+', engagement: '12.8%', conversions: '8K+' },
    description: 'Authentic wellness journey documentation featuring mental health and fitness creators.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop',
    tags: ['Wellness', 'Mental Health', 'Fitness']
  },
  {
    id: 6,
    title: 'Travel Experience Series',
    category: 'Case Studies',
    type: 'Travel Campaign',
    client: 'Wanderlust Tours',
    results: { reach: '18M+', engagement: '16.4%', conversions: '15K+' },
    description: 'Immersive travel experiences showcasing destinations through creator perspectives.',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop',
    tags: ['Travel', 'Tourism', 'Experience']
  }
];

const testimonials = [
  {
    id: 1,
    client: 'Sarah Mitchell',
    company: 'BrandFlow Inc.',
    role: 'Marketing Director',
    content: 'Creator\'s Tribe delivered exceptional results for our product launch. Their creator network and strategic approach helped us exceed our engagement goals by 150%.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=200&h=200&fit=crop'
  },
  {
    id: 2,
    client: 'Marcus Rodriguez',
    company: 'EcoTech Solutions',
    role: 'CEO',
    content: 'Working with Creator\'s Tribe was a game-changer. Their understanding of our brand and ability to match us with the right creators resulted in our most successful campaign to date.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'
  },
  {
    id: 3,
    client: 'Emma Thompson',
    company: 'Lifestyle Brands Co.',
    role: 'Brand Manager',
    content: 'The team at Creator\'s Tribe is incredibly professional and results-driven. They helped us build authentic connections with our target audience through carefully selected creators.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop'
  }
];

export default function WorkPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { toast } = useToast();

  const filteredItems = portfolioItems.filter(item => 
    selectedCategory === 'All' || item.category === selectedCategory
  );

  const handleViewCaseStudy = (title: string) => {
    toast({
      title: "Case Study Request",
      description: `Detailed case study for "${title}" will be available in a later phase. Contact us for more information.`,
    });
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto container-padding">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1>Our Work</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Explore our successful campaigns, case studies, and client testimonials 
              that showcase the power of creator marketing
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="section-padding">
        <div className="container mx-auto container-padding">
          <Tabs defaultValue="portfolio" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            </TabsList>
            
            <TabsContent value="portfolio" className="space-y-8">
              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-2 justify-center">
                {workCategories.map((category) => (
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

              {/* Portfolio Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="relative">
                        <div className="aspect-video bg-muted">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <Badge className="absolute top-3 left-3">
                          {item.type}
                        </Badge>
                      </div>
                      
                      <div className="p-6 space-y-4">
                        <div>
                          <h3 className="text-lg font-semibold line-clamp-2">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.client}</p>
                        </div>
                        
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {item.description}
                        </p>
                        
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="space-y-1">
                            <div className="text-lg font-bold text-primary">{item.results.reach}</div>
                            <div className="text-xs text-muted-foreground">Reach</div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-lg font-bold text-primary">{item.results.engagement}</div>
                            <div className="text-xs text-muted-foreground">Engagement</div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-lg font-bold text-primary">{item.results.conversions}</div>
                            <div className="text-xs text-muted-foreground">Conversions</div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {item.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <Button 
                          className="w-full" 
                          onClick={() => handleViewCaseStudy(item.title)}
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Case Study
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="testimonials" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial) => (
                  <Card key={testimonial.id} className="text-center">
                    <CardContent className="p-6 space-y-4">
                      <div className="w-20 h-20 rounded-full overflow-hidden mx-auto">
                        <img
                          src={testimonial.image}
                          alt={testimonial.client}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex justify-center space-x-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Award key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                        ))}
                      </div>
                      
                      <blockquote className="text-sm text-muted-foreground italic">
                        "{testimonial.content}"
                      </blockquote>
                      
                      <div>
                        <div className="font-semibold">{testimonial.client}</div>
                        <div className="text-sm text-muted-foreground">
                          {testimonial.role}, {testimonial.company}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Video Showcase Section */}
      <section className="section-padding">
        <div className="container mx-auto container-padding">
          <VideoShowcase />
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-muted/40">
        <div className="container mx-auto container-padding">
          <div className="text-center space-y-6 mb-16">
            <h2>Campaign Performance</h2>
            <p className="text-lg text-muted-foreground">
              Our campaigns consistently deliver exceptional results across all metrics
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '85M+', label: 'Total Campaign Reach' },
              { number: '14.2%', label: 'Average Engagement Rate' },
              { number: '200+', label: 'Successful Campaigns' },
              { number: '98%', label: 'Client Retention Rate' },
            ].map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-primary">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}