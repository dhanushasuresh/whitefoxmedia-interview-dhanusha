import { useEffect, useState } from 'react'
import api from '../services/api'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const [totalStudents, setTotalStudents] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTotal() {
      try {
        const response = await api.get('/students/?page_size=1')
        setTotalStudents(response.data.count)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchTotal()
  }, [])

  return (
    <div>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mb-4">
        <div>
          <h1 className="h3">Dashboard</h1>
          <p className="text-muted">Welcome to the Student Management Admin Panel.</p>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-sm-6 col-xl-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Total Students</h5>
              <p className="display-6 mb-0">{loading ? 'Loading...' : totalStudents}</p>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <Link to="/students/add" className="text-decoration-none">
            <div className="card shadow-sm border-success h-100">
              <div className="card-body">
                <h5 className="card-title">Add Student</h5>
                <p className="card-text text-success">Create a new student record.</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-sm-6 col-xl-4">
          <Link to="/students" className="text-decoration-none">
            <div className="card shadow-sm border-primary h-100">
              <div className="card-body">
                <h5 className="card-title">Student List</h5>
                <p className="card-text text-primary">View all students and manage records.</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
