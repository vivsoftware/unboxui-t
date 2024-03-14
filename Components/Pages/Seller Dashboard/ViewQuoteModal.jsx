import React from 'react'

const ViewQuoteModal = ({isOpen, onClose,}) => {

    if (!isOpen ) {
        return null;
      }

  return (
    <div className="my-modal">
    <div className="my-modal-content">
     <h3 className='mb-2'>Quote</h3>
      <p>Quote To : Pooja</p>
      <p>Quote For : Machine Tending</p>
      <p>Quote Value : 1,00,00,000</p>
      <p>Company Name : VIV</p>
      <p>Date : 06-01-2024</p>
      <button onClick={onClose}>Delete</button>
      <button onClick={onClose}>Close</button>
    </div>
  </div>
  )
}

export default ViewQuoteModal
