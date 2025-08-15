import Input from '../../components/UI/Input'
import Button from '../../components/UI/Button'

const StudentMarksForm = ({ student, subject, onSubmit, onCancel }) => {
  const [score, setScore] = useState('')

  useEffect(() => {
    if (student && subject) {
      const subjectMark = student.marks?.find(m => m.subject === subject)
      setScore(subjectMark?.score || '')
    }
  }, [student, subject])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ score })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <p className="text-sm text-gray-500 mb-1">Student: {student?.name}</p>
        <p className="text-sm text-gray-500 mb-4">Subject: {subject}</p>
      </div>
      
      <Input
        label="Score (%)"
        name="score"
        type="number"
        min="0"
        max="100"
        value={score}
        onChange={(e) => setScore(e.target.value)}
        required
      />

      <div className="flex justify-end space-x-3 pt-4">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  )
}

export default StudentMarksForm