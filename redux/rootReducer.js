import { combineReducers } from "redux";
import list from "./reducers/list";
import currentTodo from "./reducers/currentTodo";

let rootReducer = combineReducers({ list, currentTodo });

export default rootReducer;
