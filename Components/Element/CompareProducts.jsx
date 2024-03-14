import Router, { useRouter } from 'next/router';
import React, {useState} from 'react';
import { useDispatch } from 'react-redux';


import { GoGraph } from "react-icons/go";
const CompareProducts = ({ elem, staticActions }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const ProductCompare = () => {
    if (elem.attributes.product_type === 'simple') {
      dispatch({ type: 'CHANGECOMPARE', payload: elem });
} else if(elem.attributes.product_type === 'variable') {
  router.push(`/product/product_left_sidebar/${elem.id}`);
    }
  };
  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(true);
  };
  const onLeave = () => {
    setHover(false);
  };
  return (
    <>
    
    <li onClick={ProductCompare}>
      <a href='#javascript'
       onMouseEnter={onHover} 
       onMouseLeave={onLeave}>
      
      { hover ? "Compare" : <GoGraph/> }
      </a>
    </li>
   
    
    </>
    
  );
};

export default CompareProducts;
