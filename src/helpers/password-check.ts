const PASSWORD_REGEX = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

export const ERRORS = {
  PASSWORD_MIN_LENGTH: 1,
  PASSWORD_MAX_LENGTH: 2,
  PASSWORD_REGEX: 3,
};

const passwordCheck = (password: string) => {
  /* 
    Passwords will contain at least 1 upper case letter
    Passwords will contain at least 1 lower case letter
    Passwords will contain at least 1 number or special character
  */

  const length = password.length;
  if (length < 8) {
    return ERRORS.PASSWORD_MIN_LENGTH;
  }

  if (length > 20) {
    return ERRORS.PASSWORD_MAX_LENGTH;
  }

  if (!PASSWORD_REGEX.test(password)) {
    return ERRORS.PASSWORD_REGEX;
  }

  return 0;
};

export const comparePassword = (password1: string, password2: string) => {
  return password1 === password2;
};

export default passwordCheck;
