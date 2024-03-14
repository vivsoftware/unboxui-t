import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import PaginationComp from '../../Components/Element/Pagination';
import AllProducts from '../../Components/Shop/ShopCanvasFilter/AllProducts';
import SidebarFilter from '../../Components/Shop/ShopLeftSidebarContain/SidebarFilter';
import SearchBannerDetails from '../../Components/Shop/SearchBannerDetails';

const SearchLeftSidebarContain = ({ productData, listGrid , products}) => {

  const StoreProducts = products && products;
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(12);
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
      <div className='container-fluid'>
        <Row>
          <SidebarFilter productData={productData} products={products}/>
          <Col lg='9' xs='12' className='ratio_30'>
            <SearchBannerDetails />
            <AllProducts currentData={currentData} />
            <PaginationComp dataPerPage={dataPerPage} StoreProductLength={StoreProducts?.length} currentPage={currentPage} paginate={paginate} />
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default SearchLeftSidebarContain;
