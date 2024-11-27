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
    const [showEditMemberModal, setShowEditMemberModal] = useState(false);
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
        console.log('Original Members:', members);
        console.log('Filtered Members:', members.filter(([email, role]) => role[0] != user.email));

        fetchProject();
        console.log(user.projects)
        if (projectData?.members) {
            const transformedMembers = Object.entries(projectData.members);
            setMembers(transformedMembers);

            // Check if current user is an admin
            if (projectData.members["admin"][0] === user.email || projectData.members["manager"] === user.email) {
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
        setShowAddMemberModal(false);
        setNewMemberEmail('');
        setNewMemberRole('member');
        setMenuAnchor(null);

    };

    const handleDeleteUser = async (key, value) => {
        try {
            const updatedMembers = { ...projectData.members };
            console.log(updatedMembers)

            for (const memberKey in updatedMembers) {
                if (memberKey === key && updatedMembers[memberKey] === value) {
                    delete updatedMembers[memberKey];
                    break;
                }
            }

            const { data: userData, error: userError } = await supabase
                .from("users")
                .select("*")
                .eq("email", value)
                .single();


            const updatedProjects = { ...userData.projects };

            console.log(updatedProjects);

            const newArray = updatedProjects.filter((i)=> i!=projectData.id)

            console.log(updatedProjects);


            const { data: updatedProjectData, error: updatedError } = await supabase
                .from("users")
                .update({ projects: updatedProjects })
                .eq("email", value)
                .single()

            const { data: updatedData, error: updateError } = await supabase
                .from("projects")
                .update({ members: updatedMembers })
                .eq("id", projectData.id);

            if (updateError) {
                console.error("Error updating members:", updateError.message);
                return;
            }

            console.log("Updated project:", updatedData);
            // window.location.reload();


        } catch (error) {

        }
    }

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
                    <h1 style={{ color: "#009e99" }}>{name}</h1>
                    <p>{projectData.createdAt}</p>
                    <div className="">
                        Admin: {projectData.members["admin"]}
                    </div>
                    <div className="mt-5">
                        <h4>Description</h4>
                        <p>{projectData.desc}</p>
                    </div>
                    <div className="mt-2">
                        <div className="d-flex">
                            <i className="bi bi-people h4"></i>&nbsp;
                            <h4>Team ({members.length})</h4>
                        </div>

                        <ul className='d-block d-sm-none' l>
                            {members.map(([role, emails]) => (
                                <li key={role}>
                                    {Array.isArray(emails) ? emails.join(', ') : emails} - <strong>{role}</strong>
                                </li>
                            ))}
                        </ul>
                        <table style={{ width: "100%", borderCollapse: "collapse" }} className='d-none d-sm-block'>
                            <thead>
                                <tr>
                                    <th style={{ border: "1px solid #ccc", padding: "10px", textAlign: "left" }}>Email</th>
                                    <th style={{ border: "1px solid #ccc", padding: "10px", textAlign: "left" }}>Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {members.map(([email, role]) => (
                                    <tr key={email}>
                                        <td style={{ border: "1px solid #ccc", padding: "10px" }}>{role}</td>
                                        <td style={{ border: "1px solid #ccc", padding: "10px" }}>{email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

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
                                <i className='bi bi-people' style={{ marginRight: "8px" }} /> Add Members
                            </MenuItem>
                            <MenuItem onClick={() => setShowEditMemberModal(true)}>
                                <i className='bi bi-pen' style={{ marginRight: "8px" }} /> Edit Members
                            </MenuItem>

                            {projectData.members["admin"][0] == user.email && (
                                <MenuItem>
                                    <i className='bi bi-gear' style={{ marginRight: "8px" }} /> Edit Project Details
                                </MenuItem>
                            )}
                        </Menu>

                        {/* Edit Members */}
                        {showEditMemberModal && (
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
                                <h3>Edit Member</h3>
                                <table style={{ width: "100%", borderCollapse: "collapse" }} className='d-none d-sm-block my-3'>
                                    <thead>
                                        <tr>
                                            <th style={{ border: "1px solid #ccc", padding: "10px", textAlign: "left" }}>Email</th>
                                            <th style={{ border: "1px solid #ccc", padding: "10px", textAlign: "left" }}>Role</th>
                                            <th style={{ border: "1px solid #ccc", padding: "10px", textAlign: "left" }}>Edit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {members
                                            .filter(([email, role]) => role !== user.email && role != "admin" && email !== "admin") // Use AND (&&) to exclude both conditions
                                            .map(([email, role]) => (
                                                <tr key={email}>
                                                    <td style={{ border: "1px solid #ccc", padding: "10px" }}>{role}</td>
                                                    <td style={{ border: "1px solid #ccc", padding: "10px" }}>{email}</td>
                                                    <td style={{ border: "1px solid #ccc", padding: "10px", color: "red" }}>
                                                        <button onClick={() => handleDeleteUser(email, role)}>
                                                            <i className="bi bi-trash h6"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}




                                    </tbody>
                                </table>
                                <div style={{ textAlign: "right" }}>
                                    <button
                                        onClick={() => setShowEditMemberModal(false)}
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
                                        Close
                                    </button>
                                </div>
                            </div>
                        )}


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
                                <h3>Add Member</h3>
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
                                            backgroundColor: "#009e99",
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
