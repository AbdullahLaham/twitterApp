import React from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import * as yup from 'yup'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useField } from "formik";
import { loginRequest } from '../actions/userAuth';
const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const PASSWORD_REGEX = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})';
  const validationSchema = yup.object({
    email: yup.string().email('please enter a valid email').required("the email is required"),
    password: yup.string().matches(PASSWORD_REGEX, 'please enter a strong password').required('password is required'),
  });
  const onSubmit = async (values) => {
    const data = {
      email: values.email,
      password: values.password,
    }
    dispatch(loginRequest(data));
    navigate('/')
  }
  const formik = useFormik({
    initialValues: {
        email: '',
        password: '',
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });
  
  console.log(formik.errors)
  return (
    <div>
      <form className='flex flex-col gap-3 ' onSubmit={formik.handleSubmit}>
        <input name='email' type='email' placeholder='Enter your Email' value={formik.values.email} onChange={formik.handleChange} className='px-[.9rem] py-[.5rem] w-[16rem] bg-gray-200 text-black border-none outline-none rounded-md pl-[.7rem]'  />
        {formik.touched.email && formik?.errors?.email}
        <input type='password' name='password' placeholder='Enter your Password' value={formik.values.password} onChange={formik.handleChange} className='px-[.9rem] py-[.5rem] w-[16rem] bg-gray-200 text-black border-none outline-none rounded-md pl-[.7rem]'  />
        {formik.touched.password && formik?.errors?.password}
        <button type='submit'  className='text-gray-100 font-bold bg-gray-500 hover:bg-gray-600 py-[.4rem] px-[1rem] rounded-lg '>Login</button>
      </form>
    </div>
  )
}

export default LoginForm
