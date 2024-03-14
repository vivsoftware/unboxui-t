import { useRouter } from 'next/router';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { fetchAPI } from '../../../Utils/api';
import { CustomersAlsoBoughtThese } from '../../Constant';
import ArrivalCards from '../../FashionDemo/FashionNewArrival/ArrivalCards';

const ProductSection = ({ productData }) => {
  const [category,setCategory] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    id && fetchAPI(`/products/${id}`,{
      populate: '*',
    }).then((res)=>{
      fetchAPI(`/categories/${res.data.attributes.category.data.id}`,
        {
          populate: {
            products: {
              populate: '*',
            }
        }
      }
      ).then((res)=>{
        setCategory(res.data.attributes.products.data)
      })
    });
}, [router]);

  return (
    <section className='ratio_asos section-b-space overflow-hidden'>
      <div className='container-fluid'>
        <Row>
          <Col xs='12' >
            <h2 className='mb-lg-4 mb-3'>{CustomersAlsoBoughtThese}</h2>
            <ArrivalCards productData={category} />
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default ProductSection;
