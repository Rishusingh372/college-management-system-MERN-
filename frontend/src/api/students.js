import api from './index'

export const getStudents = () => api.get('/admin/students')
export const createStudent = (student) => api.post('/admin/students', student)
export const updateStudent = (id, student) => api.put(`/admin/students/${id}`, student)
export const deleteStudent = (id) => api.delete(`/admin/students/${id}`)
export const updateStudentMarks = (id, marks) => api.put(`/teacher/students/${id}/marks`, marks)