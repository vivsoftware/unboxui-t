import React, { useEffect, useState, Suspense } from "react";
import { fetchAPI } from '../../Utils/api'
import { Container, Nav, Row, Navbar, Col } from 'react-bootstrap';
import Image from 'next/image';
import { getStrapiMedia } from "../../Utils/media";
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from "next/link";
const Brandynamic = () => {
    const [brands, setBrands] = useState(null);
    useEffect(() => {
        fetchAPI(`/brands`, {
            populate: "*",
            pagination: {
                start: 0,
                limit: -1,
            },
        }).then((res) => {
            setBrands(res.data);
        });

    }, []);


    return (
        <>
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
        </>
    )
}
export default Brandynamic;
