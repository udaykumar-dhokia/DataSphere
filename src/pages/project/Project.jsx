import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ProjectPanel from '../../components/projectPanel/ProjectPanel';
import landing from "../../assets/database.gif";
import { supabase } from '../../services/supabaseClient';
import { Fab, Menu, MenuItem } from '@mui/material';

const Project = () => {
    const { state } = useLocation();
    const { name } = useParams();
    const { user, projectData } = state || {};
    const [members, setMembers] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showAddMemberModal, setShowAddMemberModal] = useState(false);
    const [newMemberEmail, setNewMemberEmail] = useState('');
    const [newMemberRole, setNewMemberRole] = useState('member');
    const [menuAnchor, setMenuAnchor] = useState(null);

    const fetchProject = async () => {
        try {

            const { data: projectData, error: projectError } = await supabase
                .from('projects')
                .select('*')
                .in('id', projectData.id);

            if (projectError) {
                console.error('Error fetching projects:', projectError.message);
                throw projectError;
            }

            projectData = projectData;

        } catch (error) {

        }
    }
    fetchProject
    useEffect(() => {
        fetchProject();
        console.log(user.projects)
        if (projectData?.members) {
            const transformedMembers = Object.entries(projectData.members);
            setMembers(transformedMembers);

            // Check if current user is an admin
            if (projectData.members["admin"][0] === user.email) {
                setIsAdmin(true);
            }
        }
    }, [projectData, user]);

    const handleOpenMenu = (event) => {
        setMenuAnchor(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setMenuAnchor(null);
    };

    const handleOpenAddMemberDialog = () => {
        setAddMemberDialogOpen(true);
        handleCloseMenu();
    };

    const handleCloseAddMemberDialog = () => {
        setAddMemberDialogOpen(false);
        setNewMemberEmail('');
        setNewMemberRole('member');
    };

    const handleAddMember = async () => {
        try {
            // Check if user exists
            const { data: userData, error: userError } = await supabase
                .from('users')
                .select('id, projects')
                .eq('email', newMemberEmail)
                .single();

            if (userError || !userData) {
                alert("User not found!");
                return;
            }

            const projectArray = userData.projects || [];

            // Update the project's members field
            const updatedMembers = { ...projectData.members, [newMemberRole]: newMemberEmail };
            const { error: projectError } = await supabase
                .from('projects')
                .update({ members: updatedMembers })
                .eq('id', projectData.id);

            if (projectError) {
                alert("Error updating project members!");
                return;
            }

            console.log(userData);


            // Add project ID to user's projects field
            const updatedUserProjects = [...projectArray, projectData.id];
            const { error: userUpdateError } = await supabase
                .from('users')
                .update({ projects: updatedUserProjects })
                .eq('id', userData.id);

            if (userUpdateError) {
                alert("Error updating user projects!");
                return;
            }

            // Update local state
            setMembers(Object.entries(updatedMembers));
            handleCloseAddMemberDialog();
            fetchProject();
        } catch (err) {
            console.error(err);
            alert("An unexpected error occurred.");
        }
    };

    return (
        <div className="ms-5 ps-5 pt-3 pe-5 vh-100">
            <ProjectPanel user={user} activeItem={"home"} projectData={projectData} />

            <div>
                <div className="d-flex justify-content-between align-items-center" style={{ borderBottom: "1px solid" }}>
                    <h1>Home</h1>
                </div>
                <div className="d-flex flex-column align-items-start justify-content-center mt-5 pt-5">
                    <img src={landing} style={{ width: "100px" }} alt="Landing" />
                    <h1>{name}</h1>
                    <p>{projectData.createdAt}</p>
                    <div className="">
                        Admin: {projectData.members["admin"]}
                    </div>
                    <div className="mt-3">
                        <div className="d-flex">
                            <i className="bi bi-people h4"></i>&nbsp;
                            <h4>Team ({members.length})</h4>
                        </div>
                        <ul>
                            {members.map(([role, emails]) => (
                                <li key={role}>
                                    {Array.isArray(emails) ? emails.join(', ') : emails} - <strong>{role}</strong>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Floating Action Button */}
                {isAdmin && (
                    <>
                        <button
                            color="primary"
                            className='btn fab'
                            style={{
                                position: "fixed",
                                bottom: 16,
                                right: 16,
                                zIndex: 1000,
                            }}
                            onClick={handleOpenMenu}
                        >
                            <i className=' bi bi-three-dots-vertical' />
                        </button>

                        <Menu
                            anchorEl={menuAnchor}
                            open={Boolean(menuAnchor)}
                            onClose={handleCloseMenu}
                        >
                            <MenuItem onClick={() => setShowAddMemberModal(true)}>
                                <i className='bi bi-people' style={{ marginRight: "8px" }} /> Edit Members
                            </MenuItem>
                            {/* <MenuItem onClick={handleEditProjectDetails}>
                                <i className='bi bi-gear' style={{ marginRight: "8px" }} /> Edit Project Details
                            </MenuItem> */}
                        </Menu>


                        {/* Add Member Modal */}
                        {showAddMemberModal && (
                            <div
                                style={{
                                    position: "fixed",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    backgroundColor: "#fff",
                                    border: "1px solid #ccc",
                                    borderRadius: "5px",
                                    padding: "20px",
                                    boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
                                    zIndex: 1000,
                                }}
                            >
                                <h3>Add New Member</h3>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={newMemberEmail}
                                    onChange={(e) => setNewMemberEmail(e.target.value)}
                                    style={{
                                        width: "100%",
                                        padding: "10px",
                                        margin: "10px 0",
                                        border: "1px solid #ccc",
                                        borderRadius: "3px",
                                    }}
                                />
                                <select
                                    value={newMemberRole}
                                    onChange={(e) => setNewMemberRole(e.target.value)}
                                    style={{
                                        width: "100%",
                                        padding: "10px",
                                        margin: "10px 0",
                                        border: "1px solid #ccc",
                                        borderRadius: "3px",
                                    }}
                                >
                                    <option value="member">Member</option>
                                    <option value="manager">Manager</option>
                                </select>
                                <div style={{ textAlign: "right" }}>
                                    <button
                                        onClick={() => setShowAddMemberModal(false)}
                                        style={{
                                            padding: "10px 20px",
                                            backgroundColor: "#ccc",
                                            color: "#000",
                                            border: "none",
                                            borderRadius: "3px",
                                            marginRight: "10px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleAddMember}
                                        style={{
                                            padding: "10px 20px",
                                            backgroundColor: "#007bff",
                                            color: "#fff",
                                            border: "none",
                                            borderRadius: "3px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Project;
