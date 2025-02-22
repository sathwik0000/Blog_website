import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {

  const [posts, setPosts] = useState([]);
  const [commentInput, setCommentInput] = useState({});

  api.interceptors.request.use(
    (config) => {
      const token = sessionStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Fetch posts from API
  const fetchPosts = async () => {
    try {
      const response = await api.get("http://localhost:8080/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);


  // Handle comment submission
  const handleComment = async (postId) => {
    if (!commentInput[postId]) return;

    try {
      const response = await api.post(`/${postId}/comments`, {
        content: commentInput[postId],
      });

      setPosts(posts.map(post =>
        post.id === postId
          ? { ...post, comments: [...(post.comments || []), response.data] }
          : post
      ));

      setCommentInput({ ...commentInput, [postId]: "" });
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  // Fetch comments for post ID 3
  const fetchCommentsForPost = async () => {
    try {
      const response = await api.get("http://localhost:8080/posts/3/comments");
      console.log("Comments for Post 3:", response.data);
    } catch (error) {
      console.error("Error fetching comments for post 3:", error);
    }
  };

  useEffect(() => {
    fetchCommentsForPost();
  }, []);

  return (
    <div className="home">
      <div className="posts">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="post">
              <div className="post-content">
                <h2>{post.title}</h2>
                    {post.content}


                {/* Comment Section */}
                <div className="comments-section">
                  <h3>Comments</h3>
                  <div className="comment-input">
                    <input 
                      type="text" 
                      placeholder="Write a comment..." 
                      value={commentInput[post.id] || ""} 
                      onChange={(e) => setCommentInput({ ...commentInput, [post.id]: e.target.value })} 
                    />
                    <button onClick={() => handleComment(post.id)}>Post</button>
                  </div>

                  <ul className="comments-list">
                    {post.comments?.length > 0 ? (
                      post.comments.map((comment) => (
                        <li key={comment.id} className="comment-item">
                          <strong>{comment.username}</strong> <span className="timestamp">({comment.updatedAt})</span>
                          <p>{comment.content}</p>
                        </li>
                      ))
                    ) : (
                      <li className="no-comments">No comments yet. Be the first to comment!</li>
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

export default Home;
