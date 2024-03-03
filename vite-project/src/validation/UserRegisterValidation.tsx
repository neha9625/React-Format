import * as yup from "yup";

// Handle User Form validation using Yup 
export const UserRegisterValidationSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("First name is required")
    .matches(/^[a-zA-Z]+$/, "First name should contain only letters"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string()
    .required('No password provided.')
    .min(10, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
    .matches(/[a-z]/, "Password must be have Lower Case")
    .matches(/[A-Z]/, "Password must be have Upper Case")
    .matches(/\d+/, "Password atleast have one number")
    .matches(/[!@#$%^&*()-+]+/, "Password atleast have one special char")
});
