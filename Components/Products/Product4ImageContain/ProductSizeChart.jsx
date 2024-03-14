import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ProductSizeChart = ({ variations, singleProduct, setPayload, payload }) => {
  const check = payload ? 'pointer' : 'not-allowed';
  const [count, setCount] = useState(1);
  const [sizes, setSizes] = useState('');
  const [isShown, setIsShown] = useState(false);
  const dispatch = useDispatch();
  const { quantity } = useSelector((state) => state.AddToCartReducer);
  const [isChecked, setIsChecked] = useState(false);
  const [active, setActive] = useState(null);
  const [activePayload, setActivePayload] = useState(null);

  const handleClick = (el) => {
    setActivePayload(activePayload === el ? null : el);
  };

  useEffect(() => {
    payload && handleQtyChange(count, payload.id, (payload.data?.attributes.product_price ? payload.data.attributes.product_price : payload.product_price));
  }, [count]);

  function handleQtyChange(qty, id, price) {
    dispatch({ type: 'QUANTITY', payload: { qty, id, price } });
  }
  console.log('gjkot', singleProduct);
  return (
    <div id='selectSize' className='addeffect-section product-description border-product'>
      <div className='row'>
        <div className='container'>

          <div className='row'>
            <p dangerouslySetInnerHTML={{ __html: singleProduct.attributes.product_short_description }}></p>
          </div>
        </div>

      </div>
      <h3 className='product-title size-text fw-bold mt-4'>{singleProduct?.attributes.variations?.data.length != 0 && 'Select Variant'}</h3>


      <div className='size-box' style={{ marginTop: '-12px' }}>
        <ul>
          {singleProduct?.attributes.variations.data?.map((el, i) => (
            <li
              key={i}
              onClick={() => handleClick(el)}
              className={activePayload === el ? 'active' : ''}
            >

              <a>{el.attributes.variation_name}</a>

            </li>

          ))}
        </ul>
      </div>
      <div className='row'>
        <div className='col-md-12 mt-5' onClick={() => {
          // Call dispatch here
          if (isChecked) {
            dispatch({ type: 'REMOVEFROMCOMPARE', payload: payload });
          } else {
            payload && dispatch({ type: "CHANGECOMPARE", payload: payload });
          }
        }}>
          <input
            type='checkbox'
            width={30}
            height={30}
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            style={{ cursor: check }}
          />
          <label className='ms-2'>Add to Compare</label>
        </div>
      </div>

    </div>
  );
};
export default ProductSizeChart;
