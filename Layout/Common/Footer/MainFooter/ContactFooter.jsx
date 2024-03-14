import { Col } from 'reactstrap';
import { Address, Email, phone, Mail, mobileno, ActualAddress, CommonPath } from '../../../../Components/Constant';
import { LogoSvg } from '../../../../Data/SVG';
import Image from 'next/image'
import { IconName } from "react-icons/bs";
import { BsLinkedin, BsInstagram, BsTwitter, BsFacebook, BsYoutube} from "react-icons/bs";
import Link from 'next/link';
const ContactFooter = () => {
  return (
    <>
      <Col xl='2' lg='2' md='2'>
        <div className='footer-contact'>
          <div className='brand-logo mb-4'>
          <a href="/"> <Image src="/Logofinal.svg" alt="unboxLogo" width={100} height={60} /></a>
          </div>
          <ul className='contact-lists'>
            <li>
              <span>
                <span  style={{color:'#FF8400',fontWeight:'500'}}>{mobileno}</span>
              </span>
            </li>
            <li>
              <span>
                <span className='font-light' style={{lineHeight:'1rem'}}> {ActualAddress}</span>
              </span>
            </li>
            <li>
              <span>
                <span className='font-light'><a href='mailto:{Mail}'>{Mail}</a> </span>
              </span>
            </li>
            <li>
              <div className='d-none d-xl-block d-md-block d-sm-none'>
                <div className='row'>
                <div className='col-xl-2 col-lg-2 col-md-2 col-sm-2'>
                  <Link href="https://in.linkedin.com/company/unboxindustry"target="_blank" style={{color:"#0A66C2", fontSize:'22px'}}>
                    <img src='/linkedin.png' alt="linkedin" style={{height:'25px', width:'25px'}}/>
                    </Link>
                </div>
                <div className='col-xl-2 col-lg-2 col-md-2 col-sm-2'>
                <Link href="https://www.instagram.com/unbox_industry/"target="_blank"style={{color:"#833AB4", fontSize:'22px'}}>
                  <img src='/instagram.png' alt='instagram' style={{height:'25px', width:'25px'}}/>
                  </Link>
                </div>
                <div className='col-xl-2 col-lg-2 col-md-2 col-sm-2'>
                <Link href="https://twitter.com/unboxindustry"target="_blank"style={{color:"#1DA1F2", fontSize:'22px'}}>
                  <img src='/twitter.png' alt='twitter' style={{height:'25px', width:'25px'}}/>
                  </Link>
                </div>
                <div className='col-xl-2 col-lg-2 col-md-2 col-sm-2'>
                <Link href="https://www.facebook.com/unboxindustry/" target="_blank"style={{color:"#1877F2", fontSize:'22px'}}>
                  <img src='/facebook.png' alt='facebook' style={{height:'25px', width:'25px'}}/>
                  </Link>
                </div>
                <div className='col-xl-2 col-lg-2 col-md-2 col-sm-2'>
                <Link href="https://www.youtube.com/@unboxindustry6029"target="_blank"style={{color:"red", fontSize:'22px'}}>
                  <img src='/Youtube.webp' alt='youtube' style={{height:'25px', width:'25px'}}/>
                  </Link>
                </div>
                </div>
              </div>
              <div className="d-block d-xl-none d-md-none d-sm-block">
                <div className='row'>
                  <div className='col-2'>
                    <Link href="https://in.linkedin.com/company/unboxindustry"target="_blank">
                    <img src='/linkedin.png' alt="linkedin" style={{height:'50px', width:'50px'}}/>
                    </Link>
                    </div>
                  <div className='col-2'>
                    <Link href="https://www.instagram.com/unbox_industry/"target="_blank">
                    <img src='/instagram.png' alt='instagram'  style={{height:'50px', width:'50px'}}/>
                    </Link>
                    </div>
                  <div className='col-2'>
                    <Link href="https://twitter.com/unboxindustry"target="_blank">
                    <img src='/twitter.png' alt='twitter' style={{height:'50px', width:'50px'}}/>
                    </Link>
                    </div>
                  <div className='col-2'>
                    <Link href="https://www.facebook.com/unboxindustry/" target="_blank">
                    <img src='/facebook.png' alt='facebook' style={{height:'50px', width:'50px'}}/>
                    </Link>
                    </div>
                  <div className='col-2'>
                    <Link href="https://www.youtube.com/@unboxindustry6029"target="_blank">
                    <img src='/Youtube.webp' alt='youtube' style={{height:'50px', width:'50px'}}/>
                    </Link>
                    </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </Col>
    </>
  );
};
export default ContactFooter;
