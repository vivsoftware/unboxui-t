import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { allCurrency } from '../../Data/TopHeaderData';
import axios from "axios";
const TopHeaderCurrency = () => {

  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const {symbol,currency} = useSelector((state)=> state.CurrencyReducer)
  const onHandleClick = (value) => {
    dispatch({ type: 'CURRENCYCHANGE', payload: value });
  };
  return (
    <li>
      <Dropdown className='top-header-dropdown' isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}>
        <DropdownToggle>
          <span>
            <b>{symbol}</b>{currency}
          </span>
          <i className='fas fa-chevron-down'></i>
        </DropdownToggle>
        <DropdownMenu className='dropdown-menu-end'>
          {allCurrency.map((elem, i) => {
            return (
              <DropdownItem key={i}>
                <a className='d-block' onClick={() => onHandleClick(elem)}>
                  {elem.currency}
                </a>
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </Dropdown>
    </li>
  );
};

export default TopHeaderCurrency;
