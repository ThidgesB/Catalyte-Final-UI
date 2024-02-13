import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../Input/Input';

/**
 * Form for editing a patient's details
 */
const EditPatientDetails = () => {
  const navigate = useNavigate();
  const { id: patientId } = useParams();
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    ssn: '',
    email: '',
    age: '',
    height: '',
    weight: '',
    insurance: '',
    gender: '',
    street: '',
    city: '',
    state: '',
    postal: ''
  });

  /**
   * Populates the form fields with patient's existing details
   */
  useEffect(() => {
    fetch(`http://localhost:8085/patients/${patientId}`)
      .then((response) => response.json())
      .then((data) => setFormData(data));
  }, [patientId]);

  /**
   * Handles changes to input fields
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  /**
   * Validates form input data
   *
   * @returns Booleean if form is valid
   */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First Name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last Name is required';
    }

    const ssnPattern = /^\d{3}-\d{2}-\d{4}$/;
    if (!formData.ssn.trim()) {
      newErrors.ssn = 'SSN is required';
    } else if (!ssnPattern.test(formData.ssn.trim())) {
      newErrors.ssn = 'SSN must be in the format xxx-xx-xxxx';
    }

    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailPattern.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.street.trim()) {
      newErrors.street = 'Street is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    const statePattern = /^[A-Z]{2}$/;
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    } else if (!statePattern.test(formData.state.trim())) {
      newErrors.state = 'State must be two capital letters';
    }

    if (!formData.insurance.trim()) {
      newErrors.insurance = 'Insurance is required';
    }

    const agePattern = /^(?!0)\d{1,3}$/;
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (!agePattern.test(formData.age) || parseInt(formData.age, 10) > 120) {
      newErrors.age = 'Please enter a valid age between 1 and 120';
    }

    const heightPattern = /^(?!0)\d{1,3}$/;
    if (!formData.height) {
      newErrors.height = 'Height is required';
    } else if (!heightPattern.test(formData.height) || parseInt(formData.height, 10) > 250) {
      newErrors.height = 'Please enter a valid height between 1 and 250';
    }

    const weightPattern = /^(?!0)\d{1,3}$/;
    if (!formData.weight) {
      newErrors.weight = 'Weight is required.';
    } else if (!weightPattern.test(formData.weight) || parseInt(formData.weight, 10) > 500) {
      newErrors.weight = 'Please enter a valid weight between 1 and 500';
    }

    const zipPattern = /^(\d{5}|\d{5}-\d{4})$/;
    if (!formData.postal.trim()) {
      newErrors.postal = 'Zip Code is required';
    } else if (!zipPattern.test(formData.postal.trim())) {
      newErrors.postal = 'Zip Code must be in the format xxxxx or xxxxx-xxxx';
    }

    if (!formData.gender.trim()) {
      newErrors.gender = 'Gender is required';
    } else if (formData.gender.trim() !== 'Male' && formData.gender.trim() !== 'Female'
    && formData.gender.trim() !== 'Other') {
      newErrors.gender = 'Gender must be either Male, Female, or Other';
    }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles form submission
   *
   * @param {Object} e Event object from form submission
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      fetch(`http://localhost:8085/patients/${patientId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          ssn: formData.ssn.trim(),
          email: formData.email.trim(),
          age: formData.age,
          height: formData.height,
          weight: formData.weight,
          insurance: formData.insurance.trim(),
          gender: formData.gender.trim(),
          street: formData.street.trim(),
          city: formData.city.trim(),
          state: formData.state.trim(),
          postal: formData.postal.trim()
        })
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return response.json().then((err) => {
            throw new Error(err.message);
          });
        })
        .then(() => {
          navigate(`/patients/${patientId}`);
        })
        .catch((error) => {
          if (error) {
            const newErrors = {};
            newErrors.email = 'Email already in use';
            setErrors(newErrors);
          }
        });
    }
  };

  return (
    <div className="form-box">
      <h2>Edit Patient</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          error={errors.firstName}
        />
        <Input
          type="text"
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          error={errors.lastName}
        />
        <Input
          type="text"
          label="SSN"
          name="ssn"
          value={formData.ssn}
          onChange={handleInputChange}
          error={errors.ssn}
        />
        <Input
          type="text"
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
        />
        <Input
          type="text"
          label="Street"
          name="street"
          value={formData.street}
          onChange={handleInputChange}
          error={errors.street}
        />
        <Input
          type="text"
          label="City"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          error={errors.city}
        />
        <Input
          type="text"
          label="State"
          name="state"
          value={formData.state}
          onChange={handleInputChange}
          error={errors.state}
        />
        <Input
          type="text"
          label="Postal"
          name="postal"
          value={formData.postal}
          onChange={handleInputChange}
          error={errors.postal}
        />
        <Input
          type="number"
          label="Age"
          name="age"
          value={formData.age}
          onChange={handleInputChange}
          error={errors.age}
        />
        <Input
          type="number"
          label="Height"
          name="height"
          value={formData.height}
          onChange={handleInputChange}
          error={errors.height}
        />
        <Input
          type="number"
          label="Weight"
          name="weight"
          value={formData.weight}
          onChange={handleInputChange}
          error={errors.weight}
        />
        <Input
          type="text"
          label="Insurance"
          name="insurance"
          value={formData.insurance}
          onChange={handleInputChange}
          error={errors.insurance}
        />
        <Input
          type="text"
          label="Gender"
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
          error={errors.gender}
        />
        <button type="submit" className="form-btn">Submit</button>
      </form>
    </div>
  );
};

export default EditPatientDetails;
