import React, { useState } from 'react';
import './BlogsPage.css';

function BlogsPage() {
    useEffect(() => {
        document.title = "Blogs | InventZa";
    }, []);

    const initialPosts = [
        {
            id: 1,
            creator: 'Alex Johnson',
            profilePic: 'https://placehold.co/40x40/4CAF50/ffffff?text=AJ',
            content: "I've been developing a new AI-powered platform for personalized education. We're in the MVP testing phase and have some promising early results! Looking for a dynamic leader to drive our growth.",
            imageUrl: 'https://placehold.co/800x600/f0f8ff/4CAF50?text=AI+EdTech+Platform',
            likes: 42,
            isLiked: false,
            situation: {
                seekingPosition: 'Co-founder/CEO',
                presentRevenue: '$5K/month',
                aimedRevenue: '$50K/month (in 6 months)',
                investorsSponsors: 'Angel Investor Seed Funding',
            },
        },
        {
            id: 2,
            creator: 'Maria Rodriguez',
            profilePic: 'https://placehold.co/40x40/FF5722/ffffff?text=MR',
            content: "Excited to share that our sustainable packaging startup has just secured a partnership with a major retailer! We're looking for a marketing guru to help us scale our impact.",
            imageUrl: 'https://placehold.co/800x600/fef9f4/FF5722?text=Sustainable+Packaging',
            likes: 58,
            isLiked: false,
            situation: {
                seekingPosition: 'CMO/Marketing Lead',
                presentRevenue: '$10K/month',
                aimedRevenue: '$100K/month (in 6 months)',
                investorsSponsors: 'Venture Capital Series A',
            },
        },
    ];

    //Situation Form
    const NeedsSituationForm = ({ situation }) => (
    <div className="needs-form-container">
      <h3>Current Needs & Situation</h3>
      <div className="form-item">
        <label>Seeking Position:</label>
        <p><strong>{situation.seekingPosition}</strong></p>
      </div>
      <div className="form-item">
        <label>Present Revenue:</label>
        <p><strong>{situation.presentRevenue}</strong></p>
      </div>
      <div className="form-item">
        <label>Aimed Revenue:</label>
        <p><strong>{situation.aimedRevenue}</strong></p>
      </div>
      <div className="form-item">
        <label>Investors/Sponsors:</label>
        <p><strong>{situation.investorsSponsors}</strong></p>
      </div>
    </div>
);

// --- Sub-Component 2: Private Message Model ---
const PrivateMessage = ({ creatorName, onClose }) => {
    const [message, setMessage] = useState('');
    const [chatLog, setChatLog] = useState([
      { sender: creatorName, text: `Hello! I saw your post. I'm interested in discussing your ${creatorName === 'Alex Johnson' ? 'CEO' : 'Marketing Director'} role.`, isUser: false },
    ]);
  
    const handleSend = (e) => {
      e.preventDefault();
      if (message.trim()) {
        const newMessage = { sender: 'You', text: message.trim(), isUser: true };
        setChatLog([...chatLog, newMessage]);
        setMessage('');
        // NOTE: In a real app, this would send the message via a service (like Firestore)
      }
    };
  
    return (
      <div className="message-modal-overlay">
        <div className="message-container">
          <div className="message-header">
            <h3>Private Chat with {creatorName}</h3>
            <button className="close-btn" onClick={onClose}>&times;</button>
          </div>
          
          <div className="chat-log">
            {chatLog.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.isUser ? 'user-message' : 'other-message'}`}>
                <span className="message-text">{msg.text}</span>
              </div>
            ))}
          </div>
          
          <form className="message-input-form" onSubmit={handleSend}>
            <input
              type="text"
              placeholder={`Type your private message to ${creatorName}...`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              autoFocus
            />
            <button type="submit" disabled={!message.trim()}>Send</button>
          </form>
        </div>
      </div>
    );
};

// --- Main Application Component (Blogs Page) ---
const Blog_Message = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [isMessaging, setIsMessaging] = useState(false);
  const [currentCreator, setCurrentCreator] = useState('');

  // Toggles the like state and updates the count
  const handleLike = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          };
        }
        return post;
      })
    );
  };

  // Handles the 'Stay in Touch' action
  const handleStayInTouch = (creator) => {
    // NOTE: Replace alert with a proper notification UI in production
    alert(`You are now 'staying in touch' with ${creator}! (Connection request sent)`);
  };

  // Opens the private message modal
  const handleMessage = (creator) => {
    setCurrentCreator(creator);
    setIsMessaging(true);
  };

// Closes the private message modal
  const handleCloseMessage = () => {
    setIsMessaging(false);
    setCurrentCreator('');
  };

  return (
    <>
      {/* Inject CSS into the document head */}
      <style>{styleSheet}</style>

      <div className="blogs-page-container">
        <h1>Community Collaboration Posts</h1>
        <div className="posts-grid">
          {posts.map((post) => (
            <div key={post.id} className="post-card">
              
              {/* Post Header (Creator Info) */}
              <div className="post-header">
                <img src={post.profilePic} alt="Profile" className="profile-pic" />
                <div className="creator-info">
                  <span className="creator-name">{post.creator}</span>
                  <button 
                    className="stay-in-touch-btn"
                    onClick={() => handleStayInTouch(post.creator)}
                  >
                    Stay in Touch
                  </button>
                </div>
              </div>

              {/* Post Image/Content */}
              <img src={post.imageUrl} alt="Post" className="post-image" />
              <div className="post-content">
                <p><strong>{post.creator}:</strong> {post.content}</p>
              </div>
              
              {/* Dynamic Needs/Situation Form */}
              <NeedsSituationForm situation={post.situation} />

              {/* Action Buttons & Likes */}
              <div className="post-actions">
                <div className="action-buttons">
                  {/* Like Button */}
                  <button
                    className={`action-btn like-btn ${post.isLiked ? 'liked' : ''}`}
                    onClick={() => handleLike(post.id)}
                  >
                    {post.isLiked ? '❤️ Liked' : '🤍 Like'}
                  </button>
                  
                  {/* Message Button (ONLY private message) */}
                  <button 
                    className="action-btn message-btn"
                    onClick={() => handleMessage(post.creator)}
                  >
                    ✉️ Message Privately
                  </button>
                </div>
                
                <span className="likes-count">
                  <strong>{post.likes}</strong> {post.likes === 1 ? 'like' : 'likes'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Conditional Rendering of the Private Message Modal */}
        {isMessaging && (
          <PrivateMessage 
            creatorName={currentCreator} 
            onClose={handleCloseMessage} 
          />
        )}

      </div>
    </>
  );
};
    return (
        <div className="blogs-page">
            <h1>Blogs</h1>
            <div className="posts-container">
                {/* Render posts, e.g. initialPosts.map(post => <PostCard key={post.id} post={post} />) */}
            </div>
        </div>
    );
};
export default {BlogsPage};