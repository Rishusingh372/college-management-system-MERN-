import { useState, useEffect } from 'react'
import Input from '../../components/UI/Input'
import Button from '../../components/UI/Button'

const TeacherForm = ({ teacher, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    salary: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    teacherId: '',
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (teacher) {
      setFormData({
        name: teacher.name || '',
        subject: teacher.subject || '',
        salary: teacher.salary || '',
        email: teacher.email || '',
        phone: teacher.phone || '',
        username: '',
        password: '',
        teacherId: teacher.teacherId || '',
      })
    }
  }, [teacher])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'salary' ? Number(value) : value 
    }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required'
    if (!formData.salary) newErrors.salary = 'Salary is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!teacher && !formData.username.trim()) newErrors.username = 'Username is required'
    if (!teacher && !formData.password.trim()) newErrors.password = 'Password is required'
    
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
      setErrors({ submit: 'Failed to save teacher. Please try again.' })
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
        label="Subject"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        error={errors.subject}
        required
      />
      <Input
        label="Salary"
        name="salary"
        type="number"
        value={formData.salary}
        onChange={handleChange}
        error={errors.salary}
        required
      />
      <Input
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
      />
      <Input
        label="Phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        error={errors.phone}
      />
      <Input
        label="Teacher ID"
        name="teacherId"
        value={formData.teacherId}
        onChange={handleChange}
        error={errors.teacherId}
      />
      
      {!teacher && (
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

export default TeacherForm