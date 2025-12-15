import React, { useState, useEffect } from 'react';

// The use of 'Link' is simulated as it typically comes from 'react-router-dom'.
const Link = ({ to, children }) => <a href={to} style={{color: 'inherit'}}>{children}</a>;

// --- STYLESHEET ---  //
const signupStyles = `
    /* Use Inter font for a modern look */
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
    
    * {
        box-sizing: border-box;
        font-family: 'Inter', sans-serif;
    }

    /* Outer Container: Dark, atmospheric background */
    .app-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        width: 100%;
        background: #0a192f; /* Deep Navy/Teal Background */
        color: #e6f1ff; /* Light text for high contrast */
        padding: 20px;
    }

    /* Signup Card */
    .card {
        background: #172a45; /* Slightly lighter inner background */
        padding: 40px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        max-width: 450px; /* Slightly wider for the progress bar */
        width: 100%;
        transition: transform 0.3s ease;
    }
    
    .card:hover {
        transform: translateY(-5px);
    }

    /* Title */
    .title {
        font-size: 1.8em;
        font-weight: 700;
        margin-bottom: 30px;
        color: #64ffda; /* Bright accent color */
        text-align: center;
    }

    /* --- Form Elements --- */
    form div {
        margin-bottom: 20px;
    }

    label {
        display: block;
        margin-bottom: 8px;
        font-weight: 500;
        color: #ccd6f6;
        transition: color 0.3s;
    }

    input, select {
        width: 100%;
        padding: 12px;
        border: 1px solid #303c55;
        border-radius: 6px;
        background: #0d2138;
        color: #e6f1ff;
        font-size: 1em;
        transition: border-color 0.3s, box-shadow 0.3s;
        -webkit-appearance: none; /* Remove default browser styling for select */
        appearance: none;
    }

    input:focus, select:focus {
        border-color: #64ffda; /* Accent color on focus */
        outline: none;
        box-shadow: 0 0 0 2px rgba(100, 255, 218, 0.3);
    }

    /* --- Buttons --- */
    .action-btn {
        width: 100%;
        padding: 12px;
        border: none;
        border-radius: 6px;
        font-size: 1.05em;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.3s, transform 0.1s, opacity 0.3s;
    }

    /* Primary (Next/Sign Up) Button */
    .primary-btn {
        background: #64ffda; /* Vibrant accent color */
        color: #0a192f;
    }

    .primary-btn:hover:not(:disabled) {
        background: #99fddf;
        transform: translateY(-1px);
    }
    
    .primary-btn:disabled {
        background: #303c55;
        color: #8892b0;
        cursor: not-allowed;
    }

    /* Secondary (Back) Button */
    .secondary-btn {
        background: none;
        border: 1px solid #303c55;
        color: #ccd6f6;
    }

    .secondary-btn:hover {
        background: #303c55;
    }

    /* --- Progress Indicator --- */
    .progress-bar-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
    }
    
    .step-indicator {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: #303c55;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #8892b0;
        font-weight: 700;
        font-size: 0.9em;
        position: relative;
        z-index: 2;
        transition: background 0.3s, color 0.3s;
    }

    .step-indicator.active {
        background: #64ffda;
        color: #0a192f;
    }

    .progress-line {
        position: absolute;
        width: 100%;
        height: 2px;
        background: #303c55;
        top: 45px; /* Adjust based on step-indicator position */
        left: 0;
        transform: translateY(-50%);
        z-index: 1;
    }

    .progress-fill {
        height: 100%;
        background: #64ffda;
        width: 0%;
        transition: width 0.5s ease-in-out;
    }

    /* Link to Login */
    .login-link {
        text-align: center;
        margin-top: 25px;
        font-size: 0.9em;
        color: #ccd6f6;
    }
    
    .login-link a {
        color: #64ffda;
        text-decoration: none;
        font-weight: 600;
        transition: color 0.3s;
    }
    
    .login-link a:hover {
        color: #99fddf;
        text-decoration: underline;
    }
`;

// --- REACT COMPONENT ---

function Signup () {

    useEffect(() => {
        document.title = "Sign Up | InventZa";
    }, []);

    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        email: '',                                  //For User Credentials includes email, password, and job+interest
        password: '',
        confirmPassword: '',
        fullName: '',
        jobTitle: '',
        interest: ''
    });
    const [validationError, setValidationError] = useState('');

{/*    const updateFormData = (e) => {
        const {name, value} = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
        setValidationError('');
    };
*/}

    // Simple validation placeholder logic
    const validateStepOne = () => {
        if (!formData.email || !formData.password || !formData.confirmPassword) {
            setValidationError('Please fill in all credential fields correctly.');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setValidationError('Passwords do not match.');
            return false;
        }
        if (formData.password.length < 6) {
             setValidationError('Password must be at least 6 characters.');
             return false;
        }
        return true;
    };

    const handleNext = (e) => {
        e.preventDefault();
        if (currentStep === 1) {
            if (validateStepOne()) {
                setCurrentStep(2);
                setValidationError('');
            }
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            setValidationError('');
        }
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        // Final Sign Up logic here
        console.log("Final Signup Data:", formData);
        alert('Account Created! (Check console for data)'); // Using alert for demo, replace with custom modal
    };

    // --- Step 1 Component: Credentials ---
    const StepOne = () => (
        <form onSubmit={handleNext}>
            <div>
                <label htmlFor="email">Email Address</label>
                <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="youremail@example.com"
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Password (min 6 characters)</label>
                <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                />
            </div>
            <div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    required
                />
            </div>
            {validationError && <p style={{ color: '#ff6b6b', marginTop: '-5px' }}>{validationError}</p>}
        </form>
    );

    // --- Step 2 Component: Profile Details ---
    const StepTwo = () => (
        <form onSubmit={handleSignUp}>
            <div>
                <label htmlFor="fullName">Full Name</label>
                <input
                    type="text"
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    placeholder="John Doe"
                    required
                />
            </div>
            <div>
                <label htmlFor="jobTitle">Current Role / Field of Study</label>
                <input
                    type="text"
                    id="jobTitle"
                    value={formData.jobTitle}
                    onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                    placeholder="e.g., Senior Developer, Data Scientist"
                    required
                />
            </div>
            <div>
                <label htmlFor="interest">Primary Interest Area</label>
                <select 
                    id="interest" 
                    value={formData.interest} 
                    onChange={(e) => setFormData({...formData, interest: e.target.value})}
                >
                    <option value="Software Development">Software Development</option>
                    <option value="Data Science / AI">Data Science / AI</option>
                    <option value="UX/UI Design">UX/UI Design</option>
                    <option value="Marketing / Sales">Marketing / Sales</option>
                    <option value="Finance / Business">Finance / Business</option>
                    <option value="Research / Academia">Research / Academia</option>
                    <option value="Entrepreneurship / Startups">Entrepreneurship / Startups</option>
                    <option value="Student / Learning">Student / Learning</option>
                    <option value="Film / Media">Film / Media</option>
                    <option value="Other">Other</option>
                </select>
            </div>
        </form>
    );

    // Determines if the primary button should be enabled
    const isPrimaryButtonDisabled = (step) => {
        if (step === 1) {
            // Only allow next if basic fields are filled (more complex validation is handled in handleNext)
            return !formData.email || !formData.password || !formData.confirmPassword;
        } else if (step === 2) {
            // Only allow signup if profile fields are filled
            return !formData.fullName || !formData.jobTitle;
        }
        return false;
    };
    
    // Calculates progress bar width (50% per step)
    const progressWidth = `${(currentStep / 2) * 100}%`;

    return (
        <>
            {/* Inject the cool CSS styles */}
            <style>{signupStyles}</style>

            <div className="app-container">
                <div className="card">
                    <h2 className="title">Create Your Account</h2>
                    
                    {/* Progress Indicator */}
                    <div className="progress-bar-container">
                        {/* Line with Fill */}
                        <div className="progress-line" style={{ width: 'calc(100% - 60px)', marginLeft: '30px' }}>
                            <div className="progress-fill" style={{ width: progressWidth }}></div>
                        </div>

                        {/* Step Dots */}
                        <div className="step-indicator active">1</div>
                        <div className={`step-indicator ${currentStep >= 2 ? 'active' : ''}`}>2</div>
                    </div>

                    {/* Conditional Form Rendering */}
                    {currentStep === 1 && <StepOne />}
                    {currentStep === 2 && <StepTwo />}
                    
                    {/* Navigation Buttons */}
                    <div className="navigation-controls" style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                        {currentStep > 1 && (
                            <button 
                                className="action-btn secondary-btn"
                                onClick={handleBack}
                                style={{ flexGrow: 1 }}
                            >
                                Back
                            </button>
                        )}
                        
                        {currentStep < 2 ? (
                            <button 
                                className="action-btn primary-btn" 
                                onClick={handleNext}
                                disabled={isPrimaryButtonDisabled(currentStep)}
                                style={{ flexGrow: 2 }}
                            >
                                Next Step
                            </button>
                        ) : (
                            <button 
                                className="action-btn primary-btn" 
                                onClick={handleSignUp}
                                disabled={isPrimaryButtonDisabled(currentStep)}
                                style={{ flexGrow: currentStep === 1 ? 1 : 2 }}
                            >
                                Sign Up Now
                            </button>
                        )}
                    </div>

                    <p className="login-link">
                        Already have an account? <Link to="/login">Log In</Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Signup;