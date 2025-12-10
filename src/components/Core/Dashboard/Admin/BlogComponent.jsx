import React from "react";

const BlogComponent = ({ blogData }) => {
  if (!blogData) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 text-center">
        <p className="text-gray-500">Loading blog details...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Details Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <h3 className="text-lg font-bold text-gray-900">Details</h3>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="bg-white rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Title:</p>
                <p className="font-medium">{blogData.title || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600">Slug:</p>
                <p className="font-medium">{blogData.slug || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600">Author:</p>
                <p className="font-medium">{blogData.author || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600">Status:</p>
                <p className="font-medium">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                    blogData.status === 'published' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {blogData.status || "Draft"}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-gray-600">Category:</p>
                <p className="font-medium">{blogData.category || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600">View Count:</p>
                <p className="font-medium">{blogData.viewCount || 0}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-600">Tags:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {Array.isArray(blogData.tags) && blogData.tags.length > 0 ? (
                    blogData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500">No tags</span>
                  )}
                </div>
              </div>
              <div className="col-span-2">
                <p className="text-gray-600">Excerpt:</p>
                <p className="font-medium">{blogData.excerpt || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600">Created At:</p>
                <p className="font-medium">
                  {blogData.createdAt
                    ? new Date(blogData.createdAt).toLocaleString()
                    : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Updated At:</p>
                <p className="font-medium">
                  {blogData.updatedAt
                    ? new Date(blogData.updatedAt).toLocaleString()
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <h3 className="text-lg font-bold text-gray-900">Content</h3>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="bg-white rounded-lg p-4">
            <div className="prose max-w-none">
              <p className="whitespace-pre-wrap text-gray-700">
                {blogData.content || "No content available"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image Section */}
      {blogData.featuredImage && (
        <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
          <div className="border-b border-gray-200 pb-2 mb-4">
            <h3 className="text-lg font-bold text-gray-900">Featured Image</h3>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="w-full rounded-lg overflow-hidden">
              <img
                src={blogData.featuredImage}
                alt={blogData.title || "Blog Featured Image"}
                className="w-full h-auto object-contain max-h-[400px]"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogComponent;

