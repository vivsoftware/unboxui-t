import React, { useState, useRef, useEffect } from "react";
import { Row } from "reactstrap";
import TopHeaderCurrency from "./TopHeaderCurrency";
import Image from "next/image";
import PrimarySearchAppBar from "../../Components/Element/searchbar";
import WishList from "./WishList";
import AdminUser from "./AdminUser";
import ItemCart from "./ItemCart";
import Link from "next/link";
import Compare from "./Compare";
import { TfiMenuAlt } from "react-icons/tfi";
import { auth } from "../../Config/firebase";

const TopHeaderBar = ({ brands, categories, industries }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [brandsOpen, setBrandsOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);



  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      setUser(user);
    });
  }, []);

  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const toggleMobileDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleShopDropdown = () => {
    setShopOpen(!shopOpen);
  };

  const toggleBrandsDropdown = () => {
    setBrandsOpen(!brandsOpen);
  };

  const toggleIndustriesDropdown = () => {
    setIndustriesOpen(!industriesOpen);
  };

  const toggleAboutDropdown = () => {
    setAboutOpen(!aboutOpen);
  };

  const toggleResourcesDropdown = () => {
    setResourcesOpen(!resourcesOpen);
  };
  useEffect(() => {
    const handleDocumentClick = (event) => {
      console.log('Clicked outside');
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShopMenuOpen, setIsShopMenuOpen] = useState(false);
  const [isBrandsMenuOpen, setIsBrandsMenuOpen] = useState(false);
  const [isIndustryMenuOpen, setIsIndustryMenuOpen] = useState(false);
  const [isResourcesMenuOpen, setIsResourcesMenuOpen] = useState(false);
  const [isAboutMenuOpen, setIsAboutMenuOpen] = useState(false);
  const [isGrayBackground, setIsGrayBackground] = useState(false);

  const toggleBackgroundColor = () => {
    setIsGrayBackground(!isGrayBackground);
  };

  const cardStyle = {
    backgroundColor: isGrayBackground ? 'gray' : '#FF8400',
    borderRadius: '4px',
    height: '40px',
    border: '1px solid #5f5f5f',
    cursor: 'pointer',
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsShopMenuOpen(false);
    setIsBrandsMenuOpen(false);
    setIsIndustryMenuOpen(false);
    setIsResourcesMenuOpen(false);
    setIsAboutMenuOpen(false);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
    setIsShopMenuOpen(false);
    setIsBrandsMenuOpen(false);
    setIsIndustryMenuOpen(false);
    setIsResourcesMenuOpen(false);
    setIsAboutMenuOpen(false);
  };

  const handleShopMenuToggle = () => {
    setIsShopMenuOpen(!isShopMenuOpen);
  };
  const handleBrandsMenuToggle = () => {
    setIsBrandsMenuOpen(!isBrandsMenuOpen);
  };
  const handleIndustryMenuToggle = () => {
    setIsIndustryMenuOpen(!isIndustryMenuOpen);
  };
  const handleResourcesMenuToggle = () => {
    setIsResourcesMenuOpen(!isResourcesMenuOpen);
  };
  const handleAboutMenuToggle = () => {
    setIsAboutMenuOpen(!isAboutMenuOpen);
  };

  const menuIconStyles = {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '30px',
    height: '30px',
  };

  const barStyles = {
    width: '30px',
    height: '3px',
    backgroundColor: '#333',
    margin: '2px 0',
    transition: '0.4s',
  };

  return (
    <div className="top-header">
      <div className="container-fluid-lg">
        <div className="d-none d-xl-block d-md-block d-sm-none">
          <Row>
            <div className="col-xl-auto col-md-2 col-sm-2 wd-30">
              <ul className="border-list p-0">
                <li style={{ margin: '0px' }}>
                  {" "}
                  <Link href="/">
                    <Image src="/Logofinal.svg" alt="unboxLogo" width={200} height={64} className="mobile-logo" />
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-xl-auto col-md-4 col-sm-4 wd-40">
              <PrimarySearchAppBar />
            </div>
            <div className="col-xl-auto col-md-6 col-sm-6 wd-30">
              <ul className="border-list p-0">
                <TopHeaderCurrency className="mobile-currency" />
                <li>
                  <Link href="/wishlist" className="mobile-currency">
                    <WishList />
                  </Link>
                </li>
                <li>
                  <Compare />
                </li>
                <li>
                  <Link href="/cart" className="mobile-currency">
                    <ItemCart />
                  </Link>
                </li>
                {user ? (
                  <li>
                    <Link href="/user_dashboard" className="mobile-currency">
                      <AdminUser />
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link href="/login" className="mobile-currency">
                      <AdminUser />
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </Row>
        </div>
        <div className="d-block d-xl-none d-md-none d-sm-block">
          <Row>
            <div className="col-3">
              <Link href="/">
                <Image src="/Logofinal.svg" width={200} height={64} className="mobile-logo" />
              </Link>
            </div>
            {/* <div className="col-2"></div> */}
            <div className="col-2" style={{ marginLeft: '-30px' }}>
              <TopHeaderCurrency style={{ width: '200px' }} />
            </div>
            <div className="col-3">
              <div className="card" style={cardStyle} onClick={toggleBackgroundColor}>
                <Link href={user ? '/user_dashboard' : '/login'} className="mobile-currency">
                  <div className="row">
                    <div className="col-4">
                      <AdminUser />
                    </div>
                    <div className="col-8">
                      <p className="" style={{ color: 'white', marginTop: '10px', fontWeight: 'bold' }}>LogIn</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-2">
              <div style={{ position: 'relative' }}>
                <div style={menuIconStyles} onClick={handleMenuToggle}>
                  <div style={{ ...barStyles, transform: isMenuOpen ? 'rotate(-45deg) translate(-2px, 2px)' : 'none' }}></div>
                  <div style={{ ...barStyles, opacity: isMenuOpen ? 0 : 1 }}></div>
                  <div style={{ ...barStyles, transform: isMenuOpen ? 'rotate(45deg) translate(-2px, -2px)' : 'none' }}></div>
                </div>
                {isMenuOpen && (
                  <div style={styles.menuContent}>
                    <ul style={styles.menuList}>
                      <li onClick={() => {
                        setSelectedMenuItem('home'); // Set the selected menu item to 'shop' when clicked
                      }}
                        style={{
                          color:
                            selectedMenuItem === 'home'
                              ? '#5f5f5f' // Color when selected
                              : 'black' // Default color
                        }}><Link href="/" style={{ color: 'black' }}>
                          Home
                        </Link>
                      </li>
                      <li onClick={() => {
                        handleShopMenuToggle();
                        setSelectedMenuItem('shop'); // Set the selected menu item to 'shop' when clicked
                      }}
                        style={{
                          color:
                            selectedMenuItem === 'shop'
                              ? '#5f5f5f' // Color when selected
                              : 'black' // Default color
                        }}>
                        Shop
                        {isShopMenuOpen && (
                          <ul style={styles.shopMenuList}>
                            <li><Link href="/shop">All Products</Link></li>
                            {categories && categories.map((category) => (
                              <li key={category.id}>
                                <Link href={`/category/${category.id}-${category.attributes.category_name}`}>
                                  {category.attributes.category_name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                      <li onClick={() => {
                        handleBrandsMenuToggle();
                        setSelectedMenuItem('brands'); // Set the selected menu item to 'shop' when clicked
                      }}
                        style={{
                          color:
                            selectedMenuItem === 'brands'
                              ? '#5f5f5f' // Color when selected
                              : 'black' // Default color
                        }}>
                        Brands
                        {isBrandsMenuOpen && (
                          <ul style={styles.brandsMenuList}>
                            <li><Link href="/brands">All Brands</Link></li>
                            {brands && brands.map((brand) => (
                              <li
                                key={brand.id}
                              >
                                <Link
                                  href={`/brand/${brand.id}-${brand.attributes.brand_name}`}
                                  onClick={() => (brand.id)}
                                >
                                  {brand.attributes.brand_name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                      <li onClick={() => {
                        handleIndustryMenuToggle();
                        setSelectedMenuItem('industry'); // Set the selected menu item to 'shop' when clicked
                      }}
                        style={{
                          color:
                            selectedMenuItem === 'industry'
                              ? '#5f5f5f' // Color when selected
                              : 'black' // Default color
                        }}>
                        Industry
                        {isIndustryMenuOpen && (
                          <ul style={styles.industryMenuList}>
                            <li><Link href="/industries/All">Industrial Solutions</Link></li>
                            {industries && industries.map((elem) => (
                              <li key={elem.id}>
                                <Link href={`/industries/${elem.id}-${elem.attributes.industry_slug}`}>
                                  {elem.attributes.CardTitle}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                      <li onClick={() => {
                        handleResourcesMenuToggle();
                        setSelectedMenuItem('resources'); // Set the selected menu item to 'shop' when clicked
                      }}
                        style={{
                          color:
                            selectedMenuItem === 'resources'
                              ? '#5f5f5f' // Color when selected
                              : 'black' // Default color
                        }}>
                        Resources
                        {isResourcesMenuOpen && (
                          <ul style={styles.resourcesMenuList}>
                            <li><Link href="/faq">FAQs</Link></li>
                            <li><Link href="#">Case Studies</Link></li>
                            <li><Link href="#">Unbox Videos</Link></li>
                          </ul>
                        )}
                      </li>
                      <li onClick={() => {
                        handleAboutMenuToggle();
                        setSelectedMenuItem('about'); // Set the selected menu item to 'shop' when clicked
                      }}
                        style={{
                          color:
                            selectedMenuItem === 'about'
                              ? '#5f5f5f' // Color when selected
                              : 'black' // Default color
                        }}>
                        About Us
                        {isAboutMenuOpen && (
                          <ul style={styles.aboutMenuList}>
                            <li><Link href="/about-us">About Us</Link></li>
                            <li><Link href="/contact-us">Contact Us</Link></li>
                            <li><Link href="/blogs">Blogs</Link></li>
                          </ul>
                        )}
                      </li>
                    </ul>
                  </div>
                )}
                {isMenuOpen && (
                  <div
                    style={styles.overlay}
                    onClick={handleMenuClose}
                  ></div>
                )}
              </div>
            </div>

          </Row>
        </div>
      </div>
    </div>
  );
};
const styles = {
  menuContent: {
    position: 'fixed',
    top: 0,
    right: 0,
    width: '250px',
    height: '100%',
    backgroundColor: '#fff',
    boxShadow: '-2px 0 4px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    zIndex: 999,
    overflowY: 'auto',
    lineHeight: '35px'
  },
  menuList: {
    listStyle: 'none',
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
  },
  shopMenuList: {
    listStyle: 'none',
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
  },
  brandsMenuList: {
    listStyle: 'none',
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
  },
  industryMenuList: {
    listStyle: 'none',
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
  },
  resourcesMenuList: {
    listStyle: 'none',
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
  },
  aboutMenuList: {
    listStyle: 'none',
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
};

export default TopHeaderBar;
