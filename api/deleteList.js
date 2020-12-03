import { URL } from "../redux/constants/const";

export function deleteListFetch(id) {
  fetch(`${URL}/list/${id}`, {
    method: "DELETE",
  });
}
