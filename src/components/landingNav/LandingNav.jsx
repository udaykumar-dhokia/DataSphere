import React from 'react'
import "./LandingNav.css"

const LandingNav = () => {
    return (
            <nav className="navbar navbar-expand-lg display-flex justify-content-center align-items-center">
                <div className="container" style={{backgroundColor:"#009e99"}}>
                    <a className="navbar-brand" href="#">DataSphere</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <i class="bi bi-stack text-white"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">   
                                <a className="nav-link" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">   
                                <a className="nav-link" aria-current="page" href="#">Features</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Contact</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href='/login'>Login</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
    )
}

export default LandingNav