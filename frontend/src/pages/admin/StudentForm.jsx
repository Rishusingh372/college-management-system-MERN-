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
    emailId: '',
    number: '',
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || '',
        rollNumber: student.rollNumber || '',
        course: student.course || '',
        feeStatus: student.feeStatus || 'unpaid',
        username: '',
        password: '',
        emailId: student.emailId || '',
        number: student.number || '',
      })
    }
  }, [student])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.rollNumber.trim()) newErrors.rollNumber = 'Roll number is required'
    if (!formData.course.trim()) newErrors.course = 'Course is required'
    if (!student && !formData.username.trim()) newErrors.username = 'Username is required'
    if (!student && !formData.password.trim()) newErrors.password = 'Password is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    
    setSubmitting(true)
    try {
      await onSubmit(formData)
    } catch (error) {
      console.error('Submission error:', error)
      // Handle API errors here
      setErrors({ submit: 'Failed to save student. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Full Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        required
      />
      <Input
        label="Roll Number"
        name="rollNumber"
        value={formData.rollNumber}
        onChange={handleChange}
        error={errors.rollNumber}
        required
      />
      <Input
        label="Course"
        name="course"
        value={formData.course}
        onChange={handleChange}
        error={errors.course}
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
      <Input
        label="Email"
        name="emailId"
        type="email"
        value={formData.emailId}
        onChange={handleChange}
        error={errors.emailId}
      />
      <Input
        label="Phone Number"
        name="number"
        type="tel"
        value={formData.number}
        onChange={handleChange}
        error={errors.number}
      />
      
      {!student && (
        <>
          <Input
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
            required
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
          />
        </>
      )}
      
      {errors.submit && (
        <div className="text-red-500 text-sm">{errors.submit}</div>
      )}

      <div className="flex justify-end space-x-3 pt-4">
        <Button 
          variant="outline" 
          type="button" 
          onClick={onCancel}
          disabled={submitting}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={submitting}
        >
          {submitting ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  )
}

export default StudentForm