import React, { useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import useFilter from '../../../Utils/useFilter';
import PaginationComp from '../../Element/Pagination';
import AllProducts from '../ShopCanvasFilter/AllProducts';
import FilterButton from '../ShopCanvasFilter/FilterButton';
import FilterContent from '../ShopCanvasFilter/FilterContent';
import ShopBannerDetails from '../ShopCanvasFilter/ShopBannerDetails';

const ShopNoSidebarContain = ({ productData }) => {
  const grid5 = true;
  const filterProduct = useFilter(productData);
  const StoreProducts = filterProduct && filterProduct;
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);
  const indexOfLastPost = currentPage * dataPerPage;
  const indexOfFirstPost = indexOfLastPost - dataPerPage;
  const currentData = StoreProducts && StoreProducts?.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber < currentData?.length) {
      setCurrentPage(pageNumber);
    }
  };
  return (
    <section className='section-b-space'>
      <Container>
        <Row>
          <Col lg='12' xs='12' className='ratio_30'>
            <ShopBannerDetails />
            <FilterButton customClass={'filter-button mb-3'} />
            <FilterContent grid5={grid5} />
            <AllProducts currentData={currentData} />
            <PaginationComp dataPerPage={dataPerPage} StoreProductLength={StoreProducts?.length} currentPage={currentPage} paginate={paginate} />
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default ShopNoSidebarContain;
