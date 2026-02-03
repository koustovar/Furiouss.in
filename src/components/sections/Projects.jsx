import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
    {
        title: "E-Commerce Dashboard",
        category: "Web Application",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
        description: "A comprehensive analytics dashboard for online retailers with real-time data visualization."
    },
    {
        title: "SaaS Landing Page",
        category: "Marketing Website",
        image: "https://images.unsplash.com/photo-1481487484168-9b930d5b7d93?q=80&w=2662&auto=format&fit=crop",
        description: "High-conversion landing page designed for a modern SaaS startup with 3D elements."
    },
    {
        title: "Portfolio Theme",
        category: "Design System",
        image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=2680&auto=format&fit=crop",
        description: "A minimalist portfolio template for creatives, built with pure CSS and vanilla JS."
    }
];

const ProjectCard = ({ project, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer"
        >
            {/* Image with zoom effect */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${project.image})` }}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300" />
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-primary text-sm font-medium tracking-wider uppercase mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                        {project.category}
                    </span>
                    <h3 className="text-3xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-300 mb-6 max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                        {project.description}
                    </p>

                    <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300 translate-y-4 group-hover:translate-y-0">
                        <Button variant="primary" className="py-2 px-4 text-sm h-10 w-auto">
                            View Live <ExternalLink className="w-4 h-4 ml-2" />
                        </Button>
                        <Button variant="outline" className="py-2 px-4 text-sm h-10 w-auto">
                            Source <Github className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Projects = () => {
    return (
        <section id="projects" className="py-24 bg-background">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Selected Works</h2>
                        <p className="text-gray-400 text-lg max-w-xl">
                            A collection of projects attempting to push the boundaries of web development.
                        </p>
                    </div>
                    <Button variant="outline">View All Projects</Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-8">
                        <ProjectCard project={projects[0]} index={0} />
                        <ProjectCard project={projects[2]} index={2} />
                    </div>
                    <div className="space-y-8 lg:pt-24">
                        <ProjectCard project={projects[1]} index={1} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;
