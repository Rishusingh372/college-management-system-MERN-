import api from './index'

export const adminLogin = (credentials) => api.post('/auth/admin-login', credentials)
export const userLogin = (credentials) => api.post('/auth/user-login', credentials)