import axios from "axios";
import React from "react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import "./Products.css";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";

export default function Products() {
  // get Products
  const getProducts = async () => {
      let { data } = await axios.get("https://dummyjson.com/products");
      return data;
   
  };
  const{data,isLoading,isError,error} =useQuery({
     queryKey: ["products"],
    queryFn:getProducts,
    staleTime:1000*60*5
  })
  

 if (isError) return <p>Error: {error.message}</p>;
  if (isLoading) return <p>Loading...</p>;
  // show all products or just 10
  const showAll = location.pathname.includes("/categories");
  const limit = showAll ? 1000 : 12;
  const title = showAll ? "All Products" : "Featured Products";

  return (
    <div>
      <h2 className="category-title ">{title}</h2>
      <div className="container">
        <div className="row">
          {data?.products?.slice(0, limit).map((product, index) => (
            <div className="col-12 col-md-4 col-lg-3 mb-4 product" key={index}>
              <div className="card position-relative">
                <div>
                  <span className="position-absolute  start  badge rounded bg-danger p-2">
                    {product.id}
                  </span>
                  <img
                    src={product.images?.[0]}
                    className="card-img-top"
                    alt={product.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <h4 className="card-category">{product.category}</h4>
                    <p className="card-text">{product.description}</p>
                    <p className="card-price">
                      <span>Now</span> : ${product.price} <span>{}</span>
                    </p>

                    <div className="rating">
                      <span style={{ color: "#ffd700", fontSize: "20px" }}>
                        {Array.from({ length: 5 }, (_, i) => {
                          const rating = product.rating || 0;
                          if (i + 1 <= Math.floor(rating)) {
                            return <FaStar key={i} />;
                          } else if (i + 0.5 <= rating) {
                            return <FaStarHalfAlt key={i} />;
                          } else {
                            return <FaRegStar key={i} />;
                          }
                        })}
                      </span>
                      <span> | {product.reviews?.length} reviews</span>
                    </div>

                    <Link
                      to={`/product/${product.id}`}
                      className="btn btn-primary"
                    >
                      More Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {showAll ? (
          ""
        ) : (
          <Link
            to="/categories"
            className=" seeMore btn btn-primary  d-block m-auto mt-5 py-2 px-3 "
          >
            See More
          </Link>
        )}{" "}
      </div>
    </div>
  );
}









