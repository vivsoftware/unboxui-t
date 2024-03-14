import React from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Btn } from "../../Components/AbstractElements";
import { ProceedTOPayment,ProceedTOCheckout, Total } from "../../Components/Constant";
const TotalPrice = ({ getTotalPrice }) => {
  const { symbol, currencyValue } = useSelector(
    (state) => state.CurrencyReducer
  );
  const router = useRouter();
  const redirectTo = () => {
    router.push("/cart");
  };
  return (
    <div className="cart-btn">
      <h6 className="cart-total">
        <span className="font-light">{Total}:</span> {symbol}{" "}
        {(getTotalPrice() * currencyValue).toFixed(2)}
      </h6>
      <Btn
        attrBtn={{
          type: "button",
          className: "btn-solid-default btn-block",
          onClick: () => redirectTo(),
        }}
      >
        {ProceedTOCheckout}
      </Btn>
    </div>
  );
};
export default TotalPrice;
