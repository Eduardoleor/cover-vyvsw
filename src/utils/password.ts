const isValidPassword = (password: string) => {
  const regex = /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,}$/;
  return regex.test(password);
};

export { isValidPassword };
