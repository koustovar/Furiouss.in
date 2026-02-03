import React from 'react';
import Card from '../ui/Card';
import { Layout, Smartphone, Zap, Code, Shield, Globe } from 'lucide-react';

const featuresData = [
    {
        icon: <Layout className="w-8 h-8 text-blue-400" />,
        title: 'Modern Design',
        description: 'Aesthetically pleasing layouts with focus on whitespace and typography.'
    },
    {
        icon: <Smartphone className="w-8 h-8 text-pink-400" />,
        title: 'Responsive',
        description: 'Perfectly adaptable interfaces that look great on any device size.'
    },
    {
        icon: <Zap className="w-8 h-8 text-yellow-400" />,
        title: 'High Performance',
        description: 'Optimized for speed and SEO to ensure smooth user experience.'
    },
    {
        icon: <Code className="w-8 h-8 text-green-400" />,
        title: 'Clean Code',
        description: 'Maintainable and scalable codebase following best practices.'
    },
    {
        icon: <Shield className="w-8 h-8 text-purple-400" />,
        title: 'Secure',
        description: 'Best security practices implemented from the ground up.'
    },
    {
        icon: <Globe className="w-8 h-8 text-cyan-400" />,
        title: 'SEO Friendly',
        description: 'Built with search engines in mind to increase your visibility.'
    }
];

const Features = () => {
    return (
        <section id="features" className="py-24 bg-surface/50 relative">
            <div className="container mx-auto px-6">
                <div className="mb-16 md:text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Built for Excellence</h2>
                    <p className="text-gray-400 text-lg">
                        Every project is crafted with attention to detail, ensuring top-tier quality and performance.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuresData.map((feature, index) => (
                        <Card key={index} delay={index * 0.1} className="h-full">
                            <div className="bg-white/5 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
