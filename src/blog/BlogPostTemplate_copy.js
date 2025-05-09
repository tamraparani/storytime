import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { supabase } from '../supabaseClient';

const BlogPostTemplate = ({
  id,
  title,
  author,
  date,
  heroQuote,
  content,
  tags = [],
  relatedBlogPost,
  featuredImage,
  likes = 0
}) => {
  const [likeCount, setLikeCount] = useState(likes);
  const [isLiked, setIsLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Check if user has already liked this post
  useEffect(() => {
    const checkIfLiked = () => {
      const likedPosts = JSON.parse(localStorage.getItem('likedBlogPosts') || '{}');
      setIsLiked(!!likedPosts[id]);
    };

    if (id) {
      checkIfLiked();
    }
  }, [id]);

  // Make sure the likeCount state is updated if the prop changes
  useEffect(() => {
    setLikeCount(likes);
  }, [likes]);

  const handleLikeToggle = async () => {
    // Don't process if there's no ID or if already processing
    if (!id || isProcessing) return;

    try {
      setIsProcessing(true);
      setIsAnimating(true);

      // Toggle like state
      const newIsLiked = !isLiked;
      setIsLiked(newIsLiked);

      // Update like count based on toggle action
      const newLikeCount = newIsLiked ? likeCount + 1 : likeCount - 1;
      setLikeCount(newLikeCount);

      console.log(`${newIsLiked ? 'Liking' : 'Unliking'} post with ID:`, id);
      console.log('Updating like count from', likeCount, 'to', newLikeCount);

      // Update likes in Supabase
      const { data, error } = await supabase
        .from('blog_posts')
        .update({ likes: newLikeCount })
        .eq('id', id)
        .select();

      if (error) {
        console.error('Supabase update error:', error);
        throw error;
      }

      console.log('Supabase update response:', data);

      // Update localStorage
      const likedPosts = JSON.parse(localStorage.getItem('likedBlogPosts') || '{}');

      if (newIsLiked) {
        // Adding like
        likedPosts[id] = true;
      } else {
        // Removing like
        delete likedPosts[id];
      }

      localStorage.setItem('likedBlogPosts', JSON.stringify(likedPosts));
      console.log(`Like status saved in localStorage: ${newIsLiked ? 'liked' : 'unliked'}`);

    } catch (error) {
      console.error('Error updating likes:', error);
      // Revert optimistic updates on error
      setIsLiked(!isLiked);
      setLikeCount(isLiked ? likeCount : likeCount - 1);
      alert('There was an error updating the like count. Please try again.');
    } finally {
      // Reset animation after a delay
      setTimeout(() => setIsAnimating(false), 1000);
      setIsProcessing(false);
    }
  };


  // Custom markdown components
  const components = {
    h1: ({node, ...props}) => <h1 className="text-3xl font-serif italic font-semibold mb-6 text-gray-800" {...props} />,
    h2: ({node, ...props}) => <h2 className="text-2xl font-serif italic font-semibold mt-8 mb-4 text-gray-700" {...props} />,
    strong: ({node, ...props}) => <strong className="font-bold text-gray-800" {...props} />,
    p: ({node, ...props}) => <p className="mb-6 text-gray-700 leading-relaxed font-serif" {...props} />,
    img: ({node, ...props}) => (
      <div className="my-8 flex justify-center">
        <img
          className="max-w-full rounded-lg shadow-md"
          alt={props.alt || "Diary image"}
          {...props}
        />
      </div>
    ),
    blockquote: ({node, ...props}) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 py-2 my-6 italic text-gray-600 font-serif" {...props} />
    )
  };

  console.log('Rendering BlogPostTemplate with id:', id, 'likes:', likes, 'likeCount state:', likeCount);

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <article className="bg-white rounded-lg shadow-sm p-8">
          {/* Featured Image */}
          {featuredImage && (
            <div className="mb-8 flex justify-center">
              <img
                src={featuredImage.src}
                alt={featuredImage.alt || title}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl font-serif italic font-semibold mb-4 text-center text-gray-800">{title}</h1>

          {/* Metadata */}
          <div className="flex flex-col items-center justify-center mb-8 text-center">
            <div className="mb-2">
              <span className="text-gray-600 font-serif italic">By {author}</span>
              <span className="mx-2 text-gray-400">♦</span>
              <span className="text-gray-600 font-serif italic">{date}</span>
            </div>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-serif"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Hero Quote */}
          {heroQuote && (
            <div className="mb-8 text-center">
              <blockquote className="font-serif italic text-lg text-gray-700 px-8">
                "{heroQuote}"
              </blockquote>
            </div>
          )}

          {/* Decorative Divider */}
          <div className="flex justify-center mb-8">
            <div className="w-16 border-t-2 border-gray-200"></div>
          </div>

          {/* Main Content */}
          <div className="prose max-w-none font-serif">
            <ReactMarkdown
              components={components}
            >
              {content}
            </ReactMarkdown>
          </div>

          {/* Like Button */}
          <div className="flex justify-center mt-8">
            <button
              onClick={handleLikeToggle}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                isLiked
                  ? 'bg-pink-100 text-pink-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              disabled={isProcessing}
              aria-label={isLiked ? "Unlike this post" : "Like this post"}
              title={isLiked ? "Click to unlike" : "Click to like"}
            >
              <Heart
                className={`${isAnimating ? 'scale-125' : 'scale-100'} transition-transform ${
                  isLiked ? 'fill-pink-600 text-pink-600' : 'fill-transparent'
                }`}
                size={20}
              />
              <span className="font-serif">
                {isProcessing ? 'Updating...' : `${likeCount} ${likeCount === 1 ? 'Like' : 'Likes'}`}
              </span>
            </button>
          </div>

          {/* Decorative Divider */}
          <div className="flex justify-center my-8">
            <div className="w-16 border-t-2 border-gray-200"></div>
          </div>

          {/* Related Blog Post Link */}
          {relatedBlogPost && (
            <div className="mt-8 text-center bg-gray-50 p-6 rounded-lg border border-gray-100">
              <h3 className="text-xl font-serif italic font-semibold mb-4 text-gray-700">
                You Might Also Enjoy
              </h3>
              <Link
                to={`/diary/${relatedBlogPost.slug}`}
                className="inline-block bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-serif"
              >
                {relatedBlogPost.title}
              </Link>
            </div>
          )}
        </article>
      </div>
    </div>
  );
};

export default BlogPostTemplate;
