import React from 'react';
import { Col, Form, Input, Label } from 'reactstrap';
import CommonRating from './CommonRating';
import { Btn } from '../../AbstractElements';
import { Comments, EmailAddress, Name, Rating, Submit } from '../../Constant';
import { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import spring_boot_url from '../../../springApi';
const AddComments = () => {

  const [name, setName] = useState('')
    const [email, setemail] = useState('')
    const [comments, setcomments] = useState('')
    const [error, seterror] = useState('');
    const [formErrors, setFormErrors] = useState({});
  
    const handleClick = (e) => {
      e.preventDefault();
      const errors = validateForm();
      if (Object.keys(errors).length === 0) {
        const student = { name, email, comments };
        fetch(`${spring_boot_url}api/review/submit`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(student),
        })
          .then((resp) => {
            seterror(resp);
            if (resp.ok === true) {
              toast.success(`Thank you for Review Us.`);
              // Clear form fields
              setName('');
              setemail('');
              setcomments('');
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      } else {
        setFormErrors(errors);
      }
    };
  
    const validateForm = () => {
      const errors = {};
  
      if (name.trim() === '') {
        errors.name = 'Name is required';
      }
  
      if (email.trim() === '') {
        errors.email = 'Email is required';
      }
  
      if (comments.trim() === '') {
        errors.comments = 'Comment is required';
      }
  
      return errors;
    
    };
  return (
    <Col lg='8'>
      <p className='d-inline-block me-2  fw-bold'>Leave A Reply</p>
      <div className='review-box'>
        <Form className='row g-4'>
          <Col xs='12' md='6'>
            <Label className='mb-1' htmlFor='name'>
              {Name}
            </Label>
            <Input type='text' 
            className={`form-control otp-modal ${formErrors.name ? 'is-invalid' : ''}`} 
            id='name' placeholder='Enter your name' 
            value={name} onChange={(e) => setName(e.target.value)} 
            required/>
          </Col>

          <Col xs='12' md='6'>
            <Label className='mb-1' htmlFor='id'>
              {EmailAddress}
            </Label>
            <input type='email' 
            className={`form-control otp-modal ${formErrors.email ? 'is-invalid' : ''}`} 
            id='id' placeholder='Email Address' 
            value={email} onChange={(e) => setemail(e.target.value)}
            required/>
          </Col>

          <Col xs='12'>
            <Label className='mb-1' htmlFor='comments'>
              {Comments}
            </Label>
            <textarea className={`form-control otp-modal ${formErrors.comments ? 'is-invalid' : ''}`} 
            placeholder='Leave a comment here' 
            id='comments'
            value={comments} onChange={(e) => setcomments(e.target.value)} style={{ height: '100px' }} required></textarea>
          </Col>

          <Col xs='12'>
          <button type="submit" className="btn submit-contact" onClick={handleClick}>
                      SUBMIT
                    </button>
          </Col>
        </Form>
      </div>
    </Col>
  );
};

export default AddComments;