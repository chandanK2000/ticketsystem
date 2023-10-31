import React from 'react'
import { Link } from 'react-router-dom';
import { FiHome, FiFileText } from 'react-icons/fi';


const Header = () => {

  const Logout = () => {

    const confirmed = window.confirm("Are you sure you want to logout?");

    if (confirmed) {
      localStorage.clear();
      window.location.reload();
    }
  }

  return (
    <nav className="navbar navbar-expand-lg">
      <Link className="navbar-brand" to="/" style={{ color: 'orange', fontWeight: 'bold',marginLeft:'10px' }}>
        Tickets <i class="fas fa-handshake"></i> Hub
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              <FiHome /> SupportDashBoard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/tickets">
              <FiFileText /> Tickets
            </Link>
          </li>
          <li className="nav-item">
            <button className="nav-link" onClick={Logout} title='logout'>
              <i style={{ fontSize: '14px',textTransform:'capitalize' }}  className='fa fa-user'> {localStorage.getItem("fullname")}</i>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
