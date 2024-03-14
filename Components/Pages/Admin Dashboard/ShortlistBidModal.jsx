import React from 'react'
import { MdOutlineVerified } from 'react-icons/md';
import { VscUnverified } from 'react-icons/vsc';
import { useDispatch } from 'react-redux';

const ShortlistBidModal = ({ isOpen, onClose, userData }) => {

    if (!isOpen ) {
        return null;
      }
     
  return (
    <div className="shortlist-modal">
    <div className="shortlist-modal-content">
        <table>
            <tbody>
                <tr style={{borderBottom:'1px solid black'}}>
                    <td>Vendor Name</td>
                    <td><strong>XYZ Automobile Pvt. Ltd.</strong> <br/>It is an organization involved in the design, development, and manufacturing.</td>
                    <td><strong>Mango Robotics Pvt. Ltd.</strong> <br/> It is a corporation specialised in used industrial robots and indsutrial automation. </td>
                    <td><strong>Orange Robotic Pvt.Ltd.</strong> <br/>It is an organization involved in design, construction,operation, and use of robots. </td>
                </tr>
                <tr style={{borderBottom:'1px solid black'}}>
                    <td>Bid Id</td>
                    <td>B01</td>
                    <td>B02</td>
                    <td>B033</td>
                </tr>
                <tr style={{borderBottom:'1px solid black'}}>
                    <td>Quoted Value</td>
                    <td>1,00,00,000</td>
                    <td>1,00,00,000</td>
                    <td>1,00,00,000</td>
                </tr>
                <tr  style={{borderBottom:'1px solid black'}}>
                    <td>Annual Revenue</td>
                    <td>5 Cr</td>
                    <td>3 Cr</td>
                    <td>2 Cr</td>
                </tr>
                <tr  style={{borderBottom:'1px solid black'}}>
                    <td>Delivery location</td>
                    <td>Delhi NCR</td>
                    <td>Mumbai</td>
                    <td>Bangalore</td>
                </tr>
                <tr  style={{borderBottom:'1px solid black'}}>
                    <td>Years in Business</td>
                    <td>1 yr</td>
                    <td>2 yr</td>
                    <td>3 yr</td>
                </tr>
                <tr  style={{borderBottom:'1px solid black'}}>
                    <td>Vendor Registration</td>
                    <td><MdOutlineVerified className='verified'/></td>
                    <td><MdOutlineVerified className='verified'/></td>
                    <td><VscUnverified className='unverified'/></td>
                </tr>
                <tr>
                    <td></td>
                    <td> <button onClick={onClose}>Finalise</button></td>
                    <td> <button onClick={onClose}>Finalise</button></td>
                    <td> <button onClick={onClose}>Finalise</button></td>

                </tr>
            </tbody>
        </table>
        <div style={{display:'flex', justifyContent:'end'}}>
    <button onClick={onClose}>Close</button>
   </div>
    </div>
  </div>
  )
}

export default ShortlistBidModal;
