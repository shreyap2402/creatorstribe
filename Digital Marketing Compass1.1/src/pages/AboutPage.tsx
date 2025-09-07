import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Target, 
  Award, 
  Lightbulb,
  ArrowRight,
  LinkedinIcon,
  TwitterIcon,
  InstagramIcon
} from 'lucide-react';

const teamMembers = [
  {
    id: 1,
    name: 'Alexandra Chen',
    role: 'CEO & Founder',
    bio: 'Former marketing executive with 10+ years in digital marketing and creator partnerships.',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop',
    social: { linkedin: '#', twitter: '#', instagram: '#' }
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    role: 'Head of Creator Relations',
    bio: 'Expert in talent management and creator development with deep industry connections.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    social: { linkedin: '#', twitter: '#', instagram: '#' }
  },
  {
    id: 3,
    name: 'Sofia Rodriguez',
    role: 'Creative Director',
    bio: 'Award-winning creative professional specializing in brand storytelling and content strategy.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    social: { linkedin: '#', twitter: '#', instagram: '#' }
  },
  {
    id: 4,
    name: 'James Wilson',
    role: 'Head of Analytics',
    bio: 'Data scientist focused on campaign optimization and performance marketing insights.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    social: { linkedin: '#', twitter: '#', instagram: '#' }
  }
];

const achievements = [
  {
    icon: Award,
    title: 'Industry Recognition',
    description: 'Winner of Digital Marketing Agency of the Year 2023',
  },
  {
    icon: Users,
    title: 'Creator Network',
    description: 'Partnership with 500+ verified creators across all niches',
  },
  {
    icon: Target,
    title: 'Campaign Success',
    description: '98% client satisfaction rate with measurable ROI',
  },
  {
    icon: Lightbulb,
    title: 'Innovation Leader',
    description: 'Pioneering new approaches to creator-brand partnerships',
  }
];

export default function AboutPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto container-padding">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge variant="secondary" className="px-4 py-2">
              Our Story
            </Badge>
            <h1>About Creator's Tribe</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              We're passionate about connecting authentic creators with forward-thinking brands, 
              building meaningful partnerships that drive real results.
            </p>
          </div>
        </div>
      </section>

      {/* Company History */}
      <section className="section-padding">
        <div className="container mx-auto container-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2>Our Vision & Mission</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Vision</h3>
                  <p className="text-muted-foreground">
                    To become the leading platform that empowers creators and brands to build 
                    authentic, lasting relationships that drive mutual success in the digital age.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Mission</h3>
                  <p className="text-muted-foreground">
                    We bridge the gap between talented creators and innovative brands through 
                    strategic partnerships, creative campaigns, and data-driven insights that 
                    deliver measurable results.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="aspect-square bg-muted rounded-2xl flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Building Connections</h3>
                <p className="text-muted-foreground max-w-xs">
                  Connecting creators and brands since 2020
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company History Timeline */}
      <section className="section-padding bg-muted/40">
        <div className="container mx-auto container-padding">
          <div className="text-center space-y-6 mb-16">
            <h2>Our Journey</h2>
            <p className="text-lg text-muted-foreground">
              From startup to industry leader - our growth story
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { year: '2020', title: 'Founded', description: 'Started with a vision to revolutionize creator marketing' },
              { year: '2021', title: 'First 100 Creators', description: 'Built our initial network of talented creators' },
              { year: '2022', title: 'Major Partnerships', description: 'Secured partnerships with leading global brands' },
              { year: '2023', title: 'Industry Recognition', description: 'Won Digital Marketing Agency of the Year' },
            ].map((milestone, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6 space-y-4">
                  <div className="text-3xl font-bold text-primary">{milestone.year}</div>
                  <h4 className="text-lg font-semibold">{milestone.title}</h4>
                  <p className="text-sm text-muted-foreground">{milestone.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding">
        <div className="container mx-auto container-padding">
          <div className="text-center space-y-6 mb-16">
            <h2>Our Team</h2>
            <p className="text-lg text-muted-foreground">
              Meet the passionate professionals driving creator marketing forward
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.id} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold">{member.name}</h4>
                    <p className="text-primary font-medium">{member.role}</p>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                  
                  <div className="flex justify-center space-x-3">
                    <a href={member.social.linkedin} className="text-muted-foreground hover:text-primary">
                      <LinkedinIcon className="h-4 w-4" />
                    </a>
                    <a href={member.social.twitter} className="text-muted-foreground hover:text-primary">
                      <TwitterIcon className="h-4 w-4" />
                    </a>
                    <a href={member.social.instagram} className="text-muted-foreground hover:text-primary">
                      <InstagramIcon className="h-4 w-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="section-padding bg-muted/40">
        <div className="container mx-auto container-padding">
          <div className="text-center space-y-6 mb-16">
            <h2>Our Achievements</h2>
            <p className="text-lg text-muted-foreground">
              Recognition and milestones that define our success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                    <achievement.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-semibold">{achievement.title}</h4>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured News */}
      <section className="section-padding">
        <div className="container mx-auto container-padding">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-6 mb-12">
              <h2>In the News</h2>
              <p className="text-lg text-muted-foreground">
                Featured coverage of our work and industry insights
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Creator Economy Insights 2024',
                  source: 'Marketing Weekly',
                  date: 'March 2024',
                  description: 'How Creator\'s Tribe is shaping the future of influencer marketing'
                },
                {
                  title: 'Award-Winning Campaign Strategy',
                  source: 'Digital Marketing Today',
                  date: 'February 2024',
                  description: 'Behind the scenes of our most successful brand partnerships'
                },
                {
                  title: 'The Future of Creator Partnerships',
                  source: 'Industry Leader',
                  date: 'January 2024',
                  description: 'Our CEO discusses trends and predictions for creator marketing'
                }
              ].map((article, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6 space-y-3">
                    <Badge variant="secondary">{article.source}</Badge>
                    <h4 className="font-semibold">{article.title}</h4>
                    <p className="text-sm text-muted-foreground">{article.description}</p>
                    <p className="text-xs text-muted-foreground">{article.date}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container mx-auto container-padding">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-white">Join Our Tribe</h2>
            <p className="text-xl text-primary-foreground/80">
              Ready to take your brand or creator career to the next level? 
              Let's build something amazing together.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/contact">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
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