/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Table } from 'reactstrap';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Brand, CommonPath, ContinueShopping, CustomerRating, DateFirstAvailable, Department, GenericName, Manufacturer, OFF } from '../../Constant';
import { Btn } from '../../AbstractElements';
import CompareAction from './CompareAction';
import { getStrapiMedia } from '../../../Utils/media';
import { auth } from '../../../Config/firebase';

const CompareTable = () => {
  const router = useRouter();
  const [comapreData, setComapreData] = useState([]);
  const { compareProducts } = useSelector((state) => state.CompareReducer);
  const { symbol, currencyValue } = useSelector((state) => state.CurrencyReducer);
  const [user, setuser] = useState(false);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setuser(user);
    });
  }, []);
  useEffect(() => {
    setComapreData(compareProducts);
  }, [compareProducts]);

  const numberWithCommas = (x) => {
    return x.toLocaleString("en-IN");
  };

  const formatPrice = (price) => {
    return `${numberWithCommas(price)}`;
  };

  return (
    <section>
      <Container>
        <Row className='justify-content-center'>
          {comapreData.length > 0 ? (
            <Col xs='12'>
              <div className='comparemodal-body'>
                <div className='table-wrapper table-responsive ratio_asos'>
                  <Table className='table-striped-1'>
                    <tbody>
                      <tr className='table-product-details'>
                        <td></td>
                        {comapreData?.map((elem, i) => (
                          <td key={i}>
                            <div className='product-box'>
                              <div className='product-image'>
                                <a className='w-100 bg-size'>
                                  <img src={`${getStrapiMedia((elem.attributes?.product_display ? elem.attributes.product_display : elem.product.attributes.product_display))}`} className='img-fluid' alt='custom' key={elem.id} />
                                </a>
                              </div>
                              <div className='product-details'>
                                <div>
                                  <a href='#javascript'>
                                    <h6 className='fw-bold'>{(elem.attributes.product_name ? elem.attributes.product_name : elem.attributes.variation_name)}</h6>
                                  </a>
                                </div>
                                <div className='price-details mt-2'>
                                  {user ? (
                                    <h6 className='font-green'>
                                       {symbol}{formatPrice(((elem.attributes.product_price || elem.attributes.variation_price) * currencyValue.toFixed(2)))}
                                    </h6>
                                  ) : (
                                    <h6 style={{ color: "red" }}>
                                      Login for Price
                                    </h6>
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>
                        ))}
                      </tr>
                      <CompareAction comapreData={comapreData} setComapreData={setComapreData} />
                      {
                        comapreData[0].attributes.Specifications?.length ? (
                          Object.keys(comapreData[0].attributes.Specifications[0])
                            .slice(2) // Remove the first two rows
                            .map((title) => (
                              <tr key={title}>
                                <td>{title.replace(/_/g, ' ')}</td> {/* Replace underscores with spaces */}
                                {comapreData.map((elem) => (
                                  <td key={elem.id}>{elem.attributes?.Specifications[0]?.[title]}</td>

                                ))}
                              </tr>
                            ))
                        ) : (
                          <p>NO Specification Data available</p>
                        )
                      }
                    </tbody>
                  </Table>
                </div>
              </div>
            </Col>
          ) : (
            <Col xs='9' sm='3'>
              <img src={'../assets/images/empty-compare.png'} className='w-100 mb-3' alt='empty' />
              <div className='w-100 text-center'>
                <h5 className='text-center mb-3'>
                  Compare List is Empty!! <p>Let's add some products to Compare List!</p>
                </h5>
                <Btn attrBtn={{ className: 'btn-solid-default', onClick: () => router.push('/shop') }}>{ContinueShopping}</Btn>
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </section>
  );
};

export default CompareTable;
