import Joi from 'joi';

export const userSchema = Joi.object({
  username: Joi.string().min(3).max(24).required()
    .messages({
      'string.min': 'Username must be at least 3 characters long',
      'string.max': 'Username cannot exceed 24 characters',
      'any.required': 'Username is required'
    }),
  email: Joi.string().email().required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),
  type: Joi.string().valid('user', 'admin').required()
    .messages({
      'any.only': 'Type must be either user or admin',
      'any.required': 'Type is required'
    }),
  password: Joi.string()
    .min(5)
    .max(24)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/)
    .required()
    .messages({
      'string.min': 'Password must be at least 5 characters long',
      'string.max': 'Password cannot exceed 24 characters',
      'string.pattern.base': 'Password must contain uppercase, lowercase, and special characters',
      'any.required': 'Password is required'
    }),
});

export const loginSchema = Joi.object({
  username: Joi.string().required()
    .messages({
      'any.required': 'Username is required'
    }),
  password: Joi.string().required()
    .messages({
      'any.required': 'Password is required'
    }),
});