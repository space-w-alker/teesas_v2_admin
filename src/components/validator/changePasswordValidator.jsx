import React from "react";

const validateChangePassword = (formData) => {
  const errors = {};

  if (formData.Old_Password === "") {
    errors.Old_Password = "Old Password is required";
  }
  if (formData.Password === "") {
    errors.Password = "Password is required";
  } else if (formData.Password.length <= 6) {
    errors.Password = "Password must be at least 6 characters";
  }
  if (formData.Confirm_Password === "") {
    errors.Confirm_Password = "Confirm Password is required";
  } else if (formData.Confirm_Password !== formData.Password) {
    errors.Confirm_Password = "Password and Confirm Password do not match";
  }

  return errors;
};

export default validateChangePassword;


// const handleSubmit = (e) => {
//     e.preventDefault();
//     const validationErrors = validateChangePassword(formData);
//     setErrors(validationErrors);

//     if (Object.keys(validationErrors).length === 0) {
//       // Submit form data
//       console.log("Form submitted successfully", formData);
//     }
//   };