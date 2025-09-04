import Cookies from "js-cookie";

// Token management
export const getAccessToken = () => Cookies.get("accessToken");
export const getRefreshToken = () => Cookies.get("refreshToken");

export const setTokens = (accessToken, refreshToken) => {
  Cookies.set("accessToken", accessToken, { expires: 1 }); // 1 day
  Cookies.set("refreshToken", refreshToken, { expires: 7 }); // 7 days
};

export const clearTokens = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
};

export const isAuthenticated = () => {
  return !!getAccessToken();
};

// Token expiration check (optional - if you store expiry in tokens)
export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch (error) {
    return true;
  }
};

// User roles/permissions (if your tokens contain this info)
export const getUserRoles = () => {
  const token = getAccessToken();
  if (!token) return [];

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.roles || [];
  } catch (error) {
    return [];
  }
};

export const hasRole = (role) => {
  const roles = getUserRoles();
  return roles.includes(role);
};

// Auth headers for manual axios calls (if needed)
export const getAuthHeaders = () => {
  const token = getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};
