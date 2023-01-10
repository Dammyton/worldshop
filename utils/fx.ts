// Capitalize first letter of each word in a string
export const capitalizeFirstLetter = (string: string) => {
  return string
    ? string.replace(
        /(^\w|\s\w)(\S*)/g,
        (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
      )
    : "";
};

// Ensure that a given string matches the character count and ellipsized at that point
export const truncateMultilineText = (text: string, numChars: number) => {
  if (!text) return "";

  const maxStringLength = numChars - 3;

  return maxStringLength > text.length
    ? text
    : `${text.trim().substring(0, maxStringLength)}...`;
};
