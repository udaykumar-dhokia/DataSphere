import React from 'react'
import "./ProjectPanel.css"
import landing from "../../assets/database.gif"
import { useNavigate, useParams } from 'react-router-dom'


const ProjectPanel = ({ user, activeItem, projectData }) => {
    const navigate = useNavigate();
    const { sessionToken } = useParams();

    const handleLogout = () => {
        navigate(`/dashboard/${sessionToken}`);
    };
    return (
        <div>
            <div className="sidebar sidebar-narrow-unfoldable border-end">
                {/* <div className="sidebar-header border-bottom">
                    <div className="sidebar-brand">
                        <img src={landing} alt="" style={{ width: "50px" }} />
                    </div>
                </div> */}
                <ul className="sidebar-nav">
                    <li className="nav-title">{projectData.name}</li>
                    <li className={`nav-item ${activeItem === 'home' ? 'active' : ''}`}>
                        <a className="nav-link" href="#">
                            <i className="nav-icon bi bi-house"></i> Home
                        </a>
                    </li>
                    <li className={`nav-item ${activeItem === 'table' ? 'active' : ''}`}>
                        <a className="nav-link" href="#">
                            <i className="nav-icon bi bi-table"></i> Tables
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
                            <i className="nav-icon bi bi-arrow-bar-left"></i> Back
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ProjectPanel