
const protocol = import.meta.env.VITE_API_PROTOCOL;
const domain = import.meta.env.VITE_API_DOMAIN;
const port = import.meta.env.VITE_API_PORT

const baseURL = `${protocol}://${domain}:${port}`
export default baseURL