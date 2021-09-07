export default function authHeader() {
  const sessionUser = localStorage.getItem('user-fumt');
  let user = JSON.parse(sessionUser ? sessionUser : "");

  if (user && user.accessToken) {
    return { Authorization: 'Bearer ' + user.accessToken };
  } else {
    return {};
  }
}