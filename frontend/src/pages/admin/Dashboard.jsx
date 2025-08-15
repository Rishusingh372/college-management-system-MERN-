import { Link } from 'react-router-dom'
import Card from '../../components/UI/Card'
import { useAuth } from '../../context/AuthContext'
import { useEffect, useState } from 'react'
import api from '../../api'

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    courses: 0,
  })
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [studentsRes, teachersRes] = await Promise.all([
          api.get('/admin/students'),
          api.get('/admin/teachers'),
        ])
        
        setStats({
          students: studentsRes.data.length,
          teachers: teachersRes.data.length,
          courses: 0, // You might want to add courses endpoint
        })
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <h3 className="text-lg font-medium text-gray-900">Students</h3>
          <p className="text-3xl font-bold text-indigo-600">{stats.students}</p>
          <Link
            to="/admin/students"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            View all
          </Link>
        </Card>
        <Card>
          <h3 className="text-lg font-medium text-gray-900">Teachers</h3>
          <p className="text-3xl font-bold text-indigo-600">{stats.teachers}</p>
          <Link
            to="/admin/teachers"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            View all
          </Link>
        </Card>
        <Card>
          <h3 className="text-lg font-medium text-gray-900">Courses</h3>
          <p className="text-3xl font-bold text-indigo-600">{stats.courses}</p>
          <Link
            to="#"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            View all
          </Link>
        </Card>
      </div>
    </div>
  )
}

export default AdminDashboard