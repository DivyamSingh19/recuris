export async function signOut() {
  localStorage.removeItem('token');
  localStorage.removeItem('userRole');

  return true;
}