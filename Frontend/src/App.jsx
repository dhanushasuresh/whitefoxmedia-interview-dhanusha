import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import StudentList from './pages/StudentList'
import AddStudent from './pages/AddStudent'
import EditStudent from './pages/EditStudent'
import { ProtectedRoute } from './routes/ProtectedRoute'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

function App() {
  const location = useLocation()
  const isLoginPage = location.pathname === '/login'

  return (
    <div className="min-vh-100 bg-light">
      {!isLoginPage && <Navbar />}
      <div className="container-fluid">
        <div className="row">
          {!isLoginPage && <Sidebar />}
          <main className={isLoginPage ? 'w-100' : 'col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4'}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/students" element={<ProtectedRoute><StudentList /></ProtectedRoute>} />
              <Route path="/students/add" element={<ProtectedRoute><AddStudent /></ProtectedRoute>} />
              <Route path="/students/edit/:id" element={<ProtectedRoute><EditStudent /></ProtectedRoute>} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  )
}

export default App
