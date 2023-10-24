if (!process.env.REACT_APP_API_URI) {
  throw new Error("REACT_APP_API_URI is not defined");
}
export const API_URL = process.env.REACT_APP_API_URI;
