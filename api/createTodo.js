import { URL } from "../redux/constants/const";

export function createTodo(text, listId) {
  let todo = { text };

  fetch(`${URL}/list/${listId}/todo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(todo),
  });
}
