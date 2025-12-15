import React, { useEffect, useState, useContext, getDownloadURL } from 'react';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { ref, getStorage, uploadBytes } from 'firebase/storage';
import { updateProfile, reload } from 'firebase/auth';
import { app, db } from '../Backend-main/AppFirebase';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../Backend-main/AuthContext';
import './Dashboard.css';


function Dashboard() {
    const [picture, setPicture] = useState(''); // optional picture state kept
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userStats, setUserStats] = useState(null);
    const [groupStats, setGroupStats] = useState([]); // empty array to avoid null .length access
    const currentUser = useContext(AuthContext);

    // set document title and basic availability check
    useEffect(() => {
        document.title = "Dashboard | InventZa";
        if (!db || !currentUser) {
            setLoading(false);
            setError(new Error("Check in Again!"));
            console.error("Firebase db or userId is not available");
            return;
        }
    }, [db, currentUser]);

    useEffect(() => {
        const handleProfilePicture = () => {
            const [file, setFile] = useState(null);
            const [preview, setPreview] = useState(null);

            const onSelectFile = (e) => {
                if (!file.type.startsWith('image/')) {
                    alert("Please select a valid image file.");
                    return;
                }
                if (e.target.files && e.target.files.length > 0) {
                    const selectedFile = e.target.files[0];
                    if (selectedFile.size > 2 * 1024 * 1024) {
                        alert('File size exceeds 2MB limit. Please choose a smaller file.');
                        return;
                    }
                    setFile(selectedFile);
                    const objectUrl = URL.createObjectURL(selectedFile);
                    setPreview(objectUrl);
                }
                useEffect(() => {
                    return () => {
                        if (preview) {
                            URL.revokeObjectURL(preview);
                        }
                    };
                }, [preview]);
                useEffect(() => {
                    if (!file) {
                        setPreview(undefined);
                        return;
                    }
                    useEffect(() => {
                        const objectUrl = URL.createObjectURL(file);
                        setPreview(objectUrl);
                        return () => URL.revokeObjectURL(objectUrl);
                    }, [file]);
                }, [file]);
            };

            const onUpload = async () => {
                if (!file) {
                    alert("Please select a file first!");
                    return;
                }
            };
            try {
                const storageRef = ref(getStorage(), `profiles/${currentUser.uid}/${file.name}`);
                const uploadResult = uploadBytes(storageRef, file);
                const downloadURL = getDownloadURL(storageRef);
                console.log("File available at", downloadURL);
                updateProfile(currentUser, { photoURL: downloadURL });
                alert("Profile picture updated successfully!");
            } catch (error) {
                console.error("Error uploading file: ", error);
            }
            

            return (
                <div>
                    <input type="file" accept="image/*" onChange={onSelectFile} />
                    {preview && <img src={preview} alt="Profile Preview" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />}
                </div>
            );
        };
    }, [db, currentUser]);

    // users and groups collections
    useEffect(() => {
        if (!db) return;
        const userRef = collection(db, 'users');
        const groupRef = collection(db, 'groups');

        const unsubscribeUserStats = onSnapshot(userRef, (snapshot) => {
            const userData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setUserStats(userData);
        }, (error) => {
            console.error("Error fetching user stats: ", error);
            setError(error);
            setLoading(false);
        });

        const unsubscribeGroupStats = onSnapshot(groupRef, (snapshot) => {
            const groupData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setGroupStats(groupData);
        }, (error) => {
            console.error("Error fetching group stats: ", error);
            setError(error);
            setLoading(false);
        });

        return () => {
            unsubscribeUserStats();
            unsubscribeGroupStats();
        };
    }, [db]);

    // projects collection
    useEffect(() => {
        if (!db) return;
        const projectsRef = collection(db, 'projects');
        const q = query(projectsRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const projectsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setProjects(projectsData);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching projects: ", error);
            setError(error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [db]);

    // No Projects fallback
    if (!projects.length) {
        return (
            <div className='dashboard-container'>
                <p className='no-projects-msg'>
                    No projects found. Start posting your first project!
                    <button onClick = {<Link to = '/CreatePost'></Link>} className='create-project-btn'>Share Your First Idea</button>
                </p>
            </div>
        );
    }

    // Main render
    return (
        <div className='dashboard-container'>
            <h1 className='dashboard-title'>Welcome to Your Dashboard Chief!</h1>
            <p className='dashboard-subtitle'>A quick look of your manifestation</p>

            <div className='stats-grid'>
                <div style={{ marginBottom: 12 }}>
                    Signed in as: {currentUser?.email ?? 'Guest'}
                </div>
                <div className='stat-card user-stats'>
                    <h3 className='card-title'>Your Stats</h3>
                    <div className="stat-item">
                        <span>Projects</span>
                        <span className="stat-value">{userStats?.projects || 'N/A'}</span>
                    </div>
                </div>

                <div className="stat-card community-stats">
                    <h3 className="card-title">Your Team</h3>
                    {groupStats.length > 0 ? (
                        <ul className="group-list">
                            {groupStats.map(group => (
                                <li key={group.id} className="group-item">
                                    <span className="group-name">{group.name}</span>
                                    <span className="group-detail">({group.contributors} Contributors, {group.projects} Projects)</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No public groups/teams found yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;