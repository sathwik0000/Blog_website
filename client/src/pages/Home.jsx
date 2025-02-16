import { useState } from "react";

const Home = () => {
  const [likes, setLikes] = useState({});

  const handleLike = (postId) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [postId]: (prevLikes[postId] || 0) + 1, 
    }));
  };

  const posts = [
    {
      id: 1,
      title: "The Future of AI in Web Development",
      desc: "Artificial Intelligence is revolutionizing the web development industry with automation and personalized experiences.",
      img: "https://cdn.britannica.com/84/203584-050-57D326E5/speed-internet-technology-background.jpg",
    },
    {
      id: 2,
      title: "10 Tips to Improve Your Coding Skills",
      desc: "Learn the best practices to enhance your programming skills and stay ahead in the tech industry.",
      img: "https://cdn.britannica.com/84/203584-050-57D326E5/speed-internet-technology-background.jpg",
    },
    {
      id: 3,
      title: "How to Build a Responsive Website",
      desc: "Responsive design is crucial in modern web development. Learn how to make your website mobile-friendly.",
      img: "https://cdn.britannica.com/84/203584-050-57D326E5/speed-internet-technology-background.jpg",
    },
    {
      id: 4,
      title: "Top 5 JavaScript Frameworks in 2025",
      desc: "Discover the most popular JavaScript frameworks that developers are using to build modern web applications.",
      img: "https://cdn.britannica.com/84/203584-050-57D326E5/speed-internet-technology-background.jpg",
    },
  ];

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div key={post.id} className="postes">
            <img src={post.img} alt={post.title} className="post-image" />
            <div className="post-content">
              <h2>{post.title}</h2>
              <p>{post.desc}</p>
              <div className="actions">
                <button className="read-more">Read More</button>
                <button className="like-button" onClick={() => handleLike(post.id)}>
                  ❤️ {likes[post.id] || 0}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
