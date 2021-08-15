import { SET_USER } from "./types";

export const setUser = (authUser) => (dispatch) => {
  dispatch({ type: SET_USER, payload: authUser });
};
