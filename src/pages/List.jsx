import React, { useState, useEffect } from 'react'
import axios from '../api/axios'
import { toast } from 'react-toastify';
import {Link} from 'react-router-dom'

function List() {
  const [products, setProducts] = useState([])
  const token = sessionStorage.getItem('accessToken');
  async function fetchProducts() {
    try {

      const response = await axios.get("/products", {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      })
      setProducts(response.data)
      // console.log(response.data)

    } catch (err) {
      console.log(err.response)
    }
  }

  async function removeProduct(id) {
    try {
      const response = await axios.delete("/products", {
        headers: {
          'Content-Type': 'application/json'
        },
        data: { id },
        withCredentials: true
      })
      toast.success('Product successfully deleted') 
      await fetchProducts()
    } catch (err) {
      if (err.response) {
        console.log('Error response:', err.response.data);
      } else {
        console.log('Error message:', err.message);
      }
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])


  return (
    <>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">

        <div className='w-full hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-300 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='items-center'>Action</b>
        </div>
        {products.map((product, index) => (
          <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm ' key={index}>
            <img className='w-12' src={product.image[0]} alt="" />
            <p>{product.name}</p>
            <p>{product.category}</p>
            <p>NGN {product.price}</p>
            <div className='flex gap-2 text-lg text-right md:text-center'>
              <p className='cursor-pointer' onClick={() => removeProduct(product._id)}>✖</p>
              <Link to={`/update/${product._id}`}><p className='cursor-pointer'>📝</p></Link>
            </div>
          </div>
        ))}
      </div>

    </>
  )
}

export default List
