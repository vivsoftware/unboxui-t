import React, { useEffect, useState, useRef } from "react";
import { getStrapiMedia } from "../../../Utils/media";
import Link from "next/link";
import { useSelector } from "react-redux";
import SkeletonLoader from "../../Element/SkeletonLoader";
import { auth } from "../../../Config/firebase";
import Image from "next/image";
import { fetchAPI } from "../../../Utils/api";

const cameraCategory = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef(null);
  const [camera, setCamera] = useState([]);
  const [cobot, setCobot] = useState([]);

  useEffect(() => {
    document.documentElement.style.setProperty('--theme-color', '#0163d2');
  
    fetchAPI(`/cameras`, {
      populate: '*',
      pagination: {
        limit: -1,
      },
    }).then((res) => {
      setCamera(res.data);
    });

    fetchAPI(`/cobots`, {
      populate: '*',
      pagination: {
        limit: -1,
      },
    }).then((res) => {
      setCobot(res.data);
    });
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false); // Moved setIsLoading here to ensure it's set correctly.
    });

    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Autoplay was blocked:", error);
      });
    }

    return () => unsubscribe();
  }, [videoRef]);

  const { symbol, currencyValue } = useSelector((state) => state.CurrencyReducer);
  const numberWithCommas = (x) => {
    return x.toLocaleString("en-IN");
  };
  const formatPrice = (price) => {
    return `${numberWithCommas(price)}`;
  };

  const filteredProducts = (categoryName) => {
    return camera.filter(
      (product) =>
        cobot.attributes.camera.data?.attributes.category_name === categoryName
    );
  };

  return (
    <div className="container d-none d-xl-block d-md-block d-sm-none">
      {camera.map((el) => (
        <div key={el.id}>
          <h2 className="text-center mt-4 mb-3">
            {el.attributes.category_name}
          </h2>
          <div
            className="container"
            style={{
              boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
              backgroundColor: "#eee",
            }}
            
          >
            <div className="row">
              <div className="col-lg-3 col-md-3 col-sm-12">
                <Link
                  href={`/category/${camera[0]?.attributes.category.data.id}-${camera[0]?.attributes.category_name}`}
                >
                  <video
                    ref={videoRef}
                    autoPlay
                    muted   
                    loop
                    style={{
                      objectFit: "cover",
                      width: "300px",
                      height: "705px",
                      marginLeft: "-15px",
                    }}
                  >
                    <source
                      src={getStrapiMedia(el?.attributes.category_image)}
                      type="video/mp4"
                    />
                  </video>
                </Link>
              </div>
              <div className='col-lg-9 col-md-9 col-sm-12 mt-3'>
                <div className='row'>
                      <div className='col-lg-3 col-md-6 col-sm-12  mb-3 mt-3 categorizedProducts-card'>
                        <Link href={`/product/${el.attributes.product.data.id}-${el.attributes.product.data.attributes.product_slug}`}>
                          {isLoading ? (
                            <SkeletonLoader />
                          ) : (
                            <img src={getStrapiMedia(el.attributes.image)} style={{ width: '200px', height: '200px' }} className='camera-image' alt={el.attributes.product.data.attributes.name} />
                          )}
                          <h5 className='mt-1' style={{ color: 'black' }}>{el.attributes.product.data.attributes.product_name}</h5>
                          {user ? (
                            <h5 className='price-detail'>
                              {product?.attributes?.product_price === "0" ? (
                                <h5>For Price Please Enquire</h5>
                              ) : (
                                <h5>
                                  {symbol}{formatPrice(elattributes.product?.data.attributes?.product_price * currencyValue.toFixed(2))}
                                </h5>
                              )}
                            </h5>
                          ) : (
                            <Link href="/login">
                              <h5 className='price-detail' style={{ color: '#FF8400' }}>Please Login for Price</h5>
                            </Link>
                          )}
                        </Link>
                      </div>
             
                </div>
              </div>
            </div>
          </div>
        </div>
         ))}
    </div>
  );
};

export default cameraCategory;
