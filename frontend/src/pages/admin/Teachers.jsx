import { useState, useEffect } from 'react'
import Table from '../../components/UI/Table'
import Button from '../../components/UI/Button'
import Modal from '../../components/UI/Modal'
import TeacherForm from './TeacherForm'
import api from '../../api'

const AdminTeachers = () => {
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState(null)

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Subject', accessor: 'subject' },
    { header: 'Salary', accessor: 'salary' },
    { header: 'Attendance', accessor: 'attendance' },
    {
      header: 'Actions',
      accessor: '_id',
      Cell: ({ value }) => (
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedTeacher(teachers.find((t) => t._id === value))
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

  const fetchTeachers = async () => {
    try {
      const response = await api.get('/admin/teachers')
      setTeachers(response.data)
    } catch (error) {
      console.error('Failed to fetch teachers:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      try {
        await api.delete(`/admin/teachers/${id}`)
        fetchTeachers()
      } catch (error) {
        console.error('Failed to delete teacher:', error)
      }
    }
  }

  const handleSubmit = async (formData) => {
    try {
      const payload = {
        name: formData.name,
        subject: formData.subject,
        salary: Number(formData.salary),
        username: formData.username,
        password: formData.password
      };

      if (selectedTeacher) {
        // For edit, we don't send username/password if they're empty
        const editPayload = {
          name: formData.name,
          subject: formData.subject,
          salary: Number(formData.salary),
          email: formData.email,
          phone: formData.phone,
          teacherId: formData.teacherId
        };
        await api.put(`/admin/teachers/${selectedTeacher._id}`, editPayload)
      } else {
        await api.post('/admin/teachers', payload)
      }
      setIsModalOpen(false)
      setSelectedTeacher(null)
      fetchTeachers()
    } catch (error) {
      console.error('Failed to save teacher:', error)
      throw error; // Re-throw to show in form
    }
  }

  useEffect(() => {
    fetchTeachers()
  }, [])

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Teachers</h1>
        <Button
          onClick={() => {
            setSelectedTeacher(null)
            setIsModalOpen(true)
          }}
        >
          Add Teacher
        </Button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <Table columns={columns} data={teachers} />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedTeacher(null)
        }}
        title={selectedTeacher ? 'Edit Teacher' : 'Add Teacher'}
      >
        <TeacherForm
          teacher={selectedTeacher}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsModalOpen(false)
            setSelectedTeacher(null)
          }}
        />
      </Modal>
    </div>
  )
}

export default AdminTeachers