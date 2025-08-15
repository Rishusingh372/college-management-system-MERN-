import { useAuth } from '../../context/AuthContext'
import Card from '../../components/UI/Card'
import { useEffect, useState } from 'react'
import api from '../../api'

const StudentDashboard = () => {
  const [student, setStudent] = useState(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await api.get(`/students/${user.profileId}`)
        setStudent(response.data)
      } catch (error) {
        console.error('Failed to fetch student data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStudent()
  }, [user.profileId])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!student) {
    return <div>Student data not found</div>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Student Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
          <div className="mt-4 space-y-2">
            <p><span className="font-medium">Name:</span> {student.name}</p>
            <p><span className="font-medium">Roll Number:</span> {student.rollNumber}</p>
            <p><span className="font-medium">Course:</span> {student.course}</p>
            <p><span className="font-medium">Fee Status:</span> 
              <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                student.feeStatus === 'paid' ? 'bg-green-100 text-green-800' :
                student.feeStatus === 'partial' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {student.feeStatus}
              </span>
            </p>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-medium text-gray-900">Attendance</h3>
          <div className="mt-4">
            <p className="text-3xl font-bold text-indigo-600">{student.attendance || 0}%</p>
          </div>
        </Card>
      </div>

      <Card className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Marks</h3>
        {student.marks && student.marks.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {student.marks.map((mark, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {mark.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {mark.score}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No marks recorded yet</p>
        )}
      </Card>
    </div>
  )
}

export default StudentDashboard