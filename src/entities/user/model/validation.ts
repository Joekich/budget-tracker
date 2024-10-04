export const validateLogin = (login: string) => login.length >= 4;

export const validatePassword = (password: string) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  return password.length >= 8 && hasUpperCase && hasNumber;
};

export const isPasswordConfirmed = (password: string, confirmPassword: string) => password === confirmPassword;
