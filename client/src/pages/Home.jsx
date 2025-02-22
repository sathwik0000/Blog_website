import { useState, useEffect } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [commentInput, setCommentInput] = useState({});

  // Fetch posts from an API
  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:8080/posts"); // Replace with actual API
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Handle likes
  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  // Handle comment submission
  const handleComment = (postId) => {
    if (!commentInput[postId]) return;

    const newComment = {
      id: Date.now(),
      text: commentInput[postId],
      user: "Anonymous User",
      timestamp: new Date().toLocaleString(),
    };

    setPosts(posts.map(post =>
      post.id === postId ? { ...post, comments: [...(post.comments || []), newComment] } : post
    ));
    
    setCommentInput({ ...commentInput, [postId]: "" });
  };

  return (
    <div className="home">
      <div className="posts">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="post">
              <img src={post.img} alt={post.title} className="post-image" />
              <div className="post-content">
                <h2>{post.title}</h2>
                <p>{post.desc}</p>

                <div className="actions">
                  <button className="like-button" onClick={() => handleLike(post.id)}>
                    ❤️ {post.likes || 0}
                  </button>
                  <button className="share-button" onClick={() => alert(`Post ${post.id} shared!`)}>
                    🔗 Share
                  </button>
                </div>

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
                          <strong>{comment.user}</strong> <span className="timestamp">({comment.timestamp})</span>
                          <p>{comment.text}</p>
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
