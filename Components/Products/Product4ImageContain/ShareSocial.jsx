
import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from 'react-share';

const ShareSocial = ({ url, title, singleProduct }) => {
  return (
    <div>
      <h4 className='mb-2'>Share it On:</h4>
      <FacebookShareButton url={"https://www.facebook.com/sharer.php?u=https://unboxindustry.in/product/product_left_sidebar/1%20Epson%20LS6%20Robotic%20Arm"}>
      <img src='/facebook.png' alt='facebook' style={{height:'25px', width:'25px', marginRight:'5px'}}/>
      </FacebookShareButton>

      <TwitterShareButton url={"https://www.twitter.com/"} >
      <img src='/twitter.png' alt='twitter' style={{height:'25px', width:'25px' , marginRight:'5px'}}/>
      </TwitterShareButton>

      <LinkedinShareButton url={"https://www.linkedin.com/sharing/share-offsite/?url=https://unboxindustry.in/product/product_left_sidebar/${id}${singleProduct.attributes.product_name}"} >
      <img src='/linkedin.png' alt='linkedin' style={{height:'25px', width:'25px'}}/>
      </LinkedinShareButton>
    </div>
  );
};

export default ShareSocial;

