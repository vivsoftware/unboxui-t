import React from 'react'
import { Card } from 'reactstrap'

const SILoader = () => {
    return (
        <>
         <div className='d-none d-xl-block d-md-block d-sm-none'>
            <Card className='rfq-loading'>
                <div className='image'><img src='si.svg' style={{ width: '250px', height: '250px' }} alt='SI'/></div>
            </Card>
        </div>
        <div className='d-block d-xl-none d-md-none d-sm-block'>
            <Card className='rfq-loading'>
                <div className='image'><img src='si.svg' style={{ width: '150px', height: '100px' }} alt='SI'/></div>
            </Card>
        </div>
        </>
    )
}

export default SILoader
