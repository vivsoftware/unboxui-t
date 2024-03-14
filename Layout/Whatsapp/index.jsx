import react, { useState, useEffect } from 'react';
import React from 'react';
import { BsWhatsapp,BsFillTelephoneFill } from "react-icons/bs";
import { MdConnectWithoutContact } from "react-icons/md";

const Whatsapp = () => {
 
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <>
    <div className='d-none d-xl-block d-md-none'>
    <div className='whatsapp-icon show'>
      <a href='https://api.whatsapp.com/send?phone=918604386046' target='blank'>
      <BsWhatsapp/>
      </a>
    </div>
    </div>
    <div className='d-block d-xl-none d-md-block'>
     <div className='whatsapp-container'>
      <div className='whatsapp-icon show' style={{left:'2px'}}>
      <a href='https://api.whatsapp.com/send?phone=918604386046' target='blank'>
      <BsWhatsapp/>
      </a>
      </div>
      <div className='call-button'>
      <a href="tel:+1244148999" >
      <BsFillTelephoneFill style={{color: 'white',height: "30px",width: "30px",marginLeft: "10px",marginTop: "10px"}}/>
      </a>
      </div>
    </div>
    </div>
      </>
  );
};
export default Whatsapp;
