// App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import DigitalTwinAssessment from './components/DigitalTwinAssessment';
import PrivacyPolicyRedirect from './components/PrivacyPolicyRedirect';
import EntrepreneurshipRecipeGallery from './components/EntrepreneurshipRecipeGallery';
import AdminBlogPost from './admin/AdminBlogPost';
import FetchBlogPost from './blog/FetchBlogPost';
import BlogPostListing from './admin/BlogPostListing';
import { AuthProvider } from './utils/AuthContext';
import PrivateRoute from './utils/PrivateRoute';
import './index.css';
import '@n8n/chat/style.css';

const ChatbotPage = () => {
  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    const { createChat } = require('@n8n/chat');
    createChat({
      webhookUrl: `http://localhost:5678/webhook/0133dcca-e8e0-4bf8-be8c-79a8f8a68304/chat`,
      webhookConfig: {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', userId }
      },
      target: '#n8n-chat',
      mode: 'fullscreen',
      chatInputKey: 'chatInput',
      chatSessionKey: 'sessionId',
      metadata: { userId },
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
        }
      }
    });
  }, []);

  return <div className="min-h-screen bg-gray-50" id="n8n-chat"></div>;
};

const App = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4620880564377191";
    script.async = true;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
    return () => document.head.removeChild(script);
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/assessment" element={<PrivateRoute><DigitalTwinAssessment /></PrivateRoute>} />
          <Route path="/chatbot" element={<PrivateRoute><ChatbotPage /></PrivateRoute>} />
          <Route path="/erinnern" element={<PrivacyPolicyRedirect />} />
          <Route path="/admin/blog" element={<AdminBlogPost />} />
          <Route path="/blog/:slug" element={<FetchBlogPost />} />
          <Route path="/admin/blog/edit/:slug" element={<AdminBlogPost />} />
          <Route path="/admin/blog/list" element={<BlogPostListing />} />
          <Route element={<PrivateRoute />}>
            <Route path="/category/:gallery" element={<EntrepreneurshipRecipeGallery />} />
            <Route path="/category/:lifestyle" element={<EntrepreneurshipRecipeGallery />} />
            <Route path="/category/:mindset" element={<EntrepreneurshipRecipeGallery />} />
          </Route>
        </Routes>
        <div className="text-center mt-4 text-xs text-black-0">
          <Link to="/erinnern" className="hover:underline">Datenschutz</Link>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
