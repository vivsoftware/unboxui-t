import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, ShoppingBag } from 'react-feather';
import { useDispatch } from 'react-redux';
import { Cart, Comparision, Homes, wishlist } from '../Constant';
import MobileCompare from '../../Layout/Element/MobileCompare';
import MobileCart from '../../Layout/Element/MobileCart';
import MobileWishList from '../../Layout/Element/MobileWishlist';
import { useRouter } from 'next/router';
import { auth } from '../../Config/firebase';
import { AdminDashboardData } from '../../Data/AdminDashboardData';
import {BuyerDashboardData } from '../../Data/BuyerDashboardData'; 
import { AiOutlineMenu } from "react-icons/ai";
import axios from 'axios';
import spring_boot_url from '../../Utils/springApi';
// import AllTabContain from '../Pages/Admin Dashboard/AllTabContain';
import { SellerDashboardData } from '../../Data/SellerDashboardData';
import AllTabContain from '../Pages/Seller Dashboard/AllTabContain';
// import { BuyerDashboardData } from '../../Data/BuyerDashboardData';
// import AllTabContain from '../Pages/Buyer Dashboard/AllTabContain';
import SalesContain from '../Pages/Seller Dashboard/SalesContain';
import UserContain from '../Pages/Seller Dashboard/UserContain';
import AdminDashboard from '../Pages/Admin Dashboard/AdminDashboard';

const CommonMobileView = ({ }) => {
  const dispatch = useDispatch();
  const [activeIcon, setActiveIcon] = useState(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [num, setNum] = useState(1);
  const [showMenu, setShowMenu] = useState(false);
  const [sellers, setSellers] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [serviceProviders, setServiceProviders] = useState([]);
  const [userDe, setUserDe] = useState(null);
  const [showSales, setShowSales] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [searchData, setSearchData] = useState(false)

  const handleSearchChange = () => {
    setSearchData(!searchData);
  };
  const handleViewDetailsClick = () => {
    setSearchData(null);
  };

  const handleClick = (icon) => {
    setActiveIcon(icon);
  };
  useEffect(() => {
    // auth.onAuthStateChanged(async (user) => {
    setUser(true);

  }, []);
  const handleClickDash = (index) => {
    setActiveTab(index === activeTab ? null : index);
    setShowMenu(false);
  };
  const toggle = (id) => {
    setNum(id);
  };
  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  }

  useEffect(() => {
    axios.get(`${spring_boot_url}api/adminuser/allusers`)
      .then(resp => {
        console.log(resp.data.json);
        setUserDe(resp.data);
      });
  }, [])


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
  const handleSalesClick = () => {
   setShowSales(true);
   setShowUsers(false);
  //  setShowMenu(false);
  }
  const handleUsersClick = () => {
    setShowSales(false);
    setShowUsers(true);
    // setShowMenu(false);
  }
  return (
    <>
      {!user ? (
        <div className='mobile-menu d-sm-none'>
          <ul>
            <li
              className={`menu-item ${activeIcon === 'home' ? 'active' : ''
                }`}
              onClick={() => handleClick('home')}
              style={{
                border: activeIcon === 'home' ? '2px solid #5f5f5f' : '2px solid transparent', height: '60px', paddingTop: '5px'
              }}
            >
              <Link href={'/'} >
                <Home
                  style={{
                    color: activeIcon === 'home' ? '#FF8400' : '#FF8400',
                  }}
                />
                <span
                  style={{
                    color: activeIcon === 'home' ? '#FF8400' : '#000',
                  }}
                >
                  {Homes}
                </span>
              </Link>
            </li>
            <li
              className={`menu-item ${activeIcon === 'shop' ? 'active' : ''
                }`}
              onClick={() => handleClick('shop')}
              style={{
                border: activeIcon === 'shop' ? '2px solid #5f5f5f' : '2px solid transparent', height: '60px', paddingTop: '5px'

              }}
            >

              <Link href={'/shop'}>
                <ShoppingBag
                  style={{
                    color: activeIcon === 'shop' ? '#FF8400' : '#FF8400',
                  }}
                />
                <span
                  style={{
                    color: activeIcon === 'shop' ? '#FF8400' : '#000',
                  }}
                >
                  Shop
                </span>
              </Link>
              {/* {isLoading && <div className="loader-spinner"></div>} */}
            </li>
            <li
              className={`menu-item ${activeIcon === 'compare' ? 'active' : ''
                }`}
              onClick={() => handleClick('compare')}
              style={{
                border: activeIcon === 'compare' ? '2px solid #5f5f5f' : '2px solid transparent', height: '60px', paddingTop: '5px'
              }}
            >
              <a href='#javascript' onClick={() => handleClick('compare')}>
                <MobileCompare style={{ color: activeIcon === 'compare' ? '#FF8400' : '#000', marginBottom: '0px' }} />
                <span style={{ color: activeIcon === 'compare' ? '#FF8400' : '#000', position: 'relative', bottom: '21px', }}>{Comparision}</span>
              </a>
            </li>
            <li
              className={`menu-item ${activeIcon === 'cart' ? 'active' : ''
                }`}
              onClick={() => handleClick('cart')}
              style={{
                border: activeIcon === 'cart' ? '2px solid #5f5f5f' : '2px solid transparent', height: '60px', paddingTop: '5px'
              }}
            >
              <Link href='/cart' onClick={() => handleClick('cart')}>
                <MobileCart style={{ color: activeIcon === 'cart' ? '#FF8400' : '#FF8400' }} />
                <span style={{ color: activeIcon === 'cart' ? '#FF8400' : '#000' }}>{Cart}</span>
              </Link>
            </li>
            <li
              className={`menu-item ${activeIcon === 'wishlist' ? 'active' : ''
                }`}
              onClick={() => handleClick('wishlist')}
              style={{
                border: activeIcon === 'wishlist' ? '2px solid #5f5f5f' : '2px solid transparent', height: '60px', paddingTop: '5px'
              }}
            >
              <Link href='/wishlist' onClick={() => handleClick('wishlist')}>
                <MobileWishList
                  style={{ color: activeIcon === 'wishlist' ? '#FF8400' : '#FF8400' }}
                />
                <span
                  style={{
                    color: activeIcon === 'wishlist' ? '#FF8400' : '#000',
                    position: 'relative',
                    bottom: '21px',
                  }}
                >
                  {wishlist}
                </span>
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        <div className='mobile-menu d-sm-none'>
          <>
            {/*     Admin Dashboard      menu items     */}
            {/* <ul>
            {AdminDashboardData.slice(0, 4).map((elem, i) => (
              <li className={`${activeTab === i ? 'menu-item' : ''}`} onClick={() => handleClickDash(i)} key={i}>
                <div>
                  <img src={elem.image} alt={`item-${i}`} style={{ height: '30px', width: '30px' }} />
                </div>
                <div>
                  <span>{elem.type}</span>
                </div>
              </li>
            ))}

            <li onClick={handleShowMenu}>
              <div >
                <AiOutlineMenu style={{ color: '#FF8400', height: '30px', width: '30px' }} />
              </div>
              <div>
                <span>Menu</span>
              </div>
            </li>
          </ul> */}
            {/*     Seller Dashboard          */}
            {/* <ul>
            {SellerDashboardData.slice(0, 4).map((elem, i) => (
              <li className={`${activeTab === i ? 'menu-item' : ''}`} onClick={() => handleClickDash(i)} key={i}>
                <div>
                  <img src={elem.image} alt={`item-${i}`} style={{ height: '30px', width: '30px' }} />
                </div>
                <div>
                  <span>{elem.type}</span>
                </div>
              </li>
            ))}

            <li onClick={handleShowMenu}>
              <div >
                <AiOutlineMenu style={{ color: '#FF8400', height: '30px', width: '30px' }} />
              </div>
              <div>
                <span>Menu</span>
              </div>
            </li>
          </ul> */}
                {/* Buyer Dashboard         */}
            <ul>
            {BuyerDashboardData.slice(0, 4).map((elem, i) => (
              <li className={`${activeTab === i ? 'menu-item' : ''}`} onClick={() => handleClickDash(i)} key={i}>
                <div>
                  <img src={elem.image} alt={`item-${i}`} style={{ height: '30px', width: '30px' }} />
                </div>
                <div>
                  <span>{elem.type}</span>
                </div>
              </li>
            ))}

            <li onClick={handleShowMenu}>
              <div >
                <AiOutlineMenu style={{ color: '#FF8400', height: '30px', width: '30px' }} />
              </div>
              <div>
                <span>Menu</span>
              </div>
            </li>
          </ul>
           
          </>


        </div>
      )}
      {/*     Admin Dashboard          */}
      {/* <div className='d-sm-none' style={{ marginBottom: '80px' }}>
        {showMenu ? (
          <>
            <div className='container '>
              <div className='row mt-3'>
                <div className='col-6'>
                  <div className='menu-card'>
                    <p>Purchase</p>
                    <img src='purchase.svg' />
                  </div>
                </div>
                <div className='col-6'>
                  <div className='menu-card'>
                    <p>Finance</p>
                    <img src='finance.svg' />
                  </div>
                </div>
              </div>
              
              <div className='data-card'>
                <div className='row'>
                  <div className='col-4'>
                    <div className='account-card'>
                      <Link href="/">Home</Link>
                    </div>
                  </div>
                  <div className='col-4'>
                    <div className='account-card'>
                      <Link href="/user_dashboard">Profile</Link>
                    </div>
                  </div>
                  <div className='col-4'>
                    <div className='account-card'>
                      <Link href="/login">LogOut</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <AllTabContain activeTab={activeTab} num={num} userDe={userDe} sellers={seller} buyers={buyer} serviceProviders={serviceProvider} />
        )}
      </div> */}
      {/*     Seller Dashboard          */}
      {/* <div className='d-sm-none' style={{ marginBottom: '80px' }}>
        {showMenu ? (
          <>
            <div className='container '>
              <div className='row mt-3'>
                <div className='col-6'>
                  <div className='menu-card' onClick={handleSalesClick} >
                    <div className='row'>
                      <div className='col-3'>
                        <img src='Sales.svg' />
                      </div>
                      <div className='col-9'>
                        <p className='mt-1'>Sales</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-6'>
                  <div className='menu-card' onClick={handleUsersClick}>
                    <div className='row'>
                      <div className='col-3'>
                        <img src='user.svg' />
                      </div>
                      <div className='col-9'>
                        <p className='mt-1'>Users</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
           
            <div className='data-card'>
              <div className='row'>
                <div className='col-4'>
                  <div className='account-card'>
                    <Link href="/">Home</Link>
                  </div>
                </div>
                <div className='col-4'>
                  <div className='account-card'>
                    <Link href="/user_dashboard">Profile</Link>
                  </div>
                </div>
                <div className='col-4'>
                  <div className='account-card'>
                    <Link href="/login">LogOut</Link>
                  </div>
                </div>
              </div>
            </div>
            {showSales && (
            <> 
            <AdminDashboard />
            <div className='data-card'>
              <div className='row'>
                <div className='col-4'>
                  <div className='account-card'>
                    <Link href="/">Home</Link>
                  </div>
                </div>
                <div className='col-4'>
                  <div className='account-card'>
                    <Link href="/user_dashboard">Profile</Link>
                  </div>
                </div>
                <div className='col-4'>
                  <div className='account-card'>
                    <Link href="/login">LogOut</Link>
                  </div>
                </div>
              </div>
            </div>
            </>
            )}
            {showUsers && (
              <> 
              <UserContain/>
              <div className='data-card'>
                <div className='row'>
                  <div className='col-4'>
                    <div className='account-card'>
                      <Link href="/">Home</Link>
                    </div>
                  </div>
                  <div className='col-4'>
                    <div className='account-card'>
                      <Link href="/user_dashboard">Profile</Link>
                    </div>
                  </div>
                  <div className='col-4'>
                    <div className='account-card'>
                      <Link href="/login">LogOut</Link>
                    </div>
                  </div>
                </div>
              </div>
              </>
              )
             }

          </>
        ) : (
          <AllTabContain activeTab={activeTab} num={num} userDe={userDe} sellers={seller} buyers={buyer} serviceProviders={serviceProvider} />
        )}


      </div> */}
      {/*     Buyer Dashboard          */}
      <div className='d-sm-none' style={{ marginBottom: '80px' }}>
        {showMenu ? (
          <>
            <div className='container '>
              <div className='row mt-3'>
                <div className='col-6'>
                  <div className='menu-card'>
                    <p>Purchase</p>
                    <img src='purchase.svg' />
                  </div>
                </div>
                <div className='col-6'>
                  <div className='menu-card'>
                    <p>Finance</p>
                    <img src='finance.svg' />
                  </div>
                </div>
              </div>
              
              <div className='data-card'>
                <div className='row'>
                  <div className='col-4'>
                    <div className='account-card'>
                      <Link href="/">Home</Link>
                    </div>
                  </div>
                  <div className='col-4'>
                    <div className='account-card'>
                      <Link href="/user_dashboard">Profile</Link>
                    </div>
                  </div>
                  <div className='col-4'>
                    <div className='account-card'>
                      <Link href="/login">LogOut</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>

        ) : (
          <AllTabContain activeTab={activeTab} num={num} userDe={userDe} sellers={seller}  />
        )}
      </div>
     

    </>

  );
};

export default CommonMobileView;

