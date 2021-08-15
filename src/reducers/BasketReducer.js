import {
  ADD_TO_BASKET,
  REMOVE_FROM_BASKET,
  EMPTY_BASKET,
} from "../actions/types";

const initialState = {
  basket: [],
};

export default function BasketReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_BASKET:
      return {
        ...state,
        basket: [...state.basket, action.payload],
      };
    case EMPTY_BASKET: {
      return {
        ...state,
        basket: [],
      };
    }
    case REMOVE_FROM_BASKET:
      const index = state.basket.findIndex(
        (item) => item.id === action.payload
      );
      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(`not found product with id ${action.payload} in basket`);
      }
      return {
        ...state,
        basket: newBasket,
      };
    default:
      return state;
  }
}
