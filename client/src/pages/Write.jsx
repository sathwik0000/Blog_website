import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Write = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handlePublish = async () => {
    if (!title || !content) {
      alert("Title and content are required!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        throw new Error("User is not authenticated. No token found.");
      }

      console.log("Sending data:", { title, content, category, userId: 1 });

      const response = await axios.post(
        "http://localhost:8080/posts",
        { title, content, userId: 1 },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.token}`,
          },
        }
      );

      if (response.status === 201) {
        alert("Post published successfully!");
        navigate(`/post/${response.data.id}`);
      } else {
        throw new Error("Unexpected response status: " + response.status);
      }
    } catch (err) {
      console.error("Error:", err);
      setError(err.response?.data?.message || "Failed to publish post!");
    }

    setLoading(false);
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

      {/* Sidebar Menu */}
      <div style={styles.sidebar}>
        {/* Publish Section */}
        <div style={styles.card}>
          <h2>Publish</h2>
          <p><b>Status:</b> Draft</p>
          <p><b>Visibility:</b> Public</p>

         
          <input type="file" id="file" style={{ display: "none" }} />

          <div style={styles.buttonContainer}>
            <button style={styles.draftButton} disabled={loading}>Save as Draft</button>
            <button style={styles.publishButton} onClick={handlePublish} disabled={loading}>
              {loading ? "Publishing..." : "Publish"}
            </button>
          </div>
          {error && <p> style={styles.error}{error}</p>}
        </div>

        {/* Category Section */}
        <div style={styles.card}>
          <h2>Category</h2>
          {["Art", "Science", "Technology", "Cinema", "Design", "Food"].map((cat) => (
            <label key={cat} style={styles.categoryLabel}>
              <input
                type="radio"
                name="category"
                value={cat.toLowerCase()}
                checked={category === cat.toLowerCase()}
                onChange={() => setCategory(cat.toLowerCase())}
              />
              {cat}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: "flex",
    gap: "30px",
    padding: "40px",
    backgroundColor: "#f4f4f9",
    minHeight: "100vh",
  },
  contentSection: {
    flex: 3,
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  input: {
    padding: "12px",
    fontSize: "18px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    outline: "none",
  },
  editorContainer: {
    height: "300px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
  },
  editor: {
    height: "100%",
  },
  sidebar: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  card: {
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  uploadBtn: {
    display: "block",
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px",
    textAlign: "center",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px",
  },
  buttonContainer: {
    marginTop: "15px",
    display: "flex",
    gap: "10px",
  },
  draftButton: {
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#ccc",
    cursor: "pointer",
  },
  publishButton: {
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#28a745",
    color: "#fff",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
  categoryLabel: {
    display: "block",
    padding: "5px 0",
    fontSize: "16px",
  },
};

export default Write;
