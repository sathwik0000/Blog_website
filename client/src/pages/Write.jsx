import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import raxios from "../axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Write = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Volunteer Form States
  const [volunteerName, setVolunteerName] = useState("");
  const [volunteerEmail, setVolunteerEmail] = useState("");
  const [volunteerPhone, setVolunteerPhone] = useState("");
  const [volunteerMessage, setVolunteerMessage] = useState("");
  const [volunteers, setVolunteers] = useState([]);

  const navigate = useNavigate();

  const handlePublish = async () => {
    if (!title || !content || !date) {
      alert("Title, content, and date are required!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        throw new Error("User is not authenticated. No token found.");
      }

      const response = await raxios.post(
        "/posts",
        { title, content, date, userId: 1 },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        alert("Post published successfully!");
      } else {
        throw new Error("Unexpected response status: " + response.status);
      }
    } catch (err) {
      console.error("Error:", err);
      setError(err.response?.data?.message || "Failed to publish post!");
    }

    setLoading(false);
  };

  // Handle Volunteer Form Submission
  const handleVolunteerSubmit = (e) => {
    e.preventDefault();

    if (!volunteerName || !volunteerEmail || !volunteerPhone || !volunteerMessage) {
      alert("All volunteer fields are required!");
      return;
    }

    const newVolunteer = {
      id: Date.now(),
      name: volunteerName,
      email: volunteerEmail,
      phone: volunteerPhone,
      message: volunteerMessage,
    };

    setVolunteers([...volunteers, newVolunteer]);
    alert("Thank you for signing up as a volunteer!");

    // Reset form
    setVolunteerName("");
    setVolunteerEmail("");
    setVolunteerPhone("");
    setVolunteerMessage("");
  };

  return (
    <div style={styles.container}>
      {/* Content Section */}
      <div style={styles.contentSection}>
        <input
          type="text"
          placeholder="Enter your title here..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />
        <div style={styles.editorContainer}>
          <ReactQuill style={styles.editor} theme="snow" value={content} onChange={setContent} />
        </div>
      </div>

      {/* Sidebar */}
      <div style={styles.sidebar}>
        {/* Post Section */}
        <div style={styles.card}>
          <h2 style={styles.heading}>Post</h2>
          <label style={styles.label}>📅 Select Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={styles.datePicker}
          />
          <button style={styles.publishButton} onClick={handlePublish} disabled={loading}>
            {loading ? "Publishing..." : "Publish"}
          </button>
          {error && <p style={styles.error}>{error}</p>}
        </div>

        {/* Volunteer Sign-Up Form */}
        <div style={styles.volunteerCard}>
          <h2 style={styles.heading}>Volunteer Registration</h2>
          <form onSubmit={handleVolunteerSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              value={volunteerName}
              onChange={(e) => setVolunteerName(e.target.value)}
              style={styles.input}
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              value={volunteerEmail}
              onChange={(e) => setVolunteerEmail(e.target.value)}
              style={styles.input}
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={volunteerPhone}
              onChange={(e) => setVolunteerPhone(e.target.value)}
              style={styles.input}
              required
            />
            <textarea
              placeholder="Why do you want to volunteer?"
              value={volunteerMessage}
              onChange={(e) => setVolunteerMessage(e.target.value)}
              style={styles.textarea}
              required
            />
            <button type="submit" style={styles.volunteerButton}>
              Register
            </button>
          </form>
        </div>

        {/* Registered Volunteers */}
        {volunteers.length > 0 && (
          <div style={styles.volunteerList}>
            <h2 style={styles.heading}>Registered Volunteers</h2>
            {volunteers.map((volunteer) => (
              <div key={volunteer.id} style={styles.volunteerItem}>
                <p><strong>{volunteer.name}</strong></p>
                <p>{volunteer.email} | {volunteer.phone}</p>
                <p style={styles.volunteerMessage}>"{volunteer.message}"</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// **Styles**
const styles = {
  container: {
    display: "flex",
    gap: "30px",
    padding: "40px",
    backgroundColor: "#f8f9fc",
    minHeight: "100vh",
  },
  contentSection: {
    flex: 3,
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  sidebar: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  input: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    outline: "none",
    width: "100%",
    border: "1px solid #ccc",
    transition: "0.3s",
  },
  textarea: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    outline: "none",
    width: "100%",
    height: "100px",
    resize: "none",
  },
  volunteerButton: {
    padding: "12px",
    borderRadius: "6px",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
    fontSize: "16px",
    width: "100%",
    transition: "0.3s",
  },
};

export default Write;
