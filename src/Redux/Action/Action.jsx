

export const Add=(item)=>{
 
    return{
   type:"ADD_TO_CART",
   payload:item
    }
}



export const Remove=(item)=>{
    return{
        type:"RMV_ITEM",
        payload:item
    }
}



export const DLT=(id)=>{
    return{
        type:"DLT_CART",
        payload:id
    }
}