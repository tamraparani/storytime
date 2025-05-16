import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import car99 from '../images/meditating.jpeg';
import luxurylife from '../images/luxurylife.jpeg';
import goodvibesonly from './goodvibesonly.jpeg';
import Deepa from './Deepa.jpeg';
import emptyaudience from '../images/emptyaudience.jpeg';
import erinnern from '../images/erinnern.jpeg';
import pillars from '../images/pillars.jpeg';
import { useAuth } from '../utils/AuthContext';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
};

const LandingPage = () => {
  const navigate = useNavigate();
  const { signUp, signIn, user, isAuthenticated, session } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      console.log('User is authenticated, navigating to gallery');
      navigate('/category/gallery');
    } else if (user && !session?.user?.confirmed_at) {
      console.log('User exists but is not confirmed yet');
      setVerificationMessage('Please check your email and confirm your account before signing in.');
    }
  }, [isAuthenticated, navigate, user, session]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setVerificationMessage('');
    setLoading(true);

    try {
      if (isLogin) {
        const result = await signIn(email, password);
        console.log('Sign in result:', result);
      } else {
        console.log('Attempting to sign up with name:', name);
        const result = await signUp(email, password, { name });
        console.log('Sign up result:', result);

        // Check if user needs to confirm email
        if (result?.user && !result.user.confirmed_at) {
          setVerificationMessage('We sent you an email with a confirmation link. Please check your inbox and confirm your account before signing in.');
        }
      }
    } catch (err) {
      console.error('Auth error:', err);
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative overflow-visible">
      {/* Logo-only header */}
      <header className="bg-white border-b border-gray-100  px-2 relative">
  {/* Centered Logo */}
  <div className="flex justify-center">
    <img
      src={erinnern}
      alt="E wie Erinnern Logo"
      className="w-24 h-24 object-contain "
    />
  </div>

  {/* Top-right Button (absolute on desktop, full-width on mobile) */}
  <div className="absolute top-8 right-8 hidden md:block">
    <button
      onClick={() => setIsModalOpen(true)}
      className="bg-gradient-to-r from-rose-200 to-amber-100 text-gray-700 font-medium text-sm sm:text-lg px-8 sm:px-8  sm:py-2 rounded-full border border-amber-200 shadow hover:shadow-md hover:bg-gradient-to-r hover:from-rose-300 hover:to-amber-200 transition-all duration-300 cursor-pointer flex items-center gap-2"
    >
      <span>Read a Story ☕️</span>
    </button>
  </div>

  {/* Centered Button for Mobile */}
  <div className="mt-2 flex justify-center md:hidden">
    <button
      onClick={() => setIsModalOpen(true)}
      className="bg-gradient-to-r from-rose-200 to-amber-100 text-gray-700 font-medium text-sm px-5 py-2 rounded-full border border-amber-200 shadow hover:shadow-md hover:from-rose-300 hover:to-amber-200 transition-all duration-300 flex items-center gap-2"
    >
      Read a Story ☕️
    </button>
  </div>
</header>



      {/* Background image with translucent text overlay */}
      <div className="w-screen h-[700px] overflow-hidden relative ">
        <img src={goodvibesonly} alt="Background" className="w-full h-full object-cover" />

        {/* Translucent text overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-8 rounded-xl">
          <div className="bg-white bg-opacity-40 backdrop-blur-sm px-8 py-6 rounded-lg">
            <h1 className="text-3xl md:text-4xl font-medium text-gray-800 tracking-tight text-center">
              What will you read today?

            </h1>

            <p className="mt-2 text-base md:text-lg text-gray-800 text-center">
              A cozy collection of short stories in English & German — ready when you are.
            </p>
          </div>
        </div>


      </div>

      <div className="bg-white/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
          <h2 className="text-3xl font-bold text-center mb-12 italic">Unpacking Childhood stories in German.</h2>
          <div className="bg-white/70 backdrop-blur-sm py-16">
            <div className="max-w-7xl mx-auto px-4">
              <div className="bg-white/80 p-4 mb-8 max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-12">
                  <div className="w-full md:w-1/4 md:ml-6">
                    <img src={Deepa} alt="Deepa" className="w-full h-auto object-cover aspect-square" />
                  </div>
                  <div className="w-full md:w-2/3">
                    <h3 className="text-lg font-semibold mb-3 italic">Hello there! Glad that you are here </h3>
                    <p className="text-gray-700 text-sm mb-2 font-light leading-relaxed">If you are an English speaking parent in Germany, you know how rare it is to find bilingual stories in English and German — the stories you loved growing up, and want to share with your child. </p>
                    <p className="text-gray-700 text-sm mb-2 font-light leading-relaxed">That’s why I created this little library: a cozy collection of short stories from our childhood, lovingly translated into German. So you can read together. Remember together.</p>
                    <p className="text-gray-700 text-sm mb-2 font-light leading-relaxed"> And gently grow your conversational German — one story at a time</p>
                    <p className="text-gray-700 text-sm mb-2 font-light leading-relaxed">Join me on this journey to recreate a memorable childhood.</p>
                  </div>
                </div>
              </div>

              <div className="w-full bg-white py-16 my-12">
                <div className="w-full max-w-4xl mx-auto px-4 text-center">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-serif italic font-semibold mb-3 text-gray-800">My Favorite Articles</h2>
                    <div className="flex justify-center mb-3">
                      <div className="w-16 border-t-2 border-gray-300"></div>
                    </div>
                    <p className="text-gray-600 font-serif max-w-2xl mx-auto text-sm">Every story here holds something familiar — a feeling, a memory, a lesson. Each one is chosen to support your connection — and child’s growth — through reading..</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[{ id: 1, image: pillars, title: "The Talking Birds", route: "/blog/talking-birds" },
                      { id: 2, image: luxurylife, title: "Story of the Hungry Fox and the Grapes", route: "/blog/hungry-fox-and-the-grapes" },
                      { id: 3, image: emptyaudience, title: "The Hare and the Tortoise", route: "/blog/the-hare-and-the-tortoise" },
                      { id: 4, image: car99, title: "The Elephant and the Ant", route: "/blog/the-elephant-and-the-ant" }
                    ].map(article => (
                      <div key={article.id} className="flex flex-col items-center">
                        <div className="w-full h-64 overflow-hidden mb-4">
                          <img src={article.image} alt={article.title} className="w-full h-full object-cover hover:opacity-90 transition-opacity duration-300" />
                        </div>
                        <div className="text-center">
                          <p className="uppercase text-xs font-medium text-gray-500 tracking-wider mb-2">Stories</p>
                          <h3 className="text-xl font-medium hover:text-orange-600 transition-colors">
                            <a href={article.route} className="text-gray-800 hover:text-orange-600">{article.title}</a>
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">{isLogin ? 'Sign In' : 'Create Account'}</h2>
          <p className="text-gray-600">{isLogin ? 'Welcome back!' : 'Start your journey with German stories'}</p>
        </div>

        {error && <div className="mb-4 p-2 bg-red-100 text-red-600 rounded">{error}</div>}
        {verificationMessage && <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">{verificationMessage}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" required className="mt-1 block w-full rounded-md border px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" required className="mt-1 block w-full rounded-md border px-3 py-2" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" required className="mt-1 block w-full rounded-md border px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          )}

          <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">
            {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
          </button>

          <p className="text-center text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button type="button" className="text-indigo-600 hover:text-indigo-800" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </form>
      </Modal>
    </div>
  );
};

export default LandingPage;
