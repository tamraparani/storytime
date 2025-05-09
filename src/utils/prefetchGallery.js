import { supabase } from '../supabaseClient';


// Store prefetched data in module scope
let prefetchedData = null;
let prefetchPromise = null;

// Add cache for already loaded pages
let loadedPages = {};
let totalCount = 0;
const POSTS_PER_PAGE = 8;

// Helper function to optimize image URLs
const optimizeImageUrl = (url, width = 400) => {
  if (!url) return '/placeholder-image.jpg';

  if (url.includes('storage.googleapis.com') || url.includes('supabase.co/storage')) {
    return `${url}?width=${width}&quality=80`;
  }

  return url;
};

// Function to prefetch gallery data
export const prefetchGalleryData = () => {
  // Return existing promise if already fetching
  if (prefetchPromise) return prefetchPromise;

  // Return cached data if available
  if (prefetchedData) return Promise.resolve(prefetchedData);

  // Start new fetch
  prefetchPromise = supabase
    .from('blog_posts')
    .select('slug, title, image_url, tags, created_at', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(0, POSTS_PER_PAGE - 1)
    .then(({ data, error, count }) => {
      if (error) throw error;

      totalCount = count;

      // Transform the data
      const formattedData = {
        articles: data.map((post, index) => ({
          id: index + 1,
          image: post.image_url,
          imageOptimized: optimizeImageUrl(post.image_url),
          categories: post.tags || ['Stories'],
          title: post.title,
          route: `/blog/${post.slug}`,
        })),
        hasMore: count > POSTS_PER_PAGE,
        totalCount: count
      };

      // Store this page in our page cache
      loadedPages[0] = formattedData.articles;

      // Preload images
      data.forEach(post => {
        if (post.image_url) {
          const img = new Image();
          img.src = optimizeImageUrl(post.image_url);
        }
      });

      // Cache the result
      prefetchedData = formattedData;
      return formattedData;
    })
    .catch(err => {
      console.error('Error prefetching gallery data:', err);
      prefetchPromise = null; // Reset promise to allow retry
      throw err;
    });

  return prefetchPromise;
};

// Function to get prefetched data
export const getPrefetchedGalleryData = () => {
  return prefetchedData;
};

// New function to get all loaded pages
export const getAllLoadedArticles = () => {
  const allArticles = [];

  // Combine all loaded pages in order
  Object.keys(loadedPages)
    .sort((a, b) => parseInt(a) - parseInt(b))
    .forEach(pageNum => {
      allArticles.push(...loadedPages[pageNum]);
    });

  return {
    articles: allArticles,
    hasMore: allArticles.length < totalCount,
    totalCount
  };
};

// New function to cache a page of results
export const cachePageData = (pageNum, articles) => {
  loadedPages[pageNum] = articles;
};

// New function to check if we have a page cached
export const isPageCached = (pageNum) => {
  return !!loadedPages[pageNum];
};

// Get cached page data
export const getCachedPageData = (pageNum) => {
  return loadedPages[pageNum];
};

// Reset cache (useful when filters change)
export const resetCache = () => {
  loadedPages = {};
  prefetchedData = null;
  prefetchPromise = null;
  totalCount = 0;
};
