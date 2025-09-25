import { Link } from 'react-router'
import axios from 'axios'
import { Formik, useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import * as Yup from 'yup';

export default function Register() {
   let [errors,setErrors] =useState("");
    let[data,setData] = useState([]);
    const navigate = useNavigate();

    // register yup schema
  const schema = Yup.object({
     userName: Yup.string().required('User name is required...').min(3,"min lenght is 3").max(20,"max length is 20"),
  fullName: Yup.string().required('Full name is required...').min(3,"min lenght is 3").max(20,"max length is 20"),
  email: Yup.string().email().required("is required"),
  phoneNumber: Yup.string().required("is required"),
  password: Yup.string().required("is required"),
  })

// sendRegisterData function
    async function sendRegisterData(values){
      console.log("hello");
      
  try{
    let {data} = await axios.post('https://kashop1.runasp.net/api/Identity/Account/Register',values);
    console.log("data");
        console.log(data);

      setData(data);
      formik.resetForm();
      navigate('/login');
    }catch (error){
      console.log(error.response.data.message.split(","));
      
      setErrors(error.response.data.message.split(","));    
   }   
      
  }

    //  formik  
    let formik = useFormik({
      initialValues :{
        email : "",
        userName:"",
        fullName:"",
        password: "",
        phoneNumber : '',

      },validationSchema :schema,
      onSubmit:sendRegisterData,
      })

  return (
<>

<form className='container-form mt-5'   onSubmit={formik.handleSubmit}>
  {/* email  */}
{errors&&  errors.map((err,index)=><p className='text-danger fw-bold'>*{index+1}-{err}</p>)}

  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" aria-describedby="emailHelp"  
     name="email" 
      value={formik.values.email}
      onBlur={formik.handleBlur}
      onChange={formik.handleChange} 
      />
    {formik.touched.email && formik.errors.email?(<p className='text-danger'>*{formik.errors.email}</p>): null}
  </div>

    {/* username  */}
  <div className="mb-3">
    <label htmlFor="userName" className="form-label">User Name</label>
    <input type="text" className="form-control" id="userName" aria-describedby="emailHelp" 
   name="userName" 
      value={formik.values.userName}
      onBlur={formik.handleBlur}
      onChange={formik.handleChange} />
  {formik.touched.userName && formik.errors.userName?(<p className='text-danger'>*{formik.errors.userName}</p>): null}
  </div> 

    {/* Full NAme  */}
  <div className="mb-3">
    <label htmlFor="fullName" className="form-label">Full Name</label>
    <input type="text" className="form-control" id="fullName" aria-describedby="emailHelp"
name="fullName" 
      value={formik.values.fullName}
      onBlur={formik.handleBlur}
      onChange={formik.handleChange} />
          {formik.touched.fullName && formik.errors.fullName?(<p className='text-danger'>*{formik.errors.fullName}</p>): null}
        </div>

    {/* Number  */}
  <div className="mb-3">
    <label htmlFor="phonrNumber" className="form-label">Phone Number</label>
    <input type="phone" className="form-control" id="phonrNumber" aria-describedby="emailHelp" 
name="phoneNumber" 
      value={formik.values.phoneNumber}
      onBlur={formik.handleBlur}
      onChange={formik.handleChange} /> 
        {formik.touched.phoneNumber && formik.errors.phoneNumber?(<p className='text-danger'>*{formik.errors.phoneNumber}</p>): null}
       </div>

  {/* password */}
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" 
name="password" 
      value={formik.values.password}
      onBlur={formik.handleBlur}
      onChange={formik.handleChange} />  
        {formik.touched.password && formik.errors.password?(<p className='text-danger'>*{formik.errors.password}</p>): null}
      </div>


  <button type="submit" className="btn btn-primary  m-auto px-5 py-2 mt-4 w-100" >Submit</button>
</form>

</>
  )
}
