import React from 'react'
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CustomerReview = () => {
    const reviews = [
        {
            name: 'John Doe',
            company: 'ABC Inc.',
            rating: 5,
            comment:
                'Please ensure that the placeholderSrc prop in the PlaceholderImage component points to the correct placeholder image path from the public folder. If the issue persists, double-check the file path and make sure the placeholder image is accessible.',
        },
        {
            name: 'John Doe',
            company: 'ABC Inc.',
            rating: 5,
            comment:
                'Please ensure that the placeholderSrc prop in the PlaceholderImage component points to the correct placeholder image path from the public folder. If the issue persists, double-check the file path and make sure the placeholder image is accessible.',
        },
        {
            name: 'John Doe',
            company: 'ABC Inc.',
            rating: 5,
            comment:
                'Please ensure that the placeholderSrc prop in the PlaceholderImage component points to the correct placeholder image path from the public folder. If the issue persists, double-check the file path and make sure the placeholder image is accessible.',
        },
        {
            name: 'John Doe',
            company: 'ABC Inc.',
            rating: 5,
            comment:
                'Please ensure that the placeholderSrc prop in the PlaceholderImage component points to the correct placeholder image path from the public folder. If the issue persists, double-check the file path and make sure the placeholder image is accessible.',
        },
        {
            name: 'John Doe',
            company: 'ABC Inc.',
            rating: 5,
            comment:
                'Please ensure that the placeholderSrc prop in the PlaceholderImage component points to the correct placeholder image path from the public folder. If the issue persists, double-check the file path and make sure the placeholder image is accessible.',
        },
        {
            name: 'John Doe',
            company: 'ABC Inc.',
            rating: 5,
            comment:
                'Please ensure that the placeholderSrc prop in the PlaceholderImage component points to the correct placeholder image path from the public folder. If the issue persists, double-check the file path and make sure the placeholder image is accessible.',
        },

    ];
    const settings = {
        infinite: true,
        slidesToShow: 4, 
        slidesToScroll: 1,
        arrows: false, 
        dots: false, 
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };
    return (
        <>
            <div className='container'>
                <h2 className='text-center' style={{ marginTop: '50px' }}>
                    What People Say About Us
                </h2>
                <div className='mt-5'>
                    {reviews.length >= 5 ? (
                        <Slider {...settings}>
                            {reviews.map((review, index) => (
                                <div key={index} className='custom-slide'>
                                    <div className='review-card'>
                                    <div className='profile-customer'>
                                        <img src='Pooja.jpg' />
                                    </div>
                                    <div className='rating text-center mt-4' style={{ color: '#FF8400' }}>
                                        <AiFillStar />
                                        <AiFillStar />
                                        <AiFillStar />
                                        <AiFillStar />
                                        <AiOutlineStar />
                                    </div>
                                    <div className='comment-card text-center'>
                                        <p style={{ color: '#5f5f5f' }}>
                                            <ImQuotesLeft style={{ height: '30px', width: '30px' }} /> {review.comment}{' '} 
                                            <ImQuotesRight style={{ height: '30px', width: '30px' }} />
                                        </p>
                                        <h4 style={{ color: '#5f5f5f' }}>{review.name}</h4>
                                        <p className='text-center' style={{ color: '#5f5f5f' }}>
                                            {review.company}
                                        </p>
                                    </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        <div className='row'>
                            {reviews.map((review, index) => (
                                <div key={index} className='col-3'>
                                    <div className='review-card'>
                                        <div className='profile-customer'>
                                            <img src='Pooja.jpg' />
                                        </div>
                                        <div className='rating text-center mt-4' style={{ color: '#FF8400' }}>
                                            <AiFillStar />
                                            <AiFillStar />
                                            <AiFillStar />
                                            <AiFillStar />
                                            <AiOutlineStar />
                                        </div>
                                        <div className='comment-card text-center'>
                                            <p style={{ color: '#5f5f5f' }}>
                                                <ImQuotesLeft style={{ height: '30px', width: '30px' }} /> {review.comment}{' '}
                                                <ImQuotesRight style={{ height: '30px', width: '30px' }} />
                                            </p>
                                            <h4 style={{ color: '#5f5f5f' }}>{review.name}</h4>
                                            <p className='text-center' style={{ color: '#5f5f5f' }}>
                                                {review.company}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {/* <div className='container'>
                <h2 className='text-center' style={{marginTop:'50px'}}>What People Say About Us</h2>
                <div className='row mt-5'>
                    <div className='col-3'>
                        <div className='review-card'>
                            <div className='profile-customer'>
                                <img src='Pooja.jpg'/>
                            </div>
                            <div className='rating text-center mt-4' style={{color:'#FF8400'}}>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiOutlineStar/>
                            </div>
                            <div className='comment-card text-center'>
                            <p style={{color:'#5f5f5f'}}><ImQuotesLeft style={{height:'30px',width:'30px'}}/> Please ensure that the placeholderSrc prop in the PlaceholderImage component points to the correct placeholder image
                                    path from the public folder. If the issue persists, double-check the file path and make sure the placeholder image
                                    is accessible. <ImQuotesRight style={{height:'30px',width:'30px'}}/>
                                </p>
                                <h4 style={{color:'#5f5f5f'}}>Customer Name</h4>
                                <p className='text-center' style={{color:'#5f5f5f'}}>Company Name</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-3'>
                        <div className='review-card'>
                            <div className='profile-customer'>
                                <img src='Pooja.jpg'/>
                            </div>
                            <div className='rating text-center mt-4' style={{color:'#FF8400'}}>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiFillStar/>
                            </div>
                            <div className='comment-card text-center'>
                                <p style={{color:'#5f5f5f'}}><ImQuotesLeft style={{height:'30px',width:'30px'}}/> Please ensure that the placeholderSrc prop in the PlaceholderImage component points to the correct placeholder image
                                    path from the public folder. If the issue persists, double-check the file path and make sure the placeholder image
                                    is accessible. <ImQuotesRight style={{height:'30px',width:'30px'}}/>
                                </p>
                                <h4 style={{color:'#5f5f5f'}}>Customer Name</h4>
                                <p className='text-center' style={{color:'#5f5f5f'}}>Company Name</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-3'>
                        <div className='review-card'>
                            <div className='profile-customer'>
                                <img src='Pooja.jpg'/>
                            </div>
                            <div className='rating text-center mt-4' style={{color:'#FF8400'}}>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiOutlineStar/>
                            </div>
                            <div className='comment-card text-center'>
                                <p style={{color:'#5f5f5f'}}><ImQuotesLeft style={{height:'30px',width:'30px'}}/> Please ensure that the placeholderSrc prop in the PlaceholderImage component points to the correct placeholder image
                                    path from the public folder. If the issue persists, double-check the file path and make sure the placeholder image
                                    is accessible. <ImQuotesRight style={{height:'30px',width:'30px'}}/>
                                </p>
                                <h4 style={{color:'#5f5f5f'}}>Customer Name</h4>
                                <p className='text-center' style={{color:'#5f5f5f'}}>Company Name</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-3'>
                        <div className='review-card'>
                            <div className='profile-customer'>
                                <img src='Pooja.jpg'/>
                            </div>
                            <div className='rating text-center mt-4' style={{color:'#FF8400'}}>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiFillStar/>
                            </div>
                            <div className='comment-card text-center'>
                                <p style={{color:'#5f5f5f'}}><ImQuotesLeft style={{height:'30px',width:'30px'}}/> Please ensure that the placeholderSrc prop in the PlaceholderImage component points to the correct placeholder image
                                    path from the public folder. If the issue persists, double-check the file path and make sure the placeholder image
                                    is accessible. <ImQuotesRight style={{height:'30px',width:'30px'}}/>
                                </p>
                                <h4 style={{color:'#5f5f5f'}}>Customer Name</h4>
                                <p className='text-center' style={{color:'#5f5f5f'}}>Company Name</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    )
}

export default CustomerReview
