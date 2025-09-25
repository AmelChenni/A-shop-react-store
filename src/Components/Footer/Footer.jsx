import React from 'react'
import payment from '../../assets/payment.png'
import { CiFacebook } from "react-icons/ci";
import { RiTwitterXFill, RiInstagramLine, RiYoutubeLine } from "react-icons/ri";
import { FaPinterestP, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="custom-footer">
      <div className="footer-container">
        {/* Section One */}
        <div className="footer-top">
          <div className="footer-contact">
            <i className="fa-solid fa-headphones-simple" />
            <div>
              <h5>CALL US 24/7</h5>
              <p>((+1)-737-203-0951)</p>
            </div>
          </div>
          <div className="footer-social">
            <h5>FOLLOW US</h5>
            <div className="social-icons">
  <a href="https://facebook.com" target="_blank" rel="noreferrer" className="facebook">
    <CiFacebook />
  </a>
  <a href="https://twitter.com" target="_blank" rel="noreferrer" className="twitter">
    <RiTwitterXFill />
  </a>
  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="instagram">
    <RiInstagramLine />
  </a>
  <a href="https://youtube.com" target="_blank" rel="noreferrer" className="youtube">
    <RiYoutubeLine />
  </a>
  <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="pinterest">
    <FaPinterestP />
  </a>
  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="linkedin">
    <FaLinkedinIn />
  </a>
</div>

          </div>
          <div className="footer-payment">
            <img src={payment} alt="Payment Methods" />
          </div>
        </div>

        {/* Section Two */}
        <div className="footer-links">
          <div className="footer-col">
            <h3>Store Location</h3>
            <p>9066 Green Lake Drive Chevy Chase, MD 20815</p>
            <span>contact@example.com</span>
          </div>
          <div className="footer-col">
            <h3>Information</h3>
            <a href="#">About Us</a>
            <a href="#">Blog</a>
            <a href="#">Check Out</a>
            <a href="#">Contact</a>
            <a href="#">Service</a>
          </div>
          <div className="footer-col">
            <h3>My Account</h3>
            <a href="#">My Account</a>
            <a href="#">Contact</a>
            <a href="#">Shopping Cart</a>
            <a href="#">Shop</a>
          </div>
          <div className="footer-col">
            <h3>Categories</h3>
            <a href="#">Fruits &amp; Vegetables</a>
            <a href="#">Dairy Product</a>
            <a href="#">Package Foods</a>
            <a href="#">Beverage</a>
            <a href="#">Health &amp; Wellness</a>
          </div>
          <div className="footer-col">
            <h3>Subscribe Us</h3>
            <p>Sign up and get a voucher of worth $250.00</p>
            <div className="subscribe-box">
              <input type="email" placeholder="Email address..." />
              <button type="button">Subscribe</button>
            </div>
          </div>
        </div>

        {/* Section Three */}
        <div className="footer-bottom">
          <p>Copyright © 2025 <span>A-Shop</span>. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}
