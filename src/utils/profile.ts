const getTwoLetterInitials = (name: string) => {
  if (name?.length > 0) {
    const [firstName, lastName] = name.split(" ");
    return `${firstName[0]?.toUpperCase()}${lastName[0]?.toUpperCase()}`;
  } else {
    return "";
  }
};

export { getTwoLetterInitials };
