export type UserInfo = {
  id: string;
  email: string;
  username: string;
  name: string;
  role: string;
  profilePic?: string;
};

export function getStoredUser(): UserInfo | null {
  try {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function getStoredToken(): string | null {
  return localStorage.getItem('access_token');
}

export function isLoggedIn(): boolean {
  return !!getStoredToken() && !!getStoredUser();
}

export function logout(): void {
  localStorage.removeItem('access_token');
  localStorage.removeItem('user');
}
