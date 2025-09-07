import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Users, 
  Star, 
  Zap, 
  Video, 
  BarChart3,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const services = [
  {
    id: 'pr-service',
    title: 'PR Services',
    description: 'Strategic public relations to elevate your brand presence and build lasting relationships with your audience.',
    icon: TrendingUp,
    features: [
      'Media Relations & Press Releases',
      'Crisis Communication Management',
      'Brand Reputation Building',
      'Industry Event Coordination',
      'Influencer Relations Strategy'
    ],
    details: 'Our PR team works closely with media outlets, journalists, and industry leaders to ensure your brand gets the visibility it deserves. We craft compelling narratives that resonate with your target audience.',
    pricing: 'Starting from $2,500/month'
  },
  {
    id: 'smm-business',
    title: 'Social Media Management for Businesses',
    description: 'Complete social media strategy, content creation, and community management to grow your business online.',
    icon: Users,
    features: [
      'Multi-platform Strategy Development',
      'Content Creation & Curation',
      'Community Management',
      'Social Media Advertising',
      'Analytics & Reporting'
    ],
    details: 'We handle everything from strategy to execution, ensuring your social media presence drives real business results. Our team creates engaging content and manages your community across all major platforms.',
    pricing: 'Starting from $1,800/month'
  },
  {
    id: 'talent-management',
    title: 'Talent Management',
    description: 'Professional representation and career development for creators, influencers, and digital personalities.',
    icon: Star,
    features: [
      'Brand Partnership Negotiations',
      'Career Strategy & Development',
      'Contract Management & Legal Support',
      'Personal Brand Building',
      'Opportunity Sourcing'
    ],
    details: 'We represent talented creators and help them build sustainable careers. From negotiating deals to strategic career planning, we ensure our talent thrives in the digital ecosystem.',
    pricing: 'Commission-based (15-20%)'
  },
  {
    id: 'influencer-marketing',
    title: 'Influencer & Performance Marketing',
    description: 'Data-driven influencer campaigns and performance marketing strategies that deliver measurable results.',
    icon: BarChart3,
    features: [
      'Influencer Campaign Strategy',
      'Performance Tracking & Analytics',
      'ROI Optimization',
      'Multi-channel Campaign Management',
      'A/B Testing & Insights'
    ],
    details: 'Our performance marketing approach ensures every campaign delivers measurable results. We use advanced analytics to optimize campaigns and maximize your return on investment.',
    pricing: 'Starting from $3,000/month + ad spend'
  },
  {
    id: 'video-production',
    title: 'Video Production & Editing',
    description: 'High-quality video content creation, from concept to final edit, tailored for digital platforms.',
    icon: Video,
    features: [
      'Concept Development & Scripting',
      'Professional Video Production',
      'Post-Production & Editing',
      'Motion Graphics & Animation',
      'Platform-Specific Optimization'
    ],
    details: 'Our video production team creates compelling visual content that captures attention and drives engagement. From short-form social content to long-form brand documentaries.',
    pricing: 'Project-based, starting from $1,500'
  }
];

export default function ServicesPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto container-padding">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge variant="secondary" className="px-4 py-2">
              Comprehensive Digital Solutions
            </Badge>
            <h1>Our Services</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              From PR and social media management to talent representation and video production, 
              we provide end-to-end digital marketing solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container mx-auto container-padding">
          <div className="space-y-12">
            {services.map((service, index) => (
              <Card key={service.id} className="overflow-hidden">
                <div className={`grid lg:grid-cols-2 gap-0 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                  <div className={`p-8 lg:p-12 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <service.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold">{service.title}</h3>
                          <p className="text-muted-foreground">{service.pricing}</p>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                      
                      <div className="space-y-3">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {service.details}
                      </p>
                      
                      <Button asChild>
                        <Link to="/contact">
                          Get Started
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                  
                  <div className={`bg-muted/40 p-8 lg:p-12 flex items-center justify-center ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                    <div className="text-center space-y-4 max-w-sm">
                      <div className="w-24 h-24 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                        <service.icon className="h-12 w-12 text-primary" />
                      </div>
                      <h4 className="text-lg font-semibold">{service.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        Professional {service.title.toLowerCase()} solutions tailored to your needs
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-muted/40">
        <div className="container mx-auto container-padding">
          <div className="text-center space-y-6 mb-16">
            <h2>Our Process</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We follow a proven methodology to ensure every project delivers exceptional results
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', description: 'We understand your goals, audience, and challenges' },
              { step: '02', title: 'Strategy', description: 'We develop a customized plan tailored to your needs' },
              { step: '03', title: 'Execution', description: 'We implement the strategy with precision and creativity' },
              { step: '04', title: 'Optimization', description: 'We continuously improve based on data and feedback' },
            ].map((item, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                  {item.step}
                </div>
                <h4 className="text-lg font-semibold">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container mx-auto container-padding">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2>Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground">
              Let's discuss how our services can help you achieve your digital marketing goals. 
              Contact us for a free consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/contact">
                  Start Your Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/work">View Our Work</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}