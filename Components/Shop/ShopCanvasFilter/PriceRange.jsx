import React, { useEffect, useState } from 'react';
import { getTrackBackground, Range } from 'react-range';
import { useDispatch } from 'react-redux';
import { AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap';
import { Prices } from '../../Constant';

const PriceRange = ({ products }) => {
  const dispatch = useDispatch();
  const [priceRate, setPriceRate] = useState([]);
  const [values1, setValues1] = useState([]);
  const MIN = priceRate?.sort((a, b) => a - b)[1];
  const MAX = priceRate?.sort((a, b) => a - b)[priceRate.length - 1];

  useEffect(() => {
    if (products) {
      const priceArr = products.map((curElem) => curElem.attributes.product_price);
      setPriceRate(priceArr);
    }

    if (MIN && MAX) {
      setValues1([MIN, MAX]); // Set initial range values
      dispatch({ type: 'PRICEFILTER', payload: [MIN, MAX] });
    }
  }, [products, MIN, MAX]);

  const handleChange = (val) => {
    setValues1(val);
    dispatch({ type: 'PRICEFILTER', payload: val });
  };

  return (
    <AccordionItem className='category-price'>
      <AccordionHeader targetId='3'>{Prices}</AccordionHeader>
      <AccordionBody accordionId='3'>
        <div
          className='range-category'
          style={{
            display: 'flex',
            // colors: '#111',
            color: '#111',

            justifyContent: 'center',
            flexWrap: 'wrap',
            margin: '1em',
          }}
        >
          <Range
            values={values1}
            step={1} // Adjust the step value according to your needs
            min={MIN}
            max={MAX}
            onChange={(values) => handleChange(values)}
            renderTrack={({ props, children }) => (
              <div
                onMouseDown={props.onMouseDown}
                onTouchStart={props.onTouchStart}
                style={{
                  ...props.style,
                  height: '8px', // Adjust track height
                  width: '100%',
                }}
              >
                <div
                  ref={props.ref}
                  style={{
                    height: "8px",
                    width: "100%",
                    // borderRadius: "4px",
                    background: getTrackBackground({
                      values: values1,
                      colors: ["#ff8400", "#ff8400", "#ff8400"],
                      min: MIN,
                      max: MAX,
                    }),
                    alignSelf: "center",
                  }}
                >
                  {children}
                </div>
              </div>
            )}
            renderThumb={({ index, props, isDragged }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: '30px', // Adjust thumb height
                  width: '30px', // Adjust thumb width
                  borderRadius: '0%',
                  backgroundColor: isDragged ? '#ff8400' : '#ff8400',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  // boxShadow: '2px 6px 6px #ff8400',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '-28px',
                    color: '#111',
                    fontWeight: 'bold',
                    fontSize: '18px', // Adjust font size
                    fontFamily: 'Arial, sans-serif',
                    padding: '0.2px 6px',
                  }}
                >
                  {values1[index]}
                </div>
              </div>
            )}
          />
        </div>
      </AccordionBody>
    </AccordionItem>
  );
};

export default PriceRange;
