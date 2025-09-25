import { useEffect, useState } from "react";
import { createContext } from "react";
import jwt_decode from "jwt-decode";
import { showErrorToast, showSuccessToast } from "../../ToastConfig";

export const Cartcontext = createContext(null);
const CartContextProvider = ({ children }) => {
let [user,setUser] =useState(null)
  function saveCurrentUser() {
  let token = localStorage.getItem("userToken");
  if (token) {
    let decode = jwt_decode(token);
    setUser(decode);
    console.log(decode, "dec");  
  } else {
    console.log("no token");
  }
}

// Cart**********************************************
const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (!savedCart || savedCart === "undefined") return { products: [] };
      return JSON.parse(savedCart);
    } catch (e) {
      console.error("Invalid cart in localStorage", e);
      return { products: [] };
    }
  });

  useEffect(() => {
    if (cart) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const updateQuantity = (productId, quantity) => {
    try {
      const updatedProducts = cart.products.map(p =>
        p.id === productId ? { ...p, quantity } : p
      );

      const updatedCart = {
        ...cart,
        products: updatedProducts,
        totalProducts: updatedProducts.length,
        totalQuantity: updatedProducts.reduce((acc, p) => acc + p.quantity, 0),
        total: updatedProducts.reduce((acc, p) => acc + p.price * p.quantity, 0),
      };

      setCart(updatedCart);
      showSuccessToast("Quantity updated successfully!");
    } catch (error) {
      console.error(error);
      showErrorToast("Error... try again");
    }
  };

  const deleteProduct = (productId) => {
    try {
      const updatedProducts = cart.products.filter(p => p.id !== productId);

      const updatedCart = {
        ...cart,
        products: updatedProducts,
        totalProducts: updatedProducts.length,
        totalQuantity: updatedProducts.reduce((acc, p) => acc + p.quantity, 0),
        total: updatedProducts.reduce((acc, p) => acc + p.price * p.quantity, 0),
      };

      if (updatedProducts.length === 0) {
        localStorage.removeItem("cart");
        setCart({ products: [] });
      } else {
        setCart(updatedCart);
      }

      showSuccessToast("Product deleted successfully!");
    } catch (error) {
      console.error(error);
      showErrorToast("Error... try again");
    }
  };


// cart *******************************
// add to cart from product details
const addToCart = (product, quantity) => {
  const savedCart = JSON.parse(localStorage.getItem("cart")) || { products: [] };

  const existingProduct = savedCart.products.find(p => p.id === product.id);

  let updatedProducts;
  if (existingProduct) {
    updatedProducts = savedCart.products.map(p =>
      p.id === product.id ? { ...p, quantity: p.quantity + quantity } : p
    );
  } else {
    updatedProducts = [
      ...savedCart.products,
      { 
        id: product.id, 
        title: product.title, 
        price: product.price, 
        thumbnail: product.thumbnail, 
        quantity 
      }
    ];
  }

  const updatedCart = {
    products: updatedProducts,
    totalProducts: updatedProducts.length,
    totalQuantity: updatedProducts.reduce((acc, p) => acc + (p.quantity || 0), 0),
    total: updatedProducts.reduce((acc, p) => acc + ((p.price || 0) * (p.quantity || 0)), 0),
  };

  localStorage.setItem("cart", JSON.stringify(updatedCart));
  setCart(updatedCart);
  showSuccessToast("Product added successfully!");
};






useEffect(() => {
    saveCurrentUser();
}, []);



  return (
    <>
      <Cartcontext.Provider
        value={{
          user,setUser,saveCurrentUser,deleteProduct,updateQuantity,cart,addToCart
        }}
      >
        {children}
      </Cartcontext.Provider>
    </>
  );
};

export default CartContextProvider;
