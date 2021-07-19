export const devEndpoint = `http://localhost:3000/api`;
export const prodEndpoint = `https://sxsw-house-contert-next.vercel.app/api`;
export const endpoint =
  process.env.NODE_ENV === 'development' ? devEndpoint : prodEndpoint;
