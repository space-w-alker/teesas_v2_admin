import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Headers from '../../../components/common/Headers';
import Headcomponent from '../../../components/common/Headcomponent';
import Custombutton from '../../../components/common/Custombutton';
import SuccessModal from '../../../components/common/SuccessModal';
import { TailSpin } from "react-loader-spinner";
import {
  createBlogAsync,
  createBlog,
  createBlogResponse,
  updateBlogAsync,
  updateBlog,
  updateBlogResponse,
  getBlogByIdAsync,
  getBlogById,
  getBlogByIdResponse
} from '../../../apis/slices/blogSlice';

const AddBlog = ({ isOpen }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const isEditMode = !!id;

  const { isLoading: createLoading } = useSelector(createBlogResponse);
  const { isLoading: updateLoading } = useSelector(updateBlogResponse);
  const { isLoading: fetchLoading, response: blogResponse } = useSelector(getBlogByIdResponse);

  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    slug: '',
    excerpt: '',
    featuredImage: null,
    author: '',
    status: 'draft',
    tags: '',
    category: ''
  });
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [errors, setErrors] = useState({
    title: '',
    content: '',
    slug: '',
    excerpt: '',
    author: '',
    status: '',
    general: ''
  });

  useEffect(() => {
    if (isEditMode) {
      setLoading(true);
      dispatch(getBlogById({ isLoading: true }));

      getBlogByIdAsync({
        dispatch,
        blogId: id,
        callbackFn: (res) => {
          setLoading(false);
          if (res?.data?.status === 200) {
            const blog = res.data.data;
            if (blog) {
              setFormData({
                title: blog.title || '',
                content: blog.content || '',
                slug: blog.slug || '',
                excerpt: blog.excerpt || '',
                featuredImage: null,
                author: blog.author || '',
                status: blog.status || 'draft',
                tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : blog.tags || '',
                category: blog.category || ''
              });
              setCurrentImageUrl(blog.featuredImage || '');
            } else {
              setErrors(prev => ({
                ...prev,
                general: "Blog not found"
              }));
            }
          } else {
            setErrors(prev => ({
              ...prev,
              general: res?.data?.message || "Failed to fetch blog details"
            }));
          }
        }
      });
    }
  }, [isEditMode, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      featuredImage: e.target.files[0]
    }));

    if (errors.featuredImage) {
      setErrors(prev => ({
        ...prev,
        featuredImage: ''
      }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      title: '',
      content: '',
      slug: '',
      excerpt: '',
      author: '',
      status: '',
      general: ''
    };

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
      isValid = false;
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
      isValid = false;
    }

    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug is required';
      isValid = false;
    }

    if (!formData.excerpt.trim()) {
      newErrors.excerpt = 'Excerpt is required';
      isValid = false;
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
      isValid = false;
    }

    if (!isEditMode && !formData.featuredImage) {
      newErrors.featuredImage = 'Please upload a featured image';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Prepare tags array
    const tagsArray = formData.tags
      ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      : [];

    // Create FormData for file upload
    const data = new FormData();
    data.append('title', formData.title);
    data.append('content', formData.content);
    data.append('slug', formData.slug);
    data.append('excerpt', formData.excerpt);
    data.append('author', formData.author);
    data.append('status', formData.status);
    data.append('category', formData.category);
    data.append('tags', JSON.stringify(tagsArray));

    if (formData.featuredImage) {
      data.append('featuredImage', formData.featuredImage);
    }

    if (isEditMode) {
      dispatch(updateBlog({ isLoading: true }));

      updateBlogAsync({
        dispatch,
        formData: data,
        blogId: id,
        callbackFn: (res) => {
          setLoading(false);
          if (res?.data?.status === 200) {
            setSuccessMessage("Blog updated successfully");
            setShowSuccess(true);
          } else {
            setErrors(prev => ({
              ...prev,
              general: res?.data?.message || "Failed to update blog"
            }));
          }
        }
      });
    } else {
      dispatch(createBlog({ isLoading: true }));

      createBlogAsync({
        dispatch,
        formData: data,
        callbackFn: (res) => {
          setLoading(false);
          if (res?.data?.status === 200) {
            setSuccessMessage("Blog created successfully");
            setShowSuccess(true);
          } else {
            setErrors(prev => ({
              ...prev,
              general: res?.data?.message || "Failed to create blog"
            }));
          }
        }
      });
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    navigate('/blogs');
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      {loading && (
        <div style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
        }}>
          <TailSpin color="green" radius={5} />
        </div>
      )}

      <Headers
        value1="Home"
        value2="Blogs"
        value3={isEditMode ? "Edit Blog" : "Add Blog"}
      />

      <div className="mt-6 flex gap-6">
        <div className="flex-[2] bg-white rounded-xl shadow-sm p-6">
          <Headcomponent value={isEditMode ? "Edit Blog" : "Add Blog"} showSearch={false} />
          <div className="border-b border-gray-200 mb-6"></div>

          {errors.general && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Blog Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`w-full p-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]`}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  className={`w-full p-2 border ${errors.slug ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]`}
                  placeholder="blog-post-url-slug"
                />
                {errors.slug && (
                  <p className="mt-1 text-sm text-red-600">{errors.slug}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt *</label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  className={`w-full p-2 border ${errors.excerpt ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]`}
                  rows="3"
                  placeholder="Short description of the blog post"
                ></textarea>
                {errors.excerpt && (
                  <p className="mt-1 text-sm text-red-600">{errors.excerpt}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  className={`w-full p-2 border ${errors.content ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]`}
                  rows="10"
                ></textarea>
                {errors.content && (
                  <p className="mt-1 text-sm text-red-600">{errors.content}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Author *</label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    className={`w-full p-2 border ${errors.author ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]`}
                  />
                  {errors.author && (
                    <p className="mt-1 text-sm text-red-600">{errors.author}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className={`w-full p-2 border ${errors.status ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]`}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                  {errors.status && (
                    <p className="mt-1 text-sm text-red-600">{errors.status}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                  placeholder="e.g., Technology, Education"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                  placeholder="tag1, tag2, tag3"
                />
                <p className="mt-1 text-xs text-gray-500">Separate tags with commas</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isEditMode ? "Update Featured Image (Optional)" : "Featured Image *"}
                </label>
                <input
                  type="file"
                  name="featuredImage"
                  onChange={handleFileChange}
                  className={`w-full p-2 border ${errors.featuredImage ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]`}
                  accept="image/*"
                />
                {errors.featuredImage && (
                  <p className="mt-1 text-sm text-red-600">{errors.featuredImage}</p>
                )}

                {isEditMode && currentImageUrl && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 mb-2">Current Image:</p>
                    <img
                      src={currentImageUrl}
                      alt="Current featured"
                      className="w-full max-h-[200px] object-contain border rounded"
                    />
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>

        <div className="flex-1">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Summary</h2>
            <div className="bg-[#E9FDEE] rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Title:</span>
                  <span className="font-medium">{formData.title || '_____'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Slug:</span>
                  <span className="font-medium">{formData.slug || '_____'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Author:</span>
                  <span className="font-medium">{formData.author || '_____'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium capitalize">{formData.status || '_____'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">{formData.category || '_____'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tags:</span>
                  <span className="font-medium">{formData.tags || '_____'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Image:</span>
                  <span className="font-medium">
                    {formData.featuredImage?.name || (isEditMode && currentImageUrl ? 'Current image' : '_____')}
                  </span>
                </div>
              </div>
            </div>
            <Custombutton
              value={isEditMode ? "Update Blog" : "Create Blog"}
              onClick={handleSubmit}
              textcolor="text-white"
              backgroundcolor="bg-[#27AE60]"
              extraStyle="w-full mt-8 hover:bg-[#219652]"
            />
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccess}
        onClose={handleSuccessClose}
        type="success"
        title={isEditMode ? "Blog Updated Successfully" : "Blog Created Successfully"}
        message={successMessage}
        buttonText="Close"
        onConfirm={handleSuccessClose}
      />
    </div>
  );
};

export default AddBlog;

