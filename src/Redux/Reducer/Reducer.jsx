


const INITIAL_STATE = {
    cart: []
};

export const cardReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case "ADD_TO_CART": {
            const existingItemIndex = state.cart.findIndex(item => item.id === action.payload.id);
            
            if(existingItemIndex >= 0) {
                const updatedCart = state.cart.map((item, index) => 
                    index === existingItemIndex 
                        ? {...item, qnty: item.qnty + 1} 
                        : item
                );
                return {...state, cart: updatedCart};
            } 
            else {
                return {
                    ...state,
                    cart: [...state.cart, {...action.payload, qnty: 1}]
                };
            }
        }

        case "RMV_ITEM": {
            const existingItemIndex = state.cart.findIndex(item => item.id === action.payload.id);
            
            if(existingItemIndex >= 0) {
                const item = state.cart[existingItemIndex];
                
                if(item.qnty > 1) {
                    const updatedCart = state.cart.map(item => 
                        item.id === action.payload.id 
                            ? {...item, qnty: item.qnty - 1} 
                            : item
                    );
                    return {...state, cart: updatedCart};
                } 
                else {
                    const filteredCart = state.cart.filter(item => item.id !== action.payload.id);
                    return {...state, cart: filteredCart};
                }
            }
            return state;
        }

        case "DLT_CART": {
            const filteredCart = state.cart.filter(item => item.id !== action.payload);
            return {...state, cart: filteredCart};
        }

        default: 
            return state;
    }
}