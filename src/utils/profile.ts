const getTwoLetterInitials = (name: string) => {
  if (name && name.length > 0) {
    const parts = name.split(" ");
    const firstName = parts[0];
    const lastName = parts.length > 1 ? parts[1] : "";
    return `${firstName[0].toUpperCase()}${lastName[0]?.toUpperCase() || ""}`;
  } else {
    return "";
  }
};

export { getTwoLetterInitials };
