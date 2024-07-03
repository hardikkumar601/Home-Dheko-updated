import React from 'react'
import Navbar from "../components/Navbar"
import Slide from "../components/Slides"
import Categories from '../components/categories'
import Listing from '../components/Listing'

function HomePage() {
  return (
    <>
      <Navbar/>
      <Slide/>
      <Categories/>
      <Listing/>
    </>
  )
}

export default HomePage