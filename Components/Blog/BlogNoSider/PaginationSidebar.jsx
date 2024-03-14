import React from 'react';

const PaginationSidebar = ({ totalBlogs, blogsPerPage, currentPage, setCurrentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalBlogs / blogsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map((number) => (
          <li key={number} className='page-item'>
            <button
              className={`page-link ${currentPage === number ? 'active' : ''}`}
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PaginationSidebar;
