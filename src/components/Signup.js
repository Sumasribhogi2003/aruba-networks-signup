import React, { useState } from 'react';
// useForm hook is used to manage form state and validation
import { useForm } from 'react-hook-form';
// yupResolver is used to integrate Yup validation with react-hook-form
import { yupResolver } from '@hookform/resolvers/yup';
// Yup is used to define the schema-based validation
import * as yup from 'yup';
import './Signup.css'; // Importing component-specific styles

// Define the schema for form validation using Yup
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  phoneNumber: yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
  password: yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/\d/, 'Must contain at least one number')
    .matches(/[@$!%*?&]/, 'Must contain at least one special character'),
});

const Signup = () => {
  // Local state to show success popup
  const [showPopup, setShowPopup] = useState(false);

  // useForm hook to handle form inputs and validation
  const {
    register,         // Register form fields
    handleSubmit,     // Handles form submission
    formState: { errors }, // Contains validation errors
  } = useForm({
    resolver: yupResolver(schema), // Apply Yup validation schema
  });

  // Function to be called on successful form submission
  const onSubmit = data => {
    console.log(data); // Log form data to console
    setShowPopup(true); // Show success popup

    // Hide popup after 1 second and reload the page
    setTimeout(() => {
      setShowPopup(false);
      window.location.reload(); // Refresh the page
    }, 1000);
  };

  return (
    <div className="signup-container">
      {/* Success popup */}
      {showPopup && <div className="popup">User signed up successfully!</div>}

      {/* Signup form */}
      <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
        <h1>Signup</h1>

        {/* Name field */}
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            {...register('name')}
            className={errors.name ? 'input-error' : ''}
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

        {/* Email field */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        {/* Phone Number field */}
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            {...register('phoneNumber')}
            className={errors.phoneNumber ? 'input-error' : ''}
          />
          {errors.phoneNumber && <p className="error">{errors.phoneNumber.message}</p>}
        </div>

        {/* Password field */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            {...register('password')}
            className={errors.password ? 'input-error' : ''}
          />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>

        {/* Submit button */}
        <div className="button-wrapper">
          <button type="submit" className="submit-button">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
