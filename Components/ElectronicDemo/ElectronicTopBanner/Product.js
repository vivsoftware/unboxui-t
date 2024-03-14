import React from "react";
import { Card, Button } from "react-bootstrap";
import Image from "next/image";
const ProductCard = (props) => {
  return (
    <>
      <Card style={{ width: "" }} >
        {/* <Card.Img variant="top" src={props.imgSrc} style={{ width: "272px", height: "272px" }} /> */}
        <Image variant="top" src={props.imgSrc} width={272} height={272} alt="Post-Banner"/>


      </Card>
    </>
  );
};

export default ProductCard;


