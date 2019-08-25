export const getToken = () => {
  const tokenString = localStorage.getItem('MUID');
  return tokenString;
};

export const setToken = (token) => {
  if (token) {
    return localStorage.setItem('MUID', token);
  }
};
export const removeToken = () => {
    return localStorage.removeItem('MUID');
};
