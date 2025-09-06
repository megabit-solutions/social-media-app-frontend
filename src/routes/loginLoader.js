import { redirect } from "react-router";
import { store } from "../app/store";
import { selectAccessToken } from "../features/auth/authSlice";

export async function loginLoader() {
  const state = store.getState();
  const token = selectAccessToken(state);
  if (token) {
    return redirect("/dashboard");
  }
  return null;
}
