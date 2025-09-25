// src/Components/Navbar/Navbar.jsx
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import logo from "../../assets/logo.png";
import { Cartcontext } from "../Context/CartContext";
import { FaCartPlus } from "react-icons/fa";
import { MdOutlineAccountCircle } from "react-icons/md";

export default function Navbar() {
    const { cart } = useContext(Cartcontext);

  const { user, setUser } = useContext(Cartcontext);
  const navigate = useNavigate();

  const logoutFunction = () => {
    localStorage.removeItem("userToken");
    setUser?.(null);
    navigate("/login");
  };



console.log("cart");
console.log(cart);


  const totalQuantity = Number(cart.totalQuantity || 0);
  const total = Number(cart.total || 0).toFixed(2);
  
  useEffect(()=>{
totalQuantity
},[totalQuantity])

  // search
  const [query, setQuery] = useState("");
  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  const handleSubmit =async (e) => {
    e.preventDefault();                  
    const q = query.trim();              
    if (q){          
    navigate(`/search?q=${encodeURIComponent(q)}`);
    setQuery('');
  }
}

  
  return (
    <nav className="site-navbar navbar navbar-expand-lg">
  <div className="container-fluid d-flex align-items-center justify-content-between">
  {/* Logo + links */}
  <div className="d-flex align-items-center nav-right ">
    <Link className="navbar-brand d-flex align-items-center" to="/">
      <img src={logo} alt="logo" className="site-logo" />
      <span className="brand-text">A-Shop</span>
    </Link>

    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#siteNavbarContent"
      aria-controls="siteNavbarContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="siteNavbarContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 flex-lg-row flex-column">
        <li className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/categories">Products</Link>
        </li>
      </ul>
    </div>
  </div>

  {/* Search  (center) */}
  <form className="search-form mx-3" role="search" onSubmit={handleSubmit}>
    <input
      className="form-control search-input"
      type="search"
      placeholder="Search products..."
      aria-label="Search"
      value={query}
      onChange={handleChange}
    />
    <button className="btn btn-search" type="submit">Search</button>
  </form>

  {/* Right side */}
  <ul className="navbar-nav ms-auto align-items-center flex-lg-row flex-column nav-left">
    {user ? (
      <>
        <li className="nav-item account d-flex align-items-center">
          <MdOutlineAccountCircle className="account-icon" />
          <Link className="nav-link account-link" to="/profile">
            <span className="small">Hi,</span>
            <strong className="d-block">
              {user.firstName} . {user.lastName?.charAt(0) || ""}
            </strong>
            <span className="small">Account</span>
          </Link>
        </li>
        <li className="nav-item">
          <button className="btn btn-link nav-link logout-btn" onClick={logoutFunction}>
            Log out
          </button>
        </li>
        <li className="nav-item ms-3">
          <Link to="/cart" className="cart-link position-relative">
            <FaCartPlus size={24} />
            <span className="cart-badge badge rounded-pill bg-danger">
              {totalQuantity}
            </span>
            <div className="cart-total small">${total}</div>
          </Link>
        </li>
      </>
    ) : (
      <>
        <li className="nav-item">
          <Link className="nav-link" to="/register">Register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
        <li className="nav-item ms-3">
          <Link to="/cart" className="cart-link position-relative">
            <FaCartPlus size={24} />
            <span className="cart-badge badge rounded-pill bg-danger">0</span>
            <div className="cart-total small">$0.00</div>
          </Link>
        </li>
      </>
    )}
  </ul>
</div>

    </nav>
  );
}
