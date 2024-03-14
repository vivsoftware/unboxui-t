import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import useFilter from '../../Utils/useFilter';
import PaginationComp from '../../Components/Element/Pagination';
import AllProducts from '../../Components/Shop/ShopCanvasFilter/AllProducts';
import FilterButton from '../../Components/Shop/ShopCanvasFilter/FilterButton';
import FilterContent from '../../Components/Shop/ShopCanvasFilter/FilterContent';
import ShopBannerDetails from '../../Components/Shop/ShopCanvasFilter/ShopBannerDetails';
import SidebarFilter from '../../Components/Shop/ShopLeftSidebarContain/SidebarFilter';

const ShopLeftSidebarContain = ({ productData, listGrid, products, fetchProducts, show }) => {
  const filterProduct = useFilter(products);
  const StoreProducts = filterProduct && filterProduct;
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(25);
  const indexOfLastPost = currentPage * dataPerPage;
  const indexOfFirstPost = indexOfLastPost - dataPerPage;
  // const currentData = StoreProducts && StoreProducts?.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => {
    const totalPages = Math.ceil(StoreProducts?.length / dataPerPage);
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  const handlePageChange = (page) => {
    // Update the current page and fetch products for the new page
    setCurrentPage(page);
    fetchProducts(page);
  };
  const totalPages = Math.ceil(productData / 25);
  return (
    <section className='section-b-space'>
      <div className='container-fluid'>
        <Row>
          {/* <SidebarFilter productData={productData} products={products} /> */}
          <Col lg='12' xs='12' className='ratio_30'>
            {/* <FilterButton customClass={'filter-button mb-3'} productData={productData} products={filterProduct} /> */}
            <AllProducts currentData={products} />
            {/* <PaginationComp dataPerPage={dataPerPage} StoreProductLength={StoreProducts?.length} currentPage={currentPage} paginate={paginate} /> */}
          </Col>
        </Row>
      </div>
    </section>
  );
};
export default ShopLeftSidebarContain;
