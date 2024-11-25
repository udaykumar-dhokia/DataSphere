import React from 'react'
import "./Sidepanel.css"
import landing from "../../assets/database.gif"
import { useNavigate } from 'react-router-dom'


const Sidepanel = ({ user, activeItem }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userSession');
        navigate('/login');
    };
    return (
        <div>
            <div className="sidebar sidebar-narrow-unfoldable border-end">
                <div className="sidebar-header border-bottom">
                    <div className="sidebar-brand">
                        <img src={landing} alt="" style={{ width: "50px" }} />
                    </div>
                </div>
                <ul className="sidebar-nav">
                    <li className="nav-title">DataSphere</li>
                    <li className={`nav-item ${activeItem === 'dashboard' ? 'active' : ''}`}>
                        <a className="nav-link" href="#">
                            <i className="nav-icon bi bi-grid"></i> Dashboard
                        </a>
                    </li>
                    <li className={`nav-item ${activeItem === 'settings' ? 'active' : ''}`}>
                        <a className="nav-link" href="#">
                            <i className="nav-icon bi bi-gear"></i> Settings
                        </a>
                    </li>
                    <li className="nav-item mt-auto">
                        <a className="nav-link" href="#">
                            <i className="nav-icon bi bi-person-circle"></i>
                            <span className="email-text">{user.email}</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#" onClick={handleLogout}>
                            <i className="nav-icon bi bi-box-arrow-left"></i> Logout
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidepanel