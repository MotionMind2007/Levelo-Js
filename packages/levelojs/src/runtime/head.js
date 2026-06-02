// src/runtime/head.js

/**
 * Updates the document head metadata.
 * @param {Object} options 
 * @param {string} options.title 
 * @param {string} options.description 
 */
export function head({ title, description }) {
  // Update Title
  if (title) {
    document.title = title;
  }

  // Update or Create Meta Description
  let metaDescription = document.querySelector('meta[name="description"]');
  
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    document.head.appendChild(metaDescription);
  }
  
  if (description) {
    metaDescription.content = description;
  }
}
