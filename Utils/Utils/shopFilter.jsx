import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const shopFilter = (products) => {
    const [productData, setProductData] = useState([]);
    const {brand, category, price} = useSelector((state)=> state.ProductFilter);
    useEffect(()=>{
        // console.log(brand);
        // console.log(category);
        // console.log(price);
    }, [brand, price, category]);
}
export default shopFilter;
