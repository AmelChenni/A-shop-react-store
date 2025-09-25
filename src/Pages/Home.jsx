import React from 'react'
import Products from '../Components/Products/Products'
import Header from '../Components/Header/Header'
import Categories from '../Components/Categories/Categories'

export default function Home() {
  return (
    <div>
      <Header />
      <Categories />
      <Products />
    </div>
  )
}
