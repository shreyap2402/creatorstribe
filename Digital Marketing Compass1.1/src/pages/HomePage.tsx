import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import VideoTrailer from '@/components/VideoTrailer';
import { 
  Play, 
  Users, 
  TrendingUp, 
  Award, 
  ArrowRight,
  Star,
  CheckCircle
} from 'lucide-react';

export default function HomePage() {
  const services = [
    {
      title: 'PR Services',
      description: 'Strategic public relations to elevate your brand presence',
      icon: TrendingUp,
    },
    {
      title: 'Social Media Management',
      description: 'Complete social media strategy and content management',
      icon: Users,
    },
    {
      title: 'Talent Management',
      description: 'Professional representation for creators and influencers',
      icon: Star,
    },
    {
      title: 'Video Production',
      description: 'High-quality video content creation and editing',
      icon: Play,
    },
  ];

  const achievements = [
    { number: '500+', label: 'Creators Managed' },
    { number: '50M+', label: 'Total Reach' },
    { number: '200+', label: 'Campaigns Delivered' },
    { number: '98%', label: 'Client Satisfaction' },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto container-padding">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge variant="secondary" className="px-4 py-2">
              Digital Marketing Excellence
            </Badge>
            
            <h1 className="text-balance">
              Empowering <span className="text-primary">Creators</span> & 
              <span className="text-primary"> Brands</span> in the Digital Age
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              We connect talented creators with leading brands, delivering innovative 
              marketing solutions that drive engagement and growth.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/creators">
                  Explore Our Creators
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/services">View Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trailer Video Section */}
      <section className="section-padding">
        <div className="container mx-auto container-padding">
          <div className="max-w-5xl mx-auto">
            <div className="text-center space-y-6 mb-12">
              <Badge variant="outline" className="px-4 py-2">
                Our Story
              </Badge>
              <h2>Watch How We're Changing Creator Marketing</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover the passion and innovation behind Creator's Tribe. See how we're 
                building authentic partnerships between creators and brands.
              </p>
            </div>
            
            <VideoTrailer
              videoUrl="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              posterUrl="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=675&fit=crop&q=80"
              title="Creator's Tribe - Our Journey"
              description="From startup vision to industry leader - discover our story of connecting creators with brands through authentic partnerships and innovative marketing strategies."
            />
            
            {/* Video Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Creator Network</h3>
                <p className="text-sm text-muted-foreground">
                  Meet our diverse community of talented creators across lifestyle, fashion, and food
                </p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Brand Partnerships</h3>
                <p className="text-sm text-muted-foreground">
                  Strategic collaborations that drive authentic engagement and measurable results
                </p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Success Stories</h3>
                <p className="text-sm text-muted-foreground">
                  Real campaigns, real results - see the impact of our integrated approach
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section-padding bg-muted/40">
        <div className="container mx-auto container-padding">
          <div className="text-center space-y-6 mb-16">
            <h2>Our Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive digital marketing solutions tailored for the modern creator economy
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild>
              <Link to="/services">
                View All Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="section-padding">
        <div className="container mx-auto container-padding">
          <div className="text-center space-y-6 mb-16">
            <h2>Our Impact</h2>
            <p className="text-lg text-muted-foreground">
              Numbers that showcase our commitment to creator success
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-primary">
                  {achievement.number}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {achievement.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container mx-auto container-padding">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-white">Ready to Join Our Tribe?</h2>
            <p className="text-xl text-primary-foreground/80">
              Whether you're a creator looking for representation or a brand seeking 
              authentic partnerships, we're here to help you succeed.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/contact">Get Started Today</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link to="/work">View Our Work</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}