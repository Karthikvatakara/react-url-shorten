import * as Yup from 'yup';

export const signupSchema = Yup.object({
    username: Yup.string()
        .min(4,'username must be atleast 4 characters')
        .required('username is required'),
    email: Yup.string()
        .email('invalid email')
        .required('email is required'),
    password: Yup.string()
        .min(6,'password must be 6 characters')
        .required('password is required')
})

export const loginSchema = Yup.object({
    email: Yup.string()
        .email('invalid email')
        .required('email is required'),
    password: Yup.string()
        .required('password is required')
})