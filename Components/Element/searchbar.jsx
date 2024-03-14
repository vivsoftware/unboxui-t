import * as React from "react";
import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import { getStrapiMedia } from "../../Utils/media";
import { fetchAPI } from "../../Utils/api";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  border: "1px solid black",
  borderRadius: "4px",
  backgroundColor: "white",
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "black",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    color: "black",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const PrimarySearchAppBar = ({brands, categories, industries}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [result, setResult] = useState(null);
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingProductId, setLoadingProductId] = useState(null);
  const router = useRouter();
  const handleChange = (event) => {
    setValue(event.target.value);
    resetLoading(); // Reset loading state when the search bar is clicked
  };

  const resetLoading = () => {
    setLoading(false);
    setLoadingProductId(null);
  };

  const handleFocus = () => {
    setShowDropdown(true);
    resetLoading(); // Reset loading state when the search bar is focused
  };
  const handleBlur = () => {
    setTimeout(() => {
      setShowDropdown(false);
    }, 100
    );
  };
  const handleProductClick = (productId) => {
    setLoading(true);
    setLoadingProductId(productId);
    // You can also preload the product page here if needed
    // ...
    // After some loading process, navigate to the product page
    router.push(`/product/${productId}-${product_slug}`);
  };

  useEffect(() => {
    value
      ? fetchAPI(
          `/products?filters[$and][0][product_name][$contains]=${value}&populate=*`
        ).then((res) => {
          setResult(res.data);
        })
      : setResult(null);
  }, [value]);

  return (
    <>
        <div className="search-field">
          <Search>
            <SearchIconWrapper className="search-icon">
              <SearchIcon className="search-icon" 
              />
            </SearchIconWrapper>
            <StyledInputBase
              className="search-input"
              placeholder="Search Products..."
              inputProps={{ "aria-label": "search" }}
              onFocus={handleFocus}
              onChange={handleChange}
              onBlur={handleBlur}
              // 
              >
            </StyledInputBase>
          </Search>
        </div>

        {result && result.length > 0 &&  showDropdown &&(
          <div className="card search-card">
            {result.map((product) => {
              return (
                <>
                  <Link href={`/product/${product.id}-${product.attributes.product_slug}`}  >
                  <div
                  className={`row mt-1 ${
                    loadingProductId === product.id ? "loading" : ""
                  }`}
                  onClick={() => handleProductClick(product.id)}
                >
                      <div className="col-3">
                        <Image
                          src={getStrapiMedia(
                            product.attributes.product_display
                          )}
                          width={60}
                          height={60}
                        />
                      </div>
                      <div className="col-9">
                        <span>{product.attributes.product_name}</span>
                      </div>
                    </div>
                  </Link>
                  {loadingProductId === product.id && (
                <div className="loading-spinner">
                  {/* Insert your loading spinner component here */}
                  Loading...
                </div>
              )}
                  <hr />
                </>
              );
            })}
          </div>
        )}
       
    </>
  );
};
export default PrimarySearchAppBar;
