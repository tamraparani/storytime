import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient';

const EntrepreneurshipRecipeGallery = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const POSTS_PER_PAGE = 8;

  // Memoize the fetch function to prevent recreating it on each render
  const fetchBlogPosts = useCallback(async (pageNum = 0) => {
    try {
      if (pageNum === 0) setLoading(true);

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
      setError(null);
    } catch (err) {
      console.error('Error fetching blog posts:', err);
      setError('Failed to load articles. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial data load
  useEffect(() => {
    fetchBlogPosts(0);
  }, [fetchBlogPosts]);

  // Watch for page changes and fetch more when it changes
  useEffect(() => {
    if (page > 0) {
      fetchBlogPosts(page);
    }
  }, [page, fetchBlogPosts]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
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

  return (
    <div className="bg-gray-50 p-6">
      {error && (
        <div className="text-red-600 text-center mb-6 p-4 bg-red-100 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}

        {/* Loading placeholders - reduced number for faster initial render */}
        {loading && page === 0 && Array(2).fill().map((_, i) => (
          <ArticleSkeleton key={`skeleton-${i}`} />
        ))}
      </div>

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
