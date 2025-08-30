import { useState, useEffect } from 'react'
import Table from '../../components/UI/Table'
import Button from '../../components/UI/Button'
import { useAuth } from '../../context/AuthContext'
import api from '../../api'

const TeacherStudents = () => {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Roll Number', accessor: 'rollNumber' },
    { header: 'Course', accessor: 'course' },
    { header: 'Attendance', accessor: 'attendance' },
    { header: 'Fee Status', accessor: 'feeStatus' },
    { header: 'Email', accessor: 'emailId' },
  ]

  const fetchStudents = async () => {
    try {
      // For now, fetch all students since the teacher-student assignment isn't fully implemented
      const response = await api.get('/admin/students')
      setStudents(response.data || [])
    } catch (error) {
      console.error('Failed to fetch students:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Students</h1>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : students.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No students found.</p>
        </div>
      ) : (
        <Table columns={columns} data={students} />
      )}
    </div>
  )
}

export default TeacherStudents
