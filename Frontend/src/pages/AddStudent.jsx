import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function AddStudent() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    date_of_birth: '',
    gender: 'Male',
    address: '',
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrors('')
    setSuccess('')

    if (!formData.first_name || !formData.last_name || !formData.email || !formData.phone) {
      return setErrors('Please fill in all required fields.')
    }

    setLoading(true)
    try {
      await api.post('/students/', formData)
      setSuccess('Student created successfully.')
      setTimeout(() => navigate('/students'), 1000)
    } catch (error) {
      setErrors(error.response?.data?.email || 'Failed to create student. Please check your input.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mb-4">
        <div>
          <h1 className="h3">Add Student</h1>
          <p className="text-muted">Create a new student record with required details.</p>
        </div>
      </div>

      {errors && <div className="alert alert-danger">{errors}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">First Name *</label>
                <input
                  name="first_name"
                  type="text"
                  className="form-control"
                  value={formData.first_name}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Last Name *</label>
                <input
                  name="last_name"
                  type="text"
                  className="form-control"
                  value={formData.last_name}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Email *</label>
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Phone *</label>
                <input
                  name="phone"
                  type="text"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Date Of Birth</label>
                <input
                  name="date_of_birth"
                  type="date"
                  className="form-control"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Gender</label>
                <select
                  name="gender"
                  className="form-select"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="col-12">
                <label className="form-label">Address</label>
                <textarea
                  name="address"
                  className="form-control"
                  rows="4"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mt-4">
              <button className="btn btn-success" type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save Student'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
