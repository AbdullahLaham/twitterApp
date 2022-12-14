import React, { useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import * as yup from 'yup'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useField } from "formik";
import { signupRequest } from '../actions/userAuth';
import FileBase from 'react-file-base64';

const SignupForm = () => {
  const navigate = useNavigate();
  const [userImage, setUserImage] = useState();
  const dispatch = useDispatch(); 
  // const PASSWORD_REGEX = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})';.matches(PASSWORD_REGEX, 'please enter a strong password')
  const validationSchema = yup.object({
    email: yup.string().email('please enter a valid email').required("the email is required"),
    password: yup.string().required('password is required'),
  });
  const addImageToPost = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file)
    }
    reader.onload = (readerEvent) => {
      setUserImage(readerEvent.target.result);   
    }
  }
  const onSubmit = (values) => {
    const data = {
      name: values.name,
      email: values.email,
      password: values.password,
      confirmPassword: values.passwordConfirmation,
      image: userImage,
    }
    // console.log('imaaaaaaage', userImage)
    dispatch(signupRequest(data));
    navigate('/');
  }
  const formik = useFormik({
    initialValues: {
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });
  
  return (
    <div className=''>
      <form className='flex flex-col justify-between gap-3' onSubmit={formik.handleSubmit} >
        <input type='text' name='name' onChange={formik?.handleChange} value={formik.values.name}  placeholder='Enter your Name' className='px-[.9rem] py-[.5rem] w-[16rem] bg-gray-200 text-black border-none outline-none rounded-md pl-[.7rem]'  />
        {formik.touched.name && formik?.errors?.name}
        <input type='email' name='email' onChange={formik?.handleChange} value={formik.values.email} placeholder='Enter your Email' className='px-[.9rem] py-[.5rem] w-[16rem] bg-gray-200 text-black border-none outline-none rounded-md pl-[.7rem]'  />
        {formik.touched.email && formik?.errors?.email}
        <input type='password' name='password' onChange={formik?.handleChange} value={formik.values.password} placeholder='Enter your Password' className='px-[.9rem] py-[.5rem] w-[16rem] bg-gray-200 text-black border-none outline-none rounded-md pl-[.7rem]'  />
        {formik.touched.password && formik?.errors?.password}
        <input type='password' name='passwordConfirmation' onChange={formik?.handleChange} value={formik.values.passwordConfirmation} placeholder='Confirm Password ' className='px-[.9rem] py-[.5rem] w-[16rem] bg-gray-200 text-black border-none outline-none rounded-md pl-[.7rem]'  />
        {formik.touched.passwordConfirmation && formik?.errors?.passwordConfirmation}
        <input type='file' onChange={(e) => addImageToPost(e.target.files[0])} />
        <button className='text-gray-100 font-bold bg-gray-500 hover:bg-gray-600 py-[.4rem] px-[1rem] rounded-lg ' type='submit'>SignUp</button>
      
      </form>

    </div>
  )
}

export default SignupForm
