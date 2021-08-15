import BasketReducer from "./BasketReducer";
import UserReducer from "./UserReducer";
import { combineReducers } from "redux";

export default combineReducers({
  baskets: BasketReducer,
  users: UserReducer,
});
