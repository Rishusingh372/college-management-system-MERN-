import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Table from '../../components/UI/Table'
import Button from '../../components/UI/Button'
import Modal from '../../components/UI/Modal'
import StudentForm from './StudentForm'
import api from '../../api'

const AdminStudents = () => {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Roll Number', accessor: 'rollNumber' },
    { header: 'Course', accessor: 'course' },
    { header: 'Attendance', accessor: 'attendance' },
    { header: 'Fee Status', accessor: 'feeStatus' },
    {
      header: 'Actions',
      accessor: '_id',
      Cell: ({ value }) => (
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedStudent(students.find((s) => s._id === value))
              setIsModalOpen(true)
            }}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => handleDelete(value)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ]

  const fetchStudents = async () => {
    try {
      const response = await api.get('/admin/students')
      setStudents(response.data)
    } catch (error) {
      console.error('Failed to fetch students:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await api.delete(`/admin/students/${id}`)
        fetchStudents()
      } catch (error) {
        console.error('Failed to delete student:', error)
      }
    }
  }

  const handleSubmit = async (formData) => {
    try {
      if (selectedStudent) {
        await api.put(`/admin/students/${selectedStudent._id}`, formData)
      } else {
        await api.post('/admin/students', formData)
      }
      setIsModalOpen(false)
      setSelectedStudent(null)
      fetchStudents()
    } catch (error) {
      console.error('Failed to save student:', error)
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Students</h1>
        <Button
          onClick={() => {
            setSelectedStudent(null)
            setIsModalOpen(true)
          }}
        >
          Add Student
        </Button>
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
        title={selectedStudent ? 'Edit Student' : 'Add Student'}
      >
        <StudentForm
          student={selectedStudent}
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

export default AdminStudents