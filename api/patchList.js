import { URL } from "../redux/constants/const";

export function patchListFetch(id, newTitle) {
  let title = { title: newTitle };

  fetch(`${URL}/list/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(title),
  });
}
