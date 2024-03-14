import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Row } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from 'next/link';
import { Form, Button, Col } from 'react-bootstrap';
import { FaPhoneAlt } from "react-icons/fa";
import { useState, useEffect, useRef } from 'react';
import { getStrapiMedia } from '../../Utils/media';
import Image from 'next/image';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import dynamic from 'next/dynamic';
// import Categoriesdynamic from './Categoriesdynamic';
const Dyamicloadcat = dynamic(() => import('./Categoriesdynamic'),
  {
    ssr: false,
    loading: () => <p>Loading...</p>
  })
const NavBar = ({ brands, categories, industries }) => {
  const [show, setShow] = useState(false);
  const [showcat, setShowcat] = useState(false);

  const showDropdown = (e) => {
    setShow(true);
    // setShowcat(true);
  };
  const hideDropdown = () => {
    setShow(false);
    // setShowcat(false);

  };

  const [visible, setVisible] = useState(false);
  const visibleDropdown = (e) => {
    setVisible(true);
  }
  const invisibleDropdown = e => {
    setVisible(false);
  }
  const [industry, setindustry] = useState(false);
  const showindustriesDropdown = (e) => {
    setindustry(true);
  }
  const hideindustriesDropdown = e => {
    setindustry(false);
  }
  const [resources, setResources] = useState(false);
  const showresourcesDropdown = (e) => {
    setResources(true);
  }
  const hideresourcesDropdown = e => {
    setResources(false);
  }
  const [about, setAbout] = useState(false);
  const showaboutDropdown = (e) => {
    setAbout(true);
  }
  const hideaboutDropdown = e => {
    setAbout(false);
  }

  const loader = e => {
    <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-xl-10 col-md-8 col-sm-6'>
          <Navbar expand="lg" className='nav-items' >
            <Container fluid>
              <Navbar.Toggle aria-controls="navbarScroll">
              </Navbar.Toggle>
              <Navbar.Collapse id="navbarScroll">
                <Nav
                  className=""
                  style={{ maxHeight: '100%', }}
                  navbarScroll
                >
                  <Link href="/"><Nav.Link href="/" className='home-mobile'>Home</Nav.Link></Link>
                  <NavDropdown href="/shop"
                    title="Shop"
                    className='nav-items'
                    alignRight
                    show={show}
                    onMouseEnter={showDropdown}
                    onMouseLeave={hideDropdown}>
                    <div className="d-none d-xl-block d-md-none" style={{ marginTop: '0px' }}>
                      <div className="dropdown-columns">
                        <div className="column">
                          <Link href="/shop">
                            <NavDropdown.Item href="/shop" style={{ color: 'black' }}>
                              All Products
                            </NavDropdown.Item>
                          </Link>

                       
                          {categories?.slice(0, 6).map((category) => (

                            <Link href={`/category/${category.id}-${category.attributes.category_slug}`} key={category.id}>
                              <NavDropdown.Item href={`/category/${category.id}-${category.attributes.category_slug}`} >

                                {category.attributes.category_name}
                              </NavDropdown.Item>
                            </Link>
                          ))}

                        </div>
                        <div className="column">
                          {categories?.slice(6, 13).map((category) => (
                            <Link href={`/category/${category.id}-${category.attributes.category_slug}`} key={category.id}>
                              <NavDropdown.Item href={`/category/${category.id}-${category.attributes.category_slug}`}>
                                {category.attributes.category_name}
                              </NavDropdown.Item>
                            </Link>
                          ))}
                        </div>
                        <div className="column">
                          {categories?.slice(13).map((category, index) => (
                            <Link href={`/category/${category.id}-${category.attributes.category_slug}`} key={category.id}>
                              <NavDropdown.Item
                                href={`/category/${category.id}-${category.attributes.category_slug}`}
                                style={index === 0 ? { marginTop: 0 } : {}}
                              >
                                {category.attributes.category_name}
                              </NavDropdown.Item>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="d-block d-xl-none d-md-block">
                      {/* For smaller devices, display dropdown options in a single column */}
                      <Row >
                        <Link href='/shop'><NavDropdown.Item href='/shop'>All Products</NavDropdown.Item></Link>
                        {categories?.slice(0, 13).map((category) => {
                          return (
                            <Col xs={12} >
                              <Link href={`/category/${category.id}-${category.attributes.category_slug}`}><NavDropdown.Item href={`/category/${category.id}-${category.attributes.category_slug}`} >
                                {category.attributes.category_name}</NavDropdown.Item></Link>
                            </Col>
                          )
                        })}
                      </Row>
                    </div>
                  </NavDropdown>
                  <NavDropdown href="/layout/brands"
                    title="Brands"
                    id="navbarDropdown"
                    className='nav-items'
                    show={visible}
                    onMouseEnter={visibleDropdown}
                    onMouseLeave={invisibleDropdown}>
                    <div className="d-none d-xl-block d-md-none">
                      <div className="dropdown-columns">
                        <div className="column">
                          <Link href={`/brands`}>
                            <NavDropdown.Item href={`/brands`}>All Brands</NavDropdown.Item>
                          </Link>
                          {brands?.slice(0, 6).map((brand) => (
                            <Link href={`/brand/${brand.id}-${brand.attributes.brand_slug}`} key={brand.id}>
                              <NavDropdown.Item href={`/brand/${brand.id}-${brand.attributes.brand_slug}`}>
                                <Image className="me-1" src={getStrapiMedia(brand.attributes.brand_image)} width={50} height={50} />
                                {brand.attributes.brand_name}
                              </NavDropdown.Item>
                            </Link>
                          ))}
                        </div>
                        <div className="column">
                          {brands?.slice(6, 13).map((brand) => (
                            <Link href={`/brand/${brand.id}-${brand.attributes.brand_slug}`} key={brand.id}>
                              <NavDropdown.Item href={`/brand/${brand.id}-${brand.attributes.brand_slug}`}>
                                <Image className="me-1" src={getStrapiMedia(brand.attributes.brand_image)} width={50} height={50} />
                                {brand.attributes.brand_name}
                              </NavDropdown.Item>
                            </Link>
                          ))}
                        </div>
                        <div className="column">
                          {brands?.slice(13, 20).map((brand) => (
                            <Link href={`/brand/${brand.id}-${brand.attributes.brand_slug}`} key={brand.id}>
                              <NavDropdown.Item href={`/brand/${brand.id}-${brand.attributes.brand_slug}`}>
                                <Image className="me-1" src={getStrapiMedia(brand.attributes.brand_image)} width={50} height={50} />
                                {brand.attributes.brand_name}
                              </NavDropdown.Item>
                            </Link>
                          ))}
                        </div>
                        <div className="column">
                          {brands?.slice(20, 27).map((brand) => (
                            <Link href={`/brand/${brand.id}-${brand.attributes.brand_slug}`} key={brand.id}>
                              <NavDropdown.Item href={`/brand/${brand.id}-${brand.attributes.brand_slug}`}>
                                <Image className="me-1" src={getStrapiMedia(brand.attributes.brand_image)} width={50} height={50} />
                                {brand.attributes.brand_name}
                              </NavDropdown.Item>
                            </Link>
                          ))}
                        </div>

                      </div>
                    </div>
                    <div className="d-block d-xl-none d-md-block brands-height">
                      {/* For smaller devices, display dropdown options in a single column */}
                      <Row >
                        <Link href={`/brands`}><NavDropdown.Item href={`/brands`}>All Brands</NavDropdown.Item></Link>
                        {brands?.slice(0, 27).map((brand) => {
                          return (
                            <Col xs={12} >
                              <Link href={`/brand/${brand.id}-${brand.attributes.brand_slug}`}><NavDropdown.Item href={`/brand/${brand.id}-${brand.attributes.brand_slug}`}><Image className='me-1' src={getStrapiMedia(brand.attributes.brand_image)} width={50} height={50}></Image>{brand.attributes.brand_name}</NavDropdown.Item></Link>
                            </Col>
                          )
                        })}
                      </Row>
                    </div>
                  </NavDropdown>
                  <NavDropdown
                    title="Industries"
                    id="navbarDropdown"
                    className='nav-items'
                    show={industry}
                    onMouseEnter={showindustriesDropdown}
                    onMouseLeave={hideindustriesDropdown}>
                    <Link href="/industries/All"><NavDropdown.Item href="/industries/All">Industrial Solutions</NavDropdown.Item></Link>
                    {
                      industries?.map((elem) => {
                        return (
                          <Link href={`/industries/${elem.id}-${elem.attributes.CardTitle}`}><NavDropdown.Item href={`/industries/${elem.id}-${elem.attributes.CardTitle}`}>
                            {elem.attributes.CardTitle}
                          </NavDropdown.Item></Link>
                        )
                      })
                    }


                  </NavDropdown>
                  <NavDropdown
                    title="Resources"
                    id="navbarDropdown"
                    className='nav-items'
                    show={resources}
                    onMouseEnter={showresourcesDropdown}
                    onMouseLeave={hideresourcesDropdown}>
                    <Link href="/faq"> <NavDropdown.Item href="/faq">FAQs</NavDropdown.Item></Link>
                    <Link href="#"><NavDropdown.Item href="/layout/UnboxVideos">Unbox Videos</NavDropdown.Item></Link>
                    <Link href="/admin-dashboard"><NavDropdown.Item href="/admin-dashboard">Case Studies</NavDropdown.Item></Link>
                  </NavDropdown>
                  <NavDropdown
                    title="About Us"
                    id="navbarDropdown"
                    className='nav-items'
                    show={about}
                    onMouseEnter={showaboutDropdown}
                    onMouseLeave={hideaboutDropdown}>
                    <Link href="/about-us"><NavDropdown.Item href="/about-us">About Us</NavDropdown.Item></Link>
                    <Link href="/contact-us"><NavDropdown.Item href="/contact-us">Contact Us</NavDropdown.Item></Link>
                    <Link href="/blogs"><NavDropdown.Item href="/blogs">Blogs</NavDropdown.Item></Link>
                  </NavDropdown>
                </Nav>

              </Navbar.Collapse>

            </Container>
          </Navbar>
        </div>
        <div className='col-xl-2 col-md-4 col-sm-6 phone-number'>
          <span style={{ color: '#FF8400', marginTop: '13px' }}> <FaPhoneAlt className='me-1' />0124 414 8999</span>
        </div>
      </div>

    </div>
  );
}

export default NavBar;



