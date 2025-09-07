import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import VideoTrailer from '@/components/VideoTrailer';
import { Play, Eye, TrendingUp, Users } from 'lucide-react';

interface VideoItem {
  id: string;
  title: string;
  client: string;
  category: string;
  thumbnail: string;
  videoUrl: string;
  metrics: {
    views: string;
    engagement: string;
    reach: string;
  };
  description: string;
  tags: string[];
}

const videoShowcaseItems: VideoItem[] = [
  {
    id: '1',
    title: 'Nike Athletic Performance Campaign',
    client: 'Nike',
    category: 'Brand Campaign',
    thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=450&fit=crop&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    metrics: {
      views: '2.5M',
      engagement: '12.3%',
      reach: '15M+'
    },
    description: 'High-energy campaign showcasing athletic performance with lifestyle creators',
    tags: ['Fitness', 'Lifestyle', 'Performance']
  },
  {
    id: '2',
    title: 'Sustainable Living Series',
    client: 'EcoWear',
    category: 'Educational Series',
    thumbnail: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=450&fit=crop&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    metrics: {
      views: '1.8M',
      engagement: '18.5%',
      reach: '8M+'
    },
    description: 'Educational content series promoting sustainable fashion and lifestyle choices',
    tags: ['Sustainability', 'Education', 'Fashion']
  },
  {
    id: '3',
    title: 'Culinary Innovation Challenge',
    client: 'FreshBox',
    category: 'Competition Series',
    thumbnail: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=450&fit=crop&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    metrics: {
      views: '3.2M',
      engagement: '22.1%',
      reach: '12M+'
    },
    description: 'Food creators competing in innovative recipe challenges with premium ingredients',
    tags: ['Food', 'Competition', 'Innovation']
  }
];

interface VideoShowcaseProps {
  className?: string;
}

export default function VideoShowcase({ className = "" }: VideoShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  const categories = ['All', ...Array.from(new Set(videoShowcaseItems.map(item => item.category)))];
  
  const filteredItems = selectedCategory === 'All' 
    ? videoShowcaseItems 
    : videoShowcaseItems.filter(item => item.category === selectedCategory);

  return (
    <div className={className}>
      {/* Header */}
      <div className="text-center space-y-6 mb-12">
        <Badge variant="outline" className="px-4 py-2">
          Video Content
        </Badge>
        <h2>Campaign Video Showcase</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore our most successful video campaigns and see how we bring brand stories to life through engaging content
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="text-sm"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
        {filteredItems.map((item) => (
          <div key={item.id} className="space-y-4">
            {/* Video Player */}
            <VideoTrailer
              videoUrl={item.videoUrl}
              posterUrl={item.thumbnail}
              title={item.title}
              description={item.description}
              className="h-full"
            />
            
            {/* Video Info */}
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold text-lg leading-tight">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">Client: {item.client}</p>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {item.category}
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground">{item.description}</p>
              
              {/* Metrics */}
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4 text-primary" />
                  <span className="font-medium">{item.metrics.views}</span>
                  <span className="text-muted-foreground">views</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="font-medium">{item.metrics.engagement}</span>
                  <span className="text-muted-foreground">engagement</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="font-medium">{item.metrics.reach}</span>
                  <span className="text-muted-foreground">reach</span>
                </div>
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {item.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Summary */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-bold">Video Campaign Impact</h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Our video campaigns consistently deliver exceptional results through strategic creator partnerships and compelling storytelling
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-primary">7.5M+</div>
                <div className="text-sm text-muted-foreground font-medium">Average Views</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-primary">17.6%</div>
                <div className="text-sm text-muted-foreground font-medium">Avg Engagement Rate</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-primary">35M+</div>
                <div className="text-sm text-muted-foreground font-medium">Total Reach</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}