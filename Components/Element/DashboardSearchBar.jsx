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

const DashboardSearchBar = () => {
  
 
//   const handleChange = (event) => {
//     setValue(event.target.value);
//   };

//   const handleFocus = () => {
//     setShowDropdown(true);
//   };
//   const handleBlur = () => {
//     setTimeout(() => {
//       setShowDropdown(false);
//     }, 100
//     );
//   };
 

 
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
            //   onFocus={handleFocus}
            //   onChange={handleChange}
            //   onBlur={handleBlur}
              // 
              >
            </StyledInputBase>
          </Search>
        </div>
        
    </>
  );
};
export default DashboardSearchBar;
