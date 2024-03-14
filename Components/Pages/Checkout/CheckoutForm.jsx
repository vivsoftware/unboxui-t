import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import SavedAddresses from '../Checkout/SavedAddresses';

const CheckoutForm = () => {
  const [isFormData, setIsFormData] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setIsFormData(data);
  };

  return (
    <>
    <SavedAddresses />
    </>
  );
};

export default CheckoutForm;
