import React from 'react';
import { AlignLeft } from 'react-feather';
import { useDispatch } from 'react-redux';
import { Filter } from '../../Constant';
import { Btn } from '../../AbstractElements';

const FilterButton = ({ customClass, }) => {
  const dispatch = useDispatch();
  const toggle = () => {
    dispatch({
      type: 'IS_OFFSET',
    });
    dispatch({
      type: 'OVERLAY',
      payload: false,
    });
  };
  return (
    <div className={customClass ? customClass : 'hide-button mb-3'} >
      <Btn attrBtn={{ className: 'danger-button danger-center btn btn-sm', onClick: toggle }}>
        <AlignLeft className='me-2' /> {Filter}
      </Btn>
    </div>
  );
};

export default FilterButton;
