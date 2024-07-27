import React from "react";

const validateAddTeacher = (formData) => {
  const errors = {};
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneNumberPattern = /^[0-9]{11}$/; // Assuming phone number should be exactly 10 digits

  if (formData.Full_Name === "") {
    errors.Full_Name = "Full Name is required";
  }
  if (formData.Gender === "") {
    errors.Gender = "Select Gender";
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
  if (formData.Grade === "") {
    errors.Grade = "Select Grade";
  }
  if (formData.Id === "") {
    errors.Id = "Enter ID";
  }
  if (formData.Description === "") {
    errors.Description = "Enter Description";
  }
  if (formData.file === "") {
    errors.file = "File is required";
  }

  return errors;
};

export default validateAddTeacher;


// const handleSubmit = (e) => {
//     e.preventDefault();
//     const validationErrors = validateAddTeacher(formData);
//     setErrors(validationErrors);

//     if (Object.keys(validationErrors).length === 0) {
//       // Submit form data
//       console.log("Form submitted successfully", formData);
//     }
//   };