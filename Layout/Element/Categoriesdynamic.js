import React, { useEffect, useState } from "react";
import { fetchAPI } from '../../Utils/api';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from "next/link";

const Categoriesdynamic = () => {
    const [categories, setCategories] = useState(null);
    const [brands, setBrands] = useState(null);
    const [industries, setIndustries] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchAPI(`/categories`, {
                    populate: "*",
                    pagination: {
                        start: 0,
                        limit: -1,
                    },
                });
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
    
        fetchData();
    }, []);
    if (!categories) {
        return (
          <>
            {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}> */}
              <div className='text-center'>
                {/* <Image src="/Logofinal.svg" width={200} height={64} className="mobile-logo" /> */}
                <p style={{ marginLeft: "20px" }}>Please Wait.....</p>
    
              </div>
            {/* </div> */}
          </>
        )
      }
    // Empty dependency array indicates that this effect runs once on component mount

    return (
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
                            <NavDropdown.Item href={`/category/${category.id}-${category.attributes.category_slug}`}>
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
    );
}

export default Categoriesdynamic;
