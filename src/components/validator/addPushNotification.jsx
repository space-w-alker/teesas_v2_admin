const validatePushNotification = (formData) => {
  const errors = {};

  if (!formData.title.trim()) {
    errors.title = "Job Title is required";
  }

  if (!formData.type) {
    errors.type = "Type is required";
  }

  if (!formData.description.trim()) {
    errors.description = "Description is required";
  }

  return errors;
};

export default validatePushNotification;
