const dateFilter = [
  { unit: 86400000, postfix: '일' },
  { unit: 3600000, postfix: '시간' },
  { unit: 60000, postfix: '분' },
  { unit: 1000, postfix: '초' },
];

export const getDateGoodLook = (lastModifiedDate: string) => {
  const lastDateTime = new Date(lastModifiedDate).getTime() + 3600000 * 9;
  if (Number.isNaN(lastDateTime) || lastDateTime < 1502769377613) {
    return '';
  }
  const diffTime = new Date().getTime() - lastDateTime;
  if (diffTime < 60000) {
    return '방금 전';
  }
  return dateFilter.reduce((accum, { unit, postfix }) => {
    if (accum) return accum;
    const d = Math.floor(diffTime / unit);
    if (d !== 0) {
      if (diffTime > 1296000000) {
        const date = new Date(lastDateTime).toLocaleDateString().match(/.+(?=.)/);
        return date ? date[0] : '';
      }
      return `${d}${postfix} 전`;
    }
    return '';
  }, '');
}