// PlaceholderImage.js
import React, { useState } from 'react';

const PlaceholderImage = ({ src, alt, placeholderSrc }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {isLoading && (
        <img
          src={placeholderSrc}
          alt={alt}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain' }}
        />
      )}
      <img
        src={src}
        alt={alt}
        style={{ display: isLoading ? 'none' : 'block', width: '100%', height: '100%', objectFit: 'contain' }}
        onLoad={handleImageLoad}
      />
    </div>
  );
};

export default PlaceholderImage;
