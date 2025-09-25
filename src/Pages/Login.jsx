import axios from 'axios'
import { Formik, useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { showErrorToast } from '../ToastConfig';
import { Cartcontext } from '../Components/Context/CartContext';

export default function Login() {
     const { saveCurrentUser } = useContext(Cartcontext);
  
   let [errors,setErrors] =useState("");
    let[data,setData] = useState([]);
    const navigate = useNavigate();

    // register yup schema
  const schema = Yup.object({
  username: Yup.string().required("username is required"),
  password: Yup.string().required("Password is required"),
  })

// sendLoginData function
    async function sendLoginData(values){      
  try{
    let {data} = await axios.post('https://dummyjson.com/auth/login',values);
      setData(data.token);
      formik.resetForm();
    localStorage.setItem('userToken',data.accessToken)
    localStorage.setItem('userId',data.id)
    saveCurrentUser()
    navigate('/cart');
    }catch (error){
      showErrorToast("username Or password Wrong..try Again")
      error.response.data.message =='Invalid credentials' ?setErrors("username Or password Wrong..try Again") :"";
         }   
      
  }

    //  formik  
    let formik = useFormik({
      initialValues :{
        username : "",
        password: "",

      },validationSchema :schema,
      onSubmit:sendLoginData,
      })

  return (
<>

<form className='container-form mt-5'   onSubmit={formik.handleSubmit}>
{errors&&  <p className='text-danger fw-bold'>*{errors}</p>}
  {/* username  */}

  <div className="mb-3">
    <label htmlFor="username" className="form-label">User Name</label>
    <input type="text" className="form-control" id="username" aria-describedby="username"  
     name="username" 
      value={formik.values.username}
      onBlur={formik.handleBlur}
      onChange={formik.handleChange} 
      />
    {formik.touched.username && formik.errors.username?(<p className='text-danger'>*{formik.errors.username}</p>): null}
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
