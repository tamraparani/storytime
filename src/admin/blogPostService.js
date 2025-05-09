// blogPostService.js
import { supabase } from '../supabaseClient';

// Create a new blog post
export const insertBlogPost = async (blogPost) => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([blogPost]);

    if (error) throw error;
    console.log('Blog post inserted successfully:', data);
    return data;
  } catch (error) {
    console.error('Error inserting blog post:', error);
    throw error;
  }
};

// Get a blog post by slug
export const getBlogPostBySlug = async (slug) => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    throw error;
  }
};

// Update an existing blog post
export const updateBlogPost = async (slug, blogPost) => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .update(blogPost)
      .eq('slug', slug);

    if (error) throw error;
    console.log('Blog post updated successfully:', data);
    return data;
  } catch (error) {
    console.error('Error updating blog post:', error);
    throw error;
  }
};

// Get all blog posts (for admin listing)
export const getAllBlogPosts = async () => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('date', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
};

// Delete a blog post
export const deleteBlogPost = async (slug) => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('slug', slug);

    if (error) throw error;
    console.log('Blog post deleted successfully:', data);
    return data;
  } catch (error) {
    console.error('Error deleting blog post:', error);
    throw error;
  }
};
