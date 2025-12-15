import React,{useState, useEffect} from 'react';
import { Link, Navigate } from 'react-router-dom';
import './landingpage.css';


function LandingPage() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.document.title = "Home | InventZa";
        // Simulated loading time
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);
    return (
        <div className='hero-container'>
            <h1 className='hero-title'>InventZa</h1>
            <h1 className='hero-emoji'>🚀</h1>
            <p className='hero-subtitle'>A Home For The Collaborators</p>
            
            <div className='hero-buttons'>
                
                    <Link to="/login" className="hero-loginbtn">Login / Signup</Link>
                <div className='hero-explore-text'>
                    <p className='hero-explore-text-content'></p>
                </div>
                
                    <Link to="/explore" className="hero-explorebtn">Explore More</Link>
            </div>
        </div>
    );
};

export default LandingPage;