import { useState, useEffect } from "react";
import raxios from "../axios";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [commentInput, setCommentInput] = useState({});

  // Fetch posts from API
  const fetchPosts = async () => {
    try {
      const response = await raxios.get("/posts");
      console.log("Fetched posts:", response.data);

      // Ensure posts are correctly set
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error.response?.data || error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Handle comment submission
  const handleComment = async (postId) => {
    console.log("Attempting to post comment for post:", postId);

    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to comment.");
      return;
    }

    const commentText = commentInput[postId];
    if (!commentText || commentText.trim() === "") {
      alert("Please write a comment before posting.");
      return;
    }

    try {
      const response = await raxios.post(
        `/posts/${postId}/comments`,
        { content: commentText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Comment posted successfully:", response.data);
      const newComment = response.data;

      // Update state manually to instantly show the comment
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? { ...post, Comments: [...(post.Comments || []), newComment] }
            : post
        )
      );

      // Clear input field
      setCommentInput((prevInput) => ({ ...prevInput, [postId]: "" }));
    } catch (error) {
      console.error("Error posting comment:", error.response?.data || error);
      alert("Failed to post comment. Please try again.");
    }
  };

  return (
    <div style={styles.home}>
      <div style={styles.posts}>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} style={styles.post}>
              <div style={styles.postContent}>
                <h2 style={styles.postTitle}>{post.title}</h2>
                <div
                  style={styles.postText}
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Comment Section */}
                <div style={styles.commentsSection}>
                  <h3 style={styles.commentTitle}>Comments</h3>

                  {/* Comment Input Field */}
                  <div style={styles.commentInputContainer}>
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      value={commentInput[post.id] || ""}
                      onChange={(e) =>
                        setCommentInput({
                          ...commentInput,
                          [post.id]: e.target.value,
                        })
                      }
                      style={styles.commentInput}
                    />
                    <button
                      onClick={() => handleComment(post.id)}
                      style={styles.commentButton}
                    >
                      Post
                    </button>
                  </div>

                  {/* Display Comments */}
                  <ul style={styles.commentList}>
                    {post.Comments?.length > 0 ? (
                      post.Comments.map((comment, index) => {
                        const timestamp = comment.updatedAt
                          ? new Date(comment.updatedAt)
                          : null;
                       
                        return (
                          <li key={index} style={styles.commentItem}>
                            <strong>{comment.username}</strong>{" "}
                        
                            <p>{comment.content}</p>
                          </li>
                        );
                      })
                    ) : (
                      <li style={styles.noComments}>
                        No comments yet. Be the first to comment!
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading posts...</p>
        )}
      </div>
    </div>
  );
};

// Inline Styles
const styles = {
  home: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    background: "#f4f4f9",
  },
  posts: {
    width: "100%",
  },
  post: {
    background: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    marginBottom: "20px",
  },
  postContent: {
    width: "100%",
  },
  postTitle: {
    fontSize: "22px",
    color: "#333",
    marginBottom: "10px",
  },
  postText: {
    fontSize: "16px",
    color: "#555",
  },
  commentsSection: {
    marginTop: "15px",
    paddingTop: "10px",
    borderTop: "1px solid #ddd",
  },
  commentTitle: {
    fontSize: "18px",
    color: "#222",
    marginBottom: "10px",
  },
  commentInputContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "15px",
  },
  commentInput: {
    flex: "1",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "14px",
    outline: "none",
    transition: "border 0.3s ease",
  },
  commentButton: {
    background: "#007bff",
    color: "white",
    border: "none",
    padding: "10px 15px",
    fontSize: "14px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
  commentList: {
    listStyle: "none",
    padding: "0",
    marginTop: "10px",
  },
  commentItem: {
    background: "#f9f9f9",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "8px",
  },
  timestamp: {
    fontSize: "12px",
    color: "#888",
    marginLeft: "5px",
  },
  noComments: {
    fontSize: "14px",
    color: "#777",
    textAlign: "center",
  },
};

export default Home;
