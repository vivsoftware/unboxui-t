import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AccordionBody, AccordionHeader, AccordionItem, Label } from 'reactstrap';


const CategoryFilter = ({ productData, products }) => {
  const [allCategory, setAllCategory] = useState(['All']);
  const { category } = useSelector((state) => state.ProductFilter);
  const dispatch = useDispatch();
  useEffect(() => {
    products?.map((el) => setAllCategory((prev) => Array.from(new Set([...prev, el?.attributes.category.data?.attributes.category_name]))));
  }, [products]);
  const handleChange = (event) => {
    dispatch({ type: 'CATEGORYFILTER', payload: { checked: event.target.checked, value: event.target.value } });
  };

  return (
    <AccordionItem className='category-rating'>
      <AccordionHeader id='headingOne' targetId='4'>
       Categories
      </AccordionHeader>
      <AccordionBody accordionId='4' className='category-scroll'>
        <ul className='category-list'>
          {allCategory &&
            allCategory.map((elem, i) => {
              return (
                <li key={i}>
                  <div className='form-check p-0 custome-form-check'>
                    <input className='checkbox_animated check-it' type='checkbox' id={elem} value={elem} checked={category.includes(elem)} onChange={(e) => handleChange(e)} />
                    <Label className='form-check-label' htmlFor={elem}>
                      {elem}
                    </Label>
                    <p className='font-light'></p>
                  </div>
                </li>
              );
            })}
        </ul>
      </AccordionBody>
    </AccordionItem>
  );
};

export default CategoryFilter;
