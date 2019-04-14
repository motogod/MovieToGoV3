export const subMovieContent = (movieContent) => {
  if (movieContent !== '' && movieContent.length > 31) {
    return movieContent.substring(0, 30);
  }
  return movieContent;
};

export const SplitMovieDate = (movieDate) => {
  // 處理字串 片長:02時30分
  if (movieDate !== null && movieDate !== '') {
    const onlyTime = movieDate.split('：');
    return onlyTime[1];
  }

  return movieDate;
};
