import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import { Navigate, BrowserRouter as Router } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Explore.css';
import { ClipboardList, Search, FlaskConical, Code, Film, Briefcase, TrendingUp, Lightbulb, Music } from 'lucide-react';

function Explore() {
    return (
        <div className='explore-wrapper'>
            <Helmet>
                <title>InventZa</title>
                <meta name="description" content="Explore The Global Collaboration Hub for Innovators, Scientists, and Composers. Discover, connect, and innovate." />
            </Helmet>

            <main className='explore-main-content'>
                <section className='hero-section'>
                    <h1 className='hero-title'>Where Idea Starts up 🚀</h1>
                    <p className='hero-subtitle'>
                        The ultimate social media platform for innovators, scientists, and composers.
                        Collaborate with like-minded individuals.
                        Create, Innovate, and Share your ideas with the world.
                    </p>
                    <div className='features-grid'>
                        <div className='feature-card'>
                            <div className='feature-icon-wrapper'>
                                <Search size={40} color='#2563eb'/>
                            </div>
                            <h3 className='feature-card-title'>Discovery Engine</h3>
                            <p className='feature-card-description'>
                                Advanced search capabilities to find collaborators, projects, and resources, filtering across various domains.
                            </p>
                        </div>
                        <div className='feature-card'>
                            <div className='feature-icon-wrapper'>
                                <Search size={40} color='#2563eb'/>
                            </div>
                            <h3 className='feature-card-title'>Global Collaboration</h3>
                            <p className='feature-card-description'>
                                Connect with innovators, scientists, and composers worldwide to share ideas and projects.
                            </p>
                        </div>
                        <div className='feature-card'>
                            <div className='feature-icon-wrapper'>
                                <ClipboardList size={40} color='#2563eb'/>
                            </div>
                            <h3 className='feature-card-title'>Open projects</h3>
                            <p className='feature-card-description'>
                                Showcase your ideas and find worldwide projects.
                            </p>
                        </div>
                    </div>
                </section>
                <section className='explore-section'>
                    <h2 className='explore-title'>Ideas Should Not Be Hiding 🫱🏻‍🫲🏿</h2>
                    <p className='explore-subtitle'>
                        Your idea have not to be a startup!
                        From STEM to the Arts, InventZa stands as your gateway to a world of your niche.
                        Whether you're a scientist, composer, or innovator, our platform develops to connect you with the right people and resources to bring your ideas to life.
                    </p>
                  {/*  <Link to="/signup" className='explore-cta-button'>Get Started</Link> */}
                    <div className="category-icons">
                    <div className="category-item">
                      <FlaskConical size={40} color="#e7670dff" /> {/* Lucide FlaskConical icon for STEM */}
                      <p>STEM</p>
                    </div>
                    <div className="category-item">
                      <Code size={40} color="#e7670dff" /> {/* Lucide Code icon for Software Dev */}
                      <p>Software Dev</p>
                    </div>
                    <div className="category-item">
                      <Film size={40} color="#e7670dff" /> {/* Lucide Film icon for Films */}
                      <p>Films</p>
                    </div>
                    <div className="category-item">
                      <Briefcase size={40} color="#e7670dff" /> {/* Lucide Briefcase icon for Business */}
                      <p>Business</p>
                    </div>
                    <div className="category-item">
                      <TrendingUp size={40} color="#e7670dff" /> {/* Lucide TrendingUp icon for Economics */}
                      <p>Economics</p>
                    </div>
                    <div className="category-item">
                      <Lightbulb size={40} color="#e7670dff" /> {/* Lucide Lightbulb icon for Entrepreneurship */}
                      <p>Entrepreneurship</p>
                    </div>
                    <div className="category-item">
                      <Music size={40} color="#e7670dff" /> {/* Lucide Music icon for Music */}
                      <p>Music</p>
                    </div>
                  </div>
                </section>
                {/* Call to Action (CTA) Section - The blue block at the foot */}
                <section className="cta-section">
                  <div className="cta-content">
                    <h2 className="cta-title">Ready to Change the World?</h2>
                    <p className="cta-description">
                      Build the community today and start your journey of innovation and collaboration. Your next great idea is just a connection away.
                    </p>
                    <Navigate to="/Signup" className="cta-button">Join Now</Navigate>
                  </div>
                </section>
            </main>
        </div>    
            );
};

export default Explore;