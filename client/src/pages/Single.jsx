import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Single = () => {
    const navigate = useNavigate()
    const [passwords, setPasswords] = useState({
        password: "",
        confirmPassword: ""
    });
    
    const [profileImage, setProfileImage] = useState(sessionStorage.getItem("profileImage") || "https://via.placeholder.com/150");
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        setUserData((prev) => ({
            ...prev,
            username: sessionStorage.getItem("username") || prev.username,
            email: sessionStorage.getItem("email") || prev.email,
        }));
    }, []);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        if (passwords.password && passwords.password !== passwords.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        sessionStorage.setItem("username", userData.username);
        sessionStorage.setItem("email", userData.email);
        sessionStorage.setItem("profileImage", profileImage);
        alert("Profile updated successfully!");
        setIsEditing(false);
    };

    const handleLogout = () => {
        sessionStorage.clear();
        alert("Logged out!");
        navigate("/login");
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <h2 style={styles.title}>Profile Settings</h2>
                <div style={styles.profileSection}>
                    <label htmlFor="profileImage" style={styles.imageContainer}>
                        <img src={profileImage} alt="Profile" style={styles.profileImage} />
                    </label>
                    {isEditing && <input type="file" id="profileImage" onChange={handleImageChange} />}
                    
                    <input
                        type="text"
                        name="username"
                        value={userData.username}
                        onChange={handleChange}
                        disabled={!isEditing}
                        style={isEditing ? styles.inputEditable : styles.input}
                    />
                    
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                        style={isEditing ? styles.inputEditable : styles.input}
                    />
                    
                    {isEditing && (
                        <>
                            <input
                                type="password"
                                name="password"
                                placeholder="New Password"
                                value={passwords.password}
                                onChange={handlePasswordChange}
                                style={styles.input}
                            />
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={passwords.confirmPassword}
                                onChange={handlePasswordChange}
                                style={styles.input}
                            />
                        </>
                    )}
                    
                    {isEditing ? (
                        <div style={styles.buttonContainer}>
                            <button style={styles.saveButton} onClick={handleSave}>Save Changes</button>
                            <button style={styles.cancelButton} onClick={() => setIsEditing(false)}>Cancel</button>
                        </div>
                    ) : (
                        <button style={styles.editButton} onClick={() => setIsEditing(true)}>Edit Profile</button>
                    )}
                    
                    <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    page: {
        backgroundColor: "#b9e7e7", // Set background color
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
    },
    container: {
        maxWidth: "500px",
        padding: "20px",
        backgroundColor: "#fff",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
        textAlign: "center",
        width: "100%",
    },
    title: {
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "20px",
    },
    profileSection: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    imageContainer: {
        cursor: "pointer",
    },
    profileImage: {
        width: "100px",
        height: "100px",
        borderRadius: "50%",
        objectFit: "cover",
        border: "3px solid #007bff",
    },
    input: {
        width: "100%",
        padding: "10px",
        margin: "10px 0",
        border: "1px solid #ccc",
        borderRadius: "5px",
        fontSize: "16px",
    },
    inputEditable: {
        width: "100%",
        padding: "10px",
        margin: "10px 0",
        border: "2px solid #007bff",
        borderRadius: "5px",
        fontSize: "16px",
    },
    buttonContainer: {
        display: "flex",
        gap: "10px",
        marginTop: "10px",
    },
    editButton: {
        width: "100%",
        padding: "10px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "5px",
        fontSize: "16px",
        cursor: "pointer",
    },
    saveButton: {
        flex: "1",
        padding: "10px",
        backgroundColor: "#28a745",
        color: "white",
        border: "none",
        borderRadius: "5px",
        fontSize: "16px",
        cursor: "pointer",
    },
    cancelButton: {
        flex: "1",
        padding: "10px",
        backgroundColor: "#6c757d",
        color: "white",
        border: "none",
        borderRadius: "5px",
        fontSize: "16px",
        cursor: "pointer",
    },
    logoutButton: {
        width: "100%",
        padding: "10px",
        marginTop: "10px",
        backgroundColor: "#dc3545",
        color: "white",
        border: "none",
        borderRadius: "5px",
        fontSize: "16px",
        cursor: "pointer",
    },
};

export default Single;
