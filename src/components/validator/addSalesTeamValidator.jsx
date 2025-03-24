const validateSalesTeamForm = (formData) => {
  const errors = {};

  if (!formData.Full_Name?.trim()) {
    errors.Full_Name = "Full Name is required";
  }

  if (!formData.Gender) {
    errors.Gender = "Gender is required";
  }

  if (!formData.Phone_Number?.trim()) {
    errors.Phone_Number = "Phone Number is required";
  } else if (!/^\d{10,15}$/.test(formData.Phone_Number)) {
    errors.Phone_Number = "Enter a valid phone number (10-15 digits)";
  }

  if (!formData.Email?.trim()) {
    errors.Email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.Email)) {
    errors.Email = "Enter a valid email address";
  }

  if (!formData.Region?.trim()) {
    errors.Region = "Region is required";
  }

  if (!formData.Team_Code?.trim()) {
    errors.Team_Code = "Team Code is required";
  }

  if (!formData.Team_Name?.trim()) {
    errors.Team_Name = "Team Name is required";
  }

  if (!formData.Location?.trim()) {
    errors.Location = "Location is required";
  }

  if (!formData.Territory?.trim()) {
    errors.Territory = "Territory is required";
  }

  if (!formData.Role?.trim()) {
    errors.Role = "Role is required";
  }

  if (!formData.Description?.trim()) {
    errors.Description = "Description is required";
  }

  if (!formData.WhatsApp?.trim()) {
    errors.WhatsApp = "WhatsApp number is required";
  } else if (!/^\d{10,15}$/.test(formData.WhatsApp)) {
    errors.WhatsApp = "Enter a valid WhatsApp number (10-15 digits)";
  }

  return errors;
};

export default validateSalesTeamForm;
