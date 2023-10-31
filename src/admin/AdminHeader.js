import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminHeader = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const Logout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/" style={{ color: 'orange', fontWeight: 'bold', marginLeft: '10px' }}>Tickets <i class="fas fa-handshake"></i> Hub
</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto">
          <li className={`nav-item ${isActive('/') ? 'active' : ''}`}>
            <Link className="nav-link" to="/"> <i className="bi bi-speedometer"></i> Dashboard</Link>
          </li>

          <li className={`nav-item ${isActive('/newaccount') ? 'active' : ''}`}>
            <Link className="nav-link" to="/newaccount"><i className="bi bi-person-plus-fill"></i> NewAccount</Link>
          </li>

          <li className={`nav-item ${isActive('/alltickets') ? 'active' : ''}`}>
            <Link className="nav-link" to="/alltickets" ><i className="bi bi-ticket-perforated-fill"></i> Tickets</Link>
          </li>

          <li className={`nav-item ${isActive('/adminaccount') ? 'active' : ''}`}>
            <Link className="nav-link" to="/adminaccount"><i className="bi bi-person-fill-gear"></i> All Account</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" onClick={Logout} title='Logout'><i className="fa fa-sign-out"></i>  {localStorage.getItem("fullname")} </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default AdminHeader;
