import React, { useState, useEffect } from 'react';
import { getStrapiMedia } from '../../Utils/media';
import Image from 'next/image';
import Link from 'next/link';
import SkeletonLoader from '../Element/SkeletonLoader';

const Categories = ({ category }) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  if (!category) {
    return (
      <>
        <SkeletonLoader />
      </>
    )
  }

  return (
    <>
    <div className='container d-none d-xl-block d-md-block d-sm-none'>
      <h2 className='text-center mb-3' style={{marginTop:'70px'}}>Categories we deal in!</h2>
      <div className='container category-section' style={{ backgroundColor: '#FFF' }}>
        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5'>
          {category?.map((categoryItem) => (
            <div key={categoryItem.id} className='col mt-1 mb-1 ' style={{backgroundColor:'white'}} >
              <div className='category-card text-center'>
                <Link href={`/category/${categoryItem.id}-${categoryItem.attributes.category_slug}`} target='blank' style={{color:'black'}}>
                  {isLoading ? (
                    <SkeletonLoader />
                  ) : (
                    <Image
                      src={getStrapiMedia(categoryItem.attributes.category_icon)}
                      alt={categoryItem.attributes.category_name}
                      width={200} 
                      height={170} 
                      style={{  marginTop: '10px',boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2)', backgroundColor:'#fff' }}
                      className='categorycard-image'
                    />
                  )}
                  <h3 className='mt-3'style={{color:'#FF8400',fontWeight:'normal'}}>{categoryItem.attributes.category_name}</h3>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className='container d-block d-xl-none d-md-none d-sm-block'>
  <h2 className='text-center mb-3' style={{marginTop:'70px'}}>Categories we deal in!</h2>
  <div className='container ' style={{ backgroundColor: '#FFF' }}>
    <div className='row flew-row'>
      {category?.map((categoryItem) => (
        <div key={categoryItem.id} className='col mt-1 mb-1' style={{backgroundColor:'white'}} >
          <div className=''>
            <Link href={`/category/${categoryItem.id}-${categoryItem.attributes.category_name}`} target='blank' style={{color:'black'}}>
              {isLoading ? (
                <SkeletonLoader />
              ) : (
                <Image
                  src={getStrapiMedia(categoryItem.attributes.category_icon)}
                  alt={categoryItem.attributes.category_name}
                  width={140} 
                  height={140} 
                  style={{  marginTop: '10px',boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2)', backgroundColor:'#fff',padding:'5px' }}
                  className='categorycard-image'
                />
              )}
              <h3 className='mt-3 'style={{color:'#FF8400',fontWeight:'normal'}}>{categoryItem.attributes.category_name}</h3>
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

    </>
  );
};
export default Categories;
