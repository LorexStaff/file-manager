export const validateLogin = (login: string) => {
  return login.length >= 3 && login.length <= 20;
};

export const validatePassword = (password: string) => {
  return password.length >= 6;
};
