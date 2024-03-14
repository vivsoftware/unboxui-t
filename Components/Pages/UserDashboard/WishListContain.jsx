/* eslint-disable react/no-unescaped-entities */
import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import { Btn } from '../../AbstractElements';
import { ContinueShopping } from '../../Constant';
import { WishlistColumns, WishlistData } from '../../../Data/WishlistData';
import { MyWishlist } from '../../Constant';
import WishlistDataList from '../WishList/WishlistDataList';
import DataTables from '../../Element/DataTable';

const WishListContain = () => {
  const [wishlistData, setWishlistData] = useState([]);
  const router = useRouter();
  const { wishlist } = useSelector((state) => state.AddToCartReducer);
  useEffect(() => {
    setWishlistData(wishlist);
  }, [wishlist]);
  return (
    <Fragment>
      <div className='box-head mb-3'>
        <h3>{MyWishlist}</h3>
      </div>
      <section className='wish-list-section section-b-space'>
        <Container>
          <Row className='justify-content-center'>
            {wishlistData.length > 0 ? (
              <Col sm='12' className='table-responsive'>
                <WishlistDataList wishlistData={wishlistData} />
              </Col>
            ) : (
              <Col sm='3' xs='9' className='mx-auto'>
                <img src='/assets/images/wishlistEmpty.png' className='img-fluid mb-3' alt='wishlist empty' />
                <div className='w-100 text-center'>
                  <h5 className='text-center mb-3'>Wishlist is empty! No products were added to the Wish List</h5>
                  <Btn attrBtn={{ className: 'btn-solid-default', onClick: () => router.push('/shop') }}>{ContinueShopping}</Btn>
                </div>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};

export default WishListContain;
