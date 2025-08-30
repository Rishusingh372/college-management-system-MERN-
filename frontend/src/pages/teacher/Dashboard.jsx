import { Link } from 'react-router-dom'
import Card from '../../components/UI/Card'
import { useAuth } from '../../context/AuthContext'
import { useEffect, useState } from 'react'
import api from '../../api'

const TeacherDashboard = () => {
  const [stats, setStats] = useState({
    students: 0,
    courses: 0,
    attendance: 0,
  })
  const [teacherProfile, setTeacherProfile] = useState(null)
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, statsRes, studentsRes] = await Promise.all([
          api.get('/teachers/profile'),
          api.get('/teachers/dashboard'),
          api.get('/teachers/students'),
        ])
        
        setTeacherProfile(profileRes.data.teacher)
        setStats(statsRes.data.stats)
        setStudents(studentsRes.data.students.slice(0, 5))
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Teacher Dashboard</h1>
        {teacherProfile && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Teacher Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium">{teacherProfile.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{teacherProfile.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Subject</p>
                <p className="font-medium">{teacherProfile.subject}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium">{teacherProfile.phone || 'N/A'}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <h3 className="text-lg font-medium text-gray-900">Total Students</h3>
          <p className="text-3xl font-bold text-indigo-600">{stats.students}</p>
          <Link
            to="/teacher/students"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            View all students
          </Link>
        </Card>
        <Card>
          <h3 className="text-lg font-medium text-gray-900">Assigned Courses</h3>
          <p className="text-3xl font-bold text-indigo-600">{stats.courses}</p>
        </Card>
        <Card>
          <h3 className="text-lg font-medium text-gray-900">Your Attendance</h3>
          <p className="text-3xl font-bold text-indigo-600">{stats.attendance}%</p>
        </Card>
      </div>

      {students.length > 0 && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Recent Students</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Year
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.course}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.year}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default TeacherDashboard
