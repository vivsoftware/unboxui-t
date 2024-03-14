import React from 'react'
import { Card } from 'reactstrap';

const RFQLoader = () => {
    return (
        <>
         <div className='d-none d-xl-block d-md-block d-sm-none'>
            <Card className='rfq-loading'>
                <div className='image'><img src='rfq.svg' style={{ width: '250px', height: '250px' }} alt='RFQ'/></div>
            </Card>
        </div>
        <div className='d-block d-xl-none d-md-none d-sm-block'>
            <Card className='rfq-loading'>
                <div className='image'><img src='rfq.svg' style={{ width: '150px', height: '100px' }} alt='RFQ' /></div>
            </Card>
        </div>
        </>
       
    )
}

export default RFQLoader
