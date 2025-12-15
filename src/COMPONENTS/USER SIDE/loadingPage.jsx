import React from 'react';

const styleSheet = `
    /* Global Styles */
    .loading-root {
        margin: 0;
        background: #111; /* Deep space background */
        overflow: hidden; 
        font-family: 'Inter', sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        width: 100vw;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;
    }

    /* Keyframes for Animations */
    @keyframes spin { to { transform: rotate(300deg); } }
    @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.8; transform: scale(1.05); }
    }
    @keyframes colorShift {
        0% { box-shadow: 0 0 50px rgba(0, 200, 255, 0.7); }
        33% { box-shadow: 0 0 60px rgba(255, 0, 255, 0.7); }
        66% { box-shadow: 0 0 70px rgba(255, 165, 0, 0.7); }
        100% { box-shadow: 0 0 50px rgba(0, 200, 255, 0.7); }
    }

    .vortex-container {
        position: relative;
        width: 300px;
        height: 300px;
        animation: pulse 4s infinite ease-in-out;
    }

    .vortex-ring {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 2px solid transparent;
        border-radius: 50%;
        box-sizing: border-box;
        mix-blend-mode: screen;
    }

    .vortex-ring:nth-child(1) {
        border-top-color: #00c8ff;
        transform: scale(1.0) rotate(0deg);
        animation: spin 15s linear infinite;
    }
    .vortex-ring:nth-child(2) {
        width: 90%;
        height: 90%;
        top: 5%;
        left: 5%;
        border-right-color: #ff00ff;
        transform: scale(1.0) rotate(0deg);
        animation: spin 8s linear infinite reverse;
    }
    .vortex-ring:nth-child(3) {
        width: 80%;
        height: 80%;
        top: 10%;
        left: 10%;
        border-bottom-color: #ffa500;
        transform: scale(1.0) rotate(0deg);
        animation: spin 5s linear infinite;
    }

    .vortex-core {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #000;
        animation: colorShift 6s infinite alternate, pulse 4s infinite ease-in-out;
    }

    .loading-text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
        font-size: 1.2em;
        font-weight: 700;
        letter-spacing: 2px;
        text-shadow: 0 0 5px #00c8ff;
        z-index: 10;
        text-align: center;
    }
`;

export const LoadingPage = () => {
    return (
        <div className="loading-root" role="status" aria-live="polite">
            <style>{styleSheet}</style>

            <div className="vortex-container" aria-hidden="false">
                <div className="vortex-ring" />
                <div className="vortex-ring" />
                <div className="vortex-ring" />

                <div className="vortex-core" />

                <div className="loading-text">
                    INITIATING...
                    <div style={{ fontSize: '0.8rem', marginTop: 8 }}>This won't take long</div>
                </div>
            </div>
        </div>
    );
};

export default LoadingPage;
