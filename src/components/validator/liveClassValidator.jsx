import React from "react";

const validateLiveClass = (formData) => {
  
  const errors = {};
  const currentDate = new Date();
  const selectedDate = new Date(formData.Date);
  const startTime = new Date(`${formData.Date}T${formData.Start_Time}`);
  const endTime = new Date(`${formData.Date}T${formData.End_Time}`);

  if (!formData.Category_Name) {
    errors.Category_Name = 'Category Name is required';
  }
  if (!formData.Grade_Name) {
    errors.Grade_Name = 'Grade Name is required';
  }
  if (!formData.Subject_Name) {
    errors.Subject_Name = 'Subject Name is required';
  }
  if (!formData.Lesson_Title) {
    errors.Lesson_Title = 'Lesson Title is required';
  }
  if (!formData.Teacher) {
    errors.Teacher = 'Teacher is required';
  }
  if (!formData.Date) {
    errors.Date = 'Date is required';
  } else if (selectedDate.setHours(0, 0, 0, 0) < currentDate.setHours(0, 0, 0, 0)) {
    errors.Date = 'Date cannot be in the past';
  }
  if (!formData.Start_Time) {
    errors.Start_Time = 'Start Time is required';
  }
  if (!formData.End_Time) {
    errors.End_Time = 'End Time is required';
  } else if (startTime >= endTime) {
    errors.End_Time = 'End Time must be after Start Time';
  }
  if (formData.Reoccurring === "") {
    errors.Reoccurring = "Reoccurring field is required";
  }
  if (!formData.Description) {
    errors.Description = 'Description is required';
  }

  return errors;
};

export default validateLiveClass;


// const handleSubmit = (e) => {
//     e.preventDefault();
//     const validationErrors = validateLiveClass(formData);
//     setErrors(validationErrors);

//     if (Object.keys(validationErrors).length === 0) {
//       // Submit form data
//       console.log("Form submitted successfully", formData);
//     }
//   };