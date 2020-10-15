const dateFilter = [
  { unit: 86400000, postfix: '일' },
  { unit: 3600000, postfix: '시간' },
  { unit: 60000, postfix: '분' },
  { unit: 1000, postfix: '초' },
];

export const getDateGoodLook = (lastModifiedDate: string) => {
  const lastDateTime = new Date(lastModifiedDate).getTime();
  if (Number.isNaN(lastDateTime) || lastDateTime < 1502769377613) {
    return '';
  }
  const diffTime = new Date().getTime() - lastDateTime;
  return dateFilter.reduce((accum, { unit, postfix }) => {
    if (accum) return accum;
    const d = Math.floor(diffTime / unit);
    if (d !== 0) {
      if (diffTime > 1296000000) {
        return new Date(lastDateTime).toLocaleDateString();
      }
      return `${d}${postfix} 전`;
    }
    return '';
  }, '');
}