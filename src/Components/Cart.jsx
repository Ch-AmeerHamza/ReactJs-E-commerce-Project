
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { DLT, Remove } from '../Redux/Action/Action';
import { Link } from 'react-router-dom';
import './Cart.css'

const Cart = () => {
  
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.card.cart); 

    const handleRemove = (item) => {
        dispatch(Remove(item));
    }

    const handleDelete = (id) => {
        dispatch(DLT(id));
    }

    return (
        <div className='container mt-5'>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Photo</th>
                        <th scope="col">Title</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
               <tbody>
    {cart.map(item => (
        <tr key={item.id}>
            <td data-label="Photo">
                <img 
                    src={item.image} 
                    alt={item.name} 
                    width={100} 
                    height={100} 
                    className="img-thumbnail"
                />
            </td>
            <td data-label="Title" className='fw-bold'>{item.name}</td>
            <td data-label="Price" className='fw-bold'>Rs {item.price}</td>
            <td data-label="Quantity">
                <button 
                    className='btn btn-dark btn-sm me-2'
                    onClick={() => handleRemove(item)}
                >
                    -
                </button>
                {item.qnty}
                <button 
                    className='btn btn-dark btn-sm ms-2'
                    onClick={() => dispatch({
                        type: "ADD_TO_CART",
                        payload: item
                    })}
                >
                    +
                </button>
            </td>
            <td data-label="Action">
                <button 
                    className='btn btn-danger btn-sm'
                    onClick={() => handleDelete(item.id)}
                >
                    Remove
                </button>
            </td>
        </tr>
    ))}
</tbody>

            </table>
            <Link to="/login" className='btn btn-dark'>Buy Now</Link>
        </div>
    )
}

export default Cart;