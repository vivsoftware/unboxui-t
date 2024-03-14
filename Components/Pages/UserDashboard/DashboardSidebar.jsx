import React, { Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import UserNav from './UserNav';
import { User } from 'react-feather';

const DashboardSidebar = (user) => {
  return (
    <Fragment>
      <section className='section-b-space'>
        <Container>
          <Row>
            <UserNav user={user} />
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};

export default DashboardSidebar;
