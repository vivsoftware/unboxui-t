
import React, { useState } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const PaginationComp = ({ StoreProductLength, dataPerPage, paginate, currentPage, addClass }) => {
  const [visiblePages, setVisiblePages] = useState([]);

  const handlePageChange = (page) => {
    if (page < 1 || page > Math.ceil(StoreProductLength / dataPerPage)) {
      return;
    }

    paginate(page);
    const visiblePageNumbers = calculateVisiblePages(page);
    setVisiblePages(visiblePageNumbers);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  const calculateVisiblePages = (currentPage) => {
    const visiblePageNumbers = [];
    const totalVisiblePages = 3;

    const totalPages = Math.ceil(StoreProductLength / dataPerPage);

    if (totalPages <= totalVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        visiblePageNumbers.push(i);
      }
    } else {
      let startPage = Math.max(currentPage - Math.floor(totalVisiblePages / 2), 1);
      let endPage = Math.min(startPage + totalVisiblePages - 1, totalPages);

      if (endPage - startPage < totalVisiblePages - 1) {
        startPage = endPage - totalVisiblePages + 1;
      }

      for (let i = startPage; i <= endPage; i++) {
        visiblePageNumbers.push(i);
      }
    }

    return visiblePageNumbers;
  };


  const pageNumber = calculateVisiblePages(currentPage);

  return (
    <nav className={`page-section ${addClass ? addClass : ''}`}>
      <Pagination className="pagination-wrapper">
        
        <PaginationItem disabled={currentPage === 0}>
          <PaginationLink onClick={() => handlePageChange(currentPage - 1)} >Prev</PaginationLink>
        </PaginationItem>



        {pageNumber[0] > 1 && (
          <>
            <PaginationItem onClick={() => handlePageChange(1)}>
              <PaginationLink>1</PaginationLink>
            </PaginationItem>
            {pageNumber[0] > 2 && <span>...</span>}
          </>
        )}

        {pageNumber.map((number, i) => {
          return (
            <PaginationItem
              className={`${currentPage === number ? 'active' : ''}`}
              onClick={() => handlePageChange(number)}
              key={i}
            >
              <PaginationLink>{number}</PaginationLink>
            </PaginationItem>
          );
        })}

        {pageNumber[pageNumber.length - 1] < Math.ceil(StoreProductLength / dataPerPage) && (
          <>
            {pageNumber[pageNumber.length - 1] < Math.ceil(StoreProductLength / dataPerPage) - 1 && <span>...</span>}
            <PaginationItem onClick={() => handlePageChange(Math.ceil(StoreProductLength / dataPerPage))}>
              <PaginationLink>{Math.ceil(StoreProductLength / dataPerPage)}</PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem disabled={currentPage === Math.ceil(StoreProductLength / dataPerPage)}>
          <PaginationLink onClick={() => handlePageChange(currentPage + 1)} >Next</PaginationLink>
        </PaginationItem>
      </Pagination>
    </nav>
  );
};

export default PaginationComp;
