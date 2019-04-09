export const subMovieContent = (movieContent) => {
  if (movieContent !== '' && movieContent.length > 31) {
    return movieContent.substring(0, 30);
  }
  return movieContent;
};
