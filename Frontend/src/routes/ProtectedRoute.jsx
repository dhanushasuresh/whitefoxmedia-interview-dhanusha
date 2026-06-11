import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export function ProtectedRoute({ children }) {
  const { token, loading } = useContext(AuthContext)

  if (loading) {
    return <div className="p-5 text-center">Loading...</div>
  }

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}
