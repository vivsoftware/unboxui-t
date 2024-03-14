import Link from 'next/link';
import React,{useEffect,useState} from 'react';
import { useSelector } from 'react-redux';
import { Col } from 'reactstrap';
import { getStrapiMedia } from '../../../Utils/media';
import { CommonPath } from '../../Constant';
import DynamicRating from '../../Element/DynamicRating';
import { auth } from '../../../Config/firebase';
import Image from 'next/image';
const MiddleTab = ({ elem, TabMiddleColor, LeftRightTab }) => {
  const { symbol, currencyValue } = useSelector((state) => state.CurrencyReducer);
  // console.log(elem.slice(3,4));
  const numberWithCommas = (x) => {
    return x.toLocaleString("en-IN");
  };
  
  const formatPrice = (price) => {
    return `${numberWithCommas(price)}`;
  }


  const [user, setUser] = useState(null);


  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);

    });
  }, []);


  return (
    <>
      {elem.slice(3,4).map((elem,i)=>{
        return (
        <Col lg='4' className='order-lg-0 order-1'>
          <div className='product-banner product-banner-circle'>
            <div className={`${LeftRightTab ? LeftRightTab : 'product-box product-box1'}`}style={{backgroundColor:'white', border:'2px solid #FF8400'}}>
              <div className='img-wrapper bg-transparent'>
                {/* <div className='label-block'>
                  <span className='label label-black'>{`New`}</span>
                  <span className='label label-theme'>{`50% OFF`}</span>
                </div> */}
                <Link href={`/product/${elem.id}-${elem.attributes.product_slug}`}>
                  <Image width={200} height={200} src={getStrapiMedia(elem.attributes.product_display)} className='img-fluid' alt={elem.attributes.product_name} />
                </Link>
                {/* <div className={`${TabMiddleColor ? TabMiddleColor : 'offer-end offer-end-demo4'}`}>
                  <h3>{`Hurry Up`}</h3>
                  <h6>{`Offer Ending Soon`}</h6>
                </div> */}
              </div>
              <div className='product-details text-center'>
              {user ? (
        <h3 className='price-detail'>
          {elem?.attributes?.product_price
            === "0" ? (
            <h3>For Price Please Enquire</h3>
          ) : (
            <h3>
              {symbol}{formatPrice(elem?.attributes?.product_price * currencyValue.toFixed(2))}

            </h3>
          )}
        </h3>
      ) : (
        <Link href="/login">
          <h3 className='price-detail' style={{ color: '#FF8400' }}>Please Login for Price</h3>
        </Link>
      )}
      

                <Link href={`/product/${elem.id}-${elem.attributes.product_slug}`} className='font-default' tabIndex='-1'>
                  <h5 className='main-title'>{elem.attributes.product_name}</h5>
                </Link>
                {/* <DynamicRating data={elem.ratingstars} customeclass={'rating-2'} /> */}
              </div>
            </div>
          </div>
        </Col>
      );
    })
    }
    </>
  );
};

export default MiddleTab;
