import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';

const ProductVideos = ({ singleProduct }) => {
  const [activeVideoId, setActiveVideoId] = useState(null);

  useEffect(() => {
    if (singleProduct) {
      const videoId = getVideoIdFromLink(singleProduct.attributes.Product_Video1);
      setActiveVideoId(videoId);
    }
  }, [singleProduct]);

  const getVideoIdFromLink = (link) => {
    if (typeof link !== 'string') {
      return null;
    }
    const regex = /(?:\/|%3D|v=|vi=)([0-9A-Za-z_-]{11})(?:[%#?&]|$)/;
    const match = link.match(regex);
    if (match) {
      return match[1];
    }
    return null;
  };

  const handleVideoClick = (videoId) => {
    setActiveVideoId(videoId);
  };

  const renderVideo = () => {
    if (activeVideoId) {
      const videoOpts = {
        height: '390',
        width: '640',
        playerVars: {
          modestbranding: 1, // Disable YouTube logo
          rel: 0,
          loop: 1, // Disable related videos
          autoplay: 0,
        },
      };

      if (window.innerWidth >= 1200) {
        videoOpts.height = '390';
        videoOpts.width = '540';
      } else if (window.innerWidth < 1024) {
        videoOpts.height = '140';
        videoOpts.width = '220';
      } else if (window.innerWidth < 768) {
        videoOpts.height = '140';
        videoOpts.width = '220';
      } else if (window.innerWidth < 480) {
        videoOpts.height = '140';
        videoOpts.width = '200';
      }

      return <YouTube videoId={activeVideoId} opts={videoOpts} />;
    }

    return null;
  };

  const renderVideoThumbnail = (link) => {
    const videoId = getVideoIdFromLink(link);
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/default.jpg`;
    return (
      <div
        key={videoId}
        className={videoId === activeVideoId ? 'active' : ''}
        onClick={() => handleVideoClick(videoId)}
      >
        <img src={thumbnailUrl} alt="video thumbnail" style={{ width: '100%' }} />
      </div>
    );
  };

  const videoLinks = [
    singleProduct.attributes.Product_Video1,
    singleProduct.attributes.Product_Video2,
    singleProduct.attributes.Product_Video3,
    singleProduct.attributes.Product_Video4,
  ].filter(Boolean);

  if (videoLinks.length === 0) {
    return null; // Don't render anything if no videos
  }

  return (
    <>
      <div className="d-none d-xl-block d-md-none">
       <div className="container-fluid">
           <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
             <h3 className="mb-4">Product Videos</h3>
             <div className="container-fluid" style={{ border: '1px solid gray', padding: '10px' }}>
               <div className="row">
                 <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                  <div className="video-wrapper">{renderVideo()}</div>
                 </div>
                 {videoLinks.length > 0 && (
                  <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                    <div className="card">
                      <div className="row mt-5 mb-1">
                        {videoLinks.map((link) => (
                          <div className="col-4 mb-2" key={link}>
                            {renderVideoThumbnail(link)}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {videoLinks.length === 0 && (
                  <div className="col-12 text-center mt-3">No videos available</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-block d-xl-none d-md-block">
      <div className="container">
           <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
             <h3 className="text-center mb-2">Product Videos</h3>
             <div className="container-fluid" style={{ border: '1px solid gray', padding: '10px' }}>
               <div className="row">
                 <div className="col-12">
                   <div className="video-wrapper">{renderVideo()}</div>
                 </div>
                 {videoLinks.length > 0 && (
                  <div className="col-12">
                    <div className="card">
                      <div className="row mt-5 mb-1">
                        {videoLinks.map((link) => (
                          <div className="col-4 mb-2" key={link}>
                            {renderVideoThumbnail(link)}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {videoLinks.length === 0 && (
                  <div className="col-12 text-center mt-3">No videos available</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductVideos;