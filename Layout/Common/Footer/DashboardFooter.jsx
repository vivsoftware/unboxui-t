import React from 'react'
import { Container, Row, Col } from 'reactstrap'

const DashboardFooter = () => {
    return (
        <>
        <div className='d-none d-xl-block d-md-block d-sm-none'>
            <footer className='footer-sm-space'>
                <div className='sub-footer'style={{borderTop:'1px solid #ddd',marginTop:'10px'}}>
                    <Container >
                        <Row className='gy-3'>
                            <Col xl='12' lg='12' md='12' sm='12' >
                                <p className='text-center'>© 2023 Unbox Industry. All Rights Reserved  </p>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </footer>
            </div>
            
        </>
    )
}

export default DashboardFooter
