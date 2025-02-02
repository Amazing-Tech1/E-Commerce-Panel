import React, { useState } from 'react'
import upload_icon from '../assets/upload_icon.png'
import { toast } from 'react-toastify'
import axios from '../api/axios'

function Add() {

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("Men")
  const [subCategory, setSubCategory] = useState("Topwear")
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([])

  async function handleAddProducts(e) {
    e.preventDefault()
    try {
      const formdata = new FormData()

      formdata.append("name", name)
      formdata.append("description", description)
      formdata.append("price", price)
      formdata.append("category", category)
      formdata.append("subCategory", subCategory)
      formdata.append("bestseller", bestseller)
      formdata.append("sizes", JSON.stringify(sizes))

      image1 && formdata.append("image1", image1)
      image2 && formdata.append("image2", image2)
      image3 && formdata.append("image3", image3)
      image4 && formdata.append("image4", image4)

      const response = await axios.post("/products", formdata, {

        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true
      })
      if (response.data.success) {
        toast.success('Product successfully added')
      } else {
        toast.error('Error adding Product! pls try again')
      }

    } catch (err) {
      console.error('Error adding product:', err.response?.data || err.message);

    }
  }

  return (
    <form onSubmit={handleAddProducts} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2'>
          <label htmlFor="image1">
            <img className='w-20' src={!image1 ? upload_icon : URL.createObjectURL(image1)} alt="" />
            <input type="file" id='image1' hidden onChange={(e) => setImage1(e.target.files[0])} />
          </label>
          <label htmlFor="image2">
            <img className='w-20' src={!image2 ? upload_icon : URL.createObjectURL(image2)} alt="" />
            <input type="file" id='image2' hidden onChange={(e) => setImage2(e.target.files[0])} />
          </label>
          <label htmlFor="image3">
            <img className='w-20' src={!image3 ? upload_icon : URL.createObjectURL(image3)} alt="" />
            <input type="file" id='image3' hidden onChange={(e) => setImage3(e.target.files[0])} />
          </label>
          <label htmlFor="image4">
            <img className='w-20' src={!image4 ? upload_icon : URL.createObjectURL(image4)} alt="" />
            <input type="file" id='image4' hidden onChange={(e) => setImage4(e.target.files[0])} />
          </label>
        </div>
      </div>
      <div className='w-full'>
        <p className='mb-2'>Product Name</p>
        <input type="text" placeholder='Product Name' onChange={(e) => setName(e.target.value)} value={name} required className='w-full max-w-[500px] px-3 py-2' />
      </div>
      <div className='w-full'>
        <p className='mb-2'>Product Description</p>
        <textarea type="text" placeholder='Product Description' onChange={(e) => setDescription(e.target.value)} value={description} required className='w-full max-w-[500px] px-3 py-2' />
      </div>
      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Product Category</p>
          <select className='w-full px-4 py-2' onChange={(e) => setCategory(e.target.value)} >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className='mb-2'>Sub Category</p>
          <select className='w-full px-4 py-2' onChange={(e) => setSubCategory(e.target.value)}>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Product Price</p>
          <input type="Number" placeholder='$' onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' />
        </div>
      </div>
      <div>
        <p className='mb-2'>Product Sizes</p>
        <div className='flex gap-3'>
          <div onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])}>
            <p className={`${sizes.includes("S") ? "bg-blue-500" : "bg-blue-300"} text-gray-600 px-3 py-1 cursor-pointer`}>S</p>
          </div>

          <div onClick={() => setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])}>
            <p className={`${sizes.includes("M") ? "bg-blue-500" : "bg-blue-300"} text-gray-600 px-3 py-1 cursor-pointer`}>M</p>
          </div>

          <div onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])}>
            <p className={`${sizes.includes("L") ? "bg-blue-500" : "bg-blue-300"} text-gray-600 px-3 py-1 cursor-pointer`}>L</p>
          </div>

          <div onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])}>
            <p className={`${sizes.includes("XL") ? "bg-blue-500" : "bg-blue-300"} text-gray-600 px-3 py-1 cursor-pointer`}>XL</p>
          </div>

          <div onClick={() => setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"])}>
            <p className={`${sizes.includes("XXL") ? "bg-blue-500" : "bg-blue-300"} text-gray-600 px-3 py-1 cursor-pointer`}>XXL</p>
          </div>
        </div>
      </div>
      <div className='flex gap-2 mt-2'>
        <input type="checkbox" id='bestseller' onChange={() => setBestseller(prev => !prev)} checked={bestseller} />
        <label htmlFor="bestseller" className='cursor-pointer'>BestSeller</label>
      </div>
      <button type='submit' className='w-28 py-3 mt-4 bg-blue-400 text-white'> Add Product</button>
    </form>
  )
}

export default Add
