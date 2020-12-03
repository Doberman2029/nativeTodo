import {
  CHANGE_CHEK_TODO,
  CLEAR_CURRENT_TODO,
  CREATE_LIST,
  DELETE_LIST,
  DELETE_TODO,
  FETCHING,
  GET_LIST,
  SET_CURRENT_TODO,
  URL,
} from "../constants/const";

export function listFetchData() {
  return (dispatch) => {
    dispatch(fetced());
    fetch(`${URL}/list`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response;
      })
      .then((response) => response.json())
      .then((list) => dispatch(listFetchDataSuccess(list)));
  };
}

export function listFetchDataSuccess(list) {
  return {
    type: GET_LIST,
    list,
  };
}

export function fetced() {
  return {
    type: FETCHING,
  };
}
export function deleteList(id) {
  return {
    type: DELETE_LIST,
    id,
  };
}
export function createList(title) {
  return {
    type: CREATE_LIST,
    title,
  };
}
export function changeChek(listId, todoId) {
  return {
    type: CHANGE_CHEK_TODO,
    listId,
    todoId,
  };
}
export function deleteTodo(listId, todoId) {
  return {
    type: DELETE_TODO,
    listId,
    todoId,
  };
}

///////////////// CURRENT_TODO ACTIONS /////////////////////////

export function setCurrentTodo(item) {
  return {
    type: SET_CURRENT_TODO,
    item,
  };
}
export function clearCurrentTodo() {
  return {
    type: CLEAR_CURRENT_TODO,
  };
}
