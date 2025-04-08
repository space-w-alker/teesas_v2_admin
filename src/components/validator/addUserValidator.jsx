import React from "react";

const validateAddUser = (formData) => {
  const errors = {};
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneNumberPattern = /^[0-9]{11}$/; // Assuming phone number should be exactly 11 digits

  if (!formData.first_name.trim()) {
    errors.first_name = "First Name is required";
  }
  if (!formData.last_name.trim()) {
    errors.last_name = "Last Name is required";
  }
  if (!formData.gender) {
    errors.gender = "Select Gender";
  }
  if (!formData.date_of_birth) {
    errors.date_of_birth = "Date of Birth is required";
  }
  if (!formData.phone.trim()) {
    errors.phone = "Phone Number is required";
  } else if (!phoneNumberPattern.test(formData.phone)) {
    errors.phone = "Enter a valid Phone Number";
  }
  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!emailPattern.test(formData.email)) {
    errors.email = "Email is not in correct format";
  }
  if (!formData.location.trim()) {
    errors.location = "Enter Address";
  }
  if (!formData.grade) {
    errors.grade = "Select Grade";
  }
  if (!formData.course) {
    errors.course = "Select Course";
  }
 

  return errors;
};

export default validateAddUser;
