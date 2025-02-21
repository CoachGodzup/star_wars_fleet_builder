export const dateFormatter = (date: string) => {
  if (date.includes('BBY')) {
    return date.replace('BBY', ' BBY');
  } else {
    return date.replace('ABY', ' ABY');
  }
};
