import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AccordionBody, AccordionHeader, AccordionItem, Input, Label } from 'reactstrap';
import { Brand } from '../../Constant';

const BrandFilterDropdown = ({ productData, products }) => {
  const dispatch = useDispatch();
  const BrandFilter = [...new Set([...(products?.map((elem) => elem.attributes.brand.data?.attributes?.brand_name) ?? [])])];
  const { brand } = useSelector((state) => state.ProductFilter);

  useEffect(() => {
    const autoSelectAll = () => {
      const allCheckboxes = document.querySelectorAll('.checkbox_animated');
      allCheckboxes.forEach((checkbox) => {
        checkbox.checked = true; 
        dispatch({ type: 'BRANDFILTER', payload: { checked: true, value: checkbox.value } });
      });
    };

    autoSelectAll();
  }, []);

  const handleBrandChange = (e) => {
    const { checked, value } = e.target;
    dispatch({ type: 'BRANDFILTER', payload: { checked, value } });
  };

  return (
    <AccordionItem className='category-rating'>
      <AccordionHeader targetId='1'>{Brand}</AccordionHeader>
      <AccordionBody accordionId='1' className='category-scroll'>
        <ul className='category-list'>
          {Array.isArray(BrandFilter) && BrandFilter.map((elem, i) => (
            <Fragment key={i}>
              {elem !== 'none' && (
                <li>
                  <div className='form-check custome-form-check'>
                    <Input
                      className='checkbox_animated check-it'
                      type='checkbox'
                      id={elem}
                      value={elem}
                      checked={brand.includes(elem)}
                      onChange={(e) => handleBrandChange(e)}
                    />
                    <Label className='form-check-label' htmlFor={elem}>
                      {elem}
                    </Label>
                   
                  </div>
                </li>
              )}
            </Fragment>
          ))}
        </ul>          
      </AccordionBody>
    </AccordionItem>
  );
};

export default BrandFilterDropdown;

