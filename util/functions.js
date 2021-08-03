import queryString from 'query-string';

export const queryObjToString = (queryObj) => {
  if (Object.keys(queryObj).length === 0) return '';
  const s = queryString.stringify(queryObj);
  return '?' + s;
};
