import { URL } from "../redux/constants/const";

export function deleteTodoFetch(listId, itemId) {
  fetch(`${URL}/list/${listId}/todo/${itemId}`, {
    method: "DELETE",
  });
}
