import { CLEAR_CURRENT_TODO, SET_CURRENT_TODO } from "../constants/const";

const initialState = {
  item: [],
};

export default function currentTodo(state = initialState, action) {
  switch (action.type) {
    case CLEAR_CURRENT_TODO:
      return initialState;
    case SET_CURRENT_TODO:
      return { item: action.item };
    default:
      return state;
  }
}
