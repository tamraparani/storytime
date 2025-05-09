// App.js
import React from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import DigitalTwinAssessment from './components/DigitalTwinAssessment';
import { useState } from 'react';
import { useEffect} from 'react';
import './index.css'
import '@n8n/chat/style.css';
import PrivacyPolicyRedirect from './components/PrivacyPolicyRedirect';
import EntrepreneurshipRecipeGallery from './components/EntrepreneurshipRecipeGallery'
import AdminBlogPost from './admin/AdminBlogPost';
import FetchBlogPost from './blog/FetchBlogPost';
import BlogPostListing from './admin/BlogPostListing';


const App = () => {

  useEffect(() => {
    // Create script element
    const script = document.createElement('script');
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4620880564377191";
    script.async = true;
    script.crossOrigin = "anonymous";

    // Add script to document head
    document.head.appendChild(script);

    // Optional: Cleanup function
    return () => {
      document.head.removeChild(script);
    };
  }, []); // Empty dependency array ensures this runs only once

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  // New Chatbot Component
const ChatbotPage = () => {
  useEffect(() => {
    try {
      const userId = sessionStorage.getItem('userId');
      console.log('UserId-beforen8n', userId);
      const N8N_WEBHOOK =   'http://localhost:5678'||  process.env.REACT_APP_N8N_WEBHOOK_URL;
      console.log('userid-chatbot',userId);
      const { createChat } = require('@n8n/chat');
      createChat({
        webhookUrl: `${N8N_WEBHOOK}/webhook/0133dcca-e8e0-4bf8-be8c-79a8f8a68304/chat`,
        webhookConfig: {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'userId': userId  // Properly formatted header
          }
        },
        target: '#n8n-chat',
        mode: 'fullscreen',
        chatInputKey: 'chatInput',
        chatSessionKey: 'sessionId',
        metadata: {
          userId: userId  // Also include in metadata
        },
        showWelcomeScreen: false,
        defaultLanguage: 'en',
        initialMessages: [
          'User once asked his twin.. 👋',
          'Find a Christmas Sweater'
        ],
        i18n: {
          en: {
            title: 'Hey there, I am your Digital Twin..',
            subtitle: 'Please wait for a few minutes while I get ready to start matching',
            footer: '',
            getStarted: 'New Conversation',
            inputPlaceholder: 'Type your question..',
          },
        },
      });
    } catch (error) {
      console.error('Error initializing chat:', error);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* The chat widget will be injected here by @n8n/chat */}
    </div>
  );
};

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<LandingPage setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/assessment"
          element={
            <ProtectedRoute>
              <DigitalTwinAssessment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chatbot"
          element={
            <ProtectedRoute>
              <ChatbotPage />
            </ProtectedRoute>
          }
        />

// Inside your LandingPage component's return statement
// Blogs
<Route
          path="/erinnern"
          element={<PrivacyPolicyRedirect />}
        />




<Route path="/admin/blog" element={<AdminBlogPost />} />
<Route path="/blog/:slug" element={<FetchBlogPost />} />
<Route path="/admin/blog/edit/:slug" element={<AdminBlogPost />} />
<Route path="/admin/blog/list" element={<BlogPostListing />} />

<Route path="/category/:gallery" element={<EntrepreneurshipRecipeGallery />} />
<Route path="/category/:lifestyle" element={<EntrepreneurshipRecipeGallery />} />
<Route path="/category/:mindset" element={<EntrepreneurshipRecipeGallery />} />

      </Routes>
            {/* Privacy Policy Link */}
<div className="text-center mt-4 text-xs text-black-0">
  <Link to="/erinnern" className="hover:underline ">
    Datenschutz
  </Link>
</div>
    </Router>
  );
};

export default App;
