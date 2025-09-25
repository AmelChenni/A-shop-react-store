import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router';
import Products from '../Components/Products/Products';
import { useQuery } from '@tanstack/react-query';

export default function Search() {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("q");
  const getResult = async () => {
    const { data } = await axios.get(`https://dummyjson.com/products/search?q=${query}`);
    return data;
  };
  const {
    data: results,
    isLoading: loadingResults,
    isError: errorResults,
    error: resultsError
  } = useQuery({
    queryKey: ["results", query],
    queryFn: getResult,
    staleTime: 1000 * 60 * 5
  });

  // Get categories
  const getCategories = async () => {
    const { data } = await axios.get(`https://dummyjson.com/products/category-list`);
    return data;
  };
  const {
    data: categories,
    isLoading: loadingCategories,
    isError: errorCategories,
    error: categoriesError
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 5
  });

  if (errorResults) return <p>Error: {resultsError.message}</p>;
  if (loadingResults) return <p>Loading results...</p>;

  if (errorCategories) return <p>Error: {categoriesError.message}</p>;
  if (loadingCategories) return <p>Loading categories...</p>;
  return (
    <div className='categories'>
 {/*  categories side */}
 {/* <div className="sidebar">
  <ul>
    <Link to={'/categories'} className='title'>Our Categories</Link>
    {categories.map((category ,index)=>(
      <Link to={`/categories/${category}`} key={index}><li>{category}</li></Link>
      
    ))}
  </ul>
 </div> */}
 {/* products side */}
 <div className="content">
    {/* <h2 className='category-title '>{title}</h2> */}
{results?.products?.length ==0?
 <h2 className='category-title '>No Result for" {query}"</h2> 
:
  <div>
  <h2 className='category-title '>Results for "{query}"({results.total})</h2>
      <div className="container">
        <div className="row">
                {results?.products?.map((result,index)=>
                <div className="col-3 mb-4" key={index}>
                       <div className="card position-relative" >
                            <div>
                            <span className="position-absolute  start  badge rounded bg-danger p-2">{result.id}</span>
                            <img src={result.images?.[0]} className="card-img-top" alt={result.title} />
                            <div className="card-body">
                                <h5 className="card-title">{result.title}</h5>
                                <h4 className="card-category">{result.category}</h4>
                                <p className="card-text">{result.description}</p>
                                <p className="card-price">${result.price}</p>
                                <p className="card-rating">{result.rating}</p>

                                <Link to={`/product/${result.id}`}   className="btn btn-primary">More Details</Link>
                            </div>
                            </div>

                </div>

                </div>
                )}
        </div>
{
         <Link to="/categories" className=' seeMore btn btn-primary  d-block m-auto mt-5 py-2 px-3 '>See All Products</Link>
}      </div>
    </div> 
}
    </div>
    </div>
  )
}
