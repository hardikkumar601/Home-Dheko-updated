import React from 'react'

function Loader() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-28 w-28 border-b-8 border-gray-900"></div>
    <p>Loading...</p>
  </div>  
  )
}

export default Loader