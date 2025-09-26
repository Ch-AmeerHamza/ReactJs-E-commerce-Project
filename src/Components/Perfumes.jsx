import React from 'react'
import { allperfumeData, FirstRow, NewArrival } from '../Data/PerfumesData'
import "./Perfumes.css"
import { useDispatch } from 'react-redux'
import { Add } from '../Redux/Action/Action'
const Perfumes = () => {
  
 let dispatch=useDispatch();
 
     const send=(p)=>{
         dispatch(Add(p))
     }
  return (
    <div>
         <div className='container'>
           <div className='row d-flex'>
          {
           FirstRow.map(prod=>{
           return(
           <div className="card  m-2 border-0 " style={{width: '16rem'}}>
         <img src={prod.image}   className="card-img" alt="..."   style={{ width: "100%", height: "250px", objectFit: "cover" }}  />
         <div className="card-body">
           <h5 className="card-title">{prod.name}</h5>
           <p className="card-price">Rs:{prod.price}</p>
           <button className='Cart-Btn' onClick={()=>send(prod)}>Add to Cart</button>
         </div>
       </div>
           )
         })
          }   
           </div>
         </div>
   
  <div className='LineOne'></div>

           <div className='container'>
           <div className='row d-flex'>
          {
           NewArrival.map(prod=>{
           return(
           <div className="card  m-2 border-0 " style={{width: '16rem'}}>
         <img src={prod.image}   className="card-img" alt="..."   style={{ width: "100%", height: "250px", objectFit: "cover" }}  />
         <div className="card-body">
           <h5 className="card-title">{prod.name}</h5>
           <p className="card-price">Rs:{prod.price}</p>
           <button className='Cart-Btn1'onClick={()=>send(prod)}>Add to Cart</button>
         </div>
       </div>
           )
         })
          }   
           </div>
         </div>
 
<div className='Linetwo'></div>


         <div className='container'>
           <div className='row d-flex'>
          {
           allperfumeData.map(prod=>{
           return(
           <div className="card  m-2 border-0 " style={{width: '16rem'}}>
         <img src={prod.image}   className="card-img" alt="..."   style={{ width: "100%", height: "250px", objectFit: "cover" }}  />
         <div className="card-body">
           <h5 className="card-title">{prod.name}</h5>
           <p className="card-price">Rs:{prod.price}</p>
           <button className='Cart-Btn1' onClick={()=>send(prod)}>Add to Cart</button>
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

export default Perfumes
