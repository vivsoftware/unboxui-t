import React from 'react'
import Layout4 from '../../Layout/Layout4'
import ShopCanvasFilterContain from '../../Components/Shop/ShopCanvasFilter/index'
import AllProducts from '../../Components/Shop/ShopCanvasFilter/AllProducts'
import BrandFilterDropdown from '../../Components/Shop/ShopCanvasFilter/BrandFilterDropdown'
import ShopLeftSidebarContain from './Shop'



const allProducts = () => {
  return (
    <div>
      <Layout4>
        <ShopLeftSidebarContain />
      </Layout4>
    </div>
  )
}

export default allProducts
