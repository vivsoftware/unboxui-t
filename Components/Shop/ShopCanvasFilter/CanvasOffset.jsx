import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Offcanvas, OffcanvasBody } from 'reactstrap';
import { Btn } from '../../AbstractElements';
import { Close } from '../../Constant';
import FilterOptions from './FilterOptions';

const CanvasOffset = ({ productData , products }) => {
  const { offset } = useSelector((state) => state.ModalReducer);
  const dispatch = useDispatch();
  const toggle = () => {
    dispatch({
      type: 'IS_OFFSET',
    });
    dispatch({
      type: 'OVERLAY',
    });
  };
  return (
    <Offcanvas className='offcanvas custome-offcanvas offcanvas-start' isOpen={offset} toggle={toggle} tabIndex='-1' id='offcanvasExample' aria-labelledby='offcanvasExampleLabel'>
      <OffcanvasBody>
        <div data-bs-dismiss='offcanvas' aria-label='Close' className='offcanvas-header'>
          <h5 className='offcanvas-title' id='offcanvasExampleLabel'>
            {Close}
          </h5>
          <Btn attrBtn={{ type: 'button', className: 'btn-close text-reset', onClick: toggle }}></Btn>
        </div>
        <div className='category-option'>
        <FilterOptions productData={productData} products={products}/>
        </div>
      </OffcanvasBody>
    </Offcanvas>
  );
};

export default CanvasOffset;
