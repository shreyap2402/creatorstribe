import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto section-padding container-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Creator's Tribe</h3>
            <p className="text-sm text-primary-foreground/70">
              Empowering creators and brands through innovative digital marketing solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary-foreground/70 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary-foreground/70 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary-foreground/70 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary-foreground/70 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary-foreground/70 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <div className="space-y-2 text-sm">
              <Link to="/creators" className="block hover:text-primary-foreground/70 transition-colors">
                Our Creators
              </Link>
              <Link to="/services" className="block hover:text-primary-foreground/70 transition-colors">
                Services
              </Link>
              <Link to="/work" className="block hover:text-primary-foreground/70 transition-colors">
                Our Work
              </Link>
              <Link to="/about" className="block hover:text-primary-foreground/70 transition-colors">
                About Us
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold">Services</h4>
            <div className="space-y-2 text-sm text-primary-foreground/70">
              <p>PR Services</p>
              <p>Social Media Management</p>
              <p>Talent Management</p>
              <p>Influencer Marketing</p>
              <p>Video Production</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold">Contact Info</h4>
            <div className="space-y-2 text-sm text-primary-foreground/70">
              <p>Email: hello@creatorstribe.co</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Address: 123 Creative Street<br />Digital City, DC 12345</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-primary-foreground/70">
              © 2024 Creator's Tribe. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="hover:text-primary-foreground/70 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary-foreground/70 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}