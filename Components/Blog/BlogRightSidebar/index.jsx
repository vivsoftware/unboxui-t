import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import { getAllUsers } from '../../../Service/FetchApi';
import LeftSidebar from '../BlogDetails/LeftSidebar';
import PaginationSidebar from '../BlogNoSider/PaginationSidebar';
import RigthSidebarCard from './RigthSidebarCard';

const BlogRightSidebarContain = () => {
  const dispatch = useDispatch();
  const types = 'GETBLOGDATA';
  const { Blogdatanew } = useSelector((state) => state.BlogReducer);
  useEffect(() => {
    !Blogdatanew && dispatch(getAllUsers('blog', types));
  }, []);
  const BlogDataFilter = Blogdatanew && Blogdatanew.filter((el) => el.type === 'blogcard');
  return (
    <section className='left-sidebar-section masonary-blog-section section-b-space'>
      <Container>
        <Row className='g-4'>
          <Col lg='9' md='7' className='ratio3_2'>
            <RigthSidebarCard BlogDataFilter={BlogDataFilter} />
            <PaginationSidebar />
          </Col>
          <LeftSidebar />
        </Row>
      </Container>
    </section>
  );
};

export default BlogRightSidebarContain;
