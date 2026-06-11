import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  return (
    <nav className="col-md-3 col-lg-2 d-md-block bg-white sidebar collapse">
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink className="nav-link" to="/dashboard">
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/students">
              Student List
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/students/add">
              Add Student
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}
