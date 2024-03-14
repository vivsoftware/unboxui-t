import { getStrapiMedia } from "../../Utils/media";
import { fetchAPI } from '../../Utils/api';
import Img from '../../Components/Element/Images';
import React, { useState, useEffect } from 'react';


const custom = ({ }) => {

  const [data, setData] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const imgUrl = await fetchAPI(`/posts`, {
        populate: ['image'],
      },

        {
          encodeValuesOnly: true, // prettify URL
        });

      setData(imgUrl);

    }

    fetchData();
  }, []);
  if (!data) {
    return <p>Loading...</p>;
  }
  const imgSrc = data.data[0].attributes.image;

  return (
    <div className='home-slider bg-size'>
      <h1></h1>
      <Img src={getStrapiMedia(imgSrc)} className='bg-img' alt='home-slider' height="100vh" />

      <h1>{data.data[0].attributes.title}</h1>
      <h1>{data.data[1].attributes.title}</h1>

    </div>
  );
};





export default custom;