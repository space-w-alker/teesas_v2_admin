import React from "react";

const Validation = (formData) => {
  const errors = {};
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  

  if (formData.email === "") {
    errors.email = "Email is required";
  } else if (!emailPattern.test(formData.email)) {
    errors.email = "Email is not in correct format";
  }

  if (formData.password === "") {
    errors.password = "Password is required is required";
  } else if (formData.password.length <= 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};

export default Validation;
