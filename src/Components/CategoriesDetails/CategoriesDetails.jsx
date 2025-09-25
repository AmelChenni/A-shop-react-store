import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Link, useParams } from 'react-router';

export default function CategoriesDetails() {
  const { category } = useParams();

  const getProductsByCategory = async () => {
 
      let { data } = await axios.get(`https://dummyjson.com/products/category/${category}`);
      return data;
   
  };
  const{data,isLoading,isError,error} =useQuery({
     queryKey: ["category", category],
    queryFn:getProductsByCategory,
    staleTime:1000*60*5
  })
  

 if (isError) return <p>Error: {error.message}</p>;
  if (isLoading) return <p>Loading...</p>;
  

  return (
    <div>
      <div className="container">
        <div className="row">
                {data?.products?.map((product,index)=>
                <div className="col-3" key={index}>
                       <div className="card position-relative" >
                            <div>
                            <span className="position-absolute  start  badge rounded bg-danger p-2">{product.id}</span>
                            <img src={product.images?.[0]} className="card-img-top" alt={product.title} />
                            <div className="card-body">
                                <h5 className="card-title">{product.title}</h5>
                                <h4 className="card-category">{product.category}</h4>
                                <p className="card-text">{product.description}</p>
                                <p className="card-price">${product.price}</p>
                                <p className="card-rating">{product.rating}</p>

                                <Link to={`/product/${product.id}`}   className="btn btn-primary">More Details</Link>
                            </div>
                            </div>

                </div>

                </div>
                )}
        </div>
      </div>
    </div>
  );
}
