
import { combineReducers } from "redux";
import { cardReducer } from "../Redux/Reducer/Reducer";

const rootReducer = combineReducers({
    card: cardReducer
});

export default rootReducer;