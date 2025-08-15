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
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [profileRes, studentsRes] = await Promise.all([
          api.get(`/teachers/${user.profileId}`),
          api.get('/teacher/students'), // You might need to create this endpoint
        ])
        
        setStats({
          students: studentsRes.data.length,
          courses: profileRes.data.assignedCourses?.length || 0,
          attendance: profileRes.data.attendance || 0,
        })
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [user.profileId])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Teacher Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <h3 className="text-lg font-medium text-gray-900">Students</h3>
          <p className="text-3xl font-bold text-indigo-600">{stats.students}</p>
          <Link
            to="/teacher/students"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            View all
          </Link>
        </Card>
        <Card>
          <h3 className="text-lg font-medium text-gray-900">Courses</h3>
          <p className="text-3xl font-bold text-indigo-600">{stats.courses}</p>
        </Card>
        <Card>
          <h3 className="text-lg font-medium text-gray-900">Your Attendance</h3>
          <p className="text-3xl font-bold text-indigo-600">{stats.attendance}%</p>
        </Card>
      </div>
    </div>
  )
}

export default TeacherDashboard