import React, { useState } from 'react';
import { Accordion, UncontrolledAccordion } from 'reactstrap';
import BrandFilterDropdown from './BrandFilterDropdown';
import PriceRange from './PriceRange';
import CategoryFilter from './CategoryFilter';


const FilterOptions = ({ productData , products}) => {
  const [open, setOpen] = useState('1');
  const toggle = (id) => {
    if (open === id) {
      setOpen('1');
    } else {
      setOpen(id);
    }
  };
  return (
    <Accordion open={open} className='category-name' toggle={toggle}>
      <UncontrolledAccordion defaultOpen={['1', '2', '3', '4', '5']} stayOpen>
        <BrandFilterDropdown productData={productData} products={products}/>
        <PriceRange products={products}/>
        <CategoryFilter productData={productData} products={products}/>
      </UncontrolledAccordion>
    </Accordion>
  );
};

export default FilterOptions;
