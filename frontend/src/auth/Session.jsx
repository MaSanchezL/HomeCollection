export function getToken() {
  return localStorage.getItem("token");
}

export function isTokenValid(token) {
  if (!token) return false;

  try {
    const parts = token.split(".");
    if (parts.length === 3) {
      const payload = JSON.parse(atob(parts[1]));
      if (payload?.exp) {
        return Date.now() < payload.exp * 1000;
      }
    }

    return true;
  } catch {
    return false;
  }
}

export function clearSession() {
  localStorage.removeItem("token");
}
