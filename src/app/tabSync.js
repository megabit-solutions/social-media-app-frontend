import { clearAuth } from "../features/auth/authSlice";
import { initAuth } from "./bootAuth";

const CHANNEL = "auth";

export function startTabSync(store) {
  if (typeof BroadcastChannel === "undefined") return null;

  const bc = new BroadcastChannel(CHANNEL);
  bc.onmessage = (e) => {
    const type = e?.data?.type;
    if (type === "login") {
      initAuth(store);
    } else if (type === "logout") {
      store.dispatch(clearAuth());
    }
  };

  return {
    notifyLogin: () => bc.postMessage({ type: "login" }),
    notifyLogout: () => bc.postMessage({ type: "logout" }),
  };
}
