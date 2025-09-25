import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { Link, Outlet } from 'react-router';

export default function Categories() {
  // getCategories
   const getCategories = async () => {
      let { data } = await axios.get(`https://dummyjson.com/products/category-list`);
       return data;
    }
      const {data,isError,isLoading,error} =useQuery({
        queryKey :['categorieslist'],
        queryFn:getCategories,
        staleTime :1000*60*5
      })
        if(isError) return<p>errors is :{error}</p>
          if(isLoading) return <p>is loading</p>

  return (
    <div className='categories'>
 {/*  categories side */}
 <div className="sidebar">
  <ul>
    <Link to={'/categories'} className='title'>Our Categories</Link>
    {data.map((category ,index)=>(
      <Link to={`/categories/${category}`} key={index}><li>{category}</li></Link>
      
    ))}
  </ul>
 </div>
 {/* products side */}
 <div className="content">
    {/* <h2 className='category-title '>{title}</h2> */}
  <Outlet/>
 </div>
    </div>
  )
}
