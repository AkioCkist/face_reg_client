// Validation utility functions
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  // At least 8 characters, one uppercase, one lowercase, one number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const validateRequired = (value) => {
  return value !== null && value !== undefined && value.toString().trim() !== '';
};

export const validateLength = (value, min = 0, max = Infinity) => {
  const length = value ? value.toString().length : 0;
  return length >= min && length <= max;
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validateUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateAge = (birthDate) => {
  const today = new Date();
  const birth = new Date(birthDate);
  const age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    return age - 1;
  }
  
  return age >= 0 && age <= 150;
};

// Form validation helper
export const createValidator = (rules) => {
  return (values) => {
    const errors = {};
    
    Object.keys(rules).forEach(field => {
      const fieldRules = rules[field];
      const value = values[field];
      
      for (const rule of fieldRules) {
        const { validator, message } = rule;
        if (!validator(value)) {
          errors[field] = message;
          break; // Stop at first error for this field
        }
      }
    });
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };
};

// Common validation rules
export const VALIDATION_RULES = {
  required: (message = 'This field is required') => ({
    validator: validateRequired,
    message
  }),
  email: (message = 'Please enter a valid email address') => ({
    validator: validateEmail,
    message
  }),
  password: (message = 'Password must be at least 8 characters with uppercase, lowercase and number') => ({
    validator: validatePassword,
    message
  }),
  minLength: (min, message = `Minimum length is ${min} characters`) => ({
    validator: (value) => validateLength(value, min),
    message
  }),
  maxLength: (max, message = `Maximum length is ${max} characters`) => ({
    validator: (value) => validateLength(value, 0, max),
    message
  }),
  phone: (message = 'Please enter a valid phone number') => ({
    validator: validatePhone,
    message
  })
};
