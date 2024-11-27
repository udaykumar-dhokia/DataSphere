import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../services/supabaseClient';
import { Button, Modal, TextField } from '@mui/material';
import "./Dashboard.css";
import Sidepanel from '../../components/sidepanel/Sidepanel';
import bcrypt from 'bcryptjs';


const Dashboard = () => {
    const { sessionToken } = useParams();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [desc, setProjectDesc] = useState('');
    const [password, setPassword] = useState('');
    const [projectsArray, setProjectsArray] = useState([]);

    const handleLogout = () => {
        localStorage.removeItem('userSession');
        navigate('/login');
    };

    const handleCardClick = (name, project) => {
        navigate(`/project/${name}/${sessionToken}`, { state: { projectData: project, user: userData } });
    };

    const fetchUserData = async () => {
        const sessionData = JSON.parse(localStorage.getItem('userSession'));
        try {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('email', sessionData["email"])
                .single();
            if (error) throw error;
            setUserData(data);
        } catch (err) {
            setError('Failed to fetch user data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const fetchProjects = async () => {
        try {
            const projectIds = userData?.projects || [];

            if (projectIds.length === 0) {
                console.log('No projects found for this user.');
                setProjects([]);
                return;
            }

            const { data: projectData, error: projectError } = await supabase
                .from('projects')
                .select('*')
                .in('id', projectIds);

            if (projectError) {
                console.error('Error fetching projects:', projectError.message);
                throw projectError;
            }

            console.log('Fetched projects:', projectData);
            setProjects(projectData || []);
        } catch (err) {
            console.error('Failed to fetch projects:', err.message);
        }
    };


    useEffect(() => {
        if (userData) {
            fetchProjects();
        }
    }, [userData]);

    useEffect(() => {
        fetchUserData();
    }, [sessionToken]);

    const handleCreateProject = async () => {
        try {

            if (projectName == "" || password == "" || desc == '') {
                alert("Please fill all required fields.")
            } else {

                const hashedPassword = await bcrypt.hash(password, 10);
                const createdAt = new Date().toISOString().split('T')[0];

                const { data: project, error: projectError } = await supabase
                    .from('projects')
                    .insert([{
                        name: projectName,
                        password: hashedPassword,
                        createdAt: createdAt,
                        admin: userData.id,
                        members: { "admin": [userData.email] },
                        desc: desc
                    }])
                    .select('id')
                    .single();

                if (projectError) throw projectError;


                const projectsArray = userData.projects;
                console.log(projectsArray);
                const updatedProjects = [...projectsArray, project.id];

                const { error: userUpdateError } = await supabase
                    .from('users')
                    .update({
                        limit: userData.limit - 1,
                        projects: updatedProjects,
                    })
                    .eq('id', userData.id);

                if (userUpdateError) throw userUpdateError;

                setOpenModal(false);
                setProjectName('');
                setPassword('');
                fetchProjects();
            }
        } catch (err) {
            console.error("Error creating project:", err);
        }
    };


    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="ms-5 ps-5 pt-3 pe-5">
            <Sidepanel user={userData} activeItem="dashboard" />

            <div>
                <div className="d-flex justify-content-between align-items-center" style={{ borderBottom: "1px solid" }}>
                    <h1>Dashboard</h1>
                    <p>{userData.email}</p>
                </div>
                <button className='fab' onClick={() => setOpenModal(true)}>
                    <i className="bi bi-plus"></i>
                </button>

                <Modal open={openModal} onClose={() => setOpenModal(false)}>
                    <div style={{ padding: '20px', backgroundColor: 'white', margin: '100px auto', maxWidth: '500px', borderRadius: '8px' }}>
                        <h2>Create Project</h2>


                        <TextField
                            label="Project Name"
                            fullWidth
                            className='mt-3'
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            style={{ marginBottom: '10px' }}
                            required
                        />
                        <TextField
                            label="Description"
                            fullWidth
                            className='mt-2'
                            value={desc}
                            onChange={(e) => setProjectDesc(e.target.value)}
                            style={{ marginBottom: '10px' }}
                            required
                        />
                        <TextField
                            label="Password"
                            type="password"
                            className='mt-2'
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ marginBottom: '10px' }}
                            required
                        />


                        <button onClick={handleCreateProject} className='explore mt-3' variant="contained" color="primary">
                            Create Project
                        </button>
                    </div>
                </Modal>

                <div className="projects-list mt-5">
                    <div className="d-flex justify-content-between align-items-center">
                        <h2>My Projects({projects.length})</h2>
                        <p className='text-secondary'>Limit available: {userData.limit}</p>
                    </div>
                    <div className="row mt-4">
                        {projects.length === 0 ? (
                            <p>No projects found.</p>
                        ) : (
                            projects.map((project) => (
                                <div
                                    className="col-md-4 col-xl-3"
                                    key={project.id}
                                    onClick={() => handleCardClick(project.name, project)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="card bg-c-green order-card">
                                        <div className="card-block">
                                            <h6 className="m-b-20">{project.createdAt}</h6>
                                            <h2 className="text-right">
                                                <i className="fa fa-rocket f-left"></i>
                                                <span>{project.name}</span>
                                            </h2>
                                            <p className="mt-4">
                                                Admin
                                                <span className="f-right">{project.members["admin"]}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;
