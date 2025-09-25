import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { Cartcontext } from "../Components/Context/CartContext";

export default function ProductDetails() {
  const { addToCart } = useContext(Cartcontext);
  // get single Product
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [mainImg, setMainImg] = useState(null);
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [productsCategory, setProductsCategory] = useState([]);

  // Get products
  const getProduct = async () => {
    try {
      let { data } = await axios.get(`https://dummyjson.com/products/${id}`);
      setProduct(data);
      setMainImg(data?.images?.[0]);
      setCategory(data.category);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProduct();
  }, [id]);


  //   get products from same category
  const getProductsCategory = async () => {
    try {
      let { data } = await axios.get(
        `https://dummyjson.com/products/category/${category}`);
      setProductsCategory(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (category) {
      getProductsCategory();
    }
  }, [category]);

  // Calc new Price
  let newPrice = (
    product?.price -
    (product.price * product.discountPercentage) / 100
  )?.toFixed(2);

  // add To Cart exemple with fake api

  //   const addToCart = async (productId, quantity) => {

  //   try {
  //     const token = localStorage.getItem('userToken');
  //     const userId = localStorage.getItem('userId');

  //     const { data } = await axios.post(
  //       'https://dummyjson.com/carts/add',
  //       {
  //         userId: userId,
  //         products: [
  //           { id: productId, quantity: quantity },
  //         ],
  //       },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     console.log("Cart response:", data);

  //     showSuccessToast('Product Added Sucessfelly')
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // add to cart in local storage
  // const addToCart = (product, quantity) => {
  //   const savedCart = JSON.parse(localStorage.getItem("cart")) || { products: [] };

  //   const existingProduct = savedCart.products.find(p => p.id === product.id);

  //   let updatedProducts;
  //   if (existingProduct) {
  //     updatedProducts = savedCart.products.map(p =>
  //       p.id === product.id ? { ...p, quantity: p.quantity + quantity } : p
  //     );
  //   } else {
  //     updatedProducts = [
  //       ...savedCart.products,
  //       {
  //         id: product.id,
  //         title: product.title,
  //         price: product.price,
  //         thumbnail: product.thumbnail,
  //         quantity
  //       }
  //     ];
  //   }

  //   const updatedCart = {
  //     products: updatedProducts,
  //     totalProducts: updatedProducts.length,
  //     totalQuantity: updatedProducts.reduce((acc, p) => acc + (p.quantity || 0), 0),
  //     total: updatedProducts.reduce((acc, p) => acc + ((p.price || 0) * (p.quantity || 0)), 0),
  //   };

  //   localStorage.setItem("cart", JSON.stringify(updatedCart));
  //   showSuccessToast("Product added successfully!");
  // };
  const addToCartFunction = async (product, quantity) => {
    try {
      await addToCart(product, quantity);
    } catch (error) {
       console.log(error);
    }
  };
  // handle rating
  // const [rating, setRating] = useState(0);

  // const handleRating = (rate) => {
  //   setRating(rate);
  // };

  return (
    <div className="container my-4">
      <Link to={"/"}>
        {" "}
        <p className="title">Back to Home</p>
      </Link>
      <div className="row">
        {/* ====== LEFT COLUMN : IMAGES ====== */}
        <div className="col-lg-4">
          <div className="imgs">
            <div className="thumbnail d-flex gap-2 flex-wrap">
              {product.images?.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={product.title}
                  width="80"
                  onClick={() => setMainImg(img)}
                  style={{ cursor: "pointer" }}
                />
              ))}
            </div>
            <div className="mainImg mt-3">
              <img src={mainImg} alt={product.title} width="100%" />
            </div>
          </div>
        </div>

        {/* ====== MIDDLE COLUMN : DETAILS ====== */}
        <div className="col-lg-5">
          <h6 className="text-muted">{product.brand}</h6>
          <h2>{product.title}</h2>

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

          <p className="text-success">1K+ bought in past month</p>
          <hr />
          <h4>About this item</h4>
          <p>{product.description}</p>

          <h5>Product Details</h5>
          <table className="table table-sm">
            <tbody>
              <tr>
                <td>Brand</td>
                <td>{product.brand}</td>
              </tr>
              <tr>
                <td>Category</td>
                <td>{product.category}</td>
              </tr>
              <tr>
                <td>SKU</td>
                <td>{product.sku}</td>
              </tr>
              <tr>
                <td>Weight</td>
                <td>{product.weight} g</td>
              </tr>
              <tr>
                <td>Dimensions</td>
                <td>
                  W:{product.dimensions?.width} - H:{product.dimensions?.height}{" "}
                  - D:{product.dimensions?.depth}
                </td>
              </tr>
              <tr>
                <td>Warranty</td>
                <td>{product.warrantyInformation}</td>
              </tr>
              <tr>
                <td>Return Policy</td>
                <td>{product.returnPolicy}</td>
              </tr>
              <tr>
                <td>Availability</td>
                <td>{product.availabilityStatus}</td>
              </tr>
            </tbody>
          </table>

          <h5>Reviews</h5>
          {product.reviews?.map((rev, i) => (
            <div key={i}>
              <strong>{rev.reviewerName}</strong> ⭐ {rev.rating}
              <p>{rev.comment}</p>
              <hr />
            </div>
          ))}
        </div>

        {/* ====== RIGHT COLUMN : PRICE + SHIPPING ====== */}
        <div className="col-lg-3">
          <div className="priceBox p-3">
            <h4>
              ${newPrice}{" "}
              <small className="text-muted">
                <del>${product.price}</del>
              </small>
            </h4>
            <p className="text-success">
              You save ${(product.price - newPrice).toFixed(2)} (
              {product.discountPercentage}%)
            </p>

            <p>
              <strong>Shipping:</strong> {product.shippingInformation}
            </p>
            <p>
              <strong>Stock:</strong>{" "}
              {product.stock > 0 ? "Available" : "Out of stock"}
            </p>
            <div className="quantity-container mb-3">
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="quantity-input"
              />
              <button
                className="btn btn-add"
                onClick={() => addToCartFunction(product, quantity)}
              >
                Add to Cart
              </button>
            </div>

            <button className="btn btn-danger w-100">Buy Now</button>
          </div>
        </div>
      </div>
      <hr />
      <div className="row justify-content">
        <h3>Products related to this item :</h3>
        {productsCategory?.map((ele, index) => (
          <div className="col-lg-4 mb-3" key={index}>
            <div className="card position-relative">
              <div>
                <span className="position-absolute  start  badge rounded bg-danger p-2">
                  {ele.id}
                </span>
                <img
                  src={ele.images?.[0]}
                  className="card-img-top"
                  alt={ele.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{ele.title.substring(0, 15)}</h5>
                  <h4 className="card-category">{ele.category}</h4>
                  <p className="card-text">{ele.description}</p>
                  <p className="card-price">${ele.price}</p>
                  <div
                    className="rating"
                    style={{ paddingBottom: "3px", textAlign: "center" }}
                  >
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
                    <span>|{product.reviews?.length} reviews</span>
                  </div>
                  <Link to={`/product/${ele.id}`} className="btn btn-primary">
                    More Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
