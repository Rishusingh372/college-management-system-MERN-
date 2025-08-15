import { useState, useEffect } from 'react'
import Input from '../../components/UI/Input'
import Button from '../../components/UI/Button'

const StudentForm = ({ student, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    course: '',
    feeStatus: 'unpaid',
    username: '',
    password: '',
  })

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || '',
        rollNumber: student.rollNumber || '',
        course: student.course || '',
        feeStatus: student.feeStatus || 'unpaid',
        username: '',
        password: '',
      })
    }
  }, [student])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Full Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <Input
        label="Roll Number"
        name="rollNumber"
        value={formData.rollNumber}
        onChange={handleChange}
        required
      />
      <Input
        label="Course"
        name="course"
        value={formData.course}
        onChange={handleChange}
        required
      />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Fee Status
        </label>
        <select
          name="feeStatus"
          value={formData.feeStatus}
          onChange={handleChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="unpaid">Unpaid</option>
          <option value="paid">Paid</option>
          <option value="partial">Partial</option>
        </select>
      </div>
      {!student && (
        <>
          <Input
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </>
      )}
      <div className="flex justify-end space-x-3 pt-4">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  )
}

export default StudentForm