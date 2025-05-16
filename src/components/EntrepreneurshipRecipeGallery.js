import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const EntrepreneurshipRecipeGallery = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [user, setUser] = useState(null);
  const POSTS_PER_PAGE = 8;
  const navigate = useNavigate();

  // Component mounted reference to prevent memory leaks
  const isMounted = React.useRef(true);

  // Set up mount/unmount tracking
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data, error: authError } = await supabase.auth.getSession();

        if (authError) throw authError;

        if (!data.session) {
          // User is not authenticated, redirect to landing page
          navigate('/');
          return;
        }

        if (isMounted.current) {
          setUser(data.session.user);
        }
      } catch (err) {
        console.error('Auth check error:', err);
        // Only redirect for auth errors, not network issues
        if (err.status === 401) {
          navigate('/');
        }
      }
    };

    checkAuth();

    // Subscribe to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        navigate('/');
      } else if (session && isMounted.current) {
        setUser(session.user);
      }
    });

    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, [navigate]);

  // Handle sign out
  const handleSignOut = async () => {
    const session = supabase.auth.getSession();

    if (!session) {
      console.warn("No active session — skipping sign-out.");
      return;
    }

    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Sign out error:", error.message);
    }
  };


  // Memoize the fetch function to prevent recreating it on each render
  const fetchBlogPosts = useCallback(async (pageNum = 0, retryCount = 0) => {
    if (!user || !isMounted.current) return; // Don't fetch if no user or component unmounted

    try {
      if (pageNum === 0 && isMounted.current) {
        setLoading(true);
        setError(null); // Clear any previous errors
      }

      // Use Supabase pagination with range
      const from = pageNum * POSTS_PER_PAGE;
      const to = from + POSTS_PER_PAGE - 1;

      // Optimize the query - select only necessary fields
      const { data, error, count } = await supabase
        .from('blog_posts')
        .select('slug, title, image_url, tags, created_at', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) throw error;

      if (!isMounted.current) return; // Don't update state if unmounted

      // Transform the blog posts - move this out of the critical path
      const formattedArticles = data.map((post, index) => ({
        id: from + index + 1,
        image: post.image_url,
        categories: post.tags || ['Stories'],
        title: post.title,
        route: `/blog/${post.slug}`,
        loading: "lazy"
      }));

      // Append new articles if loading more, otherwise replace
      if (pageNum === 0) {
        setArticles(formattedArticles);
      } else {
        setArticles(prev => [...prev, ...formattedArticles]);
      }

      // Check if we have more posts to load
      setHasMore(count > (pageNum + 1) * POSTS_PER_PAGE);
    } catch (err) {
      console.error('Error fetching blog posts:', err.message || err);

      if (!isMounted.current) return; // Don't update state if unmounted

      // Network-related errors might be temporary - retry a few times
      if (retryCount < 2 && (err.code === 'NETWORK_ERROR' || err.message?.includes('network'))) {
        console.log(`Retrying fetch (${retryCount + 1}/2)...`);
        setTimeout(() => fetchBlogPosts(pageNum, retryCount + 1), 1000);
        return;
      }

      setError('Failed to load articles. Please try again.');
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }, [user]);

  // Load data whenever user is available or page changes
  useEffect(() => {
    if (user) {
      // Reset to first page when returning to gallery
      setPage(0);
      fetchBlogPosts(0);
    }
  }, [fetchBlogPosts, user]);

  // Watch for page changes for infinite scrolling
  useEffect(() => {
    if (page > 0 && user) {
      fetchBlogPosts(page);
    }
  }, [page, fetchBlogPosts, user]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleRetry = () => {
    setPage(0);
    fetchBlogPosts(0);
  };

  // Use intersection observer for infinite scrolling
  const observerRef = React.useRef();
  const loadMoreRef = React.useCallback(node => {
    if (loading) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });

    if (node) observerRef.current.observe(node);
  }, [loading, hasMore]);

  // Display loading state while waiting for user
  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header with user info and sign out */}
      <div className="bg-white shadow-sm p-4 mb-6">
        <div className="max-w-7xl mx-auto flex justify-end items-center py-1 px-4">
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              Welcome, {user.user_metadata?.name || user.email}
            </div>
            <button
              onClick={handleSignOut}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md transition-colors text-sm font-medium"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {error && (
          <div className="text-red-600 text-center mb-6 p-4 bg-red-100 rounded flex flex-col items-center">
            <div>{error}</div>
            <button
              onClick={handleRetry}
              className="mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors text-sm font-medium"
            >
              Retry
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}

          {/* Loading placeholders - reduced number for faster initial render */}
          {loading && page === 0 && Array(4).fill().map((_, i) => (
            <ArticleSkeleton key={`skeleton-${i}`} />
          ))}
        </div>

        {/* Empty state */}
        {!loading && articles.length === 0 && !error && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No stories available at the moment.</p>
          </div>
        )}

        {/* Invisible load more trigger for intersection observer */}
        {hasMore && (
          <div ref={loadMoreRef} className="h-8 mt-4">
            {loading && page > 0 && (
              <div className="flex justify-center">
                <LoadingSpinner />
              </div>
            )}
          </div>
        )}

        {/* No more content message */}
        {!hasMore && articles.length > 0 && (
          <div className="text-center mt-8 text-gray-500">
            You've reached the end of the stories
          </div>
        )}
      </div>
    </div>
  );
};

// Extract components for better performance
const ArticleCard = React.memo(({ article }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105 hover:shadow-lg">
    <a href={article.route} className="block">
      <div className="h-48 overflow-hidden bg-gray-100">
        {article.image ? (
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover transition-opacity"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/placeholder-image.jpg';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-400">No image</span>
          </div>
        )}
      </div>
      <div className="p-1 bg-orange-200">
        <div className="flex flex-wrap text-xs uppercase tracking-wide text-gray-600">
          {article.categories && article.categories.map((category, idx) => (
            <span key={idx} className="mr-1">
              {idx > 0 && <span className="mx-1">·</span>}
              {category}
            </span>
          ))}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-center font-medium">
          <span className="text-gray-800 hover:text-orange-600">
            {article.title}
          </span>
        </h3>
      </div>
    </a>
  </div>
));

const ArticleSkeleton = () => (
  <div className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
    <div className="h-48 bg-gray-200"></div>
    <div className="p-1 bg-gray-100">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    </div>
    <div className="p-4">
      <div className="h-5 bg-gray-200 rounded"></div>
    </div>
  </div>
);

const LoadingSpinner = () => (
  <svg className="animate-spin h-6 w-6 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export default EntrepreneurshipRecipeGallery;
