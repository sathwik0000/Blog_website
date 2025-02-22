import { useState, useEffect } from "react";
import raxios from "../axios";

const allowedUserIds = [1, 2, 3]; 
const Single = () => {
  const [posts, setPosts] = useState([]); 
  const [editingPost, setEditingPost] = useState(null); 
  const [updatedPost, setUpdatedPost] = useState({ title: "", content: "" });


  const fetchPosts = async () => {
    try {
      const response = await raxios.get("/posts");
      
      // Filter posts to only show posts by allowed users
      const filteredPosts = response.data.filter((post) => allowedUserIds.includes(post.userId));
      setPosts(filteredPosts);
    } catch (error) {
      console.error("Error fetching posts:", error.response?.data || error);
      alert("Failed to load posts.");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPost((prev) => ({ ...prev, [name]: value }));
  };

  const startEditing = (post) => {
    setEditingPost(post.id);
    setUpdatedPost({ title: post.title, content: post.content });
  };

  const cancelEditing = () => {
    setEditingPost(null);
    setUpdatedPost({ title: "", content: "" });
  };

  const handleUpdate = async (postId) => {
    try {
      await raxios.put(`/posts/${postId}`, updatedPost);
      alert("Post updated successfully!");
      fetchPosts(); 
      cancelEditing();
    } catch (error) {
      console.error("Error updating post:", error.response?.data || error);
      alert("Failed to update post.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>MyBLOGS</h2>

      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} style={styles.post}>
            {editingPost === post.id ? (
              <div style={styles.editForm}>
                <input
                  type="text"
                  name="title"
                  value={updatedPost.title}
                  onChange={handleChange}
                  required
                  placeholder="Post Title"
                  style={styles.input}
                />
                <textarea
                  name="content"
                  value={updatedPost.content}
                  onChange={handleChange}
                  required
                  placeholder="Post Content"
                  style={styles.textarea}
                />
                <div style={styles.buttonContainer}>
                  <button onClick={() => handleUpdate(post.id)} style={styles.saveButton}>
                    Save
                  </button>
                  <button onClick={cancelEditing} style={styles.cancelButton}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h3 style={styles.title}>{post.title}</h3>
                <p style={styles.content}>{post.content}</p>
                <button onClick={() => startEditing(post)} style={styles.editButton}>
                  Edit
                </button>
              </>
            )}
          </div>
        ))
      ) : (
        <p style={styles.loadingText}>No posts found.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "700px",
    margin: "50px auto",
    padding: "20px",
    borderRadius: "8px",
    background: "#fff",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center",
    fontSize: "24px",
    color: "#333",
    marginBottom: "20px",
  },
  post: {
    background: "#f9f9f9",
    padding: "15px",
    borderRadius: "5px",
    marginBottom: "15px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "5px",
    color: "#333",
  },
  content: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "10px",
  },
  editButton: {
    background: "#007bff",
    color: "white",
    border: "none",
    padding: "8px 12px",
    fontSize: "14px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
  editForm: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginBottom: "10px",
  },
  textarea: {
    padding: "10px",
    fontSize: "16px",
    minHeight: "100px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    resize: "vertical",
    marginBottom: "10px",
  },
  buttonContainer: {
    display: "flex",
    gap: "10px",
  },
  saveButton: {
    background: "#28a745",
    color: "white",
    border: "none",
    padding: "8px 12px",
    fontSize: "14px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
  cancelButton: {
    background: "#dc3545",
    color: "white",
    border: "none",
    padding: "8px 12px",
    fontSize: "14px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
  loadingText: {
    textAlign: "center",
    fontSize: "18px",
    color: "#888",
  },
};

export default Single;
