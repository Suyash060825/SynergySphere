import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  CheckSquare, 
  MessageSquare, 
  TrendingUp, 
  Shield, 
  Zap,
  ArrowRight,
  Star
} from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: CheckSquare,
      title: 'Smart Task Management',
      description: 'Organize and track tasks with intelligent prioritization and deadline management'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Connect teams across India with seamless communication and project coordination'
    },
    {
      icon: MessageSquare,
      title: 'Real-time Discussions',
      description: 'Engage in threaded discussions with @mentions and instant notifications'
    },
    {
      icon: TrendingUp,
      title: 'Progress Analytics',
      description: 'Visual insights and reports to track project progress and team performance'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with data protection and privacy controls'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized for speed with instant updates and responsive design'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Project Manager, Tech Mahindra',
      content: 'SynergySphere transformed how our Mumbai team collaborates. Task management has never been this efficient!'
    },
    {
      name: 'Arjun Patel',
      role: 'Team Lead, Infosys',
      content: 'The real-time discussions and progress tracking helped us deliver projects 30% faster across our Bangalore office.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                SynergySphere
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/auth')}>
                Sign In
              </Button>
              <Button onClick={() => navigate('/auth')}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <Badge variant="secondary" className="px-4 py-2 text-sm">
            🇮🇳 Proudly Made in India
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
            Advanced Team
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Collaboration</span>
            <br />for Modern India
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Empower your teams across Mumbai, Delhi, Bangalore, and beyond with intelligent 
            project management, seamless communication, and powerful analytics.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button 
              size="lg" 
              className="px-8 py-4 text-lg"
              onClick={() => navigate('/auth')}
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-4 text-lg"
              onClick={() => navigate('/auth')}
            >
              Sign In
            </Button>
          </div>
          
          <div className="flex items-center justify-center space-x-6 pt-8 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>10,000+ Teams</span>
            </div>
            <div className="flex items-center space-x-1">
              <Shield className="h-4 w-4" />
              <span>Enterprise Ready</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything Your Team Needs
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              From task management to team discussions, SynergySphere provides all the tools 
              your Indian team needs to succeed in today's fast-paced business environment.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Trusted by Leading Indian Companies
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-16">
            See how teams across India are transforming their collaboration
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="text-left hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-6 italic leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Team?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of Indian teams already using SynergySphere to achieve more together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="px-8 py-4 text-lg"
              onClick={() => navigate('/auth')}
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="px-8 py-4 text-lg border-white text-white hover:bg-white hover:text-blue-600"
              onClick={() => navigate('/auth')}
            >
              Sign In Now
            </Button>
          </div>
          <p className="text-sm mt-6 opacity-75">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Users className="h-8 w-8 text-blue-400" />
            <span className="text-2xl font-bold">SynergySphere</span>
          </div>
          <p className="text-gray-400 mb-6">
            Advanced Team Collaboration Platform • Made with ❤️ in India
          </p>
          <div className="flex justify-center space-x-8 text-sm text-gray-400">
            <span>© 2024 SynergySphere</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Support</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
