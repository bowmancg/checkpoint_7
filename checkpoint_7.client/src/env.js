
export const dev = window.location.origin.includes('localhost')
export const baseURL = dev ? 'http://localhost:3000' : ''
export const useSockets = false
export const domain = 'dev-terly2q5ozwrd6qy.us.auth0.com'
export const clientId = 'S2jYSxkohoUNH2KkCXeISzopef4pEdEO'
export const audience = 'https://dev-terly2q5ozwrd6qy.us.auth0.com/api/v2/'