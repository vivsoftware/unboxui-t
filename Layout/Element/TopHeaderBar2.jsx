import React, { useState, useRef, useEffect } from "react";
import { Row } from "reactstrap";
import TopHeaderCurrency from "./TopHeaderCurrency";
import Image from "next/image";
import AdminUser from "./AdminUser";
import Link from "next/link";
import { TfiMenuAlt } from "react-icons/tfi";
import { auth } from "../../Config/firebase";
import DashboardSearchBar from "../../Components/Element/DashboardSearchBar";
import { SellerDashboardData } from "../../Data/SellerDashboardData";
import AllTabContain from "../../Components/Pages/Seller Dashboard/AllTabContain";
import spring_boot_url from "../../Utils/springApi";
import axios from "axios";

const TopHeaderBar2 = ({ userDe, brands, categories, industries }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [num, setNum] = useState(1);
  const [sellers, setSellers] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [serviceProviders, setServiceProviders] = useState([]);

  const handleClick = (index) => {
    setActiveTab(index === activeTab ? null : index);
  };
  const toggle = (id) => {
    setNum(id);
  };

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      setUser(user);
    });
  }, []);

  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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

  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);

  };
  const seller = () => {
    axios.get(`${spring_boot_url}api/adminuser/search?query=seller`)
      .then(resp => {
        console.log(resp.data.json);
        setSellers(resp.data);
      });
  }
  const buyer = () => {
    axios.get(`${spring_boot_url}api/adminuser/search?query=buyer`)
      .then(resp => {
        console.log(resp.data.json);
        setBuyers(resp.data);
      });
  }
  const serviceProvider = () => {
    axios.get(`${spring_boot_url}api/adminuser/search?query=service provider`)
      .then(resp => {
        console.log(resp.data.json);
        setServiceProviders(resp.data);
      });
  }



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
    <div className="top-header" style={{borderBottom:'1px solid #ddd'}}>
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
              <DashboardSearchBar />
            </div>
            <div className="col-xl-auto col-md-6 col-sm-6 wd-30">
              <ul className="border-list p-0">
                <li><img src="/message.svg" /></li>
                <li><img src="/notification.svg" /></li>
                <li><img src="/award.svg" /></li>

                {user ? (
                  <li>
                    <Link href="/user_dashboard" className="mobile-currency">
                      {/* <img src="/Gopal.svg" width="24px" height="24px"/> */}
                      <AdminUser />
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link href="/login" className="mobile-currency">
                      {/* <img src="/Gopal.svg" width="24px" height="24px"/> */}
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
            <div className="col-3"></div>
            <div className="col-1">
              <img src="/message.svg"/>
            </div>
            <div className="col-1">
              <img src="/notification.svg"/>
            </div>
            <div className="col-1">
              <img src="/award.svg"/>
            </div>
            {/* <div className="col-2">
              <div style={{ position: 'relative' }}>
                <div style={menuIconStyles} onClick={handleMenuToggle}>
                  <div style={{ ...barStyles, transform: isMenuOpen ? 'rotate(-45deg) translate(-2px, 2px)' : 'none' }}></div>
                  <div style={{ ...barStyles, opacity: isMenuOpen ? 0 : 1 }}></div>
                  <div style={{ ...barStyles, transform: isMenuOpen ? 'rotate(45deg) translate(-2px, -2px)' : 'none' }}></div>
                </div>
                {isMenuOpen && (
                  <div style={styles.menuContent}>
                    <ul style={styles.menuList}>
                      {SellerDashboardData.map((elem, i) => (
                        <div className={`${activeTab === i ? 'thick-border' : ''}`} onClick={() => handleClick(i)} key={i}>
                          <img className="admin-icon" src={elem.image} />
                          <p
                            className={`mt-2 text-center`}
                          >
                            {elem.type}
                          </p>
                        </div>
                      ))}
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
            </div> */}
            {/* <AllTabContain activeTab={activeTab} num={num} userDe={userDe} sellers={seller} buyers={buyer} serviceProviders={serviceProvider}/> */}
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

export default TopHeaderBar2;
