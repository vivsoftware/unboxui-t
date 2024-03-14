import React from 'react';
import { SpecificationColumn } from '../../../Data/SpecificationData';
import DataTables from '../../Element/DataTable';

const SpecificationDetail = ({ singleProduct }) => {
  function objectToArray(singleProduct) {
    return Object.keys(singleProduct.attributes.Specifications[0])?.map((key, index) => {
      if (key !== "id" && key !== "__component") {
        return {
          id: index,
          title: key,
          contain: singleProduct.attributes.Specifications[0][key]
        };
      }
      return null; // Return null for keys you want to skip
    }).filter(item => item !== null);
  }

  const specifications = singleProduct.attributes.Specifications[0];

  if (!specifications || Object.keys(specifications).length === 0) {
    return null; // Don't render anything if no specifications
  }

  return (
    <div className='pro mb-4'>
      <div className='table-responsive'>
      <h3 className=' mt-4'>Specifications</h3>
        <DataTables data={objectToArray(singleProduct).slice(2)} columns={SpecificationColumn} style={{ borderRight: '1px solid gray' }} />
      </div>
    </div>
  );
};

export default SpecificationDetail;


