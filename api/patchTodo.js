import { URL } from "../redux/constants/const";

export function patchTodoCheckFetch(listId, todoId, checked) {
  const todo = { checked: checked };

  fetch(`${URL}/list/${listId}/todo/${todoId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(todo),
  });
}
