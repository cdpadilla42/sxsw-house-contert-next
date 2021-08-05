import queryString from 'query-string';

export const queryObjToString = (queryObj) => {
  if (Object.keys(queryObj).length === 0) return '';
  const s = queryString.stringify(queryObj);
  return '?' + s;
};

export const calculateMapBounds = (coords) => {
  const margin = 0.005;
  let north;
  let south;
  let east;
  let west;
  coords.forEach((coord) => {
    west = typeof west === 'number' ? Math.min(west, coord[1]) : coord[1];
    east = typeof east === 'number' ? Math.max(east, coord[1]) : coord[1];
    south = typeof south === 'number' ? Math.min(south, coord[0]) : coord[0];
    north = typeof north === 'number' ? Math.max(north, coord[0]) : coord[0];
  });

  west -= margin;
  east += margin;
  north += margin;
  south -= margin;

  west = west.toFixed(4);
  east = east.toFixed(4);
  north = north.toFixed(4);
  south = south.toFixed(4);

  return [
    [south, west],
    [north, east],
  ];
};
