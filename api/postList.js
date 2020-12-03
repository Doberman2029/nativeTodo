import { URL } from "../redux/constants/const";

export function postList(title) {
  let user = { title };
  fetch(`${URL}/list`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(user),
  });
}
