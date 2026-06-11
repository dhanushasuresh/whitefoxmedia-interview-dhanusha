import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function Navbar() {
  const { token, logout } = useContext(AuthContext)

  return (
    <>
      <style>{`
        .navbar-custom {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%) !important;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
          padding: 15px 0;
        }
        
        .navbar-brand {
          font-weight: 800 !important;
          font-size: 22px !important;
          letter-spacing: 0.5px;
          animation: slideRight 0.5s ease;
        }
        
        @keyframes slideRight {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .logout-btn {
          background: rgba(255, 255, 255, 0.2) !important;
          border: 2px solid white !important;
          color: white !important;
          font-weight: 700 !important;
          padding: 8px 20px !important;
          border-radius: 8px !important;
          transition: all 0.3s ease !important;
          display: flex !important;
          align-items: center !important;
          gap: 8px !important;
          font-size: 14px;
        }
        
        .logout-btn:hover {
          background: white !important;
          color: #667eea !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2) !important;
        }
        
        .logout-btn:active {
          transform: translateY(0) !important;
        }
      `}</style>
      
      <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <Link className="navbar-brand" to="/dashboard">
            🎓 School Management
          </Link>
          <div>
            {token && (
              <button className="logout-btn" onClick={logout}>
                🚪 Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  )
}
