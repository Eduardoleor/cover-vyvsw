const trimLargeText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return `${text.substring(0, maxLength)}...`;
  }
  return text;
};

const findFirstName = (name: string) => {
  const names = name.split(" ");
  return names[0];
};

export { trimLargeText, findFirstName };
