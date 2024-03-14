// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';

// const useFilter = (products) => {
//   // console.log(products);
//   const [filterProduct, setFilterProduct] = useState(products);
//   const [work, setWork] = useState(false);
//   const router = useRouter();
//   const { brand, category, price, sorting } = useSelector((state) => state.ProductFilter);
//   const storedData = useSelector((state) => state.ProductFilter);
//   const dispatch = useDispatch();
//   const Data = router.query;
//   var oldData = !!Object.keys(Data).length && Data.filterDetails && JSON.parse(decodeURIComponent(Data.filterDetails));

//   function arraysEqual(a, b) {
//     if (a === b) return true;
//     if (a == null || b == null) return false;
//     if (a.length !== b.length) return false;

//     for (var i = 0; i < a.length; ++i) {
//       if (a[i] !== b[i]) return false;
//     }
//     return true;
//   }

//   useEffect(() => {
//     oldData && !!oldData?.brand?.length && !arraysEqual(oldData?.brand, storedData?.brand) && dispatch({ type: 'BRAND', payload: oldData?.brand });
//     // oldData && !!oldData?.color?.length && !arraysEqual(oldData?.color, storedData?.color) && dispatch({ type: 'COLOR', payload: oldData?.color });
//     oldData && !!oldData?.price?.length && !arraysEqual(oldData?.price, storedData?.price) && dispatch({ type: 'PRICEFILTER', payload: oldData?.price });
//     oldData && !!oldData?.category?.length && !arraysEqual(oldData?.category, storedData?.category) && dispatch({ type: 'CATEGORY', payload: oldData?.category });
//     oldData && !!oldData?.sortByType?.length && !arraysEqual(oldData?.sortByType, storedData?.sortByType) && dispatch({ type: 'SORTBYTYPE', payload: oldData?.sortByType });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [Data]);
//   console.log(price);
//   useEffect(() => {
//     setFilterProduct(
//       products
//         ?.filter((product) => {
//           let filterBrand = brand.length ? brand.includes(product.attributes.brand.data?.attributes.brand_name) : true;
          
//           let filterCategory = category.length ? category.includes(product.attributes.category.data.attributes.category_name) || category.includes('All') : true;

//           // let filterColor = color.length ? color.map((item) => product.colors.includes(item)).includes(true) : true;
//           let priceMatch = price ? parseInt(price[0]) <= product.attributes.product_price && parseInt(price[1]) >= product.attributes.product_price && true : true;
//           // let filterDiscount = discount.length ? product?.discount > discount : true;
//           return filterBrand && filterCategory && priceMatch;
//         })
//     );
//     work && router.push({ pathname: router.pathname, query: { filterDetails: encodeURIComponent(JSON.stringify(storedData)) } }, undefined, { shallow: true });
//     setTimeout(() => {
//       setWork(true);
//     }, 2000);
//   }, [brand, category, price, products]);
//   // console.log(filterProduct);
//   return filterProduct;
// };

// export default useFilter;




import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const useFilter = (products) => {
  const [filterProduct, setFilterProduct] = useState(products);
  const [work, setWork] = useState(false);
  const router = useRouter();
  const { brand, category, price, sorting } = useSelector((state) => state.ProductFilter);
  const storedData = useSelector((state) => state.ProductFilter);
  const dispatch = useDispatch();
  const Data = router.query;
  var oldData = !!Object.keys(Data).length && Data.filterDetails && JSON.parse(decodeURIComponent(Data.filterDetails));

  function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  useEffect(() => {
    oldData && !!oldData?.brand?.length && !arraysEqual(oldData?.brand, storedData?.brand) && dispatch({ type: 'BRAND', payload: oldData?.brand });
    oldData && !!oldData?.price?.length && !arraysEqual(oldData?.price, storedData?.price) && dispatch({ type: 'PRICEFILTER', payload: oldData?.price });
    oldData && !!oldData?.category?.length && !arraysEqual(oldData?.category, storedData?.category) && dispatch({ type: 'CATEGORY', payload: oldData?.category });
    oldData && !!oldData?.sortByType?.length && !arraysEqual(oldData?.sortByType, storedData?.sortByType) && dispatch({ type: 'SORTBYTYPE', payload: oldData?.sortByType });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Data]);

  useEffect(() => {
    setFilterProduct(
      products?.filter((product) => {
        let filterBrand = brand.length ? brand.includes(product.attributes?.brand?.data?.attributes?.brand_name) : true;
        let filterCategory = category.length ? category.includes(product.attributes?.category?.data?.attributes?.category_name) || category.includes('All') : true;
        let priceMatch = price ? parseInt(price[0]) <= product.attributes?.product_price && parseInt(price[1]) >= product.attributes?.product_price && true : true;
        return filterBrand && filterCategory && priceMatch;
      })
    );

    work &&
      router.push(
        { pathname: router.pathname, query: { filterDetails: encodeURIComponent(JSON.stringify(storedData)) } },
        undefined,
        { shallow: true }
      );

    setTimeout(() => {
      setWork(true);
    }, 2000);
  }, [brand, category, price, products]);

  return filterProduct;
};

export default useFilter;
