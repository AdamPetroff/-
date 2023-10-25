if (!import.meta.env.VITE_API_URI) {
  throw new Error("VITE_API_URI is not defined");
}
export const API_URL = import.meta.env.VITE_API_URI as string;
