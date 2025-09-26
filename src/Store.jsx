import { createStore } from "redux";
import rootReducer from "./Components/Main";


let store=createStore(rootReducer);

export default store;