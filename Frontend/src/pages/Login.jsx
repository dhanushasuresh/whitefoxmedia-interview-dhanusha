import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { AuthContext } from '../context/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    if (!username || !password) {
      setError('❌ Username and password are required.')
      return
    }
    setLoading(true)
    try {
      const response = await api.post('/login/', { 
        username: username.trim(), 
        password: password.trim() 
      })
      
      if (response.data && response.data.access) {
        login(response.data.access)
        navigate('/dashboard')
      } else {
        setError('❌ Invalid username or password. Please try again.')
      }
    } catch (err) {
      console.error('Login error:', err)
      if (err.response) {
        // Server responded with error status
        if (err.response.status === 401) {
          setError('❌ Invalid username or password. Please try again.')
        } else if (err.response.data && err.response.data.detail) {
          setError(`❌ ${err.response.data.detail}`)
        } else {
          setError('❌ Login failed. Please try again.')
        }
      } else if (err.request) {
        // Request made but no response
        setError('❌ Cannot connect to server. Please check your connection.')
      } else {
        setError('❌ An error occurred. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div 
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        .login-background {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: 0;
        }
        
        .bg-circle {
          position: absolute;
          border-radius: 50%;
          opacity: 0.1;
        }
        
        .circle-1 {
          width: 300px;
          height: 300px;
          background: white;
          top: -50px;
          left: -50px;
          animation: float 6s ease-in-out infinite;
        }
        
        .circle-2 {
          width: 200px;
          height: 200px;
          background: white;
          bottom: -50px;
          right: -50px;
          animation: float 8s ease-in-out infinite reverse;
        }
        
        .circle-3 {
          width: 150px;
          height: 150px;
          background: white;
          top: 50%;
          left: 10%;
          animation: float 10s ease-in-out infinite;
        }
        
        .login-container {
          position: relative;
          z-index: 1;
        }
        
        .login-card {
          border: none;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          background: white;
          animation: fadeIn 0.6s ease;
          overflow: hidden;
          position: relative;
        }
        
        .login-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #667eea, #764ba2, #f093fb, #667eea);
          background-size: 200% 100%;
          animation: shimmer 3s linear infinite;
        }
        
        .login-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          color: white;
          padding: 40px 30px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        
        .login-header::after {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 300px;
          height: 300px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          animation: float 8s ease-in-out infinite;
        }
        
        .login-header h3 {
          margin: 0;
          font-weight: 800;
          font-size: 32px;
          letter-spacing: 1px;
          position: relative;
          z-index: 1;
          animation: float 4s ease-in-out infinite;
        }
        
        .login-header p {
          margin: 10px 0 0 0;
          font-size: 15px;
          opacity: 0.95;
          font-weight: 500;
          position: relative;
          z-index: 1;
        }
        
        .form-section {
          padding: 35px;
        }
        
        .form-control, .input-group .btn {
          border: 2px solid #e8e8ff;
          border-radius: 10px;
          padding: 13px 16px;
          font-size: 15px;
          transition: all 0.3s ease;
          background: #f8f9ff;
        }
        
        .form-control {
          font-weight: 500;
        }
        
        .form-control:focus {
          border-color: #667eea;
          background: white;
          box-shadow: 0 0 0 0.3rem rgba(102, 126, 234, 0.15);
          transform: translateY(-2px);
        }
        
        .form-control::placeholder {
          color: #b0b0c8;
          font-weight: 400;
        }
        
        .form-label {
          font-weight: 700;
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 10px;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .input-group .btn {
          border-left: none;
          background: #f8f9ff;
          color: #667eea;
          border-color: #e8e8ff;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .input-group .btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          transform: scale(1.05);
        }
        
        .input-group .form-control:focus + .btn {
          border-color: #667eea;
        }
        
        .btn-login {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          border: none;
          padding: 14px 20px;
          font-weight: 700;
          border-radius: 10px;
          transition: all 0.3s ease;
          font-size: 16px;
          letter-spacing: 0.7px;
          margin-top: 15px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }
        
        .btn-login::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.2);
          transition: left 0.3s ease;
        }
        
        .btn-login:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.5);
        }
        
        .btn-login:hover:not(:disabled)::before {
          left: 100%;
        }
        
        .btn-login:active:not(:disabled) {
          transform: translateY(-1px);
        }
        
        .btn-login:disabled {
          opacity: 0.8;
          cursor: not-allowed;
        }
        
        .spinner-border {
          animation: spin 0.8s linear infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .alert-error {
          background: linear-gradient(135deg, #ff6b6b, #ff8787);
          border: 2px solid #ff5252;
          color: white;
          border-radius: 10px;
          padding: 14px 16px;
          font-weight: 600;
          margin-bottom: 20px;
          animation: slideDown 0.3s ease;
          box-shadow: 0 4px 15px rgba(255, 82, 82, 0.3);
          display: block;
          width: 100%;
          min-height: 50px;
          word-wrap: break-word;
          white-space: normal;
          position: relative;
          z-index: 10;
        }
        
        .alert-error::before {
          content: '⚠️ ';
          font-size: 18px;
          margin-right: 8px;
        }
      `}</style>
      
      <div className="login-background">
        <div className="bg-circle circle-1"></div>
        <div className="bg-circle circle-2"></div>
        <div className="bg-circle circle-3"></div>
      </div>
      
      <div className="login-container">
        <div className="login-card" style={{ width: '100%', maxWidth: '480px' }}>
          <div className="login-header">
            <h3>🎓 Login Portal</h3>
            <p>Welcome to School Management System</p>
          </div>
          
          <div className="form-section">
            {error && <div className="alert-error">{error}</div>}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="form-label">👤 Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  disabled={loading}
                />
              </div>
              
              <div className="mb-4">
                <label className="form-label">🔐 Password</label>
                <div className="input-group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="btn"
                    onClick={() => setShowPassword((prev) => !prev)}
                    disabled={loading}
                  >
                    {showPassword ? '👁️ Hide' : '👁️ Show'}
                  </button>
                </div>
              </div>
              
              <button 
                className="btn btn-login w-100 text-white" 
                type="submit" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Signing in...
                  </>
                ) : (
                  '✨ Login Now'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
