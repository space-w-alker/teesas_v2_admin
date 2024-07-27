import React from "react";

const validateAdminUser = (formData) => {
  const errors = {};
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (formData.First_Name === "") {
    errors.First_Name = "First Name is required";
  }
  if (formData.Last_Name === "") {
    errors.Last_Name = "Last Name is required";
  }
  if (formData.Middle_Name === "") {
    errors.Middle_Name = "Middle Name is required";
  }
  if (formData.Admin_Role === "") {
    errors.Admin_Role = "Admin Role is required";
  }
  if (formData.Gender === "") {
    errors.Gender = "Gender is required";
  }
  if (formData.Date_of_Birth === "") {
    errors.Date_of_Birth = "Date of Birth is required";
  }
  if (formData.Phone_Contact === "") {
    errors.Phone_Contact = "Phone Contact is required";
  } else if (formData.Phone_Contact.length !== 10) {
    errors.Phone_Contact = "Phone Contact must be 10 digits";
  }
  if (formData.Email === "") {
    errors.Email = "Email is required";
  } else if (!emailPattern.test(formData.Email)) {
    errors.Email = "Email is not in correct format";
  }
  if (formData.Address === "") {
    errors.Address = "Address is required";
  }
  if (formData.file === "") {
    errors.file = "File is required";
  }

  return errors;
};

export default validateAdminUser;


// const handleSubmit = (e) => {
//     e.preventDefault();
//     const validationErrors = validateAdminUser(formData);
//     setErrors(validationErrors);

//     if (Object.keys(validationErrors).length === 0) {
//       // Submit form data
//       console.log("Form submitted successfully", formData);
//     }
//   };