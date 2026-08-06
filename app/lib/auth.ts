import { getToken } from "./cookies";

export const isLoggedIn = () => {
  return !!getToken();
};