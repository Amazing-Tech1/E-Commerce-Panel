import React, { useState, useEffect } from 'react'
import upload_icon from '../assets/upload_icon.png'
import { toast } from 'react-toastify'
import axios from '../api/axios'
import { useParams, useNavigate } from 'react-router-dom';


function Update() {
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

    const { id } = useParams();

    const navigate = useNavigate()

    useEffect(() => {
        const fetchProduct = async () => {
          try {
            const response = await axios.get(`/products/${id}`);
            if(response.data.success){

                setName(response.data.product.name)
                setDescription(response.data.product.description)
                setPrice(response.data.product.price)
                setCategory(response.data.product.category)
                setSubCategory(response.data.product.subCategory)
                setBestseller(response.data.product.bestseller)
                setSizes(response.data.product.sizes)
    
                if (response.data.product.image && response.data.product.image[0]) {
                    setImage1(response.data.product.image[0]);
                  }
                  if (response.data.product.image && response.data.product.image[1]) {
                    setImage2(response.data.product.image[1]);
                  }
                  if (response.data.product.image && response.data.product.image[2]) {
                    setImage3(response.data.product.image[2]);
                  }
                  if (response.data.product.image && response.data.product.image[3]) {
                    setImage4(response.data.product.image[3]);
                  }
            }
          
          } catch (err) {
            console.error('Error fetching product:', err);

          }
        };
        fetchProduct();
      }, [id]); 

  async function handleUpdateProducts(e) {
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

      const response = await axios.patch(`/products/${id}`, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true
      })
      if (response.data.success) {
        toast.success('Product successfully Updated')
        navigate('/list')
        console.log(response.data.result)
      } else {
        toast.error('Error adding Product! pls try again')
      }

    } catch (err) {
      console.error('Error adding product:', err.response?.data || err.message);

    }
  }
  return (
    <form onSubmit={handleUpdateProducts} className='flex flex-col w-full items-start gap-3'>
    <div>
      <p className='mb-2'>Upload Image</p>
      <div className='flex gap-2'>
        <label htmlFor="image1">
          <img className='w-20' src={image1 ? image1 : upload_icon} alt="" />
          <input type="file" id='image1' hidden onChange={(e) => setImage1(e.target.files[0])} />
        </label>
        <label htmlFor="image2">
          <img className='w-20' src={image2 ? image2 : upload_icon} alt="" />
          <input type="file" id='image2' hidden onChange={(e) => setImage2(e.target.files[0])} />
        </label>
        <label htmlFor="image3">
          <img className='w-20' src={image3 ? image3 : upload_icon} alt="" />
          <input type="file" id='image3' hidden onChange={(e) => setImage3(e.target.files[0])} />
        </label>
        <label htmlFor="image4">
          <img className='w-20' src={image4 ? image4 : upload_icon} alt="" />
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
        <select className='w-full px-4 py-2' onChange={(e) => setCategory(e.target.value)}  value={category}>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>
      </div>
      <div>
        <p className='mb-2'>Sub Category</p>
        <select className='w-full px-4 py-2' onChange={(e) => setSubCategory(e.target.value)}  value={subCategory}>
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
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div
              key={size}
              onClick={() => setSizes((prev) =>
                prev.includes(size) ? prev.filter((item) => item !== size) : [...prev, size]
              )}
            >
              <p
                className={`${
                  sizes.includes(size) ? "bg-blue-500" : "bg-blue-300"
                } text-gray-600 px-3 py-1 cursor-pointer`}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
    </div>
    <div className='flex gap-2 mt-2'>
      <input type="checkbox" id='bestseller' onChange={() => setBestseller(prev => !prev)} checked={bestseller} />
      <label htmlFor="bestseller" className='cursor-pointer'>BestSeller</label>
    </div>
    <button type='submit' className='w-30 p-5 mt-4 bg-blue-400 text-white font-bold'> Update Product</button>
  </form>
  )
}

export default Update
