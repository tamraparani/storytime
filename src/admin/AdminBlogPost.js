import React, { useState, useEffect } from 'react';
import { insertBlogPost, updateBlogPost, getBlogPostBySlug } from './blogPostService';
import { useParams, useNavigate } from 'react-router-dom';

const AdminBlogPost = () => {

  const { slug } = useParams(); // Get slug from URL if in edit mode
  const navigate = useNavigate();
  const isEditMode = !!slug;

  const [blogData, setBlogData] = useState({
    slug: '',
    title: '',
    author: '',
    date: new Date().toISOString().split('T')[0],
    hero_quote: '',
    content: '',
    tags: '',
    image_url: '',
    image_alt: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', message: '' });

  useEffect(() => {
    const fetchPost = async () => {
      if (isEditMode) {
        setIsLoading(true);
        try {
          const postData = await getBlogPostBySlug(slug);
          if (postData) {
            // Convert tags array to comma-separated string for the form
            setBlogData({
              ...postData,
              tags: Array.isArray(postData.tags) ? postData.tags.join(', ') : postData.tags || ''
            });
          } else {
            setStatusMessage({
              type: 'error',
              message: 'Blog post not found'
            });
          }
        } catch (error) {
          setStatusMessage({
            type: 'error',
            message: `Error fetching blog post: ${error.message}`
          });
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchPost();
  }, [slug, isEditMode]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Convert image to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setBlogData(prev => ({
          ...prev,
          image_url: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert tags string to array
      const formattedData = {
        ...blogData,
        tags: blogData.tags.split(',').map(tag => tag.trim())
      };
      if (isEditMode) {
        // Update existing post
        await updateBlogPost(slug, formattedData);
        setStatusMessage({
          type: 'success',
          message: 'Blog post updated successfully!'
        });
      } else {
        // Create new post
        await insertBlogPost(formattedData);
        setStatusMessage({
          type: 'success',
          message: 'Blog post created successfully!'
        });

        // Reset form after successful creation
        if (!isEditMode) {
          setBlogData({
            slug: '',
            title: '',
            author: '',
            date: new Date().toISOString().split('T')[0],
            hero_quote: '',
            content: '',
            tags: '',
            image_url: '',
            image_alt: ''
          });
        }
      }
    } catch (error) {
      setStatusMessage({
        type: 'error',
        message: `Error ${isEditMode ? 'updating' : 'creating'} blog post: ${error.message}`
      });
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToListView = () => {
    navigate('/admin/blog/list'); // Navigate to blog list view
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{isEditMode ? 'Edit Blog Post' : 'Create New Blog Post'}</h1>
        <button
          onClick={navigateToListView}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          Back to List
        </button>
      </div>

      {statusMessage.message && (
        <div className={`p-4 mb-6 rounded ${
          statusMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {statusMessage.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Slug:</label>
          <input
            type="text"
            name="slug"
            value={blogData.slug}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
            disabled={isEditMode} // Can't change slug in edit mode
          />
          {isEditMode && (
            <p className="text-sm text-gray-500 mt-1">Slug cannot be changed when editing</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Title:</label>
          <input
            type="text"
            name="title"
            value={blogData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Author:</label>
          <input
            type="text"
            name="author"
            value={blogData.author}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Date:</label>
          <input
            type="date"
            name="date"
            value={blogData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Hero Quote:</label>
          <input
            type="text"
            name="hero_quote"
            value={blogData.hero_quote}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Content:</label>
          <textarea
            name="content"
            value={blogData.content}
            onChange={handleChange}
            className="w-full p-2 border rounded h-64"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Tags (comma-separated):</label>
          <input
            type="text"
            name="tags"
            value={blogData.tags}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="e.g., Stories, Life, Lessons"
          />
        </div>

        <div>
          <label className="block mb-1">Featured Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full p-2 border rounded"
          />
          {blogData.image_url && (
            <div className="mt-2">
              <img
                src={blogData.image_url}
                alt="Preview"
                className="max-w-xs h-auto"
              />
              <p className="text-sm text-gray-500 mt-1">
                {isEditMode ? "Upload a new image to replace the current one" : "Image preview"}
              </p>
            </div>
          )}
        </div>

        <div>
          <label className="block mb-1">Image Alt Text:</label>
          <input
            type="text"
            name="image_alt"
            value={blogData.image_alt}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required={!!blogData.image_url}
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : isEditMode ? 'Update Blog Post' : 'Create Blog Post'}
          </button>

          {!isEditMode && (
            <button
              type="reset"
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              disabled={isLoading}
            >
              Reset Form
            </button>
          )}
        </div>
      </form>
    </div>
  );
};


export default AdminBlogPost;
