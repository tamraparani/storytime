import React, { useState, useEffect } from 'react';
import { getAllBlogPosts, deleteBlogPost } from './blogPostService';
import { Link } from 'react-router-dom';

const BlogPostListing = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const data = await getAllBlogPosts();
      setPosts(data);
      setErrorMessage('');
    } catch (error) {
      console.error('Error fetching posts:', error);
      setErrorMessage('Failed to load blog posts. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (slug, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await deleteBlogPost(slug);
        setPosts(posts.filter(post => post.slug !== slug));
        setSuccessMessage(`Post "${title}" deleted successfully.`);

        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      } catch (error) {
        setErrorMessage(`Error deleting post: ${error.message}`);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Blog Posts</h1>
        <Link
          to="/admin/blog"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Create New Post
        </Link>
      </div>

      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-8">
          <p>Loading blog posts...</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-8">
          <p>No blog posts found. Create your first post!</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border text-left">Title</th>
                <th className="py-2 px-4 border text-left">Author</th>
                <th className="py-2 px-4 border text-left">Date</th>
                <th className="py-2 px-4 border text-left">Tags</th>
                <th className="py-2 px-4 border text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.slug} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border">
                    <Link
                      to={`/blog/${post.slug}`}
                      className="text-blue-600 hover:underline"
                      target="_blank"
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td className="py-2 px-4 border">{post.author}</td>
                  <td className="py-2 px-4 border">{post.date}</td>
                  <td className="py-2 px-4 border">
                    {Array.isArray(post.tags)
                      ? post.tags.join(', ')
                      : typeof post.tags === 'string'
                        ? post.tags
                        : ''}
                  </td>
                  <td className="py-2 px-4 border">
                    <div className="flex space-x-2">
                      <Link
                        to={`/admin/blog/edit/${post.slug}`}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(post.slug, post.title)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BlogPostListing;
