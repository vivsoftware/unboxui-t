import { useEffect, useState } from 'react';
import Slider from 'react-slick'
import { Col, Container, Row } from 'reactstrap';
import { FlowerBrandSlider } from '../../Data/SliderSettingsData';
import { fetchAPI } from '../../Utils/api';
import { getStrapiMedia } from '../../Utils/media';
import Image from 'next/image';
import Link from 'next/link';
import SkeletonLoader from '../Element/SkeletonLoader';
const Customers = () => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
  
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }, []);
  
    const [customerData, setCustomerData] = useState([]);
    useEffect(() => {
          fetchAPI(`/customers`,{
            populate: '*',
          }).then((res)=>{
            setCustomerData(res.data);
          });
      }, []);

    return (

        <section className="section-b-space ">
            <Container className='home-page'>
                <Row>
                    <h2 className='text-center mt-5 mb-3 '>Our Customers</h2>
                    <Col>
                        <div className="brand-slider">
                            <Slider {...FlowerBrandSlider}>
                                {
                                    customerData?.map((elem) => {
                                        return (
                                            <div key={elem.id}>
                                                <div className="brand-image">
                                                    {/* <Link href={`/brand/${elem.id}-${elem.attributes.brand_name}`}> */}
                                                    {isLoading?(
                                                        <SkeletonLoader/>
                                                    ):(
                                                        <Image src={getStrapiMedia(elem.attributes.company_logo)} className='img-fluid' width={200} height={100} alt={elem.attributes.company_name} />

                                                    )}
                                                    {/* </Link> */}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Slider>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Customers;