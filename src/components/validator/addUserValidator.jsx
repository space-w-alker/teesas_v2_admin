import React from "react";

const validateAddUser = (formData) => {
  const errors = {};
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneNumberPattern = /^[0-9]{11}$/; // Assuming phone number should be exactly 10 digits

  if (formData.First_Name === "") {
    errors.First_Name = "First Name is required";
  }
  if (formData.Last_Name === "") {
    errors.Last_Name = "Last Name is required";
  }
  if (formData.Gender === "") {
    errors.Gender = "Select Gender";
  }
  if (formData.Date_of_Birth === "") {
    errors.Date_of_Birth = "Date of Birth is required";
  }
  if (formData.Phone_Number === "") {
    errors.Phone_Number = "Phone Number is required";
  } else if (!phoneNumberPattern.test(formData.Phone_Number)) {
    errors.Phone_Number = "Enter a valid Phone Number";
  }
  if (formData.Email === "") {
    errors.Email = "Email is required";
  } else if (!emailPattern.test(formData.Email)) {
    errors.Email = "Email is not in correct format";
  }
  if (formData.Address === "") {
    errors.Address = "Enter Address";
  }
  if (formData.Local_Government === "") {
    errors.Local_Government = "Select Local Government";
  }
  if (formData.Academy_Code === "") {
    errors.Academy_Code = "Enter Academy Code";
  }
  if (formData.Academy_Name === "") {
    errors.Academy_Name = "Enter Academy Name";
  }
  if (formData.LGA === "") {
    errors.LGA = "Select LGA";
  }
  if (formData.Senatorial_District === "") {
    errors.Senatorial_District = "Select Senatorial District";
  }
  if (formData.Course === "") {
    errors.Course = "Select Course";
  }
  if (formData.Grade === "") {
    errors.Grade = "Select Grade";
  }
  if (formData.Password === "") {
    errors.Password = "Password is required";
  } else if (formData.Password.length <= 6) {
    errors.Password = "Password must be at least 6 characters";
  }
  if (formData.Confirm_Password !== formData.Password) {
    errors.Confirm_Password = "Password and Confirm Password do not match";
  } else if (formData.Confirm_Password === '') {
    errors.Confirm_Password = "Confirm Password is required";
  }

  return errors;
};


// const validationErrors = validateAddUser(formData);
//     setErrors(validationErrors);

//     if (Object.keys(validationErrors).length === 0) {
//       // Submit form data
//       console.log("Form submitted successfully", formData);
//     }


export default validateAddUser;
