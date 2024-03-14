import React from 'react';
import { QADetails } from '../../../Data/ProductDetailsData';

const QA_Details = () => {
  return (
    <div className='question-answer'>
      <h3 className='mt-2 mb-2' >Q & A</h3>
      <ul >
        {QADetails.map((elem) => {
          return (
            <li key={elem.id} style={{borderBottom:'1px solid gray', marginBottom:'5px'}}>
              <div className='que'>
                <i className='fas fa-question'></i>
                <div className='que-details'>
                  <h6>{elem.question}</h6>
                  <p className='font-light'>{elem.answer}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default QA_Details;
