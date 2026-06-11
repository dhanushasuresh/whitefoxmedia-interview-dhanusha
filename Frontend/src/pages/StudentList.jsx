import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'

export default function StudentList() {
  const [students, setStudents] = useState([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadStudents = async (pageNumber = 1, query = '') => {
    setLoading(true)
    setError('')
    try {
      const response = await api.get('/students/', {
        params: { page: pageNumber, search: query, page_size: pageSize },
      })
      setStudents(response.data.results)
      setCount(response.data.count)
      setPage(pageNumber)
    } catch (err) {
      setError('Unable to fetch students. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadStudents(page, search)
  }, [])

  const handleSearch = (e) => {
    const query = e.target.value
    setSearch(query)
    loadStudents(1, query)
  }

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this student?')
    if (!confirmed) return

    try {
      await api.delete(`/students/${id}/`)
      loadStudents(page, search)
    } catch (err) {
      setError('Could not delete student. Try again.')
    }
  }

  const pages = Math.ceil(count / pageSize)

  return (
    <div>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mb-4">
        <div>
          <h1 className="h3">Students</h1>
          <p className="text-muted">Manage student records and perform search operations.</p>
        </div>
        <Link to="/students/add" className="btn btn-primary mb-2">
          Add New Student
        </Link>
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3 align-items-center">
            <div className="col-md-4">
              <input
                type="search"
                className="form-control"
                placeholder="Search by first name, last name, or email"
                value={search}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="table-responsive shadow-sm rounded bg-white">
        <table className="table table-hover mb-0">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Date Of Birth</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  Loading students...
                </td>
              </tr>
            ) : students.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  No students found.
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.first_name}</td>
                  <td>{student.last_name}</td>
                  <td>{student.email}</td>
                  <td>{student.phone}</td>
                  <td>{student.gender}</td>
                  <td>{student.date_of_birth || '-'}</td>
                  <td>
                    <Link to={`/students/edit/${student.id}`} className="btn btn-sm btn-outline-primary me-2">
                      Edit
                    </Link>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(student.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pages > 1 && (
        <nav className="mt-4" aria-label="Student pagination">
          <ul className="pagination">
            <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => loadStudents(page - 1, search)}>
                Previous
              </button>
            </li>
            {Array.from({ length: pages }, (_, idx) => idx + 1).map((pageNumber) => (
              <li key={pageNumber} className={`page-item ${page === pageNumber ? 'active' : ''}`}>
                <button className="page-link" onClick={() => loadStudents(pageNumber, search)}>
                  {pageNumber}
                </button>
              </li>
            ))}
            <li className={`page-item ${page === pages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => loadStudents(page + 1, search)}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  )
}
