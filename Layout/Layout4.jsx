import React, { useEffect, useState } from "react";
import { fetchAPI } from "../Utils/api";
import Cookie from "./Common/Cookie";
import ThemeCustomizer from "./Common/Customizer";
import Footers from "./Common/Footer";
import Header4 from "./Common/Header/Header4";
import TapTop from "./Common/TapTop";
import Whatsapp from "./Whatsapp";

const Layout4 = ({ children, isCategories }) => {
  const [categories, setCategories] = useState(null);
  const [brands, setBrands] = useState(null);
  const [industries, setIndustries] = useState(null);

  useEffect(() => {
    fetchAPI(`/brands`, {
      populate: "*",
      pagination: {
        start: 0,
        limit: -1,
      },
    }).then((res) => {
      setBrands(res.data);
    });
    fetchAPI("/categories", { populate: "*" }).then((res) => {
      setCategories(res.data);
    });
    fetchAPI('/industrial-solutions').then((result) => {
      setIndustries(result.data);
    });
  }, []);
  const addLeft = true;
  return (
    <>
      <Header4
        isCategories={isCategories}
        brandData={brands}
        categories={categories}
        industries={industries}
      />
      {children}
      <TapTop />
      <Whatsapp />
      <Footers categories={categories} brands={brands} industries={industries} />
    </>
  );
};
export default Layout4;
