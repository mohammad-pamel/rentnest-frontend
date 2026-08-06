import { getToken } from "./cookies";

export const isLoggedIn = () => {
  return !!getToken();
};

import { removeToken } from "./cookies";

export function logout() {
  removeToken();
  window.location.href = "/login";
}