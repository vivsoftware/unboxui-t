import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
const NEFTModal = () => {
    const { NEFTModal } = useSelector((state) => state.ModalReducer);
  const dispatch = useDispatch();
  const toggle = () => {
    dispatch({ type: 'NEFTMODAL' });
  };
  return (
    <>
      <Modal className='add-address-modal' centered={true} id='addAddress' isOpen={NEFTModal} toggle={toggle}>
      <ModalHeader toggle={toggle}></ModalHeader>
      <ModalBody>
        <div className='row payment' >
          {/* <p style={{color:'red'}}>Our Payment Gateway is Under Development. In the meantime, click on get quotation to get quotation via e-mail.</p> */}
        <button className='btn payment-btn' style={{backgroundColor:'white'}}>NET BANKING(Upcoming Feature)</button>
        </div>
        <div className='row mt-2 payment' >
        <button className='btn payment-btn'style={{backgroundColor:'white'}} >DEBIT CARD(Upcoming Feature)</button>
        </div>
        <div className='row mt-2 payment' >
        <button className='btn payment-btn'style={{backgroundColor:'white'}}>CREDIT CARD(Upcoming Feature)</button>
        </div> 
        <div className='row mt-2 payment' >
        <button className='btn payment-btn'style={{backgroundColor:'white'}}>BUY ON EMI(Upcoming Feature)</button>
        </div>
        <div className='row mt-2 payment' >
        <button className='btn payment-btn'style={{backgroundColor:'white'}}>BUY NOW PAY LATER(Upcoming Feature)</button>
        </div>
        <div className='row mt-2 payment' >
        <button className='btn payment-btn'style={{backgroundColor:'white'}}>NEFT/RTGS</button>
        </div>
      </ModalBody>
      </Modal>
    </>
  )
}

export default NEFTModal
