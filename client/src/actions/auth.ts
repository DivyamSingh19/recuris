export async function signOut() {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('name');
  localStorage.removeItem('email');
  localStorage.removeItem('walletAddress');

  return true;
}