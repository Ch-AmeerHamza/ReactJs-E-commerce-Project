import React from 'react'

import "./Kameez.css"
import { firstrow, kameezShalwarData, newarrival } from '../Data/Kameez1Rowdata'
import { useDispatch } from 'react-redux'
import { Add } from '../Redux/Action/Action'
const Kameez = () => {
  
let dispatch=useDispatch();

    const send=(p)=>{
        dispatch(Add(p))
    }
  return (
    <div>

  
  <div className='container'>
    <div className='row d-flex'>
   {
    firstrow.map(ele=>{
    return(
    <div className="card  m-2 border-0 " style={{width: '16rem'}}>
  <img src={ele.image}   className="card-img" alt="..."   style={{ width: "100%", height: "250px", objectFit: "cover" }}  />
  <div className="card-body">
    <h5 className="card-title">{ele.name}</h5>
    <p className="card-price">Rs:{ele.price}</p>
    <button className='cart-btn' onClick={()=>send(ele)}>Add to Cart</button>
  </div>
</div>
    )
  })
   }   
    </div>
  </div>


<div className='line1'></div>

  <div className='container'>
    <div className='row d-flex'>
   {
    newarrival.map(ele=>{
    return(
    <div className="card  m-2 border-0 " style={{width: '16rem'}}>
  <img src={ele.image}   className="card-img" alt="..."   style={{ width: "100%", height: "250px", objectFit: "cover" }}  />
  <div className="card-body">
    <h5 className="card-title">{ele.name}</h5>
    <p className="card-price">Rs:{ele.price}</p>
    <button className='cart-btn1' onClick={()=>send(ele)}>Add to Cart</button>
  </div>
</div>
    )
  })
   }   
    </div>
  </div>


<div className='line2'></div>



  <div className='container'>
    <div className='row d-flex'>
   {
    kameezShalwarData.map(ele=>{
    return(
    <div className="card  m-2 border-0 " style={{width: '16rem'}}>
  <img src={ele.image}   className="card-img" alt="..."   style={{ width: "100%", height: "250px", objectFit: "cover" }}  />
  <div className="card-body">
    <h5 className="card-title">{ele.name}</h5>
    <p className="card-price">Rs:{ele.price}</p>
    <button className='cart-btn2' onClick={()=>send(ele)}>Add to Cart</button>
  </div>
</div>
    )
  })
   }   
    </div>
  </div>



    </div>
  )
}

export default Kameez
