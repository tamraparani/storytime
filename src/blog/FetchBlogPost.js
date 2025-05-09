import React, { useEffect, useState } from 'react';
import BlogPostTemplate from './BlogPostTemplate';
import { supabase } from '../supabaseClient';
import { useParams } from 'react-router-dom';

const FetchBlogPost = () => {
  const [blogPost, setBlogPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        console.log('Fetching blog post with slug:', slug);

        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }

        console.log('Fetched blog post data:', data);
        setBlogPost(data);
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [slug]);

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen">Error: {error}</div>;
  if (!blogPost) return <div className="flex justify-center items-center min-h-screen">Blog post not found</div>;

  console.log('Rendering blog post with ID:', blogPost.id, 'and likes:', blogPost.likes);

  return (
    <BlogPostTemplate
      id={blogPost.id}
      title={blogPost.title}
      author={blogPost.author}
      date={blogPost.date}
      heroQuote={blogPost.heroQuote}
      content={blogPost.content}
      tags={Array.isArray(blogPost.tags) ? blogPost.tags : []}
      likes={blogPost.likes || 0}
      featuredImage={{
        src: blogPost.image_url,
        alt: blogPost.image_alt || blogPost.title
      }}
    />
  );
};

export default FetchBlogPost;
