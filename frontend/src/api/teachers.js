import api from './index'

export const getTeachers = () => api.get('/admin/teachers')
export const createTeacher = (teacher) => api.post('/admin/teachers', teacher)
export const updateTeacher = (id, teacher) => api.put(`/admin/teachers/${id}`, teacher)
export const deleteTeacher = (id) => api.delete(`/admin/teachers/${id}`)
export const getTeacherProfile = (id) => api.get(`/teachers/${id}`)