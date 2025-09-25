import React, { useContext, useEffect, useState } from 'react';
import { showErrorToast, showSuccessToast } from '../ToastConfig';
import { Link } from 'react-router';
import { Cartcontext } from '../Components/Context/CartContext';

export default function Cart() {
  const {updateQuantity,deleteProduct,cart} =useContext(Cartcontext)
  // const [cart, setCart] = useState(() => {
  //   try {
  //     const savedCart = localStorage.getItem("cart");
  //     if (!savedCart || savedCart === "undefined") return { products: [] };
  //     return JSON.parse(savedCart);
  //   } catch (e) {
  //     console.error("Invalid cart in localStorage", e);
  //     return { products: [] };
  //   }
  // });

  // useEffect(() => {
  //   if (cart) {
  //     localStorage.setItem("cart", JSON.stringify(cart));
  //   }
  // }, [cart]);

  const updateQuantityFunction =async(productId, quantity)=>{
    try{
          await updateQuantity(productId, quantity);

    }catch(error){
      console.log(error);
      
    }  
  }

    const deleteProductFunction =async(productId)=>{
    try{
          await deleteProduct(productId);

    }catch(error){
      console.log(error);
      
    }  
  }
  // const updateQuantity = (productId, quantity) => {
  //   try {
  //     const updatedProducts = cart.products.map(p =>
  //       p.id === productId ? { ...p, quantity } : p
  //     );

  //     const updatedCart = {
  //       ...cart,
  //       products: updatedProducts,
  //       totalProducts: updatedProducts.length,
  //       totalQuantity: updatedProducts.reduce((acc, p) => acc + p.quantity, 0),
  //       total: updatedProducts.reduce((acc, p) => acc + p.price * p.quantity, 0),
  //     };

  //     setCart(updatedCart);
  //     showSuccessToast("Quantity updated successfully!");
  //   } catch (error) {
  //     console.error(error);
  //     showErrorToast("Error... try again");
  //   }
  // };

  // const deleteProduct = (productId) => {
  //   try {
  //     const updatedProducts = cart.products.filter(p => p.id !== productId);

  //     const updatedCart = {
  //       ...cart,
  //       products: updatedProducts,
  //       totalProducts: updatedProducts.length,
  //       totalQuantity: updatedProducts.reduce((acc, p) => acc + p.quantity, 0),
  //       total: updatedProducts.reduce((acc, p) => acc + p.price * p.quantity, 0),
  //     };

  //     if (updatedProducts.length === 0) {
  //       localStorage.removeItem("cart");
  //       setCart({ products: [] });
  //     } else {
  //       setCart(updatedCart);
  //     }

  //     showSuccessToast("Product deleted successfully!");
  //   } catch (error) {
  //     console.error(error);
  //     showErrorToast("Error... try again");
  //   }
  // };

  if (!cart || cart.products.length === 0) {
    return <div className="text-center mt-5">Your cart is empty.</div>;
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4">My Cart</h2>

      <table className="table table-bordered table-hover cart-table">
        <thead className="cart-header">
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cart.products.map((p, index) => (
            <tr key={p.id}>
              <td>{index + 1}</td>
              <td>
                <img src={p.thumbnail}  alt={p.title} width="50" className="me-2 rounded" />
                <Link to={`/product/${p.id}`} style={{color:'black'}}>{p.title}</Link>
              </td>
              <td>${p?.price?.toFixed(2)}</td>
              <td>
                <input
                  type="number"
                  min="1"
                  value={p.quantity}
                  onChange={(e) => updateQuantityFunction(p.id, Number(e.target.value))}
                  className="form-control"
                  style={{ width: '70px' }}
                />
              </td>
              <td>${(p.price * p.quantity)?.toFixed(2)}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm m-auto d-block"
                  onClick={() => deleteProductFunction(p.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-end mt-4">
        <div className="card p-3 w-50">
          <h5>Cart Summary</h5>
          <p>Total Products: <strong>{cart.totalProducts}</strong></p>
          <p>Total Quantity: <strong>{cart.totalQuantity}</strong></p>
          <p>Total Price: <strong>${cart?.total?.toFixed(2)}</strong></p>
          <button className="btn btn-success w-100 mt-2">Checkout</button>
        </div>
      </div>
    </div>
  );
}
