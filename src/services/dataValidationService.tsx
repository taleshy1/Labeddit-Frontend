export const dataValidation = (type: string, value: string) => {
  switch (type) {
    case 'email':
      return /^[\w.-]+@[\w-]+\.\w{2,4}$/.test(value);
    case 'password':
      return /^[0-9a-zA-Z$*&@#]{6,}$/.test(value);
    case 'name':
      return /^[A-Za-z\s]{2,}$/.test(value);
    default:
      return /^.{1,}$/.test(value);
  }
};