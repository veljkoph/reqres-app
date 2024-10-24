import * as yup from "yup";
export const LoginSchema = yup.object({
    email: yup.string()
        .email('Email not valid')
        .required('Email is required'),
    password: yup
        .string()
        .required("Password is required")
        .min(8, "Password too short"),
});