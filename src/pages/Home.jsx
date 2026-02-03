import React from 'react';
import Hero from '../components/sections/Hero';
import Features from '../components/sections/Features';
import Projects from '../components/sections/Projects';
import Contact from '../components/sections/Contact';

const Home = () => {
    return (
        <main className="relative z-10 bg-background overflow-hidden">
            {/* Sections */}
            <Hero />
            <Features />
            <Projects />
            <Contact />
        </main>
    );
};

export default Home;
