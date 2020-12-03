import {
  CHANGE_CHEK_TODO,
  CREATE_LIST,
  DELETE_LIST,
  DELETE_TODO,
  FETCHING,
  GET_LIST,
} from "../constants/const";

let initialState = {
  todos: [
    {
      id: 101,
      title: "Семья",
      todos: [
        { id: 271, text: "Купить молоко", checked: false },
        { id: 272, text: "Постирать вещи", checked: false },
        { id: 273, text: "Убрать комнату", checked: true },
      ],
    },
  ],
  isFetching: false,
};

export default function list(state = initialState, action) {
  switch (action.type) {
    case GET_LIST:
      return { ...state, todos: action.list, isFetching: false };
    case FETCHING:
      return {
        ...state,
        isFetching: true,
      };
    case DELETE_LIST:
      return {
        ...state,
        todos: state.todos.filter((el) => el.id !== action.id),
      };
    case CREATE_LIST:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            title: action.title,
            todos: [],
          },
        ],
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.map((el) => {
          if (el.id === action.listId) {
            return {
              ...el,
              todos: el.todos.filter((item) => item.id !== action.todoId),
            };
          } else {
            return el;
          }
        }),
      };
    case CHANGE_CHEK_TODO:
      return {
        ...state,
        todos: state.todos.map((el) => {
          if (el.id === action.listId) {
            return {
              ...el,
              todos: el.todos.map((item) => {
                if (item.id === action.todoId) {
                  return { ...item, checked: !item.checked };
                } else {
                  return item;
                }
              }),
            };
          } else {
            return el;
          }
        }),
      };
    default:
      return state;
  }
}
