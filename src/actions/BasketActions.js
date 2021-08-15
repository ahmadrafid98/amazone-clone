import {
  ADD_TO_BASKET,
  REMOVE_FROM_BASKET,
  EMPTY_BASKET,
} from "../actions/types";
import { v4 as uuid } from "uuid";

export const addToBasket =
  ({ title, image, price, rating }) =>
  (dispatch) => {
    dispatch({
      type: ADD_TO_BASKET,
      payload: {
        id: uuid(),
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };

export const removeFromBasket = (id) => (dispatch) => {
  dispatch({
    type: REMOVE_FROM_BASKET,
    payload: id,
  });
};

export const emptyBasket = () => (dispatch) => {
  dispatch({
    type: EMPTY_BASKET,
  });
};
