import { useState, useEffect } from 'react'
import Table from '../../components/UI/Table'
import Modal from '../../components/UI/Modal'
import StudentMarksForm from './StudentMarksForm'
import api from '../../api'

const TeacherStudents = () => {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const { user } = useAuth()

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Roll Number', accessor: 'rollNumber' },
    { header: 'Course', accessor: 'course' },
    { header: 'Attendance', accessor: 'attendance' },
    {
      header: 'Marks',
      accessor: 'marks',
      Cell: ({ value }) => {
        const subjectMark = value?.find((m) => m.subject === user.subject)
        return subjectMark ? `${subjectMark.score}%` : 'N/A'
      },
    },
    {
      header: 'Actions',
      accessor: '_id',
      Cell: ({ row }) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setSelectedStudent(row.original)
            setIsModalOpen(true)
          }}
        >
          Update Marks
        </Button>
      ),
    },
  ]

  const fetchStudents = async () => {
    try {
      const response = await api.get('/admin/students') // Or create a specific endpoint
      setStudents(response.data)
    } catch (error) {
      console.error('Failed to fetch students:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (formData) => {
    try {
      await api.put(`/teacher/students/${selectedStudent._id}/marks`, {
        subject: user.subject,
        score: formData.score,
      })
      setIsModalOpen(false)
      setSelectedStudent(null)
      fetchStudents()
    } catch (error) {
      console.error('Failed to update marks:', error)
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Students</h1>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <Table columns={columns} data={students} />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedStudent(null)
        }}
        title="Update Student Marks"
      >
        <StudentMarksForm
          student={selectedStudent}
          subject={user?.subject}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsModalOpen(false)
            setSelectedStudent(null)
          }}
        />
      </Modal>
    </div>
  )
}

export default TeacherStudents