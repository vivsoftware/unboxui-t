import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../../../Utils';
import { Remove } from '../../Constant';
import AddtoCartBtn from '../../Element/AddtoCartBtn';

const CompareAction = ({ setComapreData, comapreData }) => {
  const dispatch = useDispatch();
  const handleDelete = (elem) => {
    dispatch({type:'REMOVEFROMCOMPARE', payload: elem})
  };
  console.log("commmm", comapreData)

  return (
    <tr className='table-cart-button'>
      <td></td>
      {comapreData?.map((elem, i) => (
        <td key={i}>
          <a className='btn btn-solid-blue mb-2' onClick={(e) => handleDelete(elem)}>
            - {Remove}
          </a>
          <AddtoCartBtn comapreData={comapreData} customeclass={'btn btn-solid-blue'} data={elem} />
        </td>
      ))}
    </tr>
  );
};

export default CompareAction;
