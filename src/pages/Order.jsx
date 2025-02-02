import React, { useEffect, useState } from 'react'
import axios from '../api/axios'
import parcel from '../assets/parcel_icon.png'
import { toast } from 'react-toastify'

function Order({ auth }) {
  const [orders, setOrders] = useState([])

  async function fetchOrders() {
    try {
      const response = await axios.get(('/order/list'), {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      })
      if (response.data.success) {
        setOrders(response.data.orders)
        console.log(response.data.orders)
      }

    } catch (err) {
      console.log(err.message)
    }
  }
  useEffect(() => {
    if (auth) {
      fetchOrders()
    }
  }, [auth])
  async function statusHandler(e, orderId) {
    try {
      const response = await axios.post(('/order/status'), { orderId, status: e.target.value }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      })
      if (response.data.success) {
        toast.success('status Updated')
        await fetchOrders()
      }
    } catch (err) {
      console.log(err.message)
      toast.error(err.message)
    }
  }

  return (
    <div>
      <h3>Orders Page</h3>
      <div>
        {orders.map((o, index) => (
          <div key={index} className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700'>
            <img className='w-12' src={parcel} alt="" />
            <div>
              <div>
                {o.items.map((item, i) => {
                  if (index === o.items.length - 1) {
                    return <p className='py-0.5' key={i}> {item.name} x {item.quantity} <span>{item.size}</span> </p>
                  } else {
                    return <p className='py-0.5' key={i}> {item.name} x {item.quantity} <span>{item.size}</span>, </p>
                  }
                })}
              </div>
              <p className='mt-3 mb-2 font-medium'>{o.address.firstName + " " + o.address.lastName}</p>
              <div>
                <p>{o.address.address + ","}</p>
                <p>{o.address.city + ", " + o.address.state + ", " + o.address.country + ", " + o.address.zipcode}</p>
              </div>
              <p>{o.address.phoneNumber}</p>
            </div>
            <div>
              <p className='text-sm sm:text-[15px]'>Items: {o.items.length}</p>
              <p className='mt-3'>Method: {o.paymentMethod}</p>
              <p>Payment: {o.payment ? 'Done' : 'Pending'}</p>
              <p>Date: {new Date(o.date).toLocaleDateString()}</p>
            </div>
            <p className='text-sm sm:text-[15px]'>${o.amount}</p>
            <select value={o.status} onChange={(e) => statusHandler(e, o._id)} className='p-2 font-semibold'>
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>

          </div>
        ))}
      </div>
    </div>
  )
}

export default Order
