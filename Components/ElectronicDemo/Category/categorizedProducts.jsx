import React, { useEffect, useState, useRef } from "react";
import { getStrapiMedia } from "../../../Utils/media";
import Link from "next/link";
import { useSelector } from "react-redux";
import SkeletonLoader from "../../Element/SkeletonLoader";
import { auth } from "../../../Config/firebase";
import Image from "next/image";
import { fetchAPI } from "../../../Utils/api";

const CategorizedProducts = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef(null);
  const [cobot, setCobot] = useState([]);
  const [sensor, setSensor] = useState([]);
  const [gripper, setGripper] = useState([]);
  const [safety, setSafety] = useState([]);
  const [industrialRobot, setIndustrialRobot] = useState([]);
  const [mobileRobot, setMobileRobot] = useState([]);
  const [camera, setCamera] = useState([]);

  useEffect(() => {
    // document.documentElement.style.setProperty("--theme-color", "#0163d2");

    fetchAPI(`/cobots`, {
      populate: "*",
      pagination: {
        limit: -1,
      },
    }).then((res) => {
      setCobot(res);
    });

    fetchAPI(`/sensors`, {
      populate: "*",
      pagination: {
        limit: -1,
      },
    }).then((res) => {
      setSensor(res);
    });

    fetchAPI(`/grippers`, {
      populate: "*",
      pagination: {
        limit: -1,
      },
    }).then((res) => {
      setGripper(res);
    });

    fetchAPI(`/safeties`, {
      populate: "*",
      pagination: {
        limit: -1,
      },
    }).then((res) => {
      setSafety(res);
    });

    fetchAPI(`/industrial-robots`, {
      populate: "*",
      pagination: {
        limit: -1,
      },
    }).then((res) => {
      setIndustrialRobot(res);
    });

    fetchAPI(`/mobile-robots`, {
      populate: "*",
      pagination: {
        limit: -1,
      },
    }).then((res) => {
      setMobileRobot(res);
    });

    fetchAPI(`/cameras`, {
      populate: "*",
      pagination: {
        limit: -1,
      },
    }).then((res) => {
      setCamera(res);
    });
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false);
    });

    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Autoplay was blocked:", error);
      });
    }

    return () => unsubscribe();
  }, [videoRef]);

  const { symbol, currencyValue } = useSelector(
    (state) => state.CurrencyReducer
  );
  const numberWithCommas = (x) => {
    return x.toLocaleString("en-IN");
  };

  // Define a function to format the price
  const formatPrice = (price) => {
    return `${numberWithCommas(price)}`;
  };
  

  return (
    <>
      {/* /////Cobots///// */}
      <h2 className="text-center mb-3">Cobots</h2>
      <div className="container d-none d-xl-block d-md-block d-sm-none" style={{
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        backgroundColor: "#eee",
      }}>
        <div className="row">
          {cobot.data && (
            <div className="col-lg-3 col-md-3 col-sm-12">
              <Link
                href={`/category/${cobot.data[0]?.attributes.category?.data?.id}-${cobot.data[0]?.attributes.category_name}`}
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
                    src={getStrapiMedia(cobot.data[0].attributes.category_banner)}
                    type="video/mp4"
                  />
                </video>
              </Link>
            </div>
          )}
          <div className="col-lg-9 col-md-9 col-sm-12 ">
            <div className="row">
              {cobot.data?.map((el) => (
                <div className="col-lg-3 col-md-6 col-sm-12  mb-3 mt-3 categorizedProducts-card" key={el.id}>
                  <Link
                    href={`/product/${el.attributes.product.data.id}-${el.attributes.product.data.attributes.product_slug}`}
                  >
                    {isLoading ? (
                      <SkeletonLoader />
                    ) : (
                      <img
                        src={getStrapiMedia(el.attributes.image)}
                        style={{ width: "200px", height: "200px", borderBottom:'1px solid black' }}
                        className="sensor-image"
                        alt={el.attributes.product.data.attributes.name}
                      />
                    )}
                    <h5 className="mt-1" style={{ color: "black" }}>
                      {el.attributes.product.data.attributes.product_name}
                    </h5>
                    {user ? (
                      <h5 className="price-detail">
                        {el.attributes.product.data.attributes.product_price ===
                          "0" ? (
                          <h5>For Price Please Enquire</h5>
                        ) : (
                          <h5>
                            {symbol}
                            {formatPrice(
                              el.attributes.product.data.attributes
                                .product_price * currencyValue.toFixed(2)
                            )}
                          </h5>
                        )}
                      </h5>
                    ) : (
                      <Link href="/login">
                        <h5
                          className="price-detail"
                          style={{ color: "#FF8400" }}
                        >
                          Please Login for Price
                        </h5>
                      </Link>
                    )}
                  </Link>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
      <div className="container d-block d-xl-none d-md-none d-sm-block" >
        <div className="row"style={{
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        backgroundColor: "#eee",
        marginLeft:'5px',
        marginRight:'5px',
      }}>
          {cobot.data && (
            <div  className="col-12" style={{padding:'0'}}>
              <Link
                href={`/category/${cobot.data[0]?.attributes.category?.data?.id}-${cobot.data[0]?.attributes.category_name}`}
              >
                <img
                  src={getStrapiMedia(cobot.data[0].attributes.mobile_banner)}
                  style={{ objectFit:'cover', width:'100%'}}
                  alt="Cobots"
                />
              </Link>
            </div>
          )}
          {/* <div className="col-sm- "> */}
          <div className="row">
            {cobot.data?.map((el) => (
              <div className='col-5 mb-3 mt-3' style={{ backgroundColor: 'white', marginLeft: '22px' }} key={el.id}>
                <Link
                  href={`/product/${el.attributes.product.data.id}-${el.attributes.product.data.attributes.product_slug}`}
                >
                  {isLoading ? (
                    <SkeletonLoader />
                  ) : (
                    <img
                      src={getStrapiMedia(el.attributes.image)}
                      style={{ width: "100px", height: "100px",borderBottom: '1px solid black' }}
                      className="sensor-image"
                      alt={el.attributes.product.data.attributes.name}
                    />
                  )}
                  <h5 className="mt-1" style={{ color: "black" }}>
                    {el.attributes.product.data.attributes.product_name}
                  </h5>
                  {user ? (
                    <h5 className="price-detail">
                      {el.attributes.product.data.attributes.product_price ===
                        "0" ? (
                        <h5>For Price Please Enquire</h5>
                      ) : (
                        <h5>
                          {symbol}
                          {formatPrice(
                            el.attributes.product.data.attributes
                              .product_price * currencyValue.toFixed(2)
                          )}
                        </h5>
                      )}
                    </h5>
                  ) : (
                    <Link href="/login">
                      <h5
                        className="price-detail"
                        style={{ color: "#FF8400" }}
                      >
                        Please Login for Price
                      </h5>
                    </Link>
                  )}
                </Link>
              </div>
            ))}
          </div>
          {/* </div> */}

        </div>

      </div>
      {/* /////sensors///// */}
      <h2 className="text-center mb-3 mt-5">Sensors</h2>
      <div className="container d-none d-xl-block d-md-block d-sm-none" style={{
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        backgroundColor: "#eee",
      }}>
        <div className="row">
          {sensor.data && (
            <div className="col-lg-3 col-md-3 col-sm-12">
              <Link
                href={`/category/${sensor.data[0]?.attributes.category?.data?.id}-${sensor.data[0]?.attributes.category_name}`}
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
                    src={getStrapiMedia(sensor.data[0].attributes.category_banner)}
                    type="video/mp4"
                  />
                </video>
              </Link>
            </div>
          )}
          <div className="col-lg-9 col-md-9 col-sm-12 ">
            <div className="row">
              {sensor.data?.map((el) => (
                <div className="col-lg-3 col-md-6 col-sm-12  mb-3 mt-3 categorizedProducts-card" key={el.id}>
                  <Link
                    href={`/product/${el.attributes.product.data.id}-${el.attributes.product.data.attributes.product_slug}`}
                  >
                    {isLoading ? (
                      <SkeletonLoader />
                    ) : (
                      <img
                        src={getStrapiMedia(el.attributes.image)}
                        style={{ width: "200px", height: "200px" }}
                        className="camera-image"
                        alt={el.attributes.product.data.attributes.name}
                      />
                    )}
                    <h5 className="mt-1" style={{ color: "black" }}>
                      {el.attributes.product.data.attributes.product_name}
                    </h5>
                    {user ? (
                      <h5 className="price-detail">
                        {el.attributes.product.data.attributes.product_price ===
                          "0" ? (
                          <h5>For Price Please Enquire</h5>
                        ) : (
                          <h5>
                            {symbol}
                            {formatPrice(
                              el.attributes.product.data.attributes
                                .product_price * currencyValue.toFixed(2)
                            )}
                          </h5>
                        )}
                      </h5>
                    ) : (
                      <Link href="/login">
                        <h5
                          className="price-detail"
                          style={{ color: "#FF8400" }}
                        >
                          Please Login for Price
                        </h5>
                      </Link>
                    )}
                  </Link>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
      <div className="container d-block d-xl-none d-md-none d-sm-block">
        <div className="row" style={{
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        backgroundColor: "#eee",
        marginLeft:'5px',
        marginRight:'5px',
      }}>
          {sensor.data && (
            <div  className="col-12" style={{padding:'0'}}>
              <Link
                href={`/category/${sensor.data[0]?.attributes.category?.data?.id}-${sensor.data[0]?.attributes.category_name}`}
              >

                <img
                  src={getStrapiMedia(sensor.data[0].attributes.mobile_banner)}
                  style={{ objectFit:'cover', width: '100%' }}
                  alt="Sensors"
                />

              </Link>
            </div>
          )}
          {/* <div className="col-sm- "> */}
          <div className="row">
            {sensor.data?.map((el) => (
              <div className='col-5 mb-3 mt-3' style={{ backgroundColor: 'white', marginLeft: '22px' }} key={el.id}>
                <Link
                  href={`/product/${el.attributes.product.data.id}-${el.attributes.product.data.attributes.product_slug}`}
                >
                  {isLoading ? (
                    <SkeletonLoader />
                  ) : (
                    <img
                      src={getStrapiMedia(el.attributes.image)}
                      style={{ width: "100px", height: "100px",borderBottom: '1px solid black' }}
                      className="sensor-image"
                      alt={el.attributes.product.data.attributes.name}
                    />
                  )}
                  <h5 className="mt-1" style={{ color: "black" }}>
                    {el.attributes.product.data.attributes.product_name}
                  </h5>
                  {user ? (
                    <h5 className="price-detail">
                      {el.attributes.product.data.attributes.product_price ===
                        "0" ? (
                        <h5>For Price Please Enquire</h5>
                      ) : (
                        <h5>
                          {symbol}
                          {formatPrice(
                            el.attributes.product.data.attributes
                              .product_price * currencyValue.toFixed(2)
                          )}
                        </h5>
                      )}
                    </h5>
                  ) : (
                    <Link href="/login">
                      <h5
                        className="price-detail"
                        style={{ color: "#FF8400" }}
                      >
                        Please Login for Price
                      </h5>
                    </Link>
                  )}
                </Link>
              </div>
            ))}
          </div>
          {/* </div> */}

        </div>

      </div>
      {/* /////Grippers///// */}
      <h2 className="text-center mb-3 mt-5">Grippers</h2>
      <div className="container d-none d-xl-block d-md-block d-sm-none" style={{
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        backgroundColor: "#eee",
      }}>
        <div className="row">
          {gripper.data && (
            <div className="col-lg-3 col-md-3 col-sm-12">
              <Link
                href={`/category/${gripper.data[0]?.attributes.category?.data?.id}-${gripper.data[0]?.attributes.category_name}`}
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
                    src={getStrapiMedia(gripper.data[0].attributes.category_banner)}
                    type="video/mp4"
                  />
                </video>
              </Link>
            </div>
          )}
          <div className="col-lg-9 col-md-9 col-sm-12 ">
            <div className="row">
              {gripper.data?.map((el) => (
                <div className="col-lg-3 col-md-6 col-sm-12  mb-3 mt-3 categorizedProducts-card" key={el.id}>
                  <Link
                    href={`/product/${el.attributes.product.data.id}-${el.attributes.product.data.attributes.product_slug}`}
                  >
                    {isLoading ? (
                      <SkeletonLoader />
                    ) : (
                      <img
                        src={getStrapiMedia(el.attributes.image)}
                        style={{ width: "200px", height: "200px" }}
                        className="camera-image"
                        alt={el.attributes.product.data.attributes.name}
                      />
                    )}
                    <h5 className="mt-1" style={{ color: "black" }}>
                      {el.attributes.product.data.attributes.product_name}
                    </h5>
                    {user ? (
                      <h5 className="price-detail">
                        {el.attributes.product.data.attributes.product_price ===
                          "0" ? (
                          <h5>For Price Please Enquire</h5>
                        ) : (
                          <h5>
                            {symbol}
                            {formatPrice(
                              el.attributes.product.data.attributes
                                .product_price * currencyValue.toFixed(2)
                            )}
                          </h5>
                        )}
                      </h5>
                    ) : (
                      <Link href="/login">
                        <h5
                          className="price-detail"
                          style={{ color: "#FF8400" }}
                        >
                          Please Login for Price
                        </h5>
                      </Link>
                    )}
                  </Link>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
      <div className="container d-block d-xl-none d-md-none d-sm-block" >
        <div className="row" style={{
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        backgroundColor: "#eee",
        marginLeft:'5px',
        marginRight:'5px',
      }}>
          {gripper.data && (
            <div  className="col-12" style={{padding:'0'}}>
              <Link
                href={`/category/${gripper.data[0]?.attributes.category?.data?.id}-${gripper.data[0]?.attributes.category_name}`}
              >
                <img
                  src={getStrapiMedia(gripper.data[0].attributes.mobile_banner)}
                  style={{ objectFit:'cover', width: '100%' }}
                  alt="Grippers"
                />
              </Link>
            </div>
          )}
          {/* <div className="col-sm- "> */}
          <div className="row">
            {gripper.data?.map((el) => (
              <div className='col-5 mb-3 mt-3' style={{ backgroundColor: 'white', marginLeft: '22px' }} key={el.id}>
                <Link
                  href={`/product/${el.attributes.product.data.id}-${el.attributes.product.data.attributes.product_slug}`}
                >
                  {isLoading ? (
                    <SkeletonLoader />
                  ) : (
                    <img
                      src={getStrapiMedia(el.attributes.image)}
                      style={{ width: "100px", height: "100px",borderBottom: '1px solid black' }}
                      className="sensor-image"
                      alt={el.attributes.product.data.attributes.name}
                    />
                  )}
                  <h5 className="mt-1" style={{ color: "black" }}>
                    {el.attributes.product.data.attributes.product_name}
                  </h5>
                  {user ? (
                    <h5 className="price-detail">
                      {el.attributes.product.data.attributes.product_price ===
                        "0" ? (
                        <h5>For Price Please Enquire</h5>
                      ) : (
                        <h5>
                          {symbol}
                          {formatPrice(
                            el.attributes.product.data.attributes
                              .product_price * currencyValue.toFixed(2)
                          )}
                        </h5>
                      )}
                    </h5>
                  ) : (
                    <Link href="/login">
                      <h5
                        className="price-detail"
                        style={{ color: "#FF8400" }}
                      >
                        Please Login for Price
                      </h5>
                    </Link>
                  )}
                </Link>
              </div>
            ))}
          </div>
          {/* </div> */}

        </div>

      </div>
      {/* /////Safety///// */}
      <h2 className="text-center mb-3 mt-5">Safety</h2>
      <div className="container d-none d-xl-block d-md-block d-sm-none" style={{
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        backgroundColor: "#eee",
      }}>
        <div className="row">
          {safety.data && (
            <div className="col-lg-3 col-md-3 col-sm-12">
              <Link
                href={`/category/${safety.data[0]?.attributes.category?.data?.id}-${safety.data[0]?.attributes.category_name}`}
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
                    src={getStrapiMedia(safety.data[0].attributes.category_banner)}
                    type="video/mp4"
                  />
                </video>
              </Link>
            </div>
          )}
          <div className="col-lg-9 col-md-9 col-sm-12 ">
            <div className="row">
              {safety.data?.map((el) => (
                <div className="col-lg-3 col-md-6 col-sm-12  mb-3 mt-3 categorizedProducts-card" key={el.id}>
                  <Link
                    href={`/product/${el.attributes.product.data.id}-${el.attributes.product.data.attributes.product_slug}`}
                  >
                    {isLoading ? (
                      <SkeletonLoader />
                    ) : (
                      <img
                        src={getStrapiMedia(el.attributes.image)}
                        style={{ width: "200px", height: "200px" }}
                        className="camera-image"
                        alt={el.attributes.product.data.attributes.name}
                      />
                    )}
                    <h5 className="mt-1" style={{ color: "black" }}>
                      {el.attributes.product.data.attributes.product_name}
                    </h5>
                    {user ? (
                      <h5 className="price-detail">
                        {el.attributes.product.data.attributes.product_price ===
                          "0" ? (
                          <h5>For Price Please Enquire</h5>
                        ) : (
                          <h5>
                            {symbol}
                            {formatPrice(
                              el.attributes.product.data.attributes
                                .product_price * currencyValue.toFixed(2)
                            )}
                          </h5>
                        )}
                      </h5>
                    ) : (
                      <Link href="/login">
                        <h5
                          className="price-detail"
                          style={{ color: "#FF8400" }}
                        >
                          Please Login for Price
                        </h5>
                      </Link>
                    )}
                  </Link>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
      <div className="container d-block d-xl-none d-md-none d-sm-block" >
        <div className="row" style={{
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        backgroundColor: "#eee",
        marginLeft:'5px',
        marginRight:'5px',
      }}>
          {safety.data && (
            <div  className="col-12" style={{padding:'0'}}>
              <Link
                href={`/category/${safety.data[0]?.attributes.category?.data?.id}-${safety.data[0]?.attributes.category_name}`}
              >
                <img
                  src={getStrapiMedia(safety.data[0].attributes.mobile_banner)}
                  style={{ width: '100%',objectFit:'cover' }}
                  alt="Safety"
                />

              </Link>
            </div>
          )}
          {/* <div className="col-sm- "> */}
          <div className="row">
            {safety.data?.map((el) => (
              <div className='col-5 mb-3 mt-3' style={{ backgroundColor: 'white', marginLeft: '22px' }} key={el.id}>
                <Link
                  href={`/product/${el.attributes.product.data.id}-${el.attributes.product.data.attributes.product_slug}`}
                >
                  {isLoading ? (
                    <SkeletonLoader />
                  ) : (
                    <img
                      src={getStrapiMedia(el.attributes.image)}
                      style={{ width: "100px", height: "100px",borderBottom: '1px solid black' }}
                      className="sensor-image"
                      alt={el.attributes.product.data.attributes.name}
                    />
                  )}
                  <h5 className="mt-1" style={{ color: "black" }}>
                    {el.attributes.product.data.attributes.product_name}
                  </h5>
                  {user ? (
                    <h5 className="price-detail">
                      {el.attributes.product.data.attributes.product_price ===
                        "0" ? (
                        <h5>For Price Please Enquire</h5>
                      ) : (
                        <h5>
                          {symbol}
                          {formatPrice(
                            el.attributes.product.data.attributes
                              .product_price * currencyValue.toFixed(2)
                          )}
                        </h5>
                      )}
                    </h5>
                  ) : (
                    <Link href="/login">
                      <h5
                        className="price-detail"
                        style={{ color: "#FF8400" }}
                      >
                        Please Login for Price
                      </h5>
                    </Link>
                  )}
                </Link>
              </div>
            ))}
          </div>
          {/* </div> */}

        </div>

      </div>
      {/* /////Industrial Robots///// */}
      <h2 className="text-center mb-3 mt-5">Industrial Robots</h2>
      <div className="container d-none d-xl-block d-md-block d-sm-none" style={{
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        backgroundColor: "#eee",
      }}>
        <div className="row">
          {industrialRobot.data && (
            <div className="col-lg-3 col-md-3 col-sm-12">
              <Link
                href={`/category/${industrialRobot.data[0]?.attributes.category?.data?.id}-${industrialRobot.data[0]?.attributes.category_name}`}
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
                    src={getStrapiMedia(industrialRobot.data[0].attributes.category_banner)}
                    type="video/mp4"
                  />
                </video>
              </Link>
            </div>
          )}
          <div className="col-lg-9 col-md-9 col-sm-12 ">
            <div className="row">
              {industrialRobot.data?.map((el) => (
                <div className="col-lg-3 col-md-6 col-sm-12  mb-3 mt-3 categorizedProducts-card" key={el.id}>
                  <Link
                    href={`/product/${el.attributes.product.data.id}-${el.attributes.product.data.attributes.product_slug}`}
                  >
                    {isLoading ? (
                      <SkeletonLoader />
                    ) : (
                      <img
                        src={getStrapiMedia(el.attributes.image)}
                        style={{ width: "200px", height: "200px" }}
                        className="camera-image"
                        alt={el.attributes.product.data.attributes.name}
                      />
                    )}
                    <h5 className="mt-1" style={{ color: "black" }}>
                      {el.attributes.product.data.attributes.product_name}
                    </h5>
                    {user ? (
                      <h5 className="price-detail">
                        {el.attributes.product.data.attributes.product_price ===
                          "0" ? (
                          <h5>For Price Please Enquire</h5>
                        ) : (
                          <h5>
                            {symbol}
                            {formatPrice(
                              el.attributes.product.data.attributes
                                .product_price * currencyValue.toFixed(2)
                            )}
                          </h5>
                        )}
                      </h5>
                    ) : (
                      <Link href="/login">
                        <h5
                          className="price-detail"
                          style={{ color: "#FF8400" }}
                        >
                          Please Login for Price
                        </h5>
                      </Link>
                    )}
                  </Link>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
      <div className="container d-block d-xl-none d-md-none d-sm-block" >
        <div className="row" style={{
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
          backgroundColor: "#eee",
          marginLeft:'5px',
          marginRight:'5px'
        }} >
          {industrialRobot.data && (
            <div className="col-12" style={{padding:'0'}}>
              <Link
                href={`/category/${industrialRobot.data[0]?.attributes.category?.data?.id}-${industrialRobot.data[0]?.attributes.category_name}`}
              >
                <img
                  src={getStrapiMedia(industrialRobot.data[0].attributes.mobile_banner)}
                  style={{ objectFit: 'cover', width: '100%' }}
                  alt="Industrial Robots"
                />
              </Link>
            </div>
          )}
          {/* <div className="col-sm- "> */}
          <div className="row">
            {industrialRobot.data?.map((el) => (
              <div className='col-5 mb-3 mt-3' style={{ backgroundColor: 'white', marginLeft: '22px' }} key={el.id}>
                <Link
                  href={`/product/${el.attributes.product.data.id}-${el.attributes.product.data.attributes.product_slug}`}
                >
                  {isLoading ? (
                    <SkeletonLoader />
                  ) : (
                    <img
                      src={getStrapiMedia(el.attributes.image)}
                      style={{ width: "100px", height: "100px",borderBottom: '1px solid black' }}
                      className="sensor-image"
                      alt={el.attributes.product.data.attributes.name}
                    />
                  )}
                  <h5 className="mt-1" style={{ color: "black" }}>
                    {el.attributes.product.data.attributes.product_name}
                  </h5>
                  {user ? (
                    <h5 className="price-detail">
                      {el.attributes.product.data.attributes.product_price ===
                        "0" ? (
                        <h5>For Price Please Enquire</h5>
                      ) : (
                        <h5>
                          {symbol}
                          {formatPrice(
                            el.attributes.product.data.attributes
                              .product_price * currencyValue.toFixed(2)
                          )}
                        </h5>
                      )}
                    </h5>
                  ) : (
                    <Link href="/login">
                      <h5
                        className="price-detail"
                        style={{ color: "#FF8400" }}
                      >
                        Please Login for Price
                      </h5>
                    </Link>
                  )}
                </Link>
              </div>
            ))}
          </div>
          {/* </div> */}

        </div>

      </div>
      {/* /////Mobile Robots///// */}
      <h2 className="text-center mb-3 mt-5">Mobile Robots</h2>
      <div className="container d-none d-xl-block d-md-block d-sm-none" style={{
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        backgroundColor: "#eee",
      }}>
        <div className="row">
          {mobileRobot.data && (
            <div className="col-lg-3 col-md-3 col-sm-12">
              <Link
                href={`/category/${mobileRobot.data[0]?.attributes.category?.data?.id}-${mobileRobot.data[0]?.attributes.category_name}`}
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
                    src={getStrapiMedia(mobileRobot.data[0].attributes.category_banner)}
                    type="video/mp4"
                  />
                </video>
              </Link>
            </div>
          )}
          <div className="col-lg-9 col-md-9 col-sm-12 ">
            <div className="row">
              {mobileRobot.data?.map((el) => (
                <div className="col-lg-3 col-md-6 col-sm-12  mb-3 mt-3 categorizedProducts-card" key={el.id}>
                  <Link
                    href={`/product/${el.attributes.product.data.id}-${el.attributes.product.data.attributes.product_slug}`}
                  >
                    {isLoading ? (
                      <SkeletonLoader />
                    ) : (
                      <img
                        src={getStrapiMedia(el.attributes.image)}
                        style={{ width: "200px", height: "200px" }}
                        className="camera-image"
                        alt={el.attributes.product.data.attributes.name}
                      />
                    )}
                    <h5 className="mt-1" style={{ color: "black" }}>
                      {el.attributes.product.data.attributes.product_name}
                    </h5>
                    {user ? (
                      <h5 className="price-detail">
                        {el.attributes.product.data.attributes.product_price ===
                          "0" ? (
                          <h5>For Price Please Enquire</h5>
                        ) : (
                          <h5>
                            {symbol}
                            {formatPrice(
                              el.attributes.product.data.attributes
                                .product_price * currencyValue.toFixed(2)
                            )}
                          </h5>
                        )}
                      </h5>
                    ) : (
                      <Link href="/login">
                        <h5
                          className="price-detail"
                          style={{ color: "#FF8400" }}
                        >
                          Please Login for Price
                        </h5>
                      </Link>
                    )}
                  </Link>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
      <div className="container d-block d-xl-none d-md-none d-sm-block" >
        <div className="row" style={{
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        backgroundColor: "#eee",
        marginLeft:'5px',
        marginRight:'5px',
      }}>
          {mobileRobot.data && (
            <div  className="col-12" style={{padding:'0'}}>
              <Link
                href={`/category/${mobileRobot.data[0]?.attributes.category?.data?.id}-${mobileRobot.data[0]?.attributes.category_name}`}
              >
                <img
                  src={getStrapiMedia(mobileRobot.data[0].attributes.mobile_banner)}
                  style={{ objectFit:'cover', width: '100%' }}
                  alt="Mobile Robots"
                />
              </Link>
            </div>
          )}
          {/* <div className="col-sm- "> */}
          <div className="row">
            {mobileRobot.data?.map((el) => (
              <div className='col-5 mb-3 mt-3' style={{ backgroundColor: 'white', marginLeft: '22px' }} key={el.id}>
                <Link
                  href={`/product/${el.attributes.product.data.id}-${el.attributes.product.data.attributes.product_slug}`}
                >
                  {isLoading ? (
                    <SkeletonLoader />
                  ) : (
                    <img
                      src={getStrapiMedia(el.attributes.image)}
                      style={{ width: "100px", height: "100px",borderBottom: '1px solid black' }}
                      className="sensor-image"
                      alt={el.attributes.product.data.attributes.name}
                    />
                  )}
                  <h5 className="mt-1" style={{ color: "black" }}>
                    {el.attributes.product.data.attributes.product_name}
                  </h5>
                  {user ? (
                    <h5 className="price-detail">
                      {el.attributes.product.data.attributes.product_price ===
                        "0" ? (
                        <h5>For Price Please Enquire</h5>
                      ) : (
                        <h5>
                          {symbol}
                          {formatPrice(
                            el.attributes.product.data.attributes
                              .product_price * currencyValue.toFixed(2)
                          )}
                        </h5>
                      )}
                    </h5>
                  ) : (
                    <Link href="/login">
                      <h5
                        className="price-detail"
                        style={{ color: "#FF8400" }}
                      >
                        Please Login for Price
                      </h5>
                    </Link>
                  )}
                </Link>
              </div>
            ))}
          </div>
          {/* </div> */}

        </div>

      </div>
      {/* /////Cameras///// */}
      {/*<h2 className="text-center mb-3 mt-5">Cameras</h2>
     <div className="container d-none d-xl-block d-md-block d-sm-none" style={{
      boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
      backgroundColor: "#eee",
    }}>
      <div className="row">
        {camera.data && (
          <div className="col-lg-3 col-md-3 col-sm-12">
            <Link
              href={`/category/${camera.data[0]?.attributes.category?.data?.id}-${camera.data[0]?.attributes.category_name}`}
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
                  src={getStrapiMedia(camera.data[0].attributes.category_banner)}
                  type="video/mp4"
                />
              </video>
            </Link>
          </div>
        )}
          <div className="col-lg-9 col-md-9 col-sm-12 ">
            <div className="row">
            {camera.data?.map((el) => (
              <div className="col-lg-3 col-md-6 col-sm-12  mb-3 mt-3 categorizedProducts-card"  key={el.id}>
                <Link
                  href={`/product/${el.attributes.product.data.id}-${el.attributes.product.data.attributes.product_slug}`}
                >
                  {isLoading ? (
                    <SkeletonLoader />
                  ) : (
                    <img
                      src={getStrapiMedia(el.attributes.image)}
                      style={{ width: "200px", height: "200px" }}
                      className="camera-image"
                      alt={el.attributes.product.data.attributes.name}
                    />
                  )}
                  <h5 className="mt-1" style={{ color: "black" }}>
                    {el.attributes.product.data.attributes.product_name}
                  </h5>
                  {user ? (
                    <h5 className="price-detail">
                      {el.attributes.product.data.attributes.product_price ===
                        "0" ? (
                        <h5>For Price Please Enquire</h5>
                      ) : (
                        <h5>
                          {symbol}
                          {formatPrice(
                            el.attributes.product.data.attributes
                              .product_price * currencyValue.toFixed(2)
                          )}
                        </h5>
                      )}
                    </h5>
                  ) : (
                    <Link href="/login">
                      <h5
                        className="price-detail"
                        style={{ color: "#FF8400" }}
                      >
                        Please Login for Price
                      </h5>
                    </Link>
                  )}
                </Link>
              </div>
              ))}
            </div>
          </div>
        
      </div>

    </div> */}
    </>
  );
};

export default CategorizedProducts;
