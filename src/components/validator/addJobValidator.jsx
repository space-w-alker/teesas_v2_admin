const validateAddJob = (formData) => {
  const errors = {};

  if (!formData.jobTitle.trim()) {
    errors.jobTitle = "Job Title is required";
  }

  if (!formData.location.trim()) {
    errors.location = "Location is required";
  }

  if (!formData.jobType) {
    errors.jobType = "Job Type is required";
  }

  if (!formData.jobDescription.trim()) {
    errors.jobDescription = "Job Description is required";
  }
  if (!formData.duration.trim()) {
    errors.jobDescription = "Job Description is required";
  }
  if (!formData.duties.trim()) {
    errors.jobDescription = "Job Description is required";
  }
  if (!formData.qualifications.trim()) {
    errors.jobDescription = "Job Description is required";
  }

  return errors;
};

export default validateAddJob;
