import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import car99 from '../images/meditating.jpeg';
import luxurylife from '../images/luxurylife.jpeg';
import goodvibesonly from './goodvibesonly.jpeg';
import Deepa from './Deepa.jpeg';
import emptyaudience from '../images/emptyaudience.jpeg';
import { Link } from 'react-router-dom';
import pillars from '../images/pillars.jpeg';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const LandingPage = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');

  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');

  const handleTryForFree = async () => {
    setError('');
    try {
      const SIGN_IN_API_URL = 'http://localhost:5678'  ||  process.env.REACT_APP_N8N_WEBHOOK_URL ;
      const response = await fetch(`${SIGN_IN_API_URL}/webhook/user-signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'signup',
          email:"test",
          password:"test"
        })
      });
      const data = await response.json();
      setIsAuthenticated(true);
      setIsModalOpen(false);
      sessionStorage.setItem('userId', data.userid);
      navigate('/assessment');

    } catch (err) {
      setError('Authentication failed. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5678/webhook/user-signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: isLogin ? 'login' : 'signup',
          email,
          password,
          name: isLogin ? undefined : name
        })
      });

      const data = await response.json();

      if (data.authenticated) {
        setIsAuthenticated(true);
        setIsModalOpen(false);
        sessionStorage.setItem('userId', data.userid);
        navigate(isLogin ? '/chatbot' : '/assessment');
      } else {
        setError(data.message || 'Authentication failed');
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
    }
  };

  return (
    <div className="relative overflow-visible">
      {/* Header with title now at the very top */}
      <header className="bg-white shadow-sm">
      <div
        className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-center relative"
      >
        <h1
          className="text-3xl font-light tracking-wider text-gray-800 text-center uppercase"
          style={{ fontFamily: "'Indie Flower', cursive" }}
        >
          Learning German with Akbar and Birbal
        </h1>
      </div>
    </header>

      <div className="w-screen h-[700px] overflow-hidden">
  <img
    src={goodvibesonly}
    alt="Background"
    className="w-full h-full object-cover"
  />
   <Link
    to="/category/gallery"
    className="absolute top-[4%] right-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all cursor-pointer"
  >
    View Gallery
  </Link>
</div>
      {/* Tagline section */}


      {/* How It Works section */}
      <div className="bg-white/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl font-bold text-center mb-12 italic">Unpacking Childhood stories in German.</h2>

          <div className="bg-white/70 backdrop-blur-sm py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* About Me Section */}
              <div className="bg-white/80 p-4 mb-8 max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-12">
                  <div className="w-full md:w-1/4 md:ml-6">
                    <img
                      src={Deepa}
                      alt="Deepa"
                      className="w-full h-auto object-cover aspect-square"
                    />
                  </div>
                  <div className="w-full md:w-2/3">
                    <h3 className="text-lg font-semibold mb-3 italic">Hello there! Glad that you are here </h3>
                    <p className="text-gray-700 text-sm mb-2 font-light leading-relaxed">
                      Welcome to my storytime where every story is a childhood experience.
                    </p>
                    <p className="text-gray-700 text-sm mb-2 font-light leading-relaxed">
                      Here you will find stories and lessons that will make you a Conversation German.
                    </p>
                    <p className="text-gray-700 text-sm mb-2 font-light leading-relaxed">
                      Find your German inner-self or read stories to your children
                    </p>
                    <p className="text-gray-700 text-sm mb-2 font-light leading-relaxed">
                      Join me on this journey to recreate a memorable childhood.
                    </p>
                  </div>
                </div>
              </div>

              {/* My Favorite Articles Section */}
              <div className="w-full bg-white py-16 my-12">
                <div className="w-full max-w-4xl mx-auto px-4 text-center">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-serif italic font-semibold mb-3 text-gray-800">My Favorite Articles</h2>
                    <div className="flex justify-center mb-3">
                      <div className="w-16 border-t-2 border-gray-300"></div>
                    </div>
                    <p className="text-gray-600 font-serif max-w-2xl mx-auto text-sm">
                      These pieces have shaped our real life experiences. Each story is tailored for your and your child's personal growth.
                    </p>
                  </div>

                  {/* Article Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                      {
                        id: 1,
                        image: pillars,
                        title: "The Talking Birds",
                        category: "Stories",
                        route: "/blog/talking-birds"
                      },
                      {
                        id: 2,
                        image: luxurylife,
                        title: "Story of the Hungry Fox and the Grapes",
                        category: "Stories",
                        route: "/blog/hungry-fox-and-the-grapes"
                      },
                      {
                        id: 3,
                        image: emptyaudience,
                        title: "The Hare and the Tortoise ",
                        category: "Stories",
                        route: "/blog/the-hare-and-the-tortoise"
                      },
                      {
                        id: 4,
                        image: car99,
                        title: "The Elephant and the Ant",
                        category: "Stories",
                        route: "/blog/the-elephant-and-the-ant"
                      },
                    ].map((article) => (
                      <div key={article.id} className="flex flex-col items-center">
                        <div className="w-full h-64 overflow-hidden mb-4">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover hover:opacity-90 transition-opacity duration-300"
                          />
                        </div>
                        <div className="text-center">
                          <p className="uppercase text-xs font-medium text-gray-500 tracking-wider mb-2">
                            {article.category}
                          </p>
                          <h3 className="text-xl font-medium hover:text-orange-600 transition-colors">
                            <a href={article.route} className="text-gray-800 hover:text-orange-600">
                              {article.title}
                            </a>
                          </h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {isLogin ? 'Sign In' : 'Create Account'}
          </h2>
          <p className="text-gray-600">
            {isLogin ? 'Welcome back!' : 'Start your personalized shopping journey'}
          </p>
        </div>
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-600 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
          <p className="text-center text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              className="text-indigo-600 hover:text-indigo-800"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </form>
      </Modal>
    </div>
  );
};

export default LandingPage;
