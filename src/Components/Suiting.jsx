import React from 'react'
import "./Suiting.css"
import { useDispatch } from 'react-redux'
import { AllSuitiing, firstRow, newArrival } from '../Data/SuitingData'
import { Add } from '../Redux/Action/Action'
const Suiting = () => {

  
  let dispatch=useDispatch();
   
       const send=(p)=>{
           dispatch(Add(p))
       }
  return (
    <div>
      <div className='container'>
        <div className='row d-flex'>
       {
        firstRow.map(prd=>{
        return(
        <div className="card  m-2 border-0 " style={{width: '16rem'}}>
      <img  src={prd.image}   className="card-img" alt="..."   style={{ width: "100%", height: "250px", objectFit: "cover" }}  />
      <div className="card-body">
        <h5 className="card-title">{prd.name}</h5>
        <p className="card-price ">Rs:{prd.price}</p>
        <button className='Cart-btn' onClick={()=>send(prd)}>Add to Cart</button>
      </div>
    </div>
        )
      })
       }   
        </div>
      </div>

      
<div className='Line1'></div>



<div className='container'>
        <div className='row d-flex'>
       {
        newArrival.map(prd=>{
        return(
        <div className="card  m-2 border-0 " style={{width: '16rem'}}>
      <img src={prd.image}   className="card-img" alt="..."   style={{ width: "100%", height: "250px", objectFit: "cover" }}  />
      <div className="card-body">
        <h5 className="card-title">{prd.name}</h5>
        <p className="card-price">Rs:{prd.price}</p>
        <button className='Cart-btn1' onClick={()=>send(prd)}>Add to Cart</button>
      </div>
    </div>
        )
      })
       }   
        </div>
      </div>

<div className='Line2'></div>




<div className='container'>
        <div className='row d-flex'>
       {
        AllSuitiing.map(prd=>{
        return(
        <div className="card  m-2 border-0 " style={{width: '16rem'}}>
      <img src={prd.image}   className="card-img" alt="..."   style={{ width: "100%", height: "250px", objectFit: "cover" }}  />
      <div className="card-body">
        <h5 className="card-title">{prd.name}</h5>
        <p className="card-price">Rs:{prd.price}</p>
        <button className='Cart-btn2' onClick={()=>send(prd)}>Add to Cart</button>
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

export default Suiting
